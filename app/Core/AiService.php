<?php
namespace App\Core;

class AiService {

    private $config;

    private static $defaultSystemPrompt = '你是一个专业的内容创作者。请根据用户要求生成高质量内容。';

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

        try {
            return $this->$method($cfg, $apiKey, $prompt, $params);
        } catch (\Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    // ── Preset prompt builders ─────────────────────────────

    /**
     * Generate an article. Convenience wrapper with an article-optimised system prompt.
     */
    public function generateArticle(string $provider, string $prompt, array $options = []): array {
        $options['system_prompt'] = $options['system_prompt']
            ?? '你是一个专业的内容创作者，擅长撰写高质量、SEO友好的文章。'
             . '请用HTML格式输出文章正文（不需要包含<html><body>等外层标签）。'
             . '文章应包含适当的标题标签(h2,h3)、段落和列表。';
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
            $prompt = "请为产品「{$productName}」生成 {$count} 条用户评价。";
        }

        $prompt .= "\n\n请严格按照以下JSON格式输出：\n"
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
            . "注意：rating 范围是 1.0-5.0，author_name 用中文网名，评分分布要自然合理。";

        $result = $this->generate($provider, $prompt, $options);
        if (!$result['success']) return $result;

        $content = $this->stripCodeFences($result['content']);
        $data = json_decode($content, true);
        if (!$data || !isset($data['reviews'])) {
            return ['success' => false, 'error' => 'AI 返回的JSON格式无法解析', 'raw' => $result['content']];
        }

        return ['success' => true, 'reviews' => $data['reviews']];
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
        $model = $cfg['model'] ?? 'gemini-2.0-flash';
        $url = rtrim($cfg['base_url'], '/') . '/models/' . $model . ':generateContent?key=' . $apiKey;
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

        $result = $this->httpPost($url, $body, ['Content-Type: application/json']);
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
            return ['success' => false, 'error' => "cURL 错误: $error"];
        }
        if ($httpCode < 200 || $httpCode >= 300) {
            return ['success' => false, 'error' => "HTTP $httpCode: $response"];
        }
        return ['success' => true, 'body' => $response];
    }

    // ── Content parsers ────────────────────────────────────

    /**
     * Parse AI output into title + HTML content (for articles).
     */
    public function parseArticle(string $raw): array {
        $content = $this->stripCodeFences($raw);

        $title = '';
        if (preg_match('/<h[12][^>]*>(.*?)<\/h[12]>/i', $content, $m)) {
            $title = strip_tags($m[1]);
        }

        if (strpos($content, '<p>') === false && strpos($content, '<h') === false) {
            $content = $this->markdownToHtml($content);
            if (empty($title) && preg_match('/^#\s+(.+)$/m', $raw, $m)) {
                $title = trim($m[1]);
            }
        }

        return ['title' => $title, 'content' => $content];
    }

    /**
     * Parse AI output into structured review data (for product reviews).
     * Returns: title, content (HTML), rating (1-5), pros[], cons[], summary
     */
    public function parseReview(string $raw): array {
        $content = $this->stripCodeFences($raw);

        $title = '';
        if (preg_match('/<h[12][^>]*>(.*?)<\/h[12]>/i', $content, $m)) {
            $title = strip_tags($m[1]);
        }

        if (strpos($content, '<p>') === false && strpos($content, '<h') === false) {
            $content = $this->markdownToHtml($content);
            if (empty($title) && preg_match('/^#\s+(.+)$/m', $raw, $m)) {
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

        $title = '';
        if (preg_match('/<h[12][^>]*>(.*?)<\/h[12]>/i', $content, $m)) {
            $title = strip_tags($m[1]);
        } elseif (preg_match('/^#\s+(.+)$/m', $raw, $m)) {
            $title = trim($m[1]);
        }

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
