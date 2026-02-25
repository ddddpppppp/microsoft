<?php
/**
 * Batch update product social_card_image from JSON file.
 * File format: [ {"id": 1, "social_card_image": "https://..."}, ... ]
 * Run: php scripts/update_social_card_images.php path/to/social_card_images.json
 */
if ($argc < 2 || !is_file($argv[1])) {
    fwrite(STDERR, "Usage: php scripts/update_social_card_images.php <path-to-json>\n");
    exit(1);
}
$configPath = dirname(__DIR__) . '/config/database.php';
if (!is_file($configPath)) {
    fwrite(STDERR, "Config not found: $configPath\n");
    exit(1);
}
$config = require $configPath;
$dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['dbname']};charset=" . ($config['charset'] ?? 'utf8mb4');
$pdo = new PDO($dsn, $config['username'], $config['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

$json = file_get_contents($argv[1]);
$data = json_decode($json, true);
if (!is_array($data)) {
    fwrite(STDERR, "Invalid JSON or not an array.\n");
    exit(1);
}

$stmt = $pdo->prepare("UPDATE products SET social_card_image = ?, updated_at = NOW() WHERE id = ?");
$updated = 0;
foreach ($data as $row) {
    if (empty($row['id']) || !array_key_exists('social_card_image', $row)) continue;
    $stmt->execute([(string) $row['social_card_image'], (int) $row['id']]);
    if ($stmt->rowCount()) $updated++;
}
fwrite(STDERR, "Updated $updated product(s) social_card_image.\n");
