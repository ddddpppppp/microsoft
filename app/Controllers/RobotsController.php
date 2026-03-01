<?php
namespace App\Controllers;

use App\Core\Controller;

class RobotsController extends Controller {
    private function getBaseUrl() {
        $isHttps = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
        $scheme = $isHttps ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'] ?? '';
        return $scheme . '://' . $host;
    }

    public function index() {
        $base = $this->getBaseUrl();
        header('Content-Type: text/plain; charset=utf-8');
        echo "User-agent: *\n";
        echo "Allow: /\n";
        echo "Sitemap: " . $base . "/sitemap.xml\n";
        exit;
    }
}
