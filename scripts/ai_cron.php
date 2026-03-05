<?php
/**
 * AI Article Generation Cron Script (Multi-Process)
 *
 * Processes scheduled AI generation tasks in parallel using pcntl_fork.
 * Set up a system cron job to run this every hour (or more frequently):
 *
 *   Linux:   0 * * * * php /path/to/microsoft/scripts/ai_cron.php >> /path/to/ai_cron.log 2>&1
 *
 * Note: pcntl_fork is Linux only. On Windows, tasks run serially as fallback.
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

use App\Services\AiService;
use App\Models\AiArticleTask;
use App\Models\Article;
use App\Models\AiReviewTask;
use App\Models\ProductReview;

$canFork = function_exists('pcntl_fork');

echo "[" . date('Y-m-d H:i:s') . "] AI Cron started" . ($canFork ? " (parallel mode)" : " (serial mode - pcntl not available)") . "\n";

// ── Article Tasks ─────────────────────────────────────
$taskModel = new AiArticleTask();
$dueTasks = $taskModel->getDueTasks();

if (empty($dueTasks)) {
    echo "[" . date('Y-m-d H:i:s') . "] No due article tasks found.\n";
} else {
    echo "[" . date('Y-m-d H:i:s') . "] Found " . count($dueTasks) . " due article task(s)\n";

    $childPids = [];

    foreach ($dueTasks as $task) {
        if ($canFork) {
            $pid = pcntl_fork();
            if ($pid == -1) {
                echo "[" . date('Y-m-d H:i:s') . "] ERROR: Failed to fork for task #{$task['id']}\n";
                continue;
            } elseif ($pid == 0) {
                // Child process
                processArticleTask($task);
                exit(0);
            } else {
                // Parent process
                $childPids[$pid] = $task['id'];
                echo "[" . date('Y-m-d H:i:s') . "] Forked child PID $pid for task #{$task['id']}\n";
            }
        } else {
            // No fork support, run serially
            processArticleTask($task);
        }
    }

    // Wait for all children to finish
    if ($canFork && !empty($childPids)) {
        echo "[" . date('Y-m-d H:i:s') . "] Waiting for " . count($childPids) . " child processes...\n";
        while (count($childPids) > 0) {
            $pid = pcntl_wait($status);
            if ($pid > 0) {
                $taskId = $childPids[$pid] ?? '?';
                $exitCode = pcntl_wexitstatus($status);
                echo "[" . date('Y-m-d H:i:s') . "] Child PID $pid (task #$taskId) finished with exit code $exitCode\n";
                unset($childPids[$pid]);
            }
        }
    }
}

// ── Review Tasks ─────────────────────────────────────
echo "[" . date('Y-m-d H:i:s') . "] Checking review tasks...\n";
\App\Core\Database::getInstance(true);

$reviewTaskModel = new AiReviewTask();
$dueReviewTasks = $reviewTaskModel->getDueTasks();

if (empty($dueReviewTasks)) {
    echo "[" . date('Y-m-d H:i:s') . "] No due review tasks found.\n";
} else {
    echo "[" . date('Y-m-d H:i:s') . "] Found " . count($dueReviewTasks) . " due review task(s)\n";

    $childPids = [];

    foreach ($dueReviewTasks as $task) {
        if ($canFork) {
            $pid = pcntl_fork();
            if ($pid == -1) {
                echo "[" . date('Y-m-d H:i:s') . "] ERROR: Failed to fork for review task #{$task['id']}\n";
                continue;
            } elseif ($pid == 0) {
                // Child process
                processReviewTask($task);
                exit(0);
            } else {
                // Parent process
                $childPids[$pid] = $task['id'];
                echo "[" . date('Y-m-d H:i:s') . "] Forked child PID $pid for review task #{$task['id']}\n";
            }
        } else {
            // No fork support, run serially
            processReviewTask($task);
        }
    }

    // Wait for all children to finish
    if ($canFork && !empty($childPids)) {
        echo "[" . date('Y-m-d H:i:s') . "] Waiting for " . count($childPids) . " review child processes...\n";
        while (count($childPids) > 0) {
            $pid = pcntl_wait($status);
            if ($pid > 0) {
                $taskId = $childPids[$pid] ?? '?';
                $exitCode = pcntl_wexitstatus($status);
                echo "[" . date('Y-m-d H:i:s') . "] Review child PID $pid (task #$taskId) finished with exit code $exitCode\n";
                unset($childPids[$pid]);
            }
        }
    }
}

echo "[" . date('Y-m-d H:i:s') . "] AI Cron finished\n";

// ══════════════════════════════════════════════════════
// Task Processing Functions
// ══════════════════════════════════════════════════════

function processArticleTask(array $task): void {
    // Each child needs its own DB connection
    $db = \App\Core\Database::getInstance(true);
    $aiService = new AiService();
    $articleModel = new Article();
    $taskModel = new AiArticleTask();

    $taskId = (int)$task['id'];
    echo "[" . date('Y-m-d H:i:s') . "] [Task #$taskId] Processing: {$task['name']}\n";

    $options = [
        'article_style' => $task['article_style'] ?? 'seo',
        'debug_context' => [
            'entry' => 'ai_cron',
            'trigger' => 'scheduled_task',
            'task_id' => $taskId,
            'source_task_id' => $taskId,
        ],
    ];
    $selectedVocabsForValidation = [];

    // Build vocabulary instructions
    $vocabConfigRaw = $task['vocabulary_config'] ?? '';
    $vocabConfig = $vocabConfigRaw ? json_decode($vocabConfigRaw, true) : null;
    if ($vocabConfig && !empty($vocabConfig['vocabs'])) {
        $vocabs = $vocabConfig['vocabs'];
        $mustVocabs = [];
        $randomPool = [];
        foreach ($vocabs as $v) {
            if (!empty($v['must'])) {
                $mustVocabs[] = $v;
            } else {
                $randomPool[] = $v;
            }
        }
        $randomCount = (int)($vocabConfig['random_count'] ?? 5);
        if (count($randomPool) > $randomCount) {
            shuffle($randomPool);
            $randomPool = array_slice($randomPool, 0, $randomCount);
        }
        $finalVocabs = array_merge($mustVocabs, $randomPool);
        $selectedVocabsForValidation = $finalVocabs;
        $options['vocab_instructions'] = AiService::buildVocabInstructions($finalVocabs);
    }

    // Title dedup by task id
    $recentTitleRows = $db->fetchAll(
        "SELECT title FROM articles WHERE source_task_id = ? ORDER BY id DESC LIMIT 50",
        [$taskId]
    );
    $recentTitles = array_column($recentTitleRows, 'title');
    if (!empty($recentTitles)) {
        $options['title_dedup'] = AiService::buildTitleDedup($recentTitles);
    }

    $result = null;
    $parsed = null;
    $maxAttempts = !empty($selectedVocabsForValidation) ? 3 : 1;
    $retryPrompt = $task['prompt'];
    $lastMismatch = [];
    for ($attempt = 1; $attempt <= $maxAttempts; $attempt++) {
        $result = $aiService->generateArticle($task['ai_provider'], $retryPrompt, $options);
        if (!$result['success']) {
            break;
        }
        $parsed = $aiService->parseArticle($result['content']);
        if (empty($selectedVocabsForValidation)) {
            break;
        }
        $validation = AiService::validateVocabUsage($parsed['content'], $selectedVocabsForValidation);
        if (!empty($validation['ok'])) {
            break;
        }
        $lastMismatch = $validation['mismatches'] ?? [];
        if ($attempt < $maxAttempts) {
            $retryPrompt = $task['prompt'] . "\n\n上一次输出未满足关键词次数约束，请严格修正后重写全文：\n"
                . json_encode($lastMismatch, JSON_UNESCAPED_UNICODE);
        } else {
            $result = [
                'success' => false,
                'error' => '关键词次数约束未满足，请重试',
                'mismatches' => $lastMismatch,
            ];
        }
    }

    if (!$result['success']) {
        $extra = !empty($result['mismatches']) ? (' mismatches=' . json_encode($result['mismatches'], JSON_UNESCAPED_UNICODE)) : '';
        echo "[" . date('Y-m-d H:i:s') . "] [Task #$taskId] ERROR: {$result['error']}{$extra}\n";
        return;
    }

    if (!$parsed) {
        $parsed = $aiService->parseArticle($result['content']);
    }
    $title = $parsed['title'] ?: '未命名文章';
    $content = $parsed['content'];
    $slug = time() . mt_rand(1000, 9999);
    $summary = mb_substr(strip_tags($content), 0, 200);

    $coverImage = 'https://picsum.photos/seed/' . urlencode($slug) . '/800/450';
    $articleId = $articleModel->create([
        'title'        => $title,
        'content'      => $content,
        'slug'         => $slug,
        'status'       => $task['auto_publish'] ? 'published' : 'draft',
        'summary'      => $summary,
        'category'     => $task['category'],
        'author'       => '小编',
        'cover_image'  => $coverImage,
        'source_task_id' => $taskId,
    ]);

    $taskModel->markRun($task['id']);

    echo "[" . date('Y-m-d H:i:s') . "] [Task #$taskId] OK - Article #{$articleId} '{$title}' created\n";
}

function processReviewTask(array $task): void {
    // Each child needs its own DB connection
    $db = \App\Core\Database::getInstance(true);
    $aiService = new AiService();
    $reviewModel = new ProductReview();
    $reviewTaskModel = new AiReviewTask();

    $taskId = (int)$task['id'];
    echo "[" . date('Y-m-d H:i:s') . "] [Review #$taskId] Processing: {$task['name']}\n";

    $productName = $task['product_title'] ?? 'Unknown Product';
    $options = [];
    if (!empty($task['prompt'])) {
        $options['custom_prompt'] = $task['prompt'];
    }

    $result = $aiService->generateProductReviews($task['ai_provider'], $productName, (int)$task['num_reviews'], $options);

    if (!$result['success']) {
        echo "[" . date('Y-m-d H:i:s') . "] [Review #$taskId] ERROR: {$result['error']}\n";
        return;
    }

    $created = 0;
    foreach ($result['reviews'] as $r) {
        $reviewModel->create([
            'product_id'  => $task['product_id'],
            'author_name' => $r['author_name'] ?? '匿名用户',
            'rating'      => max(1, min(5, (float)($r['rating'] ?? 5))),
            'title'       => $r['title'] ?? '',
            'content'     => $r['content'] ?? '',
            'pros'        => $r['pros'] ?? '',
            'cons'        => $r['cons'] ?? '',
            'summary'     => $r['summary'] ?? '',
            'status'      => $task['auto_publish'] ? 'published' : 'draft',
        ]);
        $created++;
    }

    $reviewTaskModel->markRun($task['id']);
    echo "[" . date('Y-m-d H:i:s') . "] [Review #$taskId] OK - {$created} reviews created for '{$productName}'\n";
}
