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
