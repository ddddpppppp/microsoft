<?php if (isset($_GET['saved'])): ?>
<div class="alert alert-success alert-dismissible fade show">任务保存成功！<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>

<?php
$vocabConfig = [];
if (!empty($task['vocabulary_config'])) {
    $vocabConfig = json_decode($task['vocabulary_config'], true) ?: [];
}
?>

<style>
.vocab-picker { border: 1px solid var(--border); border-radius: 10px; padding: 12px; background: #f8fafc; }
.vocab-picker .vocab-tag {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 4px 10px; margin: 3px; border-radius: 999px; font-size: 13px;
    border: 1px solid #cbd5e1; background: #fff; cursor: pointer; transition: all .15s;
}
.vocab-picker .vocab-tag:hover { border-color: #93c5fd; background: #eff6ff; }
.vocab-picker .vocab-tag.selected { border-color: #2563eb; background: #dbeafe; color: #1e3a8a; }
.selected-vocabs-area { min-height: 48px; max-height: 200px; overflow-y: auto; }
.selected-vocab-item {
    display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px;
    border: 1px solid #e2e8f0; border-radius: 6px; background: #fff; margin: 2px; font-size: 12px;
}
.selected-vocab-item .vocab-name { font-weight: 600; }
.selected-vocab-item .form-check-input { margin: 0; width: 12px; height: 12px; }
.selected-vocab-item input[type="number"] { width: 40px !important; padding: 1px 4px; font-size: 11px; }
.selected-vocab-item .btn { padding: 0 4px; font-size: 10px; }
</style>

<div class="card">
    <div class="card-body">
        <form method="POST" action="/admin/ai-article-task/save" id="taskForm">
            <input type="hidden" name="id" value="<?= $task['id'] ?? '' ?>">
            <input type="hidden" name="vocabulary_config" id="vocabConfigInput" value="<?= htmlspecialchars($task['vocabulary_config'] ?? '') ?>">
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-3">
                        <label class="form-label">任务名称 <span class="text-danger">*</span></label>
                        <input type="text" name="name" class="form-control" value="<?= htmlspecialchars($task['name'] ?? '') ?>" placeholder="如：每日科技资讯" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">提示词 <span class="text-danger">*</span></label>
                        <textarea name="prompt" class="form-control" rows="8" placeholder="输入提示词，AI 将根据此提示词生成文章。&#10;&#10;示例：写一篇关于Windows最新系统更新的资讯文章，包含更新内容、新功能介绍、注意事项等，字数约1500字。每次生成的内容要有所不同。" required><?= htmlspecialchars($task['prompt'] ?? '') ?></textarea>
                        <small class="text-muted">提示词越详细，生成的文章质量越高。定时任务中，建议在提示词中加入"每次生成的内容要有所不同"等指引。</small>
                    </div>

                    <!-- Vocabulary Selection -->
                    <?php if (!empty($vocabGroups)): ?>
                    <div class="card mb-3">
                        <div class="card-header py-2">
                            <h6 class="mb-0"><i class="bi bi-bookmark-star"></i> 关键词汇配置</h6>
                        </div>
                        <div class="card-body">
                            <div class="row mb-3">
                                <div class="col-md-4">
                                    <label class="form-label">词汇分组</label>
                                    <select class="form-select" id="vocabGroupSelect">
                                        <option value="">-- 选择分组 --</option>
                                        <?php foreach ($vocabGroups as $g): ?>
                                        <option value="<?= $g['id'] ?>"><?= htmlspecialchars($g['name']) ?> (<?= $g['vocab_count'] ?>)</option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label">搜索词汇</label>
                                    <input type="text" class="form-control" id="vocabSearchInput" placeholder="输入关键字搜索...">
                                </div>
                                <div class="col-md-2">
                                    <label class="form-label">本次随机使用词数</label>
                                    <input type="number" class="form-control" id="randomCount" value="<?= $vocabConfig['random_count'] ?? 5 ?>" min="0" max="100">
                                </div>
                                <div class="col-md-3"></div>
                            </div>

                            <div class="d-flex gap-2 mb-2">
                                <button type="button" class="btn btn-sm btn-outline-primary" onclick="selectAllVocabs()">全选</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="deselectAllVocabs()">取消全选</button>
                            </div>
                            <div class="vocab-picker mb-3" id="vocabPool">
                                <div class="text-muted text-center py-2">请先选择词汇分组</div>
                            </div>

                            <h6 class="mb-2">已选词汇 <span class="badge bg-primary" id="selectedCount">0</span></h6>
                            <div id="selectedVocabs" class="selected-vocabs-area">
                                <div class="text-muted text-center py-2" id="noSelectedHint">点击上方词汇标签选择</div>
                            </div>
                            <small class="text-muted d-block mt-2">
                                <span id="vocabUsageHint">预计关键词总出现次数：0（必选词 + 随机词）</span>
                                <span class="ms-3"><i class="bi bi-info-circle"></i> 勾选后必定会出现在文章中</span>
                            </small>
                        </div>
                    </div>
                    <?php endif; ?>
                </div>
                <div class="col-md-4">
                    <div class="mb-3">
                        <label class="form-label">AI 提供商</label>
                        <select name="ai_provider" class="form-select">
                            <?php
                            $providers = ['deepseek' => 'DeepSeek', 'gemini' => 'Gemini', 'openai' => 'OpenAI'];
                            foreach ($providers as $val => $label):
                                $configured = !empty($aiConfig[$val]['api_key']);
                            ?>
                            <option value="<?= $val ?>" <?= ($task['ai_provider'] ?? '') === $val ? 'selected' : '' ?>>
                                <?= $label ?><?= $configured ? ' ✓' : ' (未配置Key)' ?>
                            </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">文章分类</label>
                        <input type="text" name="category" class="form-control" value="<?= htmlspecialchars($task['category'] ?? '') ?>" placeholder="如：科技资讯、使用教程">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">文章风格</label>
                        <select name="article_style" class="form-select">
                            <?php $curStyle = $task['article_style'] ?? 'seo'; ?>
                            <option value="seo" <?= $curStyle === 'seo' ? 'selected' : '' ?>>SEO 风格</option>
                            <option value="media" <?= $curStyle === 'media' ? 'selected' : '' ?>>自媒体风格</option>
                            <option value="geo" <?= $curStyle === 'geo' ? 'selected' : '' ?>>GEO 风格</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">执行方式</label>
                        <select name="schedule_type" class="form-select" id="scheduleType">
                            <option value="once" <?= ($task['schedule_type'] ?? '') === 'once' ? 'selected' : '' ?>>一次性（手动执行）</option>
                            <option value="hourly" <?= ($task['schedule_type'] ?? '') === 'hourly' ? 'selected' : '' ?>>按间隔小时</option>
                            <option value="interval" <?= ($task['schedule_type'] ?? '') === 'interval' ? 'selected' : '' ?>>按间隔天数</option>
                            <option value="daily" <?= ($task['schedule_type'] ?? '') === 'daily' ? 'selected' : '' ?>>每天定时</option>
                        </select>
                    </div>
                    <div class="mb-3 schedule-option" id="hourlyOption" style="display:none">
                        <label class="form-label">间隔小时</label>
                        <div class="input-group">
                            <span class="input-group-text">每</span>
                            <input type="number" name="interval_hours" class="form-control" value="<?= $task['interval_hours'] ?? 1 ?>" min="1" max="168">
                            <span class="input-group-text">小时</span>
                        </div>
                    </div>
                    <div class="mb-3 schedule-option" id="intervalOption" style="display:none">
                        <label class="form-label">间隔天数</label>
                        <div class="input-group">
                            <span class="input-group-text">每</span>
                            <input type="number" name="interval_days" class="form-control" value="<?= $task['interval_days'] ?? 1 ?>" min="1" max="365">
                            <span class="input-group-text">天</span>
                        </div>
                    </div>
                    <div class="mb-3 schedule-option" id="dailyOption" style="display:none">
                        <label class="form-label">每天执行时间</label>
                        <input type="time" name="daily_time" class="form-control" value="<?= htmlspecialchars($task['daily_time'] ?? '09:00') ?>">
                    </div>
                    <hr>
                    <div class="mb-3">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="auto_publish" id="autoPublish" <?= !empty($task['auto_publish']) ? 'checked' : '' ?>>
                            <label class="form-check-label" for="autoPublish">自动发布</label>
                        </div>
                        <small class="text-muted">开启后生成的文章将直接发布，否则存为草稿</small>
                    </div>
                    <div class="mb-3">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="is_active" id="isActive" <?= !empty($task['is_active']) || empty($task['id']) ? 'checked' : '' ?>>
                            <label class="form-check-label" for="isActive">启用任务</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary"><i class="bi bi-save"></i> 保存任务</button>
                <a href="/admin/ai-article" class="btn btn-secondary">返回列表</a>
                <?php if (!empty($task['id'])): ?>
                <button type="button" class="btn btn-success" id="btnTestRun">
                    <i class="bi bi-play-fill"></i> 立即执行一次
                </button>
                <?php endif; ?>
            </div>
        </form>
    </div>
</div>

<?php if (!empty($task['id'])): ?>
<div id="testResult" class="mt-3 d-none">
    <div class="card">
        <div class="card-body">
            <div id="testLoading" class="text-center py-4 d-none">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2 text-muted">AI 正在生成文章，请稍候...</p>
            </div>
            <div id="testSuccess" class="d-none">
                <div class="alert alert-success mb-3">
                    <i class="bi bi-check-circle"></i> 文章生成成功！
                    <a id="testEditLink" href="#" class="btn btn-sm btn-outline-primary ms-2">去编辑</a>
                </div>
                <h5 id="testTitle"></h5>
                <div id="testPreview" class="border rounded p-3" style="max-height:400px;overflow-y:auto"></div>
            </div>
            <div id="testError" class="d-none">
                <div class="alert alert-danger"><i class="bi bi-x-circle"></i> <span id="testErrorMsg"></span></div>
            </div>
        </div>
    </div>
</div>
<script>
document.getElementById('btnTestRun').addEventListener('click', function() {
    var result = document.getElementById('testResult');
    var loading = document.getElementById('testLoading');
    var success = document.getElementById('testSuccess');
    var error = document.getElementById('testError');

    result.classList.remove('d-none');
    loading.classList.remove('d-none');
    success.classList.add('d-none');
    error.classList.add('d-none');
    this.disabled = true;
    var btn = this;

    var formData = new FormData();
    formData.append('task_id', '<?= $task['id'] ?>');
    formData.append('prompt', document.querySelector('[name=prompt]').value);
    formData.append('provider', document.querySelector('[name=ai_provider]').value);
    formData.append('category', document.querySelector('[name=category]').value);
    formData.append('auto_publish', document.getElementById('autoPublish').checked ? '1' : '0');
    formData.append('article_style', document.querySelector('[name=article_style]').value);
    formData.append('vocabulary_config', document.getElementById('vocabConfigInput').value);

    fetch('/admin/ai-article-task/run', { method: 'POST', body: formData })
    .then(function(r) { return r.json(); })
    .then(function(data) {
        loading.classList.add('d-none');
        btn.disabled = false;
        if (data.success) {
            success.classList.remove('d-none');
            document.getElementById('testTitle').textContent = data.title;
            document.getElementById('testEditLink').href = data.edit_url;
            document.getElementById('testPreview').innerHTML = data.content;
        } else {
            error.classList.remove('d-none');
            document.getElementById('testErrorMsg').textContent = data.error || '生成失败';
        }
    })
    .catch(function(err) {
        loading.classList.add('d-none');
        btn.disabled = false;
        error.classList.remove('d-none');
        document.getElementById('testErrorMsg').textContent = '请求失败: ' + err.message;
    });
});
</script>
<?php endif; ?>

<script>
(function() {
    var sel = document.getElementById('scheduleType');
    function toggleOptions() {
        document.getElementById('hourlyOption').style.display = sel.value === 'hourly' ? '' : 'none';
        document.getElementById('intervalOption').style.display = sel.value === 'interval' ? '' : 'none';
        document.getElementById('dailyOption').style.display = sel.value === 'daily' ? '' : 'none';
    }
    sel.addEventListener('change', toggleOptions);
    toggleOptions();
})();

// Vocab picker logic
var selectedVocabs = {};
var vocabSearchTimer = null;

// Restore from saved config
var savedConfig = <?= json_encode($vocabConfig, JSON_UNESCAPED_UNICODE) ?: '{}' ?>;
if (savedConfig && savedConfig.vocabs) {
    savedConfig.vocabs.forEach(function(v) {
        selectedVocabs[v.id] = v;
    });
    renderSelected();
}

var groupSel = document.getElementById('vocabGroupSelect');
if (groupSel) {
    groupSel.addEventListener('change', function() { loadVocabs(this.value, ''); });
}
var searchInput = document.getElementById('vocabSearchInput');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        clearTimeout(vocabSearchTimer);
        var kw = this.value;
        vocabSearchTimer = setTimeout(function() {
            loadVocabs(groupSel ? groupSel.value : '', kw);
        }, 300);
    });
}
var randomCountInput = document.getElementById('randomCount');
if (randomCountInput) {
    randomCountInput.addEventListener('input', function() { updateVocabUsageHint(); syncConfig(); });
    randomCountInput.addEventListener('change', function() { updateVocabUsageHint(); syncConfig(); });
}

function loadVocabs(groupId, keyword) {
    var pool = document.getElementById('vocabPool');
    if (!pool) return;
    if (!groupId && !keyword) {
        pool.innerHTML = '<div class="text-muted text-center py-2">请先选择词汇分组</div>';
        return;
    }
    pool.innerHTML = '<div class="text-muted text-center py-2">加载中...</div>';
    fetch('/admin/ai-vocabulary/search?group_id=' + encodeURIComponent(groupId) + '&keyword=' + encodeURIComponent(keyword))
    .then(function(r) { return r.json(); })
    .then(function(data) {
        if (!data.items || data.items.length === 0) {
            pool.innerHTML = '<div class="text-muted text-center py-2">无匹配词汇</div>';
            return;
        }
        var html = '';
        var defRepeat = 1;
        data.items.forEach(function(v) {
            if (!selectedVocabs[v.id]) {
                selectedVocabs[v.id] = { id: v.id, word: v.word, url: v.url || '', must: false, repeat: defRepeat };
            }
            html += '<span class="vocab-tag selected" data-id="' + v.id + '" data-word="' + escAttr(v.word) + '" data-url="' + escAttr(v.url || '') + '" onclick="toggleVocab(this)">' + escHtml(v.word) + '</span>';
        });
        pool.innerHTML = html;
        renderSelected();
        syncConfig();
    });
}

function selectAllVocabs() {
    var defRepeat = 1;
    document.querySelectorAll('#vocabPool .vocab-tag').forEach(function(el) {
        var id = el.dataset.id;
        if (!selectedVocabs[id]) {
            selectedVocabs[id] = { id: id, word: el.dataset.word, url: el.dataset.url || '', must: false, repeat: defRepeat };
        }
        el.classList.add('selected');
    });
    renderSelected();
    syncConfig();
}

function deselectAllVocabs() {
    document.querySelectorAll('#vocabPool .vocab-tag').forEach(function(el) {
        var id = el.dataset.id;
        delete selectedVocabs[id];
        el.classList.remove('selected');
    });
    renderSelected();
    syncConfig();
}

function toggleVocab(el) {
    var id = el.dataset.id;
    if (selectedVocabs[id]) {
        delete selectedVocabs[id];
        el.classList.remove('selected');
    } else {
        var defRepeat = 1;
        selectedVocabs[id] = { id: id, word: el.dataset.word, url: el.dataset.url, must: false, repeat: defRepeat };
        el.classList.add('selected');
    }
    renderSelected();
    syncConfig();
}

function renderSelected() {
    var area = document.getElementById('selectedVocabs');
    if (!area) return;
    var keys = Object.keys(selectedVocabs);
    var countEl = document.getElementById('selectedCount');
    if (countEl) countEl.textContent = keys.length;
    if (keys.length === 0) {
        area.innerHTML = '<div class="text-muted text-center py-2">点击上方词汇标签选择</div>';
        updateVocabUsageHint();
        return;
    }
    var html = '';
    keys.forEach(function(id) {
        var v = selectedVocabs[id];
        html += '<span class="selected-vocab-item">'
            + '<span class="vocab-name">' + escHtml(v.word) + '</span>'
            + (v.url ? '<i class="bi bi-link-45deg text-muted"></i>' : '')
            + '<input type="checkbox" class="form-check-input" title="必选" ' + (v.must ? 'checked' : '') + ' onchange="selectedVocabs[\'' + id + '\'].must=this.checked;syncConfig();updateVocabUsageHint()">'
            + '<input type="number" class="form-control form-control-sm" value="' + v.repeat + '" min="1" max="20" title="出现次数" onchange="selectedVocabs[\'' + id + '\'].repeat=parseInt(this.value)||1;syncConfig();updateVocabUsageHint()">'
            + '<button type="button" class="btn btn-outline-danger" onclick="delete selectedVocabs[\'' + id + '\'];renderSelected();syncConfig();refreshPoolTags()">×</button>'
            + '</span>';
    });
    area.innerHTML = html;
    updateVocabUsageHint();
}

function refreshPoolTags() {
    document.querySelectorAll('#vocabPool .vocab-tag').forEach(function(el) {
        el.classList.toggle('selected', !!selectedVocabs[el.dataset.id]);
    });
}

function syncConfig() {
    var keys = Object.keys(selectedVocabs);
    var config = {
        vocabs: keys.map(function(id) { return selectedVocabs[id]; }),
        random_count: parseInt(document.getElementById('randomCount').value) || 5
    };
    document.getElementById('vocabConfigInput').value = JSON.stringify(config);
}

function updateVocabUsageHint() {
    var keys = Object.keys(selectedVocabs);
    var mustTotal = 0;
    var optionalRepeats = [];
    keys.forEach(function(id) {
        var repeat = parseInt(selectedVocabs[id].repeat, 10) || 0;
        if (selectedVocabs[id].must) {
            mustTotal += repeat;
        } else {
            optionalRepeats.push(repeat);
        }
    });
    var randomCount = parseInt(document.getElementById('randomCount').value, 10) || 0;
    randomCount = Math.max(0, Math.min(randomCount, optionalRepeats.length));

    // 随机词会在可选词中抽取，出现次数有波动：显示最小~最大区间
    optionalRepeats.sort(function(a, b) { return a - b; });
    var randomMin = 0;
    var randomMax = 0;
    for (var i = 0; i < randomCount; i++) {
        randomMin += optionalRepeats[i] || 0;
        randomMax += optionalRepeats[optionalRepeats.length - 1 - i] || 0;
    }
    var totalMin = mustTotal + randomMin;
    var totalMax = mustTotal + randomMax;
    var hint = document.getElementById('vocabUsageHint');
    if (hint) {
        if (totalMin === totalMax) {
            hint.textContent = '预计关键词总出现次数：' + totalMin + '（必选词 + 随机词）';
        } else {
            hint.textContent = '预计关键词总出现次数：' + totalMin + ' ~ ' + totalMax + '（必选词 + 随机词）';
        }
    }
}

// Sync config on form submit
document.getElementById('taskForm').addEventListener('submit', function() { syncConfig(); });

function escHtml(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function escAttr(s) { return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
</script>
