<?php
namespace App\Core;

class HtmlCache {
    private static $cacheDir;
    private static $ttl = 86400; // 24 hours

    /** 文章列表页缓存 5 分钟 */
    const TTL_LIST = 300;
    /** 文章详情、产品详情 1 年 */
    const TTL_DETAIL_YEAR = 31536000;

    private static function ensureDir($subDir = '') {
        if (!self::$cacheDir) {
            self::$cacheDir = BASE_PATH . '/storage/html_cache';
        }
        $dir = $subDir !== '' ? self::$cacheDir . '/' . $subDir : self::$cacheDir;
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }
        return $dir;
    }

    /**
     * @param string $uri
     * @param int|null $ttl When set, use subdir ttl_{ttl} for this cache (e.g. 600 = 10 min).
     */
    private static function path($uri, $ttl = null) {
        if ($ttl !== null) {
            $subDir = 'ttl_' . (int)$ttl;
            self::ensureDir($subDir);
            return self::$cacheDir . '/' . $subDir . '/' . md5($uri) . '.html';
        }
        self::ensureDir();
        return self::$cacheDir . '/' . md5($uri) . '.html';
    }

    /** Fragment 缓存路径（存 seoData JSON），部署不删；输出时与当前 index.html 合并，故 script 始终最新 */
    private static function pathFragment($uri, $ttl = null) {
        if ($ttl !== null) {
            $subDir = 'ttl_' . (int)$ttl;
            self::ensureDir($subDir);
            return self::$cacheDir . '/' . $subDir . '/' . md5($uri) . '.json';
        }
        self::ensureDir();
        return self::$cacheDir . '/' . md5($uri) . '.json';
    }

    /**
     * 取「内容片段」缓存（仅 title/meta/seo_content 等），未过期返回 array，否则 null。
     * 输出时再与当前 public/dist/index.html 合并，部署更新 JS 后无需清缓存、无需预热。
     */
    public static function getFragment($uri, $ttl = null) {
        $file = self::pathFragment($uri, $ttl);
        if (!file_exists($file)) return null;
        $effectiveTtl = $ttl !== null ? (int)$ttl : self::$ttl;
        if (time() - filemtime($file) > $effectiveTtl) {
            @unlink($file);
            return null;
        }
        $raw = file_get_contents($file);
        if ($raw === false) return null;
        $data = json_decode($raw, true);
        return is_array($data) ? $data : null;
    }

    /**
     * 写入内容片段缓存（JSON），与 getFragment 配对。
     * @param string $uri
     * @param array $seoData
     * @param int|null $ttl
     */
    public static function putFragment($uri, array $seoData, $ttl = null) {
        file_put_contents(self::pathFragment($uri, $ttl), json_encode($seoData, JSON_UNESCAPED_UNICODE));
    }

    /**
     * @param string $uri
     * @param int|null $ttl Optional TTL in seconds; when null use default 24h.
     */
    public static function get($uri, $ttl = null) {
        $file = self::path($uri, $ttl);
        if (!file_exists($file)) return null;
        $effectiveTtl = $ttl !== null ? (int)$ttl : self::$ttl;
        if (time() - filemtime($file) > $effectiveTtl) {
            @unlink($file);
            return null;
        }
        return file_get_contents($file);
    }

    /**
     * @param string $uri
     * @param string $html
     * @param int|null $ttl Optional TTL in seconds; when null use default 24h.
     */
    public static function put($uri, $html, $ttl = null) {
        file_put_contents(self::path($uri, $ttl), $html);
    }

    /**
     * Remove cache for one URI (default + all ttl_* subdirs). 同时删除 .html 与 .json。
     */
    public static function forget($uri) {
        foreach ([self::path($uri), self::pathFragment($uri)] as $f) {
            if (file_exists($f)) @unlink($f);
        }
        self::ensureDir();
        $hash = md5($uri);
        $subdirs = glob(self::$cacheDir . '/ttl_*', GLOB_ONLYDIR);
        foreach ($subdirs as $d) {
            foreach (['.html', '.json'] as $ext) {
                $f = $d . '/' . $hash . $ext;
                if (file_exists($f)) @unlink($f);
            }
        }
    }

    /** 是否存在未过期的片段缓存（用于预热时只选未缓存的文章） */
    public static function hasFragment($uri, $ttl = null): bool {
        return self::getFragment($uri, $ttl) !== null;
    }

    /** 清空所有缓存（含 .html 与 .json） */
    public static function flush() {
        self::ensureDir();
        foreach (['*.html', '*.json'] as $pat) {
            $files = glob(self::$cacheDir . '/' . $pat);
            foreach ($files as $f) {
                @unlink($f);
            }
        }
        $subdirs = glob(self::$cacheDir . '/ttl_*', GLOB_ONLYDIR);
        foreach ($subdirs as $d) {
            foreach (['*.html', '*.json'] as $pat) {
                $files = glob($d . '/' . $pat);
                foreach ($files as $f) {
                    @unlink($f);
                }
            }
        }
    }

    /**
     * 返回需要预热的 URI 列表，供 warm-html-cache 使用（单次 cron 每 5 分钟）。
     * - 列表：前 50 页强制刷新（脚本先 forget 再请求）
     * - 文章详情：前 2000 条尚未生成缓存的才加入
     * - 其它（首页/应用/关于/产品详情）：只请求，失效后再刷新
     * @return array{uris: string[], force_refresh_uris: string[]}
     */
    public static function getWarmableUris(): array {
        $articleModel = new \App\Models\Article();
        $firstPage = $articleModel->paginatePublished(1, 12, '');
        $totalPages = (int)($firstPage['total_pages'] ?? 1);

        $listLimit = 50;
        $forceRefreshUris = ['/articles'];
        for ($p = 2; $p <= min($listLimit, $totalPages); $p++) {
            $forceRefreshUris[] = '/articles/' . $p;
        }

        $articleDetailMax = 2000;
        $articleUris = [];
        foreach ($articleModel->getPublished() as $a) {
            if (count($articleUris) >= $articleDetailMax) break;
            $slug = trim((string)($a['slug'] ?? ''));
            if ($slug === '') continue;
            $uri = '/article/' . $slug;
            if (!self::hasFragment($uri, self::TTL_DETAIL_YEAR)) {
                $articleUris[] = $uri;
            }
        }

        $other = ['/', '/home', '/apps', '/games', '/about'];
        foreach ((new \App\Models\Product())->all('id ASC') as $p) {
            $msId = trim((string)($p['ms_id'] ?? ''));
            $id = (int)($p['id'] ?? 0);
            if ($msId !== '') $other[] = '/detail/' . $msId;
            elseif ($id > 0) $other[] = '/detail/' . $id;
            if (!empty($p['is_own_product'])) {
                $cu = trim((string)($p['custom_url'] ?? ''));
                if ($cu !== '') $other[] = $cu[0] === '/' ? $cu : '/' . $cu;
            }
        }

        $uris = array_values(array_unique(array_merge($forceRefreshUris, $articleUris, $other)));
        return ['uris' => $uris, 'force_refresh_uris' => $forceRefreshUris];
    }
}
