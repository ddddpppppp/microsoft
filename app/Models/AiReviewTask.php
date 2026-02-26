<?php
namespace App\Models;

use App\Core\Model;

class AiReviewTask extends Model {
    protected $table = 'ai_generate_review_tasks';

    public function getAllWithProduct($orderBy = 'created_at DESC') {
        return $this->db->fetchAll(
            "SELECT t.*, p.title as product_title, p.icon_url as product_icon
             FROM ai_generate_review_tasks t
             LEFT JOIN products p ON t.product_id = p.id
             ORDER BY $orderBy"
        );
    }

    public function getDueTasks() {
        return $this->db->fetchAll(
            "SELECT t.*, p.title as product_title, p.ms_id as product_ms_id
             FROM ai_generate_review_tasks t
             LEFT JOIN products p ON t.product_id = p.id
             WHERE t.is_active = 1 AND t.schedule_type != 'once'
               AND (t.next_run_at IS NULL OR t.next_run_at <= NOW())
             ORDER BY t.next_run_at ASC"
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
            "UPDATE ai_generate_review_tasks SET last_run_at = NOW(), next_run_at = ?, total_generated = total_generated + 1 WHERE id = ?",
            [$nextRun, $id]
        );
    }
}
