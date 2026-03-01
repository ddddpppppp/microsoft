<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Core\HtmlCache;
use App\Models\Setting;
use App\Models\Product;
use App\Models\Article;

class HomeController extends Controller {

    private function renderCached($uri, $seoData) {
        $cached = HtmlCache::get($uri);
        if ($cached !== null) {
            echo $cached;
            exit;
        }
        $html = $this->view('index', $seoData, true);
        HtmlCache::put($uri, $html);
        echo $html;
        exit;
    }

    public function index() {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $pageKey = 'home';
        if ($uri === '/apps') $pageKey = 'apps';
        elseif ($uri === '/games') $pageKey = 'games';
        elseif ($uri === '/about') $pageKey = 'about';
        elseif ($uri === '/articles') $pageKey = 'articles';

        $setting = new Setting();
        $seo = $setting->getByPage($pageKey);

        $this->renderCached($uri, [
            'title' => $seo['title'] ?? 'Microsoft Store',
            'keywords' => $seo['keywords'] ?? '',
            'description' => $seo['description'] ?? ''
        ]);
    }

    public function productDetail($id) {
        $uri = '/detail/' . $id;

        $productModel = new Product();
        $product = $productModel->findByMsId($id);
        if (!$product) {
            $product = $productModel->find($id);
        }

        if ($product) {
            $seoData = [
                'title' => ($product['custom_title'] ?: $product['title']) ?: 'Microsoft Store',
                'keywords' => $product['custom_keywords'] ?? '',
                'description' => ($product['custom_description'] ?: $product['description']) ?: '',
                'seo_content' => $this->buildProductSeoContent($product)
            ];
        } else {
            $setting = new Setting();
            $seo = $setting->getByPage('home');
            $seoData = [
                'title' => $seo['title'] ?? 'Microsoft Store',
                'keywords' => $seo['keywords'] ?? '',
                'description' => $seo['description'] ?? ''
            ];
        }

        $this->renderCached($uri, $seoData);
    }

    public function articleDetail($slug) {
        $uri = '/article/' . $slug;

        $articleModel = new Article();
        $article = $articleModel->findBySlug($slug);

        if ($article) {
            $seoData = [
                'title' => $article['title'] ?: '资讯详情',
                'keywords' => $article['keywords'] ?? '',
                'description' => $article['meta_description'] ?? '',
                'seo_content' => $this->buildArticleSeoContent($article)
            ];
        } else {
            $setting = new Setting();
            $seo = $setting->getByPage('articles');
            $seoData = [
                'title' => $seo['title'] ?? 'Microsoft Store',
                'keywords' => $seo['keywords'] ?? '',
                'description' => $seo['description'] ?? ''
            ];
        }

        $this->renderCached($uri, $seoData);
    }

    public function customProduct($slug) {
        $productModel = new Product();
        $product = $productModel->findByCustomUrl('/' . $slug);

        if (!$product || !$product['is_own_product']) {
            http_response_code(404);
            echo json_encode(['error' => 'Not Found']);
            return;
        }

        $uri = '/' . $slug;
        $this->renderCached($uri, [
            'title' => $product['custom_title'] ?: $product['title'],
            'keywords' => $product['custom_keywords'] ?? '',
            'description' => $product['custom_description'] ?: $product['description'],
            'seo_content' => $this->buildProductSeoContent($product)
        ]);
    }

    private function buildProductSeoContent($p) {
        $h = function($s) { return htmlspecialchars($s ?? '', ENT_QUOTES, 'UTF-8'); };
        $title = $h($p['custom_title'] ?: $p['title']);
        $desc = $h($p['custom_description'] ?: $p['description']);
        $icon = $h($p['local_icon'] ?: $p['icon_url'] ?? '');
        $developer = $h($p['developer'] ?? '');
        $category = $h($p['category'] ?? '');
        $rating = $h($p['rating'] ?? '');
        $price = $p['price_type'] === 'free' || !$p['price'] ? 'Free' : $h($p['price']);
        $screenshots = $p['screenshots'] ?? '';
        if (is_string($screenshots)) {
            $screenshots = json_decode($screenshots, true) ?: [];
        }

        $html = '<div id="seo-content" style="position:absolute;left:-9999px;top:-9999px;overflow:hidden">';
        $html .= '<article>';
        if ($icon) {
            $html .= '<img src="' . $icon . '" alt="' . $title . '" width="128" height="128">';
        }
        $html .= '<h1>' . $title . '</h1>';
        if ($developer) $html .= '<p>Developer: ' . $developer . '</p>';
        if ($category) $html .= '<p>Category: ' . $category . '</p>';
        if ($rating) $html .= '<p>Rating: ' . $rating . '</p>';
        $html .= '<p>Price: ' . $price . '</p>';
        if ($desc) $html .= '<div>' . nl2br($desc) . '</div>';
        if ($p['whats_new'] ?? '') {
            $html .= '<h2>What\'s New</h2><p>' . nl2br($h($p['whats_new'])) . '</p>';
        }
        foreach ($screenshots as $s) {
            $html .= '<img src="' . $h($s) . '" alt="Screenshot" loading="lazy">';
        }
        $html .= '</article></div>';
        return $html;
    }

    private function buildArticleSeoContent($a) {
        $h = function($s) { return htmlspecialchars($s ?? '', ENT_QUOTES, 'UTF-8'); };

        $html = '<div id="seo-content" style="position:absolute;left:-9999px;top:-9999px;overflow:hidden">';
        $html .= '<article>';
        if ($a['cover_image'] ?? '') {
            $html .= '<img src="' . $h($a['cover_image']) . '" alt="' . $h($a['title']) . '">';
        }
        $html .= '<h1>' . $h($a['title']) . '</h1>';
        if ($a['author'] ?? '') $html .= '<p>Author: ' . $h($a['author']) . '</p>';
        if ($a['category'] ?? '') $html .= '<p>Category: ' . $h($a['category']) . '</p>';
        if ($a['created_at'] ?? '') $html .= '<time datetime="' . $h($a['created_at']) . '">' . $h($a['created_at']) . '</time>';
        $html .= '<div>' . ($a['content'] ?? '') . '</div>';
        if ($a['keywords'] ?? '') {
            $html .= '<p>Tags: ' . $h($a['keywords']) . '</p>';
        }
        $html .= '</article></div>';
        return $html;
    }
}
