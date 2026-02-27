<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

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

$app = new App\Core\App();
$router = $app->getRouter();

// Static file passthrough
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if (preg_match('/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|map)$/i', $uri)) {
    return false;
}

// API routes
$router->group('/api', function($r) {
    $r->get('/home', [\App\Controllers\ApiController::class, 'home']);
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
    $r->get('/product/edit/{id}', [\App\Controllers\AdminController::class, 'productEdit']);
    $r->post('/product/save', [\App\Controllers\AdminController::class, 'productSave']);
    $r->get('/settings', [\App\Controllers\AdminController::class, 'settings']);
    $r->post('/settings/save', [\App\Controllers\AdminController::class, 'settingsSave']);
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
    // AI review generation
    $r->get('/ai-review', [\App\Controllers\AdminController::class, 'aiReview']);
    $r->get('/ai-review-task/create', [\App\Controllers\AdminController::class, 'aiReviewTaskCreate']);
    $r->get('/ai-review-task/edit/{id}', [\App\Controllers\AdminController::class, 'aiReviewTaskEdit']);
    $r->post('/ai-review-task/save', [\App\Controllers\AdminController::class, 'aiReviewTaskSave']);
    $r->get('/ai-review-task/delete/{id}', [\App\Controllers\AdminController::class, 'aiReviewTaskDelete']);
    $r->get('/ai-review-task/toggle/{id}', [\App\Controllers\AdminController::class, 'aiReviewTaskToggle']);
    $r->post('/ai-review-task/run', [\App\Controllers\AdminController::class, 'aiReviewTaskRun']);
});

// SPA frontend routes
$spaRoutes = ['/', '/home', '/apps', '/games', '/about', '/articles', '/desk.html'];
foreach ($spaRoutes as $route) {
    $router->get($route, [\App\Controllers\HomeController::class, 'index']);
}
$router->get('/detail/{id}', [\App\Controllers\HomeController::class, 'index']);
$router->get('/article/{slug}', [\App\Controllers\HomeController::class, 'index']);

// Custom product pages (own products with custom_url)
$router->get('/{slug}', [\App\Controllers\HomeController::class, 'customProduct']);

$app->run();
