<?php
namespace App\Models;

use App\Core\Model;

class ProductStats extends Model {
    protected $table = 'product_stats';

    public function incrementView($productId) {
        $date = date('Y-m-d');
        $this->db->query(
            "INSERT INTO product_stats (product_id, stat_date, view_count, download_click_count)
             VALUES (?, ?, 1, 0)
             ON DUPLICATE KEY UPDATE view_count = view_count + 1",
            [$productId, $date]
        );
    }

    public function incrementDownloadClick($productId) {
        $date = date('Y-m-d');
        $this->db->query(
            "INSERT INTO product_stats (product_id, stat_date, view_count, download_click_count)
             VALUES (?, ?, 0, 1)
             ON DUPLICATE KEY UPDATE download_click_count = download_click_count + 1",
            [$productId, $date]
        );
    }

    public function getTotalStats() {
        return $this->db->fetch(
            "SELECT COALESCE(SUM(ps.view_count), 0) AS total_views,
                    COALESCE(SUM(ps.download_click_count), 0) AS total_downloads
             FROM product_stats ps
             INNER JOIN products p ON ps.product_id = p.id
             WHERE p.is_own_product = 1"
        );
    }

    public function getTodayStats() {
        $today = date('Y-m-d');
        return $this->db->fetch(
            "SELECT COALESCE(SUM(ps.view_count), 0) AS today_views,
                    COALESCE(SUM(ps.download_click_count), 0) AS today_downloads
             FROM product_stats ps
             INNER JOIN products p ON ps.product_id = p.id
             WHERE p.is_own_product = 1 AND ps.stat_date = ?",
            [$today]
        );
    }

    public function getDailyTrend($days = 30) {
        $startDate = date('Y-m-d', strtotime("-{$days} days"));
        return $this->db->fetchAll(
            "SELECT ps.stat_date,
                    SUM(ps.view_count) AS views,
                    SUM(ps.download_click_count) AS downloads
             FROM product_stats ps
             INNER JOIN products p ON ps.product_id = p.id
             WHERE p.is_own_product = 1 AND ps.stat_date >= ?
             GROUP BY ps.stat_date
             ORDER BY ps.stat_date ASC",
            [$startDate]
        );
    }

    public function getProductRanking($limit = 10) {
        $today = date('Y-m-d');
        return $this->db->fetchAll(
            "SELECT p.id,
                    IF(p.custom_title IS NOT NULL AND p.custom_title != '', p.custom_title, p.title) AS product_name,
                    COALESCE(SUM(ps.view_count), 0) AS total_views,
                    COALESCE(SUM(ps.download_click_count), 0) AS total_downloads,
                    COALESCE(SUM(CASE WHEN ps.stat_date = ? THEN ps.view_count ELSE 0 END), 0) AS today_views,
                    COALESCE(SUM(CASE WHEN ps.stat_date = ? THEN ps.download_click_count ELSE 0 END), 0) AS today_downloads
             FROM products p
             LEFT JOIN product_stats ps ON ps.product_id = p.id
             WHERE p.is_own_product = 1
             GROUP BY p.id
             ORDER BY total_views DESC
             LIMIT ?",
            [$today, $today, $limit]
        );
    }

    public function getProductDailyStats($productId, $days = 30) {
        $startDate = date('Y-m-d', strtotime("-{$days} days"));
        return $this->db->fetchAll(
            "SELECT stat_date, view_count, download_click_count
             FROM product_stats
             WHERE product_id = ? AND stat_date >= ?
             ORDER BY stat_date ASC",
            [$productId, $startDate]
        );
    }
}
