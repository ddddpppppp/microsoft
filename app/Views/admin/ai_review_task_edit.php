<?php if (isset($_GET['saved'])): ?>
<div class="alert alert-success alert-dismissible fade show">任务保存成功！<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>

<div class="card">
    <div class="card-body">
        <form method="POST" action="/admin/ai-review-task/save">
            <input type="hidden" name="id" value="<?= $task['id'] ?? '' ?>">
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-3">
                        <label class="form-label">任务名称 <span class="text-danger">*</span></label>
                        <input type="text" name="name" class="form-control" value="<?= htmlspecialchars($task['name'] ?? '') ?>" placeholder="如：Telegram 每日评价" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">关联产品 <span class="text-danger">*</span></label>
                        <select name="product_id" class="form-select" required>
                            <option value="">-- 选择产品 --</option>
                            <?php foreach ($products as $p): ?>
                            <option value="<?= $p['id'] ?>" <?= ($task['product_id'] ?? '') == $p['id'] ? 'selected' : '' ?>>
                                <?= htmlspecialchars($p['title']) ?>
                            </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">自定义提示词 <small class="text-muted">（留空使用默认提示词）</small></label>
                        <textarea name="prompt" class="form-control" rows="6" placeholder="留空则自动根据产品名称生成评价。&#10;&#10;可输入自定义提示词，如：&#10;请生成关于这个聊天软件的用户评价，评价者包括学生、上班族、海外华人等不同用户群体，重点关注消息速度、文件传输和隐私保护方面。"><?= htmlspecialchars($task['prompt'] ?? '') ?></textarea>
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
                        <label class="form-label">每次生成条数</label>
                        <input type="number" name="num_reviews" class="form-control" value="<?= $task['num_reviews'] ?? 3 ?>" min="1" max="10">
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
                        <small class="text-muted">开启后生成的评价将直接发布，否则存为草稿</small>
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
                <a href="/admin/ai-review" class="btn btn-secondary">返回列表</a>
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
                <p class="mt-2 text-muted">AI 正在生成评价，请稍候...</p>
            </div>
            <div id="testSuccess" class="d-none">
                <div class="alert alert-success mb-3">
                    <i class="bi bi-check-circle"></i> 评价生成成功！共 <strong id="testCount"></strong> 条
                </div>
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
    formData.append('product_id', document.querySelector('[name=product_id]').value);
    formData.append('prompt', document.querySelector('[name=prompt]').value);
    formData.append('provider', document.querySelector('[name=ai_provider]').value);
    formData.append('num_reviews', document.querySelector('[name=num_reviews]').value);
    formData.append('auto_publish', document.getElementById('autoPublish').checked ? '1' : '0');

    fetch('/admin/ai-review-task/run', { method: 'POST', body: formData })
    .then(function(r) { return r.json(); })
    .then(function(data) {
        loading.classList.add('d-none');
        btn.disabled = false;
        if (data.success) {
            success.classList.remove('d-none');
            document.getElementById('testCount').textContent = data.count;
            var html = '';
            data.reviews.forEach(function(r) {
                html += '<div class="mb-3 p-3 bg-light rounded">'
                    + '<div class="d-flex justify-content-between"><strong>' + (r.author_name || '匿名') + '</strong>'
                    + '<span class="text-warning">★ ' + (r.rating || 5) + '</span></div>'
                    + '<div class="fw-bold mt-1">' + (r.title || '') + '</div>'
                    + '<div class="mt-1">' + (r.content || '') + '</div>'
                    + '</div>';
            });
            document.getElementById('testPreview').innerHTML = html;
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
