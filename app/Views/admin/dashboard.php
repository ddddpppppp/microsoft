<div class="row g-4">
    <div class="col-md-4">
        <div class="card">
            <div class="card-body text-center">
                <h3 class="text-primary"><?= $productCount ?? 0 ?></h3>
                <p class="text-muted mb-0">产品总数</p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card">
            <div class="card-body text-center">
                <h3 class="text-success"><?= $articleCount ?? 0 ?></h3>
                <p class="text-muted mb-0">资讯总数</p>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card">
            <div class="card-body text-center">
                <a href="/admin/products" class="btn btn-outline-primary">管理产品</a>
            </div>
        </div>
    </div>
</div>
