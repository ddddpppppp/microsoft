<?php
/**
 * Crawler script to fetch detailed product information from Microsoft Store
 * for all own products (is_own_product = 1)
 * 
 * Run via browser: http://localhost:8080/scripts/crawl_own_products.php
 * Or with specific ms_id: http://localhost:8080/scripts/crawl_own_products.php?ms_id=9nztwsqntd0s
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);
set_time_limit(300);

define('BASE_PATH', dirname(__DIR__));

spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $baseDir = BASE_PATH . '/app/';
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) return;
    $relativeClass = substr($class, $len);
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';
    if (file_exists($file)) require $file;
});

header('Content-Type: text/html; charset=utf-8');

$db = App\Core\Database::getInstance();

// Get products to crawl
$specificMsId = $_GET['ms_id'] ?? '';
if ($specificMsId) {
    $products = $db->fetchAll("SELECT * FROM products WHERE ms_id = ?", [$specificMsId]);
} else {
    $products = $db->fetchAll("SELECT * FROM products WHERE is_own_product = 1 AND ms_id != ''");
}

if (empty($products)) {
    echo "<h2>No own products found to crawl</h2>";
    echo "<p>Make sure products have is_own_product = 1 and a valid ms_id</p>";
    exit;
}

echo "<h1>Crawling Own Products from Microsoft Store</h1>";
echo "<p>Found " . count($products) . " product(s) to process</p>";
echo "<hr>";

foreach ($products as $product) {
    $msId = $product['ms_id'];
    echo "<h3>Processing: {$product['title']} ({$msId})</h3>";
    
    // Fetch product details from Microsoft Store API
    $detailUrl = "https://apps.microsoft.com/api/ProductsDetails/GetPromoProductDetailsById/{$msId}?gl=HK&hl=zh-CN";
    $detailData = fetchJson($detailUrl);
    
    // Fetch related products
    $category = urlencode($product['category'] ?: 'Social');
    $productType = $product['product_type'] === 'game' ? 'Game' : 'Application';
    $relatedUrl = "https://apps.microsoft.com/api/Reco/GetRelatedProductsList/{$msId}?noItems=6&pgNo=1&productType={$productType}&filteredCategories={$category}&gl=HK&hl=zh-CN";
    $relatedData = fetchJson($relatedUrl);
    
    // Also try to scrape the HTML page for additional info
    $pageUrl = "https://apps.microsoft.com/detail/{$msId}?hl=zh-CN&gl=HK";
    $pageHtml = fetchHtml($pageUrl);
    
    $updates = [];
    
    // Parse detail data
    if ($detailData && !empty($detailData['items'])) {
        $item = $detailData['items'][0];
        
        if (!empty($item['description'])) {
            $updates['description'] = $item['description'];
        }
        if (!empty($item['averageRating'])) {
            $updates['rating'] = $item['averageRating'];
        }
        if (!empty($item['ratingCount'])) {
            $updates['rating_count'] = $item['ratingCount'];
        }
        if (!empty($item['publisherName'])) {
            $updates['developer'] = $item['publisherName'];
        }
        if (!empty($item['whatsNew'])) {
            $updates['whats_new'] = $item['whatsNew'];
        }
        if (!empty($item['releaseDateUtc'])) {
            $updates['release_date'] = date('Y/m/d', strtotime($item['releaseDateUtc']));
        }
        if (!empty($item['lastUpdateDateUtc'])) {
            $updates['last_update'] = date('Y/m/d', strtotime($item['lastUpdateDateUtc']));
        }
        if (!empty($item['approximateSizeInBytes'])) {
            $updates['app_size'] = formatBytes($item['approximateSizeInBytes']);
        }
        
        // Screenshots
        if (!empty($item['screenshots'])) {
            $screenshots = array_map(function($s) {
                return $s['url'] ?? '';
            }, $item['screenshots']);
            $screenshots = array_filter($screenshots);
            if ($screenshots) {
                $updates['screenshots'] = json_encode(array_values($screenshots));
            }
        }
        
        // Age rating
        if (!empty($item['productRatings'][0])) {
            $rating = $item['productRatings'][0];
            $updates['age_rating'] = $rating['ratingValue'] ?? '';
            $updates['age_rating_icon'] = $rating['ratingValueLogoUrl'] ?? '';
        }
        
        // Supported languages
        if (!empty($item['supportedLanguages'])) {
            $updates['supported_languages'] = implode(', ', $item['supportedLanguages']);
        }
        
        // Publisher info
        if (!empty($item['publisherSupportUrl'])) {
            $updates['publisher_support'] = $item['publisherSupportUrl'];
        }
        if (!empty($item['publisherWebsiteUrl'])) {
            $updates['publisher_website'] = $item['publisherWebsiteUrl'];
        }
        if (!empty($item['privacyPolicyUrl'])) {
            $updates['privacy_policy_url'] = $item['privacyPolicyUrl'];
        }
        
        // System requirements
        if (!empty($item['systemRequirements'])) {
            $updates['system_requirements'] = json_encode($item['systemRequirements']);
        }
    }
    
    // Parse from HTML if API didn't return data
    if ($pageHtml) {
        // Extract description if not from API
        if (empty($updates['description'])) {
            if (preg_match('/<h2[^>]*>说明<\/h2>\s*<p[^>]*>(.*?)<\/p>/s', $pageHtml, $m)) {
                $updates['description'] = strip_tags($m[1]);
            }
        }
        
        // Extract rating count
        if (empty($updates['rating_count'])) {
            if (preg_match('/(\d+)\s*个评级/', $pageHtml, $m)) {
                $updates['rating_count'] = (int)$m[1];
            }
        }
        
        // Extract what's new
        if (empty($updates['whats_new'])) {
            if (preg_match('/<h2[^>]*>此版本中的新增功能<\/h2>\s*(.*?)(?=<h2|<\/section)/s', $pageHtml, $m)) {
                $updates['whats_new'] = trim(strip_tags($m[1]));
            }
        }
        
        // Extract app size
        if (empty($updates['app_size'])) {
            if (preg_match('/近似大小.*?<\/h3>\s*<[^>]*>([^<]+)/s', $pageHtml, $m)) {
                $updates['app_size'] = trim($m[1]);
            }
        }
        
        // Extract last update
        if (empty($updates['last_update'])) {
            if (preg_match('/上次更新日期.*?<\/h3>\s*<[^>]*>([^<]+)/s', $pageHtml, $m)) {
                $updates['last_update'] = trim($m[1]);
            }
        }
        
        // Extract release date
        if (empty($updates['release_date'])) {
            if (preg_match('/发布日期.*?<\/h3>\s*<[^>]*>([^<]+)/s', $pageHtml, $m)) {
                $updates['release_date'] = trim($m[1]);
            }
        }
        
        // Extract screenshots from page
        if (empty($updates['screenshots'])) {
            preg_match_all('/store-images\.s-microsoft\.com\/image\/apps\.[^"\']+/i', $pageHtml, $matches);
            if (!empty($matches[0])) {
                $screenshots = array_unique($matches[0]);
                $screenshots = array_filter($screenshots, function($url) {
                    return strpos($url, 'Screenshot') !== false || strpos($url, 'screenshot') !== false;
                });
                if ($screenshots) {
                    $screenshots = array_map(function($url) {
                        return 'https://' . $url;
                    }, $screenshots);
                    $updates['screenshots'] = json_encode(array_values($screenshots));
                }
            }
        }
    }
    
    // Update database
    if (!empty($updates)) {
        $setClauses = [];
        $values = [];
        foreach ($updates as $field => $value) {
            $setClauses[] = "`{$field}` = ?";
            $values[] = $value;
        }
        $values[] = $product['id'];
        
        $sql = "UPDATE products SET " . implode(', ', $setClauses) . " WHERE id = ?";
        $db->query($sql, $values);
        
        echo "<ul>";
        foreach ($updates as $field => $value) {
            $displayValue = is_string($value) && strlen($value) > 100 ? substr($value, 0, 100) . '...' : $value;
            echo "<li><strong>{$field}</strong>: " . htmlspecialchars($displayValue) . "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p style='color:orange'>No data retrieved from API</p>";
    }
    
    // Handle related products
    if ($relatedData && !empty($relatedData['productsList'])) {
        // Clear existing related products
        $db->query("DELETE FROM related_products WHERE product_id = ?", [$product['id']]);
        
        $order = 0;
        foreach ($relatedData['productsList'] as $related) {
            $order++;
            $db->query(
                "INSERT INTO related_products (product_id, related_ms_id, related_title, related_icon_url, related_rating, related_category, related_price, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    $product['id'],
                    $related['productId'] ?? '',
                    $related['title'] ?? '',
                    $related['iconUrl'] ?? '',
                    $related['averageRating'] ?? 0,
                    $related['categories'][0] ?? '',
                    $related['displayPrice'] ?? '',
                    $order
                ]
            );
        }
        echo "<p style='color:green'>Added " . count($relatedData['productsList']) . " related products</p>";
    }
    
    echo "<hr>";
    
    // Rate limiting
    usleep(500000);
}

echo "<h2>Done!</h2>";

// Helper functions
function fetchJson($url) {
    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36\r\n" .
                       "Accept: application/json\r\n" .
                       "Accept-Language: zh-CN,zh;q=0.9\r\n",
            'timeout' => 30,
            'ignore_errors' => true,
        ],
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ],
    ]);
    
    $response = @file_get_contents($url, false, $context);
    if ($response === false) {
        return null;
    }
    
    return json_decode($response, true);
}

function fetchHtml($url) {
    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36\r\n" .
                       "Accept: text/html,application/xhtml+xml\r\n" .
                       "Accept-Language: zh-CN,zh;q=0.9\r\n",
            'timeout' => 30,
            'ignore_errors' => true,
        ],
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ],
    ]);
    
    return @file_get_contents($url, false, $context);
}

function formatBytes($bytes, $precision = 1) {
    $units = ['B', 'KB', 'MB', 'GB', 'TB'];
    $bytes = max($bytes, 0);
    $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
    $pow = min($pow, count($units) - 1);
    $bytes /= pow(1024, $pow);
    return round($bytes, $precision) . ' ' . $units[$pow];
}
