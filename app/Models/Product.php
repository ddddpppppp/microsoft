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

    /**
     * Products that appear in hero_cards collections and have empty description but have original_url.
     */
    public function getMissingDescriptionInHeroCards() {
        return $this->db->fetchAll(
            "SELECT DISTINCT p.id, p.title, p.original_url, p.ms_id
             FROM products p
             INNER JOIN collection_products cp ON cp.product_id = p.id
             INNER JOIN collections c ON c.id = cp.collection_id
             WHERE c.section_type = 'hero_cards'
               AND (p.description IS NULL OR TRIM(p.description) = '')
               AND p.original_url IS NOT NULL AND TRIM(p.original_url) != ''
             ORDER BY p.id"
        );
    }

    public function updateDescription($id, $description) {
        $this->db->update('products', ['description' => $description], 'id = ?', [$id]);
    }

    public function updateSocialCardImage($id, $url) {
        $this->db->update('products', ['social_card_image' => $url], 'id = ?', [$id]);
    }
}
