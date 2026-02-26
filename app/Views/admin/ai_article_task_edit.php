<?php if (isset($_GET['saved'])): ?>
<div class="alert alert-success alert-dismissible fade show">任务保存成功！<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>

<div class="card">
    <div class="card-body">
        <form method="POST" action="/admin/ai-article-task/save">
            <input type="hidden" name="id" value="<?= $task['id'] ?? '' ?>">
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
                        <label class="form-label">执行方式</label>
                        <select name="schedule_type" class="form-select" id="scheduleType">
                            <option value="once" <?= ($task['schedule_type'] ?? '') === 'once' ? 'selected' : '' ?>>一次性（手动执行）</option>
                            <option value="interval" <?= ($task['schedule_type'] ?? '') === 'interval' ? 'selected' : '' ?>>按间隔天数</option>
                            <option value="daily" <?= ($task['schedule_type'] ?? '') === 'daily' ? 'selected' : '' ?>>每天定时</option>
                        </select>
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
        document.getElementById('intervalOption').style.display = sel.value === 'interval' ? '' : 'none';
        document.getElementById('dailyOption').style.display = sel.value === 'daily' ? '' : 'none';
    }
    sel.addEventListener('change', toggleOptions);
    toggleOptions();
})();
</script>
