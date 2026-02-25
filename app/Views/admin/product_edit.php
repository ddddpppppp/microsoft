<?php if (isset($_GET['saved'])): ?>
<div class="alert alert-success alert-dismissible fade show">保存成功！<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>
<div class="card">
    <div class="card-body">
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
        <form method="POST" action="/admin/product/save">
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
            <div class="mb-3 form-check">
                <input type="checkbox" name="is_own_product" class="form-check-input" id="isOwn" <?= $product['is_own_product'] ? 'checked' : '' ?>>
                <label class="form-check-label" for="isOwn">标记为自有产品（点击后跳转到本站页面）</label>
            </div>
            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">保存</button>
                <a href="/admin/products" class="btn btn-secondary">返回列表</a>
            </div>
        </form>
    </div>
</div>
