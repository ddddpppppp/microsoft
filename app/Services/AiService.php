<?php
namespace App\Services;

class AiService {

    private $config;

    private static $defaultSystemPrompt = '你是一个专业的内容创作者。请根据用户要求生成高质量内容。';

    private static $stylePrompts = [
        'seo' => '你是专业SEO作者。用HTML输出（不含<html><body>标签）。'
            . '正文以H2主标题开头，用H2/H3分层，段落3-5句，善用列表，结尾有总结。',

        'media' => '你是自媒体爆款作者。用HTML输出（不含<html><body>标签）。'
            . '正文以H2主标题开头，标题用数字/疑问/反差吸引点击，语言口语化有温度，段落短小，结尾引导互动。',

        'geo' => '你是GEO内容专家，写被AI搜索引擎引用的权威内容。用HTML输出（不含<html><body>标签）。'
            . '正文以H2主标题开头，用H2/H3组织问答段落，要点加粗，包含定义性语句和数据，善用列表。',
    ];

    public function __construct() {
        $this->config = require BASE_PATH . '/config/ai.php';
    }

    /**
     * Universal AI generation — call any configured provider with any prompt.
     *
     * @param string $provider       deepseek | gemini | openai
     * @param string $prompt         User prompt
     * @param array  $options        Optional overrides:
     *   - system_prompt  (string) Override the default system prompt
     *   - temperature    (float)  0-1, default 0.7
     *   - max_tokens     (int)    default 4096
     *   - api_key        (string) override the configured key
     *   - response_format (string) 'text' | 'json', default 'text'
     * @return array  ['success'=>bool, 'content'=>string, 'error'=>string]
     */
    public function generate(string $provider, string $prompt, array $options = []): array {
        $method = 'call' . ucfirst($provider);
        if (!method_exists($this, $method)) {
            return ['success' => false, 'error' => "不支持的 AI 提供商: $provider"];
        }

        $cfg = $this->config[$provider] ?? [];
        $apiKey = $options['api_key'] ?? ($cfg['api_key'] ?? '');
        if (empty($apiKey)) {
            return ['success' => false, 'error' => "{$provider} 的 API Key 未配置"];
        }

        $params = [
            'system_prompt'   => $options['system_prompt'] ?? self::$defaultSystemPrompt,
            'temperature'     => $options['temperature'] ?? 0.7,
            'max_tokens'      => $options['max_tokens'] ?? 4096,
            'response_format' => $options['response_format'] ?? 'text',
        ];
        $debugContext = $options['debug_context'] ?? [];
        unset($options['debug_context']);

        try {
            $requestPayload = [
                'provider' => $provider,
                'params' => [
                    'temperature' => $params['temperature'],
                    'max_tokens' => $params['max_tokens'],
                    'response_format' => $params['response_format'],
                ],
                'system_prompt' => $params['system_prompt'],
                'user_prompt' => $prompt,
                'context' => $debugContext,
            ];
            self::writeDebugLog('ai_request', $requestPayload);

            $result = $this->$method($cfg, $apiKey, $prompt, $params);
            self::writeDebugLog('ai_response', [
                'provider' => $provider,
                'success' => !empty($result['success']),
                'content' => $result['content'] ?? '',
                'raw' => $result['raw'] ?? '',
                'error' => $result['error'] ?? '',
                'context' => $debugContext,
            ]);
            return $result;
        } catch (\Exception $e) {
            self::writeDebugLog('ai_exception', [
                'provider' => $provider,
                'error' => $e->getMessage(),
                'context' => $debugContext,
            ]);
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    // ── Preset prompt builders ─────────────────────────────

    /**
     * Generate an article with optional style and vocabulary injection.
     *
     * @param string $style  seo | media | geo
     * @param array  $vocabInstructions  Pre-built vocab instruction string (appended to prompt)
     * @param string $titleDedup  Pre-built dedup instruction (appended to prompt)
     */
    public function generateArticle(string $provider, string $prompt, array $options = []): array {
        $style = $options['article_style'] ?? 'seo';
        $debugContext = $options['debug_context'] ?? [];
        $debugContext['article_style'] = $style;
        $options['debug_context'] = $debugContext;
        $options['system_prompt'] = $options['system_prompt'] ?? (self::$stylePrompts[$style] ?? self::$stylePrompts['seo']);
        unset($options['article_style']);

        if (!empty($options['vocab_instructions'])) {
            $prompt .= "\n\n" . $options['vocab_instructions'];
            unset($options['vocab_instructions']);
        } else {
            $prompt .= "\n\n不要输出任何<a href>超链接标签。";
        }

        if (!empty($options['seo_keywords'])) {
            $kwList = implode('、', $options['seo_keywords']);
            $prompt .= "\n\nSEO要求：文章标题和正文需自然融入以下关键词：{$kwList}";
            unset($options['seo_keywords']);
        }

        if (!empty($options['title_dedup'])) {
            $prompt .= "\n\n" . $options['title_dedup'];
            unset($options['title_dedup']);
        }

        return $this->generate($provider, $prompt, $options);
    }

    /**
     * Generate a product review. Convenience wrapper with a review-optimised system prompt.
     */
    public function generateReview(string $provider, string $prompt, array $options = []): array {
        $options['system_prompt'] = $options['system_prompt']
            ?? '你是一位资深的软件产品评测专家。请撰写专业、客观、有深度的产品评测内容。'
             . '评测应包含：产品概述、核心功能亮点、使用体验、优缺点分析、适用人群和总结评分。'
             . '请用HTML格式输出（不需要外层标签），使用h2/h3标题、段落、列表来组织内容。';
        return $this->generate($provider, $prompt, $options);
    }

    /**
     * Generate multiple product reviews as JSON.
     * Returns parsed array of reviews on success.
     */
    public function generateProductReviews(string $provider, string $productName, int $count = 3, array $options = []): array {
        $options['system_prompt'] = '你是一个产品评价生成器。你需要模拟真实用户的评价风格，'
            . '生成多条不同视角、不同评分的产品评价。评价要真实自然，像真实用户写的一样，'
            . '有的详细有的简短，评分分布要合理（不要全是5星）。'
            . '请严格按照JSON格式输出，不要包含任何其他文字。';
        $options['response_format'] = 'json';
        $options['max_tokens'] = max(4096, $count * 1500);

        $prompt = $options['custom_prompt'] ?? '';
        unset($options['custom_prompt']);

        if (empty($prompt)) {
            $prompt = "请为产品「{$productName}」生成用户评价。";
        }

        $prompt .= "\n\n请**恰好生成 {$count} 条**用户评价，不要多也不要少。\n\n"
            . "请严格按照以下JSON格式输出：\n"
            . "{\n"
            . "  \"reviews\": [\n"
            . "    {\n"
            . "      \"author_name\": \"用户昵称\",\n"
            . "      \"rating\": 4.5,\n"
            . "      \"title\": \"评价标题\",\n"
            . "      \"content\": \"评价正文内容，可以较长\",\n"
            . "      \"pros\": \"优点描述\",\n"
            . "      \"cons\": \"缺点描述\",\n"
            . "      \"summary\": \"一句话总结\"\n"
            . "    }\n"
            . "  ]\n"
            . "}\n\n"
            . "注意：rating 范围是 1.0-5.0，author_name 用中文网名，评分分布要自然合理。reviews 数组必须包含恰好 {$count} 条。";

        $result = $this->generate($provider, $prompt, $options);
        if (!$result['success']) return $result;

        $content = $this->stripCodeFences($result['content']);
        $data = json_decode($content, true);
        if (!$data || !isset($data['reviews']) || !is_array($data['reviews'])) {
            return ['success' => false, 'error' => 'AI 返回的JSON格式无法解析', 'raw' => $result['content']];
        }

        // 强制只取前 count 条，保证「生成条数」生效
        $reviews = array_slice($data['reviews'], 0, $count);
        return ['success' => true, 'reviews' => $reviews];
    }

    /**
     * Generate SEO keywords/vocabularies for a product.
     */
    public function generateVocabularies(string $productName, int $count = 20, string $hint = ''): array {
        $provider = 'deepseek';
        $options = [
            'system_prompt' => '你是一个SEO关键词专家，擅长为软件产品生成有价值的搜索关键词。',
            'response_format' => 'json',
            'max_tokens' => 2048,
            'debug_context' => ['entry' => 'generate_vocabularies', 'product' => $productName],
        ];

        $prompt = "请为软件产品「{$productName}」生成 {$count} 个SEO关键词/搜索词。\n\n"
            . "要求：\n"
            . "1. 关键词要与该产品相关，覆盖功能、使用场景、目标用户等维度\n"
            . "2. 包含长尾词（如「XX软件怎么用」「XX下载安装教程」）\n"
            . "3. 包含品牌词变体（如简称、英文名、常见拼写）\n"
            . "4. 包含竞品对比词（如「XX vs YY」「XX替代品」）\n"
            . "5. 词汇不要重复\n"
            . "6. 每个词汇长度2-15个字符\n";

        if ($hint) {
            $prompt .= "\n补充说明：{$hint}\n";
        }

        $prompt .= "\n请严格按照以下JSON格式输出：\n"
            . "{\n"
            . "  \"keywords\": [\"关键词1\", \"关键词2\", ...]\n"
            . "}\n\n"
            . "注意：keywords 数组必须包含恰好 {$count} 个不重复的关键词。";

        $result = $this->generate($provider, $prompt, $options);
        if (!$result['success']) return $result;

        $content = $this->stripCodeFences($result['content']);
        $data = json_decode($content, true);
        if (!$data || !isset($data['keywords']) || !is_array($data['keywords'])) {
            return ['success' => false, 'error' => 'AI 返回的JSON格式无法解析', 'raw' => $result['content']];
        }

        $keywords = array_slice($data['keywords'], 0, $count);
        $keywords = array_unique(array_filter(array_map('trim', $keywords)));

        return ['success' => true, 'vocabs' => array_values($keywords)];
    }

    /**
     * Build vocabulary instructions for article generation prompt.
     */
    public static function buildVocabInstructions(array $vocabs): string {
        if (empty($vocabs)) return '';

        $lines = ["关键词约束（只用下方给出的词，有URL的用<a href>，无URL用纯文本，不要新增链接）："];
        foreach ($vocabs as $v) {
            $word = $v['word'] ?? '';
            $url = $v['url'] ?? '';
            $repeat = (int)($v['repeat'] ?? 1);
            $link = $url ? " -> {$url}" : '';
            $lines[] = "- \"{$word}\"{$link} ×{$repeat}";
        }

        return implode("\n", $lines);
    }

    /**
     * Extract plain-text keywords (without URL) from vocab list for SEO title/description.
     */
    public static function extractSeoKeywords(array $vocabs): array {
        $keywords = [];
        foreach ($vocabs as $v) {
            $word = trim((string)($v['word'] ?? ''));
            if ($word !== '') {
                $keywords[] = $word;
            }
        }
        return array_unique($keywords);
    }

    /**
     * Validate whether vocab occurrence constraints are satisfied.
     */
    public static function validateVocabUsage(string $content, array $vocabs): array {
        $plain = html_entity_decode(strip_tags($content), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $mismatches = [];
        $words = [];
        $rawCounts = [];

        foreach ($vocabs as $v) {
            $word = trim((string)($v['word'] ?? ''));
            if ($word === '') {
                continue;
            }
            $words[] = $word;
            $rawCounts[$word] = self::countLiteralOccurrences($plain, $word);
        }

        foreach ($vocabs as $v) {
            $word = trim((string)($v['word'] ?? ''));
            if ($word === '') continue;
            $expected = max(1, (int)($v['repeat'] ?? 1));
            $actual = self::countNonOverlappedKeywordOccurrences($word, $words, $rawCounts);
            if ($actual !== $expected) {
                $mismatches[] = [
                    'word' => $word,
                    'expected' => $expected,
                    'actual' => $actual,
                ];
            }
        }

        return [
            'ok' => empty($mismatches),
            'mismatches' => $mismatches,
        ];
    }

    /**
     * Count literal occurrences (substring based).
     */
    private static function countLiteralOccurrences(string $text, string $word): int {
        return mb_substr_count($text, $word);
    }

    /**
     * Count keyword occurrences after removing overlaps from longer selected keywords.
     */
    private static function countNonOverlappedKeywordOccurrences(string $word, array $allWords, array $rawCounts): int {
        $actual = (int)($rawCounts[$word] ?? 0);
        foreach ($allWords as $other) {
            if ($other === $word) {
                continue;
            }
            // If the current keyword is contained in a longer selected keyword,
            // subtract those overlaps to avoid short-word over-counting.
            $containsTimes = mb_substr_count($other, $word);
            if ($containsTimes > 0 && mb_strlen($other) > mb_strlen($word)) {
                $actual -= (int)($rawCounts[$other] ?? 0) * $containsTimes;
            }
        }
        return max(0, $actual);
    }

    /**
     * Build title deduplication instructions.
     */
    public static function buildTitleDedup(array $existingTitles): string {
        if (empty($existingTitles)) return '';
        $lines = ["请确保文章标题不要与以下已有文章标题重复或过于相似："];
        foreach (array_slice($existingTitles, 0, 50) as $t) {
            $lines[] = "- " . $t;
        }
        return implode("\n", $lines);
    }

    // ── Provider implementations ───────────────────────────

    private function callDeepseek(array $cfg, string $apiKey, string $prompt, array $params): array {
        $url = rtrim($cfg['base_url'], '/') . '/chat/completions';
        $body = [
            'model'       => $cfg['model'] ?? 'deepseek-chat',
            'messages'    => [
                ['role' => 'system', 'content' => $params['system_prompt']],
                ['role' => 'user',   'content' => $prompt],
            ],
            'temperature' => $params['temperature'],
            'max_tokens'  => $params['max_tokens'],
        ];
        if ($params['response_format'] === 'json') {
            $body['response_format'] = ['type' => 'json_object'];
        }

        return $this->chatCompletion($url, $body, $apiKey);
    }

    private function callOpenai(array $cfg, string $apiKey, string $prompt, array $params): array {
        $url = rtrim($cfg['base_url'], '/') . '/v1/chat/completions';
        $body = [
            'model'       => $cfg['model'] ?? 'gpt-4o-mini',
            'messages'    => [
                ['role' => 'system', 'content' => $params['system_prompt']],
                ['role' => 'user',   'content' => $prompt],
            ],
            'temperature' => $params['temperature'],
            'max_tokens'  => $params['max_tokens'],
        ];
        if ($params['response_format'] === 'json') {
            $body['response_format'] = ['type' => 'json_object'];
        }

        return $this->chatCompletion($url, $body, $apiKey);
    }

    private function callGemini(array $cfg, string $apiKey, string $prompt, array $params): array {
        $model = $cfg['model'] ?? 'gemini-flash-latest';
        $url = rtrim($cfg['base_url'], '/') . '/models/' . $model . ':generateContent';
        $body = [
            'contents' => [[
                'parts' => [['text' => $params['system_prompt'] . "\n\n" . $prompt]],
            ]],
            'generationConfig' => [
                'temperature'    => $params['temperature'],
                'maxOutputTokens' => $params['max_tokens'],
            ],
        ];
        if ($params['response_format'] === 'json') {
            $body['generationConfig']['responseMimeType'] = 'application/json';
        }

        $result = $this->httpPost($url, $body, [
            'Content-Type: application/json',
            'X-goog-api-key: ' . $apiKey,
        ]);
        if (!$result['success']) return $result;

        $data = json_decode($result['body'], true);
        $content = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';
        if (empty($content)) {
            return ['success' => false, 'error' => 'Gemini 未返回内容', 'raw' => $result['body']];
        }
        return ['success' => true, 'content' => $content];
    }

    // ── Shared helpers ─────────────────────────────────────

    /**
     * OpenAI-compatible chat/completions call (used by DeepSeek & OpenAI).
     */
    private function chatCompletion(string $url, array $body, string $apiKey): array {
        $result = $this->httpPost($url, $body, [
            'Authorization: Bearer ' . $apiKey,
            'Content-Type: application/json',
        ]);
        if (!$result['success']) return $result;

        $data = json_decode($result['body'], true);
        $content = $data['choices'][0]['message']['content'] ?? '';
        if (empty($content)) {
            return ['success' => false, 'error' => 'AI 未返回内容', 'raw' => $result['body']];
        }
        return ['success' => true, 'content' => $content];
    }

    private function httpPost(string $url, array $body, array $headers): array {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => json_encode($body, JSON_UNESCAPED_UNICODE),
            CURLOPT_HTTPHEADER     => $headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT        => 120,
            CURLOPT_CONNECTTIMEOUT => 15,
            CURLOPT_SSL_VERIFYPEER => false,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            self::writeDebugLog('ai_http_error', [
                'url' => $url,
                'error' => $error,
                'http_code' => $httpCode,
            ]);
            return ['success' => false, 'error' => "cURL 错误: $error"];
        }
        if ($httpCode < 200 || $httpCode >= 300) {
            self::writeDebugLog('ai_http_non_2xx', [
                'url' => $url,
                'http_code' => $httpCode,
                'response' => $response,
            ]);
            return ['success' => false, 'error' => "HTTP $httpCode: $response"];
        }
        return ['success' => true, 'body' => $response];
    }

    private static function writeDebugLog(string $type, array $payload): void {
        if (!defined('BASE_PATH')) return;
        $dir = BASE_PATH . '/storage/logs';
        if (!is_dir($dir)) {
            @mkdir($dir, 0777, true);
        }
        $file = $dir . '/ai_debug.log';
        $time = date('Y-m-d H:i:s');
        $lines = [];
        $lines[] = str_repeat('=', 96);
        $lines[] = "[{$time}] {$type}";
        $lines[] = str_repeat('-', 96);

        foreach ($payload as $key => $value) {
            $lines[] = strtoupper((string)$key) . ':';
            if (is_string($value)) {
                $lines[] = $value === '' ? '(empty)' : $value;
            } elseif (is_bool($value)) {
                $lines[] = $value ? 'true' : 'false';
            } elseif (is_null($value)) {
                $lines[] = 'null';
            } elseif (is_scalar($value)) {
                $lines[] = (string)$value;
            } else {
                $json = json_encode($value, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                $lines[] = $json === false ? '(unserializable)' : $json;
            }
            $lines[] = '';
        }

        $lines[] = str_repeat('=', 96);
        $lines[] = '';
        @file_put_contents($file, implode(PHP_EOL, $lines), FILE_APPEND);
    }

    // ── Content parsers ────────────────────────────────────

    /**
     * Parse AI output into title + HTML content (for articles).
     * Title is taken from first <h1>/<h2>/<h3>, or Markdown # line, or first non-empty text line as fallback.
     */
    /**
     * @param string $raw       AI raw output
     * @param array  $seoKeywords  Plain-text keywords to populate keywords & meta_description
     */
    public function parseArticle(string $raw, array $seoKeywords = []): array {
        $content = $this->stripCodeFences($raw);

        $title = $this->extractArticleTitle($content, $raw);

        if (strpos($content, '<p>') === false && strpos($content, '<h') === false) {
            $content = $this->markdownToHtml($content);
            if ($title === '' && preg_match('/^#\s+(.+)$/m', $raw, $m)) {
                $title = trim($m[1]);
            }
        }

        if ($title === '') {
            $title = $this->extractFirstLineAsTitle($content);
        }

        $keywords = !empty($seoKeywords) ? implode(',', $seoKeywords) : '';

        $plain = trim(strip_tags($content));
        $metaDesc = mb_substr($plain, 0, 160);

        return [
            'title' => $title,
            'content' => $content,
            'keywords' => $keywords,
            'meta_description' => $metaDesc,
        ];
    }

    /**
     * Extract title from HTML: first h1/h2/h3 (supports multiline); then Markdown # in raw.
     */
    private function extractArticleTitle(string $content, string $raw): string {
        // 使用 s 修饰符使 . 匹配换行，避免多行标题被漏掉
        if (preg_match('/<h[123][^>]*>\s*(.*?)\s*<\/h[123]>/is', $content, $m)) {
            $t = trim(strip_tags($m[1]));
            if ($t !== '') {
                return $t;
            }
        }
        if (preg_match('/^#\s+(.+)$/m', $raw, $m)) {
            $t = trim($m[1]);
            if ($t !== '') {
                return $t;
            }
        }
        return '';
    }

    /**
     * Fallback: first sentence or first line only (avoid using intro/description as title).
     * Prefer short fragment so 开篇描述 doesn't end up in the title field.
     */
    private function extractFirstLineAsTitle(string $html): string {
        $plain = trim(html_entity_decode(strip_tags($html), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
        $plain = preg_replace('/\s+/u', ' ', $plain);
        if ($plain === '') return '';

        // 只取第一句（。.!?!）或第一行，避免整段描述被当标题
        $maxTitleLen = 40;
        if (preg_match('/^(.+?[。.!?！？])/u', $plain, $m)) {
            $first = trim($m[1]);
            return mb_strlen($first) > $maxTitleLen ? mb_substr($first, 0, $maxTitleLen) . '…' : $first;
        }
        return mb_strlen($plain) > $maxTitleLen ? mb_substr($plain, 0, $maxTitleLen) . '…' : $plain;
    }

    /**
     * Parse AI output into structured review data (for product reviews).
     * Returns: title, content (HTML), rating (1-5), pros[], cons[], summary
     */
    public function parseReview(string $raw): array {
        $content = $this->stripCodeFences($raw);

        $title = $this->extractArticleTitle($content, $raw);

        if (strpos($content, '<p>') === false && strpos($content, '<h') === false) {
            $content = $this->markdownToHtml($content);
            if ($title === '' && preg_match('/^#\s+(.+)$/m', $raw, $m)) {
                $title = trim($m[1]);
            }
        }

        $rating = 0;
        if (preg_match('/(\d(?:\.\d)?)\s*[\/／]\s*5/', $content, $m)) {
            $rating = (float) $m[1];
        }

        $pros = $this->extractListAfterHeading($content, '优点|优势|亮点|Pros');
        $cons = $this->extractListAfterHeading($content, '缺点|不足|劣势|Cons');

        $summary = '';
        if (preg_match('/<h\d[^>]*>.*?(?:总结|结论|Summary).*?<\/h\d>\s*(.*?)(?=<h\d|$)/si', $content, $m)) {
            $summary = trim(strip_tags($m[1]));
        }

        return [
            'title'   => $title,
            'content' => $content,
            'rating'  => $rating,
            'pros'    => $pros,
            'cons'    => $cons,
            'summary' => $summary,
        ];
    }

    /**
     * Generic parse — just return cleaned HTML + title.
     */
    public function parseContent(string $raw): array {
        $content = $this->stripCodeFences($raw);

        $title = $this->extractArticleTitle($content, $raw);

        if (strpos($content, '<p>') === false && strpos($content, '<h') === false) {
            $content = $this->markdownToHtml($content);
        }

        return ['title' => $title, 'content' => $content];
    }

    // ── Internal utilities ─────────────────────────────────

    private function stripCodeFences(string $text): string {
        $text = trim($text);
        if (preg_match('/^```(?:html)?\s*\n(.*?)\n```$/s', $text, $m)) {
            return trim($m[1]);
        }
        return $text;
    }

    private function extractListAfterHeading(string $html, string $headingPattern): array {
        $items = [];
        $pattern = '/<h\d[^>]*>.*?(?:' . $headingPattern . ').*?<\/h\d>\s*<ul>(.*?)<\/ul>/si';
        if (preg_match($pattern, $html, $m)) {
            preg_match_all('/<li>(.*?)<\/li>/si', $m[1], $lis);
            $items = array_map('strip_tags', $lis[1] ?? []);
        }
        return $items;
    }

    private function markdownToHtml(string $md): string {
        $lines = explode("\n", $md);
        $html = '';
        $inList = false;

        foreach ($lines as $line) {
            $line = rtrim($line);
            if (preg_match('/^#{1,3}\s+(.+)$/', $line, $m)) {
                $level = substr_count($line, '#', 0, strpos($line, ' '));
                if ($inList) { $html .= "</ul>\n"; $inList = false; }
                $html .= "<h{$level}>" . trim($m[1]) . "</h{$level}>\n";
            } elseif (preg_match('/^[-*]\s+(.+)$/', $line, $m)) {
                if (!$inList) { $html .= "<ul>\n"; $inList = true; }
                $html .= "<li>" . trim($m[1]) . "</li>\n";
            } elseif (trim($line) === '') {
                if ($inList) { $html .= "</ul>\n"; $inList = false; }
            } else {
                if ($inList) { $html .= "</ul>\n"; $inList = false; }
                $html .= "<p>$line</p>\n";
            }
        }
        if ($inList) $html .= "</ul>\n";

        $html = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $html);
        $html = preg_replace('/\*(.+?)\*/', '<em>$1</em>', $html);

        return $html;
    }
}
