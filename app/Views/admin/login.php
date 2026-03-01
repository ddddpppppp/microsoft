<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>管理后台 - 登录</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        * { box-sizing: border-box; }
        body {
            background: #f8fafc;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .login-container {
            width: 100%;
            max-width: 420px;
            padding: 20px;
        }
        .login-box {
            background: #fff;
            border-radius: 14px;
            padding: 28px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
        }
        .login-header {
            text-align: center;
            margin-bottom: 24px;
        }
        .login-header h2 {
            font-size: 24px;
            font-weight: 700;
            color: #0f172a;
            margin: 0;
        }
        .login-header p {
            color: #64748b;
            margin-top: 8px;
            font-size: 14px;
        }
        .form-label {
            font-weight: 600;
            color: #334155;
            font-size: 13px;
        }
        .form-control {
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            padding: 10px 12px;
            font-size: 14px;
            transition: border-color .2s ease, box-shadow .2s ease;
        }
        .form-control:focus {
            border-color: #93c5fd;
            box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.35);
        }
        .captcha-group {
            display: flex;
            gap: 12px;
            align-items: stretch;
        }
        .captcha-group .form-control {
            flex: 1;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 600;
        }
        .captcha-wrapper {
            position: relative;
            cursor: pointer;
            border-radius: 8px;
            overflow: hidden;
            flex-shrink: 0;
            border: 1px solid #e2e8f0;
        }
        .captcha-wrapper img {
            height: 50px;
            width: 150px;
            display: block;
        }
        .captcha-refresh {
            position: absolute;
            bottom: 4px;
            right: 4px;
            background: rgba(15, 23, 42, 0.65);
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 10px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s;
        }
        .captcha-wrapper:hover .captcha-refresh {
            opacity: 1;
        }
        .btn-login {
            width: 100%;
            padding: 10px 14px;
            font-size: 14px;
            font-weight: 500;
            border: 1px solid #2563eb;
            border-radius: 10px;
            background: #2563eb;
            color: #fff;
            cursor: pointer;
            transition: background-color .2s ease;
            margin-top: 8px;
        }
        .btn-login:hover:not(:disabled) {
            background: #1d4ed8;
        }
        .btn-login:disabled {
            background: #94a3b8;
            border-color: #94a3b8;
            cursor: not-allowed;
        }
        .alert {
            border: 1px solid transparent;
            border-radius: 10px;
            padding: 14px 18px;
            font-size: 14px;
        }
        .alert-danger {
            background: #fef2f2;
            border-color: #fecaca;
            color: #991b1b;
        }
        .alert-warning {
            background: #fffbeb;
            border-color: #fde68a;
            color: #92400e;
        }
        .blocked-timer {
            text-align: center;
            padding: 20px;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 12px;
            color: #991b1b;
            margin-bottom: 20px;
        }
        .blocked-timer .icon {
            font-size: 40px;
            margin-bottom: 12px;
        }
        .blocked-timer .time {
            font-size: 30px;
            font-weight: 700;
            font-family: monospace;
        }
        .blocked-timer p {
            margin: 8px 0 0;
            opacity: 0.75;
        }
        .attempts-warning {
            text-align: center;
            font-size: 13px;
            color: #b45309;
            margin-top: 12px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-box">
            <div class="login-header">
                <h2>管理后台</h2>
                <p>请输入您的账号信息</p>
            </div>

            <?php if (!empty($isBlocked) && $isBlocked): ?>
                <div class="blocked-timer">
                    <div class="icon"><i class="bi bi-shield-lock"></i></div>
                    <div class="time" id="countdown">--:--</div>
                    <p>IP已被暂时封锁，请稍后再试</p>
                </div>
                <script>
                    (function() {
                        let remaining = <?= (int)$remainingTime ?>;
                        const el = document.getElementById('countdown');
                        function update() {
                            if (remaining <= 0) {
                                location.reload();
                                return;
                            }
                            const m = Math.floor(remaining / 60);
                            const s = remaining % 60;
                            el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
                            remaining--;
                            setTimeout(update, 1000);
                        }
                        update();
                    })();
                </script>
            <?php else: ?>
                <?php if (!empty($error)): ?>
                    <div class="alert alert-danger mb-3"><?= htmlspecialchars($error) ?></div>
                <?php endif; ?>

                <form method="POST" action="/admin/login" id="loginForm">
                    <div class="mb-3">
                        <label class="form-label">用户名</label>
                        <input type="text" name="username" class="form-control" required autofocus autocomplete="username">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">密码</label>
                        <input type="password" name="password" class="form-control" required autocomplete="current-password">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">验证码</label>
                        <div class="captcha-group">
                            <input type="text" name="captcha" class="form-control" required maxlength="4" 
                                   placeholder="请输入验证码" autocomplete="off">
                            <div class="captcha-wrapper" onclick="refreshCaptcha()" title="点击刷新验证码">
                                <img src="<?= htmlspecialchars($captchaImage ?? '') ?>" alt="验证码" id="captchaImg">
                                <span class="captcha-refresh">刷新</span>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn-login">登 录</button>
                </form>

                <?php if (isset($remainingAttempts) && $remainingAttempts <= 3 && $remainingAttempts > 0): ?>
                    <div class="attempts-warning">
                        <i class="bi bi-exclamation-triangle"></i> 还剩 <?= $remainingAttempts ?> 次尝试机会
                    </div>
                <?php endif; ?>

                <script>
                    function refreshCaptcha() {
                        const img = document.getElementById('captchaImg');
                        fetch('/admin/captcha/refresh')
                            .then(r => r.json())
                            .then(data => {
                                if (data.image) {
                                    img.src = data.image;
                                }
                            })
                            .catch(() => {
                                img.src = img.src.split('?')[0] + '?t=' + Date.now();
                            });
                    }
                </script>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>
