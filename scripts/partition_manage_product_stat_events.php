<?php
/**
 * product_stat_events 分区管理脚本
 *
 * 功能：
 * 1. 删除超过 N 个月的旧分区（释放空间，避免表上亿行）
 * 2. 从 p_future 拆分出新月份分区（防止 p_future 无限膨胀）
 *
 * 建议每月 1 号凌晨执行：
 *   Linux:   0 0 1 * * php /path/to/microsoft/scripts/partition_manage_product_stat_events.php >> /path/to/partition_manage.log 2>&1
 *   Windows: 任务计划程序，每月 1 日 00:00 运行
 *
 * 可选参数（环境变量或命令行）：
 *   RETAIN_MONTHS=3  保留最近几个月的数据，默认 3
 *   DRY_RUN=1        仅打印将要执行的操作，不实际执行
 */

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

use App\Core\Database;

$retainMonths = (int) (getenv('RETAIN_MONTHS') ?: $_SERVER['RETAIN_MONTHS'] ?? 3);
$dryRun = (bool) (getenv('DRY_RUN') ?: $_SERVER['DRY_RUN'] ?? false);

if (php_sapi_name() === 'cli' && isset($argv)) {
    foreach ($argv as $arg) {
        if (preg_match('/^RETAIN_MONTHS=(\d+)$/', $arg, $m)) $retainMonths = (int) $m[1];
        if ($arg === 'DRY_RUN=1' || $arg === '--dry-run') $dryRun = true;
    }
}

$retainMonths = max(1, min(24, $retainMonths));
$db = Database::getInstance();
$table = 'product_stat_events';

echo "[" . date('Y-m-d H:i:s') . "] partition_manage_product_stat_events started (retain={$retainMonths} months, dry_run=" . ($dryRun ? 'yes' : 'no') . ")\n";

// 1. 获取所有分区
$partitions = $db->fetchAll("SELECT PARTITION_NAME, PARTITION_DESCRIPTION, TABLE_ROWS
    FROM information_schema.PARTITIONS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND PARTITION_NAME IS NOT NULL
    ORDER BY PARTITION_ORDINAL_POSITION", [$table]);

if (empty($partitions)) {
    echo "[" . date('Y-m-d H:i:s') . "] No partitions found for {$table}\n";
    exit(0);
}

$cutoffDate = date('Y-m-01', strtotime("-{$retainMonths} months"));
$cutoffDays = (int) $db->fetch("SELECT TO_DAYS(?) AS d", [$cutoffDate])['d'];

// 2. 删除过期分区
$dropped = [];
foreach ($partitions as $p) {
    $name = $p['PARTITION_NAME'];
    if ($name === 'p_future') continue;

    $desc = $p['PARTITION_DESCRIPTION'];
    if ($desc === 'MAXVALUE') continue;

    if ((int) $desc <= (int) $cutoffDays) {
        $dropped[] = $name;
    }
}

foreach ($dropped as $part) {
    $sql = "ALTER TABLE `{$table}` DROP PARTITION `{$part}`";
    echo "[" . date('Y-m-d H:i:s') . "] DROP: {$sql}\n";
    if (!$dryRun) {
        try {
            $db->query($sql);
            echo "[" . date('Y-m-d H:i:s') . "] OK: dropped partition {$part}\n";
        } catch (\Throwable $e) {
            echo "[" . date('Y-m-d H:i:s') . "] ERROR: " . $e->getMessage() . "\n";
        }
    }
}

// 3. 从 p_future 拆分出新月份分区（避免 p_future 无限增长）
$hasFuture = false;
foreach ($partitions as $p) {
    if ($p['PARTITION_NAME'] === 'p_future') {
        $hasFuture = true;
        break;
    }
}

if ($hasFuture) {
    $nextMonth = date('Y-m-01', strtotime('+1 month'));
    $nextMonthDays = $db->fetch("SELECT TO_DAYS(?) AS d", [$nextMonth])['d'];
    $partName = 'p_' . date('Ym', strtotime('+1 month'));

    // 检查是否已存在该分区（可能之前已拆分）
    $exists = false;
    foreach ($partitions as $p) {
        if ($p['PARTITION_NAME'] === $partName) {
            $exists = true;
            break;
        }
    }

    if (!$exists) {
        $sql = "ALTER TABLE `{$table}` REORGANIZE PARTITION p_future INTO (
            PARTITION `{$partName}` VALUES LESS THAN ({$nextMonthDays}),
            PARTITION p_future VALUES LESS THAN MAXVALUE
        )";
        echo "[" . date('Y-m-d H:i:s') . "] REORGANIZE: split p_future -> {$partName}\n";
        if (!$dryRun) {
            try {
                $db->query($sql);
                echo "[" . date('Y-m-d H:i:s') . "] OK: reorganized p_future\n";
            } catch (\Throwable $e) {
                echo "[" . date('Y-m-d H:i:s') . "] ERROR: " . $e->getMessage() . "\n";
            }
        }
    }
}

echo "[" . date('Y-m-d H:i:s') . "] partition_manage_product_stat_events finished\n";
