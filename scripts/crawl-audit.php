#!/usr/bin/env php
<?php
/**
 * SEO 收录审计爬虫 —— 模拟 Googlebot 爬取 sitemap 中的所有页面
 *
 * 针对每个页面进行以下评估：
 *   1. HTTP 状态码 / 响应时间
 *   2. <title>、<meta description>、<meta keywords>、canonical、robots 标签
 *   3. 正文内容字数（去标签后）
 *   4. H1 标签数量
 *   5. 内链 / 外链数量
 *   6. 图片数量及 alt 覆盖率
 *   7. 页面去重（基于内容指纹）
 *   8. 综合收录建议评分
 *
 * 用法:
 *   php scripts/crawl-audit.php [--limit=N] [--type=all|detail|article|list|core] [--output=json|table|csv]
 *
 * 示例:
 *   php scripts/crawl-audit.php --limit=20 --output=table
 *   php scripts/crawl-audit.php --type=article --output=csv > report.csv
 *   php scripts/crawl-audit.php --output=json > storage/crawl-audit.json
 */

if (php_sapi_name() !== 'cli') {
    die('CLI only.');
}

error_reporting(E_ALL);
ini_set('display_errors', '1');

// ─── 配置 ───────────────────────────────────────────────
define('SITE_URL', 'https://apps-microsoft.net');
define('SITEMAP_URL', SITE_URL . '/sitemap.xml');
define('GOOGLEBOT_UA', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
define('REQUEST_DELAY_MS', 200);
define('REQUEST_TIMEOUT', 15);

// ─── CLI 参数 ────────────────────────────────────────────
$opts = getopt('', ['limit::', 'type::', 'output::']);
$limit      = isset($opts['limit']) ? (int)$opts['limit'] : 0;
$filterType = isset($opts['type']) ? $opts['type'] : 'all';
$outputMode = isset($opts['output']) ? $opts['output'] : 'table';

// ─── 第 1 步：获取并解析 sitemap ─────────────────────────
echo "[" . date('Y-m-d H:i:s') . "] 正在获取 sitemap: " . SITEMAP_URL . "\n";

$sitemapXml = fetchUrl(SITEMAP_URL);
if (!$sitemapXml['body']) {
    die("无法获取 sitemap\n");
}

$urls = parseSitemap($sitemapXml['body']);
echo "[" . date('Y-m-d H:i:s') . "] Sitemap 共发现 " . count($urls) . " 个 URL\n";

// 按类型分类
foreach ($urls as $k => $u) {
    $urls[$k]['page_type'] = classifyUrl($u['loc']);
}

// 过滤类型
if ($filterType !== 'all') {
    $filtered = [];
    foreach ($urls as $u) {
        if ($u['page_type'] === $filterType) {
            $filtered[] = $u;
        }
    }
    $urls = $filtered;
    echo "[" . date('Y-m-d H:i:s') . "] 过滤后剩余 " . count($urls) . " 个 URL (类型: {$filterType})\n";
}

if ($limit > 0) {
    $urls = array_slice($urls, 0, $limit);
    echo "[" . date('Y-m-d H:i:s') . "] 限制爬取前 {$limit} 个\n";
}

// ─── 第 2 步：逐页爬取并分析 ─────────────────────────────
$results = [];
$contentFingerprints = [];
$total = count($urls);

echo "[" . date('Y-m-d H:i:s') . "] 开始爬取 {$total} 个页面...\n\n";

foreach ($urls as $i => $urlInfo) {
    $url = $urlInfo['loc'];
    $num = $i + 1;

    $response = fetchUrl($url);
    $analysis = analyzePage($url, $response, $urlInfo);

    // 内容指纹去重
    $fp = $analysis['content_fingerprint'];
    if ($fp && isset($contentFingerprints[$fp])) {
        $analysis['duplicate_of'] = $contentFingerprints[$fp];
        $analysis['is_duplicate'] = true;
    } else {
        if ($fp) {
            $contentFingerprints[$fp] = $url;
        }
        $analysis['duplicate_of'] = '';
        $analysis['is_duplicate'] = false;
    }

    // 收录决策
    $analysis['index_decision'] = makeIndexDecision($analysis);

    $results[] = $analysis;

    $decision = $analysis['index_decision'];
    $icon = $decision['should_index'] ? '+' : 'x';
    $score = $decision['score'];
    echo "  [{$num}/{$total}] {$icon} {$score}分 {$url}";
    if (!$decision['should_index']) {
        echo " <- " . $decision['primary_reason'];
    }
    echo "\n";

    usleep(REQUEST_DELAY_MS * 1000);
}

// ─── 第 3 步：统计汇总 ──────────────────────────────────
$stats = computeStats($results);

// ─── 第 4 步：输出报告 ──────────────────────────────────
echo "\n";

switch ($outputMode) {
    case 'json':
        echo json_encode([
            'crawl_time' => date('Y-m-d H:i:s'),
            'stats' => $stats,
            'pages' => $results,
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        break;

    case 'csv':
        outputCsv($results);
        break;

    default:
        outputReport($results, $stats);
}

// ═══════════════════════════════════════════════════════════
// 函数定义
// ═══════════════════════════════════════════════════════════

function fetchUrl($url)
{
    $start = microtime(true);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS      => 5,
        CURLOPT_TIMEOUT        => REQUEST_TIMEOUT,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_USERAGENT      => GOOGLEBOT_UA,
        CURLOPT_ENCODING       => 'gzip, deflate',
        CURLOPT_HTTPHEADER     => [
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8',
        ],
        CURLOPT_SSL_VERIFYPEER => false,
    ]);

    $body = curl_exec($ch);
    $elapsed = round((microtime(true) - $start) * 1000);
    $httpCode = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $finalUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    $error = curl_error($ch);
    curl_close($ch);

    return [
        'body'      => $body ?: '',
        'http_code' => $httpCode,
        'time_ms'   => $elapsed,
        'final_url' => $finalUrl,
        'error'     => $error,
    ];
}

function parseSitemap($xml)
{
    libxml_use_internal_errors(true);
    $doc = simplexml_load_string($xml);
    if (!$doc) {
        die("无法解析 sitemap XML\n");
    }

    $urls = [];
    $namespaces = $doc->getNamespaces(true);
    $ns = isset($namespaces['']) ? $namespaces[''] : '';

    if ($ns) {
        $doc->registerXPathNamespace('sm', $ns);
        $entries = $doc->xpath('//sm:url');
    } else {
        $entries = isset($doc->url) ? $doc->url : [];
    }

    foreach ($entries as $entry) {
        if ($ns) {
            $children = $entry->children($ns);
            $loc = (string)$children->loc;
            $lastmod = (string)(isset($children->lastmod) ? $children->lastmod : '');
            $changefreq = (string)(isset($children->changefreq) ? $children->changefreq : '');
            $priority = (string)(isset($children->priority) ? $children->priority : '');
        } else {
            $loc = (string)(isset($entry->loc) ? $entry->loc : '');
            $lastmod = (string)(isset($entry->lastmod) ? $entry->lastmod : '');
            $changefreq = (string)(isset($entry->changefreq) ? $entry->changefreq : '');
            $priority = (string)(isset($entry->priority) ? $entry->priority : '');
        }

        if ($loc) {
            $urls[] = [
                'loc'        => $loc,
                'lastmod'    => $lastmod,
                'changefreq' => $changefreq,
                'priority'   => $priority ? (float)$priority : 0.5,
            ];
        }
    }

    return $urls;
}

function classifyUrl($url)
{
    $path = parse_url($url, PHP_URL_PATH);
    if (!$path) $path = '/';

    if ($path === '/' || $path === '/apps' || $path === '/games' || $path === '/about') {
        return 'core';
    }
    if (preg_match('#^/articles(/\d+)?$#', $path)) {
        return 'list';
    }
    if (preg_match('#^/article/\d+$#', $path)) {
        return 'article';
    }
    if (preg_match('#^/detail/#', $path)) {
        return 'detail';
    }
    return 'product_alias';
}

function analyzePage($url, $response, $urlInfo)
{
    $html = $response['body'];
    $result = [
        'url'            => $url,
        'page_type'      => $urlInfo['page_type'],
        'sitemap_priority' => $urlInfo['priority'],
        'lastmod'        => $urlInfo['lastmod'],
        'http_code'      => $response['http_code'],
        'response_time_ms' => $response['time_ms'],
        'final_url'      => $response['final_url'],
        'has_redirect'   => ($response['final_url'] !== $url),
        'error'          => $response['error'],
    ];

    if ($response['http_code'] < 200 || $response['http_code'] >= 400 || !$html) {
        $result += [
            'title' => '', 'meta_description' => '', 'meta_keywords' => '',
            'canonical' => '', 'robots_meta' => '', 'h1_count' => 0, 'h1_text' => '',
            'word_count' => 0, 'text_content' => '', 'internal_links' => 0,
            'external_links' => 0, 'image_count' => 0, 'images_with_alt' => 0,
            'has_structured_data' => false, 'content_fingerprint' => '',
        ];
        return $result;
    }

    // Title
    preg_match('/<title[^>]*>(.*?)<\/title>/is', $html, $m);
    $result['title'] = trim(html_entity_decode(isset($m[1]) ? $m[1] : '', ENT_QUOTES, 'UTF-8'));

    // Meta description
    preg_match('/<meta\s[^>]*name=["\']description["\']\s[^>]*content=["\']([^"\']*)["\'][^>]*>/is', $html, $m);
    if (empty($m[1])) {
        preg_match('/<meta\s[^>]*content=["\']([^"\']*)["\'][^>]*name=["\']description["\'][^>]*>/is', $html, $m);
    }
    $result['meta_description'] = trim(html_entity_decode(isset($m[1]) ? $m[1] : '', ENT_QUOTES, 'UTF-8'));

    // Meta keywords
    preg_match('/<meta\s[^>]*name=["\']keywords["\']\s[^>]*content=["\']([^"\']*)["\'][^>]*>/is', $html, $m);
    if (empty($m[1])) {
        preg_match('/<meta\s[^>]*content=["\']([^"\']*)["\'][^>]*name=["\']keywords["\'][^>]*>/is', $html, $m);
    }
    $result['meta_keywords'] = trim(isset($m[1]) ? $m[1] : '');

    // Canonical
    preg_match('/<link\s[^>]*rel=["\']canonical["\']\s[^>]*href=["\']([^"\']*)["\'][^>]*>/is', $html, $m);
    if (empty($m[1])) {
        preg_match('/<link\s[^>]*href=["\']([^"\']*)["\'][^>]*rel=["\']canonical["\'][^>]*>/is', $html, $m);
    }
    $result['canonical'] = trim(isset($m[1]) ? $m[1] : '');

    // Robots meta
    preg_match('/<meta\s[^>]*name=["\']robots["\']\s[^>]*content=["\']([^"\']*)["\'][^>]*>/is', $html, $m);
    $result['robots_meta'] = trim(isset($m[1]) ? $m[1] : '');

    // H1 tags
    preg_match_all('/<h1[^>]*>(.*?)<\/h1>/is', $html, $h1s);
    $result['h1_count'] = count($h1s[1]);
    $result['h1_text'] = !empty($h1s[1]) ? trim(strip_tags($h1s[1][0])) : '';

    // 提取主体内容文本（去掉 script/style/nav/header/footer/noscript）
    $contentHtml = $html;
    $contentHtml = preg_replace('/<(script|style|nav|header|footer|noscript)[^>]*>.*?<\/\1>/is', '', $contentHtml);
    $textContent = trim(preg_replace('/\s+/u', ' ', strip_tags($contentHtml)));
    $result['word_count'] = mb_strlen($textContent, 'UTF-8');
    $result['text_content'] = mb_substr($textContent, 0, 500);

    // 内容指纹（用于去重检测）
    $normalized = preg_replace('/\s+/', '', mb_strtolower($textContent, 'UTF-8'));
    $result['content_fingerprint'] = $result['word_count'] > 50 ? md5(mb_substr($normalized, 0, 2000)) : '';

    // 链接分析
    preg_match_all('/<a\s[^>]*href=["\']([^"\'#]*)["\'][^>]*>/is', $html, $links);
    $internal = 0;
    $external = 0;
    foreach ($links[1] as $href) {
        $href = trim($href);
        if (!$href || strpos($href, '#') === 0 || strpos($href, 'javascript:') === 0) {
            continue;
        }
        if (strpos($href, '/') === 0 || strpos($href, 'apps-microsoft.net') !== false) {
            $internal++;
        } else {
            $external++;
        }
    }
    $result['internal_links'] = $internal;
    $result['external_links'] = $external;

    // 图片分析
    preg_match_all('/<img\s[^>]*>/is', $html, $imgs);
    $totalImgs = count($imgs[0]);
    $withAlt = 0;
    foreach ($imgs[0] as $imgTag) {
        if (preg_match('/alt=["\'][^"\']+["\']/i', $imgTag)) {
            $withAlt++;
        }
    }
    $result['image_count'] = $totalImgs;
    $result['images_with_alt'] = $withAlt;

    // 结构化数据
    $result['has_structured_data'] = (
        strpos($html, 'application/ld+json') !== false ||
        strpos($html, 'itemtype=') !== false ||
        strpos($html, 'itemprop=') !== false
    );

    return $result;
}

/**
 * 收录决策引擎
 *
 * 评分规则 (满分100)：
 *   HTTP 状态正常:    +15
 *   有 title:         +10
 *   有 meta desc:     +10
 *   有 canonical:     +5
 *   有 H1:            +5
 *   内容字数:         0~25 (线性: 100字=5, 500字=15, 1000+=25)
 *   非重复内容:       +10
 *   有结构化数据:     +5
 *   有内链:           +5
 *   有图片且alt好:    +5
 *   响应速度 <2s:     +5
 *
 * 扣分项：
 *   robots noindex:   直接不收录
 *   重复内容:         -15
 *   4xx/5xx:          直接不收录
 *   内容 <50字:       -10
 *   列表分页 (>5):    -5
 */
function makeIndexDecision($page)
{
    $score = 0;
    $reasons = [];
    $penalties = [];

    // 直接排除条件
    if ($page['http_code'] >= 400 || $page['http_code'] === 0) {
        return [
            'should_index' => false,
            'score' => 0,
            'grade' => 'F',
            'primary_reason' => "HTTP {$page['http_code']}",
            'reasons' => ["HTTP 状态码异常: {$page['http_code']}"],
            'penalties' => [],
        ];
    }

    if ($page['robots_meta'] && strpos(strtolower($page['robots_meta']), 'noindex') !== false) {
        return [
            'should_index' => false,
            'score' => 0,
            'grade' => 'F',
            'primary_reason' => 'robots noindex',
            'reasons' => ['页面明确设置了 noindex'],
            'penalties' => [],
        ];
    }

    // 基础 SEO 元素
    if ($page['http_code'] >= 200 && $page['http_code'] < 400) {
        $score += 15;
        $reasons[] = 'HTTP 正常 (+15)';
    }

    if (!empty($page['title'])) {
        $score += 10;
        $reasons[] = '有 title (+10)';
    } else {
        $penalties[] = '缺少 title';
    }

    if (!empty($page['meta_description'])) {
        $score += 10;
        $reasons[] = '有 meta description (+10)';
    } else {
        $penalties[] = '缺少 meta description';
    }

    if (!empty($page['canonical'])) {
        $score += 5;
        $reasons[] = '有 canonical (+5)';
    }

    if ($page['h1_count'] === 1) {
        $score += 5;
        $reasons[] = '有且仅有1个 H1 (+5)';
    } elseif ($page['h1_count'] > 1) {
        $score += 2;
        $penalties[] = "多个 H1 ({$page['h1_count']}个)";
    } else {
        $penalties[] = '缺少 H1';
    }

    // 内容字数评分
    $wc = $page['word_count'];
    if ($wc >= 1000) {
        $score += 25;
        $reasons[] = "内容丰富 {$wc}字 (+25)";
    } elseif ($wc >= 500) {
        $bonus = 15 + (int)(($wc - 500) / 50);
        $bonus = min($bonus, 25);
        $score += $bonus;
        $reasons[] = "内容量 {$wc}字 (+{$bonus})";
    } elseif ($wc >= 100) {
        $bonus = 5 + (int)(($wc - 100) / 40);
        $bonus = min($bonus, 15);
        $score += $bonus;
        $reasons[] = "内容偏少 {$wc}字 (+{$bonus})";
    } else {
        $penalties[] = "内容极少 {$wc}字";
        $score -= 10;
    }

    // 去重
    if ($page['is_duplicate']) {
        $score -= 15;
        $penalties[] = "重复内容（与 {$page['duplicate_of']} 相似）";
    } else {
        $score += 10;
        $reasons[] = '内容唯一 (+10)';
    }

    // 结构化数据
    if ($page['has_structured_data']) {
        $score += 5;
        $reasons[] = '有结构化数据 (+5)';
    }

    // 内链
    if ($page['internal_links'] > 3) {
        $score += 5;
        $reasons[] = "内链丰富 ({$page['internal_links']}) (+5)";
    } elseif ($page['internal_links'] > 0) {
        $score += 2;
    }

    // 图片
    if ($page['image_count'] > 0) {
        $altRatio = $page['images_with_alt'] / $page['image_count'];
        if ($altRatio >= 0.8) {
            $score += 5;
            $reasons[] = '图片 alt 覆盖良好 (+5)';
        } elseif ($altRatio >= 0.5) {
            $score += 3;
        } else {
            $score += 1;
            $penalties[] = "图片 alt 覆盖低 ({$page['images_with_alt']}/{$page['image_count']})";
        }
    }

    // 响应速度
    if ($page['response_time_ms'] < 2000) {
        $score += 5;
        $reasons[] = "响应快 ({$page['response_time_ms']}ms) (+5)";
    } elseif ($page['response_time_ms'] > 5000) {
        $score -= 5;
        $penalties[] = "响应过慢 ({$page['response_time_ms']}ms)";
    }

    // 列表分页惩罚 —— 深度分页对 SEO 价值递减
    if ($page['page_type'] === 'list') {
        $path = parse_url($page['url'], PHP_URL_PATH);
        if (preg_match('#/articles/(\d+)$#', $path, $m) && (int)$m[1] > 5) {
            $score -= 5;
            $penalties[] = '深度列表分页 (-5)';
        }
    }

    // 产品 detail 页和别名页重复时给 detail 降权
    if ($page['page_type'] === 'detail' && $page['is_duplicate']) {
        $score -= 5;
        $penalties[] = 'detail 页与别名页重复 (-5)';
    }

    $score = max(0, min(100, $score));

    // 等级
    if ($score >= 75) { $grade = 'A'; }
    elseif ($score >= 60) { $grade = 'B'; }
    elseif ($score >= 45) { $grade = 'C'; }
    elseif ($score >= 30) { $grade = 'D'; }
    else { $grade = 'F'; }

    $shouldIndex = $score >= 45;

    $primaryReason = '';
    if (!$shouldIndex) {
        $primaryReason = !empty($penalties) ? $penalties[0] : '综合评分过低';
    }

    return [
        'should_index'   => $shouldIndex,
        'score'          => $score,
        'grade'          => $grade,
        'primary_reason' => $primaryReason,
        'reasons'        => $reasons,
        'penalties'      => $penalties,
    ];
}

function computeStats($results)
{
    $total = count($results);
    $indexable = 0;
    foreach ($results as $r) {
        if ($r['index_decision']['should_index']) {
            $indexable++;
        }
    }
    $noIndex = $total - $indexable;

    $byType = [];
    foreach ($results as $r) {
        $t = $r['page_type'];
        if (!isset($byType[$t])) {
            $byType[$t] = ['total' => 0, 'indexable' => 0, 'scores' => []];
        }
        $byType[$t]['total']++;
        $byType[$t]['scores'][] = $r['index_decision']['score'];
        if ($r['index_decision']['should_index']) {
            $byType[$t]['indexable']++;
        }
    }
    foreach ($byType as $k => $bt) {
        $byType[$k]['avg_score'] = $bt['scores'] ? round(array_sum($bt['scores']) / count($bt['scores']), 1) : 0;
        unset($byType[$k]['scores']);
    }

    $byGrade = ['A' => 0, 'B' => 0, 'C' => 0, 'D' => 0, 'F' => 0];
    foreach ($results as $r) {
        $g = $r['index_decision']['grade'];
        if (isset($byGrade[$g])) {
            $byGrade[$g]++;
        }
    }

    $duplicates = 0;
    $errors = 0;
    $totalScore = 0;
    foreach ($results as $r) {
        if ($r['is_duplicate']) $duplicates++;
        if ($r['http_code'] >= 400 || $r['http_code'] === 0) $errors++;
        $totalScore += $r['index_decision']['score'];
    }

    $avgScore = $total ? round($totalScore / $total, 1) : 0;

    return [
        'total_pages'   => $total,
        'indexable'     => $indexable,
        'no_index'      => $noIndex,
        'duplicates'    => $duplicates,
        'errors'        => $errors,
        'avg_score'     => $avgScore,
        'by_type'       => $byType,
        'by_grade'      => $byGrade,
    ];
}

function outputReport($results, $stats)
{
    $line = str_repeat('=', 80);
    $thin = str_repeat('-', 80);

    echo $line . "\n";
    echo "  SEO 收录审计报告  |  " . date('Y-m-d H:i:s') . "\n";
    echo "  站点: " . SITE_URL . "\n";
    echo $line . "\n\n";

    // 概览
    echo "  [总览]\n";
    echo "  总页面数:   {$stats['total_pages']}\n";
    echo "  建议收录:   {$stats['indexable']}  (" . round($stats['indexable'] / max(1, $stats['total_pages']) * 100) . "%)\n";
    echo "  不建议收录: {$stats['no_index']}  (" . round($stats['no_index'] / max(1, $stats['total_pages']) * 100) . "%)\n";
    echo "  重复页面:   {$stats['duplicates']}\n";
    echo "  错误页面:   {$stats['errors']}\n";
    echo "  平均评分:   {$stats['avg_score']}/100\n\n";

    // 按类型统计
    echo "  [按页面类型]\n";
    echo sprintf("  %-18s %-8s %-10s %-10s\n", '类型', '总数', '可收录', '平均分');
    echo "  " . str_repeat('-', 50) . "\n";
    foreach ($stats['by_type'] as $type => $data) {
        echo sprintf("  %-18s %-8d %-10d %-10s\n", $type, $data['total'], $data['indexable'], $data['avg_score']);
    }
    echo "\n";

    // 按等级分布
    echo "  [评分等级分布]\n";
    foreach ($stats['by_grade'] as $grade => $count) {
        $barLen = $stats['total_pages'] > 0 ? (int)($count / $stats['total_pages'] * 40) : 0;
        $bar = str_repeat('#', $barLen);
        echo sprintf("  %s: %4d  %s\n", $grade, $count, $bar);
    }
    echo "\n";

    // 不建议收录的页面
    $noIndexPages = [];
    foreach ($results as $r) {
        if (!$r['index_decision']['should_index']) {
            $noIndexPages[] = $r;
        }
    }
    if (!empty($noIndexPages)) {
        echo $thin . "\n";
        echo "  [不建议收录的页面]\n";
        echo $thin . "\n";
        foreach ($noIndexPages as $p) {
            $d = $p['index_decision'];
            echo sprintf("  x [%s] %d分  %s\n", $d['grade'], $d['score'], $p['url']);
            echo "    原因: {$d['primary_reason']}\n";
            if (!empty($d['penalties'])) {
                echo "    问题: " . implode('; ', $d['penalties']) . "\n";
            }
            echo "\n";
        }
    }

    // 重复页面
    $dupePages = [];
    foreach ($results as $r) {
        if ($r['is_duplicate']) {
            $dupePages[] = $r;
        }
    }
    if (!empty($dupePages)) {
        echo $thin . "\n";
        echo "  [重复内容页面]\n";
        echo $thin . "\n";
        foreach ($dupePages as $p) {
            echo "  * {$p['url']}\n";
            echo "    重复于: {$p['duplicate_of']}\n";
        }
        echo "\n";
    }

    // 详细结果表
    echo $thin . "\n";
    echo "  [详细页面评分]\n";
    echo $thin . "\n";
    echo sprintf("  %-5s %-5s %-4s %-6s %-6s %-50s\n", '等级', '分数', 'HTTP', '字数', '耗时', 'URL');
    echo "  " . str_repeat('-', 78) . "\n";
    foreach ($results as $r) {
        $d = $r['index_decision'];
        $icon = $d['should_index'] ? '+' : 'x';
        $urlDisplay = $r['url'];
        if (mb_strlen($urlDisplay) > 50) {
            $urlDisplay = mb_substr($urlDisplay, 0, 47) . '...';
        }
        echo sprintf("  %s%-4s %-5d %-4d %-6d %-6s %-50s\n",
            $icon, $d['grade'], $d['score'], $r['http_code'],
            $r['word_count'], $r['response_time_ms'] . 'ms',
            $urlDisplay
        );
    }

    echo "\n" . $line . "\n";
    echo "  收录建议总结:\n";
    echo "  * 建议将 {$stats['indexable']} 个页面提交 Google 索引\n";
    echo "  * 有 {$stats['duplicates']} 组重复内容，建议用 canonical 标签指向首选版本\n";
    if ($stats['errors'] > 0) {
        echo "  * 有 {$stats['errors']} 个错误页面需要修复\n";
    }

    $lowScore = 0;
    foreach ($results as $r) {
        if ($r['index_decision']['grade'] === 'D') $lowScore++;
    }
    if ($lowScore > 0) {
        echo "  * {$lowScore} 个页面评分较低 (D级)，建议优化内容后再提交收录\n";
    }
    echo $line . "\n";
}

function outputCsv($results)
{
    $fp = fopen('php://stdout', 'w');
    fputcsv($fp, [
        'URL', '页面类型', 'HTTP状态', '响应时间ms', '评分', '等级',
        '建议收录', '标题', 'Meta描述', '字数', 'H1数量',
        '内链数', '外链数', '图片数', 'Alt覆盖', '是否重复',
        '重复于', '主要问题'
    ]);

    foreach ($results as $r) {
        $d = $r['index_decision'];
        $altStr = $r['image_count'] > 0
            ? round($r['images_with_alt'] / $r['image_count'] * 100) . '%'
            : 'N/A';
        fputcsv($fp, [
            $r['url'], $r['page_type'], $r['http_code'], $r['response_time_ms'],
            $d['score'], $d['grade'],
            $d['should_index'] ? '是' : '否',
            $r['title'], $r['meta_description'], $r['word_count'], $r['h1_count'],
            $r['internal_links'], $r['external_links'], $r['image_count'],
            $altStr,
            $r['is_duplicate'] ? '是' : '否',
            $r['duplicate_of'],
            $d['primary_reason'],
        ]);
    }
    fclose($fp);
}
