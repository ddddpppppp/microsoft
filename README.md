# Microsoft Store 克隆项目

仿 [Microsoft Store](https://apps.microsoft.com/) 的全栈 Web 应用（浅色主题），前端使用 Lit + Shoelace + Vite，后端使用自研轻量 PHP 框架，数据存储于 MySQL。页面布局、配色、组件结构均对标官方网站。

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | [Lit](https://lit.dev/) Web Components |
| UI 组件库 | [Shoelace](https://shoelace.style/) |
| 构建工具 | [Vite](https://vitejs.dev/) |
| 后端框架 | 自研 PHP 微框架（Router / Controller / Model / View） |
| 数据库 | MySQL 5.7 |
| 数据采集 | Python（requests + pymysql） |
| 富文本编辑器 | TinyMCE（管理后台资讯编辑） |
| 运行环境 | phpStudy Pro（Apache / Nginx + PHP 7.3 + MySQL 5.7） |

---

## 功能列表

### 前台页面

- **首页** (`/`)：完整复刻 Microsoft Store 首页（浅色主题），包含 60/40 分栏 Hero 轮播图+侧边卡片、精选推荐（3 列）、热门游戏与新潮应用（并列双栏）、最畅销游戏（4 列网格）、生产力应用、创意应用、社交应用、Collections 等所有板块
- **应用页** (`/apps`)：Hero 轮播图、精选推荐、基于集合的应用分类展示（横向滚动 + 网格布局）
- **游戏页** (`/games`)：Hero 轮播图、精选推荐、基于集合的游戏分类展示
- **关于页** (`/about`)：匹配官方关于页布局（Hero 标语、分栏介绍、探索应用/游戏按钮、脚注）
- **产品详情页** (`/detail/{id}`)：产品图标、评分、描述、下载按钮等
- **ToDesk 专属页** (`/desk.html`)：直接跳转到 ToDesk 产品详情

### 后台管理

- **登录** (`/admin/login`)：用户名密码登录（默认：admin / admin123）
- **仪表盘** (`/admin`)：产品和资讯统计
- **产品管理** (`/admin/products`)：查看、搜索、编辑所有产品
- **产品编辑**：设置自定义标题、关键词、描述、下载链接，标记为自有产品
- **SEO 设置** (`/admin/settings`)：为首页、应用页、游戏页、关于页单独设置 title / keywords / description
- **资讯管理** (`/admin/articles`)：增删改查资讯内容，支持 TinyMCE 富文本编辑

### 数据采集

- 自动从 Microsoft Store 抓取 82 个产品数据（标题、评分、分类、价格等）
- 自动下载产品图标到本地
- 数据去重，支持重复运行

### 链接跳转逻辑

| 场景 | 行为 |
|------|------|
| 点击"自有产品" | 跳转到本站产品详情页 |
| 点击"非自有产品" | 跳转到 Microsoft Store 原始链接 |
| 点击首页图标（左上角） | 回到本站首页 |
| 点击"登录"按钮 | 跳转到 Microsoft 官网登录页 |
| 隐私政策、付款方式等 | 跳回 Microsoft 原始链接 |

---

## 项目结构

```
c:\www\microsoft\
├── frontend/                  # 前端源码（Vite + Lit + Shoelace）
│   ├── src/
│   │   ├── components/        # Web Components（10 个组件）
│   │   ├── pages/             # 页面组件（5 个页面）
│   │   └── app.js             # 路由 + 主入口
│   ├── package.json
│   └── vite.config.js
├── public/                    # 静态资源 + Vite 构建输出
│   ├── assets/images/         # 产品图标、Logo 等
│   └── dist/                  # Vite 编译后的 JS/CSS
├── app/                       # PHP 后端框架
│   ├── Core/                  # 框架核心（8 个类）
│   ├── Controllers/           # 控制器（3 个）
│   ├── Models/                # 数据模型（5 个）
│   └── Views/                 # 视图模板（含管理后台）
├── config/database.php        # 数据库配置
├── scripts/                   # 数据采集脚本（Python）
├── .htaccess                  # Apache URL 重写
├── index.php                  # PHP 入口文件
└── README.md
```

---

## 安装部署

### 前提条件

- phpStudy Pro（或其他包含 Apache/Nginx + PHP 7.3+ + MySQL 5.7+ 的环境）
- Node.js 16+（用于前端构建）
- Python 3.6+（用于数据采集脚本，需安装 pymysql 和 requests）

### 步骤

#### 1. 初始化数据库

```bash
mysql -u root -p < scripts/init_db.sql
```

默认创建 `ms_store` 数据库和所有表，并插入默认管理员账户（admin / admin123）。

#### 2. 配置数据库连接

编辑 `config/database.php`，修改数据库连接信息：

```php
return [
    'host' => '127.0.0.1',
    'port' => 3306,
    'dbname' => 'ms_store',
    'username' => 'root',
    'password' => 'root',
];
```

#### 3. 安装前端依赖并构建

```bash
cd frontend
npm install
npm run build
```

构建输出到 `public/dist/` 目录。

#### 4. 导入轮播图和推荐数据

```bash
php scripts/run_migration.php
```

或手动执行 `scripts/update_banners.sql`。

#### 5. 采集产品数据

```bash
pip install pymysql requests
python scripts/scrape_products.py
python scripts/scrape_images.py
```

#### 6. 配置 Web 服务器

**方式一：PHP 内置服务器（开发用）**

```bash
php -S 0.0.0.0:8080 -t c:\www\microsoft c:\www\microsoft\index.php
```

**方式二：phpStudy Pro**

在 phpStudy 中添加站点，根目录指向 `c:\www\microsoft`，确保开启 URL Rewrite（.htaccess 支持）。

**方式三：手动 Apache 配置**

在 Apache vhosts 目录下创建配置文件，DocumentRoot 指向项目根目录。

#### 7. 访问站点

- 前台：`http://localhost:8080/`
- 管理后台：`http://localhost:8080/admin`（admin / admin123）

---

## 管理后台使用说明

1. 访问 `/admin/login`，使用默认账号 `admin` / `admin123` 登录
2. **产品管理**：可搜索产品，点击"编辑"设置自定义标题、关键词、下载链接等
3. **标记自有产品**：勾选"标记为自有产品"后，用户点击该产品将跳转到本站详情页
4. **SEO 设置**：为每个页面独立设置 title、keywords、description
5. **资讯管理**：使用 TinyMCE 富文本编辑器创建和管理资讯内容

---

## 开发说明

### 前端开发模式

```bash
cd frontend
npm run dev
```

Vite 开发服务器启动后，API 请求会自动代理到 `http://localhost:80`。

### 前端组件一览

| 组件 | 说明 |
|------|------|
| `ms-header` | 顶部导航栏（Logo、导航链接、搜索框、登录按钮） |
| `ms-footer` | 底部页脚（四列布局，外部链接） |
| `ms-hero-carousel` | Hero 轮播图（60/40 分栏布局：左侧主轮播 + 右侧 2 张推广卡片，自动播放） |
| `ms-product-card` | 标准产品卡片（用于横向滚动列表） |
| `ms-product-hero` | 大号产品卡片（含描述，用于创意/社交类板块） |
| `ms-rating` | 星级评分组件 |
| `ms-collection-row` | 横向滚动产品列表 |
| `ms-collection-grid` | 网格产品列表（4 列） |
| `ms-collection-cards` | Collection 卡片列表 |
| `ms-featured-row` | 精选推荐横幅（3 列） |

### API 接口

| 接口 | 说明 |
|------|------|
| `GET /api/home` | 首页数据（轮播图、推荐、所有集合及产品） |
| `GET /api/apps` | 应用页数据 |
| `GET /api/games` | 游戏页数据 |
| `GET /api/about` | 关于页数据 |
| `GET /api/product/{id}` | 产品详情（支持 ms_id 或数据库 id） |
| `GET /api/search?q=xxx` | 搜索产品 |

---

## 许可声明

本项目仅用于学习和研究目的。Microsoft Store 的所有商标、Logo 和产品信息均归 Microsoft Corporation 所有。
