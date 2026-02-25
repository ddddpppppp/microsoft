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

    public function findByCustomUrl($customUrl) {
        return $this->db->fetch(
            "SELECT * FROM products WHERE custom_url = ? AND is_own_product = 1 LIMIT 1",
            [$customUrl]
        );
    }

    public function getRelatedProducts($productId) {
        // Get related products and check if any are own products
        $related = $this->db->fetchAll(
            "SELECT rp.*, p.is_own_product, p.custom_url 
             FROM related_products rp
             LEFT JOIN products p ON rp.related_ms_id = p.ms_id
             WHERE rp.product_id = ? 
             ORDER BY rp.display_order ASC LIMIT 6",
            [$productId]
        );
        return $related;
    }
}
