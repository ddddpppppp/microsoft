<?php
/**
 * AI Article Generation Cron Script
 *
 * Processes scheduled AI generation tasks (interval / daily).
 * Set up a system cron job to run this every hour (or more frequently):
 *
 *   Linux:   0 * * * * php /path/to/microsoft/scripts/ai_cron.php >> /path/to/ai_cron.log 2>&1
 *   Windows: schtasks /create /sc hourly /tn "AI Article Cron" /tr "php c:\www\microsoft\scripts\ai_cron.php"
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

use App\Core\AiService;
use App\Models\AiTask;
use App\Models\Article;

echo "[" . date('Y-m-d H:i:s') . "] AI Cron started\n";

$taskModel = new AiTask();
$dueTasks = $taskModel->getDueTasks();

if (empty($dueTasks)) {
    echo "[" . date('Y-m-d H:i:s') . "] No due tasks found.\n";
    exit(0);
}

echo "[" . date('Y-m-d H:i:s') . "] Found " . count($dueTasks) . " due task(s)\n";

$aiService = new AiService();
$articleModel = new Article();

foreach ($dueTasks as $task) {
    echo "[" . date('Y-m-d H:i:s') . "] Processing task #{$task['id']}: {$task['name']}\n";

    $result = $aiService->generate($task['ai_provider'], $task['prompt']);

    if (!$result['success']) {
        echo "[" . date('Y-m-d H:i:s') . "] ERROR: {$result['error']}\n";
        continue;
    }

    $parsed = $aiService->parseArticle($result['content']);
    $title = $parsed['title'] ?: '未命名文章';
    $content = $parsed['content'];
    $slug = 'ai-' . date('YmdHis') . '-' . substr(md5($title . $task['id']), 0, 6);
    $summary = mb_substr(strip_tags($content), 0, 200);

    $articleId = $articleModel->create([
        'title'    => $title,
        'content'  => $content,
        'slug'     => $slug,
        'status'   => $task['auto_publish'] ? 'published' : 'draft',
        'summary'  => $summary,
        'category' => $task['category'],
        'author'   => 'AI',
    ]);

    $taskModel->markRun($task['id']);

    echo "[" . date('Y-m-d H:i:s') . "] OK - Article #{$articleId} '{$title}' created\n";

    sleep(2);
}

echo "[" . date('Y-m-d H:i:s') . "] AI Cron finished\n";
