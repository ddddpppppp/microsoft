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
$distHtml = str_replace('</head>', $metaTags . '</head>', $distHtml);

echo $distHtml;
