# Microsoft 站点（SEO 与缓存要点）

## 本地启动

必须使用路由脚本启动，否则 `/sitemap.xml`、`/robots.txt` 会被当成静态文件导致 404。

```bash
php -S 127.0.0.1:8080 index.php
```

## SEO 相关路由

- `GET /sitemap.xml`：动态生成站点地图（包含首页/应用/游戏/关于/资讯、产品详情、文章详情）
- `GET /robots.txt`：自动输出并声明 `Sitemap: <base_url>/sitemap.xml`

## 缓存说明

### 1) 页面 HTML 缓存

- 目录：`storage/html_cache/`
- 说明：详情页等页面会缓存渲染后的 HTML（包含 SEO 标签）

### 2) Sitemap 缓存

- 缓存策略：Redis 优先，文件兜底
- TTL：10 分钟
- 文件兜底路径：`storage/sitemap_cache.xml`
- 服务类：`app/Services/SitemapCache.php`

## 后台保存后的自动失效

以下操作会自动清理相关页面缓存与 sitemap 缓存：

- 产品保存：`/admin/product/save`
- 产品手动清缓存：`/admin/product/clear-cache/{id}`
- SEO 设置保存：`/admin/settings/save`
- 文章保存：`/admin/article/save`
- 文章删除：`/admin/article/delete/{id}`

### 产品媒体 SEO（后台编辑页）

- 支持上传产品 `Logo`（保存到 `public/assets/uploads/products/{id}/`）
- 支持上传产品截图并编辑每张截图描述（`alt`）
- Logo 描述与截图描述会写入 `products.screenshots`（兼容旧格式），并用于详情页渲染与 SEO 隐藏内容
- 通过 `/admin/product/save` 保存后会自动清理该产品详情 HTML 缓存与 sitemap 缓存
