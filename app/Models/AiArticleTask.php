<?php
namespace App\Models;

use App\Core\Model;

class AiArticleTask extends Model {
    protected $table = 'ai_generate_article_tasks';

    public function getActiveTasks() {
        return $this->db->fetchAll(
            "SELECT * FROM ai_generate_article_tasks WHERE is_active = 1 ORDER BY created_at DESC"
        );
    }

    public function getDueTasks() {
        return $this->db->fetchAll(
            "SELECT * FROM ai_generate_article_tasks WHERE is_active = 1 AND schedule_type != 'once' AND (next_run_at IS NULL OR next_run_at <= NOW()) ORDER BY next_run_at ASC"
        );
    }

    public function markRun($id) {
        $task = $this->find($id);
        if (!$task) return;

        $nextRun = null;
        if ($task['schedule_type'] === 'interval') {
            $nextRun = date('Y-m-d H:i:s', strtotime('+' . (int)$task['interval_days'] . ' days'));
        } elseif ($task['schedule_type'] === 'daily') {
            $time = $task['daily_time'] ?: '09:00';
            $nextRun = date('Y-m-d') . ' ' . $time . ':00';
            if (strtotime($nextRun) <= time()) {
                $nextRun = date('Y-m-d', strtotime('+1 day')) . ' ' . $time . ':00';
            }
        }

        $this->db->query(
            "UPDATE ai_generate_article_tasks SET last_run_at = NOW(), next_run_at = ?, total_generated = total_generated + 1 WHERE id = ?",
            [$nextRun, $id]
        );
    }
}
