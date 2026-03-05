<?php
namespace App\Core;

class Database {
    private static $instance = null;
    private $pdo;
    private $config;

    private function __construct() {
        $this->config = require __DIR__ . '/../../config/database.php';
        $this->connect();
    }

    public static function getInstance(bool $forceNew = false) {
        if ($forceNew || self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getPdo() {
        return $this->pdo;
    }

    public function query($sql, $params = []) {
        try {
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (\PDOException $e) {
            if (!$this->isGoneAway($e)) {
                throw $e;
            }

            // Long-running cron jobs may hit MySQL wait_timeout; reconnect and retry once.
            $this->connect();
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        }
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

    private function connect(): void {
        $dsn = "mysql:host={$this->config['host']};port={$this->config['port']};dbname={$this->config['dbname']};charset={$this->config['charset']}";
        $this->pdo = new \PDO($dsn, $this->config['username'], $this->config['password'], $this->config['options']);
    }

    private function isGoneAway(\PDOException $e): bool {
        $code = (int)$e->getCode();
        if ($code === 2006 || $code === 2013) {
            return true;
        }

        $message = strtolower($e->getMessage());
        return str_contains($message, 'server has gone away')
            || str_contains($message, 'lost connection');
    }
}
