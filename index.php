<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);

define('BASE_PATH', __DIR__);

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
    $r->get('/search', [\App\Controllers\ApiController::class, 'search']);
});

// Admin routes
$router->group('/admin', function($r) {
    $r->get('', [\App\Controllers\AdminController::class, 'index']);
    $r->get('/login', [\App\Controllers\AdminController::class, 'loginForm']);
    $r->post('/login', [\App\Controllers\AdminController::class, 'login']);
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
});

// SPA frontend routes
$spaRoutes = ['/', '/home', '/apps', '/games', '/about', '/desk.html'];
foreach ($spaRoutes as $route) {
    $router->get($route, [\App\Controllers\HomeController::class, 'index']);
}
$router->get('/detail/{id}', [\App\Controllers\HomeController::class, 'index']);

$app->run();
