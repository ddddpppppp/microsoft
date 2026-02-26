<?php
namespace App\Models;

use App\Core\Model;

class ProductReview extends Model {
    protected $table = 'product_reviews';

    public function getByProduct($productId, $limit = 15, $status = 'published') {
        return $this->db->fetchAll(
            "SELECT * FROM product_reviews WHERE product_id = ? AND status = ? ORDER BY created_at DESC LIMIT ?",
            [$productId, $status, $limit]
        );
    }

    public function getCountByProduct($productId) {
        $row = $this->db->fetch(
            "SELECT COUNT(*) as cnt FROM product_reviews WHERE product_id = ? AND status = 'published'",
            [$productId]
        );
        return $row['cnt'] ?? 0;
    }

    public function getAvgRating($productId) {
        $row = $this->db->fetch(
            "SELECT AVG(rating) as avg_rating FROM product_reviews WHERE product_id = ? AND status = 'published'",
            [$productId]
        );
        return $row['avg_rating'] ? round($row['avg_rating'], 1) : 0;
    }

    public function getRatingDistribution($productId) {
        $rows = $this->db->fetchAll(
            "SELECT FLOOR(rating) as star, COUNT(*) as cnt FROM product_reviews WHERE product_id = ? AND status = 'published' GROUP BY FLOOR(rating) ORDER BY star DESC",
            [$productId]
        );
        $dist = [5 => 0, 4 => 0, 3 => 0, 2 => 0, 1 => 0];
        foreach ($rows as $r) {
            $dist[(int)$r['star']] = (int)$r['cnt'];
        }
        return $dist;
    }
}
