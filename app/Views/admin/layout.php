<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle ?? '管理后台') ?> - 管理后台</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        :root {
            --background: #f8fafc;
            --foreground: #0f172a;
            --muted-foreground: #64748b;
            --card: #ffffff;
            --border: #e2e8f0;
            --ring: #93c5fd;
            --primary: #2563eb;
            --primary-foreground: #ffffff;
            --secondary: #f1f5f9;
            --success: #16a34a;
            --warning: #f59e0b;
            --danger: #ef4444;
            --radius: 12px;
        }

        * { box-sizing: border-box; }

        body {
            margin: 0;
            color: var(--foreground);
            background: var(--background);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        a { text-decoration: none; }

        .sidebar {
            width: 248px;
            min-height: 100vh;
            background: #ffffff;
            border-right: 1px solid var(--border);
            position: fixed;
            left: 0;
            top: 0;
            z-index: 20;
            display: flex;
            flex-direction: column;
        }

        .sidebar .brand {
            padding: 20px 18px;
            font-size: 15px;
            font-weight: 700;
            border-bottom: 1px solid var(--border);
            letter-spacing: 0.01em;
        }

        .sidebar nav {
            padding: 14px 10px;
            display: grid;
            gap: 4px;
        }

        .sidebar .nav-link {
            color: #334155;
            padding: 10px 12px;
            font-size: 14px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: background-color .2s ease, color .2s ease;
        }

        .sidebar .nav-link:hover {
            color: #0f172a;
            background: #f1f5f9;
        }

        .sidebar .nav-link.active {
            color: #1d4ed8;
            background: #dbeafe;
            font-weight: 600;
        }

        .sidebar .nav-link i { font-size: 16px; }

        .main-content {
            margin-left: 248px;
            padding: 22px 28px;
        }

        .top-bar {
            min-height: 64px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding: 10px 16px;
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
        }

        .top-bar h1 {
            font-size: 21px;
            font-weight: 700;
            margin: 0;
        }

        .user-panel {
            position: relative;
        }

        .user-trigger {
            width: 42px;
            height: 42px;
            border-radius: 999px;
            border: 1px solid #d1d5db;
            background: #f3f4f6;
            color: #334155;
            font-size: 16px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color .2s ease, border-color .2s ease;
        }

        .user-trigger:hover {
            background: #e5e7eb;
            border-color: #cbd5e1;
        }

        .user-menu {
            position: absolute;
            top: calc(100% + 10px);
            right: 0;
            width: 290px;
            border: 1px solid #e5e7eb;
            border-radius: 14px;
            background: #fff;
            box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-8px);
            pointer-events: none;
            z-index: 40;
            overflow: hidden;
            transition: opacity .2s ease, transform .2s ease, visibility .2s ease;
        }

        .user-panel.is-open .user-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
            pointer-events: auto;
        }

        .user-menu .menu-user {
            padding: 16px 18px 14px;
            border-bottom: 1px solid #eceff3;
        }

        .user-menu .menu-name {
            font-size: 18px;
            line-height: 1.15;
            color: #1f2937;
            font-weight: 600;
        }

        .user-menu .menu-email {
            margin-top: 6px;
            font-size: 13px;
            color: #6b7280;
            line-height: 1.25;
            word-break: break-all;
        }

        .user-menu .menu-item {
            height: 48px;
            padding: 0 18px;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #2f3135;
            border-bottom: 1px solid #eceff3;
        }

        .user-menu .menu-item {
            text-decoration: none;
            cursor: pointer;
            transition: background-color .2s ease;
        }

        .user-menu .menu-item:last-child {
            border-bottom: 0;
        }

        .user-menu .menu-item:hover {
            background: #f8fafc;
            color: #111827;
        }

        .card {
            border: 1px solid var(--border) !important;
            border-radius: var(--radius) !important;
            box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
        }

        .card-header {
            background: #fff;
            border-bottom: 1px solid var(--border);
            font-weight: 600;
        }

        .table {
            --bs-table-bg: transparent;
            --bs-table-color: #0f172a;
            --bs-table-striped-bg: #f8fafc;
            --bs-table-hover-bg: #f8fafc;
            margin-bottom: 0;
        }

        .table > :not(caption) > * > * {
            border-bottom-color: var(--border);
            padding-top: 0.7rem;
            padding-bottom: 0.7rem;
            vertical-align: middle;
        }

        .table thead th {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            color: #64748b;
            font-weight: 700;
        }

        .table-light {
            --bs-table-bg: #f8fafc;
            --bs-table-color: #334155;
        }

        .table-secondary {
            --bs-table-accent-bg: #f8fafc;
        }

        .form-control,
        .form-select,
        .input-group-text {
            border-color: var(--border);
            border-radius: 10px;
            font-size: 14px;
        }

        .form-control:focus,
        .form-select:focus {
            border-color: #93c5fd;
            box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.35);
        }

        .form-label { font-size: 13px; font-weight: 600; color: #334155; }
        .text-muted { color: #64748b !important; }

        .btn {
            border-radius: 10px;
            font-size: 14px;
            font-weight: 500;
            border-width: 1px;
        }

        .btn-primary, .btn-success {
            border-color: var(--primary);
            background-color: var(--primary);
            color: var(--primary-foreground);
        }

        .btn-primary:hover, .btn-success:hover {
            border-color: #1d4ed8;
            background-color: #1d4ed8;
            color: #fff;
        }

        .btn-secondary {
            border-color: var(--border);
            background-color: #fff;
            color: #0f172a;
        }

        .btn-secondary:hover {
            background: #f8fafc;
            border-color: #cbd5e1;
            color: #0f172a;
        }

        .btn-outline-primary {
            border-color: #cbd5e1;
            color: #1e293b;
        }

        .btn-outline-primary:hover {
            border-color: #cbd5e1;
            background: #f1f5f9;
            color: #0f172a;
        }

        .btn-outline-secondary,
        .btn-outline-success,
        .btn-warning {
            border-color: #cbd5e1;
            color: #1e293b;
            background: #fff;
        }

        .btn-outline-secondary:hover,
        .btn-outline-success:hover,
        .btn-warning:hover {
            border-color: #cbd5e1;
            background: #f8fafc;
            color: #0f172a;
        }

        .btn-outline-danger {
            border-color: #fecaca;
            color: #dc2626;
        }

        .btn-outline-danger:hover {
            border-color: #fecaca;
            background: #fef2f2;
            color: #b91c1c;
        }

        .badge {
            border-radius: 999px;
            font-weight: 600;
            letter-spacing: 0.01em;
            padding: 0.35em 0.7em;
        }

        .badge.bg-info,
        .badge.bg-primary { background: #dbeafe !important; color: #1e3a8a; }
        .badge.bg-success { background: #dcfce7 !important; color: #166534; }
        .badge.bg-warning { background: #fef3c7 !important; color: #92400e; }
        .badge.bg-secondary { background: #e2e8f0 !important; color: #334155; }

        .alert {
            border-radius: 12px;
            border: 1px solid var(--border);
            padding: 12px 14px;
        }

        .alert-success { background: #f0fdf4; border-color: #bbf7d0; color: #166534; }
        .alert-danger { background: #fef2f2; border-color: #fecaca; color: #991b1b; }
        .alert-info { background: #eff6ff; border-color: #bfdbfe; color: #1e40af; }

        .pagination {
            --bs-pagination-border-color: var(--border);
            --bs-pagination-color: #334155;
            --bs-pagination-bg: #fff;
            --bs-pagination-hover-bg: #f8fafc;
            --bs-pagination-hover-color: #0f172a;
            --bs-pagination-active-bg: #e2e8f0;
            --bs-pagination-active-color: #0f172a;
            --bs-pagination-active-border-color: #cbd5e1;
            gap: 6px;
        }

        .page-link {
            border-radius: 8px;
            min-width: 36px;
            text-align: center;
        }

        .border, .border-bottom { border-color: var(--border) !important; }
        .bg-light { background: #f8fafc !important; }

        #editor { border-color: var(--border) !important; border-radius: 10px; }
        .ql-toolbar.ql-snow { border-color: var(--border) !important; border-radius: 10px 10px 0 0; }
        .ql-container.ql-snow { border-color: var(--border) !important; border-radius: 0 0 10px 10px; }
    </style>
</head>
<body>
    <?php
        $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
        $startsWith = function (string $haystack, string $needle): bool {
            return $needle !== '' && strpos($haystack, $needle) === 0;
        };
        $isActive = function (array $paths) use ($uri, $startsWith): bool {
            foreach ($paths as $path) {
                if ($path !== '/' && $startsWith($uri, $path)) {
                    return true;
                }
                if ($path === $uri) {
                    return true;
                }
            }
            return false;
        };
        $adminName = htmlspecialchars($_SESSION['admin_name'] ?? 'Admin');
        $adminEmail = htmlspecialchars($_SESSION['admin_email'] ?? '');
        $rawName = trim($_SESSION['admin_name'] ?? 'A');
        if (function_exists('mb_substr')) {
            $adminAvatar = mb_substr($rawName, 0, 1);
        } else {
            $adminAvatar = substr($rawName, 0, 1);
        }
        if ($adminAvatar === '') {
            $adminAvatar = 'A';
        }
    ?>
    <div class="sidebar">
        <div class="brand">Microsoft Store 管理</div>
        <nav>
            <a href="/admin" class="nav-link <?= $isActive(['/admin']) && !$isActive(['/admin/products', '/admin/product', '/admin/settings', '/admin/articles', '/admin/ai-article', '/admin/ai-review']) ? 'active' : '' ?>"><i class="bi bi-speedometer2"></i> 仪表盘</a>
            <a href="/admin/products" class="nav-link <?= $isActive(['/admin/products', '/admin/product']) ? 'active' : '' ?>"><i class="bi bi-box-seam"></i> 产品管理</a>
            <a href="/admin/settings" class="nav-link <?= $isActive(['/admin/settings']) ? 'active' : '' ?>"><i class="bi bi-gear"></i> SEO 设置</a>
            <a href="/admin/articles" class="nav-link <?= $isActive(['/admin/articles', '/admin/article']) ? 'active' : '' ?>"><i class="bi bi-newspaper"></i> 资讯管理</a>
            <a href="/admin/ai-article" class="nav-link <?= $isActive(['/admin/ai-article']) ? 'active' : '' ?>"><i class="bi bi-robot"></i> AI 文章生成</a>
            <a href="/admin/ai-review" class="nav-link <?= $isActive(['/admin/ai-review']) ? 'active' : '' ?>"><i class="bi bi-chat-square-quote"></i> AI 评价生成</a>
        </nav>
    </div>
    <div class="main-content">
        <div class="top-bar">
            <h1><?= htmlspecialchars($pageTitle ?? '') ?></h1>
            <div class="user-panel" id="userPanel">
                <button class="user-trigger" id="userTrigger" aria-expanded="false" aria-haspopup="true"><?= $adminAvatar ?></button>
                <div class="user-menu" id="userMenu" role="menu">
                    <div class="menu-user">
                        <div class="menu-name"><?= $adminName ?></div>
                        <?php if ($adminEmail !== ''): ?>
                            <div class="menu-email"><?= $adminEmail ?></div>
                        <?php endif; ?>
                    </div>
                    <a href="/" class="menu-item" target="_blank">访问前台</a>
                    <a href="/admin/logout" class="menu-item" role="menuitem">退出</a>
                </div>
            </div>
        </div>
        <?= $content ?? '' ?>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        (function() {
            var panel = document.getElementById('userPanel');
            var trigger = document.getElementById('userTrigger');
            var menu = document.getElementById('userMenu');
            if (!panel || !trigger || !menu) return;

            function setOpen(open) {
                panel.classList.toggle('is-open', open);
                trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
            }

            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                setOpen(!panel.classList.contains('is-open'));
            });

            document.addEventListener('click', function(e) {
                if (!panel.contains(e.target)) {
                    setOpen(false);
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    setOpen(false);
                }
            });
        })();
    </script>
</body>
</html>
