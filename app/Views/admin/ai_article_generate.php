<?php if (isset($_GET['config_saved'])): ?>
<div class="alert alert-success alert-dismissible fade show">API 配置已保存！<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>

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
                <div class="col-md-3">
                    <label class="form-label">发布状态</label>
                    <select name="auto_publish" class="form-select">
                        <option value="0">存为草稿</option>
                        <option value="1">直接发布</option>
                    </select>
                </div>
                <div class="col-md-3 d-flex align-items-end">
                    <button type="submit" class="btn btn-success w-100" id="btnGenerate">
                        <i class="bi bi-magic"></i> 立即生成
                    </button>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">提示词 <span class="text-danger">*</span></label>
                <textarea name="prompt" class="form-control" rows="4" placeholder="输入提示词，例如：写一篇关于Windows 11最新功能介绍的文章，包含系统要求、新特性、升级方法等内容，字数约1500字" required></textarea>
            </div>
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
                            $typeLabels = ['once' => '一次性', 'interval' => '间隔', 'daily' => '每天'];
                            echo $typeLabels[$t['schedule_type']] ?? $t['schedule_type'];
                            ?>
                        </td>
                        <td>
                            <?php if ($t['schedule_type'] === 'interval'): ?>
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
                            <button class="btn btn-sm btn-outline-success btn-run-task" data-task-id="<?= $t['id'] ?>" data-prompt="<?= htmlspecialchars($t['prompt']) ?>" data-provider="<?= htmlspecialchars($t['ai_provider']) ?>" data-category="<?= htmlspecialchars($t['category']) ?>" data-auto-publish="<?= $t['auto_publish'] ?>">
                                <i class="bi bi-play-fill"></i>
                            </button>
                            <a href="/admin/ai-article-task/delete/<?= $t['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('确定删除此任务？')">
                                <i class="bi bi-trash"></i>
                            </a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    <?php if (empty($tasks)): ?>
                    <tr><td colspan="10" class="text-center text-muted py-4">暂无定时任务，点击"新建任务"创建</td></tr>
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
document.getElementById('quickGenForm').addEventListener('submit', function(e) {
    e.preventDefault();
    runGenerate({
        prompt: this.prompt.value,
        provider: this.querySelector('[name=provider]').value,
        category: this.querySelector('[name=category]').value,
        auto_publish: this.querySelector('[name=auto_publish]').value,
    });
});

document.querySelectorAll('.btn-run-task').forEach(function(btn) {
    btn.addEventListener('click', function() {
        runGenerate({
            task_id: this.dataset.taskId,
            prompt: this.dataset.prompt,
            provider: this.dataset.provider,
            category: this.dataset.category,
            auto_publish: this.dataset.autoPublish,
        });
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

    fetch('/admin/ai-article-task/run', {
        method: 'POST',
        body: formData,
    })
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
</script>
