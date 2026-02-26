<?php
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

$db = App\Core\Database::getInstance();

echo "<pre>";
echo "Running product reviews migration...\n\n";

$sql = file_get_contents(__DIR__ . '/alter_add_product_reviews.sql');
$statements = array_filter(array_map('trim', explode(';', $sql)));

foreach ($statements as $stmt) {
    if (empty($stmt) || strpos($stmt, '--') === 0) continue;
    try {
        $db->query($stmt);
        $table = '';
        if (preg_match('/CREATE TABLE.*?`?(\w+)`?/i', $stmt, $m)) {
            $table = $m[1];
        }
        echo "OK: " . ($table ? "Created table '$table'" : "Executed statement") . "\n";
    } catch (Exception $e) {
        echo "WARN: " . $e->getMessage() . "\n";
    }
}

echo "\nMigration complete!\n";
echo "</pre>";
