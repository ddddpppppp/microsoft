<?php
namespace App\Core;

class HtmlCache {
    private static $cacheDir;
    private static $ttl = 86400; // 24 hours

    private static function ensureDir() {
        if (!self::$cacheDir) {
            self::$cacheDir = BASE_PATH . '/storage/html_cache';
        }
        if (!is_dir(self::$cacheDir)) {
            mkdir(self::$cacheDir, 0777, true);
        }
    }

    private static function path($uri) {
        self::ensureDir();
        return self::$cacheDir . '/' . md5($uri) . '.html';
    }

    public static function get($uri) {
        $file = self::path($uri);
        if (!file_exists($file)) return null;
        if (time() - filemtime($file) > self::$ttl) {
            @unlink($file);
            return null;
        }
        return file_get_contents($file);
    }

    public static function put($uri, $html) {
        file_put_contents(self::path($uri), $html);
    }

    public static function forget($uri) {
        $file = self::path($uri);
        if (file_exists($file)) {
            @unlink($file);
        }
    }

    public static function flush() {
        self::ensureDir();
        $files = glob(self::$cacheDir . '/*.html');
        foreach ($files as $f) {
            @unlink($f);
        }
    }
}
