<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Models\Setting;
use App\Models\Product;

class HomeController extends Controller {
    public function index() {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $pageKey = 'home';
        if ($uri === '/apps') $pageKey = 'apps';
        elseif ($uri === '/games') $pageKey = 'games';
        elseif ($uri === '/about') $pageKey = 'about';
        elseif ($uri === '/articles' || strpos($uri, '/article/') === 0) $pageKey = 'articles';
        
        $setting = new Setting();
        $seo = $setting->getByPage($pageKey);
        
        $this->view('index', [
            'title' => $seo['title'] ?? 'Microsoft Store',
            'keywords' => $seo['keywords'] ?? '',
            'description' => $seo['description'] ?? ''
        ]);
    }

    public function customProduct($slug) {
        $productModel = new Product();
        $product = $productModel->findByCustomUrl('/' . $slug);
        
        if (!$product || !$product['is_own_product']) {
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
            return;
        }
        
        $this->view('index', [
            'title' => $product['custom_title'] ?: $product['title'],
            'keywords' => $product['custom_keywords'] ?? '',
            'description' => $product['custom_description'] ?: $product['description']
        ]);
    }
}
