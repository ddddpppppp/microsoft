-- Add new fields for detailed product information
ALTER TABLE products
    ADD COLUMN rating_count INT DEFAULT 0 AFTER rating,
    ADD COLUMN whats_new TEXT AFTER screenshots,
    ADD COLUMN release_date VARCHAR(50) DEFAULT '' AFTER whats_new,
    ADD COLUMN last_update VARCHAR(50) DEFAULT '' AFTER release_date,
    ADD COLUMN app_size VARCHAR(50) DEFAULT '' AFTER last_update,
    ADD COLUMN system_requirements TEXT AFTER app_size,
    ADD COLUMN age_rating VARCHAR(100) DEFAULT '' AFTER system_requirements,
    ADD COLUMN age_rating_icon VARCHAR(500) DEFAULT '' AFTER age_rating,
    ADD COLUMN supported_languages TEXT AFTER age_rating_icon,
    ADD COLUMN publisher_website VARCHAR(500) DEFAULT '' AFTER supported_languages,
    ADD COLUMN publisher_support VARCHAR(500) DEFAULT '' AFTER publisher_website,
    ADD COLUMN privacy_policy_url VARCHAR(500) DEFAULT '' AFTER publisher_support;

-- Related products table
CREATE TABLE IF NOT EXISTS related_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    related_ms_id VARCHAR(50) NOT NULL,
    related_title VARCHAR(500) DEFAULT '',
    related_icon_url VARCHAR(1000) DEFAULT '',
    related_rating DECIMAL(2,1) DEFAULT 0,
    related_category VARCHAR(200) DEFAULT '',
    related_price VARCHAR(100) DEFAULT '',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_product (product_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
