<?php
namespace App\Models;

use App\Core\Model;
use App\Utils\ArrayHelper;

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
        if (empty($collections)) {
            return [];
        }

        $collectionIds = array_values(array_filter(array_map(function ($item) {
            return (int)($item['id'] ?? 0);
        }, $collections)));

        if (empty($collectionIds)) {
            return $collections;
        }

        $placeholders = implode(',', array_fill(0, count($collectionIds), '?'));
        $rows = $this->db->fetchAll(
            "SELECT p.*, cp.display_order as sort_order, cp.collection_id
             FROM collection_products cp
             JOIN products p ON cp.product_id = p.id
             WHERE cp.collection_id IN ($placeholders)
             ORDER BY cp.collection_id ASC, cp.display_order ASC",
            $collectionIds
        );
        $productsByCollectionId = ArrayHelper::setKey($rows, 'collection_id', 3);

        foreach ($collections as &$col) {
            $cid = (int)($col['id'] ?? 0);
            $col['products'] = $productsByCollectionId[$cid] ?? [];
        }
        unset($col);
        return $collections;
    }
}
