<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Models\Setting;

class HomeController extends Controller {
    public function index() {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $pageKey = 'home';
        if ($uri === '/apps') $pageKey = 'apps';
        elseif ($uri === '/games') $pageKey = 'games';
        elseif ($uri === '/about') $pageKey = 'about';
        
        $setting = new Setting();
        $seo = $setting->getByPage($pageKey);
        
        $this->view('index', [
            'title' => $seo['title'] ?? 'Microsoft Store',
            'keywords' => $seo['keywords'] ?? '',
            'description' => $seo['description'] ?? ''
        ]);
    }
}
