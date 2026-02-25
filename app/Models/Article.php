<?php
namespace App\Models;

use App\Core\Model;

class Article extends Model {
    protected $table = 'articles';

    public function getPublished() {
        return $this->db->fetchAll(
            "SELECT * FROM articles WHERE status = 'published' ORDER BY created_at DESC"
        );
    }

    public function findBySlug($slug) {
        return $this->findBy('slug', $slug);
    }
}
