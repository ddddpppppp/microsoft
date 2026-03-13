<?php
namespace App\Models;

use App\Core\Model;

/**
 * 产品统计明细表（来源、设备维度）
 * 表按 created_at 按月分区，可通过 partition_manage_product_stat_events.php 定时删除旧分区
 */
class ProductStatEvent extends Model {
    protected $table = 'product_stat_events';

    /** referrer_type 枚举 */
    const REFERRER_HOME = 'home';
    const REFERRER_CATEGORY = 'category';
    const REFERRER_SEARCH = 'search';
    const REFERRER_COLLECTION = 'collection';
    const REFERRER_DIRECT = 'direct';
    const REFERRER_EXTERNAL = 'external';
    const REFERRER_OTHER = 'other';

    /** device_type 枚举 */
    const DEVICE_MOBILE = 'mobile';
    const DEVICE_PC = 'pc';
    const DEVICE_UNKNOWN = 'unknown';

    /**
     * 记录一次统计事件
     * @param int $productId
     * @param string $eventType 'view' | 'download_click'
     * @param string|null $referrerType 来源类型
     * @param string|null $deviceType 设备类型
     * @param string|null $referrerUrl 完整 referrer URL（可选）
     */
    public function record(int $productId, string $eventType, ?string $referrerType = null, ?string $deviceType = null, ?string $referrerUrl = null): void {
        $referrerType = $this->normalizeReferrerType($referrerType ?? self::REFERRER_OTHER);
        $deviceType = $this->normalizeDeviceType($deviceType ?? self::DEVICE_UNKNOWN);
        $eventType = $eventType === 'download_click' ? 'download_click' : 'view';

        if (strlen($referrerUrl ?? '') > 500) {
            $referrerUrl = substr($referrerUrl, 0, 500);
        }

        $this->db->insert($this->table, [
            'product_id' => $productId,
            'event_type' => $eventType,
            'referrer_type' => $referrerType,
            'device_type' => $deviceType,
            'referrer_url' => $referrerUrl,
        ]);
    }

    /**
     * 从当前请求解析 referrer_type
     * 优先使用前端传入的 ref 参数（document.referrer），因为 HTTP_REFERER 在 API 调用时通常是当前页而非来源页
     */
    public static function detectReferrerType(): string {
        $referrer = $_GET['ref'] ?? $_SERVER['HTTP_REFERER'] ?? '';
        if (is_string($referrer) && strlen($referrer) > 0) {
            $referrer = trim($referrer);
        }
        if ($referrer === '') {
            return self::REFERRER_DIRECT;
        }
        if ($referrer === 'home' || $referrer === '/') {
            return self::REFERRER_HOME;
        }

        $host = self::normalizeHost($_SERVER['HTTP_HOST'] ?? '');
        $refHost = parse_url($referrer, PHP_URL_HOST);
        if ($refHost !== null && $refHost !== '') {
            $refHost = self::normalizeHost($refHost);
            if ($refHost !== $host) {
                return self::REFERRER_EXTERNAL;
            }
        }

        $path = parse_url($referrer, PHP_URL_PATH) ?: '';
        $path = rtrim($path, '/');
        $query = parse_url($referrer, PHP_URL_QUERY) ?: '';

        if (stripos($path, '/search') !== false || stripos($query, 'q=') !== false || stripos($query, 'keyword=') !== false) {
            return self::REFERRER_SEARCH;
        }
        if (stripos($path, '/collection') !== false || stripos($path, '/collections') !== false) {
            return self::REFERRER_COLLECTION;
        }
        if (stripos($path, '/category') !== false || stripos($path, '/c/') !== false) {
            return self::REFERRER_CATEGORY;
        }
        if ($path === '' || $path === '/' || $path === 'home' || $path === '/home' || preg_match('#^/index\.php$#i', $path)) {
            return self::REFERRER_HOME;
        }

        return self::REFERRER_OTHER;
    }

    /** 标准化 host 比较（忽略端口差异，localhost 与 127.0.0.1 视为同域） */
    private static function normalizeHost(string $h): string {
        $h = strtolower(trim($h));
        $h = preg_replace('/:\d+$/', '', $h);
        if ($h === '127.0.0.1') return 'localhost';
        return $h;
    }

    /**
     * 从 User-Agent 解析 device_type
     */
    public static function detectDeviceType(): string {
        $ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
        if (empty($ua)) return self::DEVICE_UNKNOWN;

        $mobileKeywords = ['Mobile', 'Android', 'iPhone', 'iPad', 'iPod', 'webOS', 'BlackBerry', 'IEMobile', 'Opera Mini', 'Windows Phone'];
        foreach ($mobileKeywords as $kw) {
            if (stripos($ua, $kw) !== false) {
                return self::DEVICE_MOBILE;
            }
        }
        return self::DEVICE_PC;
    }

    private function normalizeReferrerType(string $v): string {
        $allowed = [self::REFERRER_HOME, self::REFERRER_CATEGORY, self::REFERRER_SEARCH, self::REFERRER_COLLECTION, self::REFERRER_DIRECT, self::REFERRER_EXTERNAL, self::REFERRER_OTHER];
        return in_array($v, $allowed, true) ? $v : self::REFERRER_OTHER;
    }

    private function normalizeDeviceType(string $v): string {
        $allowed = [self::DEVICE_MOBILE, self::DEVICE_PC, self::DEVICE_UNKNOWN];
        return in_array($v, $allowed, true) ? $v : self::DEVICE_UNKNOWN;
    }

    /**
     * 统计 Bing / Google 来源访问量（仅 product_id=0 的 view 事件）
     */
    public function getBingGoogleStats(?string $startDate, ?string $endDate): array {
        $where = ["product_id = 0", "event_type = 'view'"];
        $params = [];
        if ($startDate !== null && $startDate !== '') {
            $where[] = 'DATE(created_at) >= ?';
            $params[] = $startDate;
        }
        if ($endDate !== null && $endDate !== '') {
            $where[] = 'DATE(created_at) <= ?';
            $params[] = $endDate;
        }
        $where = implode(' AND ', $where);

        $rows = $this->db->fetchAll(
            "SELECT
                SUM(CASE WHEN LOWER(referrer_url) LIKE '%google%' THEN 1 ELSE 0 END) AS google_count,
                SUM(CASE WHEN LOWER(referrer_url) LIKE '%bing%' THEN 1 ELSE 0 END) AS bing_count
             FROM {$this->table}
             WHERE {$where}",
            $params
        );
        $r = $rows[0] ?? [];
        return [
            'google' => (int)($r['google_count'] ?? 0),
            'bing' => (int)($r['bing_count'] ?? 0),
        ];
    }

    /**
     * 按设备类型聚合统计（仅 product_id=0 的 view 事件）
     */
    public function getDeviceStats(?string $startDate, ?string $endDate): array {
        $where = ["product_id = 0", "event_type = 'view'"];
        $params = [];
        if ($startDate !== null && $startDate !== '') {
            $where[] = 'DATE(created_at) >= ?';
            $params[] = $startDate;
        }
        if ($endDate !== null && $endDate !== '') {
            $where[] = 'DATE(created_at) <= ?';
            $params[] = $endDate;
        }
        $where = implode(' AND ', $where);

        $rows = $this->db->fetchAll(
            "SELECT device_type, COUNT(*) AS cnt
             FROM {$this->table}
             WHERE {$where}
             GROUP BY device_type",
            $params
        );
        $result = ['pc' => 0, 'mobile' => 0, 'unknown' => 0];
        foreach ($rows as $r) {
            $k = $r['device_type'] ?? 'unknown';
            if (isset($result[$k])) {
                $result[$k] = (int)$r['cnt'];
            } else {
                $result['unknown'] += (int)$r['cnt'];
            }
        }
        return $result;
    }

    /**
     * 按来源、设备聚合统计（用于后台报表）
     */
    public function getStatsByReferrerAndDevice(int $productId = 0, string $startDate = '', string $endDate = '', int $limit = 50): array {
        $where = ['1=1'];
        $params = [];
        if ($productId > 0) {
            $where[] = 'product_id = ?';
            $params[] = $productId;
        }
        if ($startDate !== '') {
            $where[] = 'DATE(created_at) >= ?';
            $params[] = $startDate;
        }
        if ($endDate !== '') {
            $where[] = 'DATE(created_at) <= ?';
            $params[] = $endDate;
        }
        $where = implode(' AND ', $where);

        return $this->db->fetchAll(
            "SELECT referrer_type, device_type,
                    SUM(CASE WHEN event_type = 'view' THEN 1 ELSE 0 END) AS view_count,
                    SUM(CASE WHEN event_type = 'download_click' THEN 1 ELSE 0 END) AS download_click_count
             FROM {$this->table}
             WHERE {$where}
             GROUP BY referrer_type, device_type
             ORDER BY view_count + download_click_count DESC
             LIMIT ?",
            array_merge($params, [$limit])
        );
    }
}
