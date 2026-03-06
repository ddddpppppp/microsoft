<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Core\HtmlCache;
use App\Models\Setting;
use App\Models\Product;
use App\Models\Article;
use App\Models\Collection;
use App\Services\SiteUrl;

class HomeController extends Controller {

    private function normalizeScreenshotMeta($rawScreenshots, $fallbackLogoAlt = '') {
        $logoAlt = trim((string)$fallbackLogoAlt);
        $items = [];
        $decoded = is_string($rawScreenshots) ? json_decode($rawScreenshots, true) : $rawScreenshots;

        if (is_array($decoded)) {
            if (isset($decoded['items']) && is_array($decoded['items'])) {
                $logoAlt = trim((string)($decoded['logo_alt'] ?? $logoAlt));
                $decodedItems = $decoded['items'];
            } else {
                $decodedItems = $decoded;
            }

            foreach ($decodedItems as $item) {
                if (is_array($item)) {
                    $url = trim((string)($item['url'] ?? ''));
                    $alt = trim((string)($item['alt'] ?? ''));
                } else {
                    $url = trim((string)$item);
                    $alt = '';
                }
                if ($url !== '') {
                    $items[] = ['url' => $url, 'alt' => $alt];
                }
            }
        }

        return ['logo_alt' => $logoAlt, 'items' => $items];
    }

    private function renderCached($uri, $seoData, $ttl = null) {
        $cached = HtmlCache::getFragment($uri, $ttl);
        if ($cached !== null) {
            echo $this->view('index', $cached, true);
            exit;
        }
        HtmlCache::putFragment($uri, $seoData, $ttl);
        echo $this->view('index', $seoData, true);
        exit;
    }

    public function index() {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $pageKey = 'home';
        if ($uri === '/apps') $pageKey = 'apps';
        elseif ($uri === '/games') $pageKey = 'games';
        elseif ($uri === '/about') $pageKey = 'about';

        $setting = new Setting();
        $seo = $setting->getByPage($pageKey);
        $base = SiteUrl::getBaseUrl();
        $canonical = $base . $uri;
        if ($canonical === $base . '') {
            $canonical = $base . '/';
        }

        $pageTitle = $seo['title'] ?? 'Microsoft Store';
        $pageDesc = $seo['description'] ?? '';
        $seoData = [
            'title' => $pageTitle,
            'keywords' => $seo['keywords'] ?? '',
            'description' => $pageDesc,
            'canonical_url' => $canonical,
            'og_type' => 'website',
            'json_ld' => json_encode([
                '@context' => 'https://schema.org',
                '@type' => 'WebSite',
                'name' => $pageTitle,
                'url' => $canonical,
                'description' => $pageDesc,
                'potentialAction' => [
                    '@type' => 'SearchAction',
                    'target' => $base . '/apps?q={search_term_string}',
                    'query-input' => 'required name=search_term_string'
                ]
            ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
        ];
        if ($pageKey === 'home' || $pageKey === 'apps') {
            $collectionModel = new Collection();
            $collections = $collectionModel->getPageData('home');
            if ($pageKey === 'apps') {
                $collections = $this->filterAppOnlyCollections($collections);
            }
            $seoData['seo_content'] = $this->buildHomeSeoContent($collections, $base, $pageKey === 'apps');
        }
        $this->renderCached($uri, $seoData);
    }

    public function productDetail($id) {
        $uri = '/detail/' . $id;

        $productModel = new Product();
        $product = $productModel->findByMsId($id);
        if (!$product) {
            $product = $productModel->find($id);
        }

        if ($product) {
            $base = SiteUrl::getBaseUrl();
            $canonical = $base . '/detail/' . rawurlencode((string)$id);
            $prodTitle = ($product['custom_title'] ?: $product['title']) ?: 'Microsoft Store';
            $prodDesc = ($product['custom_description'] ?: $product['description']) ?: '';
            $prodIcon = $product['local_icon'] ?: ($product['icon_url'] ?? '');
            $prodPrice = ($product['price_type'] === 'free' || !$product['price']) ? 0 : $product['price'];

            $jsonLd = [
                '@context' => 'https://schema.org',
                '@type' => 'SoftwareApplication',
                'name' => $prodTitle,
                'url' => $canonical,
                'description' => $prodDesc,
                'applicationCategory' => $product['category'] ?? 'Application',
                'operatingSystem' => 'Windows',
            ];
            if ($prodIcon) {
                $jsonLd['image'] = $prodIcon;
            }
            if ($product['developer'] ?? '') {
                $jsonLd['author'] = ['@type' => 'Organization', 'name' => $product['developer']];
            }
            if ($product['rating'] ?? '') {
                $jsonLd['aggregateRating'] = [
                    '@type' => 'AggregateRating',
                    'ratingValue' => $product['rating'],
                    'bestRating' => '5',
                    'worstRating' => '1'
                ];
            }
            $jsonLd['offers'] = [
                '@type' => 'Offer',
                'price' => is_numeric($prodPrice) ? $prodPrice : 0,
                'priceCurrency' => 'USD',
                'availability' => 'https://schema.org/InStock'
            ];

            $seoData = [
                'title' => $prodTitle,
                'keywords' => $product['custom_keywords'] ?? '',
                'description' => $prodDesc,
                'seo_content' => $this->buildProductSeoContent($product, $base),
                'canonical_url' => $canonical,
                'og_type' => 'product',
                'og_image' => $prodIcon,
                'json_ld' => json_encode($jsonLd, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
            ];
        } else {
            $setting = new Setting();
            $seo = $setting->getByPage('home');
            $seoData = [
                'title' => $seo['title'] ?? 'Microsoft Store',
                'keywords' => $seo['keywords'] ?? '',
                'description' => $seo['description'] ?? '',
                'canonical_url' => SiteUrl::getBaseUrl() . $uri
            ];
        }

        $this->renderCached($uri, $seoData, HtmlCache::TTL_DETAIL_YEAR);
    }

    public function articleDetail($slug) {
        $uri = '/article/' . $slug;

        $articleModel = new Article();
        $article = $articleModel->findBySlug($slug);

        if ($article) {
            $base = SiteUrl::getBaseUrl();
            $articleCanonical = $base . '/article/' . rawurlencode($slug);
            $articleTitle = $article['title'] ?: '资讯详情';
            $articleDesc = $article['meta_description'] ?? '';
            $articleImage = $article['cover_image'] ?? '';

            $jsonLd = [
                '@context' => 'https://schema.org',
                '@type' => 'Article',
                'headline' => $articleTitle,
                'url' => $articleCanonical,
                'description' => $articleDesc,
                'publisher' => ['@type' => 'Organization', 'name' => 'Microsoft Store'],
            ];
            if ($articleImage) {
                $jsonLd['image'] = $articleImage;
            }
            if ($article['author'] ?? '') {
                $jsonLd['author'] = ['@type' => 'Person', 'name' => $article['author']];
            }
            if ($article['created_at'] ?? '') {
                $jsonLd['datePublished'] = date('c', strtotime($article['created_at']));
            }
            if ($article['updated_at'] ?? '') {
                $jsonLd['dateModified'] = date('c', strtotime($article['updated_at']));
            }

            $seoData = [
                'title' => $articleTitle,
                'keywords' => $article['keywords'] ?? '',
                'description' => $articleDesc,
                'seo_content' => $this->buildArticleSeoContent($article),
                'canonical_url' => $articleCanonical,
                'og_type' => 'article',
                'og_image' => $articleImage,
                'json_ld' => json_encode($jsonLd, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
            ];
        } else {
            $setting = new Setting();
            $seo = $setting->getByPage('articles');
            $seoData = [
                'title' => $seo['title'] ?? 'Microsoft Store',
                'keywords' => $seo['keywords'] ?? '',
                'description' => $seo['description'] ?? '',
                'canonical_url' => SiteUrl::getBaseUrl() . $uri
            ];
        }

        $this->renderCached($uri, $seoData, HtmlCache::TTL_DETAIL_YEAR);
    }

    /** Articles list page 1: /articles */
    public function articlesList() {
        $uri = '/articles';
        $setting = new Setting();
        $seo = $setting->getByPage('articles');
        $base = SiteUrl::getBaseUrl();
        $articleModel = new Article();
        $result = $articleModel->paginatePublished(1, 12, '');
        $seoData = [
            'title' => $seo['title'] ?? 'Microsoft Store',
            'keywords' => $seo['keywords'] ?? '',
            'description' => $seo['description'] ?? '',
            'seo_content' => $this->buildArticlesListSeoContent($result, $base),
            'canonical_url' => $base . $uri,
            'og_type' => 'website',
            'json_ld' => $this->buildArticlesListJsonLd($result, $base)
        ];
        $this->renderCached($uri, $seoData, HtmlCache::TTL_LIST);
    }

    /** Articles list page N: /articles/2, /articles/3, ... */
    public function articlesListPage($page) {
        $page = (int) $page;
        if ($page < 1) {
            $page = 1;
        }
        $uri = '/articles/' . $page;
        $setting = new Setting();
        $seo = $setting->getByPage('articles');
        $base = SiteUrl::getBaseUrl();
        $articleModel = new Article();
        $result = $articleModel->paginatePublished($page, 12, '');
        $seoData = [
            'title' => $seo['title'] ?? 'Microsoft Store',
            'keywords' => $seo['keywords'] ?? '',
            'description' => $seo['description'] ?? '',
            'seo_content' => $this->buildArticlesListSeoContent($result, $base),
            'canonical_url' => $base . $uri,
            'og_type' => 'website',
            'json_ld' => $this->buildArticlesListJsonLd($result, $base)
        ];
        $this->renderCached($uri, $seoData, HtmlCache::TTL_LIST);
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
        $base = SiteUrl::getBaseUrl();
        $cpTitle = $product['custom_title'] ?: $product['title'];
        $cpDesc = $product['custom_description'] ?: $product['description'];
        $cpIcon = $product['local_icon'] ?: ($product['icon_url'] ?? '');
        $cpPrice = ($product['price_type'] === 'free' || !$product['price']) ? 0 : $product['price'];

        $cpJsonLd = [
            '@context' => 'https://schema.org',
            '@type' => 'SoftwareApplication',
            'name' => $cpTitle,
            'url' => $base . $uri,
            'description' => $cpDesc,
            'applicationCategory' => $product['category'] ?? 'Application',
            'operatingSystem' => 'Windows',
        ];
        if ($cpIcon) $cpJsonLd['image'] = $cpIcon;
        if ($product['developer'] ?? '') {
            $cpJsonLd['author'] = ['@type' => 'Organization', 'name' => $product['developer']];
        }
        if ($product['rating'] ?? '') {
            $cpJsonLd['aggregateRating'] = [
                '@type' => 'AggregateRating',
                'ratingValue' => $product['rating'],
                'bestRating' => '5',
                'worstRating' => '1'
            ];
        }
        $cpJsonLd['offers'] = [
            '@type' => 'Offer',
            'price' => is_numeric($cpPrice) ? $cpPrice : 0,
            'priceCurrency' => 'USD',
            'availability' => 'https://schema.org/InStock'
        ];

        $this->renderCached($uri, [
            'title' => $cpTitle,
            'keywords' => $product['custom_keywords'] ?? '',
            'description' => $cpDesc,
            'seo_content' => $this->buildProductSeoContent($product, $base),
            'canonical_url' => $base . $uri,
            'og_type' => 'product',
            'og_image' => $cpIcon,
            'json_ld' => json_encode($cpJsonLd, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
        ], HtmlCache::TTL_DETAIL_YEAR);
    }

    private function buildProductSeoContent($p, string $baseUrl = '') {
        $h = function($s) { return htmlspecialchars($s ?? '', ENT_QUOTES, 'UTF-8'); };
        $title = $h($p['custom_title'] ?: $p['title']);
        $desc = $h($p['custom_description'] ?: $p['description']);
        $icon = $h($p['local_icon'] ?: $p['icon_url'] ?? '');
        $screenshotMeta = $this->normalizeScreenshotMeta($p['screenshots'] ?? '', $p['title'] ?? '');
        $logoAlt = $h($screenshotMeta['logo_alt'] !== '' ? $screenshotMeta['logo_alt'] : ($p['title'] ?? 'Product icon'));
        $developer = $h($p['developer'] ?? '');
        $category = $h($p['category'] ?? '');
        $rating = $h($p['rating'] ?? '');
        $price = $p['price_type'] === 'free' || !$p['price'] ? 'Free' : $h($p['price']);

        $html = '<div id="seo-content">';
        $html .= '<article>';
        if ($icon) {
            $html .= '<img src="' . $icon . '" alt="' . $logoAlt . '" width="128" height="128">';
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
        foreach ($screenshotMeta['items'] as $s) {
            $shotUrl = $h($s['url'] ?? '');
            if ($shotUrl === '') {
                continue;
            }
            $shotAlt = $h(($s['alt'] ?? '') !== '' ? $s['alt'] : 'Product screenshot');
            $html .= '<img src="' . $shotUrl . '" alt="' . $shotAlt . '" loading="lazy">';
        }
        $html .= $this->buildRelatedProductsSeoContent((int)($p['id'] ?? 0), $baseUrl);
        $html .= '</article></div>';
        return $html;
    }

    private function buildRelatedProductsSeoContent(int $productId, string $baseUrl = ''): string {
        if ($productId <= 0) {
            return '';
        }

        $productModel = new Product();
        $relatedItems = $productModel->getRelatedProducts($productId);
        if (!$relatedItems || count($relatedItems) === 0) {
            return '';
        }

        if ($baseUrl === '') {
            $baseUrl = SiteUrl::getBaseUrl();
        }
        $h = function($s) { return htmlspecialchars((string)($s ?? ''), ENT_QUOTES, 'UTF-8'); };
        $html = '<section class="seo-related-products">';
        $html .= '<h2>Discover More</h2><ul>';

        foreach ($relatedItems as $item) {
            $isInternal = !empty($item['is_own_product']) && !empty($item['custom_url']);
            $rel = '';
            if ($isInternal) {
                $path = trim((string)$item['custom_url']);
                if ($path !== '' && $path[0] !== '/') {
                    $path = '/' . $path;
                }
                $href = $path !== '' ? ($baseUrl . $path) : '';
            } else {
                $msId = trim((string)($item['related_ms_id'] ?? ''));
                if ($msId !== '') {
                    $href = $baseUrl . '/detail/' . rawurlencode($msId);
                } else {
                    $href = '';
                }
            }
            if (trim($href) === '') {
                continue;
            }

            $title = $h($item['related_title'] ?? '');
            $category = $h($item['related_category'] ?? '');
            $rating = $h($item['related_rating'] ?? '');
            $price = $h(($item['related_price'] ?? '') !== '' ? $item['related_price'] : 'Free');

            $html .= '<li>';
            $html .= '<a href="' . $h($href) . '"' . $rel . '>' . ($title !== '' ? $title : $h($href)) . '</a>';
            if ($category !== '') $html .= '<span> | Category: ' . $category . '</span>';
            if ($rating !== '') $html .= '<span> | Rating: ' . $rating . '</span>';
            $html .= '<span> | Price: ' . $price . '</span>';
            $html .= '</li>';
        }

        $html .= '</ul></section>';
        return $html;
    }

    private function buildArticlesListSeoContent(array $result, string $baseUrl) {
        $h = function($s) { return htmlspecialchars($s ?? '', ENT_QUOTES, 'UTF-8'); };
        $items = $result['items'] ?? [];
        $currentPage = (int)($result['page'] ?? 1);
        $totalPages = (int)($result['total_pages'] ?? 1);

        $html = '<div id="seo-content">';
        $html .= '<h1>资讯中心</h1>';
        $html .= '<ul>';
        foreach ($items as $a) {
            $slug = trim((string)($a['slug'] ?? ''));
            if ($slug === '') continue;
            $href = $baseUrl . '/article/' . rawurlencode($slug);
            $title = $h($a['title'] ?? '');
            $html .= '<li><a href="' . $h($href) . '">' . $title . '</a>';
            if (!empty($a['summary'])) {
                $html .= ' <span>' . $h($a['summary']) . '</span>';
            }
            if (!empty($a['created_at'])) {
                $html .= ' <time datetime="' . $h($a['created_at']) . '">' . $h($a['created_at']) . '</time>';
            }
            $html .= '</li>';
        }
        $html .= '</ul>';
        if ($totalPages > 1) {
            $html .= '<nav><p>分页：</p>';
            for ($p = 1; $p <= $totalPages; $p++) {
                $url = $p === 1 ? $baseUrl . '/articles' : $baseUrl . '/articles/' . $p;
                $html .= ' <a href="' . $h($url) . '">' . $p . '</a>';
            }
            $html .= '</nav>';
        }
        $html .= '</div>';
        return $html;
    }

    /**
     * 应用页与首页共用 getPageData('home')，应用页只展示「应用」类合集。
     * 与前端 _getAppCollections 一致：排除 collection_cards，只保留 product_type=app 的产品。
     */
    private function filterAppOnlyCollections(array $collections): array {
        $out = [];
        foreach ($collections as $col) {
            $sectionType = isset($col['section_type']) ? (string) $col['section_type'] : '';
            if ($sectionType === 'collection_cards') {
                continue;
            }
            $products = isset($col['products']) && is_array($col['products']) ? $col['products'] : [];
            $appProducts = array_values(array_filter($products, function ($p) {
                return isset($p['product_type']) && (string) $p['product_type'] === 'app';
            }));
            if (count($appProducts) === 0) {
                continue;
            }
            $col['products'] = $appProducts;
            $out[] = $col;
        }
        usort($out, function ($a, $b) {
            return (int)($a['display_order'] ?? 0) - (int)($b['display_order'] ?? 0);
        });
        return $out;
    }

    /**
     * 首页/应用页 SEO 内容：合集及产品链接。
     * @param bool $forApps 为 true 时用于应用页：使用「应用中心」标题与简介，降低与首页正文重复度。
     */
    private function buildHomeSeoContent(array $collections, string $baseUrl, bool $forApps = false) {
        $h = function($s) { return htmlspecialchars((string)($s ?? ''), ENT_QUOTES, 'UTF-8'); };
        $html = '<div id="seo-content">';
        if ($forApps) {
            $html .= '<h1>Microsoft Store 应用中心</h1>';
            $html .= '<p>本页为应用类合集与产品列表，包含新潮应用、生产力应用、创意应用、社交应用等。</p>';
        } else {
            $html .= '<h1>Microsoft Store</h1>';
        }
        foreach ($collections as $col) {
            $name = trim((string)($col['name'] ?? ''));
            if ($name === '') continue;
            $products = isset($col['products']) && is_array($col['products']) ? $col['products'] : [];
            if (count($products) === 0) continue;
            $html .= '<section><h2>' . $h($name) . '</h2><ul>';
            foreach ($products as $p) {
                $title = $h($p['title'] ?? '');
                $isOwn = !empty($p['is_own_product']);
                $rel = '';
                if ($isOwn && !empty($p['custom_url'])) {
                    $path = trim((string)$p['custom_url']);
                    if ($path !== '' && $path[0] !== '/') $path = '/' . $path;
                    $href = $path !== '' ? ($baseUrl . $path) : ($baseUrl . '/detail/' . rawurlencode((string)($p['ms_id'] ?? $p['id'] ?? '')));
                } else {
                    $originUrl = trim((string)($p['original_url'] ?? ''));
                    if ($originUrl !== '') {
                        $href = $originUrl;
                        $rel = ' rel="nofollow"';
                    } else {
                        $id = !empty($p['ms_id']) ? $p['ms_id'] : ($p['id'] ?? '');
                        $href = $baseUrl . '/detail/' . rawurlencode((string)$id);
                    }
                }
                if ($href === $baseUrl . '/detail/') continue;
                $html .= '<li><a href="' . $h($href) . '"' . $rel . '>' . ($title !== '' ? $title : 'App') . '</a>';
                if (!empty($p['category'])) $html .= ' <span>' . $h($p['category']) . '</span>';
                $html .= '</li>';
            }
            $html .= '</ul></section>';
        }
        $html .= '</div>';
        return $html;
    }

    private function buildArticlesListJsonLd(array $result, string $baseUrl): string {
        $items = $result['items'] ?? [];
        $listItems = [];
        $pos = 1;
        foreach ($items as $a) {
            $slug = trim((string)($a['slug'] ?? ''));
            if ($slug === '') continue;
            $listItems[] = [
                '@type' => 'ListItem',
                'position' => $pos++,
                'url' => $baseUrl . '/article/' . rawurlencode($slug),
                'name' => $a['title'] ?? ''
            ];
        }
        return json_encode([
            '@context' => 'https://schema.org',
            '@type' => 'ItemList',
            'name' => '资讯中心',
            'itemListElement' => $listItems
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    private function buildArticleSeoContent($a) {
        $h = function($s) { return htmlspecialchars($s ?? '', ENT_QUOTES, 'UTF-8'); };

        $html = '<div id="seo-content">';
        $html .= '<article>';
        if ($a['cover_image'] ?? '') {
            $html .= '<img src="' . $h($a['cover_image']) . '" alt="' . $h($a['title']) . '">';
        }
        $html .= '<h1>' . $h($a['title']) . '</h1>';
        if ($a['author'] ?? '') {
            $html .= '<p>Author: ' . $h($a['author']) . '</p>';
        }
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
