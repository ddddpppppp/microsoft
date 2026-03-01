<?php
$screenshotMeta = [];
$logoAlt = '';
$decoded = json_decode($product['screenshots'] ?? '', true);
if (is_array($decoded)) {
    if (isset($decoded['items']) && is_array($decoded['items'])) {
        $logoAlt = trim((string)($decoded['logo_alt'] ?? ''));
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
            $screenshotMeta[] = ['url' => $url, 'alt' => $alt];
        }
    }
}
if ($logoAlt === '') {
    $logoAlt = trim((string)($product['title'] ?? ''));
}
?>
<?php if (isset($_GET['saved'])): ?>
<div class="alert alert-success alert-dismissible fade show">保存成功！<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>
<?php if (isset($_GET['cache_cleared'])): ?>
<div class="alert alert-info alert-dismissible fade show">缓存已清除！<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>
<div class="card">
    <div class="card-body">
        <style>
            .seo-thumb-wrap { position: relative; width: fit-content; }
            .seo-thumb-clickable { cursor: pointer; transition: transform 0.15s ease; }
            .seo-thumb-clickable:hover { transform: scale(1.02); }
            .shot-card { position: relative; }
            .compact-admin-form .mb-3 { margin-bottom: 0.7rem !important; }
            .compact-admin-form .mb-2 { margin-bottom: 0.45rem !important; }
            .compact-admin-form hr { margin: 0.8rem 0; }
            .compact-admin-form .form-label { margin-bottom: 0.3rem; font-size: 13px; }
            .compact-admin-form .form-control { font-size: 13px; padding-top: 0.4rem; padding-bottom: 0.4rem; }
            .compact-admin-form .d-grid.gap-3 { gap: 0.6rem !important; }
            .compact-admin-form .d-grid.gap-2 { gap: 0.45rem !important; }
            .compact-admin-form .btn { padding-top: 0.35rem; padding-bottom: 0.35rem; }
            .shot-remove-btn {
                position: absolute;
                right: 8px;
                top: 8px;
                width: 24px;
                height: 24px;
                border: 0;
                border-radius: 50%;
                background: #dc3545;
                color: #fff;
                font-weight: 700;
                line-height: 1;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                z-index: 3;
            }
            .shot-remove-btn:hover { background: #bb2d3b; }
        </style>
        <div class="row mb-4">
            <div class="col-auto">
                <img src="<?= htmlspecialchars($product['local_icon'] ?: $product['icon_url']) ?>" width="64" height="64" style="border-radius:8px;">
            </div>
            <div class="col">
                <h5><?= htmlspecialchars($product['title']) ?></h5>
                <p class="text-muted mb-0">MS ID: <?= htmlspecialchars($product['ms_id']) ?> | 类型: <?= $product['product_type'] ?> | 评分: <?= $product['rating'] ?></p>
                <p class="text-muted mb-0">原始链接: <a href="<?= htmlspecialchars($product['original_url']) ?>" target="_blank"><?= htmlspecialchars($product['original_url']) ?></a></p>
            </div>
        </div>
        <form method="POST" action="/admin/product/save" enctype="multipart/form-data" class="compact-admin-form">
            <input type="hidden" name="id" value="<?= $product['id'] ?>">
            <div class="mb-3">
                <label class="form-label">自定义标题</label>
                <input type="text" name="custom_title" class="form-control" value="<?= htmlspecialchars($product['custom_title']) ?>" placeholder="留空使用原标题">
            </div>
            <div class="mb-3">
                <label class="form-label">自定义关键词</label>
                <input type="text" name="custom_keywords" class="form-control" value="<?= htmlspecialchars($product['custom_keywords']) ?>" placeholder="SEO关键词，逗号分隔">
            </div>
            <div class="mb-3">
                <label class="form-label">自定义描述</label>
                <textarea name="custom_description" class="form-control" rows="3" placeholder="SEO描述"><?= htmlspecialchars($product['custom_description']) ?></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">自定义下载链接</label>
                <input type="text" name="custom_download_url" class="form-control" value="<?= htmlspecialchars($product['custom_download_url']) ?>" placeholder="留空使用微软原始链接">
            </div>
            <div class="mb-3">
                <label class="form-label">自定义页面URL</label>
                <input type="text" name="custom_url" class="form-control" value="<?= htmlspecialchars($product['custom_url']) ?>" placeholder="例如 /desk.html">
            </div>

            <hr>
            <h6 class="mb-3">Logo SEO</h6>
            <div class="mb-2">
                <div class="seo-thumb-wrap">
                    <img id="logoPreview" src="<?= htmlspecialchars($product['local_icon'] ?: $product['icon_url']) ?>" alt="<?= htmlspecialchars($logoAlt) ?>" width="84" height="84" class="seo-thumb-clickable" style="border-radius:10px;object-fit:cover;background:#f3f4f6;">
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Logo 描述（用于 alt）</label>
                <input type="text" name="logo_alt" class="form-control" value="<?= htmlspecialchars($logoAlt) ?>" placeholder="例如：Telegram Desktop app icon">
                <input type="file" id="logoFileInput" name="logo_file" class="d-none" accept="image/png,image/jpeg,image/webp,image/gif">
                <small class="text-muted d-block mt-1">点击上方 Logo 图片即可替换，保存后生效。</small>
            </div>

            <hr>
            <h6 class="mb-3">产品截图 SEO</h6>
            <div class="mb-3">
                <label class="form-label">已存在截图（可编辑描述/删除）</label>
                <?php if (empty($screenshotMeta)): ?>
                    <div class="text-muted">暂无截图</div>
                <?php else: ?>
                    <div class="d-grid gap-3">
                        <?php foreach ($screenshotMeta as $idx => $shot): ?>
                            <div class="border rounded p-3 bg-light shot-card js-existing-shot-card">
                                <button type="button" class="shot-remove-btn js-remove-existing" title="删除">-</button>
                                <div class="row g-3 align-items-start">
                                    <div class="col-md-3">
                                        <img src="<?= htmlspecialchars($shot['url']) ?>" alt="<?= htmlspecialchars($shot['alt']) ?>" class="img-fluid rounded seo-thumb-clickable js-existing-shot-preview" style="max-height:96px;object-fit:contain;background:#fff;">
                                    </div>
                                    <div class="col-md-9">
                                        <input type="hidden" name="existing_screenshot_urls[]" value="<?= htmlspecialchars($shot['url']) ?>">
                                        <input type="file" name="replace_existing_screenshot_files[]" class="d-none js-replace-existing-file" accept="image/png,image/jpeg,image/webp,image/gif">
                                        <label class="form-label">截图描述（alt）</label>
                                        <input type="text" name="existing_screenshot_alts[]" class="form-control mb-2" value="<?= htmlspecialchars($shot['alt']) ?>" placeholder="例如：Telegram chat list screenshot">
                                        <input class="d-none js-remove-existing-input" type="checkbox" name="remove_existing_screenshot_urls[]" value="<?= htmlspecialchars($shot['url']) ?>" id="removeShot<?= $idx ?>">
                                        <small class="text-muted">点击截图可替换图片；右上角红色减号可删除。</small>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>

            <div class="mb-3">
                <label class="form-label">新增截图上传（可填写描述）</label>
                <div id="newScreenshots" class="d-grid gap-2">
                    <div class="border rounded p-3 shot-card js-new-shot-card">
                        <button type="button" class="shot-remove-btn js-remove-row" title="删除">-</button>
                        <div class="row g-2">
                            <div class="col-md-6">
                                <input type="file" name="new_screenshot_files[]" class="form-control" accept="image/png,image/jpeg,image/webp,image/gif">
                            </div>
                            <div class="col-md-6">
                                <input type="text" name="new_screenshot_alts[]" class="form-control" placeholder="截图描述（alt）">
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-outline-secondary mt-2" id="addScreenshotRow">+ 添加一行截图上传</button>
            </div>

            <div class="mb-3 form-check">
                <input type="checkbox" name="is_own_product" class="form-check-input" id="isOwn" <?= $product['is_own_product'] ? 'checked' : '' ?>>
                <label class="form-check-label" for="isOwn">标记为自有产品（点击后跳转到本站页面）</label>
            </div>
            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">保存</button>
                <a href="/admin/product/clear-cache/<?= $product['id'] ?>" class="btn btn-warning" onclick="return confirm('确定清除该产品的SEO缓存？')">清除缓存</a>
                <a href="/admin/products" class="btn btn-secondary">返回列表</a>
            </div>
        </form>
    </div>
</div>

<script>
    (function () {
        var addBtn = document.getElementById('addScreenshotRow');
        var container = document.getElementById('newScreenshots');
        var logoPreview = document.getElementById('logoPreview');
        var logoInput = document.getElementById('logoFileInput');

        if (logoPreview && logoInput) {
            logoPreview.addEventListener('click', function () {
                logoInput.click();
            });
            logoInput.addEventListener('change', function () {
                var file = logoInput.files && logoInput.files[0];
                if (!file) return;
                logoPreview.src = URL.createObjectURL(file);
            });
        }

        var existingCards = document.querySelectorAll('.js-existing-shot-card');
        existingCards.forEach(function (card) {
            var preview = card.querySelector('.js-existing-shot-preview');
            var replaceInput = card.querySelector('.js-replace-existing-file');
            var removeBtn = card.querySelector('.js-remove-existing');
            var removeInput = card.querySelector('.js-remove-existing-input');

            if (preview && replaceInput) {
                preview.addEventListener('click', function () {
                    replaceInput.click();
                });
                replaceInput.addEventListener('change', function () {
                    var file = replaceInput.files && replaceInput.files[0];
                    if (!file) return;
                    preview.src = URL.createObjectURL(file);
                    if (removeInput) removeInput.checked = false;
                });
            }

            if (removeBtn && removeInput) {
                removeBtn.addEventListener('click', function () {
                    removeInput.checked = true;
                    card.style.display = 'none';
                });
            }
        });

        if (!addBtn || !container) return;

        addBtn.addEventListener('click', function () {
            var wrapper = document.createElement('div');
            wrapper.className = 'border rounded p-3 shot-card js-new-shot-card';
            wrapper.innerHTML =
                '<button type="button" class="shot-remove-btn js-remove-row" title="删除">-</button>' +
                '<div class="row g-2">' +
                    '<div class="col-md-6"><input type="file" name="new_screenshot_files[]" class="form-control" accept="image/png,image/jpeg,image/webp,image/gif"></div>' +
                    '<div class="col-md-6"><input type="text" name="new_screenshot_alts[]" class="form-control" placeholder="截图描述（alt）"></div>' +
                '</div>';
            container.appendChild(wrapper);
        });

        container.addEventListener('click', function (e) {
            if (!e.target.classList.contains('js-remove-row')) return;
            var row = e.target.closest('.js-new-shot-card');
            if (row) row.remove();
        });
    })();
</script>
