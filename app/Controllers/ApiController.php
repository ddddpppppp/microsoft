<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Models\Product;
use App\Models\Collection;
use App\Models\Banner;
use App\Models\Setting;
use App\Models\Article;
use App\Models\ProductReview;
use App\Models\ProductStats;
use App\Core\Redis;

class ApiController extends Controller {
    public function home() {
        $bannerModel = new Banner();
        $collectionModel = new Collection();
        $settingModel = new Setting();

        $data = [
            'seo' => $settingModel->getByPage('home'),
            'heroBanners' => $bannerModel->getHeroBanners('home'),
            'featuredBanners' => $bannerModel->getFeaturedBanners('home'),
            'collections' => $collectionModel->getPageData('home')
        ];
        $this->deduplicateCreativeAppsByTrendingApps($data['collections']);
        $this->json($data);
    }

    public function apps() {
        $bannerModel = new Banner();
        $collectionModel = new Collection();
        $settingModel = new Setting();

        $data = [
            'seo' => $settingModel->getByPage('apps'),
            'heroBanners' => $bannerModel->getHeroBanners('apps'),
            'featuredBanners' => $bannerModel->getFeaturedBanners('apps'),
            'collections' => $collectionModel->getPageData('apps')
        ];
        $this->json($data);
    }

    public function games() {
        $bannerModel = new Banner();
        $collectionModel = new Collection();
        $settingModel = new Setting();

        $data = [
            'seo' => $settingModel->getByPage('games'),
            'heroBanners' => $bannerModel->getHeroBanners('games'),
            'featuredBanners' => $bannerModel->getFeaturedBanners('games'),
            'collections' => $collectionModel->getPageData('games')
        ];
        $this->json($data);
    }

    public function about() {
        $settingModel = new Setting();
        $data = [
            'seo' => $settingModel->getByPage('about')
        ];
        $this->json($data);
    }

    public function product($id) {
        $productModel = new Product();
        $product = $productModel->findByMsId($id);
        if (!$product) {
            $product = $productModel->find($id);
        }
        if (!$product) {
            $this->json(['error' => 'Product not found'], 404);
            return;
        }
        $statsModel = new ProductStats();
        $statsModel->incrementView($product['id']);
        $this->json($product);
    }

    public function productDownloadClick($id) {
        $productModel = new Product();
        $product = $productModel->findByMsId($id);
        if (!$product) {
            $product = $productModel->find($id);
        }
        if (!$product) {
            $this->json(['error' => 'Product not found'], 404);
            return;
        }
        $statsModel = new ProductStats();
        $statsModel->incrementDownloadClick($product['id']);
        $this->json(['ok' => true]);
    }

    public function productByUrl() {
        $url = $_GET['url'] ?? '';
        if (empty($url)) {
            $this->json(['error' => 'URL required'], 400);
            return;
        }
        $productModel = new Product();
        $product = $productModel->findByCustomUrl($url);
        if (!$product) {
            $this->json(['error' => 'Product not found'], 404);
            return;
        }
        $statsModel = new ProductStats();
        $statsModel->incrementView($product['id']);
        $this->json($product);
    }

    public function productRelated($id) {
        $productModel = new Product();
        $related = $productModel->getRelatedProducts($id);
        $this->json($related);
    }

    public function productReviews($id) {
        $productModel = new Product();
        $product = $productModel->find($id);
        if (!$product) {
            $this->json(['error' => 'Product not found'], 404);
            return;
        }

        $reviewModel = new ProductReview();
        $reviews = $reviewModel->getByProduct($id, 15);
        $avgRating = $reviewModel->getAvgRating($id);
        $totalCount = $reviewModel->getCountByProduct($id);
        $distribution = $reviewModel->getRatingDistribution($id);

        $this->json([
            'reviews' => $reviews,
            'avg_rating' => $avgRating,
            'total_count' => $totalCount,
            'distribution' => $distribution,
        ]);
    }

    public function search() {
        $keyword = trim($_GET['q'] ?? '');
        if ($keyword === '' || mb_strlen($keyword) > 100) {
            $this->json(['results' => []]);
            return;
        }

        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
        $redis = Redis::getInstance();
        if ($redis->isAvailable()) {
            $rateKey = 'search_rate:' . $ip;
            $count = $redis->incr($rateKey);
            if ($count === 1) {
                $redis->expire($rateKey, 60);
            }
            if ($count > 30) {
                http_response_code(429);
                $this->json(['error' => 'Too many requests', 'results' => []]);
                return;
            }
        }

        $productModel = new Product();
        $results = $productModel->searchLite($keyword);
        $this->json(['results' => $results]);
    }

    /** List products in hero_cards with empty description and non-empty original_url (for crawling). */
    public function productsMissingDescription() {
        $productModel = new Product();
        $list = $productModel->getMissingDescriptionInHeroCards();
        $this->json($list);
    }

    /** Update one product description (e.g. after crawl). POST body: {"description": "..."} */
    public function updateProductDescription($id) {
        $id = (int) $id;
        if ($id <= 0) {
            $this->json(['error' => 'Invalid id'], 400);
            return;
        }
        $body = json_decode(file_get_contents('php://input'), true) ?: [];
        $description = isset($body['description']) ? (string) $body['description'] : '';
        $productModel = new Product();
        $productModel->updateDescription($id, $description);
        $this->json(['ok' => true, 'id' => $id]);
    }

    /** Update one product social card image. POST body: {"social_card_image": "https://..."} */
    public function updateProductSocialCardImage($id) {
        $id = (int) $id;
        if ($id <= 0) {
            $this->json(['error' => 'Invalid id'], 400);
            return;
        }
        $body = json_decode(file_get_contents('php://input'), true) ?: [];
        $url = isset($body['social_card_image']) ? (string) $body['social_card_image'] : '';
        $productModel = new Product();
        $productModel->updateSocialCardImage($id, $url);
        $this->json(['ok' => true, 'id' => $id]);
    }

    public function articles() {
        $articleModel = new Article();
        $settingModel = new Setting();
        $page = (int)($_GET['page'] ?? 1);
        $category = $_GET['category'] ?? '';

        $result = $articleModel->paginatePublished($page, 12, $category);
        $items = array_map(function($a) {
            unset($a['content']);
            return $a;
        }, $result['items']);

        $data = [
            'seo' => $settingModel->getByPage('articles'),
            'articles' => $items,
            'pagination' => [
                'page' => $result['page'],
                'total_pages' => $result['total_pages'],
                'total' => $result['total']
            ],
            'categories' => $articleModel->getCategories(),
            'recommended' => array_map(function($a) {
                unset($a['content']);
                return $a;
            }, $articleModel->getRecommended(6))
        ];
        $this->json($data);
    }

    public function articleDetail($slug) {
        $articleModel = new Article();
        $article = $articleModel->findByIdOrSlug($slug);
        if (!$article || $article['status'] !== 'published') {
            $this->json(['error' => 'Article not found'], 404);
            return;
        }
        $articleModel->incrementViews($article['id']);
        $article['views'] = ($article['views'] ?? 0) + 1;

        $related = $articleModel->getRelated($article['id'], $article['category'] ?? '', 4);
        $related = array_map(function($a) { unset($a['content']); return $a; }, $related);

        $popular = $articleModel->getPopular(5);
        $popular = array_map(function($a) { unset($a['content']); return $a; }, $popular);

        $this->json([
            'article' => $article,
            'related' => $related,
            'popular' => $popular
        ]);
    }

    /**
     * 先获取「新潮应用」的产品 id/ms_id，再从「創意應用程式」中去掉这些产品，实现去重（同一产品不重复出现在两处）。
     * @param array $collections
     */
    private function deduplicateCreativeAppsByTrendingApps(array &$collections): void {
        $trendingProductIds = [];
        $trendingProductMsIds = [];
        foreach ($collections as $col) {
            $slug = isset($col['slug']) ? (string) $col['slug'] : '';
            $name = isset($col['name']) ? (string) $col['name'] : '';
            $isTrendingApps = ($slug === 'trending-apps' || $slug === 'top-trending-apps' || $name === '新潮应用');
            if (!$isTrendingApps) {
                continue;
            }
            $products = isset($col['products']) && is_array($col['products']) ? $col['products'] : [];
            foreach ($products as $p) {
                if (isset($p['id'])) {
                    $trendingProductIds[(int) $p['id']] = true;
                }
                if (!empty($p['ms_id'])) {
                    $trendingProductMsIds[(string) $p['ms_id']] = true;
                }
            }
            break;
        }

        if (empty($trendingProductIds) && empty($trendingProductMsIds)) {
            return;
        }

        foreach ($collections as &$col) {
            $slug = isset($col['slug']) ? (string) $col['slug'] : '';
            $sectionType = isset($col['section_type']) ? (string) $col['section_type'] : '';
            if ($slug !== 'creative-apps' || $sectionType !== 'hero_cards') {
                continue;
            }
            $products = isset($col['products']) && is_array($col['products']) ? $col['products'] : [];
            $col['products'] = array_values(array_filter($products, function ($p) use ($trendingProductIds, $trendingProductMsIds) {
                if (isset($p['id']) && isset($trendingProductIds[(int) $p['id']])) {
                    return false;
                }
                $msId = isset($p['ms_id']) ? (string) $p['ms_id'] : '';
                if ($msId !== '' && isset($trendingProductMsIds[$msId])) {
                    return false;
                }
                return true;
            }));
            break;
        }
        unset($col);
    }
}
