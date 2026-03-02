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

    public function searchLite($keyword, $limit = 10) {
        $like = '%' . $keyword . '%';
        return $this->db->fetchAll(
            "SELECT id, ms_id, title, local_icon, icon_url, category, price, price_type,
                    rating, original_url, custom_url, is_own_product, product_type
             FROM products
             WHERE title LIKE ? OR ms_id LIKE ?
             ORDER BY is_own_product DESC, rating_count DESC
             LIMIT ?",
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

    public function getRelatedProductsFull($productId) {
        return $this->db->fetchAll(
            "SELECT rp.id, rp.related_ms_id, rp.related_title, rp.related_icon_url,
                    rp.related_rating, rp.related_category, rp.related_price, rp.display_order
             FROM related_products rp
             WHERE rp.product_id = ?
             ORDER BY rp.display_order ASC",
            [$productId]
        );
    }

    public function syncRelatedProducts($productId, array $items) {
        $this->db->delete('related_products', 'product_id = ?', [$productId]);
        foreach ($items as $order => $item) {
            $this->db->insert('related_products', [
                'product_id'       => $productId,
                'related_ms_id'    => $item['ms_id'],
                'related_title'    => $item['title'],
                'related_icon_url' => $item['icon_url'],
                'related_rating'   => $item['rating'],
                'related_category' => $item['category'],
                'related_price'    => $item['price'],
                'display_order'    => $order + 1,
            ]);
        }
    }

    public function searchForPicker($keyword, $excludeId = 0, $limit = 20) {
        $like = "%{$keyword}%";
        return $this->db->fetchAll(
            "SELECT id, ms_id, title, local_icon, icon_url, rating, category, price, price_type
             FROM products
             WHERE id != ? AND (title LIKE ? OR ms_id LIKE ?)
             ORDER BY id DESC LIMIT ?",
            [$excludeId, $like, $like, $limit]
        );
    }
}
