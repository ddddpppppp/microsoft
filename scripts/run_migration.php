<?php
$config = require __DIR__ . '/../config/database.php';
$dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['dbname']};charset={$config['charset']}";
$pdo = new PDO($dsn, $config['username'], $config['password'], $config['options']);

$sql = file_get_contents(__DIR__ . '/update_banners.sql');
$sql = str_replace('USE ms_store;', '', $sql);

$statements = array_filter(array_map('trim', explode(';', $sql)));
foreach ($statements as $stmt) {
    if (empty($stmt)) continue;
    try {
        $pdo->exec($stmt);
        echo "OK: " . substr($stmt, 0, 60) . "...\n";
    } catch (Exception $e) {
        echo "ERROR: " . $e->getMessage() . "\n";
        echo "SQL: " . substr($stmt, 0, 100) . "\n";
    }
}
echo "\nDone. Total banners: " . $pdo->query("SELECT COUNT(*) FROM banners")->fetchColumn() . "\n";
