<?php
namespace App\Models;

use App\Core\Model;

class Product extends Model {
    protected $table = 'products';

    public function findByMsId($msId) {
        return $this->findBy('ms_id', $msId);
    }

    public function getApps($limit = 100) {
        return $this->db->fetchAll(
            "SELECT * FROM products WHERE product_type = 'app' ORDER BY id ASC LIMIT ?",
            [$limit]
        );
    }

    public function getGames($limit = 100) {
        return $this->db->fetchAll(
            "SELECT * FROM products WHERE product_type = 'game' ORDER BY id ASC LIMIT ?",
            [$limit]
        );
    }

    public function search($keyword, $limit = 20) {
        $like = "%$keyword%";
        return $this->db->fetchAll(
            "SELECT * FROM products WHERE title LIKE ? OR description LIKE ? LIMIT ?",
            [$like, $like, $limit]
        );
    }
}
