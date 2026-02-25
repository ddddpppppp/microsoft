<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Models\Product;
use App\Models\Collection;
use App\Models\Banner;
use App\Models\Setting;
use App\Models\Article;

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
        $this->json($data);
    }

    public function apps() {
        $collectionModel = new Collection();
        $settingModel = new Setting();

        $data = [
            'seo' => $settingModel->getByPage('apps'),
            'collections' => $collectionModel->getPageData('apps')
        ];
        $this->json($data);
    }

    public function games() {
        $collectionModel = new Collection();
        $settingModel = new Setting();

        $data = [
            'seo' => $settingModel->getByPage('games'),
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
        $this->json($product);
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
        $this->json($product);
    }

    public function productRelated($id) {
        $productModel = new Product();
        $related = $productModel->getRelatedProducts($id);
        $this->json($related);
    }

    public function search() {
        $keyword = $_GET['q'] ?? '';
        if (empty($keyword)) {
            $this->json(['results' => []]);
        }
        $productModel = new Product();
        $results = $productModel->search($keyword);
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
        $article = $articleModel->findBySlug($slug);
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
}
