<?php
namespace App\Services;

use App\Core\Redis;

class SitemapCache {
    const CACHE_TTL = 600; // 10 minutes
    const REDIS_KEY = 'sitemap:xml:v1';

    private static function filePath() {
        return BASE_PATH . '/storage/sitemap_cache.xml';
    }

    public static function get() {
        $redis = Redis::getInstance();
        if ($redis->isAvailable()) {
            $cached = $redis->get(self::REDIS_KEY);
            if (is_string($cached) && $cached !== '') {
                return $cached;
            }
        }

        $file = self::filePath();
        if (!file_exists($file)) return null;
        if ((time() - filemtime($file)) > self::CACHE_TTL) {
            @unlink($file);
            return null;
        }
        $content = @file_get_contents($file);
        return is_string($content) ? $content : null;
    }

    public static function set($xml) {
        if (!is_string($xml) || $xml === '') return;

        $redis = Redis::getInstance();
        if ($redis->isAvailable()) {
            $redis->set(self::REDIS_KEY, $xml, self::CACHE_TTL);
        }

        @file_put_contents(self::filePath(), $xml);
    }

    public static function clear() {
        $redis = Redis::getInstance();
        if ($redis->isAvailable()) {
            $redis->del(self::REDIS_KEY);
        }
        @unlink(self::filePath());
    }
}
