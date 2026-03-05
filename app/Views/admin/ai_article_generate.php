<?php if (isset($_GET['config_saved'])): ?>
<div class="alert alert-success alert-dismissible fade show">API 配置已保存！<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>

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

<!-- Quick Generate -->
<div class="card mb-4">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0"><i class="bi bi-lightning-charge"></i> 快速生成</h5>
        <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="collapse" data-bs-target="#configPanel">
            <i class="bi bi-gear"></i> API 配置
        </button>
    </div>
    <div class="collapse" id="configPanel">
        <div class="card-body border-bottom bg-light">
            <form method="POST" action="/admin/ai-article-config/save" class="row g-3 align-items-end">
                <div class="col-md-3">
                    <label class="form-label">AI 提供商</label>
                    <select name="provider" class="form-select" id="configProvider">
                        <option value="deepseek">DeepSeek</option>
                        <option value="gemini">Gemini</option>
                        <option value="openai">OpenAI</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">API Key</label>
                    <input type="password" name="api_key" class="form-control" placeholder="输入 API Key">
                </div>
                <div class="col-md-3">
                    <label class="form-label">模型名称</label>
                    <input type="text" name="model" class="form-control" placeholder="留空使用默认模型">
                </div>
                <div class="col-md-2">
                    <button type="submit" class="btn btn-primary w-100">保存配置</button>
                </div>
            </form>
            <div class="mt-2">
                <small class="text-muted">
                    当前配置：
                    <?php foreach ($aiConfig as $p => $c): ?>
                        <span class="badge bg-<?= empty($c['api_key']) ? 'secondary' : 'success' ?> me-1">
                            <?= $p ?>: <?= empty($c['api_key']) ? '未配置' : '已配置' ?> (<?= $c['model'] ?>)
                        </span>
                    <?php endforeach; ?>
                </small>
            </div>
        </div>
    </div>
    <div class="card-body">
        <form id="quickGenForm">
            <div class="row mb-3">
                <div class="col-md-3">
                    <label class="form-label">AI 提供商</label>
                    <select name="provider" class="form-select" id="quickProvider">
                        <option value="deepseek">DeepSeek</option>
                        <option value="gemini">Gemini</option>
                        <option value="openai">OpenAI</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label class="form-label">文章分类</label>
                    <input type="text" name="category" class="form-control" placeholder="如：使用教程、行业资讯">
                </div>
                <div class="col-md-2">
                    <label class="form-label">文章风格</label>
                    <select name="article_style" class="form-select">
                        <option value="seo">SEO 风格</option>
                        <option value="media">自媒体风格</option>
                        <option value="geo">GEO 风格</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="form-label">发布状态</label>
                    <select name="auto_publish" class="form-select">
                        <option value="0">存为草稿</option>
                        <option value="1">直接发布</option>
                    </select>
                </div>
                <div class="col-md-2 d-flex align-items-end">
                    <button type="submit" class="btn btn-success w-100" id="btnGenerate">
                        <i class="bi bi-magic"></i> 立即生成
                    </button>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">提示词 <span class="text-danger">*</span></label>
                <textarea name="prompt" class="form-control" rows="4" placeholder="输入提示词，例如：写一篇关于Windows 11最新功能介绍的文章，包含系统要求、新特性、升级方法等内容，字数约1500字" required></textarea>
            </div>

            <!-- Vocabulary Selection -->
            <?php if (!empty($vocabGroups)): ?>
            <div class="card mb-3">
                <div class="card-header py-2">
                    <h6 class="mb-0"><i class="bi bi-bookmark-star"></i> 关键词汇选择</h6>
                </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-3">
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
                            <input type="number" class="form-control" id="randomCount" value="5" min="0" max="100">
                        </div>
                        <div class="col-md-4"></div>
                    </div>

                    <div class="d-flex gap-2 mb-2">
                        <button type="button" class="btn btn-sm btn-outline-primary" id="btnSelectAll" onclick="selectAllVocabs()">全选</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" id="btnDeselectAll" onclick="deselectAllVocabs()">取消全选</button>
                    </div>
                    <div class="vocab-picker mb-3" id="vocabPool">
                        <div class="text-muted text-center py-2">请先选择词汇分组</div>
                    </div>

                    <h6 class="mb-2">已选词汇 <span class="badge bg-primary" id="selectedCount">0</span></h6>
                    <div class="selected-vocabs-area" id="selectedVocabs">
                        <div class="text-muted text-center py-2" id="noSelectedHint">点击上方词汇标签选择</div>
                    </div>
                    <small class="text-muted d-block mt-2">
                        <span id="vocabUsageHint">预计关键词总出现次数：0（必选词 + 随机词）</span>
                        <span class="ms-3"><i class="bi bi-info-circle"></i> 勾选后必定会出现在文章中</span>
                    </small>
                </div>
            </div>
            <?php endif; ?>
        </form>
        <div id="genResult" class="d-none">
            <hr>
            <div id="genLoading" class="text-center py-4 d-none">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2 text-muted">AI 正在生成文章，请稍候（可能需要 30-60 秒）...</p>
            </div>
            <div id="genSuccess" class="d-none">
                <div class="alert alert-success">
                    <i class="bi bi-check-circle"></i>
                    文章生成成功！标题：<strong id="genTitle"></strong>
                    <a id="genEditLink" href="#" class="btn btn-sm btn-outline-primary ms-2">编辑文章</a>
                </div>
                <div id="genPreview" class="border rounded p-3" style="max-height:400px;overflow-y:auto"></div>
            </div>
            <div id="genError" class="d-none">
                <div class="alert alert-danger"><i class="bi bi-x-circle"></i> <span id="genErrorMsg"></span></div>
            </div>
        </div>
    </div>
</div>

<!-- Scheduled Tasks -->
<div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0"><i class="bi bi-clock-history"></i> 定时任务</h5>
        <a href="/admin/ai-article-task/create" class="btn btn-sm btn-primary"><i class="bi bi-plus"></i> 新建任务</a>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead>
                    <tr>
                        <th width="50">ID</th>
                        <th>任务名称</th>
                        <th width="90">AI</th>
                        <th width="80">风格</th>
                        <th width="100">类型</th>
                        <th width="140">执行计划</th>
                        <th width="65">已生成</th>
                        <th width="160">上次执行</th>
                        <th width="160">下次执行</th>
                        <th width="70">状态</th>
                        <th width="200">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($tasks as $t): ?>
                    <tr class="<?= $t['is_active'] ? '' : 'table-secondary' ?>">
                        <td><?= $t['id'] ?></td>
                        <td>
                            <div><?= htmlspecialchars($t['name'] ?: '未命名') ?></div>
                            <small class="text-muted"><?= htmlspecialchars(mb_substr($t['prompt'], 0, 60)) ?>...</small>
                        </td>
                        <td><span class="badge bg-info"><?= htmlspecialchars($t['ai_provider']) ?></span></td>
                        <td>
                            <?php
                            $styleLabels = ['seo' => 'SEO', 'media' => '自媒体', 'geo' => 'GEO'];
                            $style = $t['article_style'] ?? 'seo';
                            ?>
                            <span class="badge bg-secondary"><?= $styleLabels[$style] ?? $style ?></span>
                        </td>
                        <td>
                            <?php
                            $typeLabels = ['once' => '一次性', 'hourly' => '小时', 'interval' => '间隔', 'daily' => '每天'];
                            echo $typeLabels[$t['schedule_type']] ?? $t['schedule_type'];
                            ?>
                        </td>
                        <td>
                            <?php if ($t['schedule_type'] === 'hourly'): ?>
                                每 <?= max(1, (int)($t['interval_hours'] ?? 1)) ?> 小时
                            <?php elseif ($t['schedule_type'] === 'interval'): ?>
                                每 <?= $t['interval_days'] ?> 天
                            <?php elseif ($t['schedule_type'] === 'daily'): ?>
                                每天 <?= htmlspecialchars($t['daily_time']) ?>
                            <?php else: ?>
                                <span class="text-muted">一次性执行</span>
                            <?php endif; ?>
                        </td>
                        <td><span class="badge bg-primary"><?= $t['total_generated'] ?></span></td>
                        <td><?= $t['last_run_at'] ?: '<span class="text-muted">未执行</span>' ?></td>
                        <td><?= $t['next_run_at'] ?: '<span class="text-muted">-</span>' ?></td>
                        <td>
                            <?php if ($t['is_active']): ?>
                                <span class="badge bg-success">启用</span>
                            <?php else: ?>
                                <span class="badge bg-secondary">停用</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <a href="/admin/ai-article-task/edit/<?= $t['id'] ?>" class="btn btn-sm btn-outline-primary">编辑</a>
                            <a href="/admin/ai-article-task/toggle/<?= $t['id'] ?>" class="btn btn-sm btn-outline-<?= $t['is_active'] ? 'warning' : 'success' ?>">
                                <?= $t['is_active'] ? '停用' : '启用' ?>
                            </a>
                            <button class="btn btn-sm btn-outline-success btn-run-task" data-task-id="<?= $t['id'] ?>">
                                <i class="bi bi-play-fill"></i>
                            </button>
                            <a href="/admin/ai-article-task/delete/<?= $t['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('确定删除此任务？')">
                                <i class="bi bi-trash"></i>
                            </a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    <?php if (empty($tasks)): ?>
                    <tr><td colspan="11" class="text-center text-muted py-4">暂无定时任务，点击"新建任务"创建</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        <div class="mt-3 p-3 bg-light rounded">
            <h6><i class="bi bi-info-circle"></i> 定时任务说明</h6>
            <ul class="mb-0 small text-muted">
                <li><strong>一次性</strong>：只手动执行，不会自动运行</li>
                <li><strong>间隔</strong>：每隔 N 天自动生成一篇文章</li>
                <li><strong>每天</strong>：每天在指定时间自动生成一篇文章</li>
                <li>定时任务需要配置系统计划任务（Cron），命令：<code>php <?= BASE_PATH ?>/scripts/ai_cron.php</code>，建议每小时执行一次</li>
            </ul>
        </div>
    </div>
</div>

<script>
var selectedVocabs = {};
var vocabSearchTimer = null;

// Vocab group select
var groupSel = document.getElementById('vocabGroupSelect');
if (groupSel) {
    groupSel.addEventListener('change', function() {
        loadVocabs(this.value, '');
    });
}

var searchInput = document.getElementById('vocabSearchInput');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        clearTimeout(vocabSearchTimer);
        var kw = this.value;
        vocabSearchTimer = setTimeout(function() {
            var gid = groupSel ? groupSel.value : '';
            loadVocabs(gid, kw);
        }, 300);
    });
}
var randomCountInput = document.getElementById('randomCount');
if (randomCountInput) {
    randomCountInput.addEventListener('input', updateVocabUsageHint);
    randomCountInput.addEventListener('change', updateVocabUsageHint);
}

function loadVocabs(groupId, keyword) {
    var pool = document.getElementById('vocabPool');
    if (!groupId && !keyword) {
        pool.innerHTML = '<div class="text-muted text-center py-2">请先选择词汇分组</div>';
        return;
    }
    pool.innerHTML = '<div class="text-muted text-center py-2">加载中...</div>';
    var url = '/admin/ai-vocabulary/search?group_id=' + encodeURIComponent(groupId) + '&keyword=' + encodeURIComponent(keyword);
    fetch(url).then(function(r) { return r.json(); }).then(function(data) {
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
}

function deselectAllVocabs() {
    document.querySelectorAll('#vocabPool .vocab-tag').forEach(function(el) {
        var id = el.dataset.id;
        delete selectedVocabs[id];
        el.classList.remove('selected');
    });
    renderSelected();
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
}

function renderSelected() {
    var area = document.getElementById('selectedVocabs');
    var keys = Object.keys(selectedVocabs);
    document.getElementById('selectedCount').textContent = keys.length;
    if (keys.length === 0) {
        area.innerHTML = '<div class="text-muted text-center py-2" id="noSelectedHint">点击上方词汇标签选择</div>';
        updateVocabUsageHint();
        return;
    }
    var html = '';
    keys.forEach(function(id) {
        var v = selectedVocabs[id];
        html += '<span class="selected-vocab-item">'
            + '<span class="vocab-name">' + escHtml(v.word) + '</span>'
            + (v.url ? '<i class="bi bi-link-45deg text-muted"></i>' : '')
            + '<input type="checkbox" class="form-check-input" title="必选" ' + (v.must ? 'checked' : '') + ' onchange="selectedVocabs[' + id + '].must=this.checked;updateVocabUsageHint()">'
            + '<input type="number" class="form-control form-control-sm" value="' + v.repeat + '" min="1" max="20" title="出现次数" onchange="selectedVocabs[' + id + '].repeat=parseInt(this.value)||1;updateVocabUsageHint()">'
            + '<button type="button" class="btn btn-outline-danger" onclick="delete selectedVocabs[' + id + '];renderSelected();refreshPoolTags()">×</button>'
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

// Form submit
document.getElementById('quickGenForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var params = {
        prompt: this.prompt.value,
        provider: this.querySelector('[name=provider]').value,
        category: this.querySelector('[name=category]').value,
        auto_publish: this.querySelector('[name=auto_publish]').value,
        article_style: this.querySelector('[name=article_style]').value,
    };

    var vocabKeys = Object.keys(selectedVocabs);
    if (vocabKeys.length > 0) {
        var vocabConfig = {
            vocabs: vocabKeys.map(function(id) { return selectedVocabs[id]; }),
            random_count: parseInt(document.getElementById('randomCount').value) || 5
        };
        params.vocabulary_config = JSON.stringify(vocabConfig);
    }
    runGenerate(params);
});

// Run task buttons (from task list)
document.querySelectorAll('.btn-run-task').forEach(function(btn) {
    btn.addEventListener('click', function() {
        runGenerate({ task_id: this.dataset.taskId });
    });
});

function runGenerate(params) {
    var result = document.getElementById('genResult');
    var loading = document.getElementById('genLoading');
    var success = document.getElementById('genSuccess');
    var error = document.getElementById('genError');

    result.classList.remove('d-none');
    loading.classList.remove('d-none');
    success.classList.add('d-none');
    error.classList.add('d-none');
    document.getElementById('btnGenerate').disabled = true;

    var formData = new FormData();
    for (var key in params) {
        formData.append(key, params[key]);
    }

    fetch('/admin/ai-article-task/run', { method: 'POST', body: formData })
    .then(function(r) { return r.json(); })
    .then(function(data) {
        loading.classList.add('d-none');
        document.getElementById('btnGenerate').disabled = false;
        if (data.success) {
            success.classList.remove('d-none');
            document.getElementById('genTitle').textContent = data.title;
            document.getElementById('genEditLink').href = data.edit_url;
            document.getElementById('genPreview').innerHTML = data.content;
        } else {
            error.classList.remove('d-none');
            document.getElementById('genErrorMsg').textContent = data.error || '生成失败';
        }
    })
    .catch(function(err) {
        loading.classList.add('d-none');
        document.getElementById('btnGenerate').disabled = false;
        error.classList.remove('d-none');
        document.getElementById('genErrorMsg').textContent = '请求失败: ' + err.message;
    });
}

function escHtml(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function escAttr(s) { return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
</script>
