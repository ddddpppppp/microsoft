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
$priceTypes = ['free' => '免费', 'paid' => '付费', 'discount' => '折扣'];
$productTypes = ['app' => '应用', 'game' => '游戏'];
$isCreate = !empty($isCreate);
?>
<?php if (isset($_GET['error'])): ?>
<div class="alert alert-danger alert-dismissible fade show" style="font-size:14px;">
    <i class="bi bi-exclamation-triangle me-1"></i>MS ID 和标题为必填项！
    <button type="button" class="btn-close" data-bs-dismiss="alert" style="padding:.65rem;"></button>
</div>
<?php endif; ?>
<?php if (isset($_GET['saved'])): ?>
<div class="alert alert-success alert-dismissible fade show" style="font-size:14px;">
    <i class="bi bi-check-circle me-1"></i>保存成功！
    <button type="button" class="btn-close" data-bs-dismiss="alert" style="padding:.65rem;"></button>
</div>
<?php endif; ?>
<?php if (isset($_GET['cache_cleared'])): ?>
<div class="alert alert-info alert-dismissible fade show" style="font-size:14px;">
    <i class="bi bi-arrow-repeat me-1"></i>缓存已清除！
    <button type="button" class="btn-close" data-bs-dismiss="alert" style="padding:.65rem;"></button>
</div>
<?php endif; ?>

<style>
    .pe-section {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        margin-bottom: 16px;
        overflow: hidden;
    }
    .pe-section-head {
        padding: 12px 20px;
        background: #f8fafc;
        border-bottom: 1px solid var(--border);
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .pe-section-head i {
        font-size: 15px;
        color: var(--primary);
    }
    .pe-section-head span {
        font-size: 13px;
        font-weight: 700;
        color: var(--foreground);
        letter-spacing: .01em;
        text-transform: uppercase;
    }
    .pe-section-body { padding: 16px 20px; }

    .pe-form .form-label {
        font-size: 12px;
        font-weight: 600;
        color: #475569;
        margin-bottom: 4px;
        letter-spacing: .02em;
    }
    .pe-form .form-control,
    .pe-form .form-select {
        font-size: 13px;
        padding: 7px 11px;
        border-radius: 8px;
        border-color: var(--border);
        transition: border-color .2s, box-shadow .2s;
    }
    .pe-form .form-control:focus,
    .pe-form .form-select:focus {
        border-color: var(--ring);
        box-shadow: 0 0 0 3px rgba(147,197,253,.3);
    }
    .pe-form textarea.form-control { resize: vertical; min-height: 56px; }
    .pe-form .row.g-form { --bs-gutter-x: 14px; --bs-gutter-y: 14px; }
    .pe-form .form-text { font-size: 11.5px; color: #94a3b8; margin-top: 3px; }

    .pe-readonly {
        background: #f8fafc;
        color: #64748b;
        cursor: default;
        border-style: dashed;
    }

    .pe-logo-wrap {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 14px;
        overflow: hidden;
        cursor: pointer;
        flex-shrink: 0;
        border: 2px solid var(--border);
        background: #f8fafc;
        transition: border-color .2s;
    }
    .pe-logo-wrap:hover { border-color: var(--ring); }
    .pe-logo-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    .pe-logo-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,.45);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity .2s;
    }
    .pe-logo-wrap:hover .pe-logo-overlay { opacity: 1; }
    .pe-logo-overlay i { color: #fff; font-size: 20px; }

    .pe-tag {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 14px;
        border-radius: 8px;
        border: 1px solid var(--border);
        background: #fff;
        font-size: 13px;
        cursor: pointer;
        transition: background .15s, border-color .15s;
        user-select: none;
    }
    .pe-tag:hover { background: #f1f5f9; }
    .pe-tag input[type="checkbox"] { margin: 0; }

    .pe-shot-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 10px;
    }
    .pe-shot-card {
        position: relative;
        border: 1px solid var(--border);
        border-radius: 10px;
        background: #f8fafc;
        overflow: hidden;
        transition: border-color .15s;
    }
    .pe-shot-card:hover { border-color: #cbd5e1; }
    .pe-shot-card img {
        width: 100%;
        height: 90px;
        object-fit: contain;
        background: #fff;
        display: block;
        cursor: pointer;
        border-bottom: 1px solid var(--border);
        transition: border-color .2s;
    }
    .pe-shot-card img:hover { border-bottom-color: var(--ring); }
    .pe-shot-card .pe-shot-alt {
        padding: 6px 8px;
    }
    .pe-shot-card .pe-shot-alt input {
        font-size: 11.5px !important;
        padding: 4px 7px !important;
        border-radius: 6px !important;
    }
    .pe-shot-remove {
        position: absolute;
        right: 4px;
        top: 4px;
        width: 20px;
        height: 20px;
        border: 0;
        border-radius: 5px;
        background: rgba(255,255,255,.85);
        color: #94a3b8;
        font-size: 14px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: color .15s, background .15s;
        padding: 0;
        z-index: 2;
    }
    .pe-shot-remove:hover { background: #fef2f2; color: #ef4444; }

    .pe-shot-new {
        position: relative;
        border: 1px dashed var(--border);
        border-radius: 10px;
        background: #fff;
        overflow: hidden;
        transition: border-color .15s;
    }
    .pe-shot-new:hover { border-color: #cbd5e1; }
    .pe-shot-new .pe-shot-drop {
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px dashed var(--border);
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .pe-shot-new .pe-shot-drop img {
        width: 100%; height: 100%; object-fit: contain; display: none;
    }
    .pe-shot-new .pe-shot-drop .pe-shot-drop-hint {
        color: #94a3b8; font-size: 12px; display: flex; flex-direction: column; align-items: center; gap: 2px;
    }
    .pe-shot-new .pe-shot-drop .pe-shot-drop-hint i { font-size: 18px; }
    .pe-shot-new .pe-shot-alt { padding: 6px 8px; }
    .pe-shot-new .pe-shot-alt input {
        font-size: 11.5px !important; padding: 4px 7px !important; border-radius: 6px !important;
    }
    .pe-shot-add-btn {
        border: 2px dashed var(--border);
        border-radius: 10px;
        background: transparent;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 130px;
        cursor: pointer;
        color: #94a3b8;
        font-size: 13px;
        gap: 4px;
        transition: border-color .2s, color .2s, background .2s;
        padding: 0;
        width: 100%;
    }
    .pe-shot-add-btn:hover { border-color: var(--primary); color: var(--primary); background: #eff6ff; }
    .pe-shot-add-btn i { font-size: 22px; }

    .pe-related-dropdown {
        position: fixed;
        z-index: 9999;
        background: #fff;
        border: 1px solid var(--border);
        border-radius: 10px;
        box-shadow: 0 8px 24px rgba(15,23,42,.12);
        max-height: 280px;
        overflow-y: auto;
    }
    .pe-related-dropdown-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 14px;
        cursor: pointer;
        transition: background .12s;
        font-size: 13px;
    }
    .pe-related-dropdown-item:hover { background: #f1f5f9; }
    .pe-related-dropdown-item.is-added { opacity: .4; pointer-events: none; }
    .pe-related-dropdown-item img {
        width: 32px; height: 32px; border-radius: 7px; object-fit: cover; flex-shrink: 0; background: #f8fafc;
    }
    .pe-related-dropdown-item .rdd-title { font-weight: 500; color: var(--foreground); }
    .pe-related-dropdown-item .rdd-meta { font-size: 11.5px; color: #94a3b8; }
    .pe-related-dropdown-empty { padding: 14px; text-align: center; color: #94a3b8; font-size: 13px; }

    .pe-related-list { display: flex; flex-direction: column; gap: 6px; }
    .pe-related-item {
        display: flex; align-items: center; gap: 10px;
        padding: 8px 10px; background: #f8fafc;
        border: 1px solid var(--border); border-radius: 10px;
        transition: border-color .15s, box-shadow .15s;
    }
    .pe-related-item:hover { border-color: #cbd5e1; }
    .pe-related-item.is-dragging { opacity: .5; box-shadow: 0 4px 12px rgba(0,0,0,.1); }
    .pe-related-item.drag-over { border-color: var(--primary); border-style: dashed; }
    .pe-related-drag { cursor: grab; color: #cbd5e1; font-size: 16px; flex-shrink: 0; }
    .pe-related-drag:active { cursor: grabbing; }
    .pe-related-icon {
        width: 36px; height: 36px; border-radius: 8px; object-fit: cover; flex-shrink: 0;
        background: #fff; border: 1px solid #e2e8f0;
    }
    .pe-related-info { flex: 1; min-width: 0; }
    .pe-related-name { font-size: 13px; font-weight: 500; color: var(--foreground); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .pe-related-meta { font-size: 11.5px; color: #94a3b8; }
    .pe-related-remove {
        width: 24px; height: 24px; border: 0; border-radius: 6px;
        background: transparent; color: #94a3b8; font-size: 15px;
        cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
        transition: color .15s, background .15s; padding: 0; flex-shrink: 0;
    }
    .pe-related-remove:hover { background: #fef2f2; color: #ef4444; }

    .pe-actions {
        position: sticky;
        bottom: 0;
        background: var(--background);
        padding: 14px 0;
        border-top: 1px solid var(--border);
        margin: 0 -28px;
        padding-left: 28px;
        padding-right: 28px;
        z-index: 10;
    }

    .pe-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: start; }
    @media (max-width: 992px) { .pe-two-col { grid-template-columns: 1fr; } }
</style>

<form method="POST" action="/admin/product/save" enctype="multipart/form-data" class="pe-form">
    <input type="hidden" name="id" value="<?= $product['id'] ?>">

    <div class="pe-two-col">
        <!-- 左列 -->
        <div>
            <!-- 基本信息 -->
            <div class="pe-section">
                <div class="pe-section-head">
                    <i class="bi bi-box-seam"></i>
                    <span>基本信息</span>
                </div>
                <div class="pe-section-body">
                    <div class="d-flex gap-3 align-items-start mb-3">
                        <div class="pe-logo-wrap" id="logoWrap">
                            <?php $logoSrc = $product['local_icon'] ?: $product['icon_url']; ?>
                            <?php if ($logoSrc): ?>
                            <img id="logoPreview" src="<?= htmlspecialchars($logoSrc) ?>" alt="<?= htmlspecialchars($logoAlt) ?>">
                            <?php else: ?>
                            <img id="logoPreview" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect fill='%23e2e8f0' width='80' height='80' rx='14'/%3E%3Ctext x='50%25' y='54%25' text-anchor='middle' fill='%2394a3b8' font-size='28'%3E%3F%3C/text%3E%3C/svg%3E" alt="">
                            <?php endif; ?>
                            <div class="pe-logo-overlay"><i class="bi bi-camera"></i></div>
                        </div>
                        <input type="file" id="logoFileInput" name="logo_file" class="d-none" accept="image/png,image/jpeg,image/webp,image/gif">
                        <div class="flex-grow-1">
                            <div class="row g-form">
                                <div class="col-12">
                                    <label class="form-label" for="f_title">标题 <span class="text-danger">*</span></label>
                                    <input type="text" name="title" id="f_title" class="form-control" value="<?= htmlspecialchars($product['title']) ?>" required>
                                </div>
                                <div class="col-6">
                                    <label class="form-label" for="f_msid">MS ID <span class="text-danger">*</span></label>
                                    <?php if ($isCreate): ?>
                                    <input type="text" name="ms_id" id="f_msid" class="form-control" value="<?= htmlspecialchars($product['ms_id']) ?>" required placeholder="如 9wzdncrfj3tj">
                                    <?php else: ?>
                                    <input type="text" class="form-control pe-readonly" value="<?= htmlspecialchars($product['ms_id']) ?>" readonly tabindex="-1">
                                    <?php endif; ?>
                                </div>
                                <div class="col-6">
                                    <label class="form-label" for="f_dev">开发者</label>
                                    <input type="text" name="developer" id="f_dev" class="form-control" value="<?= htmlspecialchars($product['developer']) ?>">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="f_logoalt">Logo Alt 文字</label>
                        <input type="text" name="logo_alt" id="f_logoalt" class="form-control" value="<?= htmlspecialchars($logoAlt) ?>" placeholder="描述 Logo 图片内容">
                    </div>
                    <div>
                        <label class="form-label" for="f_desc">产品描述</label>
                        <textarea name="description" id="f_desc" class="form-control" rows="6"><?= htmlspecialchars($product['description']) ?></textarea>
                    </div>
                </div>
            </div>

            <!-- 分类与价格 -->
            <div class="pe-section">
                <div class="pe-section-head">
                    <i class="bi bi-tag"></i>
                    <span>分类与价格</span>
                </div>
                <div class="pe-section-body">
                    <div class="row g-form">
                        <div class="col-6">
                            <label class="form-label" for="f_cat">分类</label>
                            <input type="text" name="category" id="f_cat" class="form-control" value="<?= htmlspecialchars($product['category']) ?>">
                        </div>
                        <div class="col-3">
                            <label class="form-label" for="f_ptype">类型</label>
                            <select name="product_type" id="f_ptype" class="form-select">
                                <?php foreach ($productTypes as $v => $label): ?>
                                <option value="<?= $v ?>" <?= $product['product_type'] === $v ? 'selected' : '' ?>><?= $label ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="col-3">
                            <label class="form-label" for="f_prtype">价格类型</label>
                            <select name="price_type" id="f_prtype" class="form-select">
                                <?php foreach ($priceTypes as $v => $label): ?>
                                <option value="<?= $v ?>" <?= $product['price_type'] === $v ? 'selected' : '' ?>><?= $label ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="col-4">
                            <label class="form-label" for="f_price">当前价格</label>
                            <input type="text" name="price" id="f_price" class="form-control" value="<?= htmlspecialchars($product['price']) ?>">
                        </div>
                        <div class="col-4">
                            <label class="form-label" for="f_oprice">原始价格</label>
                            <input type="text" name="original_price" id="f_oprice" class="form-control" value="<?= htmlspecialchars($product['original_price']) ?>">
                        </div>
                        <div class="col-4">
                            <label class="form-label" for="f_disc">折扣 %</label>
                            <input type="text" name="discount_percent" id="f_disc" class="form-control" value="<?= htmlspecialchars($product['discount_percent']) ?>">
                        </div>
                    </div>
                    <div class="d-flex gap-2 mt-3">
                        <label class="pe-tag">
                            <input type="checkbox" name="is_own_product" class="form-check-input" <?= $product['is_own_product'] ? 'checked' : '' ?>>
                            自有产品
                        </label>
                        <label class="pe-tag">
                            <input type="checkbox" name="has_gamepass" class="form-check-input" <?= $product['has_gamepass'] ? 'checked' : '' ?>>
                            Game Pass
                        </label>
                    </div>
                </div>
            </div>

            <!-- 发布者 -->
            <div class="pe-section">
                <div class="pe-section-head">
                    <i class="bi bi-building"></i>
                    <span>发布者信息</span>
                </div>
                <div class="pe-section-body">
                    <div class="row g-form">
                        <div class="col-12">
                            <label class="form-label" for="f_pw">发布者网站</label>
                            <input type="url" name="publisher_website" id="f_pw" class="form-control" value="<?= htmlspecialchars($product['publisher_website']) ?>" placeholder="https://...">
                        </div>
                        <div class="col-6">
                            <label class="form-label" for="f_ps">技术支持</label>
                            <input type="url" name="publisher_support" id="f_ps" class="form-control" value="<?= htmlspecialchars($product['publisher_support']) ?>" placeholder="https://...">
                        </div>
                        <div class="col-6">
                            <label class="form-label" for="f_pp">隐私政策</label>
                            <input type="url" name="privacy_policy_url" id="f_pp" class="form-control" value="<?= htmlspecialchars($product['privacy_policy_url']) ?>" placeholder="https://...">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 右列 -->
        <div>
            <!-- SEO 与链接 -->
            <div class="pe-section">
                <div class="pe-section-head">
                    <i class="bi bi-search"></i>
                    <span>SEO 与链接</span>
                </div>
                <div class="pe-section-body">
                    <div class="row g-form">
                        <div class="col-12">
                            <label class="form-label" for="f_ctitle">自定义标题 <span class="text-muted fw-normal">(覆盖原标题)</span></label>
                            <input type="text" name="custom_title" id="f_ctitle" class="form-control" value="<?= htmlspecialchars($product['custom_title']) ?>" placeholder="留空使用原标题">
                        </div>
                        <div class="col-12">
                            <label class="form-label" for="f_ckw">关键词</label>
                            <input type="text" name="custom_keywords" id="f_ckw" class="form-control" value="<?= htmlspecialchars($product['custom_keywords']) ?>" placeholder="逗号分隔">
                        </div>
                        <div class="col-12">
                            <label class="form-label" for="f_cdesc">自定义描述</label>
                            <textarea name="custom_description" id="f_cdesc" class="form-control" rows="2" placeholder="留空使用原描述"><?= htmlspecialchars($product['custom_description']) ?></textarea>
                        </div>
                        <div class="col-6">
                            <label class="form-label" for="f_curl">自定义页面 URL</label>
                            <input type="text" name="custom_url" id="f_curl" class="form-control" value="<?= htmlspecialchars($product['custom_url']) ?>" placeholder="/desk.html">
                        </div>
                        <div class="col-6">
                            <label class="form-label" for="f_cdl">自定义下载链接</label>
                            <input type="text" name="custom_download_url" id="f_cdl" class="form-control" value="<?= htmlspecialchars($product['custom_download_url']) ?>" placeholder="留空用原链接">
                        </div>
                        <div class="col-6">
                            <label class="form-label" for="f_ourl">原始链接</label>
                            <input type="text" name="original_url" id="f_ourl" class="form-control" value="<?= htmlspecialchars($product['original_url']) ?>">
                        </div>
                        <div class="col-6">
                            <label class="form-label" for="f_simg">社交分享图 (OG)</label>
                            <input type="text" name="social_card_image" id="f_simg" class="form-control" value="<?= htmlspecialchars($product['social_card_image']) ?>" placeholder="图片 URL">
                        </div>
                    </div>
                </div>
            </div>

            <!-- 发布信息 -->
            <div class="pe-section">
                <div class="pe-section-head">
                    <i class="bi bi-info-circle"></i>
                    <span>发布信息</span>
                </div>
                <div class="pe-section-body">
                    <div class="row g-form">
                        <div class="col-4">
                            <label class="form-label" for="f_rd">发布日期</label>
                            <input type="text" name="release_date" id="f_rd" class="form-control" value="<?= htmlspecialchars($product['release_date']) ?>">
                        </div>
                        <div class="col-4">
                            <label class="form-label" for="f_lu">最近更新</label>
                            <input type="text" name="last_update" id="f_lu" class="form-control" value="<?= htmlspecialchars($product['last_update']) ?>">
                        </div>
                        <div class="col-4">
                            <label class="form-label" for="f_as">应用大小</label>
                            <input type="text" name="app_size" id="f_as" class="form-control" value="<?= htmlspecialchars($product['app_size']) ?>">
                        </div>
                        <div class="col-3">
                            <label class="form-label" for="f_rating">评分</label>
                            <input type="text" name="rating" id="f_rating" class="form-control" value="<?= htmlspecialchars($product['rating']) ?>">
                        </div>
                        <div class="col-3">
                            <label class="form-label" for="f_rc">评分数</label>
                            <input type="text" name="rating_count" id="f_rc" class="form-control" value="<?= htmlspecialchars($product['rating_count']) ?>">
                        </div>
                        <div class="col-6">
                            <label class="form-label" for="f_age">年龄评级</label>
                            <input type="text" name="age_rating" id="f_age" class="form-control" value="<?= htmlspecialchars($product['age_rating']) ?>">
                        </div>
                        <div class="col-6">
                            <label class="form-label" for="f_agei">评级图标 URL</label>
                            <input type="text" name="age_rating_icon" id="f_agei" class="form-control" value="<?= htmlspecialchars($product['age_rating_icon']) ?>">
                        </div>
                        <div class="col-6">
                            <label class="form-label" for="f_lang">支持的语言</label>
                            <input type="text" name="supported_languages" id="f_lang" class="form-control" value="<?= htmlspecialchars($product['supported_languages']) ?>">
                        </div>
                        <div class="col-12">
                            <label class="form-label" for="f_sysreq">系统要求</label>
                            <textarea name="system_requirements" id="f_sysreq" class="form-control" rows="2"><?= htmlspecialchars($product['system_requirements']) ?></textarea>
                        </div>
                        <div class="col-12">
                            <label class="form-label" for="f_wn">更新内容</label>
                            <textarea name="whats_new" id="f_wn" class="form-control" rows="3"><?= htmlspecialchars($product['whats_new']) ?></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 截图管理 - 全宽 -->
    <div class="pe-section">
        <div class="pe-section-head">
            <i class="bi bi-images"></i>
            <span>产品截图</span>
            <span class="ms-auto" style="font-size:12px;color:#94a3b8;font-weight:400;">点击缩略图可替换图片</span>
        </div>
        <div class="pe-section-body">
            <div class="pe-shot-grid" id="shotGrid">
                <?php foreach ($screenshotMeta as $idx => $shot): ?>
                <div class="pe-shot-card js-existing-shot-card">
                    <button type="button" class="pe-shot-remove js-remove-existing" title="删除"><i class="bi bi-x"></i></button>
                    <img src="<?= htmlspecialchars($shot['url']) ?>" alt="<?= htmlspecialchars($shot['alt']) ?>" class="js-existing-shot-preview">
                    <input type="hidden" name="existing_screenshot_urls[]" value="<?= htmlspecialchars($shot['url']) ?>">
                    <input type="file" name="replace_existing_screenshot_files[]" class="d-none js-replace-existing-file" accept="image/png,image/jpeg,image/webp,image/gif">
                    <input class="d-none js-remove-existing-input" type="checkbox" name="remove_existing_screenshot_urls[]" value="<?= htmlspecialchars($shot['url']) ?>">
                    <div class="pe-shot-alt">
                        <input type="text" name="existing_screenshot_alts[]" class="form-control" value="<?= htmlspecialchars($shot['alt']) ?>" placeholder="alt 描述">
                    </div>
                </div>
                <?php endforeach; ?>
                <button type="button" class="pe-shot-add-btn" id="addScreenshotRow">
                    <i class="bi bi-plus-lg"></i>
                    添加截图
                </button>
            </div>
        </div>
    </div>

    <!-- 关联产品 -->
    <div class="pe-section">
        <div class="pe-section-head">
            <i class="bi bi-diagram-3"></i>
            <span>关联产品（发现更多）</span>
            <span class="ms-auto" style="font-size:12px;color:#94a3b8;font-weight:400;">最多 6 个，可拖拽排序</span>
        </div>
        <div class="pe-section-body">
            <div class="mb-3">
                <div class="position-relative">
                    <i class="bi bi-search" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:14px;pointer-events:none;"></i>
                    <input type="text" id="relatedSearch" class="form-control" placeholder="搜索产品名称或 MS ID 添加关联..." autocomplete="off" style="padding-left:36px;">
                </div>
            </div>
            <div id="relatedList" class="pe-related-list">
                <?php foreach ($relatedProducts as $rp): ?>
                <div class="pe-related-item" data-msid="<?= htmlspecialchars($rp['related_ms_id']) ?>" data-rating="<?= htmlspecialchars($rp['related_rating']) ?>" data-category="<?= htmlspecialchars($rp['related_category']) ?>" data-price="<?= htmlspecialchars($rp['related_price']) ?>">
                    <span class="pe-related-drag" title="拖拽排序"><i class="bi bi-grip-vertical"></i></span>
                    <img src="<?= htmlspecialchars($rp['related_icon_url']) ?>" alt="" class="pe-related-icon">
                    <div class="pe-related-info">
                        <div class="pe-related-name"><?= htmlspecialchars($rp['related_title']) ?></div>
                        <div class="pe-related-meta"><?= htmlspecialchars($rp['related_category']) ?> · <?= htmlspecialchars($rp['related_rating']) ?> · <?= htmlspecialchars($rp['related_price'] ?: '免费') ?></div>
                    </div>
                    <button type="button" class="pe-related-remove" title="移除"><i class="bi bi-x"></i></button>
                </div>
                <?php endforeach; ?>
            </div>
            <?php if (empty($relatedProducts)): ?>
            <div id="relatedEmpty" class="text-muted" style="font-size:13px;text-align:center;padding:12px 0;">暂无关联产品，请通过上方搜索添加</div>
            <?php endif; ?>
            <input type="hidden" name="related_products_json" id="relatedJson" value="">
        </div>
    </div>

    <!-- 操作按钮 (sticky) -->
    <div class="pe-actions">
        <div class="d-flex align-items-center gap-2">
            <button type="submit" class="btn btn-primary">
                <i class="bi bi-check-lg me-1"></i><?= $isCreate ? '创建产品' : '保存' ?>
            </button>
            <?php if (!$isCreate): ?>
            <a href="/admin/product/clear-cache/<?= $product['id'] ?>" class="btn btn-outline-secondary btn-sm" onclick="return confirm('确定清除该产品的 SEO 缓存？')">
                <i class="bi bi-arrow-repeat me-1"></i>清除缓存
            </a>
            <?php endif; ?>
            <a href="/admin/products" class="btn btn-secondary btn-sm ms-auto">
                <i class="bi bi-arrow-left me-1"></i>返回列表
            </a>
        </div>
    </div>
</form>
<div id="relatedDropdown" class="pe-related-dropdown" style="display:none;"></div>

<script>
(function () {
    var addBtn = document.getElementById('addScreenshotRow');
    var grid = document.getElementById('shotGrid');
    var logoWrap = document.getElementById('logoWrap');
    var logoPreview = document.getElementById('logoPreview');
    var logoInput = document.getElementById('logoFileInput');

    if (logoWrap && logoInput) {
        logoWrap.addEventListener('click', function () { logoInput.click(); });
        logoInput.addEventListener('change', function () {
            var file = logoInput.files && logoInput.files[0];
            if (file) logoPreview.src = URL.createObjectURL(file);
        });
    }

    document.querySelectorAll('.js-existing-shot-card').forEach(function (card) {
        var preview = card.querySelector('.js-existing-shot-preview');
        var replaceInput = card.querySelector('.js-replace-existing-file');
        var removeBtn = card.querySelector('.js-remove-existing');
        var removeInput = card.querySelector('.js-remove-existing-input');

        if (preview && replaceInput) {
            preview.addEventListener('click', function () { replaceInput.click(); });
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
                card.style.opacity = '0';
                card.style.transform = 'translateX(-10px)';
                card.style.transition = 'opacity .2s, transform .2s';
                setTimeout(function () { card.style.display = 'none'; }, 200);
            });
        }
    });

    if (!addBtn || !grid) return;

    function bindNewCard(card) {
        var fileInput = card.querySelector('input[type="file"]');
        var preview = card.querySelector('.pe-shot-drop img');
        var hint = card.querySelector('.pe-shot-drop-hint');
        var dropZone = card.querySelector('.pe-shot-drop');
        if (dropZone && fileInput) {
            dropZone.addEventListener('click', function () { fileInput.click(); });
        }
        if (fileInput && preview && hint) {
            fileInput.addEventListener('change', function () {
                var file = fileInput.files && fileInput.files[0];
                if (!file) return;
                preview.src = URL.createObjectURL(file);
                preview.style.display = 'block';
                hint.style.display = 'none';
            });
        }
        var removeBtn = card.querySelector('.pe-shot-remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', function () {
                card.style.opacity = '0';
                card.style.transition = 'opacity .15s';
                setTimeout(function () { card.remove(); }, 150);
            });
        }
    }

    addBtn.addEventListener('click', function () {
        var card = document.createElement('div');
        card.className = 'pe-shot-new js-new-shot-card';
        card.innerHTML =
            '<button type="button" class="pe-shot-remove" title="删除"><i class="bi bi-x"></i></button>' +
            '<div class="pe-shot-drop"><img alt=""><div class="pe-shot-drop-hint"><i class="bi bi-image"></i>选择图片</div></div>' +
            '<input type="file" name="new_screenshot_files[]" class="d-none" accept="image/png,image/jpeg,image/webp,image/gif">' +
            '<div class="pe-shot-alt"><input type="text" name="new_screenshot_alts[]" class="form-control" placeholder="alt 描述"></div>';
        grid.insertBefore(card, addBtn);
        bindNewCard(card);
    });

    // --- Related Products ---
    var relatedSearch = document.getElementById('relatedSearch');
    var relatedDropdown = document.getElementById('relatedDropdown');
    var relatedList = document.getElementById('relatedList');
    var relatedJson = document.getElementById('relatedJson');
    var relatedEmpty = document.getElementById('relatedEmpty');
    var productId = <?= (int)$product['id'] ?>;
    var searchTimer = null;
    var MAX_RELATED = 6;

    function getRelatedData() {
        var items = [];
        relatedList.querySelectorAll('.pe-related-item').forEach(function (el) {
            items.push({
                ms_id: el.dataset.msid,
                title: el.querySelector('.pe-related-name').textContent,
                icon_url: el.querySelector('.pe-related-icon').src,
                rating: el.dataset.rating || '0.0',
                category: el.dataset.category || '',
                price: el.dataset.price || ''
            });
        });
        return items;
    }

    function syncRelatedJson() {
        relatedJson.value = JSON.stringify(getRelatedData());
        if (relatedEmpty) relatedEmpty.style.display = relatedList.children.length ? 'none' : '';
    }

    function isAlreadyAdded(msId) {
        return !!relatedList.querySelector('[data-msid="' + msId + '"]');
    }

    function addRelatedItem(p) {
        if (relatedList.querySelectorAll('.pe-related-item').length >= MAX_RELATED) {
            alert('最多关联 ' + MAX_RELATED + ' 个产品');
            return;
        }
        if (isAlreadyAdded(p.ms_id)) return;
        var icon = p.local_icon || p.icon_url || p.related_icon_url || '';
        var el = document.createElement('div');
        el.className = 'pe-related-item';
        el.dataset.msid = p.ms_id;
        el.dataset.rating = p.rating || '0.0';
        el.dataset.category = p.category || '';
        el.dataset.price = p.price || '';
        el.draggable = true;
        el.innerHTML =
            '<span class="pe-related-drag" title="拖拽排序"><i class="bi bi-grip-vertical"></i></span>' +
            '<img src="' + escHtml(icon) + '" alt="" class="pe-related-icon">' +
            '<div class="pe-related-info">' +
                '<div class="pe-related-name">' + escHtml(p.title) + '</div>' +
                '<div class="pe-related-meta">' + escHtml(p.category || '') + ' · ' + escHtml(p.rating || '') + ' · ' + escHtml(p.price || '免费') + '</div>' +
            '</div>' +
            '<button type="button" class="pe-related-remove" title="移除"><i class="bi bi-x"></i></button>';
        relatedList.appendChild(el);
        bindRelatedItem(el);
        syncRelatedJson();
    }

    function escHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function bindRelatedItem(el) {
        el.querySelector('.pe-related-remove').addEventListener('click', function () {
            el.style.opacity = '0';
            el.style.transition = 'opacity .15s';
            setTimeout(function () { el.remove(); syncRelatedJson(); }, 150);
        });
        el.addEventListener('dragstart', function (e) {
            el.classList.add('is-dragging');
            e.dataTransfer.effectAllowed = 'move';
        });
        el.addEventListener('dragend', function () {
            el.classList.remove('is-dragging');
            relatedList.querySelectorAll('.pe-related-item').forEach(function (it) { it.classList.remove('drag-over'); });
            syncRelatedJson();
        });
        el.addEventListener('dragover', function (e) {
            e.preventDefault();
            var dragging = relatedList.querySelector('.is-dragging');
            if (dragging && dragging !== el) {
                el.classList.add('drag-over');
                var rect = el.getBoundingClientRect();
                var mid = rect.top + rect.height / 2;
                if (e.clientY < mid) {
                    relatedList.insertBefore(dragging, el);
                } else {
                    relatedList.insertBefore(dragging, el.nextSibling);
                }
            }
        });
        el.addEventListener('dragleave', function () { el.classList.remove('drag-over'); });
        el.addEventListener('drop', function (e) {
            e.preventDefault();
            el.classList.remove('drag-over');
        });
    }

    relatedList.querySelectorAll('.pe-related-item').forEach(function (el) {
        el.draggable = true;
        bindRelatedItem(el);
    });

    function positionDropdown() {
        var rect = relatedSearch.getBoundingClientRect();
        relatedDropdown.style.left = rect.left + 'px';
        relatedDropdown.style.width = rect.width + 'px';
        var spaceBelow = window.innerHeight - rect.bottom - 10;
        var spaceAbove = rect.top - 10;
        if (spaceBelow >= 200 || spaceBelow >= spaceAbove) {
            relatedDropdown.style.top = rect.bottom + 4 + 'px';
            relatedDropdown.style.bottom = 'auto';
            relatedDropdown.style.maxHeight = Math.min(280, spaceBelow) + 'px';
        } else {
            relatedDropdown.style.bottom = (window.innerHeight - rect.top + 4) + 'px';
            relatedDropdown.style.top = 'auto';
            relatedDropdown.style.maxHeight = Math.min(280, spaceAbove) + 'px';
        }
    }

    function showDropdown() {
        relatedDropdown.style.display = '';
        positionDropdown();
    }

    function hideDropdown() {
        relatedDropdown.style.display = 'none';
    }

    if (relatedSearch) {
        relatedSearch.addEventListener('input', function () {
            clearTimeout(searchTimer);
            var q = relatedSearch.value.trim();
            if (q.length < 1) { hideDropdown(); return; }
            searchTimer = setTimeout(function () {
                fetch('/admin/product/search-api?q=' + encodeURIComponent(q) + '&exclude=' + productId)
                    .then(function (r) { return r.json(); })
                    .then(function (data) {
                        if (!data.length) {
                            relatedDropdown.innerHTML = '<div class="pe-related-dropdown-empty">未找到匹配的产品</div>';
                        } else {
                            relatedDropdown.innerHTML = data.map(function (p) {
                                var added = isAlreadyAdded(p.ms_id);
                                var icon = p.local_icon || p.icon_url || '';
                                return '<div class="pe-related-dropdown-item' + (added ? ' is-added' : '') + '" data-product=\'' + escHtml(JSON.stringify(p)) + '\'>' +
                                    '<img src="' + escHtml(icon) + '" alt="">' +
                                    '<div><div class="rdd-title">' + escHtml(p.title) + '</div>' +
                                    '<div class="rdd-meta">' + escHtml(p.ms_id) + ' · ' + escHtml(p.category || '') + (added ? ' · 已添加' : '') + '</div></div></div>';
                            }).join('');
                        }
                        showDropdown();
                    });
            }, 250);
        });

        relatedSearch.addEventListener('focus', function () {
            if (relatedDropdown.innerHTML.trim()) showDropdown();
        });

        window.addEventListener('scroll', function () {
            if (relatedDropdown.style.display !== 'none') positionDropdown();
        }, true);

        relatedDropdown.addEventListener('click', function (e) {
            var item = e.target.closest('.pe-related-dropdown-item');
            if (!item || item.classList.contains('is-added')) return;
            try {
                var p = JSON.parse(item.dataset.product);
                addRelatedItem(p);
                item.classList.add('is-added');
            } catch (err) {}
        });

        document.addEventListener('click', function (e) {
            if (!relatedSearch.contains(e.target) && !relatedDropdown.contains(e.target)) {
                hideDropdown();
            }
        });
    }

    syncRelatedJson();

    document.querySelector('form.pe-form').addEventListener('submit', function () {
        syncRelatedJson();
    });
})();
</script>
