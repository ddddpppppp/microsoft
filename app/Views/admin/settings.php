<?php if (isset($_GET['saved'])): ?>
<div class="alert alert-success alert-dismissible fade show">保存成功！<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>
<?php if (isset($_GET['cache_flushed'])): ?>
<div class="alert alert-success alert-dismissible fade show">全站页面缓存与 sitemap 已清空。<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>
<form method="POST" action="/admin/settings/save">
    <?php
    $pageLabels = ['home' => '首页', 'apps' => '应用页', 'games' => '游戏页', 'about' => '关于页', 'articles' => '资讯页'];
    foreach ($pageLabels as $key => $label):
        $s = $settings[$key] ?? [];
    ?>
    <div class="card mb-4">
        <div class="card-header"><h5 class="mb-0"><?= $label ?></h5></div>
        <div class="card-body">
            <div class="mb-3">
                <label class="form-label">页面标题</label>
                <input type="text" name="title_<?= $key ?>" class="form-control" value="<?= htmlspecialchars($s['title'] ?? '') ?>">
            </div>
            <div class="mb-3">
                <label class="form-label">关键词</label>
                <input type="text" name="keywords_<?= $key ?>" class="form-control" value="<?= htmlspecialchars($s['keywords'] ?? '') ?>">
            </div>
            <div class="mb-3">
                <label class="form-label">描述</label>
                <textarea name="description_<?= $key ?>" class="form-control" rows="2"><?= htmlspecialchars($s['description'] ?? '') ?></textarea>
            </div>
        </div>
    </div>
    <?php endforeach; ?>
    <button type="submit" class="btn btn-primary">保存所有设置</button>
</form>

<div class="card mt-4">
    <div class="card-header"><h5 class="mb-0">缓存</h5></div>
    <div class="card-body">
        <p class="text-muted small mb-2">清空全站 SEO 页面缓存（片段缓存）与 sitemap 缓存。保存 SEO 设置时已会清除相关页面，一般无需手动操作。</p>
        <a href="/admin/settings/flush-cache" class="btn btn-outline-secondary btn-sm" onclick="return confirm('确定清空全站页面缓存？')">
            <i class="bi bi-arrow-repeat me-1"></i>清空全站页面缓存
        </a>
    </div>
</div>
