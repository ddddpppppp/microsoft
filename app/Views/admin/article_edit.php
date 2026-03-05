<?php if (isset($_GET['saved'])): ?>
<div class="alert alert-success alert-dismissible fade show">保存成功！<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>

<style>
.vocab-sidebar { border: 1px solid var(--border); border-radius: 10px; background: #f8fafc; }
.vocab-sidebar .vocab-item {
    padding: 6px 10px; cursor: pointer; border-bottom: 1px solid var(--border);
    font-size: 13px; display: flex; justify-content: space-between; align-items: center;
    transition: background .15s;
}
.vocab-sidebar .vocab-item:hover { background: #dbeafe; }
.vocab-sidebar .vocab-item:last-child { border-bottom: none; }
.vocab-sidebar .vocab-item .vocab-url { font-size: 11px; color: #64748b; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.article-editor-wrap { position: relative; z-index: 1; }
#editor.ql-container { height: auto; min-height: 400px; }
#editor .ql-editor { min-height: 340px; max-height: 560px; overflow-y: auto; }
.article-form-actions { position: relative; z-index: 2; margin-top: 14px; }
</style>

<div class="card">
    <div class="card-body">
        <form method="POST" action="/admin/article/save" enctype="multipart/form-data" id="articleForm">
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
                        <label class="form-label d-flex justify-content-between align-items-center">
                            <span>内容</span>
                            <?php if (!empty($vocabGroups)): ?>
                            <button type="button" class="btn btn-sm btn-outline-success" id="btnAutoReplace">
                                <i class="bi bi-arrow-repeat"></i> 自动扫描替换词汇
                            </button>
                            <?php endif; ?>
                        </label>
                        <input type="hidden" name="content" id="content-input">
                        <div class="row g-2">
                            <div class="<?= !empty($vocabGroups) ? 'col-md-9' : 'col-12' ?>">
                                <div class="article-editor-wrap">
                                <div id="editor" class="border rounded" style="min-height:400px;background:#fff;"><?= isset($article['content']) ? $article['content'] : '' ?></div>
                                </div>
                            </div>
                            <?php if (!empty($vocabGroups)): ?>
                            <div class="col-md-3">
                                <div class="vocab-sidebar">
                                    <div class="p-2 border-bottom">
                                        <select class="form-select form-select-sm mb-2" id="editorVocabGroup">
                                            <option value="">选择分组</option>
                                            <?php foreach ($vocabGroups as $g): ?>
                                            <option value="<?= $g['id'] ?>"><?= htmlspecialchars($g['name']) ?> (<?= $g['vocab_count'] ?>)</option>
                                            <?php endforeach; ?>
                                        </select>
                                        <input type="text" class="form-control form-control-sm" id="editorVocabSearch" placeholder="搜索词汇...">
                                    </div>
                                    <div id="editorVocabList" style="max-height:340px;overflow-y:auto">
                                        <div class="text-muted text-center py-3" style="font-size:13px">选择分组加载词汇</div>
                                    </div>
                                </div>
                            </div>
                            <?php endif; ?>
                        </div>
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
            <div class="d-flex gap-2 article-form-actions">
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
    document.getElementById('articleForm').addEventListener('submit', function() {
        contentInput.value = quill.root.innerHTML;
    });

    // Expose quill for vocab features
    window._quill = quill;
})();

// ── Vocab sidebar ────────────────────────────────────
var editorGroupSel = document.getElementById('editorVocabGroup');
var editorSearchInput = document.getElementById('editorVocabSearch');
var editorVocabListEl = document.getElementById('editorVocabList');
var cachedVocabs = [];
var vocabSearchTimer2 = null;

if (editorGroupSel) {
    editorGroupSel.addEventListener('change', function() {
        loadEditorVocabs(this.value, '');
    });
}
if (editorSearchInput) {
    editorSearchInput.addEventListener('input', function() {
        clearTimeout(vocabSearchTimer2);
        var kw = this.value;
        vocabSearchTimer2 = setTimeout(function() {
            var gid = editorGroupSel ? editorGroupSel.value : '';
            loadEditorVocabs(gid, kw);
        }, 300);
    });
}

function loadEditorVocabs(groupId, keyword) {
    if (!editorVocabListEl) return;
    if (!groupId && !keyword) {
        editorVocabListEl.innerHTML = '<div class="text-muted text-center py-3" style="font-size:13px">选择分组加载词汇</div>';
        return;
    }
    editorVocabListEl.innerHTML = '<div class="text-muted text-center py-3" style="font-size:13px">加载中...</div>';
    fetch('/admin/ai-vocabulary/search?group_id=' + encodeURIComponent(groupId) + '&keyword=' + encodeURIComponent(keyword))
    .then(function(r) { return r.json(); })
    .then(function(data) {
        cachedVocabs = data.items || [];
        if (cachedVocabs.length === 0) {
            editorVocabListEl.innerHTML = '<div class="text-muted text-center py-3" style="font-size:13px">无匹配词汇</div>';
            return;
        }
        var html = '';
        cachedVocabs.forEach(function(v) {
            html += '<div class="vocab-item" data-word="' + escAttr(v.word) + '" data-url="' + escAttr(v.url || '') + '" onclick="insertVocabToEditor(this)" title="点击插入到编辑器">'
                + '<span>' + escHtml(v.word) + '</span>'
                + (v.url ? '<span class="vocab-url">' + escHtml(v.url) + '</span>' : '')
                + '</div>';
        });
        editorVocabListEl.innerHTML = html;
    });
}

function insertVocabToEditor(el) {
    var quill = window._quill;
    if (!quill) return;
    var word = el.dataset.word;
    var url = el.dataset.url;
    var range = quill.getSelection(true);
    if (url) {
        quill.insertText(range.index, word, 'link', url);
    } else {
        quill.insertText(range.index, word);
    }
    quill.setSelection(range.index + word.length);
}

// ── Auto scan & replace ──────────────────────────────
var btnAutoReplace = document.getElementById('btnAutoReplace');
if (btnAutoReplace) {
    btnAutoReplace.addEventListener('click', function() {
        var quill = window._quill;
        if (!quill) return;

        // Load all vocabs
        fetch('/admin/ai-vocabulary/search?group_id=&keyword=')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            var allVocabs = data.items || [];
            if (allVocabs.length === 0) {
                alert('词汇库为空，请先在词汇管理中添加词汇。');
                return;
            }

            // Only process vocabs with URLs
            var withUrl = allVocabs.filter(function(v) { return v.url && v.url.trim() !== ''; });
            if (withUrl.length === 0) {
                alert('没有配置链接的词汇，无需替换。');
                return;
            }

            // Sort by word length desc to match longer phrases first
            withUrl.sort(function(a, b) { return b.word.length - a.word.length; });

            var html = quill.root.innerHTML;
            var matches = [];

            withUrl.forEach(function(v) {
                // Only replace plain text occurrences (not already inside <a> tags)
                var safeWord = v.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                var regex = new RegExp('(?![^<]*>)' + safeWord, 'g');
                var m;
                while ((m = regex.exec(html)) !== null) {
                    matches.push({ word: v.word, url: v.url, index: m.index });
                }
            });

            if (matches.length === 0) {
                alert('未在文章中找到可替换的词汇。');
                return;
            }

            var uniqueWords = {};
            matches.forEach(function(m) { uniqueWords[m.word] = m.url; });
            var summary = Object.keys(uniqueWords).map(function(w) { return w + ' → ' + uniqueWords[w]; }).join('\n');

            if (!confirm('将替换以下词汇为超链接（共 ' + matches.length + ' 处）：\n\n' + summary + '\n\n确定执行？')) {
                return;
            }

            // Perform replacements (longer words first, only first occurrence of each to avoid double-linking)
            var replaced = {};
            withUrl.forEach(function(v) {
                var safeWord = v.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                var regex = new RegExp('(?![^<]*>)' + safeWord, 'g');
                html = html.replace(regex, function(match) {
                    return '<a href="' + v.url + '">' + match + '</a>';
                });
            });

            quill.root.innerHTML = html;
        });
    });
}

// Load all vocabs for auto-replace (fetches all without group filter)
function escHtml(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function escAttr(s) { return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
</script>
