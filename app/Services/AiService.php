<?php
namespace App\Services;

class AiService {

    private $config;

    private static $defaultSystemPrompt = '你是一个专业的内容创作者。请根据用户要求生成高质量内容。';

    private static $stylePrompts = [
        'seo' => '你是一个有多年经验的软件评测博主，文风自然真实，像在跟朋友聊天。用HTML输出（不含<html><body>标签）。'
            . "\n严格遵守以下写作要求："
            . "\n1. 正文以H2主标题开头，用H2/H3自然分层。"
            . "\n2. 禁止模板化开头——不要写「在当今XX时代」「随着XX的发展」「在数字化浪潮中」之类的废话。直接切入主题。"
            . "\n3. 段落要有信息量：包含具体功能名称、版本号、操作步骤、对比数据等实质内容。禁止写正确但空洞的万金油句子。"
            . "\n4. 语气自然口语化，可以用第一人称「我」，像真人写的博客文章。允许表达主观好恶。"
            . "\n5. 每篇文章的结构必须不同——不要每次都是「为什么选官方→怎么下载→功能介绍→总结号召」这一套。根据主题自由组织。"
            . "\n6. 善用列表和加粗，但不要滥用。结尾不需要「行动号召」，自然收尾即可。"
            . "\n7. 标题要具体有吸引力，包含产品名或关键信息，不要泛泛而谈。",

        'media' => '你是一个说话直接、有个性的自媒体作者，擅长用犀利观点吸引读者。用HTML输出（不含<html><body>标签）。'
            . "\n严格遵守以下写作要求："
            . "\n1. 正文以H2主标题开头，标题用数字/疑问/反差吸引点击。"
            . "\n2. 禁止AI套话——不要写「在当今XX时代」「不可或缺」「至关重要」。"
            . "\n3. 开门见山，第一段就抛出核心观点或争议点。"
            . "\n4. 语言口语化有温度，段落短小（2-3句），像朋友间安利。"
            . "\n5. 必须包含具体细节：功能名、价格、与竞品的对比等。"
            . "\n6. 结尾引导互动但要自然，不要生硬地喊「立即下载」。",

        'geo' => '你是一个技术领域的权威知识贡献者，你的内容会被AI搜索引擎引用。用HTML输出（不含<html><body>标签）。'
            . "\n严格遵守以下写作要求："
            . "\n1. 正文以H2主标题开头，用H2/H3组织清晰的知识结构。"
            . "\n2. 每个段落必须包含可引用的事实性陈述：定义、数据、步骤、对比。"
            . "\n3. 禁止空话套话，每句话都要有信息增量。"
            . "\n4. 用加粗标注关键概念和数据，善用编号列表。"
            . "\n5. 语气专业客观但不死板，像百科全书与技术博客的结合。",
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

        $lines = [
            "关键词约束（严格执行）：",
            "1. 只允许使用下方给出的关键词，不要创造近义词或替换词。",
            "2. 有 URL 的关键词，必须严格写成 <a href=\"URL\">关键词</a>，锚文本必须与关键词逐字一致。",
            "3. 禁止把有 URL 的关键词替换成其它锚文本（例如“Microsoft Store”等）。",
            "4. 禁止新增任何未在清单中的 <a href> 链接。",
            "5. 每个关键词出现次数必须严格等于给定次数（×N），不能多也不能少。",
            "6. 输出前请自检一次以上规则。",
            "",
            "关键词清单：",
        ];
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
        $expectedUrlToWords = [];
        $expectedWordToRepeat = [];
        $actualLinkedWordCounts = [];

        foreach ($vocabs as $v) {
            $word = trim((string)($v['word'] ?? ''));
            if ($word === '') {
                continue;
            }
            $expectedWordToRepeat[$word] = max(1, (int)($v['repeat'] ?? 1));
            $url = trim((string)($v['url'] ?? ''));
            if ($url !== '') {
                if (!isset($expectedUrlToWords[$url])) {
                    $expectedUrlToWords[$url] = [];
                }
                $expectedUrlToWords[$url][] = $word;
                $actualLinkedWordCounts[$word] = 0;
            }
        }

        if (!empty($expectedUrlToWords)) {
            if (preg_match_all('/<a\b[^>]*href\s*=\s*(["\'])(.*?)\1[^>]*>(.*?)<\/a>/is', $content, $anchorMatches, PREG_SET_ORDER)) {
                foreach ($anchorMatches as $anchor) {
                    $href = trim(html_entity_decode($anchor[2] ?? '', ENT_QUOTES | ENT_HTML5, 'UTF-8'));
                    $anchorText = self::normalizeHtmlText($anchor[3] ?? '');

                    if (!isset($expectedUrlToWords[$href])) {
                        $mismatches[] = [
                            'type' => 'unexpected_link',
                            'href' => $href,
                            'text' => $anchorText,
                        ];
                        continue;
                    }

                    $allowedWords = $expectedUrlToWords[$href];
                    if (!in_array($anchorText, $allowedWords, true)) {
                        $mismatches[] = [
                            'type' => 'anchor_text_mismatch',
                            'href' => $href,
                            'expected_words' => $allowedWords,
                            'actual_text' => $anchorText,
                        ];
                        continue;
                    }

                    $actualLinkedWordCounts[$anchorText] = ($actualLinkedWordCounts[$anchorText] ?? 0) + 1;
                }
            }

            foreach ($actualLinkedWordCounts as $word => $count) {
                $expected = (int)($expectedWordToRepeat[$word] ?? 0);
                if ($count !== $expected) {
                    $mismatches[] = [
                        'type' => 'linked_word_count_mismatch',
                        'word' => $word,
                        'expected' => $expected,
                        'actual' => $count,
                    ];
                }
            }
        }

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

    private static function normalizeHtmlText(string $html): string {
        $plain = html_entity_decode(strip_tags($html), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $plain = preg_replace('/\s+/u', ' ', $plain);
        return trim((string)$plain);
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
     * Parse AI output into title + HTML content + SEO fields.
     *
     * @param string $raw          AI raw output
     * @param array  $seoKeywords  Plain-text keywords for keywords & meta_description fields
     */
    public function parseArticle(string $raw, array $seoKeywords = []): array {
        $content = $this->stripCodeFences($raw);

        $title = $this->extractArticleTitle($content, $raw);

        if (strpos($content, '<p>') === false && strpos($content, '<h') === false) {
            $content = $this->markdownToHtml($content);
            if ($title === '' && preg_match('/^#{1,3}\s+(.+)$/m', $raw, $m)) {
                $title = trim($m[1]);
            }
        }

        if ($title === '') {
            $title = $this->extractFirstLineAsTitle($content);
        }

        $keywords = !empty($seoKeywords) ? implode(',', $seoKeywords) : '';

        $metaDesc = $this->extractMetaDescription($content, $title);

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
        if (preg_match('/<h[123][^>]*>\s*(.*?)\s*<\/h[123]>/is', $content, $m)) {
            $t = trim(strip_tags($m[1]));
            if ($t !== '') {
                return $t;
            }
        }
        if (preg_match('/^#{1,3}\s+(.+)$/m', $raw, $m)) {
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
     * Extract meta description from HTML content, skipping h1-h3 headings.
     * Takes the first paragraph of body text, trimmed to 160 chars.
     */
    private function extractMetaDescription(string $html, string $title): string {
        $stripped = preg_replace('/<h[1-3][^>]*>.*?<\/h[1-3]>/is', '', $html);
        $plain = trim(html_entity_decode(strip_tags($stripped), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
        $plain = preg_replace('/\s+/u', ' ', $plain);
        if ($title !== '') {
            $plain = trim(str_replace($title, '', $plain));
        }
        if ($plain === '') {
            return '';
        }
        return mb_substr($plain, 0, 160);
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

    // ── Slug & Author generators ────────────────────────────

    private static $authorPool = [
        '张小磊', '林一凡', '王思远', '陈知行', '李默然',
        '周文韬', '赵楠楠', '杨晓峰', '刘思源', '吴子涵',
    ];

    /**
     * Pick a random author name from the pool.
     */
    public static function randomAuthor(): string
    {
        return self::$authorPool[array_rand(self::$authorPool)];
    }

    /**
     * Max length for slug (chars). Truncate at last segment boundary to keep readable.
     */
    private static $maxSlugLength = 20;

    /**
     * Generate a URL-friendly slug from a Chinese/English title.
     * Uses pinyin transliteration for Chinese chars, falls back to timestamp if empty.
     * Slug is capped at ~50 chars, truncated at last complete pinyin segment.
     */
    public static function titleToSlug(string $title): string
    {
        $title = trim(strip_tags($title));
        if ($title === '') {
            return time() . '-' . mt_rand(1000, 9999);
        }

        $base = self::pinyinSlugify($title);

        // 拼音结果过短、为空、或全是未收录字（曾为 x-x-x-...）时，用时间戳
        if ($base === '' || strlen($base) < 5 || preg_match('/^(x-)*x$/i', $base)) {
            $base = time() . '-' . mt_rand(1000, 9999);
        }

        // 过长时在最后一个完整段处截断，避免截断拼音中间
        if (strlen($base) > self::$maxSlugLength) {
            $cut = substr($base, 0, self::$maxSlugLength);
            $lastDash = strrpos($cut, '-');
            $base = $lastDash > 20 ? substr($base, 0, $lastDash) : substr($base, 0, self::$maxSlugLength);
        }

        $db = \App\Core\Database::getInstance();
        $slug = $base;
        $suffix = 0;

        while (true) {
            $exists = $db->fetch(
                "SELECT id FROM articles WHERE slug = ? LIMIT 1",
                [$slug]
            );
            if (!$exists) {
                break;
            }
            $suffix++;
            $slug = $base . '-' . $suffix;
        }

        return $slug;
    }

    /**
     * Convert Chinese text to pinyin slug. Simple built-in conversion
     * covering common chars; no external library needed.
     */
    private static function pinyinSlugify(string $text): string
    {
        $text = mb_strtolower($text, 'UTF-8');

        $text = preg_replace('/[\x{ff01}-\x{ff5e}]/u', '', $text);
        $text = preg_replace('/[\x{3000}-\x{303F}\x{2014}\x{2026}\x{00B7}\x{201C}\x{201D}\x{2018}\x{2019}\x{300A}\x{300B}]/u', ' ', $text);

        $result = '';
        $len = mb_strlen($text, 'UTF-8');
        for ($i = 0; $i < $len; $i++) {
            $char = mb_substr($text, $i, 1, 'UTF-8');
            $ord = mb_ord($char, 'UTF-8');

            if (($ord >= 0x41 && $ord <= 0x7A) || ($ord >= 0x30 && $ord <= 0x39)) {
                $result .= $char;
            } elseif ($char === ' ' || $char === '-' || $char === '_') {
                $result .= '-';
            } elseif ($ord >= 0x4E00 && $ord <= 0x9FFF) {
                $py = self::charToPinyin($char);
                $result .= ($result !== '' && substr($result, -1) !== '-' ? '-' : '') . $py;
            }
        }

        $result = preg_replace('/-{2,}/', '-', $result);
        $result = trim($result, '-');

        return $result;
    }

    /**
     * Single Chinese character to pinyin (covers ~3000 most common chars).
     * Returns empty string for unmapped chars so slug is not filled with "x".
     * Loads map from BASE_PATH or, if not set, relative to this file (app/Services -> ../../config).
     */
    private static function charToPinyin(string $char): string
    {
        static $map = null;
        if ($map === null) {
            $mapFile = null;
            if (defined('BASE_PATH')) {
                $candidate = BASE_PATH . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'pinyin_map.php';
                if (@is_readable($candidate)) {
                    $mapFile = $candidate;
                }
            }
            if ($mapFile === null && @is_readable(__DIR__ . '/../../config/pinyin_map.php')) {
                $mapFile = realpath(__DIR__ . '/../../config/pinyin_map.php') ?: __DIR__ . '/../../config/pinyin_map.php';
            }
            if ($mapFile !== null) {
                $map = require $mapFile;
                if (!is_array($map)) {
                    $map = [];
                }
            } else {
                $map = [];
            }
        }
        return isset($map[$char]) ? $map[$char] : '';
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
