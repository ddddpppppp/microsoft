<div class="row g-4 mb-4">
    <div class="col-12">
        <div class="card border-0 shadow-sm">
            <div class="card-body">
                <h5 class="card-title mb-3">时间筛选</h5>
                <form method="get" action="/admin/stats" class="row g-3 align-items-end">
                    <div class="col-auto">
                        <label class="form-label mb-0">开始日期</label>
                        <input type="date" name="start_date" class="form-control" value="<?= htmlspecialchars($startDate ?? '') ?>" style="width:160px;">
                    </div>
                    <div class="col-auto">
                        <label class="form-label mb-0">结束日期</label>
                        <input type="date" name="end_date" class="form-control" value="<?= htmlspecialchars($endDate ?? '') ?>" style="width:160px;">
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary">筛选</button>
                    </div>
                    <div class="col-auto">
                        <div class="btn-group" role="group">
                            <a href="/admin/stats?start_date=<?= date('Y-m-d') ?>&end_date=<?= date('Y-m-d') ?>" class="btn btn-outline-secondary btn-sm">今天</a>
                            <a href="/admin/stats?start_date=<?= date('Y-m-d', strtotime('-7 days')) ?>&end_date=<?= date('Y-m-d') ?>" class="btn btn-outline-secondary btn-sm">最近7天</a>
                            <a href="/admin/stats?start_date=<?= date('Y-m-d', strtotime('-30 days')) ?>&end_date=<?= date('Y-m-d') ?>" class="btn btn-outline-secondary btn-sm">最近30天</a>
                            <a href="/admin/stats?start_date=1970-01-01&end_date=2099-12-31" class="btn btn-outline-secondary btn-sm">全部</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="row g-4 mb-4">
    <div class="col-md-6">
        <div class="card border-0 shadow-sm">
            <div class="card-body">
                <h5 class="card-title mb-3">搜索引擎来源（首页/应用/资讯）</h5>
                <div class="row g-3">
                    <div class="col-6">
                        <div class="p-3 rounded bg-light text-center">
                            <div class="text-muted small">必应</div>
                            <h4 class="mb-0 text-primary"><?= number_format($bingCount ?? 0) ?></h4>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-3 rounded bg-light text-center">
                            <div class="text-muted small">谷歌</div>
                            <h4 class="mb-0 text-success"><?= number_format($googleCount ?? 0) ?></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card border-0 shadow-sm">
            <div class="card-body">
                <h5 class="card-title mb-3">设备分布</h5>
                <div class="row g-3">
                    <div class="col-4">
                        <div class="p-3 rounded bg-light text-center">
                            <div class="text-muted small">PC</div>
                            <h4 class="mb-0 text-info"><?= number_format($pcCount ?? 0) ?></h4>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="p-3 rounded bg-light text-center">
                            <div class="text-muted small">手机</div>
                            <h4 class="mb-0 text-warning"><?= number_format($mobileCount ?? 0) ?></h4>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="p-3 rounded bg-light text-center">
                            <div class="text-muted small">未知</div>
                            <h4 class="mb-0 text-secondary"><?= number_format($unknownCount ?? 0) ?></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row g-4">
    <div class="col-12">
        <div class="card border-0 shadow-sm">
            <div class="card-body">
                <h5 class="card-title mb-3">自有产品排行榜 TOP 50</h5>
                <div class="table-responsive" id="rankingTableWrap">
                    <table class="table table-hover align-middle mb-0" id="rankingTable">
                        <thead class="table-light">
                            <tr>
                                <th style="width:50px;">#</th>
                                <th>产品名称</th>
                                <th class="text-end sortable-col" data-field="total_views" style="cursor:pointer;user-select:none;white-space:nowrap;">
                                    总浏览量 <span class="sort-icon text-primary">↓</span>
                                </th>
                                <th class="text-end sortable-col" data-field="total_downloads" style="cursor:pointer;user-select:none;white-space:nowrap;">
                                    总下载点击 <span class="sort-icon text-muted">⇅</span>
                                </th>
                                <th class="text-end sortable-col" data-field="today_views" style="cursor:pointer;user-select:none;white-space:nowrap;">
                                    今日浏览 <span class="sort-icon text-muted">⇅</span>
                                </th>
                                <th class="text-end sortable-col" data-field="today_downloads" style="cursor:pointer;user-select:none;white-space:nowrap;">
                                    今日点击 <span class="sort-icon text-muted">⇅</span>
                                </th>
                                <th class="text-end sortable-col" data-field="conversion_rate" style="cursor:pointer;user-select:none;white-space:nowrap;">
                                    转化率 <span class="sort-icon text-muted">⇅</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="rankingTbody">
                            <?php if (!empty($ranking)): ?>
                                <?php foreach ($ranking as $i => $r): ?>
                                    <?php $rate = ($r['total_views'] > 0) ? round($r['total_downloads'] / $r['total_views'] * 100, 1) : 0; ?>
                                    <tr>
                                        <td><?= $i + 1 ?></td>
                                        <td><?= htmlspecialchars($r['product_name']) ?></td>
                                        <td class="text-end"><?= number_format($r['total_views']) ?></td>
                                        <td class="text-end"><?= number_format($r['total_downloads']) ?></td>
                                        <td class="text-end"><?= number_format($r['today_views']) ?></td>
                                        <td class="text-end"><?= number_format($r['today_downloads']) ?></td>
                                        <td class="text-end"><?= $rate ?>%</td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php else: ?>
                                <tr><td colspan="7" class="text-center text-muted py-4">暂无数据</td></tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
(function () {
    const startDate = '<?= addslashes($startDate ?? '') ?>';
    const endDate = '<?= addslashes($endDate ?? '') ?>';
    let currentField = 'total_views';
    let currentDir   = 'desc';

    const wrap    = document.getElementById('rankingTableWrap');
    const tbody   = document.getElementById('rankingTbody');
    const headers = document.querySelectorAll('#rankingTable th.sortable-col');

    function fmt(n) {
        return Number(n).toLocaleString('en-US');
    }

    function renderRows(data) {
        if (!data.length) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">暂无数据</td></tr>';
            return;
        }
        tbody.innerHTML = data.map((r, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${(r.product_name || '').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</td>
                <td class="text-end">${fmt(r.total_views)}</td>
                <td class="text-end">${fmt(r.total_downloads)}</td>
                <td class="text-end">${fmt(r.today_views)}</td>
                <td class="text-end">${fmt(r.today_downloads)}</td>
                <td class="text-end">${r.conversion_rate}%</td>
            </tr>`).join('');
    }

    function updateHeaderIcons() {
        headers.forEach(th => {
            const icon = th.querySelector('.sort-icon');
            if (th.dataset.field === currentField) {
                icon.textContent = currentDir === 'desc' ? '↓' : '↑';
                icon.className = 'sort-icon text-primary';
            } else {
                icon.textContent = '⇅';
                icon.className = 'sort-icon text-muted';
            }
        });
    }

    function loadRanking(field, dir) {
        currentField = field;
        currentDir   = dir;
        updateHeaderIcons();
        AdminUI.tableLoading(wrap, true);

        const params = new URLSearchParams({ order_by: field, direction: dir, start_date: startDate, end_date: endDate });
        fetch(`/admin/api/stats-ranking?${params}`)
            .then(r => r.json())
            .then(res => {
                AdminUI.tableLoading(wrap, false);
                if (res.success) renderRows(res.data);
            })
            .catch(() => AdminUI.tableLoading(wrap, false));
    }

    headers.forEach(th => {
        th.addEventListener('click', function () {
            const field = this.dataset.field;
            const dir = (field === currentField && currentDir === 'desc') ? 'asc' : 'desc';
            loadRanking(field, dir);
        });
    });
})();
</script>
