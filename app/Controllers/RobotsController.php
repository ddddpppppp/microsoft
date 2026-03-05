<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Services\SiteUrl;

class RobotsController extends Controller {
    public function index() {
        $base = SiteUrl::getBaseUrl();
        header('Content-Type: text/plain; charset=utf-8');
        echo "User-agent: *\n";
        echo "Allow: /\n";
        echo "Sitemap: " . $base . "/sitemap.xml\n";
        exit;
    }
}
