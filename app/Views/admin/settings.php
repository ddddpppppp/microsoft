<?php if (isset($_GET['saved'])): ?>
<div class="alert alert-success alert-dismissible fade show">保存成功！<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
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
