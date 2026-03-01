<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Models\Article;
use App\Models\Product;
use App\Services\SitemapCache;

class SitemapController extends Controller {
    private function escapeXml($text) {
        return htmlspecialchars((string)$text, ENT_QUOTES | ENT_XML1, 'UTF-8');
    }

    private function normalizeDate($date) {
        if (!$date) return null;
        $ts = strtotime((string)$date);
        if (!$ts) return null;
        return gmdate('c', $ts);
    }

    private function getBaseUrl() {
        $isHttps = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
        $scheme = $isHttps ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'] ?? '';
        return $scheme . '://' . $host;
    }

    private function addUrl(&$urls, $loc, $lastmod = null, $changefreq = null, $priority = null) {
        if (!$loc) return;
        $item = ['loc' => $loc];
        if ($lastmod) $item['lastmod'] = $lastmod;
        if ($changefreq) $item['changefreq'] = $changefreq;
        if ($priority) $item['priority'] = $priority;
        $urls[] = $item;
    }

    public function index() {
        $cachedXml = SitemapCache::get();
        if (is_string($cachedXml) && $cachedXml !== '') {
            header('Content-Type: application/xml; charset=utf-8');
            echo $cachedXml;
            exit;
        }

        $base = $this->getBaseUrl();
        $urls = [];

        // Core pages
        $this->addUrl($urls, $base . '/', null, 'daily', '1.0');
        $this->addUrl($urls, $base . '/apps', null, 'daily', '0.9');
        $this->addUrl($urls, $base . '/games', null, 'daily', '0.9');
        $this->addUrl($urls, $base . '/about', null, 'monthly', '0.6');
        $this->addUrl($urls, $base . '/articles', null, 'daily', '0.9');

        // Products
        $productModel = new Product();
        $products = $productModel->all('id DESC');
        foreach ($products as $p) {
            $msId = trim((string)($p['ms_id'] ?? ''));
            $id = (int)($p['id'] ?? 0);
            $lastmod = $this->normalizeDate($p['updated_at'] ?? $p['created_at'] ?? null);

            if ($msId !== '') {
                $this->addUrl($urls, $base . '/detail/' . rawurlencode($msId), $lastmod, 'weekly', '0.8');
            } elseif ($id > 0) {
                $this->addUrl($urls, $base . '/detail/' . $id, $lastmod, 'weekly', '0.8');
            }

            $isOwn = !empty($p['is_own_product']);
            $customUrl = trim((string)($p['custom_url'] ?? ''));
            if ($isOwn && $customUrl !== '') {
                if ($customUrl[0] !== '/') $customUrl = '/' . $customUrl;
                $this->addUrl($urls, $base . $customUrl, $lastmod, 'weekly', '0.9');
            }
        }

        // Articles (published only)
        $articleModel = new Article();
        $articles = $articleModel->getPublished();
        foreach ($articles as $a) {
            $slug = trim((string)($a['slug'] ?? ''));
            if ($slug === '') continue;
            $lastmod = $this->normalizeDate($a['updated_at'] ?? $a['created_at'] ?? null);
            $this->addUrl($urls, $base . '/article/' . rawurlencode($slug), $lastmod, 'weekly', '0.8');
        }

        $xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        $xml .= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
        foreach ($urls as $u) {
            $xml .= "  <url>\n";
            $xml .= '    <loc>' . $this->escapeXml($u['loc']) . "</loc>\n";
            if (!empty($u['lastmod'])) {
                $xml .= '    <lastmod>' . $this->escapeXml($u['lastmod']) . "</lastmod>\n";
            }
            if (!empty($u['changefreq'])) {
                $xml .= '    <changefreq>' . $this->escapeXml($u['changefreq']) . "</changefreq>\n";
            }
            if (!empty($u['priority'])) {
                $xml .= '    <priority>' . $this->escapeXml($u['priority']) . "</priority>\n";
            }
            $xml .= "  </url>\n";
        }
        $xml .= "</urlset>";

        SitemapCache::set($xml);

        header('Content-Type: application/xml; charset=utf-8');
        echo $xml;
        exit;
    }
}
