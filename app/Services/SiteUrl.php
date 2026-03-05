<?php
namespace App\Services;

/**
 * 站点 base URL，供 sitemap、canonical、绝对链接统一使用。
 * 支持环境变量 SITE_BASE_URL 或反向代理 X-Forwarded-Proto / X-Forwarded-Host。
 */
class SiteUrl {
    /**
     * 返回站点 base URL（无尾部斜杠），例如 https://apps-microsoft.net
     */
    public static function getBaseUrl(): string {
        $base = getenv('SITE_BASE_URL');
        if ($base !== false && $base !== '') {
            return rtrim($base, '/');
        }
        $scheme = 'http';
        if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
            $scheme = 'https';
        }
        if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO'])) {
            $scheme = ($_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') ? 'https' : 'http';
        }
        $host = $_SERVER['HTTP_HOST'] ?? '';
        if (!empty($_SERVER['HTTP_X_FORWARDED_HOST'])) {
            $host = trim((string)$_SERVER['HTTP_X_FORWARDED_HOST']);
            if (strpos($host, ',') !== false) {
                $host = trim(explode(',', $host)[0]);
            }
        }
        return $scheme . '://' . $host;
    }
}
