<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Core\Database;
use App\Core\View;
use App\Models\Product;
use App\Models\Setting;
use App\Models\Article;

class AdminController extends Controller {

    private function requireLogin() {
        session_start();
        if (empty($_SESSION['admin_id'])) {
            $this->redirect('/admin/login');
        }
    }

    public function index() {
        $this->requireLogin();
        $productModel = new Product();
        $articleModel = new Article();
        $productCount = $productModel->count();
        $articleCount = $articleModel->count();
        echo View::renderWithLayout('admin/layout', 'admin/dashboard', [
            'pageTitle' => '仪表盘',
            'productCount' => $productCount,
            'articleCount' => $articleCount
        ]);
    }

    public function loginForm() {
        session_start();
        if (!empty($_SESSION['admin_id'])) {
            $this->redirect('/admin');
        }
        echo View::render('admin/login', ['error' => '']);
    }

    public function login() {
        session_start();
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';
        
        $db = Database::getInstance();
        $user = $db->fetch("SELECT * FROM admin_users WHERE username = ?", [$username]);
        
        if ($user && password_verify($password, $user['password_hash'])) {
            $_SESSION['admin_id'] = $user['id'];
            $_SESSION['admin_name'] = $user['username'];
            $this->redirect('/admin');
        }
        
        echo View::render('admin/login', ['error' => '用户名或密码错误']);
    }

    public function logout() {
        session_start();
        session_destroy();
        $this->redirect('/admin/login');
    }

    public function products() {
        $this->requireLogin();
        $page = (int)($_GET['page'] ?? 1);
        $search = $_GET['search'] ?? '';
        $productModel = new Product();
        
        if ($search) {
            $like = "%$search%";
            $result = $productModel->paginate($page, 20, 'title LIKE ?', [$like]);
        } else {
            $result = $productModel->paginate($page, 20);
        }
        
        echo View::renderWithLayout('admin/layout', 'admin/products', [
            'pageTitle' => '产品管理',
            'products' => $result['items'],
            'pagination' => $result,
            'search' => $search
        ]);
    }

    public function productEdit($id) {
        $this->requireLogin();
        $productModel = new Product();
        $product = $productModel->find($id);
        if (!$product) {
            $this->redirect('/admin/products');
        }
        echo View::renderWithLayout('admin/layout', 'admin/product_edit', [
            'pageTitle' => '编辑产品',
            'product' => $product
        ]);
    }

    public function productSave() {
        $this->requireLogin();
        $id = $_POST['id'] ?? 0;
        $productModel = new Product();
        
        $data = [
            'custom_title' => $_POST['custom_title'] ?? '',
            'custom_keywords' => $_POST['custom_keywords'] ?? '',
            'custom_description' => $_POST['custom_description'] ?? '',
            'custom_download_url' => $_POST['custom_download_url'] ?? '',
            'custom_url' => $_POST['custom_url'] ?? '',
            'is_own_product' => isset($_POST['is_own_product']) ? 1 : 0,
        ];
        
        $productModel->update($id, $data);
        $this->redirect('/admin/product/edit/' . $id . '?saved=1');
    }

    public function settings() {
        $this->requireLogin();
        $settingModel = new Setting();
        $pages = ['home', 'apps', 'games', 'about', 'articles'];
        $settings = [];
        foreach ($pages as $p) {
            $settings[$p] = $settingModel->getByPage($p) ?: ['title' => '', 'keywords' => '', 'description' => ''];
        }
        echo View::renderWithLayout('admin/layout', 'admin/settings', [
            'pageTitle' => 'SEO 设置',
            'settings' => $settings
        ]);
    }

    public function settingsSave() {
        $this->requireLogin();
        $settingModel = new Setting();
        $pages = ['home', 'apps', 'games', 'about', 'articles'];
        foreach ($pages as $p) {
            $settingModel->updateByPage($p, [
                'title' => $_POST["title_$p"] ?? '',
                'keywords' => $_POST["keywords_$p"] ?? '',
                'description' => $_POST["description_$p"] ?? ''
            ]);
        }
        $this->redirect('/admin/settings?saved=1');
    }

    public function articles() {
        $this->requireLogin();
        $articleModel = new Article();
        $page = (int)($_GET['page'] ?? 1);
        $result = $articleModel->paginate($page, 20);
        echo View::renderWithLayout('admin/layout', 'admin/articles', [
            'pageTitle' => '资讯管理',
            'articles' => $result['items'],
            'pagination' => $result
        ]);
    }

    public function articleCreate() {
        $this->requireLogin();
        echo View::renderWithLayout('admin/layout', 'admin/article_edit', [
            'pageTitle' => '新建资讯',
            'article' => [
                'id' => '', 'title' => '', 'content' => '', 'slug' => '', 'status' => 'draft',
                'cover_image' => '', 'summary' => '', 'category' => '', 'is_recommended' => 0,
                'author' => '', 'keywords' => '', 'meta_description' => ''
            ]
        ]);
    }

    public function articleEdit($id) {
        $this->requireLogin();
        $articleModel = new Article();
        $article = $articleModel->find($id);
        if (!$article) $this->redirect('/admin/articles');
        echo View::renderWithLayout('admin/layout', 'admin/article_edit', [
            'pageTitle' => '编辑资讯',
            'article' => $article
        ]);
    }

    public function articleSave() {
        $this->requireLogin();
        $articleModel = new Article();
        $id = $_POST['id'] ?? '';
        $summary = $_POST['summary'] ?? '';
        if (empty($summary) && !empty($_POST['content'])) {
            $summary = mb_substr(strip_tags($_POST['content']), 0, 200);
        }
        $data = [
            'title' => $_POST['title'] ?? '',
            'content' => $_POST['content'] ?? '',
            'slug' => $_POST['slug'] ?? '',
            'status' => $_POST['status'] ?? 'draft',
            'cover_image' => $_POST['cover_image'] ?? '',
            'summary' => $summary,
            'category' => $_POST['category'] ?? '',
            'is_recommended' => isset($_POST['is_recommended']) ? 1 : 0,
            'author' => $_POST['author'] ?? '',
            'keywords' => $_POST['keywords'] ?? '',
            'meta_description' => $_POST['meta_description'] ?? '',
        ];
        if ($id) {
            $articleModel->update($id, $data);
            $this->redirect('/admin/article/edit/' . $id . '?saved=1');
        } else {
            $newId = $articleModel->create($data);
            $this->redirect('/admin/article/edit/' . $newId . '?saved=1');
        }
    }

    public function articleDelete($id) {
        $this->requireLogin();
        $articleModel = new Article();
        $articleModel->delete($id);
        $this->redirect('/admin/articles');
    }
}
