-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2026-02-28 09:05:33
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `ms_store`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password_hash`, `created_at`) VALUES
(1, 'admin', '$2b$12$up4D2cktyzeYSWtfeaGOvuBBJbjerG9jcuZ3PCYIuOJUwDotlFvtq', '2026-02-24 18:05:43');

-- --------------------------------------------------------

--
-- 表的结构 `ai_generate_article_tasks`
--

CREATE TABLE `ai_generate_article_tasks` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL DEFAULT '',
  `ai_provider` enum('deepseek','gemini','openai') DEFAULT 'deepseek',
  `prompt` text,
  `category` varchar(200) DEFAULT '',
  `auto_publish` tinyint(1) DEFAULT '0',
  `schedule_type` enum('once','interval','daily') DEFAULT 'once',
  `interval_days` int(11) DEFAULT '1',
  `daily_time` varchar(10) DEFAULT '09:00',
  `last_run_at` timestamp NULL DEFAULT NULL,
  `next_run_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `total_generated` int(11) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `ai_generate_review_tasks`
--

CREATE TABLE `ai_generate_review_tasks` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT '',
  `product_id` int(11) NOT NULL,
  `ai_provider` varchar(50) DEFAULT 'deepseek',
  `prompt` text,
  `num_reviews` int(11) DEFAULT '3',
  `auto_publish` tinyint(4) DEFAULT '0',
  `schedule_type` enum('once','interval','daily') DEFAULT 'once',
  `interval_days` int(11) DEFAULT '1',
  `daily_time` varchar(10) DEFAULT '09:00',
  `is_active` tinyint(4) DEFAULT '1',
  `last_run_at` datetime DEFAULT NULL,
  `next_run_at` datetime DEFAULT NULL,
  `total_generated` int(11) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `content` longtext,
  `cover_image` varchar(500) DEFAULT '',
  `summary` varchar(1000) DEFAULT '',
  `category` varchar(100) DEFAULT '',
  `is_recommended` tinyint(1) DEFAULT '0',
  `views` int(11) DEFAULT '0',
  `author` varchar(100) DEFAULT '',
  `keywords` varchar(500) DEFAULT '',
  `meta_description` varchar(500) DEFAULT '',
  `slug` varchar(200) NOT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `articles`
--

INSERT INTO `articles` (`id`, `title`, `content`, `cover_image`, `summary`, `category`, `is_recommended`, `views`, `author`, `keywords`, `meta_description`, `slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Windows 11 最新功能更新指南', '<h2>Windows 11 2025年春季更新</h2><p>微软在2025年春季推出了多项重要更新，包括全新的文件管理器、改进的任务栏以及更强大的安全功能。本文将为您详细介绍这些新功能以及如何充分利用它们。</p><h3>全新文件管理器</h3><p>新版文件管理器带来了标签页功能，让您可以在一个窗口中打开多个文件夹，大大提升了工作效率。同时，文件管理器的搜索功能也得到了显著改善，搜索速度更快，结果更精准。</p><h3>改进的任务栏</h3><p>任务栏现在支持更多自定义选项，您可以根据自己的使用习惯调整图标位置和大小。此外，任务栏的快捷操作也更加便捷。</p><h3>安全功能增强</h3><p>Windows 11 的安全功能得到了全面升级，包括更强的恶意软件防护、改进的防火墙设置以及全新的隐私控制面板。</p>', 'https://picsum.photos/seed/win11/800/400', 'Windows 11 2025年春季重要更新指南，涵盖文件管理器、任务栏和安全功能等多项改进', '使用教程', 1, 163, '技术编辑部', 'Windows 11,更新,教程,新功能', 'Windows 11 最新功能更新详细指南', 'windows-11-spring-update-guide', 'published', '2026-02-25 07:13:47', '2026-02-27 05:12:45'),
(2, 'Microsoft Store 应用推荐：提升工作效率的10款必备工具', '<h2>提升效率的必备工具</h2><p>在 Microsoft Store 中，有许多优秀的应用程序可以帮助您提升工作效率。以下是我们精心挑选的10款必备工具。</p><h3>1. Microsoft To Do</h3><p>简洁高效的任务管理工具，支持跨设备同步。</p><h3>2. OneNote</h3><p>功能强大的笔记应用，支持手写、录音等多种输入方式。</p><h3>3. Files App</h3><p>现代化的文件管理器替代品，支持标签页和双面板布局。</p><h3>4. PowerToys</h3><p>微软官方的生产力工具集，包含多种实用小工具。</p><h3>5. Windows Terminal</h3><p>现代化的终端应用，支持多标签和自定义主题。</p>', 'https://picsum.photos/seed/apps10/800/400', 'Microsoft Store 中10款提升工作效率的必备应用推荐，包含任务管理、笔记、文件管理等工具', '应用推荐', 1, 234, '应用达人', 'Microsoft Store,应用推荐,效率工具', 'Microsoft Store 应用推荐', 'top-10-productivity-apps', 'published', '2026-02-25 07:13:47', '2026-02-25 07:13:47'),
(3, '新手指南：如何在 Microsoft Store 下载和安装应用', '<h2>Microsoft Store 新手入门</h2><p>Microsoft Store 是 Windows 系统内置的应用商店，提供各种应用程序、游戏和娱乐内容。本文将帮助新手用户快速上手。</p><h3>打开 Microsoft Store</h3><p>在任务栏中找到 Microsoft Store 图标，点击即可打开。如果找不到，可以在开始菜单中搜索。</p><h3>搜索和浏览应用</h3><p>使用顶部的搜索栏可以快速找到想要的应用。您也可以浏览分类来发现新应用。</p><h3>安装应用</h3><p>找到想要的应用后，点击获取或安装按钮即可。部分应用可能需要购买。</p>', 'https://picsum.photos/seed/guide1/800/400', '面向新手用户的 Microsoft Store 使用指南，教您如何搜索、下载和安装应用', '新手指南', 1, 89, '技术编辑部', '新手指南,Microsoft Store,下载,安装', 'Microsoft Store 新手使用指南', 'beginner-guide-download-apps', 'published', '2026-02-25 07:13:47', '2026-02-25 07:13:47'),
(4, 'Xbox Game Pass 最新游戏推荐', '<h2>本月 Game Pass 新增游戏</h2><p>Xbox Game Pass 本月又迎来了一批精彩游戏，让我们一起来看看有哪些值得体验的新作品。</p><h3>游戏一：星空探索</h3><p>一款壮丽的太空探索RPG游戏，拥有广阔的宇宙世界。</p><h3>游戏二：极限竞速</h3><p>刺激的赛车游戏，支持多人在线对战。</p>', 'https://picsum.photos/seed/xbox1/800/400', 'Xbox Game Pass 本月新增游戏推荐，精彩游戏不容错过', '游戏资讯', 0, 312, '游戏编辑', 'Xbox,Game Pass,游戏推荐', 'Xbox Game Pass 最新游戏推荐', 'xbox-game-pass-monthly-picks', 'published', '2026-02-25 07:13:47', '2026-02-25 07:13:47'),
(5, 'Microsoft 365 使用技巧分享', '<h2>高效使用 Microsoft 365</h2><p>Microsoft 365 是目前最强大的办公套件之一。本文将分享一些实用技巧。</p><h3>Word 高级排版</h3><p>使用样式和模板可以大幅提升文档排版效率。</p><h3>Excel 数据分析</h3><p>透视表和高级筛选是数据分析的利器。</p><h3>PowerPoint 演示设计</h3><p>善用设计理念功能，让您的演示文稿更加专业。</p>', 'https://picsum.photos/seed/m365/800/400', 'Microsoft 365 实用使用技巧，提升您的办公效率', '使用教程', 1, 178, '办公达人', 'Microsoft 365,Office,使用技巧', 'Microsoft 365 使用技巧分享', 'microsoft-365-tips', 'published', '2026-02-25 07:13:47', '2026-02-25 07:13:47'),
(6, 'Windows 安全防护最佳实践', '<h2>保护您的 Windows 设备安全</h2><p>网络安全越来越重要，以下是一些保护 Windows 设备安全的最佳实践。</p><h3>开启 Windows Defender</h3><p>确保 Windows Defender 始终保持开启状态。</p><h3>定期更新系统</h3><p>及时安装安全更新是防止漏洞利用的关键。</p>', 'https://picsum.photos/seed/security/800/400', 'Windows 安全防护最佳实践指南', '使用教程', 0, 67, '安全专家', 'Windows安全,防护,最佳实践', 'Windows 安全防护指南', 'windows-security-best-practices', 'published', '2026-02-25 07:13:47', '2026-02-25 07:13:47');

-- --------------------------------------------------------

--
-- 表的结构 `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL DEFAULT '',
  `subtitle` varchar(500) DEFAULT '',
  `image_url` varchar(1000) DEFAULT '',
  `local_image` varchar(500) DEFAULT '',
  `link_url` varchar(1000) DEFAULT '',
  `button_text` varchar(100) DEFAULT '',
  `badge_text` varchar(100) DEFAULT '',
  `display_order` int(11) DEFAULT '0',
  `type` enum('hero','featured') DEFAULT 'hero',
  `page` enum('home','apps','games') DEFAULT 'home',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `banners`
--

INSERT INTO `banners` (`id`, `title`, `subtitle`, `image_url`, `local_image`, `link_url`, `button_text`, `badge_text`, `display_order`, `type`, `page`, `created_at`) VALUES
(9, 'Microsoft 365', '管理每日工作的應用程式', '', '/assets/images/banners/hero_microsoft365.jpg', '#', '▶ 获取', '', 1, 'hero', 'home', '2026-02-24 19:08:08'),
(10, '加入 Game Pass', '新作上市當天即可暢玩', '', '/assets/images/banners/hero_gamepass.jpg', '#', '获取', '', 2, 'hero', 'home', '2026-02-24 19:08:08'),
(11, 'High On Life 2', 'Available with Game Pass Ultimate', '', '/assets/images/banners/hero_highonlife2.jpg', '#', '获取', 'Game Pass Premium • Ultimate • PC', 3, 'hero', 'home', '2026-02-24 19:08:08'),
(12, '最佳娛樂 App', '发现最受欢迎的应用和游戏', '', '/assets/images/banners/hero_entertainment.jpg', '#', '全部显示', '', 4, 'hero', 'home', '2026-02-24 19:08:08'),
(13, 'Raycast', '您通往一切的捷徑', '', '/assets/images/banners/hero_raycast.jpg', '#', '获取', '免费', 5, 'hero', 'home', '2026-02-24 19:08:08'),
(17, '最佳娛樂 App', '隨時隨地與您的電影、電視和音樂在一起', '', '/assets/images/banners/hero_entertainment.jpg', '#', '全部显示', '', 1, 'hero', 'apps', '2026-02-24 19:08:08'),
(19, 'Raycast', '您通往一切的捷徑', '', '/assets/images/banners/hero_raycast.jpg', '#', '获取', '', 3, 'hero', 'apps', '2026-02-24 19:08:08'),
(21, '創意應用程式', '尋找可激發靈感的應用程式', '', '/assets/images/banners/collection_creative.jpg', '#', '全部显示', '', 5, 'hero', 'apps', '2026-02-24 19:08:08'),
(25, 'Overwatch® 2', '立即透過 Xbox Game Pass 購買或玩遊戲', '', '/assets/images/banners/side_overwatch.jpg', '#', '获取', 'Game Pass', 1, 'hero', 'games', '2026-02-24 19:08:08'),
(26, '加入 Game Pass', '新作上市當天即可暢玩', '', '/assets/images/banners/hero_gamepass.jpg', '#', '获取', '', 2, 'hero', 'games', '2026-02-24 19:08:08'),
(27, 'High On Life 2', 'Available with Game Pass Ultimate', '', '/assets/images/banners/hero_highonlife2.jpg', '#', '获取', 'Game Pass Ultimate • PC', 3, 'hero', 'games', '2026-02-24 19:08:08'),
(28, 'Romeo is a Dead Man', '立即透過 Xbox Game Pass 購買或玩遊戲', '', '/assets/images/banners/hero_deadman.jpg', '#', '获取', '', 4, 'hero', 'games', '2026-02-24 19:08:08'),
(38, 'The new Overwatch is here', '立即透過 Xbox Game Pass 購買或玩遊戲', '', '/assets/images/banners/home_overwatch.jpg', '#', '', 'Game Pass', 1, 'featured', 'home', '2026-02-26 11:17:20'),
(39, '社交網路應用程式', '聯繫和學習', '', '/assets/images/banners/side_social.jpg', '/apps', '', '', 2, 'featured', 'home', '2026-02-26 11:17:20'),
(40, 'CyberSafe: Bad Connection?', 'MINECRAFT EDUCATION', '', '/assets/images/banners/side_cybersafe.jpg', '#', '', '', 3, 'featured', 'home', '2026-02-26 11:17:20'),
(41, 'Microsoft 365', '提升生產力的最佳選擇', '', '/assets/images/banners/apps_m365.jpg', '#', '', '', 1, 'featured', 'apps', '2026-02-26 11:17:20'),
(42, 'Drawboard PDF', '專業PDF標註工具', '', '/assets/images/banners/apps_drawboard.jpg', '#', '', '', 2, 'featured', 'apps', '2026-02-26 11:17:20'),
(43, '社交網路應用程式', '聯繫和學習', '', '/assets/images/banners/collection_social_apps.jpg', '/apps', '', '', 3, 'featured', 'apps', '2026-02-26 11:17:20'),
(44, 'CyberSafe: Bad Connection?', '探索網路安全的冒險遊戲', '', '/assets/images/banners/games_cybersafe.jpg', '#', '', '', 1, 'featured', 'games', '2026-02-26 11:17:20'),
(45, 'Join Game Pass', '暢玩數百款高品質遊戲', '', '/assets/images/banners/games_gamepass.jpg', 'https://www.xbox.com/xbox-game-pass', '', 'Game Pass', 2, 'featured', 'games', '2026-02-26 11:17:20'),
(46, 'Romeo is a Dead Man', '立即透過 Xbox Game Pass 購買或玩遊戲', '', '/assets/images/banners/hero_deadman.jpg', '#', '', 'Game Pass', 3, 'featured', 'games', '2026-02-26 11:17:20');

-- --------------------------------------------------------

--
-- 表的结构 `collections`
--

CREATE TABLE `collections` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `type` enum('computed','curated') DEFAULT 'computed',
  `section_type` enum('horizontal_scroll','grid','hero_cards','collection_cards','featured') DEFAULT 'horizontal_scroll',
  `display_order` int(11) DEFAULT '0',
  `view_all_url` varchar(1000) DEFAULT '',
  `page` enum('home','apps','games') DEFAULT 'home',
  `hero_image` varchar(500) DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `collections`
--

INSERT INTO `collections` (`id`, `name`, `slug`, `type`, `section_type`, `display_order`, `view_all_url`, `page`, `hero_image`, `created_at`) VALUES
(1, '热门游戏', 'top-trending-games', 'computed', 'horizontal_scroll', 1, '', 'home', '', '2026-02-24 18:06:49'),
(2, '新潮应用', 'top-trending-apps', 'computed', 'horizontal_scroll', 2, '', 'home', '', '2026-02-24 18:06:49'),
(3, '最畅销的游戏', 'top-grossing-games', 'computed', 'grid', 3, '', 'home', '', '2026-02-24 18:06:49'),
(4, '生產力應用程式', 'productivity-apps', 'computed', 'grid', 4, '', 'home', '', '2026-02-24 18:06:49'),
(5, '全新值得注目的電腦遊戲', 'new-notable-pc-games', 'computed', 'grid', 5, '', 'home', '', '2026-02-24 18:06:49'),
(6, '創意應用程式', 'creative-apps', 'curated', 'hero_cards', 6, '', 'home', '', '2026-02-24 18:06:49'),
(7, '開發孩子智力 App', 'apps-for-young-minds', 'curated', 'grid', 7, '', 'home', '', '2026-02-24 18:06:49'),
(8, '幻化成真，變電影魔術', 'make-movie-magic', 'curated', 'hero_cards', 8, '', 'home', '', '2026-02-24 18:06:49'),
(9, '社交網路應用程式', 'social-networking-apps', 'curated', 'hero_cards', 9, '', 'home', '', '2026-02-24 18:06:49'),
(10, 'Collections', 'collections', 'curated', 'collection_cards', 10, '', 'home', '', '2026-02-24 18:06:49'),
(11, 'Xbox Play Anywhere', 'xbox-play-anywhere', 'curated', 'collection_cards', 12, '', 'home', '/assets/images/banners/collection_xbox_play_anywhere.jpg', '2026-02-24 18:06:49'),
(12, 'Windows 佈景主題', 'windows-themes', 'curated', 'collection_cards', 13, '', 'home', '/assets/images/banners/collection_windows_themes.jpg', '2026-02-24 18:06:49'),
(13, '賽車遊戲', 'racing-games', 'curated', 'collection_cards', 14, '', 'home', '/assets/images/banners/collection_racing.jpg', '2026-02-24 18:06:49'),
(14, '創意應用程式', 'creative-apps-collection', 'curated', 'collection_cards', 15, '', 'home', '/assets/images/banners/collection_creative.jpg', '2026-02-24 18:06:49'),
(15, '小朋友專屬遊戲', 'kids-games', 'curated', 'collection_cards', 16, '', 'home', '/assets/images/banners/collection_kids_games.jpg', '2026-02-24 18:06:49'),
(16, '社交網路應用程式', 'social-networking-collection', 'curated', 'collection_cards', 17, '', 'home', '/assets/images/banners/collection_social_apps.jpg', '2026-02-24 18:06:49'),
(17, '精選免費遊戲', 'free-games', 'curated', 'collection_cards', 18, '', 'home', '/assets/images/banners/collection_free_games.jpg', '2026-02-24 18:06:49'),
(18, '最佳娛樂 App', 'best-entertainment-apps', 'curated', 'collection_cards', 19, '', 'home', '/assets/images/banners/collection_entertainment.jpg', '2026-02-24 18:06:49'),
(19, 'Find your next widget', 'widgets', 'curated', 'collection_cards', 20, '', 'home', '/assets/images/banners/collection_widgets.jpg', '2026-02-24 18:06:49'),
(20, '現在開始', 'get-started', 'curated', 'collection_cards', 21, '', 'home', '/assets/images/banners/collection_get_started.jpg', '2026-02-24 18:06:49'),
(21, '生產力應用程式', 'productivity-apps-collection', 'curated', 'collection_cards', 22, '', 'home', '/assets/images/banners/collection_productivity.jpg', '2026-02-24 18:06:49'),
(22, '個人化應用程式', 'personalization-apps', 'curated', 'collection_cards', 23, '', 'home', '/assets/images/banners/collection_personalization.jpg', '2026-02-24 18:06:49');

-- --------------------------------------------------------

--
-- 表的结构 `collection_products`
--

CREATE TABLE `collection_products` (
  `id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `display_order` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `collection_products`
--

INSERT INTO `collection_products` (`id`, `collection_id`, `product_id`, `display_order`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 2),
(3, 1, 3, 3),
(4, 1, 4, 4),
(5, 1, 5, 5),
(6, 1, 6, 6),
(7, 2, 7, 1),
(8, 2, 8, 2),
(9, 2, 9, 3),
(10, 2, 10, 4),
(11, 2, 11, 5),
(12, 2, 12, 6),
(13, 3, 13, 1),
(14, 3, 2, 2),
(15, 3, 14, 3),
(16, 3, 15, 4),
(17, 3, 1, 5),
(18, 3, 16, 6),
(19, 3, 17, 7),
(20, 3, 5, 8),
(21, 3, 18, 9),
(22, 3, 19, 10),
(23, 3, 20, 11),
(24, 3, 21, 12),
(25, 4, 22, 1),
(26, 4, 23, 2),
(27, 4, 24, 3),
(28, 4, 25, 4),
(29, 4, 26, 5),
(30, 4, 27, 6),
(31, 4, 28, 7),
(32, 4, 29, 8),
(33, 4, 30, 9),
(34, 4, 31, 10),
(35, 4, 32, 11),
(36, 4, 33, 12),
(37, 5, 34, 1),
(38, 5, 35, 2),
(39, 5, 36, 3),
(40, 5, 37, 4),
(41, 5, 38, 5),
(42, 5, 39, 6),
(43, 5, 40, 7),
(44, 5, 41, 8),
(45, 5, 42, 9),
(46, 5, 43, 10),
(47, 5, 44, 11),
(48, 5, 45, 12),
(49, 6, 46, 1),
(50, 6, 47, 2),
(51, 6, 48, 3),
(52, 6, 49, 4),
(53, 6, 50, 5),
(54, 6, 51, 6),
(55, 6, 29, 7),
(56, 6, 52, 8),
(57, 6, 53, 9),
(58, 6, 54, 10),
(59, 7, 55, 1),
(60, 7, 56, 2),
(61, 7, 57, 3),
(62, 7, 50, 4),
(63, 7, 58, 5),
(64, 7, 59, 6),
(65, 7, 60, 7),
(66, 7, 61, 8),
(67, 7, 62, 9),
(68, 8, 63, 1),
(69, 8, 64, 2),
(70, 8, 65, 3),
(71, 8, 66, 4),
(72, 8, 51, 5),
(73, 8, 67, 6),
(74, 8, 68, 7),
(75, 8, 69, 8),
(76, 8, 70, 9),
(77, 8, 71, 10),
(78, 8, 72, 11),
(79, 8, 73, 12),
(80, 9, 74, 1),
(81, 9, 75, 2),
(82, 9, 76, 3),
(83, 9, 77, 4),
(84, 9, 78, 5),
(85, 9, 79, 6),
(86, 9, 80, 7),
(87, 9, 7, 8),
(88, 9, 81, 9),
(89, 9, 11, 10),
(90, 9, 82, 11),
(91, 9, 8, 12);

-- --------------------------------------------------------

--
-- 表的结构 `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `ms_id` varchar(50) NOT NULL DEFAULT '',
  `title` varchar(500) NOT NULL DEFAULT '',
  `description` text,
  `icon_url` varchar(1000) DEFAULT '',
  `local_icon` varchar(500) DEFAULT '',
  `rating` decimal(2,1) DEFAULT '0.0',
  `rating_count` int(11) DEFAULT '0',
  `category` varchar(200) DEFAULT '',
  `price` varchar(100) DEFAULT '',
  `price_type` enum('free','paid','discount') DEFAULT 'free',
  `original_price` varchar(100) DEFAULT '',
  `discount_percent` varchar(20) DEFAULT '',
  `original_url` varchar(1000) DEFAULT '',
  `custom_url` varchar(1000) DEFAULT '',
  `custom_title` varchar(500) DEFAULT '',
  `custom_keywords` varchar(1000) DEFAULT '',
  `custom_description` text,
  `custom_download_url` varchar(1000) DEFAULT '',
  `is_own_product` tinyint(1) DEFAULT '0',
  `product_type` enum('app','game') DEFAULT 'app',
  `has_gamepass` tinyint(1) DEFAULT '0',
  `developer` varchar(200) DEFAULT '',
  `screenshots` text,
  `whats_new` text,
  `release_date` varchar(50) DEFAULT '',
  `last_update` varchar(50) DEFAULT '',
  `app_size` varchar(50) DEFAULT '',
  `system_requirements` text,
  `age_rating` varchar(100) DEFAULT '',
  `age_rating_icon` varchar(500) DEFAULT '',
  `supported_languages` text,
  `publisher_website` varchar(500) DEFAULT '',
  `publisher_support` varchar(500) DEFAULT '',
  `privacy_policy_url` varchar(500) DEFAULT '',
  `social_card_image` varchar(500) DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `products`
--

INSERT INTO `products` (`id`, `ms_id`, `title`, `description`, `icon_url`, `local_icon`, `rating`, `rating_count`, `category`, `price`, `price_type`, `original_price`, `discount_percent`, `original_url`, `custom_url`, `custom_title`, `custom_keywords`, `custom_description`, `custom_download_url`, `is_own_product`, `product_type`, `has_gamepass`, `developer`, `screenshots`, `whats_new`, `release_date`, `last_update`, `app_size`, `system_requirements`, `age_rating`, `age_rating_icon`, `supported_languages`, `publisher_website`, `publisher_support`, `privacy_policy_url`, `social_card_image`, `created_at`, `updated_at`) VALUES
(1, '9pmf91n3lz3m', 'Roblox', NULL, 'https://store-images.s-microsoft.com/image/apps.64577.14294982842551334.b7187202-d3a5-4d28-b184-10f299fc8103.3af950d5-3c87-4695-9948-a0b320062045', '/assets/images/products/9pmf91n3lz3m.png', '4.0', 0, '动作与冒险', '', 'free', '', '', 'https://apps.microsoft.com/detail/9pmf91n3lz3m?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, 'Roblox Corporation', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(2, '9nxp44l49shj', 'Minecraft: Java & Bedrock Edition for PC', NULL, '', '/assets/images/products/9pgt1kwkw0p4.png', '4.5', 0, '动作与冒险', 'HK$209.00', 'paid', '', '', 'https://apps.microsoft.com/detail/9nxp44l49shj?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 1, 'Mojang Studios / Xbox Game Studios', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-27 06:48:23'),
(3, '9pgw18npbzv5', 'Minecraft Launcher', NULL, 'https://store-images.s-microsoft.com/image/apps.43152.14247769038588514.3ce72ba0-ff44-4b91-b1ca-eef499b58987.a75b6a42-9c31-452f-b8ec-e955d3ab3d00?q=90&w=480&h=270', '/assets/images/products/9pgw18npbzv5.png', '3.8', 0, '动作与冒险', '', 'free', '', '', 'https://apps.microsoft.com/detail/9pgw18npbzv5?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, 'Xbox Game Studios', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-27 07:56:30'),
(4, '9nk9k07fdpjv', 'World of Warships', NULL, '', '/assets/images/products/9p5m2fsm9z18.png', '4.3', 0, '多人在线对战', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nk9k07fdpjv?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, 'Wargaming Group Limited', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-27 06:48:23'),
(5, '9nzqpt0mwtd0', '狂野飙车：竞速传奇', NULL, '', '/assets/images/products/9nq46fwmr5mv.png', '4.4', 0, '赛车与飞行', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nzqpt0mwtd0?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 1, 'Gameloft', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-27 06:48:23'),
(6, '9nnfg8bqrcxl', '使命召唤：战争地带', NULL, '', '/assets/images/products/9nk1zhsmv32c.png', '2.4', 0, '射击', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nnfg8bqrcxl?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, 'Activision', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-27 06:48:23'),
(7, '9nksqgp7f2nh', 'WhatsApp', NULL, 'https://store-images.s-microsoft.com/image/apps.8453.13655054093851568.4a371b72-2ce8-4bdb-9d83-be49894d3fa0.7f3687b9-847d-4f86-bb5c-c73259e2b38e', '/assets/images/products/9nksqgp7f2nh.png', '4.2', 0, '社交', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nksqgp7f2nh?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'WhatsApp Inc.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', 'https://store-images.s-microsoft.com/image/apps.34267.13655054093851568.8c441c31-1039-4c48-a9c3-6736d0e41810.4bdd95d5-2b09-447b-9ca9-f6d9524c4274', '2026-02-24 18:05:54', '2026-02-25 06:47:20'),
(8, 'xpfckbrnfzq62g', '微信', NULL, 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxl33gjvYDEfZR.qiz4WDwgYHYK0p6FXwsoxKR8BMbqSQ9y_bplPOOf672rNDEFz7UU4p64p6eaAPBkrAfxFVAsM-&format=source', '/assets/images/products/xpfckbrnfzq62g.png', '3.0', 0, '社交', '', 'free', '', '', 'https://apps.microsoft.com/detail/xpfckbrnfzq62g?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Tencent', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxl33gjvYDEfZR.qiz4WDwgY04FYRRjNAKxHuOHV267C0yOXAwPn_PhsY1rMt_UgiNmlHS3McN_ZzDqsnJekaPZY-&format=source', '2026-02-24 18:05:54', '2026-02-25 06:50:12'),
(9, '9nztwsqntd0s', 'Telegram Desktop', 'Pure instant messaging — simple, fast, secure, and synced across all your devices. One of the world\'s top 10 most downloaded apps with over 500 million active users.\r\n\r\nFAST: Telegram is the fastest messaging app on the market, connecting people via a unique, distributed network of data centers around the globe.\r\n\r\nSYNCED: You can access your messages from all your phones, tablets and computers at once. Telegram apps are standalone, so you don’t need to keep your phone connected. Start typing on one device and finish the message from another. Never lose your data again.\r\n\r\nUNLIMITED: You can send media and files, without any limits on their type and size. Your entire chat history will require no disk space on your device, and will be securely stored in the Telegram cloud for as long as you need it. \r\n\r\nSECURE: We made it our mission to provide the best security combined with ease of use. Everything on Telegram, including chats, groups, media, etc. is encrypted using a combination of 256-bit symmetric AES encryption, 2048-bit RSA encryption, and Diffie–Hellman secure key exchange. \r\n\r\n100% FREE & OPEN: Telegram has a fully documented and free API for developers, open source apps and verifiable builds to prove the app you download is built from the exact same source code that is published. \r\n\r\nPOWERFUL: You can create group chats with up to 200,000 members, share large videos, documents of any type (.DOCX, .MP3, .ZIP, etc.) up to 2 GB each, and even set up bots for specific tasks. Telegram is the perfect tool for hosting online communities and coordinating teamwork.\r\n\r\nRELIABLE: Built to deliver your messages using as little data as possible, Telegram is the most reliable messaging system ever made. It works even on the weakest mobile connections. \r\n\r\nFUN: Telegram has powerful photo and video editing tools, animated stickers and emoji, fully customizable themes to change the appearance of your app, and an open sticker/GIF platform to cater to all your expressive needs.\r\n\r\nSIMPLE: While providing an unprecedented array of features, we take great care to keep the interface clean. Telegram is so simple you already know how to use it.\r\n\r\nPRIVATE: We take your privacy seriously and will never give any third parties access to your data. You can delete any message you ever sent or received for both sides, at any time and without a trace. Telegram will never use your data to show you ads.\r\n\r\nWe keep expanding the boundaries of what you can do with a messaging app. Don’t wait years for older messengers to catch up with Telegram — join the revolution today.', 'https://store-images.s-microsoft.com/image/apps.56826.14473651905739879.3157c247-dc1f-4da5-b66c-7dec670da6d6.5a91faea-181d-424e-ab8a-8804e7ac0edc', '/assets/images/products/9nztwsqntd0s.png', '4.7', 0, '社交', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nztwsqntd0s?hl=zh-CN&gl=HK', '/telegram', '', '', '', '', 1, 'app', 0, 'Telegram FZ-LLC', '[\"https://store-images.s-microsoft.com/image/apps.33483.14473651905739879.0d338cc7-f1a6-40bb-91b1-a6bb28efeef5.bd98ea42-99b8-4578-8575-98dda78c495f\", \"https://store-images.s-microsoft.com/image/apps.53596.14473651905739879.9b0045ff-ef6a-4d7b-8e67-e26e80c50cb1.5c9d2129-2287-495b-8940-70a7d59d218d\", \"https://store-images.s-microsoft.com/image/apps.43188.14473651905739879.4acc4a37-25d0-47ab-a0d1-502b3fb5ccbe.573e33c0-de37-4414-8b75-a34d3573ed60\", \"https://store-images.s-microsoft.com/image/apps.60082.14473651905739879.bfe5696c-3029-4573-b99c-50754db335e8.cfbf1d62-8493-484b-b889-6fc0a386078b\"]', NULL, '', '', '', NULL, '18+', 'https://store-images.s-microsoft.com/image/global.39347.image.1ab912d3-d93c-4b3a-9b9f-511c8b8fef73.318bd350-ab48-4aae-aa58-cd0e8cb1559c', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-27 03:06:51'),
(10, '9wzdncrfj3tj', 'Netflix', NULL, 'https://store-images.s-microsoft.com/image/apps.56161.9007199266246365.1d5a6a53-3c49-4f80-95d7-78d76b0e05d0.a3e87fea-e03e-4c0a-8f26-9ecef205fa7b', '/assets/images/products/9wzdncrfj3tj.png', '3.0', 0, '娱乐', '', 'free', '', '', 'https://apps.microsoft.com/detail/9wzdncrfj3tj?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Netflix, Inc.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(11, '9nblggh5l9xt', 'Instagram', NULL, 'https://store-images.s-microsoft.com/image/apps.43327.13510798887167234.cadff69d-8229-427b-a7da-21dbaf80bd81.79b8f512-1b22-45d6-9495-881485e3a87e', '/assets/images/products/9nblggh5l9xt.png', '4.1', 0, '社交', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nblggh5l9xt?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Meta', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', 'https://store-images.s-microsoft.com/image/apps.61285.13510798887167234.ac7a8ac8-9ca9-4f4d-b67f-eaa709be3ed2.e7d06981-b00c-43ca-be64-06fa5626afd3', '2026-02-24 18:05:54', '2026-02-25 06:47:25'),
(12, '9mv0b5hzvk9z', 'Xbox', NULL, 'https://store-images.s-microsoft.com/image/apps.60199.13798539581762600.abe1643f-1704-4a4d-a61b-47ccc25da012.2d0f53d6-e474-4958-bb99-2b237faa877d', '/assets/images/products/9mv0b5hzvk9z.png', '3.4', 0, '娱乐', '', 'free', '', '', 'https://apps.microsoft.com/detail/9mv0b5hzvk9z?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Microsoft Corporation', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(13, '9ndbxsjfp7dh', '《Forza Horizon 6》高级版', NULL, 'https://store-images.s-microsoft.com/image/apps.32703.13547047233571036.013c5ec3-a5d7-4e8a-83e7-470299116376.0010bfba-71fd-43c0-be4f-6505713cd403', '/assets/images/products/9ndbxsjfp7dh.png', '0.0', 0, '赛车与飞行', 'HK$854.00', 'paid', '', '', 'https://apps.microsoft.com/detail/9ndbxsjfp7dh?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, 'Xbox Game Studios', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(14, '9nblggh33zdv', 'March of Empires: War of Lords', NULL, 'https://store-images.s-microsoft.com/image/apps.17849.13510798885034953.49c1d304-b509-4abb-95fd-0984a863c84b.3104e0e4-9651-47a7-8799-ee05b3c9770e', '/assets/images/products/9nblggh33zdv.png', '3.9', 0, '策略', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nblggh33zdv?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, 'Gameloft', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(15, '9nt1zbbv6wh6', 'eFootball™ 2025', NULL, '', '/assets/images/products/9p2csh4wmzxg.png', '3.2', 0, '体育', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nt1zbbv6wh6?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 1, 'KONAMI', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-27 06:48:23'),
(16, '9p2vgctbmm52', 'Microsoft Flight Simulator 2024', NULL, 'https://store-images.s-microsoft.com/image/apps.35992.14546949033229931.f4e841b6-7779-427d-8821-1b81b953e7fb.3683c779-ba7f-41c6-9dbf-911b653baa05', '/assets/images/products/9p38d19t7lrv.png', '2.1', 0, '模拟', '', 'free', '', '', 'https://apps.microsoft.com/detail/9p2vgctbmm52?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 1, 'Xbox Game Studios', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-27 06:48:23'),
(17, '9nblggh18846', 'Candy Crush Saga', NULL, 'https://store-images.s-microsoft.com/image/apps.7458.13510798882606697.b6a31126-a832-4c65-8788-783028e60938.f9619292-7e34-4b90-b30f-98c1ff47cd7f', '/assets/images/products/9nblggh18846.png', '4.4', 0, '益智', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nblggh18846?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, 'King', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(18, '9nms4sfnbgbh', 'Dead by Daylight', NULL, '', '/assets/images/products/9nhlwj6b0wfq.png', '2.9', 0, '动作与冒险', 'HK$119.00', 'paid', '', '', 'https://apps.microsoft.com/detail/9nms4sfnbgbh?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 1, 'Behaviour Interactive', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-27 06:48:23'),
(19, '9p4tjqdgtrnf', '勇者斗恶龙 VII', NULL, 'https://store-images.s-microsoft.com/image/apps.53632.14586549993422014.3b46ae3d-375a-4d8f-9155-eae640749b24.c996e927-b506-4379-aa78-391016dc441e', '/assets/images/products/9p4tjqdgtrnf.png', '3.0', 0, '角色扮演', 'HK$498.00', 'paid', '', '', 'https://apps.microsoft.com/detail/9p4tjqdgtrnf?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, 'SQUARE ENIX', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(20, '9n8kmnw6942x', '使命召唤：黑色行动 冷战', NULL, 'https://store-images.s-microsoft.com/image/apps.20113.14316447222402733.2a2c0a8b-5bb1-43ef-b65a-26266ed366cf.16710f79-3906-4fc0-ab07-cd9baa55d996', '/assets/images/products/9n8kmnw6942x.png', '0.0', 0, '射击', 'HK$369.20', 'discount', 'HK$568.00', '35', 'https://apps.microsoft.com/detail/9n8kmnw6942x?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 1, 'Activision', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(21, '9nxjf0cl0gqr', 'Microsoft Flight Simulator 2024 Standard Edition', NULL, '', '/assets/images/products/9nxjf0cl0gqr.png', '2.1', 0, '模拟', 'HK$498.00', 'paid', '', '', 'https://apps.microsoft.com/detail/9nxjf0cl0gqr?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 1, 'Xbox Game Studios', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 03:42:08'),
(22, '9nht9rb2f4hd', 'Copilot', NULL, 'https://store-images.s-microsoft.com/image/apps.19616.13623743226081137.44717f35-32c5-4d9e-ab80-390d1fdf3f60.1abafe37-50f5-41c8-abbd-0d39ecc6fe06', '/assets/images/products/9nht9rb2f4hd.png', '4.7', 0, '高效工作', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nht9rb2f4hd?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Microsoft Corporation', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(23, '9wzdncrfhwqt', 'Drawboard PDF', NULL, 'https://store-images.s-microsoft.com/image/apps.7460.9007199266247478.6962ecbb-0018-4138-afbc-057b694dd152.e9f8ccbd-438b-47ce-9292-64f4121d44e1', '/assets/images/products/9wzdncrfhwqt.png', '4.4', 0, '高效工作', '', 'free', '', '', 'https://apps.microsoft.com/detail/9wzdncrfhwqt?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Drawboard', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(24, 'xpdnlrv08zch53', 'Hotspot Shield', NULL, 'https://store-images.s-microsoft.com/image/apps.35732.9007199266285780.4de78db9-2d14-41dc-84e0-e448787e972e.7b7347b2-fc03-4ef5-91b4-99d4194b4bab', '/assets/images/products/9wzdncrdfng7.png', '4.4', 0, '高效工作', '', 'free', '', '', 'https://apps.microsoft.com/detail/xpdnlrv08zch53?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Pango GmbH', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-27 06:48:23'),
(25, 'xpfcg5nrkxqpkt', 'PDF Reader', NULL, 'https://store-images.s-microsoft.com/image/apps.45573.13510798886655750.7655cc79-0d25-41ea-b75f-b64c7120201f.cf626021-9fc0-4803-8c89-151943ba155b', '/assets/images/products/9nblggh67wlk.png', '4.7', 0, '高效工作', '', 'free', '', '', 'https://apps.microsoft.com/detail/xpfcg5nrkxqpkt?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Xodo Technologies', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-27 06:48:23'),
(26, 'xp99j3kp4xz4vv', 'Zoom Workplace', NULL, 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxtPV1zYJfBPveATOCg5xpTs.ZnvGg3ze84DzaRRSYrzImeGF44C8Janr7lvbJfwpzl2AK3Ha9PvOgX.V_rjtDCc-&format=source', '/assets/images/products/xp99j3kp4xz4vv.png', '3.9', 0, '高效工作', '', 'free', '', '', 'https://apps.microsoft.com/detail/xp99j3kp4xz4vv?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Zoom Video Communications', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(27, '9p3cp9g025rm', 'PDF X', NULL, 'https://store-images.s-microsoft.com/image/apps.18411.14540311183413038.f028cadf-0853-4674-ad48-e9a3d9d1fab9.f200bb27-9cc7-4f3a-a72b-5879f763a303', '/assets/images/products/9p3cp9g025rm.png', '4.6', 0, '高效工作', '', 'free', '', '', 'https://apps.microsoft.com/detail/9p3cp9g025rm?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'PDF Logic Corporation', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(28, '9nblggh4nlb0', 'Nebo', NULL, 'https://store-images.s-microsoft.com/image/apps.31631.13510798887473619.9fd10f6b-a187-4b4f-b782-86d5c9e7ef8b.cf5454da-9410-4d09-9429-9cb3330bbec9', '/assets/images/products/9nblggh4nlb0.png', '4.0', 0, '高效工作', 'HK$78.00', 'paid', '', '', 'https://apps.microsoft.com/detail/9nblggh4nlb0?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'MyScript', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(29, '9ngqm8fph9wq', '概念画板 - Concepts', '概念画板（Concepts）是一款专业的素描、绘图与设计应用。用无限画布、矢量与栅格混合、可调笔刷与物件库，快速完成草图、插画、UI 与产品设计。支持 Windows 触控与触控笔。', 'https://store-images.s-microsoft.com/image/apps.30784.13645185565938811.9dcef93d-e1d7-438f-a15e-359d8c8c1419.ebac9e98-66fe-478d-b9a3-3baf9443789d', '/assets/images/products/9ngqm8fph9wq.png', '4.7', 0, '高效工作', '', 'free', '', '', 'https://apps.microsoft.com/detail/9ngqm8fph9wq?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'TopHatch, Inc.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:22:20'),
(30, '9nghp3dx8hdx', 'Files App', NULL, 'https://store-images.s-microsoft.com/image/apps.5536.13649428968955623.bcfc493a-7fd6-4231-9ddd-1c511b1330ad.11150fa3-6915-4039-b262-6be82a9c440a', '/assets/images/products/9nghp3dx8hdx.png', '4.3', 0, '实用程序与工具', 'HK$114.00', 'paid', '', '', 'https://apps.microsoft.com/detail/9nghp3dx8hdx?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Files Community', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(31, '9wzdncrdr0sf', 'One Calendar', NULL, 'https://store-images.s-microsoft.com/image/apps.65511.9007199266538018.1e764430-b76b-4a98-8cb5-f7b2b1c43bda.a513d4ee-85e3-44de-b9cc-b95dc9ebe7a8', '/assets/images/products/9wzdncrdr0sf.png', '4.4', 0, '高效工作', '', 'free', '', '', 'https://apps.microsoft.com/detail/9wzdncrdr0sf?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Code Centric', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(32, '9n9z9nsv47fl', 'LiquidText', NULL, 'https://store-images.s-microsoft.com/image/apps.62866.13528076996101971.da43de33-c693-4199-835c-1786bf39f5ed.a1502e58-030e-4e02-82d9-0b8730d3bbe6', '/assets/images/products/9n9z9nsv47fl.png', '3.9', 0, '高效工作', '', 'free', '', '', 'https://apps.microsoft.com/detail/9n9z9nsv47fl?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'LiquidText Inc.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(33, 'xpdp273c0xhqh2', 'Adobe Acrobat Reader DC', NULL, 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBcXm6WqCy1Yzd43klSX2PfpRkv1I._jhOfw6DFI4S594sSnf_pe8xl35UlVDoy8XX0xobrybk9qSHZSH7goYnzA-&format=source', '/assets/images/products/xpdp273c0xhqh2.png', '3.5', 0, '高效工作', '', 'free', '', '', 'https://apps.microsoft.com/detail/xpdp273c0xhqh2?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Adobe Inc.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(34, '9n56rwk82z8h', 'Mage Castle Idle Defense', NULL, 'https://store-images.s-microsoft.com/image/apps.22608.13968794428044516.c5ec095b-fca3-4a96-a314-d2a03d030c28.8b7cc410-de81-468b-9cf9-a7cec4ae5888', '/assets/images/products/9n56rwk82z8h.png', '0.0', 0, '策略', '', 'free', '', '', 'https://apps.microsoft.com/detail/9n56rwk82z8h?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(35, '9n201kqxs5bm', '使命召唤', NULL, 'https://store-images.s-microsoft.com/image/apps.54836.13966330883349940.11992bbd-8e09-48bd-a61d-26246908b0e0.8eef2f31-8299-430d-9b7f-e28f47b46c38', '/assets/images/products/9n201kqxs5bm.png', '2.0', 0, '射击', '', 'free', '', '', 'https://apps.microsoft.com/detail/9n201kqxs5bm?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 1, 'Activision', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 02:58:02'),
(36, '9p9rvr3klsl1', 'NINJA GAIDEN 4', NULL, 'https://store-images.s-microsoft.com/image/apps.2549.14524843898704391.85a1bf00-ba10-44d9-90b4-d20f9cb73fb6.f4e125f5-8765-4687-842d-a57f54b03fec', '/assets/images/products/9n7358jzpx1z.png', '4.3', 0, '动作与冒险', 'HK$498.00', 'paid', '', '', 'https://apps.microsoft.com/detail/9p9rvr3klsl1?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 1, 'Xbox Game Studios', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-27 06:48:23'),
(37, '9mwd2z8l1fbq', 'The Outer Worlds 2', NULL, 'https://store-images.s-microsoft.com/image/apps.41744.14086924108488409.5098cc78-dcb3-4bc1-858f-48fa36bb7026.e990bffb-c0f2-4506-b06d-f537efb4b3ee', '/assets/images/products/9p8rmkxrml7d.png', '0.0', 0, '角色扮演', 'HK$348.60', 'discount', 'HK$498.00', '30', 'https://apps.microsoft.com/detail/9mwd2z8l1fbq?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 1, 'Xbox Game Studios', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-27 06:48:23'),
(38, 'c24svx28pnwm', 'Fallout 4: Game of the Year Edition', NULL, 'https://store-images.s-microsoft.com/image/apps.50489.14199495301608061.222a9c4b-4b6c-4b60-bd5a-27c78c53c08a.5ed20372-1585-47e0-a0ef-fc073e702f47', '/assets/images/products/9pfrg44xzcfj.png', '0.0', 0, '角色扮演', 'HK$214.50', 'discount', 'HK$429.00', '50', 'https://apps.microsoft.com/detail/c24svx28pnwm?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, 'Bethesda Softworks', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-27 06:48:23'),
(39, '9n9qz7gtn5fx', 'Lamplighter', NULL, 'https://store-images.s-microsoft.com/image/apps.33884.13532001477554881.d9ccb73e-c8b0-42aa-bd04-40d370525f24.05d68884-462b-46c0-a9cd-5f0d99172828', '/assets/images/products/9n9qz7gtn5fx.png', '0.0', 0, '动作与冒险', '', 'free', '', '', 'https://apps.microsoft.com/detail/9n9qz7gtn5fx?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(40, '9nlmh1743jx1', 'TropicVille', NULL, 'https://store-images.s-microsoft.com/image/apps.64489.13704820802656374.4ffa5b31-4001-4c9a-a2dc-df2e029ef49f.96180d39-ae25-4ac6-ab10-6cd6fc2aa5cf', '/assets/images/products/9nlmh1743jx1.png', '0.0', 0, '模拟', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nlmh1743jx1?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 02:58:02'),
(41, '9pbfbl09gvkd', 'Mahjong Social', NULL, 'https://store-images.s-microsoft.com/image/apps.40495.14124342075143797.5ce9a755-252a-4c3a-930d-a51b176e6f28.8ff0e596-9f87-409d-9da4-1ad8dad1fa25', '/assets/images/products/9pbfbl09gvkd.png', '0.0', 0, '益智', '', 'free', '', '', 'https://apps.microsoft.com/detail/9pbfbl09gvkd?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(42, '9ng67zwsd98k', '冰封的秘密2', NULL, 'https://store-images.s-microsoft.com/image/apps.35290.13585527941255490.2e54d127-2f9b-4715-9402-cb80b6f28cd0.27605d2e-fe05-44f8-bb40-7e3e236b123e', '/assets/images/products/9ng67zwsd98k.png', '0.0', 0, '益智', '', 'free', '', '', 'https://apps.microsoft.com/detail/9ng67zwsd98k?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(43, '9mvhcq7cjx01', '我独自升级：ARISE', NULL, 'https://store-images.s-microsoft.com/image/apps.22396.13858861137035174.92080baa-4c7d-44a1-9f56-3a60eb91f774.9b49937d-ea23-4cce-b130-4644c1e47494', '/assets/images/products/9mvhcq7cjx01.png', '0.0', 0, '角色扮演', 'HK$299.00', 'paid', '', '', 'https://apps.microsoft.com/detail/9mvhcq7cjx01?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 0, 'Netmarble', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(44, '9nrhqlzx3900', 'Pigeon Simulator', NULL, 'https://store-images.s-microsoft.com/image/apps.50165.14382953481681867.8b1ccf01-d587-4b7f-afbc-ee46cb87b3d4.098b24ae-7d7a-4153-89ba-79f33b5650f5', '/assets/images/products/9nrhqlzx3900.png', '0.0', 0, '模拟', 'HK$114.00', 'paid', '', '', 'https://apps.microsoft.com/detail/9nrhqlzx3900?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 1, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(45, '9nd3httq0gkb', 'Winter Burrow', NULL, 'https://store-images.s-microsoft.com/image/apps.50489.13551922362408999.6a1ab142-ad0f-4a13-b0ba-9fcbb7182271.019c07b7-11a7-40b7-b8da-292723fc9fd9', '/assets/images/products/9nd3httq0gkb.png', '3.6', 0, '动作与冒险', 'HK$154.00', 'paid', '', '', 'https://apps.microsoft.com/detail/9nd3httq0gkb?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'game', 1, 'Xbox Game Studios', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 02:58:02'),
(46, 'xp8k17rnmm8mtn', 'Canva', 'Canva is an all-in-one visual communication platform that empowers the world to design. It\'s a simple way to create beautiful presentations, infographics, videos, t-shirts, websites, social media posts, and more. Canva is for everyone with an idea to share, whether you\'re a student, educator, entrepreneur, or professional.', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxo4K81Ei7WzcnqEk8W.MgwaH94jRmtJPRlv4F_Z0WGxl4DqVmtd6.Y76H4VGL9nDXhYbs1dM3Ct_E.XEwVjczMY-&format=source', '/assets/images/products/xp8k17rnmm8mtn.png', '4.9', 0, '多媒体设计', '', 'free', '', '', 'https://apps.microsoft.com/detail/xp8k17rnmm8mtn?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Canva', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:22:20'),
(47, '9pfdf2zd4z4n', '爱笔思画', '爱笔思画是一款人气绘图应用，下载量突破数亿。提供超过47000种笔刷、21000种素材、2100种字体、84种滤镜等专业功能，支持录制并分享绘画过程视频，具备防抖、多种尺子、剪贴蒙版、无限图层等，适合插画与漫画创作。', 'https://store-images.s-microsoft.com/image/apps.28383.14202576542330599.e2a21905-d839-4a08-a9e2-42b2b28b331d.fe8f4307-30e2-4bf4-b5e6-c0be25fcea8b', '/assets/images/products/9pfdf2zd4z4n.png', '4.4', 0, '多媒体设计', '', 'free', '', '', 'https://apps.microsoft.com/detail/9pfdf2zd4z4n?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'ibis inc.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:22:20'),
(48, '9npqcdpgj6sz', 'Sketchbook Pro', 'Sketchbook Pro is an award-winning drawing and painting app for professionals and enthusiasts. Create stunning artwork with a full set of brushes, layers, and professional-grade tools. Perfect for sketching, illustration, and concept art.', 'https://store-images.s-microsoft.com/image/apps.17376.13784310836114466.490db57d-8ef7-4f74-a212-786d60e5156f.b28245f5-9937-4180-9ebf-1845c37899b6', '/assets/images/products/9npqcdpgj6sz.png', '3.2', 0, '多媒体设计', '', 'free', '', '', 'https://apps.microsoft.com/detail/9npqcdpgj6sz?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Sketchbook, Inc.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:22:20'),
(49, 'xpfd4t9n395qn6', 'Adobe Photoshop', 'Photoshop is an image creation, graphic design and photo editing software developed by Adobe. Create and enhance photographs, illustrations, and 3D artwork. Design websites and mobile apps. Edit videos, simulate real-life paintings, and more.', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxhfRM_njI7Pu32CmBLMdmnnzF6MdNHw4MJwlr.tSWLA2EJBQdZh0p3nNDzGvX2F6NoIc9ZSQ9xJqsGEg5bouOnA-&format=source', '/assets/images/products/xpfd4t9n395qn6.png', '3.6', 0, '照片与视频', '', 'free', '', '', 'https://apps.microsoft.com/detail/xpfd4t9n395qn6?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Adobe Inc.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:22:20'),
(50, '9nbhcs1lx4r0', 'Paint.NET', 'Paint.NET is free image and photo editing software for PCs running Windows. It features an intuitive and innovative user interface with support for layers, unlimited undo, special effects, and a wide variety of useful and powerful tools.', 'https://store-images.s-microsoft.com/image/apps.368.13517568566615301.c4a23598-9da0-403a-8afb-ffae9aaa8b09.4654ac55-1051-458d-b277-d462a9d3bdc4', '/assets/images/products/9nbhcs1lx4r0.png', '4.8', 0, '照片与视频', 'HK$114.00', 'paid', '', '', 'https://apps.microsoft.com/detail/9nbhcs1lx4r0?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'dotPDN LLC', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:22:20'),
(51, '9nrtvfllggtv', 'VSCO AI Photo & Video Editor', 'VSCO\'s advanced online photo editor. Upgrade your photo editing with VSCO AI Photo Editor — professional AI tools, batch photo editing, and quality photo filters.', 'https://store-images.s-microsoft.com/image/apps.19620.14380672629780887.2c0f86f0-af77-4689-99bb-e525bd748095.b642ceaf-5c22-4515-abac-1d42ee059a06', '/assets/images/products/9nrtvfllggtv.png', '0.0', 0, '照片与视频', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nrtvfllggtv?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Visual Supply Company', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:22:20'),
(52, '9njk057nfzcp', 'ArtRage Vitae', 'ArtRage Vitae is a natural painting and drawing app. Paint with oils, watercolors, and realistic tools. Create stunning digital art with customizable brushes, layers, and effects. Perfect for artists who want a traditional feel with digital convenience.', 'https://store-images.s-microsoft.com/image/apps.4528.13675213640609388.4662357e-6c31-415c-9f14-a2d99cb44547.00b57b84-27d1-48f4-bfef-d759cabefea9', '/assets/images/products/9njk057nfzcp.png', '0.0', 0, '多媒体设计', '', 'free', '', '', 'https://apps.microsoft.com/detail/9njk057nfzcp?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Ambient Design Ltd.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:22:20'),
(53, '9mzzlhtz5n02', 'Sketchable Plus', 'Sketchable Plus is a professional drawing and sketching app for Windows. Create detailed artwork with a full suite of brushes, layers, and blending modes. Optimized for Surface and touch devices.', 'https://store-images.s-microsoft.com/image/apps.8741.13865246053716349.e7afe922-65c3-47ce-b314-4701d983cfcc.edc7f0c0-1cab-4f6b-93f6-da8598cecb8c', '/assets/images/products/9mzzlhtz5n02.png', '0.0', 0, '多媒体设计', '', 'free', '', '', 'https://apps.microsoft.com/detail/9mzzlhtz5n02?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Silicon Benders LLC', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:22:20'),
(54, '9p94lh3q1cp5', 'Adobe Express', 'Adobe Express (formerly Adobe Spark) makes it easy to create and share social graphics, short videos, and web pages. Use templates and quick actions to design marketing content, stories, and more. Included with Adobe Creative Cloud.', 'https://store-images.s-microsoft.com/image/apps.48249.14075264175091512.e6069598-be57-4d96-bc28-bbca35469576.15acb55f-0e71-4ece-a5ac-d02eeefef83f', '/assets/images/products/9p94lh3q1cp5.png', '2.6', 0, '多媒体设计', '', 'free', '', '', 'https://apps.microsoft.com/detail/9p94lh3q1cp5?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Adobe Inc.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:22:20'),
(55, '9wzdncrcv5xn', 'Duolingo', NULL, 'https://store-images.s-microsoft.com/image/apps.38456.9007199267003607.4d66cde1-46fd-42b7-93c7-e05d782f5e5d.cfdf91f5-dc2a-4178-96fa-d2c156ae62cd', '/assets/images/products/9wzdncrcv5xn.png', '4.4', 0, '教育', '', 'free', '', '', 'https://apps.microsoft.com/detail/9wzdncrcv5xn?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Duolingo', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(56, '9wzdncrfjb13', 'Fresh Paint', NULL, 'https://store-images.microsoft.com/image/apps.37291.9007199266251806.241e6a77-946b-48f7-8269-e8d414751b65.edfec239-dd87-4ebd-9335-41cf617cebea', '/assets/images/products/9wzdncrfjb13.png', '4.2', 0, '教育', '', 'free', '', '', 'https://apps.microsoft.com/detail/9wzdncrfjb13?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Microsoft Corporation', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 02:58:02'),
(57, '9wzdncrfj1cg', '幼儿园 学习 活动', NULL, 'https://store-images.s-microsoft.com/image/apps.40813.9007199266244203.cce58b09-0a74-42bd-b3b0-63fc89c4a003.5592cc59-7955-4c9d-b0ee-9b5a6f81ad84', '/assets/images/products/9wzdncrfj1cg.png', '3.9', 0, '教育', '', 'free', '', '', 'https://apps.microsoft.com/detail/9wzdncrfj1cg?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(58, '9nblggh50vwp', '儿童着色乐趣', NULL, 'https://store-images.s-microsoft.com/image/apps.46711.13510798887621872.fcdae458-026a-4f67-9bcb-dc91feea95ed.75b09fd0-af43-40d9-9566-d9a5bc7708dc', '/assets/images/products/9nblggh50vwp.png', '4.7', 0, '教育', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nblggh50vwp?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(59, '9n4pz8fdv9rb', 'Creative Text Creator', NULL, 'https://store-images.s-microsoft.com/image/apps.37984.13978449899495255.d0f10989-c348-4cbb-a91a-6766c8781003.4dbcd3bc-6415-42f2-91f3-c586e557b49a', '/assets/images/products/9n4pz8fdv9rb.png', '0.0', 0, '教育', '', 'free', '', '', 'https://apps.microsoft.com/detail/9n4pz8fdv9rb?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(60, '9wzdncrdqm4x', 'Christmas Coloring Pages', NULL, 'https://store-images.s-microsoft.com/image/apps.38373.9007199266667319.0c902f34-b3c0-487d-8f36-988d62039dfb.e3208d89-3f79-406a-9706-caed7a135a89', '/assets/images/products/9wzdncrdqm4x.png', '0.0', 0, '教育', '', 'free', '', '', 'https://apps.microsoft.com/detail/9wzdncrdqm4x?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(61, '9nblggh1rl1p', 'Kids Piano', NULL, 'https://store-images.s-microsoft.com/image/apps.3697.13510798886174356.340c5ffc-0bc5-4d23-bea2-49d232c5a0a0.ebf3d8bc-0c80-4a6e-b80c-47829b0267f4', '/assets/images/products/9nblggh1rl1p.png', '0.0', 0, '教育', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nblggh1rl1p?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 02:58:02'),
(62, '9wzdncrfj9mh', 'Learn ABC for Kids', NULL, 'https://store-images.s-microsoft.com/image/apps.51668.9007199266252154.7a96f87a-43c4-4685-be08-d98bc85fd898.2df8a979-2cb7-4eaa-9d5b-6ee5be1d5d34', '/assets/images/products/9wzdncrfj9mh.png', '0.0', 0, '教育', '', 'free', '', '', 'https://apps.microsoft.com/detail/9wzdncrfj9mh?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-24 18:07:17'),
(63, '9n9kbwp6hvqq', 'Movie Maker Pro', 'Best-selling video editor & movie maker for PC, trusted by over 15 millions of Windows users. Create professional videos and stunning slideshows from your photos, video clips, and music with ease. Designed for both beginners and creators, Movie Maker - Video Editor PRO helps you edit faster and share everywhere - from YouTube & TikTok to Instagram, Facebook, and business presentations.\n\nPowerful Features\n- Full video editing tools: trim, split, join, rotate, crop, flip, mute, extract audio.\n- Creative effects: animated text & titles, stickers, photo overlays, transitions (fade, zoom, ripple, pixelate…), green screen, video overlay, visual effects, censor & blur.\n- Pro editing: voice-over recording, audio sync, soundtrack editor (trim, fade in/out, volume control).\n- Advanced video options: slow motion (0.125x - 8x), video stabilization, color grading with built-in LUTs or custom *.cube files.\n- High-quality export: MP4 (H.264/HEVC H.265) or WMV, up to 4K & 60fps.\n- Quick tools: fast trim, crop, merge, convert video/photo, screen recording, create DVD, and more.\n\nWhy Choose PRO?\n- One-time purchase - no subscription fees.\n- Lifetime free updates.\n- All premium tools unlocked.\n- Perfect replacement for iMovie, CapCut, Filmora, or Movavi on Windows.', 'https://store-images.s-microsoft.com/image/apps.39913.13535614984864253.2f5761c9-d28c-49ce-8c65-73dfd53bb21a.32eea5f2-bea3-4057-91b0-6f2545182748', '/assets/images/products/9n9kbwp6hvqq.png', '4.4', 0, '照片与视频', '', 'free', '', '', 'https://apps.microsoft.com/detail/9n9kbwp6hvqq?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:20:15'),
(64, '9nsf023x0mqs', '视频编辑,视频剪辑', 'Movie Maker是一个简单而强大的视频编辑工具。它是Windows电影制作和幻灯片制作工具。作为Windows 10的电影制作工具，您可以使用照片，视频片段和音乐里来剪辑视频。您可以轻松地加入并合并视频和照片，添加音乐，转场，文字字幕和画中画。\n\n[主要功能]\n1.用视频片段和照片制作电影\n  - 分割，剪裁，旋转，翻转，加入和合并视频片段\n  - 变速\n  - 丰富的转场\n  - 提取音乐\n  - 定格画面\n  - 丰富的滤镜\n\n2.添加和编辑背景音乐：\n  - 添加音频：内置音乐，用户自定义\n  - 录音\n  - 分割，剪裁\n  - 变速\n  - 调整音量\n  - 淡入淡出效果\n\n3.添加和编辑文字标题\n  - 编辑文字：字体，大小，粗体，斜体，颜色\n  - 分割\n\n4.支持画中画\n  - 分割，剪裁，旋转，翻转，加入和合并视频片段\n  - 变速\n  - 丰富的转场\n  - 不透明度\n  - 丰富的滤镜\n\n5.导出视频\n  - 高清视频\n  - 无水印\n\n6.支持多种媒体格式：jpg，jpeg，bmp，gif，webp，mp4，wmw，avi，webm，ts，3gp，3gpp，m4v，mov，mkv，mts，m2ts，wmv，wav，m4a，mp3。\n\n[Movie Maker Premium：应用内购买功能]\n• 无水印\n• 超高清和 4K 分辨率\n• 支持更高的 FPS\n订阅计划：每年收费 11.99 美元/年\n终身许可：一次性购买，19.99 美元', 'https://store-images.s-microsoft.com/image/apps.50470.14365111546871615.c5051504-40cb-43ff-9632-cbd13863b7ab.25968175-c1d6-4505-8a57-fce6ee48aadf', '/assets/images/products/9nsf023x0mqs.png', '4.7', 0, '照片与视频', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nsf023x0mqs?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:20:15'),
(65, 'xp8jnpkgtv6nrl', 'Wondershare Filmora', 'Empower your imagination with Filmora AI Video Editor, a smart video editor with powerful tools', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxjeeMeR_QZ3ewKpujC90DLPjqTVtQCKl37IMUowE375mnWxsNpcQy6nUZmN9fwSfXMdpPJICW946AFO6.TVvJ.A-&format=source', '/assets/images/products/xp8jnpkgtv6nrl.png', '4.1', 0, '照片与视频', '', 'free', '', '', 'https://apps.microsoft.com/detail/xp8jnpkgtv6nrl?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Wondershare Technology', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:20:15'),
(66, '9nblggh6fw5v', 'Animotica', 'Animotica是一个操作方便的视频编辑器、电影制作和幻灯片视频制作应用程序，适用于Windows10系统。Animotica受150多万用户的信任，是微软商店下载量最多的应用程序之一，也是众多竞争对手中的第一大应用程序。Animotica允许用户添加、拆分、修剪以及组合视频和照片；添加音乐、更改音量、添加画外音、过渡转场；缩放、旋转视频、调整颜色和图像；应用色度键效果、添加动画标题和说明文字；添加贴纸、文本、照片和覆盖视频，使用精彩的动画定制标志；为视频应用背景模糊，制作慢速或快速视频；制作Instagram方形视频，或制作Instagram故事和IGTV垂直视频等。\n欢迎使用Animotica视频编辑器，了解如何快速简便剪辑视频、电影或幻灯片并上传至YouTube或Instagram。本应用是一款适用于YouTube和Instagram的 vLogger初学者、学生和教师、小企业、社交媒体营销人员以及而编辑娱乐视频者的一体式视频编辑器。\n您可以免费下载Animotica，或者以超低的价格一次性购买软件许可，会员可以使用多种视频编辑功能和效果，并可以享受视频无水印功能。', 'https://store-images.s-microsoft.com/image/apps.537.13510798886808787.516ac914-cc7b-4d13-8a37-f3e715388bf9.d2df5eab-3b4c-4c88-97a9-6dd51c9b738f', '/assets/images/products/9nblggh6fw5v.png', '4.4', 0, '照片与视频', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nblggh6fw5v?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Mixilab Inc.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:20:15'),
(67, '9nc38rwwf1gx', 'crazy video maker 2', 'Crazy Video Maker 2 是 Microsoft Store 上最具创新性且最易于使用的视频编辑软件。\n即使没有任何视频剪辑经验，你也可以轻松地将照片、视频片段、音乐和文字组合成令人惊艳的视频作品——甚至可以直接通过摄像头或屏幕录制素材。\n\n应用的主要交互方式简单直观：使用鼠标、触控笔或触屏拖动时间轴上的元素，然后调整参数即可。\n尽管操作简便，Crazy Video Maker 2 依然拥有强大的专业级编辑功能。\n\n使用 Crazy Video Maker 2，你可以：\n将多个视频和照片合并为一个项目\n精确到单帧地剪切和修整片段\n精确裁剪、旋转和稳定视频画面\n录制电脑屏幕并将其添加到影片中\n调整亮度、对比度、饱和度和色彩平衡\n应用滤镜和色彩变换效果\n控制播放速度（慢动作或快动作）\n添加动态 GIF 和特效\n在多个图层上排列元素\n直接在视频上绘制内容\n添加多种文字样式和动画\n使用专业的场景过渡效果\n添加多个音轨和录制旁白\n通过摄像头或麦克风录制视频和音频\n使用 Chroma Key（绿幕） 特效\n导出 Full HD 或 4K 高清视频\n直接上传到 YouTube\n\n所有修改都会即时在预览窗口中显示，让你完全掌控创作过程。\n\n观看演示视频，了解 Crazy Video Maker 2 的强大与易用——立即加入数百万满意用户的行列吧！', 'https://store-images.s-microsoft.com/image/apps.29107.13576192301439499.3ead6f81-6011-48d0-b8e8-397fa6153ee2.2fff76ef-e609-484b-bb45-43650119b0eb', '/assets/images/products/9nc38rwwf1gx.png', '4.6', 0, '照片与视频', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nc38rwwf1gx?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:20:15'),
(68, '9nblggh68c18', 'Video Cutter & Compressor', 'Trim and Compress your video easily. With the program you can easily change the resolution and aspect ratio of the video, apply brightness, contrast, saturation, rotate, scale, change and increase audio volume up to 200%. You can trim, convert and compress your video to save the memory of your device. Compress video for Whatsapp app etc.', 'https://store-images.s-microsoft.com/image/apps.13470.13510798886659317.477cc7ab-32ea-455b-931a-49465048d5db.31b47c52-a0b5-4a95-84f3-b6bea280de85', '/assets/images/products/9nblggh68c18.png', '4.6', 0, '照片与视频', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nblggh68c18?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:20:15'),
(69, '9nblggh1jj6d', 'Fused', 'Double exposure made easy…FUSED is the very first app that allows you to blend videos, photos, or a combination of both.\n\nWe are especially excited to launch Artists Collections for FUSED so you can create beautiful, one-of-a-kind visuals with inspired work from talented emerging artists!\n\nFuse your creations in in 4 simple steps:\n\n1: Import a Background and a Foreground. Choose from video clips or images saved to your Camera Roll or check out our Artists Collection packs\n\n2: Swipe to preview and choose the best Blend Mode for your project\n\n3: Make color adjustments to each layer and apply masking if you like.\n\n4: Export your work to share on all your favorite social places or save to your Camera Roll.\n\nFeatures inside of FUSED include:\n\n• A revolutionary UI, simple and intuitive to use\n• Import and blend video clips (up to 15 secs), photos, or a combination of the two together. Let your imagination run wild!\n• 20 real-time blending modes\n• Color adjustment tools for more control over blending\n• Draw and erase tools to perfectly map out your masking/blending area\n• Share directly to all of your favorite social places\n• \"Artists Collections\" featuring videos and images from up and coming artists. Blend these with your own projects to create some amazing artwork!', 'https://store-images.s-microsoft.com/image/apps.32148.13510798885983831.e014871b-1a8b-480d-81fd-25837a8f3c40.3616b0cf-cbc8-4e54-bb6d-9c8db45e9e22', '/assets/images/products/9nblggh1jj6d.png', '4.7', 0, '照片与视频', '', 'free', '', '', 'https://apps.microsoft.com/detail/9nblggh1jj6d?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:20:15'),
(70, 'xp9kn75rrb9nhs', 'CapCut', 'Try out CapCut desktop version!\nCapCut offers easy-to-use video and photos editing tools, free in-app fonts and effects, and powerful features like keyframe animation, smooth slow motion, chroma key, and video stabilization—everything you need to capture and refine your moments.\nCreate high-quality videos with other unique features: auto captions, text-to-speech, motion tracking, and background removal. Show your personality and go viral on TikTok, YouTube, Instagram, WhatsApp, and Facebook!\nDownload CapCut for free and start creating with a wide range of free tools. Premium features are also available with a free trial before you subscribe.\nFEATURES\nBasic video editing\n• Trim and shorten clips and split or merge videos.\n• Adjust video speed from 0.1x to 100x, and apply speed curves to clips.\n• Animate video clips with incredible zoom in/out effects.\n• Highlight the best moments with the freeze feature.\n• Explore transition options with awesome effects on and between clips.\nAdvanced video editor\n• Keyframe video animation is available for all settings.\n• Edit videos to create smooth slow-motion with the optical flow feature and speed curve tool.\n• Use the chroma key to remove specific colors from videos.\n• Easy to arrange and preview clips on multi-track timeline.\n• The stabilizing feature keeps video footage steady.\n(These features available in the PRO version only)\nIntelligent features\nAI design: A design agent that lets you create and edit stunning images and posters from a single prompt. (10 free uses per day for a limited time)\n• Auto captions: automate speech recognition and subtitles in videos. (1 free use/month [China/US/UK/FR/DE]; up to 6 free uses/month elsewhere)\n• Text-to-speech: apply text-to-speech in multiple languages and voices.\n• Background removal: automatically remove background free of charge.\nText & Stickers\n• Add text to videos with different fonts and styles, choose unique text templates. Fonts can be imported locally.\n• Subtitles can be added to the timeline of video tracks and can be moved and adjusted in one step.\nTrending Effects & Filters\n• Match video content with diverse filters that are updated weekly with the latest trends.\n• Edit videos with hundreds of trending effects, including Glitch, Blur, 3D, etc.\n• Add movie-style video filters or freely adjust video brightness, contrast, etc.\nMusic & Sound Effects\n• Add millions of music clips and sound effects to videos.\n• Extract audio, clips, and recordings from videos. (9 free uses each month)\nEasy to Share\n• Custom video export resolution, HD video editor supports 4K 60fps exports and smart HDR.\n• Adjust the format and share with your friends on social media platforms.\nCapCut is an all-in-one video editor and video maker application with everything you need to create stunning, high-quality videos. Beginners can get started with CapCut in a matter of seconds, while advanced users can enjoy all the functions they need to edit videos. Express your individuality with exclusive video editor and video maker functions. After your video is created, you can share it across social media with one click, accruing everyone\'s likes, comments and attention.', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxtHdRB6xk71KqOPxE23.XPgZyj6_E67WkdZVGIyhVH0fZGrEfROGWzZ66RZv3j81.py31k0MYlUS4cHMTQN1ZjY-&format=source', '/assets/images/products/xp9kn75rrb9nhs.png', '4.8', 0, '照片与视频', '', 'free', '', '', 'https://apps.microsoft.com/detail/xp9kn75rrb9nhs?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'ByteDance Pte. Ltd.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:20:15'),
(71, 'xp9cbrt0jcqddp', 'Movavi Video Editor', '简单而强大的编辑器，用于创建令人惊艳的视频', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxjow3Vx36Cedo7vSl5J8ji1qQcSG.MVDU0BxZe3amuRy7nu6ITrGsrCnN70gPwR1De1b44A_05hkt8r6g0X1a9s-&format=source', '/assets/images/products/xp9cbrt0jcqddp.png', '0.0', 0, '照片与视频', '', 'free', '', '', 'https://apps.microsoft.com/detail/xp9cbrt0jcqddp?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Movavi Software Inc.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:20:15');
INSERT INTO `products` (`id`, `ms_id`, `title`, `description`, `icon_url`, `local_icon`, `rating`, `rating_count`, `category`, `price`, `price_type`, `original_price`, `discount_percent`, `original_url`, `custom_url`, `custom_title`, `custom_keywords`, `custom_description`, `custom_download_url`, `is_own_product`, `product_type`, `has_gamepass`, `developer`, `screenshots`, `whats_new`, `release_date`, `last_update`, `app_size`, `system_requirements`, `age_rating`, `age_rating_icon`, `supported_languages`, `publisher_website`, `publisher_support`, `privacy_policy_url`, `social_card_image`, `created_at`, `updated_at`) VALUES
(72, '9p1j8s7ccwwt', 'Microsoft Clipchamp', '在 Microsoft 推出的易用视频编辑器 Clipchamp 中单击几下即可创建视频。这款视频制作软件采用拖放界面，对初学者非常友好，而且提供了高级视频编辑功能，可帮助你剪切、裁剪和调整视频大小，录制屏幕和网络摄像头，编辑绿屏视频，甚至添加 AI 配音。使用 Clipchamp 制作有趣的社交媒体视频、销售宣传视频、深度教程等。\n\n简便的编辑功能:\n\nClipchamp 的在线视频编辑器为你提供了重要的编辑工具。可以剪切、剪裁、裁剪、旋转、分割、制作 GIF、放大和缩小、加速或减速，以及添加或移除音频、滤镜和转场效果。此外，其他智能功能还可帮助你生成视频 - 无需相关经验。\n\n在 Clipchamp 中使用 AI 支持的功能提升视频编辑:\n\n- 使用自动创作功能轻松制作有趣的短视频。\n- 了解我们的文本转语音功能，该功能具有 170 种 AI 语音用于提供类似真人的配音。在各种口音和 70 种语言中选择不同的音调。\n- 探索用于自动添加字幕的智能语音检测功能，以 140 种语言快速生成字幕和可下载的脚本。\n\n录制音频、相机和屏幕:\n\n轻松创建录屏，然后将它们加入到教程视频、演示文稿甚至回应视频中。通过添加自己的录制配音，增强视频的清晰度、专业性，且使其更易于理解。\n\n有趣的库存视频和音频:\n\n搜索精选主题素材库，选择高质量视频、动画背景、贴纸、注释、音乐和音效，以完成创作。通过浏览我们直观的内容库，从数百万个免费和付费库存选项中进行选择。\n\n初学者友好模板，由设计人员制作:\n\n使用免费视频模板在几分钟内创建专业视频。使用视频、文本、品牌和背景音乐自定义模板。从 YouTube 游戏到销售，使用适用于任何行业的可编辑视频模板节省时间。\n\n将高质量视频保存并分享到你喜爱的应用中:\n\n以 480p、720p 或 1080p 分辨率免费将视频直接保存到计算机。直接发布到 YouTube、领英、TikTok 和 OneDrive。如果计算机存储空间不足，甚至可以使用安全的内容备份选项保存视频。\n\n面向创作者的特殊工具:\n\n- 制作 YouTube 简介、游戏亮点视频、视频邀请、拼贴视频，甚至使用 Clipchamp 创建视频播客。\n- 使用新的 Xbox 导入集成功能直接访问 Xbox 剪辑，无需文件传输。\n- 绿屏视频编辑器: 使用背景替换功能惊艳观看者。使用色度键特效快速替换视频的部分内容并添加叠加效果。\n- Meme 制作软件: 创建和分享循环播放视频和有趣的 GIF。\n\n面向企业的特殊工具:\n\n- 品牌套件: 使用我们的品牌套件上传品牌徽标、自定义字体、颜色和水印，并将其应用于任何视频。\n- 编辑公司视频: 跳过长电子邮件，使用网络摄像头录制器制作视频，或轻松美化会议录制内容。\n\n直观的快捷方式可帮助你更快地进行编辑:\n\n- 单击一下即可将视频调整为横屏、竖屏、正方形、社交、垂直或电影格式\n- 消除多个视频剪辑之间不需要的间隙以保持连续性\n- 协调视频图层并轻松编辑视频组\n- 尝试使用键盘快捷方式进行辅助编辑\n\n订阅计划:\n\n使用 Microsoft 365 个人版或家庭版订阅，解锁更多高级功能。探索高清 4K UHD 视频导出、高级库存素材，获享品牌套件工具，并将视频安全备份至 OneDrive，以便随时在任意设备上继续编辑。\n\n向我们发送反馈和功能请求:\n\n请在 App Store 中留下评分和评价，以便其他人可以开心加入。', 'https://store-images.s-microsoft.com/image/apps.5708.14506576373691712.38ff9222-3a7a-460d-8e7a-1bd12852f54b.2c42ca23-04f2-4215-9a2c-5189c1aa9686', '/assets/images/products/9p1j8s7ccwwt.png', '3.6', 0, '照片与视频', '', 'free', '', '', 'https://apps.microsoft.com/detail/9p1j8s7ccwwt?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Microsoft Corporation', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:20:15'),
(73, '9pjn1f4bf2mh', 'Zip Captions', 'Zip Captions is a new take on Live Captioning. Bring captions to life right in your browser, turning speech into text in a variety of contexts. Zip Captions supports broadcasting and receiving captions between devices, sending captions to a variety of online video platforms via OBS, and a whole mountain of customisation. Get more accurate captioning results with our latest captioning engine which can be defined in the settings.\n\nZip Captions also allows you to transcribe your captions, making them available later, and allowing you to read back and edit your captions with ease. They can then be sent to online video platforms using .srt and .vtt files as well as saving as a .txt file.\n\nZip Captions will also sync your settings with our cloud, while ensuring that your privacy comes first.', 'https://store-images.s-microsoft.com/image/apps.1229.14283635970765358.7e308ce6-33be-43e2-a1da-d0a0a2014615.32f8a088-253a-4243-beea-4ba044668057', '/assets/images/products/9pjn1f4bf2mh.png', '0.0', 0, '实用程序与工具', '', 'free', '', '', 'https://apps.microsoft.com/detail/9pjn1f4bf2mh?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', '', '2026-02-24 18:05:54', '2026-02-25 06:20:15'),
(74, '9wzdncrfj2wl', 'Facebook', NULL, 'https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9', '/assets/images/products/9wzdncrfj2wl.png', '0.0', 0, '社交', '', 'free', '', '', 'https://apps.microsoft.com/detail/9wzdncrfj2wl?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Meta', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', 'https://store-images.s-microsoft.com/image/apps.16054.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.07640ca7-c177-4ef3-8d87-b4b06865f65b', '2026-02-24 18:05:54', '2026-02-25 06:47:06'),
(75, 'xpdc2rh70k22mn', 'Discord', NULL, 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsG72wAo9EWJR4yQWyJJaDaK1XdUso6cUMpI9hAdPUU_FNs11cY1X284vsHrnWtRw7oqRpN1m9YAg21d_aNKnIo-&format=source', '/assets/images/products/xpdc2rh70k22mn.png', '0.0', 0, '社交', '', 'free', '', '', 'https://apps.microsoft.com/detail/xpdc2rh70k22mn?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Discord Inc.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsG72wAo9EWJR4yQWyJJaDbq6OkcG4MWP_3P2O1JT_mfZ0D_uRxIC5Xq5o2caPlxotQXAYKXPy1MteziR.iiiXE-&format=source', '2026-02-24 18:05:54', '2026-02-25 06:48:51'),
(76, '9wzdncrfj4q7', 'LinkedIn', NULL, 'https://store-images.s-microsoft.com/image/apps.31120.9007199266245564.44dc7699-748d-4c34-ba5e-d04eb48f7960.bc4172bd-63f0-455a-9acd-5457f44e4473', '/assets/images/products/9wzdncrfj4q7.png', '0.0', 0, '社交', '', 'free', '', '', 'https://apps.microsoft.com/detail/9wzdncrfj4q7?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'LinkedIn', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', 'https://store-images.s-microsoft.com/image/apps.36248.9007199266245564.21afd347-b728-43e0-a391-a32e526e07d0.fcf67b53-b1ea-4fe9-88f9-83c9cd57bb0f', '2026-02-24 18:05:54', '2026-02-25 06:47:09'),
(77, '9pf9rtkmmq69', 'Snapchat', NULL, 'https://store-images.s-microsoft.com/image/apps.11172.14208673485779370.88f23073-7e41-4921-aef9-76103983bd31.bd7aed00-4801-4cec-b344-f2145cc46a1e', '/assets/images/products/9pf9rtkmmq69.png', '0.0', 0, '社交', '', 'free', '', '', 'https://apps.microsoft.com/detail/9pf9rtkmmq69?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Snap Inc.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', 'https://store-images.s-microsoft.com/image/apps.11812.14208673485779370.bb73a8cd-b201-4c17-bdb3-5c8edccb7dee.1ae91294-9c55-40c1-bc5f-1f51deff578b', '2026-02-24 18:05:54', '2026-02-25 06:47:12'),
(78, 'xp89119p9f2pcq', 'Signal', NULL, 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxn756ABW9EbgTVkhBYCTzd1nMB1XbsIFdxObznPYpig8dqfofks95zBrH0tomPKKKvr3u9YzQzUhPlmpKHOCRxg-&format=source', '/assets/images/products/xp89119p9f2pcq.png', '0.0', 0, '社交', '', 'free', '', '', 'https://apps.microsoft.com/detail/xp89119p9f2pcq?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Signal Messenger', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBb9vwDabMciD3mWr5V2H4KcVU1Ugn6lueUH3OII_a3rsBq95pWsv5..vRfAgnTftuPnl4qJS8iewUkjAMKF2Few-&format=source', '2026-02-24 18:05:54', '2026-02-25 06:49:44'),
(79, '9ntdqp5cqg07', 'Tumblr', NULL, 'https://store-images.s-microsoft.com/image/apps.21876.14420356529270456.a0e62d2f-10e7-480b-b5a1-cb70a39b4d1b.1c171f07-ecda-46f8-b6a6-0ee21135d1ec', '/assets/images/products/9ntdqp5cqg07.png', '0.0', 0, '社交', '', 'free', '', '', 'https://apps.microsoft.com/detail/9ntdqp5cqg07?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Automattic', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', 'https://store-images.s-microsoft.com/image/apps.59082.14420356529270456.a0e62d2f-10e7-480b-b5a1-cb70a39b4d1b.c7174aa5-2465-4c2f-ac8f-20647a6e6496', '2026-02-24 18:05:54', '2026-02-25 06:47:15'),
(80, '9ns3rbq5hv5f', 'Reddit', NULL, 'https://store-images.s-microsoft.com/image/apps.15970.14375561300249796.05fe8c27-ce9e-4144-8702-0e81e2f575b1.042364cb-b745-4796-a520-61291e2dd6b9', '/assets/images/products/9ns3rbq5hv5f.png', '0.0', 0, '社交', '', 'free', '', '', 'https://apps.microsoft.com/detail/9ns3rbq5hv5f?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Reddit Inc.', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', 'https://store-images.s-microsoft.com/image/apps.64571.14375561300249796.05fe8c27-ce9e-4144-8702-0e81e2f575b1.68f0b37a-5b11-4eda-b776-284744b97a29', '2026-02-24 18:05:54', '2026-02-25 06:47:17'),
(81, '9mxbp1fb84cq', 'Threads', NULL, 'https://store-images.s-microsoft.com/image/apps.29871.13897338724952727.a6cf0fa2-27f4-468b-9b9a-d1da7c39dcf0.75de6899-f118-441b-bc9d-f0e79e66616d', '/assets/images/products/9mxbp1fb84cq.png', '0.0', 0, '社交', '', 'free', '', '', 'https://apps.microsoft.com/detail/9mxbp1fb84cq?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, 'Meta', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', 'https://store-images.s-microsoft.com/image/apps.6514.13897338724952727.0ee0fb1f-31ff-4329-892c-cb671736b114.7fcc5e84-03a2-4db5-a875-6b919c9bd7a0', '2026-02-24 18:05:54', '2026-02-25 06:47:22'),
(82, '9pnzmmxqhqz5', '鹿鸣', NULL, 'https://store-images.s-microsoft.com/image/apps.13026.14334732666047884.deec7a73-e81e-4d5f-a770-a207af98163e.f76d8a94-a1b4-45a0-8dd8-3f9c215195ec', '/assets/images/products/9pnzmmxqhqz5.png', '0.0', 0, '社交', '', 'free', '', '', 'https://apps.microsoft.com/detail/9pnzmmxqhqz5?hl=zh-CN&gl=HK', '', '', '', NULL, '', 0, 'app', 0, '', NULL, NULL, '', '', '', NULL, '', '', NULL, '', '', '', 'https://store-images.s-microsoft.com/image/apps.34242.14334732666047884.deec7a73-e81e-4d5f-a770-a207af98163e.645b94b8-301b-4c8b-bdfe-6b6013a1e0fb', '2026-02-24 18:05:54', '2026-02-25 06:47:27'),
(83, 'xpdlt6q62bfqkz', 'ToDesk', '‌‌ToDesk是一款多平台远程协作软件，比传统远程控制软件效率更高\n\nToDesk远程控制是一款性能卓越、操作流畅的远程控制软件，适用于电脑、手机及平板设备之间的无缝连接与操作。该软件拥有超过2.3亿的用户支持数，每月实现超过50亿分钟的安全连接时间。此外，ToDesk采用端对端加密技术，确保每一次远程访问的安全性与可靠性。\n注意：应用中有包含未由Microsoft提供的驱动程序：ToDeskAudio.sys、TdGamepad.sys、zlportmonitor.dll、zlpscript5.dll 。', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBbsLQ9C5LofTcpCpSM0VlWZo.nGWvaJq2S1RP5lze9gURPjKeIEOWBUc.zOJfCPklEIY2qlntEOOWptsVTE55jE-&format=source', '/assets/images/products/xpdlt6q62bfqkz.png', '4.5', 0, '实用程序与工具', '', 'free', '', '', 'https://apps.microsoft.com/detail/xpdlt6q62bfqkz?hl=zh-CN&gl=HK', '/todesk', '', '', '', '', 1, 'app', 0, 'Haiou Tech Inc.', NULL, NULL, '', '', '', NULL, '3+', 'https://store-images.s-microsoft.com/image/global.9404.image.ddda1b2c-d334-444b-b055-e23fec6772d7.13e2dfc1-450e-4973-bcbb-f35d2cc4f4ed', NULL, '', '', '', '', '2026-02-24 18:31:41', '2026-02-27 07:47:38'),
(84, 'xp8ljrrt557rdl', '搜狗输入法', '搜狗输入法是一款汉字为主，支持多语言的输入法工具。\n该软件包含AI搜索、AI帮写、AI快查、AI打字、语音输入、手写输入、五笔输入、AI宠物陪伴、细胞词库等功能。为保障这些功能的完整体验，部分功能可能需要授予相应权限才能正常使用。在快速打字输入的同时，在学习、办公、社交等场景中，还能做到边聊边搜、边写边搜，智能化提供参考信息。', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxkYcrqzXD4jEO5Vg9WgMKdDVUQKKFZCMNKvi8YHwECyCsOC3kdoiqFOMdPZI1FiJg06Zjw8U2U75A_gus03AUvU-&format=source', '/assets/images/products/xp8ljrrt557rdl.png', '3.4', 0, '实用程序与工具', '免费下载', 'free', '', '', 'https://apps.microsoft.com/detail/xp8ljrrt557rdl?hl=zh-CN&gl=HK', '/shurufa-sougou', '', '', NULL, '', 1, 'app', 0, '北京搜狗科技发展有限公司', NULL, NULL, '', '', '', NULL, '3+', 'https://store-images.s-microsoft.com/image/global.9404.image.ddda1b2c-d334-444b-b055-e23fec6772d7.13e2dfc1-450e-4973-bcbb-f35d2cc4f4ed', NULL, '', '', '', '', '2026-02-27 07:50:21', '2026-02-27 07:57:40'),
(86, 'xpfcc4cd725961', 'LINE Desktop', 'LINE改变了全球的通讯模式，使您无论身处何地，不仅能通过文字信息聊天，还能畅享免费的语音和视频通话。立即下载LINE，与您的亲朋好友保持密切联系。\n\n◆ 随时随地享受免费语音和视频通话。您可以在视频会议期间共享屏幕。\n无论您身在何处，都能免费享受高品质通话。最多可供500名成员同时加入群组通话。使用全新的共享屏幕功能，轻松进行视频会议和线上聚会。\n\n◆ 超方便的聊天功能！\n轻松收发来自好友的消息、照片、视频、贴图以及大型文件。\n\n◆ 自动同步您的设备和电脑\n永不错过LINE聊天！无论是在旅途中使用移动版，还是在家或在工作中使用桌面版，您的LINE都会在所有版本中自动同步。\n\n◆ 您的私人聊天室，Keep备忘录\n可以将备忘录、照片以及更多内容发送到您的专属Keep备忘录聊天室。 \n\n◆ Letter Sealing让您的聊天安全无忧\n您的所有聊天信息、通话和共享的位置信息均可经过Letter Sealing加密处理。在LINE中，您永远不用担心聊天安全问题！', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxhpcoRRmEZ4._56d00ABZ4VdKKC0aitRLImm6ziGyWP5nwLty3Zyzj0F7vnBBjUShltu4n9VxSloPSLX4_YZYBo-&format=source', '/assets/images/products/xpfcc4cd725961.png', '2.9', 0, '社交', '免费下载', 'free', '', '', 'https://apps.microsoft.com/detail/xpfcc4cd725961?hl=zh-CN&gl=HK', '/line-me', '', '', NULL, '', 1, 'app', 0, 'LINE (LY Corporation)', NULL, NULL, '', '', '', NULL, '12+', 'https://store-images.s-microsoft.com/image/global.32925.image.f2c0ad38-c096-4e05-a76f-5c72d9258eaa.ecc5c21f-6a74-416a-98c1-99967316380b', NULL, '', '', '', '', '2026-02-27 07:50:32', '2026-02-27 07:57:41'),
(91, 'xp9klmld6nrzc5', '网易有道翻译', '【网易有道词典桌面端】正式改名为【网易有道翻译】\n——比强大更强大的翻译生产力工具，让你的电脑瞬间变身AIPC\n针对Windows平台特性，我们特别推出全新的版本，作为Windows系统下必备的翻译软件，在同类软件排行位居前列，10亿用户都在用！\n用AI重新定义翻译，WE DO MORE THAN TRANSLATION！\n【AI翻译助手】\n翻译更精准，表达更地道，还能自由问答～\n随时随地选中长句段落或截图，即可唤起功能～\n【AIBox 跨软件工具】\n选中长句段落，智能润色、改写、纠错一步到位～\n-句子润色：为你提供五种语言风格，一键升级地道高级句；\n-语法纠错：母语级纠错，帮你调整词汇、语法、结构；\n-写作建议：优化文章的同时为你提供写作建议；\n-重点提炼：复杂长文精准提炼重点；\n-单词百科：无需打开搜索引擎，即可快速检索语句百科知识；\n【AI文档翻译·问答】\n-一键上传文档，全文翻译；\n-支持多格式、多语种、多专业领域；\n-保留原文排版，双语对照查看；\n-便捷译后批注，支持一键导出；\n-同时还能自动总结，深度问答；\n-已开放240万字符/年免费翻译额度，让你想翻就翻，随手就翻，敞开了翻！\n【AI写作】\n-一键成文，AI快速生成邮件、通知模板内容，提高生产力；\n-母语级润色、扩写、总结、去重等功能助力内容质量提升；\n-智能纠错，智能识别200种错误，覆盖语法、词汇、拼写、格式等；\n【AI一键创作PPT】\n只需输入主题，即刻生成一份布局配色丰富的PPT~\n强大的桌面翻译软件，什么都能帮你翻！\n【有道词典】\n-实时收录最新词汇；支持英汉、日汉、韩汉、法汉、德汉、俄汉、葡汉、西汉互译；\n-完整收录《学习型牛津词典》、《新牛津英汉双解大词典》、《韦氏大学英语词典》、《柯林斯COBUILD高级英汉双解词典》、《新世纪日汉双解大辞典》、龙朝《韩中词典》《中韩词典》等权威词典；\n-单词图谱：可视化词典+思维导图记忆法；\n-单词笔记：支持添加单词笔记，同步保存单词本；\n【文本翻译】\n-长短句实时翻译，109种语言互译，26种常用语种tts发音；；\n-支持医学、计算机、金融经济三种专业领域翻译；\n-提供42个专业术语库&上传自定义术语库；\n【音频翻译】\n-从听到看，一键搞定；\n-中英文音频快速转录->翻译->整理为高质量文本；\n-支持100MB以内的MP3、WAV、AAC多种音频格式；\n【视频翻译】\n-字幕制作，省时高效；\n-提取视频内原字幕->翻译->生成新字幕；\n-自动生成字幕时间轴，一键导出srt字幕文件；\n【截图翻译】\n-按下Ctrl+Alt+D，选取屏幕上的任意区域实现快速翻译；\n-截屏翻译结果支持一键钉至屏幕，随时进行下一次翻译。多次截屏翻译的结果同时查看，省时高效；\n【图片翻译】\n-快速识别、提取、翻译图片中的文本，支持99种语言；\n【同传翻译】\n支持中英日韩等14种语言互译，实时展示多人同传翻译字幕；\n【mini窗口】\n小窗口便捷查词，超省空间；\n【网页翻译】\n输入网址快速翻译网页内容，保持原排版信息，阅读体验舒适流畅；\n【人工翻译】\n提供专业定制化服务；\n\n【超级会员自动续费说明】\n1、服务名称：超级会员自动续费\n2、价格：38元/月\n3、购买会员自动续费的账号，会在每个月到期前24小时，自动在购买账户扣费并延长1个月会员有效期。\n4、如需取消订阅，请打开支付宝--> 点击“设置”中的 “支付设置”，取消“有道词典VIP服务”订阅即可。如未在订阅期结束的至少24小时前关闭订阅，此订阅将会自动续订。\n5、会员自动续费服务协议：https://c.youdao.com/dict/law/renew.html\n6、隐私协议：https://c.youdao.com/dict/law/youdaofanyi_pc_privacy.html\n【联系我们】\n微信：有道翻译\n官方网站：https://fanyi.youdao.com/download', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxgb7Z.zS2isNZBi.ayn4.nTLI3W2.RmkKwxPZbWKyyDn7iK0KBq0SdMZ.L.EYTZOXavgsLNwZZPcFatUh0NSTgU-&format=source', '/assets/images/products/xp9klmld6nrzc5.png', '3.0', 0, '书籍与参考', '免费下载', 'free', '', '', 'https://apps.microsoft.com/detail/xp9klmld6nrzc5?hl=zh-CN&gl=HK', '/youdao-fy', '', '', NULL, '', 1, 'app', 0, 'NetEase Youdao Information Technology', NULL, NULL, '', '', '', NULL, '18+', 'https://store-images.s-microsoft.com/image/global.39347.image.1ab912d3-d93c-4b3a-9b9f-511c8b8fef73.318bd350-ab48-4aae-aa58-cd0e8cb1559c', NULL, '', '', '', '', '2026-02-27 07:50:53', '2026-02-27 07:57:42'),
(95, 'xpdfbf0g6m2w2c', 'WPS Office 个人版', 'WPS Office“新升级”，一站式办公服务平台，无广告，有AI，办公更高效\nWPS AI\nAI 办公的神奇体验。你现可通过 WPS AI 官网（ai.wps.cn）了解更多智能办公玩法，申请加入智能办公体验官，就有机会体验 AI 生成方案、提出妙想、制作精美的 PPT等能力。\n全新视觉设计\n视觉设计焕然一新，带给你更具家族一致性的视觉体验。功能布局更有序、合理，让你享受沉浸式办公，创作灵感不间断。\n皮肤外观模糊效果\n与桌面壁纸联动，支持切换为「模糊效果」外观，让你的WPS界面看上去是半透明的、能隐约看到桌面背景的效果，为你创造一个更沉浸式的良好办公体验。\n新建模板页\n功能和页面布局升级焕新！新增「风格主题」演示模板，满足用户选主题即能创作的需求，无需删除冗余内容；简化操作流程，支持多维度分类筛选，提升找模板和创建文档的效率。\n全新文档品类\n智能文档、智能表格、智能表单三大新组件上线！更轻便高效的文档处理体验等你探索。👉点击了解更多\n新协作体验\n「协作」很简单。拨动开关即可获得文档链接，邀请他人浏览、评论，或者与你一起编辑。随时开启，随时停止，由你来掌控。\n打印改版\n将打印对话框、页面设置对话框、打印预览中的设置项，统一整合至新版打印预览的设置面板，实现打印设置在预览视图下的所见即所得，帮助用户一站式完全打印。\nWPS随行\n无需借助其他软件进行文档传输，在WPS内即可将文件快捷发送给指定「我的设备」。接收设备的WPS也会有清晰的消息接收提醒，不必担心错过文档消息。\n同时，你也可以点击WPS页面右上角「随行」按钮，打开「传输助手」发送和查看传输文件。\n预设样式\n优化了文字、表格以及演示文档中的常用对象样式，提升了视觉美感与易用性。\n使用入口：\n1. 在「插入」选项卡下，选择形状/表格/艺术字\n2. 选中已有形状后，在「绘图工具」/「文本工具」选项卡下，切换预设样式和颜色\n稻壳资源升级\n图库全新升级，统一整合图片、免抠、人像、插画、图标等多种类型素材，线性、面性、线面图标支持自由填充颜色，插入时一键适配文档主题色，帮助用户轻松创作。\n简化了演示文档的操作步骤，整合内容分类，支持多维度筛选项，提供跟随文档主题插入，让你根据自己的喜好更高效地插入单页幻灯片。', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxhCyWkCEH3ctacRjCiaFbI8thzUqQeoNf5UO6dPiPI8QyVd2umc.WuV84BKSTBKornOFRUON0BaWhyHCXZfxO6o-&format=source', '/assets/images/products/xpdfbf0g6m2w2c.png', '2.3', 0, '高效工作', '免费下载', 'free', '', '', 'https://apps.microsoft.com/detail/xpdfbf0g6m2w2c?hl=zh-CN&gl=HK', '/wps-excel', '', '', NULL, '', 1, 'app', 0, '北京金山办公软件股份有限公司', NULL, NULL, '', '', '', NULL, '3+', 'https://store-images.s-microsoft.com/image/global.9404.image.ddda1b2c-d334-444b-b055-e23fec6772d7.13e2dfc1-450e-4973-bcbb-f35d2cc4f4ed', NULL, '', '', '', '', '2026-02-27 07:51:06', '2026-02-27 07:57:43'),
(96, 'xpddrbq2d1n7nj', '向日葵远程控制', '向日葵远程控制是一款可以对远程电脑进行管理和控制的服务软件。用户可免费使用远程控制、文件传输功能，向日葵远程控制可实现对远程主机进行远程管理、远程文件、远程摄像头、远程重启关机等操作。\n\n软件支持windows、Linux、Mac、iOS和Android等系统间远控。可实现手机控制电脑、(平板)电脑控制电脑、电脑控制手机、手机控制手机等等操作。不仅在用于个人用户，也普遍应用于各大领域，主要用户人群为企业、学校、网管等。其主要功能是远程办公、远程维护、远程监控、VPN组网等。注意：应用卸载后在C盘会有文件残留', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBUPoAV7IWf4N9aBTOry356m0cYwI_BxBXZSZ4GVBD4H1hid7jSrVSCTdvjqzF6l984jHmSptEi2mG5CPq.g8bMM-&format=source', '/assets/images/products/xpddrbq2d1n7nj.png', '2.3', 0, '实用程序与工具', '免费下载', 'free', '', '', 'https://apps.microsoft.com/detail/xpddrbq2d1n7nj?hl=zh-CN&gl=HK', '/sunlogin-orayc', '', '', NULL, '', 1, 'app', 0, '上海贝锐信息科技股份有限公司', NULL, NULL, '', '', '', NULL, '3+', 'https://store-images.s-microsoft.com/image/global.9404.image.ddda1b2c-d334-444b-b055-e23fec6772d7.13e2dfc1-450e-4973-bcbb-f35d2cc4f4ed', NULL, '', '', '', '', '2026-02-27 07:51:10', '2026-02-27 07:57:44');

-- --------------------------------------------------------

--
-- 表的结构 `product_reviews`
--

CREATE TABLE `product_reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `author_name` varchar(100) DEFAULT '',
  `rating` decimal(2,1) DEFAULT '5.0',
  `title` varchar(500) DEFAULT '',
  `content` text,
  `pros` text,
  `cons` text,
  `summary` text,
  `helpful_count` int(11) DEFAULT '0',
  `unhelpful_count` int(11) DEFAULT '0',
  `status` enum('draft','published') DEFAULT 'published',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `product_reviews`
--

INSERT INTO `product_reviews` (`id`, `product_id`, `author_name`, `rating`, `title`, `content`, `pros`, `cons`, `summary`, `helpful_count`, `unhelpful_count`, `status`, `created_at`, `updated_at`) VALUES
(6, 83, '努力搬砖的小王', '5.0', '远程办公的神器，比某Viewer好用多了', '从疫情期间就开始用ToDesk了，一直到现在。连接非常稳定，画质也很清晰，基本上感觉不到延迟，远程写代码完全没问题。最重要的是操作逻辑符合国人习惯，文件传输速度也很快，大大提高了我的工作效率。国产软件能做到这个程度真的很不容易，支持一下！', '延迟极低，画质清晰，文件传输快，操作简单。', '由于用户量增加，偶尔在高峰期连接会稍微慢一点点。', '目前国内最好用的远程控制软件，没有之一。', 0, 0, 'published', '2026-02-26 15:54:13', '2026-02-26 15:54:13'),
(11, 83, '码农老王', '4.5', '个人免费版够用，连接挺稳', '换了好几个远程桌面软件，最后还是留下了ToDesk。主要是因为连接速度确实快，而且免费版的功能对于偶尔在家办公处理下紧急情况完全足够。画质调节也比较灵活，基本没感觉到明显的延迟，比以前用的某款老牌软件流畅多了。', '连接稳定，免费版功能良心，操作界面简洁易上手。', '偶尔会出现登录状态失效的情况，需要重新扫码登录，有点麻烦。', '目前市面上综合体验最好的国产远程工具之一。', 0, 0, 'published', '2026-02-27 03:11:45', '2026-02-27 03:11:45'),
(12, 83, '影音剪辑小张', '3.0', '延迟还是有点明显，付费版价格略高', '用来做简单的文字处理还行，但如果想远程剪视频或者看高清视频，延迟还是挺严重的，经常卡帧。而且最近感觉免费版的限制越来越多了，专业版的价格对我这种偶尔使用的用户来说性价比一般。', '跨平台支持做得很好，手机端也能轻松控制电脑。', '高负载下延迟大，收费策略感觉越来越激进。', '基础办公可以，高性能需求还是差点意思。', 0, 0, 'published', '2026-02-27 03:11:45', '2026-02-27 03:11:45'),
(13, 83, '极客小飞', '5.0', '远程运维神器，墙裂推荐', '作为一个运维，经常需要随时随地接入公司服务器或者帮同事处理电脑问题。ToDesk的设备列表功能太方便了，不用每次都输入ID，登录账号直接点击就能连。文件传输速度也很快，基本没掉过链子，极大地提高了我的工作效率。', '设备管理非常方便，文件传输速度极快，安全性高。', '暂无明显缺点，希望后续能保持现在的流畅度。', '效率极高，是运维人员的必备利器。', 0, 0, 'published', '2026-02-27 03:11:45', '2026-02-27 03:11:45'),
(14, 9, '极客小陈', '5.0', '最好用的桌面端即时通讯软件，没有之一', '作为一个重度电脑使用者，Telegram Desktop 的体验简直完美。首先是它的多端同步速度极快，手机上发的消息电脑秒同步。其次是界面非常清爽，没有任何广告和臃肿的功能。最喜欢它的文件传输功能，支持超大文件，而且不会像某些国产软件那样把文件过期清理掉。各种快捷键支持也非常好，大大提升了办公效率。', '同步极快，界面简洁，文件传输强大，跨平台体验一致。', '由于网络环境原因，在国内使用需要一定的代理配置门槛。', '生产力工具中的佼佼者，极简且强大。', 0, 0, 'published', '2026-02-27 03:13:01', '2026-02-27 03:13:01'),
(15, 9, '浮生若梦', '4.0', '简洁好用，但对新手稍微有点门槛', '软件本身非常轻量级，启动速度很快，占用的内存也很小，比国内的主流聊天软件强多了。功能上，机器人和频道功能非常丰富，订阅了很多有用的资讯。但是，对于普通用户来说，官方不自带中文语言包，需要自己手动汉化，这点不太友好。另外，网络代理的设置对小白用户来说也需要研究一下。', '运行流畅，占用资源极低，功能扩展性极强。', '官方不自带中文，初次配置网络环境较麻烦。', '极简主义者的首选，但汉化和网络配置稍显麻烦。', 0, 0, 'published', '2026-02-27 03:13:01', '2026-02-27 03:13:01');

-- --------------------------------------------------------

--
-- 表的结构 `product_stats`
--

CREATE TABLE `product_stats` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `stat_date` date NOT NULL,
  `view_count` int(11) DEFAULT '0',
  `download_click_count` int(11) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `product_stats`
--

INSERT INTO `product_stats` (`id`, `product_id`, `stat_date`, `view_count`, `download_click_count`, `created_at`, `updated_at`) VALUES
(1, 9, '2026-02-27', 6, 3, '2026-02-27 06:12:41', '2026-02-27 06:17:27'),
(10, 84, '2026-02-27', 6, 0, '2026-02-27 07:55:39', '2026-02-27 07:56:36'),
(16, 86, '2026-02-27', 4, 0, '2026-02-27 07:56:50', '2026-02-27 07:57:51'),
(20, 95, '2026-02-27', 2, 0, '2026-02-27 07:58:02', '2026-02-27 07:58:02'),
(22, 91, '2026-02-27', 2, 1, '2026-02-27 07:58:57', '2026-02-27 07:59:04');

-- --------------------------------------------------------

--
-- 表的结构 `related_products`
--

CREATE TABLE `related_products` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `related_ms_id` varchar(50) NOT NULL,
  `related_title` varchar(500) DEFAULT '',
  `related_icon_url` varchar(1000) DEFAULT '',
  `related_rating` decimal(2,1) DEFAULT '0.0',
  `related_category` varchar(200) DEFAULT '',
  `related_price` varchar(100) DEFAULT '',
  `display_order` int(11) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `related_products`
--

INSERT INTO `related_products` (`id`, `product_id`, `related_ms_id`, `related_title`, `related_icon_url`, `related_rating`, `related_category`, `related_price`, `display_order`, `created_at`) VALUES
(49, 9, '9n97zckpd60q', 'Telegram for Windows (Unigram)', 'https://store-images.s-microsoft.com/image/apps.55245.13537716651231321.3067a421-6c2f-48a9-b77c-1e38e19146e6.10e2aa49-52ca-4e79-9a61-b6422978afb9', '4.3', '社交', '免费下载', 1, '2026-02-27 03:06:51'),
(50, 9, '9nksqgp7f2nh', 'WhatsApp', 'https://store-images.s-microsoft.com/image/apps.8453.13655054093851568.4a371b72-2ce8-4bdb-9d83-be49894d3fa0.7f3687b9-847d-4f86-bb5c-c73259e2b38e', '4.2', '社交', '免费下载', 2, '2026-02-27 03:06:51'),
(51, 9, '9nblggh5l9xt', 'Instagram', 'https://store-images.s-microsoft.com/image/apps.43327.13510798887167234.cadff69d-8229-427b-a7da-21dbaf80bd81.79b8f512-1b22-45d6-9495-881485e3a87e', '4.1', '社交', '免费下载', 3, '2026-02-27 03:06:51'),
(52, 9, '9wzdncrfj140', 'Twitter', 'https://store-images.s-microsoft.com/image/apps.60673.9007199266244427.4d45042b-d7a5-4a83-be66-97779553b24d.5d82b7eb-9734-4b51-b65d-a0383348ab1b', '3.7', '社交', '免费下载', 4, '2026-02-27 03:06:51'),
(53, 9, '9wzdncrfj2wl', 'Facebook', 'https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9', '3.7', '社交', '免费下载', 5, '2026-02-27 03:06:51'),
(54, 9, '9nbdxk71nk08', 'WhatsApp Beta', 'https://store-images.s-microsoft.com/image/apps.8453.13518859748920827.4d7dd838-9f34-4ad2-9cd7-b861c6398fc1.11cbb3d4-ffd9-42c1-82bd-e3f305d562b1', '4.1', '社交', '免费下载', 6, '2026-02-27 03:06:51'),
(55, 83, 'xpdcxjn23qzs83', 'ZZ加速器', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBZNot9BlBaatqWxHyWhtxyqCey2AOpBZN5fJdSfWTd3oTQzIxW.SFoNhfIiUqqwGZckugrufNPMIGYMb4EGxomI-&format=source', '0.0', '实用程序与工具', '免费下载', 1, '2026-02-27 03:06:54'),
(56, 83, 'xpddrbq2d1n7nj', '向日葵远程控制', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBUPoAV7IWf4N9aBTOry356m0cYwI_BxBXZSZ4GVBD4H1hid7jSrVSCTdvjqzF6l984jHmSptEi2mG5CPq.g8bMM-&format=source', '2.8', '实用程序与工具', '免费下载', 2, '2026-02-27 03:06:54'),
(57, 83, 'xp98vjjhf42l48', 'UU加速器', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsOhCbG.dcEyP7BxyaSkHAZ623BaxAes8D2uELm.m93Jdm0KN3HVBGPILRmW66wurHsIIy_9A6DGCZDSK0s_vLY-&format=source', '3.7', '实用程序与工具', '免费下载', 3, '2026-02-27 03:06:54'),
(58, 83, 'xp8bwxv3xv04bn', 'QQ音乐', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxqVsdLbpDv4LNQ4nk3d9Q3MRbQmRgOnDGkyOSqi_SRZZ_DD5hdySup8v1Ei67NveXTTRxHr1Fb9QPpknHGRM4LE-&format=source', '2.8', '音乐', '免费下载', 4, '2026-02-27 03:06:54'),
(59, 83, 'xpfff85mxbsmg4', '雷神加速器', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBZ1lknWHmQL9mRGBeFY2at4Gl4EtBDlwG0_ZrsxeUP88FPOW1tei9FfyNSvderR4ippBw7l78cHFgGpUXQ_pScQ-&format=source', '0.0', '娱乐', '免费下载', 5, '2026-02-27 03:06:54'),
(60, 83, 'xpfp03dhsn0s5k', 'QQ桌面版', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBXFISlYwXVesbHkhiBXtsK18K7WQgno_NqCt2UISBsabLON5F9cxxFLXQh_S9G8BhSrbKpXaZ6V3EAw9B3P_oKg-&format=source', '1.8', '社交', '免费下载', 6, '2026-02-27 03:06:54'),
(61, 84, 'xpddzt4s3lf63g', '百度输入法', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxvViBbiShBNNM8KHrE8dlayNqWyJGCr8QAQcEldBcdtH0JubCiqzccparOJU4lq1vKuHfpMyIYkqRJhKb787TpI-&format=source', '2.4', '实用程序与工具', '免费下载', 1, '2026-02-27 07:51:13'),
(62, 84, 'xpdfbf0g6m2w2c', 'WPS Office 个人版', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxhCyWkCEH3ctacRjCiaFbI8thzUqQeoNf5UO6dPiPI8QyVd2umc.WuV84BKSTBKornOFRUON0BaWhyHCXZfxO6o-&format=source', '2.4', '高效工作', '免费下载', 2, '2026-02-27 07:51:13'),
(63, 84, 'xpfp03dhsn0s5k', 'QQ桌面版', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBXFISlYwXVesbHkhiBXtsK18K7WQgno_NqCt2UISBsabLON5F9cxxFLXQh_S9G8BhSrbKpXaZ6V3EAw9B3P_oKg-&format=source', '1.8', '社交', '免费下载', 3, '2026-02-27 07:51:13'),
(64, 84, 'xpfckbrnfzq62g', '微信', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxl33gjvYDEfZR.qiz4WDwgYHYK0p6FXwsoxKR8BMbqSQ9y_bplPOOf672rNDEFz7UU4p64p6eaAPBkrAfxFVAsM-&format=source', '3.0', '社交', '免费下载', 4, '2026-02-27 07:51:13'),
(65, 84, 'xp9klmld6nrzc5', '网易有道翻译', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxgb7Z.zS2isNZBi.ayn4.nTLI3W2.RmkKwxPZbWKyyDn7iK0KBq0SdMZ.L.EYTZOXavgsLNwZZPcFatUh0NSTgU-&format=source', '2.9', '书籍与参考', '免费下载', 5, '2026-02-27 07:51:13'),
(66, 84, 'xp8bwxv3xv04bn', 'QQ音乐', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxqVsdLbpDv4LNQ4nk3d9Q3MRbQmRgOnDGkyOSqi_SRZZ_DD5hdySup8v1Ei67NveXTTRxHr1Fb9QPpknHGRM4LE-&format=source', '2.8', '音乐', '免费下载', 6, '2026-02-27 07:51:13'),
(73, 86, 'xpfckbrnfzq62g', '微信', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxl33gjvYDEfZR.qiz4WDwgYHYK0p6FXwsoxKR8BMbqSQ9y_bplPOOf672rNDEFz7UU4p64p6eaAPBkrAfxFVAsM-&format=source', '3.0', '社交', '免费下载', 1, '2026-02-27 07:51:21'),
(74, 86, '9nksqgp7f2nh', 'WhatsApp', 'https://store-images.s-microsoft.com/image/apps.8453.13655054093851568.4a371b72-2ce8-4bdb-9d83-be49894d3fa0.7f3687b9-847d-4f86-bb5c-c73259e2b38e', '4.2', '社交', '免费下载', 2, '2026-02-27 07:51:21'),
(75, 86, '9mxbp1fb84cq', 'Threads, an Instagram app', 'https://store-images.s-microsoft.com/image/apps.29871.13897338724952727.a6cf0fa2-27f4-468b-9b9a-d1da7c39dcf0.75de6899-f118-441b-bc9d-f0e79e66616d', '2.8', '社交', '免费下载', 3, '2026-02-27 07:51:21'),
(76, 86, '9wzdncrfj2wl', 'Facebook', 'https://store-images.s-microsoft.com/image/apps.37935.9007199266245907.b029bd80-381a-4869-854f-bac6f359c5c9.91f8693c-c75b-4050-a796-63e1314d18c9', '3.7', '社交', '免费下载', 4, '2026-02-27 07:51:21'),
(77, 86, 'xpdc2rh70k22mn', 'Discord', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsG72wAo9EWJR4yQWyJJaDaK1XdUso6cUMpI9hAdPUU_FNs11cY1X284vsHrnWtRw7oqRpN1m9YAg21d_aNKnIo-&format=source', '4.3', '社交', '免费下载', 5, '2026-02-27 07:51:21'),
(78, 86, '9nblggh5l9xt', 'Instagram', 'https://store-images.s-microsoft.com/image/apps.43327.13510798887167234.cadff69d-8229-427b-a7da-21dbaf80bd81.79b8f512-1b22-45d6-9495-881485e3a87e', '4.1', '社交', '免费下载', 6, '2026-02-27 07:51:21'),
(97, 91, 'xp8ljrrt557rdl', '搜狗输入法', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxkYcrqzXD4jEO5Vg9WgMKdDVUQKKFZCMNKvi8YHwECyCsOC3kdoiqFOMdPZI1FiJg06Zjw8U2U75A_gus03AUvU-&format=source', '3.6', '实用程序与工具', '免费下载', 1, '2026-02-27 07:51:42'),
(98, 91, 'xpdfbf0g6m2w2c', 'WPS Office 个人版', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxhCyWkCEH3ctacRjCiaFbI8thzUqQeoNf5UO6dPiPI8QyVd2umc.WuV84BKSTBKornOFRUON0BaWhyHCXZfxO6o-&format=source', '2.4', '高效工作', '免费下载', 2, '2026-02-27 07:51:42'),
(99, 91, '9nnptjjgtlfj', '欧路词典 桌面版', 'https://store-images.s-microsoft.com/image/apps.58848.13738437892640145.56006a9b-8502-4484-adac-86742c42d703.25c06efb-0d3c-49b4-a6e5-023a4cd133e1', '4.0', '教育', '免费下载', 3, '2026-02-27 07:51:42'),
(100, 91, 'xpfckbrnfzq62g', '微信', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxl33gjvYDEfZR.qiz4WDwgYHYK0p6FXwsoxKR8BMbqSQ9y_bplPOOf672rNDEFz7UU4p64p6eaAPBkrAfxFVAsM-&format=source', '3.0', '社交', '免费下载', 4, '2026-02-27 07:51:42'),
(101, 91, 'xpdnqchb387bjt', '我们的翻译官-实时语音翻译软件', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBYeJt3uPRYQY.TUPzcPm6z7bxe8.ClZPhQiNkjsUI_XzSEwEB4hG_4BKLvgZUhBJWNG4SjXAKVkjarZASJWUpKI-&format=source', '2.2', '高效工作', '免费下载', 5, '2026-02-27 07:51:42'),
(102, 91, 'xpfp03dhsn0s5k', 'QQ桌面版', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBXFISlYwXVesbHkhiBXtsK18K7WQgno_NqCt2UISBsabLON5F9cxxFLXQh_S9G8BhSrbKpXaZ6V3EAw9B3P_oKg-&format=source', '1.8', '社交', '免费下载', 6, '2026-02-27 07:51:42'),
(121, 95, 'xp8ljrrt557rdl', '搜狗输入法', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxkYcrqzXD4jEO5Vg9WgMKdDVUQKKFZCMNKvi8YHwECyCsOC3kdoiqFOMdPZI1FiJg06Zjw8U2U75A_gus03AUvU-&format=source', '3.6', '实用程序与工具', '免费下载', 1, '2026-02-27 07:51:59'),
(122, 95, 'xpfckbrnfzq62g', '微信', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxl33gjvYDEfZR.qiz4WDwgYHYK0p6FXwsoxKR8BMbqSQ9y_bplPOOf672rNDEFz7UU4p64p6eaAPBkrAfxFVAsM-&format=source', '3.0', '社交', '免费下载', 2, '2026-02-27 07:51:59'),
(123, 95, 'xpfp03dhsn0s5k', 'QQ桌面版', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBXFISlYwXVesbHkhiBXtsK18K7WQgno_NqCt2UISBsabLON5F9cxxFLXQh_S9G8BhSrbKpXaZ6V3EAw9B3P_oKg-&format=source', '1.8', '社交', '免费下载', 3, '2026-02-27 07:51:59'),
(124, 95, '9mtwcd8h4f5p', 'sFree Office 专业免费文档PDF办公', 'https://store-images.s-microsoft.com/image/apps.58745.13804708580675528.8f7b68c5-8da5-49f9-97f2-3f34630748e5.096b0759-7c41-4f15-91ce-7a9a1b005220', '4.7', '高效工作', '免费下载', 4, '2026-02-27 07:51:59'),
(125, 95, 'xp8bwxv3xv04bn', 'QQ音乐', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxqVsdLbpDv4LNQ4nk3d9Q3MRbQmRgOnDGkyOSqi_SRZZ_DD5hdySup8v1Ei67NveXTTRxHr1Fb9QPpknHGRM4LE-&format=source', '2.8', '音乐', '免费下载', 5, '2026-02-27 07:51:59'),
(126, 95, 'xp9klmld6nrzc5', '网易有道翻译', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxgb7Z.zS2isNZBi.ayn4.nTLI3W2.RmkKwxPZbWKyyDn7iK0KBq0SdMZ.L.EYTZOXavgsLNwZZPcFatUh0NSTgU-&format=source', '2.9', '书籍与参考', '免费下载', 6, '2026-02-27 07:51:59'),
(127, 96, 'xpdlt6q62bfqkz', 'ToDesk', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBbsLQ9C5LofTcpCpSM0VlWZo.nGWvaJq2S1RP5lze9gURPjKeIEOWBUc.zOJfCPklEIY2qlntEOOWptsVTE55jE-&format=source', '0.0', '实用程序与工具', '免费下载', 1, '2026-02-27 07:52:03'),
(128, 96, 'xpfp03dhsn0s5k', 'QQ桌面版', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBXFISlYwXVesbHkhiBXtsK18K7WQgno_NqCt2UISBsabLON5F9cxxFLXQh_S9G8BhSrbKpXaZ6V3EAw9B3P_oKg-&format=source', '1.8', '社交', '免费下载', 2, '2026-02-27 07:52:03'),
(129, 96, 'xp8ljrrt557rdl', '搜狗输入法', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxkYcrqzXD4jEO5Vg9WgMKdDVUQKKFZCMNKvi8YHwECyCsOC3kdoiqFOMdPZI1FiJg06Zjw8U2U75A_gus03AUvU-&format=source', '3.6', '实用程序与工具', '免费下载', 3, '2026-02-27 07:52:03'),
(130, 96, 'xpdfbf0g6m2w2c', 'WPS Office 个人版', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxhCyWkCEH3ctacRjCiaFbI8thzUqQeoNf5UO6dPiPI8QyVd2umc.WuV84BKSTBKornOFRUON0BaWhyHCXZfxO6o-&format=source', '2.4', '高效工作', '免费下载', 4, '2026-02-27 07:52:03'),
(131, 96, 'xp9klmld6nrzc5', '网易有道翻译', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxgb7Z.zS2isNZBi.ayn4.nTLI3W2.RmkKwxPZbWKyyDn7iK0KBq0SdMZ.L.EYTZOXavgsLNwZZPcFatUh0NSTgU-&format=source', '2.9', '书籍与参考', '免费下载', 5, '2026-02-27 07:52:03'),
(132, 96, 'xpdm1mxqk56wgn', '迅雷12', 'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxlyNKAjmGlswq5fLRrP3X9SOzHLpNalsNJLAkI9mcOB5sYxJIXIU1ubNWnw7T86iXesiskLL.c0QhXkqu28Yr4E-&format=source', '2.2', '实用程序与工具', '免费下载', 6, '2026-02-27 07:52:03');

-- --------------------------------------------------------

--
-- 表的结构 `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `page_key` varchar(50) NOT NULL,
  `title` varchar(500) DEFAULT '',
  `keywords` varchar(1000) DEFAULT '',
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `settings`
--

INSERT INTO `settings` (`id`, `page_key`, `title`, `keywords`, `description`) VALUES
(1, 'home', 'Microsoft Store', 'Microsoft Store', 'Microsoft Store'),
(2, 'apps', 'Microsoft Store', 'Microsoft Store', 'Microsoft Store'),
(3, 'games', 'Microsoft Store', 'Microsoft Store', 'Microsoft Store'),
(4, 'about', 'Microsoft Store', 'Microsoft Store', 'Microsoft Store'),
(5, 'articles', 'Microsoft Store', 'Microsoft Store', 'Microsoft Store');

--
-- 转储表的索引
--

--
-- 表的索引 `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_username` (`username`);

--
-- 表的索引 `ai_generate_article_tasks`
--
ALTER TABLE `ai_generate_article_tasks`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `ai_generate_review_tasks`
--
ALTER TABLE `ai_generate_review_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product` (`product_id`);

--
-- 表的索引 `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_slug` (`slug`);

--
-- 表的索引 `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_type_order` (`type`,`page`,`display_order`);

--
-- 表的索引 `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_page_order` (`page`,`display_order`);

--
-- 表的索引 `collection_products`
--
ALTER TABLE `collection_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_collection` (`collection_id`,`display_order`),
  ADD KEY `product_id` (`product_id`);

--
-- 表的索引 `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_ms_id` (`ms_id`),
  ADD KEY `idx_product_type` (`product_type`),
  ADD KEY `idx_is_own` (`is_own_product`);

--
-- 表的索引 `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product` (`product_id`),
  ADD KEY `idx_status` (`status`);

--
-- 表的索引 `product_stats`
--
ALTER TABLE `product_stats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_product_date` (`product_id`,`stat_date`),
  ADD KEY `idx_stat_date` (`stat_date`),
  ADD KEY `idx_product_id` (`product_id`);

--
-- 表的索引 `related_products`
--
ALTER TABLE `related_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_product` (`product_id`);

--
-- 表的索引 `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_page` (`page_key`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `ai_generate_article_tasks`
--
ALTER TABLE `ai_generate_article_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `ai_generate_review_tasks`
--
ALTER TABLE `ai_generate_review_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- 使用表AUTO_INCREMENT `collections`
--
ALTER TABLE `collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- 使用表AUTO_INCREMENT `collection_products`
--
ALTER TABLE `collection_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- 使用表AUTO_INCREMENT `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- 使用表AUTO_INCREMENT `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- 使用表AUTO_INCREMENT `product_stats`
--
ALTER TABLE `product_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- 使用表AUTO_INCREMENT `related_products`
--
ALTER TABLE `related_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- 使用表AUTO_INCREMENT `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 限制导出的表
--

--
-- 限制表 `ai_generate_review_tasks`
--
ALTER TABLE `ai_generate_review_tasks`
  ADD CONSTRAINT `ai_generate_review_tasks_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- 限制表 `collection_products`
--
ALTER TABLE `collection_products`
  ADD CONSTRAINT `collection_products_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collection_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- 限制表 `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- 限制表 `related_products`
--
ALTER TABLE `related_products`
  ADD CONSTRAINT `related_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
