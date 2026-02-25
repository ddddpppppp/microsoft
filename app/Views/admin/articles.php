<div class="mb-3">
    <a href="/admin/article/create" class="btn btn-primary"><i class="bi bi-plus"></i> 新建资讯</a>
</div>
<div class="card">
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th width="60">ID</th>
                        <th>标题</th>
                        <th width="100">Slug</th>
                        <th width="80">状态</th>
                        <th width="160">创建时间</th>
                        <th width="140">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($articles as $a): ?>
                    <tr>
                        <td><?= $a['id'] ?></td>
                        <td><?= htmlspecialchars($a['title']) ?></td>
                        <td><?= htmlspecialchars($a['slug']) ?></td>
                        <td><span class="badge bg-<?= $a['status'] === 'published' ? 'success' : 'secondary' ?>"><?= $a['status'] === 'published' ? '已发布' : '草稿' ?></span></td>
                        <td><?= $a['created_at'] ?></td>
                        <td>
                            <a href="/admin/article/edit/<?= $a['id'] ?>" class="btn btn-sm btn-outline-primary">编辑</a>
                            <a href="/admin/article/delete/<?= $a['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('确定删除？')">删除</a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    <?php if (empty($articles)): ?>
                    <tr><td colspan="6" class="text-center text-muted">暂无资讯</td></tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
