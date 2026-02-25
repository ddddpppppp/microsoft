<?php
/**
 * Update product descriptions from a JSON file.
 * File format: [ {"id": 1, "description": "..."}, ... ]
 * Run from project root: php scripts/update_descriptions.php path/to/descriptions.json
 */
if ($argc < 2 || !is_file($argv[1])) {
    fwrite(STDERR, "Usage: php scripts/update_descriptions.php <path-to-json>\n");
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

$stmt = $pdo->prepare("UPDATE products SET description = ?, updated_at = NOW() WHERE id = ?");
$updated = 0;
foreach ($data as $row) {
    if (empty($row['id']) || !array_key_exists('description', $row)) continue;
    $stmt->execute([(string)$row['description'], (int)$row['id']]);
    if ($stmt->rowCount()) $updated++;
}
fwrite(STDERR, "Updated $updated product(s).\n");
