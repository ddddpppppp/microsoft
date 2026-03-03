<?php
namespace App\Models;

use App\Core\Model;

class AiVocabulary extends Model {
    protected $table = 'ai_vocabularies';

    public function getByGroup($groupId, $orderBy = 'sort_order ASC, id ASC') {
        return $this->db->fetchAll(
            "SELECT * FROM ai_vocabularies WHERE group_id = ? ORDER BY $orderBy",
            [$groupId]
        );
    }

    public function paginateByGroup($groupId, $page = 1, $perPage = 50, $keyword = '') {
        $where = 'group_id = ?';
        $params = [$groupId];
        if ($keyword !== '') {
            $where .= ' AND word LIKE ?';
            $params[] = '%' . $keyword . '%';
        }
        return $this->paginate($page, $perPage, $where, $params, 'sort_order ASC, id ASC');
    }

    public function searchByKeyword($keyword, $limit = 50) {
        return $this->db->fetchAll(
            "SELECT v.*, g.name as group_name
             FROM ai_vocabularies v
             LEFT JOIN ai_vocabulary_groups g ON g.id = v.group_id
             WHERE v.word LIKE ?
             ORDER BY v.word ASC
             LIMIT $limit",
            ['%' . $keyword . '%']
        );
    }

    public function batchCreate($groupId, array $items) {
        $count = 0;
        foreach ($items as $item) {
            $word = trim($item['word'] ?? '');
            if ($word === '') continue;
            $this->db->insert('ai_vocabularies', [
                'group_id'   => $groupId,
                'word'       => $word,
                'url'        => trim($item['url'] ?? ''),
                'sort_order' => 0,
            ]);
            $count++;
        }
        return $count;
    }

    public function getByIds(array $ids) {
        if (empty($ids)) return [];
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        return $this->db->fetchAll(
            "SELECT * FROM ai_vocabularies WHERE id IN ($placeholders)",
            array_values($ids)
        );
    }

    /**
     * Pick random vocabularies from specified groups, always including must-have IDs.
     */
    public function getRandomFromGroups(array $groupIds, int $count, array $mustIds = []): array {
        $must = [];
        if (!empty($mustIds)) {
            $must = $this->getByIds($mustIds);
        }

        $mustIdSet = array_column($must, 'id');

        if (empty($groupIds)) {
            return $must;
        }

        $placeholders = implode(',', array_fill(0, count($groupIds), '?'));
        $excludePlaceholders = '';
        $params = $groupIds;

        if (!empty($mustIdSet)) {
            $excludePlaceholders = ' AND id NOT IN (' . implode(',', array_fill(0, count($mustIdSet), '?')) . ')';
            $params = array_merge($params, $mustIdSet);
        }

        $remaining = max(0, $count - count($must));
        if ($remaining <= 0) {
            return $must;
        }

        $pool = $this->db->fetchAll(
            "SELECT * FROM ai_vocabularies
             WHERE group_id IN ($placeholders) $excludePlaceholders
             ORDER BY RAND()
             LIMIT $remaining",
            $params
        );

        return array_merge($must, $pool);
    }

    public function getAllGrouped() {
        return $this->db->fetchAll(
            "SELECT v.*, g.name as group_name
             FROM ai_vocabularies v
             LEFT JOIN ai_vocabulary_groups g ON g.id = v.group_id
             ORDER BY g.sort_order ASC, g.id ASC, v.sort_order ASC, v.id ASC"
        );
    }

    public function batchDelete(array $ids) {
        if (empty($ids)) return;
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $this->db->query(
            "DELETE FROM ai_vocabularies WHERE id IN ($placeholders)",
            array_values($ids)
        );
    }
}
