<?php
namespace App\Models;

use App\Core\Model;

class AiVocabularyGroup extends Model {
    protected $table = 'ai_vocabulary_groups';

    public function getAllWithCount() {
        return $this->db->fetchAll(
            "SELECT g.*, COUNT(v.id) as vocab_count
             FROM ai_vocabulary_groups g
             LEFT JOIN ai_vocabularies v ON v.group_id = g.id
             GROUP BY g.id
             ORDER BY g.sort_order ASC, g.id ASC"
        );
    }
}
