<?php
namespace App\Services;

use App\Core\Redis;

class LoginAttemptService {
    private const MAX_ATTEMPTS = 10;
    private const LOCKOUT_DURATION = 3600;
    
    public function getClientIp(): string {
        $headers = [
            'HTTP_CF_CONNECTING_IP',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_FORWARDED',
            'HTTP_X_CLUSTER_CLIENT_IP',
            'HTTP_FORWARDED_FOR',
            'HTTP_FORWARDED',
            'REMOTE_ADDR'
        ];
        
        foreach ($headers as $header) {
            if (!empty($_SERVER[$header])) {
                $ip = $_SERVER[$header];
                if (strpos($ip, ',') !== false) {
                    $ip = trim(explode(',', $ip)[0]);
                }
                if (filter_var($ip, FILTER_VALIDATE_IP)) {
                    return $ip;
                }
            }
        }
        
        return '0.0.0.0';
    }
    
    private function getKey(string $ip): string {
        return 'login:attempts:' . $ip;
    }
    
    private function getBlockKey(string $ip): string {
        return 'login:blocked:' . $ip;
    }
    
    public function recordAttempt(string $ip, bool $success = false): void {
        $redis = Redis::getInstance();
        if (!$redis->isAvailable()) return;
        
        if ($success) {
            $this->clearAttempts($ip);
            return;
        }
        
        $key = $this->getKey($ip);
        $count = $redis->incr($key);
        
        if ($count === 1) {
            $redis->expire($key, self::LOCKOUT_DURATION);
        }
        
        if ($count >= self::MAX_ATTEMPTS) {
            $redis->set($this->getBlockKey($ip), time(), self::LOCKOUT_DURATION);
        }
    }
    
    public function getFailedAttempts(string $ip): int {
        $redis = Redis::getInstance();
        if (!$redis->isAvailable()) return 0;
        return (int)$redis->get($this->getKey($ip));
    }
    
    public function isBlocked(string $ip): bool {
        $redis = Redis::getInstance();
        if (!$redis->isAvailable()) return false;
        return $redis->exists($this->getBlockKey($ip));
    }
    
    public function getRemainingLockoutTime(string $ip): int {
        $redis = Redis::getInstance();
        if (!$redis->isAvailable()) return 0;
        $ttl = $redis->ttl($this->getBlockKey($ip));
        return max(0, $ttl);
    }
    
    public function clearAttempts(string $ip): void {
        $redis = Redis::getInstance();
        if (!$redis->isAvailable()) return;
        $redis->del($this->getKey($ip));
        $redis->del($this->getBlockKey($ip));
    }
    
    public function getRemainingAttempts(string $ip): int {
        $redis = Redis::getInstance();
        if (!$redis->isAvailable()) return self::MAX_ATTEMPTS;
        $failed = $this->getFailedAttempts($ip);
        return max(0, self::MAX_ATTEMPTS - $failed);
    }
}
