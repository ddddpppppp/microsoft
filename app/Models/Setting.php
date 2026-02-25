<?php
namespace App\Models;

use App\Core\Model;

class Setting extends Model {
    protected $table = 'settings';

    public function getByPage($pageKey) {
        return $this->findBy('page_key', $pageKey);
    }

    public function updateByPage($pageKey, $data) {
        $existing = $this->getByPage($pageKey);
        if ($existing) {
            $this->update($existing['id'], $data);
        } else {
            $data['page_key'] = $pageKey;
            $this->create($data);
        }
    }
}
