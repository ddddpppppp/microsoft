<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle ?? '管理后台') ?> - 管理后台</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        body { background: #f5f5f5; }
        .sidebar { width: 220px; min-height: 100vh; background: #1b1b1b; color: #fff; position: fixed; left: 0; top: 0; }
        .sidebar .brand { padding: 20px 16px; font-size: 16px; font-weight: 600; border-bottom: 1px solid #333; }
        .sidebar .nav-link { color: #ccc; padding: 10px 16px; font-size: 14px; display: flex; align-items: center; gap: 8px; }
        .sidebar .nav-link:hover, .sidebar .nav-link.active { color: #fff; background: #333; }
        .sidebar .nav-link i { font-size: 16px; }
        .main-content { margin-left: 220px; padding: 20px 30px; }
        .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1px solid #ddd; }
        .top-bar h1 { font-size: 22px; font-weight: 600; }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="brand">Microsoft Store 管理</div>
        <nav>
            <a href="/admin" class="nav-link"><i class="bi bi-speedometer2"></i> 仪表盘</a>
            <a href="/admin/products" class="nav-link"><i class="bi bi-box-seam"></i> 产品管理</a>
            <a href="/admin/settings" class="nav-link"><i class="bi bi-gear"></i> SEO 设置</a>
            <a href="/admin/articles" class="nav-link"><i class="bi bi-newspaper"></i> 资讯管理</a>
            <a href="/admin/ai-generate" class="nav-link"><i class="bi bi-robot"></i> AI 文章生成</a>
            <a href="/" class="nav-link" target="_blank"><i class="bi bi-globe"></i> 访问前台</a>
            <a href="/admin/logout" class="nav-link"><i class="bi bi-box-arrow-right"></i> 退出登录</a>
        </nav>
    </div>
    <div class="main-content">
        <div class="top-bar">
            <h1><?= htmlspecialchars($pageTitle ?? '') ?></h1>
            <span>欢迎, <?= htmlspecialchars($_SESSION['admin_name'] ?? 'Admin') ?></span>
        </div>
        <?= $content ?? '' ?>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
