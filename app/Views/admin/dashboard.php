<div class="row g-4 mb-4">
    <div class="col-md-3">
        <div class="card border-0 shadow-sm">
            <div class="card-body text-center">
                <div class="text-muted mb-1" style="font-size:13px;">自有产品总浏览量</div>
                <h3 class="text-primary mb-0"><?= number_format($totalViews ?? 0) ?></h3>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card border-0 shadow-sm">
            <div class="card-body text-center">
                <div class="text-muted mb-1" style="font-size:13px;">自有产品总下载点击</div>
                <h3 class="text-success mb-0"><?= number_format($totalDownloads ?? 0) ?></h3>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card border-0 shadow-sm">
            <div class="card-body text-center">
                <div class="text-muted mb-1" style="font-size:13px;">今日浏览量</div>
                <h3 class="text-info mb-0"><?= number_format($todayViews ?? 0) ?></h3>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card border-0 shadow-sm">
            <div class="card-body text-center">
                <div class="text-muted mb-1" style="font-size:13px;">今日下载点击</div>
                <h3 class="text-warning mb-0"><?= number_format($todayDownloads ?? 0) ?></h3>
            </div>
        </div>
    </div>
</div>

<div class="row g-4 mb-4">
    <div class="col-12">
        <div class="card border-0 shadow-sm">
            <div class="card-body">
                <h5 class="card-title mb-3">最近 30 天趋势</h5>
                <canvas id="trendChart" height="80"></canvas>
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
                <td>${r.product_name.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</td>
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

        fetch(`/admin/api/dashboard-ranking?order_by=${field}&direction=${dir}`)
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

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script>
(function() {
    const raw = <?= $dailyTrend ?? '[]' ?>;
    const dateMap = {};
    raw.forEach(d => { dateMap[d.stat_date] = d; });

    const labels = [];
    const viewsData = [];
    const downloadsData = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        labels.push(key.slice(5));
        const entry = dateMap[key];
        viewsData.push(entry ? Number(entry.views) : 0);
        downloadsData.push(entry ? Number(entry.downloads) : 0);
    }

    new Chart(document.getElementById('trendChart'), {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: '浏览量',
                    data: viewsData,
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13,110,253,0.08)',
                    fill: true,
                    tension: 0.3,
                    pointRadius: 2,
                    pointHoverRadius: 5
                },
                {
                    label: '下载点击',
                    data: downloadsData,
                    borderColor: '#198754',
                    backgroundColor: 'rgba(25,135,84,0.08)',
                    fill: true,
                    tension: 0.3,
                    pointRadius: 2,
                    pointHoverRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { precision: 0 }
                }
            }
        }
    });
})();
</script>
