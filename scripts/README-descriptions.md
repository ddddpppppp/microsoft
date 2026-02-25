# 产品描述爬取与入库

宽卡（創意應用程式、幻化成真）右侧会显示产品描述；若库里没有描述，可爬取微软商店页面后写入数据库。

## 1. 列出缺描述的产品（hero_cards 区块）

- **API**（需先启动 PHP 服务）：`GET /api/products-missing-description`  
  返回 JSON 数组：`[{ "id", "title", "original_url", "ms_id" }, ...]`

- **命令行**（需本机有 PHP）：  
  `php scripts/list_products_missing_description.php`  
  输出到 stdout，可重定向到文件：  
  `php scripts/list_products_missing_description.php > list.json`

## 2. 爬取描述

- **Node 爬虫**（从 API 取列表，再逐个请求 original_url，从 HTML 里取 `og:description` 或 `name="description"`）：  
  先启动站点（例如 `php -S localhost:8080 -t public`），然后：
  ```bash
  set BASE_URL=http://localhost:8080
  node scripts/crawl_descriptions.js
  ```
  或使用已有列表文件：  
  `node scripts/crawl_descriptions.js list.json`  
  会生成 `scripts/descriptions.json`，内容形如：`[{ "id": 1, "description": "..." }, ...]`

- **用 MCP 爬**：调用 `GET /api/products-missing-description` 拿到列表后，对每条 `original_url` 用 MCP 拉取页面，从 HTML 中解析 `meta[property="og:description"]` 或 `meta[name="description"]`，得到描述后调用 `POST /api/product/{id}/description`，body：`{"description": "..."}`，即可直接入库。

## 3. 入库

- **批量更新**（需 PHP）：  
  `php scripts/update_descriptions.php scripts/descriptions.json`  
  会按 JSON 中的 `id` 更新 `products.description`。

- **单条更新**：  
  `POST /api/product/{id}/description`，body：`{"description": "..."}`。

## 说明

- 仅当产品在 **section_type = hero_cards** 的 collection 中、且 **description 为空**、**original_url 非空** 时，才会出现在「缺描述」列表中。
- 微软商店页面若为前端渲染，Node 爬虫拿到的 HTML 里可能没有描述，此时用浏览器/MCP 打开真实页面再解析更可靠。
