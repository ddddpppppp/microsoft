<div class="card">
    <div class="card-body">
        <form class="row g-3 mb-3" method="GET" action="/admin/products">
            <div class="col-auto">
                <input type="text" name="search" class="form-control" placeholder="搜索产品..." value="<?= htmlspecialchars($search ?? '') ?>">
            </div>
            <div class="col-auto">
                <button type="submit" class="btn btn-primary">搜索</button>
                <?php if ($search): ?><a href="/admin/products" class="btn btn-secondary">清除</a><?php endif; ?>
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
                        <th width="80">操作</th>
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
                        <td><a href="/admin/product/edit/<?= $p['id'] ?>" class="btn btn-sm btn-outline-primary">编辑</a></td>
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
                    <a class="page-link" href="/admin/products?page=<?= $i ?>&search=<?= urlencode($search) ?>"><?= $i ?></a>
                </li>
                <?php endfor; ?>
            </ul>
        </nav>
        <?php endif; ?>
    </div>
</div>
