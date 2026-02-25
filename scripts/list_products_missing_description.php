<?php
/**
 * List products that appear in hero_cards collections and have empty description
 * but have original_url (so we can crawl). Output JSON to stdout.
 * Run from project root: php scripts/list_products_missing_description.php
 */
$configPath = dirname(__DIR__) . '/config/database.php';
if (!is_file($configPath)) {
    fwrite(STDERR, "Config not found: $configPath\n");
    exit(1);
}
$config = require $configPath;
$dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['dbname']};charset=" . ($config['charset'] ?? 'utf8mb4');
$pdo = new PDO($dsn, $config['username'], $config['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);

$sql = "
    SELECT DISTINCT p.id, p.title, p.original_url, p.ms_id
    FROM products p
    INNER JOIN collection_products cp ON cp.product_id = p.id
    INNER JOIN collections c ON c.id = cp.collection_id
    WHERE c.section_type = 'hero_cards'
      AND (p.description IS NULL OR TRIM(p.description) = '')
      AND p.original_url IS NOT NULL AND TRIM(p.original_url) != ''
    ORDER BY p.id
";
$stmt = $pdo->query($sql);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($rows, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
