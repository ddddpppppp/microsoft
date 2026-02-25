<?php
namespace App\Core;

class Database {
    private static $instance = null;
    private $pdo;

    private function __construct() {
        $config = require __DIR__ . '/../../config/database.php';
        $dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['dbname']};charset={$config['charset']}";
        $this->pdo = new \PDO($dsn, $config['username'], $config['password'], $config['options']);
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getPdo() {
        return $this->pdo;
    }

    public function query($sql, $params = []) {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    public function fetchAll($sql, $params = []) {
        return $this->query($sql, $params)->fetchAll();
    }

    public function fetch($sql, $params = []) {
        return $this->query($sql, $params)->fetch();
    }

    public function insert($table, $data) {
        $keys = array_keys($data);
        $fields = implode(',', array_map(function($k) { return "`$k`"; }, $keys));
        $placeholders = implode(',', array_fill(0, count($keys), '?'));
        $sql = "INSERT INTO `$table` ($fields) VALUES ($placeholders)";
        $this->query($sql, array_values($data));
        return $this->pdo->lastInsertId();
    }

    public function update($table, $data, $where, $whereParams = []) {
        $set = implode(',', array_map(function($k) { return "`$k` = ?"; }, array_keys($data)));
        $sql = "UPDATE `$table` SET $set WHERE $where";
        $this->query($sql, array_merge(array_values($data), $whereParams));
    }

    public function delete($table, $where, $params = []) {
        $sql = "DELETE FROM `$table` WHERE $where";
        $this->query($sql, $params);
    }
}
