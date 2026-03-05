<?php
namespace App\Models;

use App\Core\Model;
use App\Utils\ArrayHelper;

class Setting extends Model {
    protected $table = 'settings';

    public function getByPage($pageKey) {
        return $this->findBy('page_key', $pageKey);
    }

    public function getByPages(array $pageKeys): array {
        $pageKeys = array_values(array_unique(array_filter(array_map('strval', $pageKeys), function ($v) {
            return $v !== '';
        })));
        if (empty($pageKeys)) {
            return [];
        }

        $placeholders = implode(',', array_fill(0, count($pageKeys), '?'));
        $rows = $this->db->fetchAll(
            "SELECT * FROM settings WHERE page_key IN ($placeholders)",
            $pageKeys
        );
        return ArrayHelper::setKey($rows, 'page_key', 2);
    }

    public function saveByPages(array $dataByPage): void {
        if (empty($dataByPage)) {
            return;
        }

        $pageKeys = array_keys($dataByPage);
        $existingMap = $this->getByPages($pageKeys);

        foreach ($dataByPage as $pageKey => $data) {
            $pageKey = (string)$pageKey;
            if ($pageKey === '' || !is_array($data)) {
                continue;
            }

            if (!empty($existingMap[$pageKey]['id'])) {
                $this->update((int)$existingMap[$pageKey]['id'], $data);
                continue;
            }

            $data['page_key'] = $pageKey;
            $this->create($data);
        }
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
