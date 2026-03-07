<form class="row g-3 mb-3 align-items-center" method="GET" action="/admin/articles">
    <div class="col-auto">
        <input type="text" name="search" class="form-control" placeholder="搜索标题..." value="<?= htmlspecialchars($search ?? '') ?>">
    </div>
    <div class="col-auto">
        <button type="submit" class="btn btn-primary">搜索</button>
        <?php if (!empty($search)): ?><a href="/admin/articles" class="btn btn-secondary">清除</a><?php endif; ?>
    </div>
    <div class="col-auto ms-auto d-flex align-items-center gap-2">
        <span class="text-muted">共 <?= $pagination['total'] ?? 0 ?> 篇</span>
        <a href="/admin/article/create" class="btn btn-primary"><i class="bi bi-plus"></i> 新建资讯</a>
    </div>
</form>
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
        <?php
        $totalPages = (int)($pagination['total_pages'] ?? 1);
        if ($totalPages > 1):
            $currentPage = (int)($pagination['page'] ?? 1);
            $searchParam = urlencode($search ?? '');
            $radius = 2; // 当前页左右各显示页数
            $pages = [];
            if ($totalPages <= 7) {
                for ($i = 1; $i <= $totalPages; $i++) $pages[] = $i;
            } else {
                $pages[] = 1;
                $start = max(2, $currentPage - $radius);
                $end = min($totalPages - 1, $currentPage + $radius);
                if ($start > 2) $pages[] = '...';
                for ($i = $start; $i <= $end; $i++) $pages[] = $i;
                if ($end < $totalPages - 1) $pages[] = '...';
                if ($totalPages > 1) $pages[] = $totalPages;
            }
            $pageUrl = function ($p) use ($searchParam) { return '/admin/articles?page=' . $p . '&search=' . $searchParam; };
        ?>
        <nav>
            <ul class="pagination justify-content-center mb-0 flex-wrap">
                <li class="page-item <?= $currentPage <= 1 ? 'disabled' : '' ?>">
                    <a class="page-link" href="<?= $currentPage <= 1 ? '#' : $pageUrl($currentPage - 1) ?>" aria-label="上一页">«</a>
                </li>
                <?php foreach ($pages as $p): ?>
                <?php if ($p === '...'): ?>
                <li class="page-item disabled"><span class="page-link">…</span></li>
                <?php else: ?>
                <li class="page-item <?= $p == $currentPage ? 'active' : '' ?>">
                    <a class="page-link" href="<?= $pageUrl($p) ?>"><?= $p ?></a>
                </li>
                <?php endif; ?>
                <?php endforeach; ?>
                <li class="page-item <?= $currentPage >= $totalPages ? 'disabled' : '' ?>">
                    <a class="page-link" href="<?= $currentPage >= $totalPages ? '#' : $pageUrl($currentPage + 1) ?>" aria-label="下一页">»</a>
                </li>
            </ul>
        </nav>
        <?php endif; ?>
    </div>
</div>
