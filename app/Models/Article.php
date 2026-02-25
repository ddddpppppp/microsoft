<?php
namespace App\Models;

use App\Core\Model;

class Article extends Model {
    protected $table = 'articles';

    public function getPublished($limit = 0) {
        $sql = "SELECT * FROM articles WHERE status = 'published' ORDER BY created_at DESC";
        if ($limit > 0) $sql .= " LIMIT $limit";
        return $this->db->fetchAll($sql);
    }

    public function findBySlug($slug) {
        return $this->findBy('slug', $slug);
    }

    public function getRecommended($limit = 6) {
        return $this->db->fetchAll(
            "SELECT * FROM articles WHERE status = 'published' AND is_recommended = 1 ORDER BY created_at DESC LIMIT ?",
            [$limit]
        );
    }

    public function getByCategory($category, $limit = 20) {
        return $this->db->fetchAll(
            "SELECT * FROM articles WHERE status = 'published' AND category = ? ORDER BY created_at DESC LIMIT ?",
            [$category, $limit]
        );
    }

    public function getCategories() {
        return $this->db->fetchAll(
            "SELECT category, COUNT(*) as count FROM articles WHERE status = 'published' AND category != '' GROUP BY category ORDER BY count DESC"
        );
    }

    public function paginatePublished($page = 1, $perPage = 12, $category = '') {
        $where = "status = 'published'";
        $params = [];
        if ($category) {
            $where .= " AND category = ?";
            $params[] = $category;
        }
        return $this->paginate($page, $perPage, $where, $params, 'created_at DESC');
    }

    public function incrementViews($id) {
        $this->db->query("UPDATE articles SET views = views + 1 WHERE id = ?", [$id]);
    }

    public function getRelated($id, $category, $limit = 4) {
        return $this->db->fetchAll(
            "SELECT * FROM articles WHERE status = 'published' AND id != ? AND category = ? ORDER BY created_at DESC LIMIT ?",
            [$id, $category, $limit]
        );
    }

    public function getPopular($limit = 5) {
        return $this->db->fetchAll(
            "SELECT * FROM articles WHERE status = 'published' ORDER BY views DESC LIMIT ?",
            [$limit]
        );
    }
}
