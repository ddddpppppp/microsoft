<?php
$distHtml = file_get_contents(__DIR__ . '/../../public/dist/index.html');
if ($distHtml === false) {
    echo '<!-- Build not found. Run: cd frontend && npm run build -->';
    $distHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><p>Build not found. Please run npm build.</p></body></html>';
}

$seoTitle = htmlspecialchars($title ?? 'Microsoft Store');
$seoKeywords = htmlspecialchars($keywords ?? '');
$seoDescription = htmlspecialchars($description ?? '');

$distHtml = preg_replace('/<title>.*?<\/title>/', '<title>' . $seoTitle . '</title>', $distHtml);

$metaTags = '';
if ($seoKeywords) {
    $metaTags .= '<meta name="keywords" content="' . $seoKeywords . '">' . "\n";
}
if ($seoDescription) {
    $metaTags .= '<meta name="description" content="' . $seoDescription . '">' . "\n";
}
$canonicalUrl = $canonical_url ?? '';
if ($canonicalUrl !== '') {
    $canonicalUrl = htmlspecialchars($canonicalUrl, ENT_QUOTES, 'UTF-8');
    $metaTags .= '<link rel="canonical" href="' . $canonicalUrl . '">' . "\n";
    $metaTags .= '<meta property="og:url" content="' . $canonicalUrl . '">' . "\n";
}

$ogTitle = $seoTitle;
$ogDesc = $seoDescription;
$ogImage = htmlspecialchars($og_image ?? '', ENT_QUOTES, 'UTF-8');
$ogType = $og_type ?? 'website';
$metaTags .= '<meta property="og:title" content="' . $ogTitle . '">' . "\n";
if ($ogDesc) {
    $metaTags .= '<meta property="og:description" content="' . $ogDesc . '">' . "\n";
}
$metaTags .= '<meta property="og:type" content="' . htmlspecialchars($ogType) . '">' . "\n";
$metaTags .= '<meta property="og:site_name" content="Microsoft Store">' . "\n";
if ($ogImage) {
    $metaTags .= '<meta property="og:image" content="' . $ogImage . '">' . "\n";
}
$metaTags .= '<meta name="twitter:card" content="' . ($ogImage ? 'summary_large_image' : 'summary') . '">' . "\n";
$metaTags .= '<meta name="twitter:title" content="' . $ogTitle . '">' . "\n";
if ($ogDesc) {
    $metaTags .= '<meta name="twitter:description" content="' . $ogDesc . '">' . "\n";
}
if ($ogImage) {
    $metaTags .= '<meta name="twitter:image" content="' . $ogImage . '">' . "\n";
}

$jsonLd = $json_ld ?? '';
if ($jsonLd) {
    $metaTags .= '<script type="application/ld+json">' . $jsonLd . '</script>' . "\n";
}

$distHtml = str_replace('</head>', $metaTags . '</head>', $distHtml);

$ssrNav = '<nav id="ssr-nav" style="max-width:1600px;margin:0 auto;padding:12px 38px;font-family:\'Segoe UI\',sans-serif;font-size:14px">';
$ssrNav .= '<a href="/" style="margin-right:16px;color:#005FB8;text-decoration:none">主页</a>';
$ssrNav .= '<a href="/apps" style="margin-right:16px;color:#005FB8;text-decoration:none">应用</a>';
$ssrNav .= '<a href="/games" style="margin-right:16px;color:#005FB8;text-decoration:none">游戏</a>';
$ssrNav .= '<a href="/articles" style="margin-right:16px;color:#005FB8;text-decoration:none">资讯</a>';
$ssrNav .= '<a href="/about" style="color:#005FB8;text-decoration:none">关于</a>';
$ssrNav .= '</nav>';

$seoContent = $seo_content ?? '';
$ssrBlock = $ssrNav;
if ($seoContent) {
    $ssrBlock .= "\n" . $seoContent;
}

$hideScript = '<script>customElements.whenDefined("ms-app").then(function(){var e=document.getElementById("seo-content");if(e)e.style.display="none";var n=document.getElementById("ssr-nav");if(n)n.style.display="none";})</script>';
$ssrBlock .= "\n" . $hideScript;

$distHtml = str_replace('<ms-app>', $ssrBlock . "\n<ms-app>", $distHtml);

echo $distHtml;
