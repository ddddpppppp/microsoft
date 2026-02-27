<?php
namespace App\Core;

class Redis {
    private static $instance = null;
    private $redis = null;
    private $prefix;
    private $available = false;
    
    private function __construct() {
        $config = require BASE_PATH . '/config/redis.php';
        $this->prefix = $config['prefix'] ?? '';
        
        try {
            $this->redis = new \Redis();
            $connected = @$this->redis->connect($config['host'], $config['port'], 1);
            if ($connected) {
                if (!empty($config['password'])) {
                    $this->redis->auth($config['password']);
                }
                $this->redis->select($config['database'] ?? 0);
                $this->available = true;
            }
        } catch (\Throwable $e) {
            $this->available = false;
        }
    }
    
    public static function getInstance(): self {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function isAvailable(): bool {
        return $this->available;
    }
    
    public function get(string $key) {
        if (!$this->available) return null;
        $value = $this->redis->get($this->prefix . $key);
        if ($value === false) return null;
        $decoded = json_decode($value, true);
        return $decoded === null ? $value : $decoded;
    }
    
    public function set(string $key, $value, int $ttl = 0): bool {
        if (!$this->available) return false;
        $data = is_array($value) ? json_encode($value) : $value;
        if ($ttl > 0) {
            return $this->redis->setex($this->prefix . $key, $ttl, $data);
        }
        return $this->redis->set($this->prefix . $key, $data);
    }
    
    public function del(string $key): bool {
        if (!$this->available) return false;
        return $this->redis->del($this->prefix . $key) > 0;
    }
    
    public function incr(string $key): int {
        if (!$this->available) return 0;
        return $this->redis->incr($this->prefix . $key);
    }
    
    public function expire(string $key, int $ttl): bool {
        if (!$this->available) return false;
        return $this->redis->expire($this->prefix . $key, $ttl);
    }
    
    public function ttl(string $key): int {
        if (!$this->available) return -1;
        return $this->redis->ttl($this->prefix . $key);
    }
    
    public function exists(string $key): bool {
        if (!$this->available) return false;
        return (bool)$this->redis->exists($this->prefix . $key);
    }
}
