<?php if (isset($_GET['saved'])): ?>
<div class="alert alert-success alert-dismissible fade show">保存成功！<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>
<div class="card">
    <div class="card-body">
        <form method="POST" action="/admin/article/save">
            <input type="hidden" name="id" value="<?= $article['id'] ?? '' ?>">
            <div class="mb-3">
                <label class="form-label">标题</label>
                <input type="text" name="title" class="form-control" value="<?= htmlspecialchars($article['title'] ?? '') ?>" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Slug (URL标识)</label>
                <input type="text" name="slug" class="form-control" value="<?= htmlspecialchars($article['slug'] ?? '') ?>" required>
            </div>
            <div class="mb-3">
                <label class="form-label">状态</label>
                <select name="status" class="form-select">
                    <option value="draft" <?= ($article['status'] ?? '') === 'draft' ? 'selected' : '' ?>>草稿</option>
                    <option value="published" <?= ($article['status'] ?? '') === 'published' ? 'selected' : '' ?>>已发布</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label">内容</label>
                <textarea name="content" id="editor" class="form-control" rows="15"><?= htmlspecialchars($article['content'] ?? '') ?></textarea>
            </div>
            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">保存</button>
                <a href="/admin/articles" class="btn btn-secondary">返回列表</a>
            </div>
        </form>
    </div>
</div>
<script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js"></script>
<script>
tinymce.init({
    selector: '#editor',
    height: 500,
    language: 'zh_CN',
    plugins: 'lists link image table code fullscreen media',
    toolbar: 'undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image media | table | code fullscreen',
    menubar: false,
    branding: false,
    promotion: false
});
</script>
