-- Product reviews table (AI-generated reviews displayed on detail pages)
CREATE TABLE IF NOT EXISTS product_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    author_name VARCHAR(100) DEFAULT '',
    rating DECIMAL(2,1) DEFAULT 5.0,
    title VARCHAR(500) DEFAULT '',
    content TEXT,
    pros TEXT,
    cons TEXT,
    summary TEXT,
    helpful_count INT DEFAULT 0,
    unhelpful_count INT DEFAULT 0,
    status ENUM('draft','published') DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_product (product_id),
    INDEX idx_status (status),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- AI review generation tasks table
CREATE TABLE IF NOT EXISTS ai_generate_review_tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) DEFAULT '',
    product_id INT NOT NULL,
    ai_provider VARCHAR(50) DEFAULT 'deepseek',
    prompt TEXT,
    num_reviews INT DEFAULT 3,
    auto_publish TINYINT DEFAULT 0,
    schedule_type ENUM('once','interval','daily') DEFAULT 'once',
    interval_days INT DEFAULT 1,
    daily_time VARCHAR(10) DEFAULT '09:00',
    is_active TINYINT DEFAULT 1,
    last_run_at DATETIME DEFAULT NULL,
    next_run_at DATETIME DEFAULT NULL,
    total_generated INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_product (product_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
