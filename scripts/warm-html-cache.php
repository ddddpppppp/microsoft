#!/usr/bin/env php
<?php
/**
 * 预热片段缓存（单次 cron 每 5 分钟跑一次即可）。
 * - 列表：前 50 页先清缓存再请求，保证每 5 分钟刷新。
 * - 文章详情：只请求前 2000 条尚未生成缓存的（已有缓存的 1 年失效后再刷）。
 * - 其它（首页/应用/关于/产品详情）：只请求，缓存 1 年或 24h 失效后再刷。
 *
 * 用法: php scripts/warm-html-cache.php [base_url]
 *
 * Cron 每 5 分钟执行一次（分=0,5,10..55 时日月周=*）:
 *   (cron) cd /path/to/site && php scripts/warm-html-cache.php https://apps-microsoft.net >> storage/logs/warm-cache.log 2>&1
 */

if (php_sapi_name() !== 'cli') die('CLI only.');

define('BASE_PATH', dirname(__DIR__));
spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $base = BASE_PATH . '/app/' . str_replace('\\', '/', substr($class, strlen($prefix))) . '.php';
    if (strncmp($prefix, $class, strlen($prefix)) === 0 && file_exists($base)) require $base;
});

$argv = $argv ?? [];
$baseUrl = rtrim(getenv('SITE_BASE_URL') ?: 'http://localhost:8081', '/');
foreach ($argv as $arg) {
    if (strpos($arg, 'http') === 0) { $baseUrl = rtrim($arg, '/'); break; }
}

$data = \App\Core\HtmlCache::getWarmableUris();
foreach ($data['force_refresh_uris'] as $uri) {
    \App\Core\HtmlCache::forget($uri);
}
$paths = $data['uris'];
$total = count($paths);
echo '[' . date('Y-m-d H:i:s') . '] Warming ' . $total . ' URL(s), base=' . $baseUrl . "\n";

$ok = 0;
$fail = 0;
$ctx = stream_context_create(['http' => ['method' => 'GET', 'timeout' => 15, 'follow_location' => 1]]);
foreach ($paths as $i => $path) {
    $url = $baseUrl . $path;
    $body = @file_get_contents($url, false, $ctx);
    $code = 200;
    if (isset($http_response_header) && is_array($http_response_header) && isset($http_response_header[0])
        && preg_match('/^HTTP\/\S+\s+(\d+)/', $http_response_header[0], $m)) {
        $code = (int)$m[1];
    }
    $success = $body !== false && $code >= 200 && $code < 400;
    if ($success) { $ok++; echo '  ' . ($i + 1) . '/' . $total . ' OK ' . $path . "\n"; }
    else { $fail++; echo '  ' . ($i + 1) . '/' . $total . ' FAIL ' . $path . ' (HTTP ' . $code . ")\n"; }
    usleep(100000);
}

echo '[' . date('Y-m-d H:i:s') . '] Done. OK=' . $ok . ' FAIL=' . $fail . "\n";
