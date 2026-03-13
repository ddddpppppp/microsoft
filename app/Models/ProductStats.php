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

    public function getProductRanking($limit = 50) {
        return $this->getProductRankingSorted($limit, 'total_views', 'desc');
    }

    public function getProductRankingSorted($limit = 50, $orderBy = 'total_views', $direction = 'desc') {
        $allowed = ['total_views', 'total_downloads', 'today_views', 'today_downloads', 'conversion_rate'];
        if (!in_array($orderBy, $allowed, true)) {
            $orderBy = 'total_views';
        }
        $direction = strtolower($direction) === 'asc' ? 'ASC' : 'DESC';
        $limit = max(1, min(200, (int)$limit));
        $today = date('Y-m-d');

        $orderExpr = $orderBy === 'conversion_rate'
            ? 'IF(total_views > 0, total_downloads / total_views, 0)'
            : $orderBy;

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
             ORDER BY {$orderExpr} {$direction}
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

    /**
     * 按时间范围聚合总览（用于统计页时间筛选）
     */
    public function getTotalStatsFiltered(?string $startDate, ?string $endDate): array {
        $where = ['p.is_own_product = 1'];
        $params = [];
        if ($startDate !== null && $startDate !== '') {
            $where[] = 'ps.stat_date >= ?';
            $params[] = $startDate;
        }
        if ($endDate !== null && $endDate !== '') {
            $where[] = 'ps.stat_date <= ?';
            $params[] = $endDate;
        }
        $where = implode(' AND ', $where);
        return $this->db->fetch(
            "SELECT COALESCE(SUM(ps.view_count), 0) AS total_views,
                    COALESCE(SUM(ps.download_click_count), 0) AS total_downloads
             FROM product_stats ps
             INNER JOIN products p ON ps.product_id = p.id
             WHERE {$where}",
            $params
        ) ?: ['total_views' => 0, 'total_downloads' => 0];
    }

    /**
     * 按时间范围获取每日趋势（用于统计页时间筛选）
     */
    public function getDailyTrendFiltered(?string $startDate, ?string $endDate): array {
        if ($startDate === null || $startDate === '' || $endDate === null || $endDate === '') {
            return $this->getDailyTrend(30);
        }
        return $this->db->fetchAll(
            "SELECT ps.stat_date,
                    SUM(ps.view_count) AS views,
                    SUM(ps.download_click_count) AS downloads
             FROM product_stats ps
             INNER JOIN products p ON ps.product_id = p.id
             WHERE p.is_own_product = 1 AND ps.stat_date >= ? AND ps.stat_date <= ?
             GROUP BY ps.stat_date
             ORDER BY ps.stat_date ASC",
            [$startDate, $endDate]
        );
    }

    /**
     * 按时间范围获取产品排行榜（用于统计页时间筛选）
     */
    public function getProductRankingFiltered(int $limit = 50, string $orderBy = 'total_views', string $direction = 'desc', ?string $startDate = null, ?string $endDate = null): array {
        $allowed = ['total_views', 'total_downloads', 'today_views', 'today_downloads', 'conversion_rate'];
        if (!in_array($orderBy, $allowed, true)) {
            $orderBy = 'total_views';
        }
        $direction = strtolower($direction) === 'asc' ? 'ASC' : 'DESC';
        $limit = max(1, min(200, $limit));
        $today = date('Y-m-d');

        $joinCondition = 'ps.product_id = p.id';
        $params = [];
        if ($startDate !== null && $startDate !== '' && $endDate !== null && $endDate !== '') {
            $joinCondition .= ' AND ps.stat_date >= ? AND ps.stat_date <= ?';
            $params[] = $startDate;
            $params[] = $endDate;
        }

        $orderExpr = $orderBy === 'conversion_rate'
            ? 'IF(total_views > 0, total_downloads / total_views, 0)'
            : $orderBy;

        $sql = "SELECT p.id,
                    IF(p.custom_title IS NOT NULL AND p.custom_title != '', p.custom_title, p.title) AS product_name,
                    COALESCE(SUM(ps.view_count), 0) AS total_views,
                    COALESCE(SUM(ps.download_click_count), 0) AS total_downloads,
                    COALESCE(SUM(CASE WHEN ps.stat_date = ? THEN ps.view_count ELSE 0 END), 0) AS today_views,
                    COALESCE(SUM(CASE WHEN ps.stat_date = ? THEN ps.download_click_count ELSE 0 END), 0) AS today_downloads
             FROM products p
             LEFT JOIN product_stats ps ON {$joinCondition}
             WHERE p.is_own_product = 1
             GROUP BY p.id
             ORDER BY {$orderExpr} {$direction}
             LIMIT ?";

        $params = array_merge($params, [$today, $today, $limit]);
        return $this->db->fetchAll($sql, $params);
    }
}
