<div class="card">
    <div class="card-body">
        <form class="row g-3 mb-3" method="GET" action="/admin/products">
            <div class="col-auto">
                <input type="text" name="search" class="form-control" placeholder="搜索产品..." value="<?= htmlspecialchars($search ?? '') ?>">
            </div>
            <div class="col-auto">
                <select name="own" class="form-select">
                    <option value="all" <?= ($ownFilter ?? 'all') === 'all' ? 'selected' : '' ?>>全部</option>
                    <option value="own" <?= ($ownFilter ?? 'all') === 'own' ? 'selected' : '' ?>>仅自有</option>
                </select>
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary">搜索</button>
                <?php if (!empty($search) || (($ownFilter ?? 'all') !== 'all')): ?><a href="/admin/products" class="btn btn-secondary">清除</a><?php endif; ?>
            </div>
        </form>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th width="60">ID</th>
                        <th width="50">图标</th>
                        <th>标题</th>
                        <th width="80">类型</th>
                        <th width="80">评分</th>
                        <th width="100">价格</th>
                        <th width="80">自有</th>
                        <th width="90">今日流量</th>
                        <th width="90">今日下载</th>
                        <th width="170">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($products as $p): ?>
                    <tr>
                        <td><?= $p['id'] ?></td>
                        <td><img src="<?= htmlspecialchars($p['local_icon'] ?: $p['icon_url']) ?>" width="32" height="32" style="border-radius:4px;object-fit:cover;"></td>
                        <td><?= htmlspecialchars($p['title']) ?></td>
                        <td><span class="badge bg-<?= $p['product_type'] === 'game' ? 'success' : 'info' ?>"><?= $p['product_type'] === 'game' ? '游戏' : '应用' ?></span></td>
                        <td><?= $p['rating'] ?></td>
                        <td><?= htmlspecialchars($p['price'] ?: '免费') ?></td>
                        <td><?= $p['is_own_product'] ? '<span class="badge bg-warning">是</span>' : '-' ?></td>
                        <td><?= (int)($p['today_views'] ?? 0) ?></td>
                        <td><?= (int)($p['today_downloads'] ?? 0) ?></td>
                        <td>
                            <button
                                type="button"
                                class="btn btn-sm btn-outline-secondary js-copy-link"
                                data-link="<?= htmlspecialchars($p['copy_link'] ?? '') ?>"
                                <?= empty($p['copy_link']) ? 'disabled' : '' ?>
                            >复制链接</button>
                            <a href="/admin/product/edit/<?= $p['id'] ?>" class="btn btn-sm btn-outline-primary">编辑</a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php if ($pagination['total_pages'] > 1): ?>
        <nav>
            <ul class="pagination">
                <?php for ($i = 1; $i <= $pagination['total_pages']; $i++): ?>
                <li class="page-item <?= $i == $pagination['page'] ? 'active' : '' ?>">
                    <a class="page-link" href="/admin/products?page=<?= $i ?>&search=<?= urlencode($search ?? '') ?>&own=<?= urlencode($ownFilter ?? 'all') ?>"><?= $i ?></a>
                </li>
                <?php endfor; ?>
            </ul>
        </nav>
        <?php endif; ?>
    </div>
</div>

<script>
document.addEventListener('click', async function (event) {
    const btn = event.target.closest('.js-copy-link');
    if (!btn) return;

    const link = btn.getAttribute('data-link') || '';
    if (!link) return;

    const oldText = btn.textContent;
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(link);
        } else {
            const input = document.createElement('textarea');
            input.value = link;
            input.style.position = 'fixed';
            input.style.left = '-9999px';
            document.body.appendChild(input);
            input.focus();
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
        }
        btn.textContent = '已复制';
    } catch (e) {
        btn.textContent = '复制失败';
    }

    setTimeout(function () {
        btn.textContent = oldText;
    }, 1200);
});
</script>
