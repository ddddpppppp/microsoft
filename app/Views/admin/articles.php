<div class="mb-3 d-flex justify-content-between align-items-center">
    <a href="/admin/article/create" class="btn btn-primary"><i class="bi bi-plus"></i> 新建资讯</a>
    <span class="text-muted">共 <?= $pagination['total'] ?? 0 ?> 篇</span>
</div>
<div class="card">
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead>
                    <tr>
                        <th width="60">ID</th>
                        <th width="80">封面</th>
                        <th>标题</th>
                        <th width="100">分类</th>
                        <th width="60">推荐</th>
                        <th width="60">浏览</th>
                        <th width="80">状态</th>
                        <th width="160">创建时间</th>
                        <th width="140">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($articles as $a): ?>
                    <tr>
                        <td><?= $a['id'] ?></td>
                        <td>
                            <?php if (!empty($a['cover_image'])): ?>
                            <img src="<?= htmlspecialchars($a['cover_image']) ?>" style="width:60px;height:40px;object-fit:cover;border-radius:4px">
                            <?php else: ?>
                            <span class="text-muted">-</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <div><?= htmlspecialchars($a['title']) ?></div>
                            <small class="text-muted">/article/<?= htmlspecialchars($a['slug']) ?></small>
                        </td>
                        <td><span class="badge bg-info"><?= htmlspecialchars($a['category'] ?: '未分类') ?></span></td>
                        <td><?= !empty($a['is_recommended']) ? '<i class="bi bi-star-fill text-warning"></i>' : '' ?></td>
                        <td><?= $a['views'] ?? 0 ?></td>
                        <td><span class="badge bg-<?= $a['status'] === 'published' ? 'success' : 'secondary' ?>"><?= $a['status'] === 'published' ? '已发布' : '草稿' ?></span></td>
                        <td><?= $a['created_at'] ?></td>
                        <td>
                            <a href="/admin/article/edit/<?= $a['id'] ?>" class="btn btn-sm btn-outline-primary">编辑</a>
                            <a href="/admin/article/delete/<?= $a['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('确定删除？')">删除</a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    <?php if (empty($articles)): ?>
                    <tr><td colspan="9" class="text-center text-muted">暂无资讯</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
        <?php if (($pagination['total_pages'] ?? 1) > 1): ?>
        <nav>
            <ul class="pagination justify-content-center mb-0">
                <?php for ($p = 1; $p <= $pagination['total_pages']; $p++): ?>
                <li class="page-item <?= $p == $pagination['page'] ? 'active' : '' ?>">
                    <a class="page-link" href="/admin/articles?page=<?= $p ?>"><?= $p ?></a>
                </li>
                <?php endfor; ?>
            </ul>
        </nav>
        <?php endif; ?>
    </div>
</div>
