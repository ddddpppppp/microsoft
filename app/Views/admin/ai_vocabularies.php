<?php
$currentGroupId = (int)($_GET['group_id'] ?? 0);
$searchKeyword = $_GET['keyword'] ?? '';
$page = max(1, (int)($_GET['page'] ?? 1));
?>

<?php if (isset($_GET['msg'])): ?>
<div class="alert alert-success alert-dismissible fade show">
    <?= htmlspecialchars($_GET['msg']) ?>
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
<?php endif; ?>

<div class="row g-3">
    <!-- Left: Group List -->
    <div class="col-md-3">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h6 class="mb-0"><i class="bi bi-folder"></i> 词汇分组</h6>
                <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#groupModal" onclick="editGroup(0,'','')">
                    <i class="bi bi-plus"></i>
                </button>
            </div>
            <div class="list-group list-group-flush">
                <a href="/admin/ai-vocabulary"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center <?= $currentGroupId === 0 ? 'active' : '' ?>">
                    全部
                    <span class="badge bg-primary rounded-pill"><?= array_sum(array_column($groups, 'vocab_count')) ?></span>
                </a>
                <?php foreach ($groups as $g): ?>
                <a href="/admin/ai-vocabulary?group_id=<?= $g['id'] ?>"
                   class="list-group-item list-group-item-action d-flex justify-content-between align-items-center <?= $currentGroupId === (int)$g['id'] ? 'active' : '' ?>">
                    <span><?= htmlspecialchars($g['name']) ?></span>
                    <span class="d-flex align-items-center gap-1">
                        <span class="badge bg-primary rounded-pill"><?= $g['vocab_count'] ?></span>
                        <button class="btn btn-sm p-0 border-0 bg-transparent" onclick="event.preventDefault();event.stopPropagation();editGroup(<?= $g['id'] ?>,'<?= htmlspecialchars(addslashes($g['name']), ENT_QUOTES) ?>','<?= htmlspecialchars(addslashes($g['description'] ?? ''), ENT_QUOTES) ?>')" title="编辑">
                            <i class="bi bi-pencil text-muted" style="font-size:12px"></i>
                        </button>
                        <?php if ($g['vocab_count'] == 0): ?>
                        <a href="/admin/ai-vocabulary-group/delete/<?= $g['id'] ?>" class="text-danger" onclick="return confirm('确定删除分组「<?= htmlspecialchars($g['name']) ?>」？')" title="删除">
                            <i class="bi bi-trash" style="font-size:12px"></i>
                        </a>
                        <?php endif; ?>
                    </span>
                </a>
                <?php endforeach; ?>
                <?php if (empty($groups)): ?>
                <div class="list-group-item text-center text-muted py-4">
                    暂无分组，请先创建
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <!-- Right: Vocabulary List -->
    <div class="col-md-9">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
                <h6 class="mb-0"><i class="bi bi-bookmark-star"></i> 词汇列表</h6>
                <div class="d-flex gap-2 flex-wrap">
                    <form class="d-flex gap-2" method="GET" action="/admin/ai-vocabulary">
                        <input type="hidden" name="group_id" value="<?= $currentGroupId ?>">
                        <input type="text" name="keyword" class="form-control form-control-sm" placeholder="搜索词汇..." value="<?= htmlspecialchars($searchKeyword) ?>" style="width:160px">
                        <button type="submit" class="btn btn-sm btn-outline-primary"><i class="bi bi-search"></i></button>
                    </form>
                    <button class="btn btn-sm btn-outline-success" data-bs-toggle="modal" data-bs-target="#importModal">
                        <i class="bi bi-upload"></i> CSV导入
                    </button>
                    <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#vocabModal" onclick="editVocab(0,'','',<?= $currentGroupId ?>)">
                        <i class="bi bi-plus"></i> 添加词汇
                    </button>
                    <button class="btn btn-sm btn-outline-danger" id="btnBatchDelete" style="display:none" onclick="batchDeleteVocabs()">
                        <i class="bi bi-trash"></i> 批量删除
                    </button>
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th width="40"><input type="checkbox" class="form-check-input" id="checkAll"></th>
                                <th width="50">ID</th>
                                <th>词汇</th>
                                <th>链接</th>
                                <th width="100">分组</th>
                                <th width="120">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($vocabs['items'] as $v): ?>
                            <tr>
                                <td><input type="checkbox" class="form-check-input vocab-check" value="<?= $v['id'] ?>"></td>
                                <td><?= $v['id'] ?></td>
                                <td><strong><?= htmlspecialchars($v['word']) ?></strong></td>
                                <td>
                                    <?php if (!empty($v['url'])): ?>
                                    <a href="<?= htmlspecialchars($v['url']) ?>" target="_blank" class="text-truncate d-inline-block" style="max-width:300px" title="<?= htmlspecialchars($v['url']) ?>">
                                        <?= htmlspecialchars($v['url']) ?>
                                    </a>
                                    <?php else: ?>
                                    <span class="text-muted">-</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <?php
                                    $gName = '-';
                                    foreach ($groups as $g) {
                                        if ($g['id'] == $v['group_id']) { $gName = $g['name']; break; }
                                    }
                                    ?>
                                    <span class="badge bg-secondary"><?= htmlspecialchars($gName) ?></span>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-outline-primary" onclick="editVocab(<?= $v['id'] ?>,'<?= htmlspecialchars(addslashes($v['word']), ENT_QUOTES) ?>','<?= htmlspecialchars(addslashes($v['url'] ?? ''), ENT_QUOTES) ?>',<?= $v['group_id'] ?>)">
                                        编辑
                                    </button>
                                    <a href="/admin/ai-vocabulary/delete/<?= $v['id'] ?>?group_id=<?= $currentGroupId ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('确定删除词汇「<?= htmlspecialchars($v['word']) ?>」？')">
                                        <i class="bi bi-trash"></i>
                                    </a>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                            <?php if (empty($vocabs['items'])): ?>
                            <tr><td colspan="6" class="text-center text-muted py-4">暂无词汇</td></tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
                <?php if ($vocabs['total_pages'] > 1): ?>
                <nav class="d-flex justify-content-center py-3">
                    <ul class="pagination mb-0">
                        <?php for ($i = 1; $i <= $vocabs['total_pages']; $i++): ?>
                        <li class="page-item <?= $i === $page ? 'active' : '' ?>">
                            <a class="page-link" href="/admin/ai-vocabulary?group_id=<?= $currentGroupId ?>&keyword=<?= urlencode($searchKeyword) ?>&page=<?= $i ?>"><?= $i ?></a>
                        </li>
                        <?php endfor; ?>
                    </ul>
                </nav>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<!-- Group Modal -->
<div class="modal fade" id="groupModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="POST" action="/admin/ai-vocabulary-group/save">
                <div class="modal-header">
                    <h5 class="modal-title" id="groupModalTitle">新建分组</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="id" id="groupId" value="">
                    <div class="mb-3">
                        <label class="form-label">分组名称 <span class="text-danger">*</span></label>
                        <input type="text" name="name" id="groupName" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">描述</label>
                        <input type="text" name="description" id="groupDesc" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="submit" class="btn btn-primary">保存</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Vocab Modal -->
<div class="modal fade" id="vocabModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <form method="POST" action="/admin/ai-vocabulary/save">
                <div class="modal-header">
                    <h5 class="modal-title" id="vocabModalTitle">添加词汇</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="id" id="vocabId" value="">
                    <input type="hidden" name="current_group_id" value="<?= $currentGroupId ?>">
                    <div class="mb-3">
                        <label class="form-label">所属分组 <span class="text-danger">*</span></label>
                        <select name="group_id" id="vocabGroupId" class="form-select" required>
                            <?php foreach ($groups as $g): ?>
                            <option value="<?= $g['id'] ?>"><?= htmlspecialchars($g['name']) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">词汇 <span class="text-danger">*</span></label>
                        <input type="text" name="word" id="vocabWord" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">链接URL</label>
                        <input type="url" name="url" id="vocabUrl" class="form-control" placeholder="https://...">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="submit" class="btn btn-primary">保存</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- CSV Import Modal -->
<div class="modal fade" id="importModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form method="POST" action="/admin/ai-vocabulary/batch-import" enctype="multipart/form-data" id="csvImportForm">
                <div class="modal-header">
                    <h5 class="modal-title"><i class="bi bi-upload"></i> CSV 批量导入</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">目标分组 <span class="text-danger">*</span></label>
                        <select name="group_id" class="form-select" required>
                            <?php foreach ($groups as $g): ?>
                            <option value="<?= $g['id'] ?>"><?= htmlspecialchars($g['name']) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">CSV 文件 <span class="text-danger">*</span></label>
                        <input type="file" name="csv_file" class="form-control" accept=".csv,.txt" required id="csvFileInput">
                        <small class="text-muted">
                            格式：每行一条，<code>关键词,链接URL</code>（链接可选）。支持 .csv 和 .txt 文件。
                        </small>
                    </div>
                    <div id="csvPreview" class="d-none">
                        <h6>预览（前20条）</h6>
                        <div class="table-responsive" style="max-height:300px;overflow-y:auto">
                            <table class="table table-sm table-bordered mb-0">
                                <thead><tr><th>词汇</th><th>链接</th></tr></thead>
                                <tbody id="csvPreviewBody"></tbody>
                            </table>
                        </div>
                        <p class="mt-2 text-muted" id="csvPreviewCount"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="submit" class="btn btn-primary" id="btnImport">导入</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
// 确保关闭模态框时阴影（backdrop）被移除
(function() {
    ['#vocabModal', '#groupModal', '#importModal'].forEach(function(id) {
        var el = document.querySelector(id);
        if (!el) return;
        el.addEventListener('hidden.bs.modal', function() {
            document.body.classList.remove('modal-open');
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('padding-right');
            var backdrops = document.querySelectorAll('.modal-backdrop');
            backdrops.forEach(function(b) { b.remove(); });
        });
    });
})();

function editGroup(id, name, desc) {
    document.getElementById('groupId').value = id;
    document.getElementById('groupName').value = name;
    document.getElementById('groupDesc').value = desc;
    document.getElementById('groupModalTitle').textContent = id ? '编辑分组' : '新建分组';
    if (!id) {
        var modal = new bootstrap.Modal(document.getElementById('groupModal'));
        modal.show();
    }
}

function editVocab(id, word, url, groupId) {
    document.getElementById('vocabId').value = id;
    document.getElementById('vocabWord').value = word;
    document.getElementById('vocabUrl').value = url;
    document.getElementById('vocabModalTitle').textContent = id ? '编辑词汇' : '添加词汇';
    var sel = document.getElementById('vocabGroupId');
    if (groupId && sel) {
        for (var i = 0; i < sel.options.length; i++) {
            if (sel.options[i].value == groupId) { sel.selectedIndex = i; break; }
        }
    }
    var modal = new bootstrap.Modal(document.getElementById('vocabModal'));
    modal.show();
}

// Batch delete
var checkAll = document.getElementById('checkAll');
if (checkAll) {
    checkAll.addEventListener('change', function() {
        document.querySelectorAll('.vocab-check').forEach(function(cb) { cb.checked = checkAll.checked; });
        toggleBatchBtn();
    });
}
document.querySelectorAll('.vocab-check').forEach(function(cb) {
    cb.addEventListener('change', toggleBatchBtn);
});
function toggleBatchBtn() {
    var checked = document.querySelectorAll('.vocab-check:checked');
    document.getElementById('btnBatchDelete').style.display = checked.length > 0 ? '' : 'none';
}
function batchDeleteVocabs() {
    var ids = [];
    document.querySelectorAll('.vocab-check:checked').forEach(function(cb) { ids.push(cb.value); });
    if (ids.length === 0) return;
    if (!confirm('确定删除选中的 ' + ids.length + ' 个词汇？')) return;

    var form = document.createElement('form');
    form.method = 'POST';
    form.action = '/admin/ai-vocabulary/batch-delete';
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'ids';
    input.value = ids.join(',');
    form.appendChild(input);
    var gInput = document.createElement('input');
    gInput.type = 'hidden';
    gInput.name = 'group_id';
    gInput.value = '<?= $currentGroupId ?>';
    form.appendChild(gInput);
    document.body.appendChild(form);
    form.submit();
}

// CSV Preview
document.getElementById('csvFileInput').addEventListener('change', function() {
    var file = this.files[0];
    if (!file) { document.getElementById('csvPreview').classList.add('d-none'); return; }
    var reader = new FileReader();
    reader.onload = function(e) {
        var lines = e.target.result.split(/\r?\n/).filter(function(l) { return l.trim() !== ''; });
        var body = document.getElementById('csvPreviewBody');
        body.innerHTML = '';
        var show = Math.min(lines.length, 20);
        for (var i = 0; i < show; i++) {
            var parts = lines[i].split(',');
            var word = (parts[0] || '').trim();
            var url = (parts.slice(1).join(',') || '').trim();
            if (!word) continue;
            body.innerHTML += '<tr><td>' + escHtml(word) + '</td><td>' + escHtml(url) + '</td></tr>';
        }
        document.getElementById('csvPreviewCount').textContent = '共 ' + lines.length + ' 条数据' + (lines.length > 20 ? '（仅显示前20条）' : '');
        document.getElementById('csvPreview').classList.remove('d-none');
    };
    reader.readAsText(file, 'UTF-8');
});

function escHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}
</script>
