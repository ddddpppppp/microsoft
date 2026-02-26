<?php if (isset($_GET['config_saved'])): ?>
<div class="alert alert-success alert-dismissible fade show">API 配置已保存！<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>
<?php endif; ?>

<!-- Quick Generate -->
<div class="card mb-4">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0"><i class="bi bi-chat-square-quote"></i> 快速生成评价</h5>
    </div>
    <div class="card-body">
        <form id="quickGenForm">
            <div class="row mb-3">
                <div class="col-md-3">
                    <label class="form-label">选择产品 <span class="text-danger">*</span></label>
                    <select name="product_id" class="form-select" required>
                        <option value="">-- 选择产品 --</option>
                        <?php
                        $productModel = new \App\Models\Product();
                        $allProducts = $productModel->all('title ASC');
                        foreach ($allProducts as $p):
                        ?>
                        <option value="<?= $p['id'] ?>"><?= htmlspecialchars($p['title']) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="form-label">AI 提供商</label>
                    <select name="provider" class="form-select">
                        <option value="deepseek">DeepSeek</option>
                        <option value="gemini">Gemini</option>
                        <option value="openai">OpenAI</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <label class="form-label">生成条数</label>
                    <input type="number" name="num_reviews" class="form-control" value="3" min="1" max="10">
                </div>
                <div class="col-md-2">
                    <label class="form-label">发布状态</label>
                    <select name="auto_publish" class="form-select">
                        <option value="1">直接发布</option>
                        <option value="0">存为草稿</option>
                    </select>
                </div>
                <div class="col-md-3 d-flex align-items-end">
                    <button type="submit" class="btn btn-success w-100" id="btnGenerate">
                        <i class="bi bi-magic"></i> 立即生成
                    </button>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">自定义提示词 <small class="text-muted">（留空使用默认提示词）</small></label>
                <textarea name="prompt" class="form-control" rows="3" placeholder="留空则自动根据产品名称生成评价。可输入自定义提示词，如：请生成关于这个聊天软件的用户评价，重点关注消息速度和用户界面"></textarea>
            </div>
        </form>
        <div id="genResult" class="d-none">
            <hr>
            <div id="genLoading" class="text-center py-4 d-none">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2 text-muted">AI 正在生成评价，请稍候（可能需要 30-60 秒）...</p>
            </div>
            <div id="genSuccess" class="d-none">
                <div class="alert alert-success">
                    <i class="bi bi-check-circle"></i>
                    评价生成成功！共生成 <strong id="genCount"></strong> 条评价
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
        <a href="/admin/ai-review-task/create" class="btn btn-sm btn-primary"><i class="bi bi-plus"></i> 新建任务</a>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead>
                    <tr>
                        <th width="50">ID</th>
                        <th>任务名称</th>
                        <th>关联产品</th>
                        <th width="90">AI</th>
                        <th width="80">每次条数</th>
                        <th width="100">类型</th>
                        <th width="65">已生成</th>
                        <th width="160">上次执行</th>
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
                            <small class="text-muted"><?= htmlspecialchars(mb_substr($t['prompt'] ?: '默认提示词', 0, 40)) ?></small>
                        </td>
                        <td>
                            <?php if ($t['product_icon']): ?>
                                <img src="<?= htmlspecialchars($t['product_icon']) ?>" style="width:24px;height:24px;border-radius:4px;vertical-align:middle" alt="">
                            <?php endif; ?>
                            <?= htmlspecialchars($t['product_title'] ?? '未知产品') ?>
                        </td>
                        <td><span class="badge bg-info"><?= htmlspecialchars($t['ai_provider']) ?></span></td>
                        <td><?= $t['num_reviews'] ?> 条</td>
                        <td>
                            <?php
                            $typeLabels = ['once' => '一次性', 'interval' => '间隔', 'daily' => '每天'];
                            echo $typeLabels[$t['schedule_type']] ?? $t['schedule_type'];
                            ?>
                        </td>
                        <td><span class="badge bg-primary"><?= $t['total_generated'] ?></span></td>
                        <td><?= $t['last_run_at'] ?: '<span class="text-muted">未执行</span>' ?></td>
                        <td>
                            <?php if ($t['is_active']): ?>
                                <span class="badge bg-success">启用</span>
                            <?php else: ?>
                                <span class="badge bg-secondary">停用</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <a href="/admin/ai-review-task/edit/<?= $t['id'] ?>" class="btn btn-sm btn-outline-primary">编辑</a>
                            <a href="/admin/ai-review-task/toggle/<?= $t['id'] ?>" class="btn btn-sm btn-outline-<?= $t['is_active'] ? 'warning' : 'success' ?>">
                                <?= $t['is_active'] ? '停用' : '启用' ?>
                            </a>
                            <button class="btn btn-sm btn-outline-success btn-run-task"
                                data-task-id="<?= $t['id'] ?>"
                                data-product-id="<?= $t['product_id'] ?>"
                                data-prompt="<?= htmlspecialchars($t['prompt'] ?? '') ?>"
                                data-provider="<?= htmlspecialchars($t['ai_provider']) ?>"
                                data-num-reviews="<?= $t['num_reviews'] ?>"
                                data-auto-publish="<?= $t['auto_publish'] ?>">
                                <i class="bi bi-play-fill"></i>
                            </button>
                            <a href="/admin/ai-review-task/delete/<?= $t['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('确定删除此任务？')">
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
    </div>
</div>

<script>
document.getElementById('quickGenForm').addEventListener('submit', function(e) {
    e.preventDefault();
    runReviewGenerate({
        product_id: this.querySelector('[name=product_id]').value,
        prompt: this.querySelector('[name=prompt]').value,
        provider: this.querySelector('[name=provider]').value,
        num_reviews: this.querySelector('[name=num_reviews]').value,
        auto_publish: this.querySelector('[name=auto_publish]').value,
    });
});

document.querySelectorAll('.btn-run-task').forEach(function(btn) {
    btn.addEventListener('click', function() {
        runReviewGenerate({
            task_id: this.dataset.taskId,
            product_id: this.dataset.productId,
            prompt: this.dataset.prompt,
            provider: this.dataset.provider,
            num_reviews: this.dataset.numReviews,
            auto_publish: this.dataset.autoPublish,
        });
    });
});

function runReviewGenerate(params) {
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

    fetch('/admin/ai-review-task/run', {
        method: 'POST',
        body: formData,
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
        loading.classList.add('d-none');
        document.getElementById('btnGenerate').disabled = false;
        if (data.success) {
            success.classList.remove('d-none');
            document.getElementById('genCount').textContent = data.count;
            var html = '';
            data.reviews.forEach(function(r, i) {
                html += '<div class="mb-3 p-3 bg-light rounded">'
                    + '<div class="d-flex justify-content-between"><strong>' + (r.author_name || '匿名') + '</strong>'
                    + '<span class="text-warning">★ ' + (r.rating || 5) + '</span></div>'
                    + '<div class="fw-bold mt-1">' + (r.title || '') + '</div>'
                    + '<div class="mt-1">' + (r.content || '') + '</div>'
                    + '</div>';
            });
            document.getElementById('genPreview').innerHTML = html;
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
