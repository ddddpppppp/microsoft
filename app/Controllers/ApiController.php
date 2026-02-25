<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Models\Product;
use App\Models\Collection;
use App\Models\Banner;
use App\Models\Setting;

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
        }
        $this->json($product);
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
}
