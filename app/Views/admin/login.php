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
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
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
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }
        .login-header {
            text-align: center;
            margin-bottom: 32px;
        }
        .login-header h2 {
            font-size: 28px;
            font-weight: 700;
            color: #1a1a2e;
            margin: 0;
        }
        .login-header p {
            color: #666;
            margin-top: 8px;
            font-size: 14px;
        }
        .form-label {
            font-weight: 500;
            color: #333;
            font-size: 14px;
        }
        .form-control {
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            padding: 12px 16px;
            font-size: 15px;
            transition: all 0.3s ease;
        }
        .form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
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
            transition: transform 0.2s ease;
        }
        .captcha-wrapper:hover {
            transform: scale(1.02);
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
            background: rgba(0,0,0,0.5);
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
            padding: 14px;
            font-size: 16px;
            font-weight: 600;
            border: none;
            border-radius: 10px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 8px;
        }
        .btn-login:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        .btn-login:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        .alert {
            border: none;
            border-radius: 10px;
            padding: 14px 18px;
            font-size: 14px;
        }
        .alert-danger {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
            color: #fff;
        }
        .alert-warning {
            background: linear-gradient(135deg, #ffa726 0%, #fb8c00 100%);
            color: #fff;
        }
        .blocked-timer {
            text-align: center;
            padding: 20px;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
            border-radius: 12px;
            color: #fff;
            margin-bottom: 20px;
        }
        .blocked-timer .icon {
            font-size: 48px;
            margin-bottom: 12px;
        }
        .blocked-timer .time {
            font-size: 32px;
            font-weight: 700;
            font-family: monospace;
        }
        .blocked-timer p {
            margin: 8px 0 0;
            opacity: 0.9;
        }
        .attempts-warning {
            text-align: center;
            font-size: 13px;
            color: #e74c3c;
            margin-top: 12px;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        .shake { animation: shake 0.4s ease; }
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
