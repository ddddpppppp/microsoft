<?php
// 只显示重要错误（排除 Notice / Deprecated / Strict），避免 session_start 等提示刷屏
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT);
ini_set('display_errors', 1);

define('BASE_PATH', __DIR__);
// 确保 session 目录可写
$sessionPath = BASE_PATH . '/storage/sessions';
if (!is_dir($sessionPath)) {
    mkdir($sessionPath, 0777, true);
}
ini_set('session.save_path', $sessionPath);
session_start();

spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $baseDir = BASE_PATH . '/app/';
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) return;
    $relativeClass = substr($class, $len);
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';
    if (file_exists($file)) require $file;
});

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';

// Serve /assets/* and /dist/* from /public without requiring filesystem symlinks.
$serveMappedStatic = function (string $prefix, string $targetRoot) use ($uri): bool {
    if (strpos($uri, $prefix) !== 0) {
        return false;
    }

    $relativePath = ltrim(substr($uri, strlen($prefix)), '/');
    if ($relativePath === '' || strpos($relativePath, '..') !== false) {
        http_response_code(404);
        exit;
    }

    $filePath = BASE_PATH . $targetRoot . '/' . $relativePath;
    if (!is_file($filePath)) {
        http_response_code(404);
        exit;
    }

    $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
    $mimeMap = [
        'css' => 'text/css; charset=UTF-8',
        'js' => 'application/javascript; charset=UTF-8',
        'map' => 'application/json; charset=UTF-8',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'webp' => 'image/webp',
        'svg' => 'image/svg+xml',
        'ico' => 'image/x-icon',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf' => 'font/ttf',
    ];

    header('Content-Type: ' . ($mimeMap[$extension] ?? 'application/octet-stream'));
    header('Content-Length: ' . (string)filesize($filePath));
    readfile($filePath);
    exit;
};

$serveMappedStatic('/assets/', '/public/assets');
$serveMappedStatic('/dist/', '/public/dist');

$app = new App\Core\App();
$router = $app->getRouter();

// Static file passthrough (for normal web server static handling).
if (preg_match('/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|map)$/i', $uri)) {
    return false;
}

// SEO
$router->get('/sitemap.xml', [\App\Controllers\SitemapController::class, 'index']);
$router->get('/robots.txt', [\App\Controllers\RobotsController::class, 'index']);

// API routes
$router->group('/api', function($r) {
    $r->get('/home', [\App\Controllers\ApiController::class, 'home']);
    $r->get('/record-home-view', [\App\Controllers\ApiController::class, 'recordHomeView']);
    $r->get('/apps', [\App\Controllers\ApiController::class, 'apps']);
    $r->get('/games', [\App\Controllers\ApiController::class, 'games']);
    $r->get('/about', [\App\Controllers\ApiController::class, 'about']);
    $r->get('/product/{id}', [\App\Controllers\ApiController::class, 'product']);
    $r->get('/product/{id}/related', [\App\Controllers\ApiController::class, 'productRelated']);
    $r->get('/product/{id}/reviews', [\App\Controllers\ApiController::class, 'productReviews']);
    $r->get('/product-by-url', [\App\Controllers\ApiController::class, 'productByUrl']);
    $r->get('/search', [\App\Controllers\ApiController::class, 'search']);
    $r->get('/products-missing-description', [\App\Controllers\ApiController::class, 'productsMissingDescription']);
    $r->post('/product/{id}/description', [\App\Controllers\ApiController::class, 'updateProductDescription']);
    $r->post('/product/{id}/social-card-image', [\App\Controllers\ApiController::class, 'updateProductSocialCardImage']);
    $r->post('/product/{id}/download-click', [\App\Controllers\ApiController::class, 'productDownloadClick']);
    $r->get('/articles', [\App\Controllers\ApiController::class, 'articles']);
    $r->get('/article/{slug}', [\App\Controllers\ApiController::class, 'articleDetail']);
});

// Admin routes
$router->group('/admin', function($r) {
    $r->get('', [\App\Controllers\AdminController::class, 'index']);
    $r->get('/login', [\App\Controllers\AdminController::class, 'loginForm']);
    $r->post('/login', [\App\Controllers\AdminController::class, 'login']);
    $r->get('/captcha/refresh', [\App\Controllers\AdminController::class, 'captchaRefresh']);
    $r->get('/logout', [\App\Controllers\AdminController::class, 'logout']);
    $r->get('/products', [\App\Controllers\AdminController::class, 'products']);
    $r->get('/product/create', [\App\Controllers\AdminController::class, 'productCreate']);
    $r->get('/product/edit/{id}', [\App\Controllers\AdminController::class, 'productEdit']);
    $r->post('/product/save', [\App\Controllers\AdminController::class, 'productSave']);
    $r->get('/product/clear-cache/{id}', [\App\Controllers\AdminController::class, 'productClearCache']);
    $r->get('/product/search-api', [\App\Controllers\AdminController::class, 'productSearchApi']);
    $r->get('/settings', [\App\Controllers\AdminController::class, 'settings']);
    $r->post('/settings/save', [\App\Controllers\AdminController::class, 'settingsSave']);
    $r->get('/settings/flush-cache', [\App\Controllers\AdminController::class, 'settingsFlushCache']);
    $r->get('/articles', [\App\Controllers\AdminController::class, 'articles']);
    $r->get('/article/create', [\App\Controllers\AdminController::class, 'articleCreate']);
    $r->get('/article/edit/{id}', [\App\Controllers\AdminController::class, 'articleEdit']);
    $r->post('/article/save', [\App\Controllers\AdminController::class, 'articleSave']);
    $r->get('/article/delete/{id}', [\App\Controllers\AdminController::class, 'articleDelete']);
    // AI article generation
    $r->get('/ai-article', [\App\Controllers\AdminController::class, 'aiGenerate']);
    $r->get('/ai-article-task/create', [\App\Controllers\AdminController::class, 'aiTaskCreate']);
    $r->get('/ai-article-task/edit/{id}', [\App\Controllers\AdminController::class, 'aiTaskEdit']);
    $r->post('/ai-article-task/save', [\App\Controllers\AdminController::class, 'aiTaskSave']);
    $r->get('/ai-article-task/delete/{id}', [\App\Controllers\AdminController::class, 'aiTaskDelete']);
    $r->get('/ai-article-task/toggle/{id}', [\App\Controllers\AdminController::class, 'aiTaskToggle']);
    $r->post('/ai-article-task/run', [\App\Controllers\AdminController::class, 'aiTaskRun']);
    $r->post('/ai-article-config/save', [\App\Controllers\AdminController::class, 'aiConfigSave']);
    // Vocabulary management
    $r->get('/ai-vocabulary', [\App\Controllers\AdminController::class, 'aiVocabulary']);
    $r->post('/ai-vocabulary-group/save', [\App\Controllers\AdminController::class, 'aiVocabularyGroupSave']);
    $r->get('/ai-vocabulary-group/delete/{id}', [\App\Controllers\AdminController::class, 'aiVocabularyGroupDelete']);
    $r->post('/ai-vocabulary/save', [\App\Controllers\AdminController::class, 'aiVocabularySave']);
    $r->post('/ai-vocabulary/batch-import', [\App\Controllers\AdminController::class, 'aiVocabularyBatchImport']);
    $r->get('/ai-vocabulary/delete/{id}', [\App\Controllers\AdminController::class, 'aiVocabularyDelete']);
    $r->post('/ai-vocabulary/batch-delete', [\App\Controllers\AdminController::class, 'aiVocabularyBatchDelete']);
    $r->get('/ai-vocabulary/search', [\App\Controllers\AdminController::class, 'aiVocabularySearch']);
    $r->post('/ai-vocabulary/generate', [\App\Controllers\AdminController::class, 'aiVocabularyGenerate']);
    $r->post('/ai-vocabulary/batch-add', [\App\Controllers\AdminController::class, 'aiVocabularyBatchAdd']);
    $r->get('/api/product-search', [\App\Controllers\AdminController::class, 'apiProductSearch']);
    $r->get('/api/dashboard-ranking', [\App\Controllers\AdminController::class, 'dashboardRankingApi']);
    // AI review generation
    $r->get('/ai-review', [\App\Controllers\AdminController::class, 'aiReview']);
    $r->get('/ai-review-task/create', [\App\Controllers\AdminController::class, 'aiReviewTaskCreate']);
    $r->get('/ai-review-task/edit/{id}', [\App\Controllers\AdminController::class, 'aiReviewTaskEdit']);
    $r->post('/ai-review-task/save', [\App\Controllers\AdminController::class, 'aiReviewTaskSave']);
    $r->get('/ai-review-task/delete/{id}', [\App\Controllers\AdminController::class, 'aiReviewTaskDelete']);
    $r->get('/ai-review-task/toggle/{id}', [\App\Controllers\AdminController::class, 'aiReviewTaskToggle']);
    $r->post('/ai-review-task/run', [\App\Controllers\AdminController::class, 'aiReviewTaskRun']);
});

// 301 redirect /home to / to consolidate canonical URL
$router->get('/home', function() {
    header('Location: /', true, 301);
    exit;
});

// SPA frontend routes
$spaRoutes = ['/', '/apps', '/games', '/about', '/desk.html'];
foreach ($spaRoutes as $route) {
    $router->get($route, [\App\Controllers\HomeController::class, 'index']);
}
$router->get('/articles', [\App\Controllers\HomeController::class, 'articlesList']);
$router->get('/articles/{page}', [\App\Controllers\HomeController::class, 'articlesListPage']);
$router->get('/detail/{id}', [\App\Controllers\HomeController::class, 'productDetail']);
$router->get('/article/{slug}', [\App\Controllers\HomeController::class, 'articleDetail']);

// Custom product pages (own products with custom_url)
$router->get('/{slug}', [\App\Controllers\HomeController::class, 'customProduct']);

$app->run();
