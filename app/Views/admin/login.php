<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>管理后台 - 登录</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background: #1b1b1b; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .login-box { background: #fff; border-radius: 8px; padding: 40px; width: 400px; }
        .login-box h2 { margin-bottom: 24px; text-align: center; }
    </style>
</head>
<body>
    <div class="login-box">
        <h2>管理后台</h2>
        <?php if (!empty($error)): ?>
            <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <form method="POST" action="/admin/login">
            <div class="mb-3">
                <label class="form-label">用户名</label>
                <input type="text" name="username" class="form-control" required autofocus>
            </div>
            <div class="mb-3">
                <label class="form-label">密码</label>
                <input type="password" name="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">登录</button>
        </form>
    </div>
</body>
</html>
