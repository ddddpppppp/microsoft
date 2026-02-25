USE ms_store;

CREATE TABLE IF NOT EXISTS ai_generate_tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL DEFAULT '',
    ai_provider ENUM('deepseek','gemini','openai') DEFAULT 'deepseek',
    prompt TEXT,
    category VARCHAR(200) DEFAULT '',
    auto_publish TINYINT(1) DEFAULT 0,
    schedule_type ENUM('once','interval','daily') DEFAULT 'once',
    interval_days INT DEFAULT 1,
    daily_time VARCHAR(10) DEFAULT '09:00',
    last_run_at TIMESTAMP NULL,
    next_run_at TIMESTAMP NULL,
    is_active TINYINT(1) DEFAULT 1,
    total_generated INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
