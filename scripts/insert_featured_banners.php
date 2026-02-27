<?php
$config = require __DIR__ . '/../config/database.php';

try {
    $dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['dbname']};charset={$config['charset']}";
    $pdo = new PDO($dsn, $config['username'], $config['password'], $config['options']);
    
    // First check table structure
    $cols = $pdo->query("DESCRIBE banners")->fetchAll(PDO::FETCH_COLUMN);
    echo "Columns: " . implode(', ', $cols) . "\n\n";
    
    // Check existing featured banners
    $existing = $pdo->query("SELECT * FROM banners WHERE type = 'featured'")->fetchAll();
    echo "Existing featured banners: " . count($existing) . "\n";
    foreach ($existing as $b) {
        echo "  - [{$b['page']}] {$b['title']} (image: " . ($b['image_url'] ?? $b['local_image'] ?? 'none') . ")\n";
    }
    echo "\n";
    
    // Featured banners data: 3 per page (1 top + 2 bottom split)
    $banners = [
        // Home page (3)
        ['page' => 'home', 'type' => 'featured', 'title' => 'The new Overwatch is here', 'subtitle' => '立即透過 Xbox Game Pass 購買或玩遊戲', 'badge_text' => 'Game Pass', 'local_image' => '/assets/images/banners/home_overwatch.jpg', 'link_url' => '#', 'display_order' => 1],
        ['page' => 'home', 'type' => 'featured', 'title' => '社交網路應用程式', 'subtitle' => '聯繫和學習', 'badge_text' => '', 'local_image' => '/assets/images/banners/side_social.jpg', 'link_url' => '/apps', 'display_order' => 2],
        ['page' => 'home', 'type' => 'featured', 'title' => 'CyberSafe: Bad Connection?', 'subtitle' => 'MINECRAFT EDUCATION', 'badge_text' => '', 'local_image' => '/assets/images/banners/side_cybersafe.jpg', 'link_url' => '#', 'display_order' => 3],
        
        // Apps page (3)
        ['page' => 'apps', 'type' => 'featured', 'title' => 'Microsoft 365', 'subtitle' => '提升生產力的最佳選擇', 'badge_text' => '', 'local_image' => '/assets/images/banners/apps_m365.jpg', 'link_url' => '#', 'display_order' => 1],
        ['page' => 'apps', 'type' => 'featured', 'title' => 'Drawboard PDF', 'subtitle' => '專業PDF標註工具', 'badge_text' => '', 'local_image' => '/assets/images/banners/apps_drawboard.jpg', 'link_url' => '#', 'display_order' => 2],
        ['page' => 'apps', 'type' => 'featured', 'title' => '社交網路應用程式', 'subtitle' => '聯繫和學習', 'badge_text' => '', 'local_image' => '/assets/images/banners/collection_social_apps.jpg', 'link_url' => '/apps', 'display_order' => 3],
        
        // Games page (3)
        ['page' => 'games', 'type' => 'featured', 'title' => 'CyberSafe: Bad Connection?', 'subtitle' => '探索網路安全的冒險遊戲', 'badge_text' => '', 'local_image' => '/assets/images/banners/games_cybersafe.jpg', 'link_url' => '#', 'display_order' => 1],
        ['page' => 'games', 'type' => 'featured', 'title' => 'Join Game Pass', 'subtitle' => '暢玩數百款高品質遊戲', 'badge_text' => 'Game Pass', 'local_image' => '/assets/images/banners/games_gamepass.jpg', 'link_url' => 'https://www.xbox.com/xbox-game-pass', 'display_order' => 2],
        ['page' => 'games', 'type' => 'featured', 'title' => 'Romeo is a Dead Man', 'subtitle' => '立即透過 Xbox Game Pass 購買或玩遊戲', 'badge_text' => 'Game Pass', 'local_image' => '/assets/images/banners/hero_deadman.jpg', 'link_url' => '#', 'display_order' => 3],
    ];
    
    // Delete existing featured banners
    $pdo->exec("DELETE FROM banners WHERE type = 'featured'");
    echo "Deleted existing featured banners.\n";
    
    // Insert new banners
    $stmt = $pdo->prepare("INSERT INTO banners (page, type, title, subtitle, badge_text, local_image, link_url, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    
    foreach ($banners as $b) {
        $stmt->execute([$b['page'], $b['type'], $b['title'], $b['subtitle'], $b['badge_text'], $b['local_image'], $b['link_url'], $b['display_order']]);
        echo "Inserted: [{$b['page']}] {$b['title']}\n";
    }
    
    echo "\nDone! Inserted " . count($banners) . " featured banners.\n";
    
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
