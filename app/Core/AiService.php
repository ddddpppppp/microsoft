<?php
namespace App\Core;

class AiService {

    private $config;

    public function __construct() {
        $this->config = require BASE_PATH . '/config/ai.php';
    }

    public function generate(string $provider, string $prompt, string $apiKeyOverride = ''): array {
        $method = 'call' . ucfirst($provider);
        if (!method_exists($this, $method)) {
            return ['success' => false, 'error' => "不支持的 AI 提供商: $provider"];
        }

        $cfg = $this->config[$provider] ?? [];
        $apiKey = $apiKeyOverride ?: ($cfg['api_key'] ?? '');
        if (empty($apiKey)) {
            return ['success' => false, 'error' => "{$provider} 的 API Key 未配置"];
        }

        try {
            return $this->$method($cfg, $apiKey, $prompt);
        } catch (\Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    private function callDeepseek(array $cfg, string $apiKey, string $prompt): array {
        $url = rtrim($cfg['base_url'], '/') . '/chat/completions';
        $body = [
            'model'    => $cfg['model'] ?? 'deepseek-chat',
            'messages' => [
                ['role' => 'system', 'content' => '你是一个专业的内容创作者，擅长撰写高质量、SEO友好的文章。请用HTML格式输出文章正文（不需要包含<html><body>等外层标签）。文章应包含适当的标题标签(h2,h3)、段落和列表。'],
                ['role' => 'user',   'content' => $prompt],
            ],
            'temperature' => 0.7,
            'max_tokens'  => 4096,
        ];

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

    private function callOpenai(array $cfg, string $apiKey, string $prompt): array {
        $url = rtrim($cfg['base_url'], '/') . '/v1/chat/completions';
        $body = [
            'model'    => $cfg['model'] ?? 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => '你是一个专业的内容创作者，擅长撰写高质量、SEO友好的文章。请用HTML格式输出文章正文（不需要包含<html><body>等外层标签）。文章应包含适当的标题标签(h2,h3)、段落和列表。'],
                ['role' => 'user',   'content' => $prompt],
            ],
            'temperature' => 0.7,
            'max_tokens'  => 4096,
        ];

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

    private function callGemini(array $cfg, string $apiKey, string $prompt): array {
        $model = $cfg['model'] ?? 'gemini-2.0-flash';
        $url = rtrim($cfg['base_url'], '/') . '/models/' . $model . ':generateContent?key=' . $apiKey;
        $body = [
            'contents' => [
                [
                    'parts' => [
                        ['text' => '你是一个专业的内容创作者，擅长撰写高质量、SEO友好的文章。请用HTML格式输出文章正文（不需要包含<html><body>等外层标签）。文章应包含适当的标题标签(h2,h3)、段落和列表。\n\n' . $prompt],
                    ],
                ],
            ],
            'generationConfig' => [
                'temperature' => 0.7,
                'maxOutputTokens' => 4096,
            ],
        ];

        $result = $this->httpPost($url, $body, ['Content-Type: application/json']);

        if (!$result['success']) return $result;

        $data = json_decode($result['body'], true);
        $content = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';
        if (empty($content)) {
            return ['success' => false, 'error' => 'Gemini 未返回内容', 'raw' => $result['body']];
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

    /**
     * Parse AI output and extract title + HTML content.
     * AI may return markdown or raw HTML; this normalizes it.
     */
    public function parseArticle(string $raw): array {
        $content = trim($raw);

        // Strip markdown code fences if present
        if (preg_match('/^```(?:html)?\s*\n(.*?)\n```$/s', $content, $m)) {
            $content = trim($m[1]);
        }

        // Try to extract a title from the first <h1> or <h2>
        $title = '';
        if (preg_match('/<h[12][^>]*>(.*?)<\/h[12]>/i', $content, $m)) {
            $title = strip_tags($m[1]);
        }

        // If content looks like markdown, do basic conversion
        if (strpos($content, '<p>') === false && strpos($content, '<h') === false) {
            $content = $this->markdownToHtml($content);
            if (empty($title) && preg_match('/^#\s+(.+)$/m', $raw, $m)) {
                $title = trim($m[1]);
            }
        }

        return ['title' => $title, 'content' => $content];
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

        // Bold / italic
        $html = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $html);
        $html = preg_replace('/\*(.+?)\*/', '<em>$1</em>', $html);

        return $html;
    }
}
