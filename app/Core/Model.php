<?php
namespace App\Core;

class Model {
    protected $table;
    protected $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function all($orderBy = 'id ASC') {
        return $this->db->fetchAll("SELECT * FROM `{$this->table}` ORDER BY $orderBy");
    }

    public function find($id) {
        return $this->db->fetch("SELECT * FROM `{$this->table}` WHERE id = ?", [$id]);
    }

    public function findBy($field, $value) {
        return $this->db->fetch("SELECT * FROM `{$this->table}` WHERE `$field` = ?", [$value]);
    }

    public function where($field, $value, $orderBy = 'id ASC') {
        return $this->db->fetchAll("SELECT * FROM `{$this->table}` WHERE `$field` = ? ORDER BY $orderBy", [$value]);
    }

    public function create($data) {
        return $this->db->insert($this->table, $data);
    }

    public function update($id, $data) {
        $this->db->update($this->table, $data, 'id = ?', [$id]);
    }

    public function delete($id) {
        $this->db->delete($this->table, 'id = ?', [$id]);
    }

    public function count($where = '1=1', $params = []) {
        $row = $this->db->fetch("SELECT COUNT(*) as cnt FROM `{$this->table}` WHERE $where", $params);
        return $row['cnt'] ?? 0;
    }

    public function paginate($page = 1, $perPage = 20, $where = '1=1', $params = [], $orderBy = 'id DESC') {
        $offset = ($page - 1) * $perPage;
        $total = $this->count($where, $params);
        $items = $this->db->fetchAll(
            "SELECT * FROM `{$this->table}` WHERE $where ORDER BY $orderBy LIMIT $perPage OFFSET $offset",
            $params
        );
        return ['items' => $items, 'total' => $total, 'page' => $page, 'per_page' => $perPage, 'total_pages' => ceil($total / $perPage)];
    }
}
