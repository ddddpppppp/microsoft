-- Create database
CREATE DATABASE IF NOT EXISTS ms_store DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ms_store;

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ms_id VARCHAR(50) NOT NULL DEFAULT '',
    title VARCHAR(500) NOT NULL DEFAULT '',
    description TEXT,
    icon_url VARCHAR(1000) DEFAULT '',
    local_icon VARCHAR(500) DEFAULT '',
    rating DECIMAL(2,1) DEFAULT 0,
    category VARCHAR(200) DEFAULT '',
    price VARCHAR(100) DEFAULT '',
    price_type ENUM('free','paid','discount') DEFAULT 'free',
    original_price VARCHAR(100) DEFAULT '',
    discount_percent VARCHAR(20) DEFAULT '',
    original_url VARCHAR(1000) DEFAULT '',
    custom_url VARCHAR(1000) DEFAULT '',
    custom_title VARCHAR(500) DEFAULT '',
    custom_keywords VARCHAR(1000) DEFAULT '',
    custom_description TEXT,
    custom_download_url VARCHAR(1000) DEFAULT '',
    is_own_product TINYINT(1) DEFAULT 0,
    product_type ENUM('app','game') DEFAULT 'app',
    has_gamepass TINYINT(1) DEFAULT 0,
    developer VARCHAR(200) DEFAULT '',
    screenshots TEXT,
    social_card_image VARCHAR(500) DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_ms_id (ms_id),
    INDEX idx_product_type (product_type),
    INDEX idx_is_own (is_own_product)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Collections table
CREATE TABLE IF NOT EXISTS collections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL,
    type ENUM('computed','curated') DEFAULT 'computed',
    section_type ENUM('horizontal_scroll','grid','hero_cards','collection_cards','featured') DEFAULT 'horizontal_scroll',
    display_order INT DEFAULT 0,
    view_all_url VARCHAR(1000) DEFAULT '',
    page ENUM('home','apps','games') DEFAULT 'home',
    hero_image VARCHAR(500) DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_page_order (page, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Collection-Product relationship
CREATE TABLE IF NOT EXISTS collection_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    collection_id INT NOT NULL,
    product_id INT NOT NULL,
    display_order INT DEFAULT 0,
    INDEX idx_collection (collection_id, display_order),
    FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Banners (hero carousel + featured promotions)
CREATE TABLE IF NOT EXISTS banners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL DEFAULT '',
    subtitle VARCHAR(500) DEFAULT '',
    image_url VARCHAR(1000) DEFAULT '',
    local_image VARCHAR(500) DEFAULT '',
    link_url VARCHAR(1000) DEFAULT '',
    button_text VARCHAR(100) DEFAULT '',
    badge_text VARCHAR(100) DEFAULT '',
    display_order INT DEFAULT 0,
    type ENUM('hero','featured') DEFAULT 'hero',
    page ENUM('home','apps','games') DEFAULT 'home',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type_order (type, page, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Site settings (SEO per page)
CREATE TABLE IF NOT EXISTS settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_key VARCHAR(50) NOT NULL,
    title VARCHAR(500) DEFAULT '',
    keywords VARCHAR(1000) DEFAULT '',
    description TEXT,
    UNIQUE KEY uk_page (page_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default settings
INSERT INTO settings (page_key, title, keywords, description) VALUES
('home', 'Microsoft Store - 下载适用于 Windows 电脑的应用、游戏等', 'Microsoft Store,Windows,应用,游戏,下载', '浏览和下载适用于 Windows 电脑的应用、游戏等'),
('apps', '应用 - Microsoft Store', '应用,Windows应用,下载', '浏览和下载适用于 Windows 的应用'),
('games', '游戏 - Microsoft Store', '游戏,Windows游戏,PC游戏', '浏览和下载适用于 Windows 的游戏'),
('about', '关于 - Microsoft Store', '关于,Microsoft Store', '关于 Microsoft Store');

-- Articles/content
CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content LONGTEXT,
    slug VARCHAR(200) NOT NULL,
    status ENUM('draft','published') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, password_hash) VALUES
('admin', '$2y$10$L1xbJicxSqCW1PnIURlilupvuyrzuWDF3O5t8lvDj1HOSHubBK/Dq');
