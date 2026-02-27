<?php if (isset($_GET['saved'])): ?>
<div class="alert alert-success alert-dismissible fade show">保存成功！<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>
<div class="card">
    <div class="card-body">
        <form method="POST" action="/admin/article/save" enctype="multipart/form-data">
            <input type="hidden" name="id" value="<?= $article['id'] ?? '' ?>">
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-3">
                        <label class="form-label">标题 <span class="text-danger">*</span></label>
                        <input type="text" name="title" class="form-control" value="<?= htmlspecialchars($article['title'] ?? '') ?>" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">摘要</label>
                        <textarea name="summary" class="form-control" rows="3" placeholder="文章摘要，留空将自动截取正文前200字"><?= htmlspecialchars($article['summary'] ?? '') ?></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">内容</label>
                        <input type="hidden" name="content" id="content-input">
                        <div id="editor" class="border rounded" style="min-height:400px;background:#fff;"><?= isset($article['content']) ? $article['content'] : '' ?></div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">Slug (URL标识) <span class="text-danger">*</span></label>
                        <input type="text" name="slug" class="form-control" value="<?= htmlspecialchars($article['slug'] ?? '') ?>" required>
                        <small class="text-muted">访问地址: /article/{slug}</small>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">分类</label>
                        <input type="text" name="category" class="form-control" value="<?= htmlspecialchars($article['category'] ?? '') ?>" placeholder="如: 新手指南、使用教程、行业资讯">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">封面图片URL</label>
                        <input type="text" name="cover_image" class="form-control" value="<?= htmlspecialchars($article['cover_image'] ?? '') ?>" placeholder="https://...">
                        <?php if (!empty($article['cover_image'])): ?>
                        <div class="mt-2"><img src="<?= htmlspecialchars($article['cover_image']) ?>" class="img-fluid rounded" style="max-height:150px"></div>
                        <?php endif; ?>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">作者</label>
                        <input type="text" name="author" class="form-control" value="<?= htmlspecialchars($article['author'] ?? '') ?>" placeholder="作者名称">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">状态</label>
                        <select name="status" class="form-select">
                            <option value="draft" <?= ($article['status'] ?? '') === 'draft' ? 'selected' : '' ?>>草稿</option>
                            <option value="published" <?= ($article['status'] ?? '') === 'published' ? 'selected' : '' ?>>已发布</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="is_recommended" id="isRecommended" <?= !empty($article['is_recommended']) ? 'checked' : '' ?>>
                            <label class="form-check-label" for="isRecommended">推荐文章</label>
                        </div>
                        <small class="text-muted">推荐文章会在列表页侧栏和首页显示</small>
                    </div>
                    <hr>
                    <h6 class="text-muted">SEO设置</h6>
                    <div class="mb-3">
                        <label class="form-label">关键词</label>
                        <input type="text" name="keywords" class="form-control" value="<?= htmlspecialchars($article['keywords'] ?? '') ?>" placeholder="关键词1,关键词2">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Meta描述</label>
                        <textarea name="meta_description" class="form-control" rows="2"><?= htmlspecialchars($article['meta_description'] ?? '') ?></textarea>
                    </div>
                </div>
            </div>
            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary"><i class="bi bi-save"></i> 保存</button>
                <a href="/admin/articles" class="btn btn-secondary">返回列表</a>
                <?php if (!empty($article['id'])): ?>
                <a href="/article/<?= htmlspecialchars($article['slug'] ?? '') ?>" target="_blank" class="btn btn-outline-info"><i class="bi bi-eye"></i> 预览</a>
                <?php endif; ?>
            </div>
        </form>
    </div>
</div>
<link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.min.js"></script>
<script>
(function() {
    var editorEl = document.getElementById('editor');
    var contentInput = document.getElementById('content-input');
    var initialHtml = editorEl.innerHTML.trim();
    editorEl.innerHTML = '';
    var quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: '输入文章内容…',
        modules: {
            toolbar: [
                [{ 'header': [2, 3, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['blockquote'],
                ['clean']
            ]
        }
    });
    if (initialHtml) quill.root.innerHTML = initialHtml;
    document.querySelector('form').addEventListener('submit', function() {
        contentInput.value = quill.root.innerHTML;
    });
})();
</script>
