<?php
/**
 * Migration script to add new product detail fields
 * Run via browser: http://localhost:8080/scripts/migrate_product_details.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 1);

define('BASE_PATH', dirname(__DIR__));

spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $baseDir = BASE_PATH . '/app/';
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) return;
    $relativeClass = substr($class, $len);
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';
    if (file_exists($file)) require $file;
});

header('Content-Type: text/plain; charset=utf-8');

$db = App\Core\Database::getInstance();
$pdo = $db->getPdo();

$migrations = [
    "ALTER TABLE products ADD COLUMN rating_count INT DEFAULT 0 AFTER rating",
    "ALTER TABLE products ADD COLUMN whats_new TEXT AFTER screenshots",
    "ALTER TABLE products ADD COLUMN release_date VARCHAR(50) DEFAULT '' AFTER whats_new",
    "ALTER TABLE products ADD COLUMN last_update VARCHAR(50) DEFAULT '' AFTER release_date",
    "ALTER TABLE products ADD COLUMN app_size VARCHAR(50) DEFAULT '' AFTER last_update",
    "ALTER TABLE products ADD COLUMN system_requirements TEXT AFTER app_size",
    "ALTER TABLE products ADD COLUMN age_rating VARCHAR(100) DEFAULT '' AFTER system_requirements",
    "ALTER TABLE products ADD COLUMN age_rating_icon VARCHAR(500) DEFAULT '' AFTER age_rating",
    "ALTER TABLE products ADD COLUMN supported_languages TEXT AFTER age_rating_icon",
    "ALTER TABLE products ADD COLUMN publisher_website VARCHAR(500) DEFAULT '' AFTER supported_languages",
    "ALTER TABLE products ADD COLUMN publisher_support VARCHAR(500) DEFAULT '' AFTER publisher_website",
    "ALTER TABLE products ADD COLUMN privacy_policy_url VARCHAR(500) DEFAULT '' AFTER publisher_support",
    "CREATE TABLE IF NOT EXISTS related_products (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
];

echo "=== Product Details Migration ===\n\n";

foreach ($migrations as $i => $sql) {
    $shortSql = substr(preg_replace('/\s+/', ' ', $sql), 0, 60);
    try {
        $pdo->exec($sql);
        echo "[OK] " . ($i + 1) . ". {$shortSql}...\n";
    } catch (PDOException $e) {
        if (strpos($e->getMessage(), 'Duplicate column') !== false) {
            echo "[SKIP] " . ($i + 1) . ". Column already exists\n";
        } elseif (strpos($e->getMessage(), 'already exists') !== false) {
            echo "[SKIP] " . ($i + 1) . ". Table already exists\n";
        } else {
            echo "[ERROR] " . ($i + 1) . ". " . $e->getMessage() . "\n";
        }
    }
}

echo "\n=== Migration Complete ===\n";
