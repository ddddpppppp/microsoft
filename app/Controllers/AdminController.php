<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Core\Database;
use App\Core\View;
use App\Services\AiService;
use App\Models\Product;
use App\Models\Setting;
use App\Models\Article;
use App\Models\AiArticleTask;
use App\Models\AiReviewTask;
use App\Models\ProductReview;
use App\Models\ProductStats;
use App\Core\HtmlCache;
use App\Services\SitemapCache;
use App\Services\LoginAttemptService;
use App\Services\CaptchaService;

class AdminController extends Controller {

    private function requireLogin() {
        session_start();
        if (empty($_SESSION['admin_id'])) {
            $this->redirect('/admin/login');
        }
    }

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

    private function encodeScreenshotMeta($logoAlt, array $items) {
        return json_encode(
            ['logo_alt' => $logoAlt, 'items' => $items],
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
    }

    private function uploadImageFile(array $file, $targetDir, $prefix) {
        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            return null;
        }

        $name = (string)($file['name'] ?? '');
        $tmp = (string)($file['tmp_name'] ?? '');
        if ($name === '' || $tmp === '') {
            return null;
        }

        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        $allowed = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
        if (!in_array($ext, $allowed, true)) {
            return null;
        }

        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        try {
            $suffix = bin2hex(random_bytes(4));
        } catch (\Exception $e) {
            $suffix = (string)mt_rand(1000, 9999);
        }

        $filename = $prefix . '-' . date('YmdHis') . '-' . $suffix . '.' . $ext;
        $targetFile = rtrim($targetDir, '/\\') . DIRECTORY_SEPARATOR . $filename;

        if (!move_uploaded_file($tmp, $targetFile)) {
            return null;
        }

        return $filename;
    }

    public function index() {
        $this->requireLogin();
        $statsModel = new ProductStats();

        $totalStats = $statsModel->getTotalStats();
        $todayStats = $statsModel->getTodayStats();
        $dailyTrend = $statsModel->getDailyTrend(30);
        $ranking = $statsModel->getProductRanking(10);

        echo View::renderWithLayout('admin/layout', 'admin/dashboard', [
            'pageTitle' => '仪表盘',
            'totalViews' => $totalStats['total_views'] ?? 0,
            'totalDownloads' => $totalStats['total_downloads'] ?? 0,
            'todayViews' => $todayStats['today_views'] ?? 0,
            'todayDownloads' => $todayStats['today_downloads'] ?? 0,
            'dailyTrend' => json_encode($dailyTrend),
            'ranking' => $ranking,
        ]);
    }

    public function loginForm() {
        session_start();
        if (!empty($_SESSION['admin_id'])) {
            $this->redirect('/admin');
        }
        
        $loginAttempt = new LoginAttemptService();
        $ip = $loginAttempt->getClientIp();
        $isBlocked = $loginAttempt->isBlocked($ip);
        $remainingTime = $isBlocked ? $loginAttempt->getRemainingLockoutTime($ip) : 0;
        $remainingAttempts = $loginAttempt->getRemainingAttempts($ip);
        
        $captcha = new CaptchaService();
        $captchaImage = $captcha->render();
        
        echo View::render('admin/login', [
            'error' => '',
            'captchaImage' => $captchaImage,
            'isBlocked' => $isBlocked,
            'remainingTime' => $remainingTime,
            'remainingAttempts' => $remainingAttempts
        ]);
    }

    public function login() {
        session_start();
        
        $loginAttempt = new LoginAttemptService();
        $ip = $loginAttempt->getClientIp();
        
        if ($loginAttempt->isBlocked($ip)) {
            $remainingTime = $loginAttempt->getRemainingLockoutTime($ip);
            $minutes = ceil($remainingTime / 60);
            $captcha = new CaptchaService();
            echo View::render('admin/login', [
                'error' => "IP已被封锁，请在 {$minutes} 分钟后重试",
                'captchaImage' => $captcha->render(),
                'isBlocked' => true,
                'remainingTime' => $remainingTime,
                'remainingAttempts' => 0
            ]);
            return;
        }
        
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';
        $captchaInput = $_POST['captcha'] ?? '';
        
        $captcha = new CaptchaService();
        
        if (!$captcha->verify($captchaInput)) {
            echo View::render('admin/login', [
                'error' => '验证码错误',
                'captchaImage' => $captcha->render(),
                'isBlocked' => false,
                'remainingTime' => 0,
                'remainingAttempts' => $loginAttempt->getRemainingAttempts($ip)
            ]);
            return;
        }
        
        $db = Database::getInstance();
        $user = $db->fetch("SELECT * FROM admin_users WHERE username = ?", [$username]);
        
        if ($user && password_verify($password, $user['password_hash'])) {
            $loginAttempt->recordAttempt($ip, true);
            $_SESSION['admin_id'] = $user['id'];
            $_SESSION['admin_name'] = $user['username'];
            $this->redirect('/admin');
            return;
        }
        
        $loginAttempt->recordAttempt($ip, false);
        $remainingAttempts = $loginAttempt->getRemainingAttempts($ip);
        
        $errorMsg = '用户名或密码错误';
        if ($remainingAttempts <= 3 && $remainingAttempts > 0) {
            $errorMsg .= "，还剩 {$remainingAttempts} 次尝试机会";
        }
        
        echo View::render('admin/login', [
            'error' => $errorMsg,
            'captchaImage' => $captcha->render(),
            'isBlocked' => $loginAttempt->isBlocked($ip),
            'remainingTime' => 0,
            'remainingAttempts' => $remainingAttempts
        ]);
    }
    
    public function captchaRefresh() {
        session_start();
        header('Content-Type: application/json');
        $captcha = new CaptchaService();
        echo json_encode(['image' => $captcha->render()]);
        exit;
    }

    public function logout() {
        session_start();
        session_destroy();
        $this->redirect('/admin/login');
    }

    public function products() {
        $this->requireLogin();
        $page = max(1, (int)($_GET['page'] ?? 1));
        $search = trim((string)($_GET['search'] ?? ''));
        $ownFilter = $_GET['own'] ?? 'all';
        if (!in_array($ownFilter, ['all', 'own'], true)) {
            $ownFilter = 'all';
        }

        $productModel = new Product();

        $whereParts = [];
        $params = [];
        if ($search !== '') {
            $whereParts[] = 'title LIKE ?';
            $params[] = '%' . $search . '%';
        }
        if ($ownFilter === 'own') {
            $whereParts[] = 'is_own_product = 1';
        }

        if ($whereParts) {
            $result = $productModel->paginate($page, 20, implode(' AND ', $whereParts), $params);
        } else {
            $result = $productModel->paginate($page, 20);
        }

        // Attach today's stats and copy link per row for the admin table.
        $todayStatsByProductId = [];
        if (!empty($result['items'])) {
            $productIds = array_values(array_filter(array_map(function ($item) {
                return (int)($item['id'] ?? 0);
            }, $result['items'])));

            if ($productIds) {
                $db = Database::getInstance();
                $placeholders = implode(',', array_fill(0, count($productIds), '?'));
                $today = date('Y-m-d');
                $rows = $db->fetchAll(
                    "SELECT product_id, view_count, download_click_count
                     FROM product_stats
                     WHERE stat_date = ? AND product_id IN ($placeholders)",
                    array_merge([$today], $productIds)
                );
                foreach ($rows as $row) {
                    $pid = (int)($row['product_id'] ?? 0);
                    $todayStatsByProductId[$pid] = [
                        'today_views' => (int)($row['view_count'] ?? 0),
                        'today_downloads' => (int)($row['download_click_count'] ?? 0),
                    ];
                }
            }
        }

        $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'] ?? '';
        foreach ($result['items'] as &$item) {
            $pid = (int)($item['id'] ?? 0);
            $item['today_views'] = $todayStatsByProductId[$pid]['today_views'] ?? 0;
            $item['today_downloads'] = $todayStatsByProductId[$pid]['today_downloads'] ?? 0;

            $isOwn = !empty($item['is_own_product']);
            $customUrl = trim((string)($item['custom_url'] ?? ''));
            $originalUrl = trim((string)($item['original_url'] ?? ''));
            if ($isOwn && $customUrl !== '') {
                if (strpos($customUrl, '/') !== 0) {
                    $customUrl = '/' . ltrim($customUrl, '/');
                }
                $item['copy_link'] = $host ? ($scheme . '://' . $host . $customUrl) : $customUrl;
            } else {
                $item['copy_link'] = $originalUrl;
            }
        }
        unset($item);

        echo View::renderWithLayout('admin/layout', 'admin/products', [
            'pageTitle' => '产品管理',
            'products' => $result['items'],
            'pagination' => $result,
            'search' => $search,
            'ownFilter' => $ownFilter,
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
        $id = (int)($_POST['id'] ?? 0);
        $productModel = new Product();
        $product = $productModel->find($id);
        if (!$product) {
            $this->redirect('/admin/products');
        }

        $meta = $this->normalizeScreenshotMeta($product['screenshots'] ?? '', $product['title'] ?? '');
        $logoAlt = trim((string)($_POST['logo_alt'] ?? $meta['logo_alt']));
        if ($logoAlt === '') {
            $logoAlt = trim((string)($product['title'] ?? ''));
        }

        $uploadDir = BASE_PATH . '/public/assets/uploads/products/' . $id;
        $localIcon = (string)($product['local_icon'] ?? '');
        if (isset($_FILES['logo_file']) && (($_FILES['logo_file']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE)) {
            $logoFilename = $this->uploadImageFile($_FILES['logo_file'], $uploadDir, 'logo');
            if ($logoFilename) {
                $localIcon = '/assets/uploads/products/' . $id . '/' . $logoFilename;
            }
        }

        $removeUrls = array_flip(array_map('strval', $_POST['remove_existing_screenshot_urls'] ?? []));
        $existingUrls = $_POST['existing_screenshot_urls'] ?? [];
        $existingAlts = $_POST['existing_screenshot_alts'] ?? [];
        $replaceNames = $_FILES['replace_existing_screenshot_files']['name'] ?? [];
        $replaceTmps = $_FILES['replace_existing_screenshot_files']['tmp_name'] ?? [];
        $replaceErrors = $_FILES['replace_existing_screenshot_files']['error'] ?? [];
        $replaceSizes = $_FILES['replace_existing_screenshot_files']['size'] ?? [];
        $replaceTypes = $_FILES['replace_existing_screenshot_files']['type'] ?? [];
        $finalScreenshots = [];

        foreach ($existingUrls as $idx => $urlRaw) {
            $url = trim((string)$urlRaw);
            if ($url === '' || isset($removeUrls[$url])) {
                continue;
            }

            $replaceName = trim((string)($replaceNames[$idx] ?? ''));
            if ($replaceName !== '') {
                $replaceFile = [
                    'name' => $replaceName,
                    'tmp_name' => $replaceTmps[$idx] ?? '',
                    'error' => $replaceErrors[$idx] ?? UPLOAD_ERR_NO_FILE,
                    'size' => $replaceSizes[$idx] ?? 0,
                    'type' => $replaceTypes[$idx] ?? '',
                ];
                $replacedFilename = $this->uploadImageFile($replaceFile, $uploadDir, 'screenshot');
                if ($replacedFilename) {
                    $url = '/assets/uploads/products/' . $id . '/' . $replacedFilename;
                }
            }

            $alt = trim((string)($existingAlts[$idx] ?? ''));
            $finalScreenshots[] = ['url' => $url, 'alt' => $alt];
        }

        if (isset($_FILES['new_screenshot_files']) && is_array($_FILES['new_screenshot_files']['name'] ?? null)) {
            $newAlts = $_POST['new_screenshot_alts'] ?? [];
            $names = $_FILES['new_screenshot_files']['name'];
            $tmps = $_FILES['new_screenshot_files']['tmp_name'];
            $errors = $_FILES['new_screenshot_files']['error'];
            $sizes = $_FILES['new_screenshot_files']['size'];
            $types = $_FILES['new_screenshot_files']['type'];

            foreach ($names as $idx => $name) {
                if (trim((string)$name) === '') {
                    continue;
                }
                $file = [
                    'name' => $name,
                    'tmp_name' => $tmps[$idx] ?? '',
                    'error' => $errors[$idx] ?? UPLOAD_ERR_NO_FILE,
                    'size' => $sizes[$idx] ?? 0,
                    'type' => $types[$idx] ?? '',
                ];
                $shotFilename = $this->uploadImageFile($file, $uploadDir, 'screenshot');
                if (!$shotFilename) {
                    continue;
                }
                $finalScreenshots[] = [
                    'url' => '/assets/uploads/products/' . $id . '/' . $shotFilename,
                    'alt' => trim((string)($newAlts[$idx] ?? '')),
                ];
            }
        }

        $encodedScreenshots = $this->encodeScreenshotMeta($logoAlt, $finalScreenshots);

        $data = [
            'custom_title' => $_POST['custom_title'] ?? '',
            'custom_keywords' => $_POST['custom_keywords'] ?? '',
            'custom_description' => $_POST['custom_description'] ?? '',
            'custom_download_url' => $_POST['custom_download_url'] ?? '',
            'custom_url' => $_POST['custom_url'] ?? '',
            'is_own_product' => isset($_POST['is_own_product']) ? 1 : 0,
            'local_icon' => $localIcon,
            'screenshots' => $encodedScreenshots,
        ];
        
        $productModel->update($id, $data);

        $product = $productModel->find($id);
        if ($product) {
            if ($product['ms_id']) HtmlCache::forget('/detail/' . $product['ms_id']);
            if ($product['custom_url']) HtmlCache::forget($product['custom_url']);
        }
        SitemapCache::clear();

        $this->redirect('/admin/product/edit/' . $id . '?saved=1');
    }

    public function productClearCache($id) {
        $this->requireLogin();
        $productModel = new Product();
        $product = $productModel->find($id);
        if ($product) {
            if ($product['ms_id']) HtmlCache::forget('/detail/' . $product['ms_id']);
            if ($product['custom_url']) HtmlCache::forget($product['custom_url']);
        }
        SitemapCache::clear();
        $this->redirect('/admin/product/edit/' . $id . '?cache_cleared=1');
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
        $pageUris = ['/' => 'home', '/home' => 'home', '/apps' => 'apps', '/games' => 'games', '/about' => 'about', '/articles' => 'articles'];
        foreach (array_keys($pageUris) as $uri) {
            HtmlCache::forget($uri);
        }
        SitemapCache::clear();

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
            $old = $articleModel->find($id);
            $articleModel->update($id, $data);
            if ($old && $old['slug']) HtmlCache::forget('/article/' . $old['slug']);
            if ($data['slug'] && $data['slug'] !== ($old['slug'] ?? '')) {
                HtmlCache::forget('/article/' . $data['slug']);
            }
            HtmlCache::forget('/articles');
            SitemapCache::clear();
            $this->redirect('/admin/article/edit/' . $id . '?saved=1');
        } else {
            $newId = $articleModel->create($data);
            HtmlCache::forget('/articles');
            SitemapCache::clear();
            $this->redirect('/admin/article/edit/' . $newId . '?saved=1');
        }
    }

    public function articleDelete($id) {
        $this->requireLogin();
        $articleModel = new Article();
        $article = $articleModel->find($id);
        if ($article && $article['slug']) {
            HtmlCache::forget('/article/' . $article['slug']);
        }
        HtmlCache::forget('/articles');
        SitemapCache::clear();
        $articleModel->delete($id);
        $this->redirect('/admin/articles');
    }

    // ── AI Article Generation ──────────────────────────────

    public function aiGenerate() {
        $this->requireLogin();
        $taskModel = new AiArticleTask();
        $tasks = $taskModel->all('created_at DESC');
        $aiConfig = require BASE_PATH . '/config/ai.php';
        echo View::renderWithLayout('admin/layout', 'admin/ai_article_generate', [
            'pageTitle' => 'AI 文章生成',
            'tasks' => $tasks,
            'aiConfig' => $aiConfig,
        ]);
    }

    public function aiTaskCreate() {
        $this->requireLogin();
        $aiConfig = require BASE_PATH . '/config/ai.php';
        echo View::renderWithLayout('admin/layout', 'admin/ai_article_task_edit', [
            'pageTitle' => '新建 AI 任务',
            'task' => [
                'id' => '', 'name' => '', 'ai_provider' => 'deepseek', 'prompt' => '',
                'category' => '', 'auto_publish' => 0, 'schedule_type' => 'once',
                'interval_days' => 1, 'daily_time' => '09:00', 'is_active' => 1,
            ],
            'aiConfig' => $aiConfig,
        ]);
    }

    public function aiTaskEdit($id) {
        $this->requireLogin();
        $taskModel = new AiArticleTask();
        $task = $taskModel->find($id);
        if (!$task) $this->redirect('/admin/ai-article');
        $aiConfig = require BASE_PATH . '/config/ai.php';
        echo View::renderWithLayout('admin/layout', 'admin/ai_article_task_edit', [
            'pageTitle' => '编辑 AI 任务',
            'task' => $task,
            'aiConfig' => $aiConfig,
        ]);
    }

    public function aiTaskSave() {
        $this->requireLogin();
        $taskModel = new AiArticleTask();
        $id = $_POST['id'] ?? '';
        $data = [
            'name'          => $_POST['name'] ?? '',
            'ai_provider'   => $_POST['ai_provider'] ?? 'deepseek',
            'prompt'        => $_POST['prompt'] ?? '',
            'category'      => $_POST['category'] ?? '',
            'auto_publish'  => isset($_POST['auto_publish']) ? 1 : 0,
            'schedule_type' => $_POST['schedule_type'] ?? 'once',
            'interval_days' => max(1, (int)($_POST['interval_days'] ?? 1)),
            'daily_time'    => $_POST['daily_time'] ?? '09:00',
            'is_active'     => isset($_POST['is_active']) ? 1 : 0,
        ];

        if ($data['schedule_type'] === 'interval') {
            $data['next_run_at'] = date('Y-m-d H:i:s', strtotime('+' . $data['interval_days'] . ' days'));
        } elseif ($data['schedule_type'] === 'daily') {
            $time = $data['daily_time'] ?: '09:00';
            $next = date('Y-m-d') . ' ' . $time . ':00';
            if (strtotime($next) <= time()) {
                $next = date('Y-m-d', strtotime('+1 day')) . ' ' . $time . ':00';
            }
            $data['next_run_at'] = $next;
        }

        if ($id) {
            $taskModel->update($id, $data);
            $this->redirect('/admin/ai-article-task/edit/' . $id . '?saved=1');
        } else {
            $newId = $taskModel->create($data);
            $this->redirect('/admin/ai-article-task/edit/' . $newId . '?saved=1');
        }
    }

    public function aiTaskDelete($id) {
        $this->requireLogin();
        $taskModel = new AiArticleTask();
        $taskModel->delete($id);
        $this->redirect('/admin/ai-article');
    }

    public function aiTaskToggle($id) {
        $this->requireLogin();
        $taskModel = new AiArticleTask();
        $task = $taskModel->find($id);
        if ($task) {
            $taskModel->update($id, ['is_active' => $task['is_active'] ? 0 : 1]);
        }
        $this->redirect('/admin/ai-article');
    }

    public function aiTaskRun() {
        $this->requireLogin();
        header('Content-Type: application/json; charset=utf-8');

        $taskId = $_POST['task_id'] ?? '';
        $prompt = $_POST['prompt'] ?? '';
        $provider = $_POST['provider'] ?? 'deepseek';
        $category = $_POST['category'] ?? '';
        $autoPublish = !empty($_POST['auto_publish']);

        if (empty($prompt)) {
            echo json_encode(['success' => false, 'error' => '提示词不能为空']);
            exit;
        }

        $aiService = new AiService();
        $result = $aiService->generateArticle($provider, $prompt);

        if (!$result['success']) {
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
            exit;
        }

        $parsed = $aiService->parseArticle($result['content']);
        $title = $parsed['title'] ?: '未命名文章';
        $content = $parsed['content'];

        $slug = 'ai-' . date('YmdHis') . '-' . substr(md5($title), 0, 6);

        $articleModel = new Article();
        $summary = mb_substr(strip_tags($content), 0, 200);
        $articleData = [
            'title'   => $title,
            'content' => $content,
            'slug'    => $slug,
            'status'  => $autoPublish ? 'published' : 'draft',
            'summary' => $summary,
            'category' => $category,
            'author'  => 'AI',
        ];
        $articleId = $articleModel->create($articleData);

        if ($taskId) {
            $taskModel = new AiArticleTask();
            $taskModel->markRun($taskId);
        }

        echo json_encode([
            'success'    => true,
            'article_id' => $articleId,
            'title'      => $title,
            'content'    => $content,
            'slug'       => $slug,
            'edit_url'   => '/admin/article/edit/' . $articleId,
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    // ── AI Review Generation ──────────────────────────────

    public function aiReview() {
        $this->requireLogin();
        $taskModel = new AiReviewTask();
        $tasks = $taskModel->getAllWithProduct();
        $aiConfig = require BASE_PATH . '/config/ai.php';
        echo View::renderWithLayout('admin/layout', 'admin/ai_review_generate', [
            'pageTitle' => 'AI 评价生成',
            'tasks' => $tasks,
            'aiConfig' => $aiConfig,
        ]);
    }

    public function aiReviewTaskCreate() {
        $this->requireLogin();
        $productModel = new Product();
        $products = $productModel->all('title ASC');
        $aiConfig = require BASE_PATH . '/config/ai.php';
        echo View::renderWithLayout('admin/layout', 'admin/ai_review_task_edit', [
            'pageTitle' => '新建评价任务',
            'task' => [
                'id' => '', 'name' => '', 'product_id' => '', 'ai_provider' => 'deepseek',
                'prompt' => '', 'num_reviews' => 3, 'auto_publish' => 1,
                'schedule_type' => 'once', 'interval_days' => 1, 'daily_time' => '09:00', 'is_active' => 1,
            ],
            'products' => $products,
            'aiConfig' => $aiConfig,
        ]);
    }

    public function aiReviewTaskEdit($id) {
        $this->requireLogin();
        $taskModel = new AiReviewTask();
        $task = $taskModel->find($id);
        if (!$task) $this->redirect('/admin/ai-review');
        $productModel = new Product();
        $products = $productModel->all('title ASC');
        $aiConfig = require BASE_PATH . '/config/ai.php';
        echo View::renderWithLayout('admin/layout', 'admin/ai_review_task_edit', [
            'pageTitle' => '编辑评价任务',
            'task' => $task,
            'products' => $products,
            'aiConfig' => $aiConfig,
        ]);
    }

    public function aiReviewTaskSave() {
        $this->requireLogin();
        $taskModel = new AiReviewTask();
        $id = $_POST['id'] ?? '';
        $data = [
            'name'          => $_POST['name'] ?? '',
            'product_id'    => (int)($_POST['product_id'] ?? 0),
            'ai_provider'   => $_POST['ai_provider'] ?? 'deepseek',
            'prompt'        => $_POST['prompt'] ?? '',
            'num_reviews'   => max(1, (int)($_POST['num_reviews'] ?? 3)),
            'auto_publish'  => isset($_POST['auto_publish']) ? 1 : 0,
            'schedule_type' => $_POST['schedule_type'] ?? 'once',
            'interval_days' => max(1, (int)($_POST['interval_days'] ?? 1)),
            'daily_time'    => $_POST['daily_time'] ?? '09:00',
            'is_active'     => isset($_POST['is_active']) ? 1 : 0,
        ];

        if ($data['schedule_type'] === 'interval') {
            $data['next_run_at'] = date('Y-m-d H:i:s', strtotime('+' . $data['interval_days'] . ' days'));
        } elseif ($data['schedule_type'] === 'daily') {
            $time = $data['daily_time'] ?: '09:00';
            $next = date('Y-m-d') . ' ' . $time . ':00';
            if (strtotime($next) <= time()) {
                $next = date('Y-m-d', strtotime('+1 day')) . ' ' . $time . ':00';
            }
            $data['next_run_at'] = $next;
        }

        if ($id) {
            $taskModel->update($id, $data);
            $this->redirect('/admin/ai-review-task/edit/' . $id . '?saved=1');
        } else {
            $newId = $taskModel->create($data);
            $this->redirect('/admin/ai-review-task/edit/' . $newId . '?saved=1');
        }
    }

    public function aiReviewTaskDelete($id) {
        $this->requireLogin();
        $taskModel = new AiReviewTask();
        $taskModel->delete($id);
        $this->redirect('/admin/ai-review');
    }

    public function aiReviewTaskToggle($id) {
        $this->requireLogin();
        $taskModel = new AiReviewTask();
        $task = $taskModel->find($id);
        if ($task) {
            $taskModel->update($id, ['is_active' => $task['is_active'] ? 0 : 1]);
        }
        $this->redirect('/admin/ai-review');
    }

    public function aiReviewTaskRun() {
        $this->requireLogin();
        header('Content-Type: application/json; charset=utf-8');

        $taskId = $_POST['task_id'] ?? '';
        $productId = (int)($_POST['product_id'] ?? 0);
        $prompt = $_POST['prompt'] ?? '';
        $provider = $_POST['provider'] ?? 'deepseek';
        $numReviews = max(1, (int)($_POST['num_reviews'] ?? 3));
        $autoPublish = !empty($_POST['auto_publish']);

        if (empty($productId)) {
            echo json_encode(['success' => false, 'error' => '请选择产品']);
            exit;
        }

        $productModel = new Product();
        $product = $productModel->find($productId);
        if (!$product) {
            echo json_encode(['success' => false, 'error' => '产品不存在']);
            exit;
        }

        $aiService = new AiService();
        $options = [];
        if (!empty($prompt)) {
            $options['custom_prompt'] = $prompt;
        }

        $result = $aiService->generateProductReviews($provider, $product['title'], $numReviews, $options);

        if (!$result['success']) {
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
            exit;
        }

        $reviewModel = new ProductReview();
        $created = 0;
        foreach ($result['reviews'] as $r) {
            $reviewModel->create([
                'product_id'  => $productId,
                'author_name' => $r['author_name'] ?? '匿名用户',
                'rating'      => max(1, min(5, (float)($r['rating'] ?? 5))),
                'title'       => $r['title'] ?? '',
                'content'     => $r['content'] ?? '',
                'pros'        => $r['pros'] ?? '',
                'cons'        => $r['cons'] ?? '',
                'summary'     => $r['summary'] ?? '',
                'status'      => $autoPublish ? 'published' : 'draft',
            ]);
            $created++;
        }

        if ($taskId) {
            $taskModel = new AiReviewTask();
            $taskModel->markRun($taskId);
        }

        echo json_encode([
            'success' => true,
            'count'   => $created,
            'reviews' => $result['reviews'],
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function aiConfigSave() {
        $this->requireLogin();
        $provider = $_POST['provider'] ?? '';
        $apiKey = $_POST['api_key'] ?? '';
        $model = $_POST['model'] ?? '';

        if (empty($provider)) {
            $this->redirect('/admin/ai-article?error=1');
        }

        $configFile = BASE_PATH . '/config/ai.php';
        $config = require $configFile;

        if (isset($config[$provider])) {
            if (!empty($apiKey)) {
                $config[$provider]['api_key'] = $apiKey;
            }
            if (!empty($model)) {
                $config[$provider]['model'] = $model;
            }
        }

        $export = "<?php\nreturn " . var_export($config, true) . ";\n";
        file_put_contents($configFile, $export);

        $this->redirect('/admin/ai-article?config_saved=1');
    }
}
