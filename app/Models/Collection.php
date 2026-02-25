<?php
namespace App\Models;

use App\Core\Model;

class Collection extends Model {
    protected $table = 'collections';

    public function getByPage($page) {
        return $this->db->fetchAll(
            "SELECT * FROM collections WHERE page = ? ORDER BY display_order ASC",
            [$page]
        );
    }

    public function getWithProducts($collectionId) {
        $collection = $this->find($collectionId);
        if (!$collection) return null;

        $products = $this->db->fetchAll(
            "SELECT p.*, cp.display_order as sort_order
             FROM collection_products cp
             JOIN products p ON cp.product_id = p.id
             WHERE cp.collection_id = ?
             ORDER BY cp.display_order ASC",
            [$collectionId]
        );
        $collection['products'] = $products;
        return $collection;
    }

    public function getPageData($page) {
        $collections = $this->getByPage($page);
        foreach ($collections as &$col) {
            $col['products'] = $this->db->fetchAll(
                "SELECT p.*, cp.display_order as sort_order
                 FROM collection_products cp
                 JOIN products p ON cp.product_id = p.id
                 WHERE cp.collection_id = ?
                 ORDER BY cp.display_order ASC",
                [$col['id']]
            );
        }
        return $collections;
    }
}
