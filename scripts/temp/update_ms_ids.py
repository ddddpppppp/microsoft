"""
更新产品 ms_id 脚本

通过产品标题在 Microsoft Store 搜索 API 中查找最新的 productId，
与数据库中的 ms_id 进行比对，若发生变化则自动更新 products 和 related_products 表。

只有标题精确匹配（或高度相似）时才自动更新，否则标记为需要人工确认。

用法:
    python scripts/update_ms_ids.py           # 正常运行
    python scripts/update_ms_ids.py --dry-run # 仅检查，不写入数据库

建议通过 Windows 任务计划程序每天定时执行一次。
"""

import argparse
import os
import re
import time
import unicodedata
import requests
import pymysql

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
DB_CONFIG_PATH = os.path.join(PROJECT_ROOT, "config", "database.php")

SEARCH_API = "https://apps.microsoft.com/api/products/search"
DETAIL_API = "https://apps.microsoft.com/api/ProductsDetails/GetPromoProductDetailsById"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    "Referer": "https://apps.microsoft.com/",
}


def normalize(s):
    """去除商标符号、多余空格、统一大小写，用于标题比对"""
    s = unicodedata.normalize("NFKD", s)
    s = re.sub(r"[™®©]", "", s)
    s = re.sub(r"\s+", " ", s).strip().lower()
    return s


def title_match(db_title, api_title):
    """判断两个标题是否足够相似，返回 (是否匹配, 匹配类型)"""
    a = normalize(db_title)
    b = normalize(api_title)

    if a == b:
        return True, "exact"

    # 一方包含另一方，且短的至少有长的 60% 长度（防止 "Fused" 匹配 "TranslucentTB"）
    shorter, longer = (a, b) if len(a) <= len(b) else (b, a)
    if shorter in longer and len(shorter) >= len(longer) * 0.6:
        return True, "contains"

    return False, "none"


def parse_db_config():
    """从 PHP 配置文件中解析数据库连接信息"""
    with open(DB_CONFIG_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    def extract(key):
        m = re.search(rf"'{key}'\s*=>\s*'([^']*)'", content)
        if m:
            return m.group(1)
        m = re.search(rf"'{key}'\s*=>\s*(\d+)", content)
        if m:
            return int(m.group(1))
        return None

    return {
        "host": extract("host") or "127.0.0.1",
        "port": int(extract("port") or 3306),
        "user": extract("username") or "root",
        "password": extract("password") or "",
        "database": extract("dbname") or "ms_store",
        "charset": extract("charset") or "utf8mb4",
    }


def get_db():
    config = parse_db_config()
    return pymysql.connect(**config, cursorclass=pymysql.cursors.DictCursor)


def get_all_products():
    conn = get_db()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT id, ms_id, title, custom_title FROM products ORDER BY id")
            return cur.fetchall()
    finally:
        conn.close()


def search_product(title):
    """通过标题搜索微软商店，返回所有候选结果"""
    params = {
        "query": title,
        "mediaType": "all",
        "age": "all",
        "price": "all",
        "category": "all",
        "subscription": "all",
        "cursor": "",
        "gl": "HK",
        "hl": "zh-CN",
    }
    try:
        resp = requests.get(SEARCH_API, params=params, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        data = resp.json()
        return data.get("productsList", [])
    except Exception as e:
        print(f"  [错误] 搜索失败: {e}")
        return []


def find_best_match(db_title, candidates):
    """从候选列表中找到标题匹配的产品，返回 (productId, apiTitle, matchType) 或 None"""
    for p in candidates:
        api_title = p.get("title", "")
        matched, match_type = title_match(db_title, api_title)
        if matched:
            return p["productId"], api_title, match_type
    return None, None, None


def verify_ms_id(ms_id):
    """验证 ms_id 是否仍然有效（API 返回 200 但 items 为空也视为失效）"""
    try:
        url = f"{DETAIL_API}/{ms_id}"
        resp = requests.get(url, params={"gl": "HK", "hl": "zh-CN"}, headers=HEADERS, timeout=15)
        if resp.status_code != 200:
            return False
        data = resp.json()
        items = data.get("items") or data.get("productsList") or []
        return len(items) > 0
    except Exception:
        return False


def update_ms_id(old_ms_id, new_ms_id):
    """同时更新 products 表和 related_products 表中的 ms_id"""
    conn = get_db()
    try:
        with conn.cursor() as cur:
            # 检查新 ms_id 是否已被其他产品占用
            cur.execute("SELECT id, title FROM products WHERE ms_id = %s", (new_ms_id,))
            existing = cur.fetchone()
            if existing:
                return -1, existing

            cur.execute("UPDATE products SET ms_id = %s, original_url = REPLACE(original_url, %s, %s) WHERE ms_id = %s",
                        (new_ms_id, old_ms_id, new_ms_id, old_ms_id))
            products_rows = cur.rowcount

            cur.execute(
                "UPDATE related_products SET related_ms_id = %s WHERE related_ms_id = %s",
                (new_ms_id, old_ms_id),
            )
            related_rows = cur.rowcount
        conn.commit()
        return products_rows, related_rows
    finally:
        conn.close()


def main():
    parser = argparse.ArgumentParser(description="更新产品 ms_id")
    parser.add_argument("--dry-run", action="store_true", help="仅检查，不写入数据库")
    args = parser.parse_args()

    print(f"数据库配置: {DB_CONFIG_PATH}")
    config = parse_db_config()
    print(f"连接: {config['user']}@{config['host']}:{config['port']}/{config['database']}\n")

    products = get_all_products()
    if not products:
        print("没有找到需要检查的产品。")
        return

    print(f"共 {len(products)} 个产品需要检查\n")

    updated = 0
    failed = 0
    manual = []

    for p in products:
        name = p["custom_title"] or p["title"]
        current_ms_id = p["ms_id"]
        print(f"[{p['id']}] {name} (当前 ms_id: {current_ms_id})")

        if verify_ms_id(current_ms_id):
            print(f"  ✓ 有效")
            time.sleep(0.3)
            continue

        print(f"  ⚠ 已失效，正在搜索...")

        candidates = search_product(name)
        if not candidates:
            print(f"  ✗ 搜索无结果")
            failed += 1
            time.sleep(1)
            continue

        new_ms_id, matched_title, match_type = find_best_match(name, candidates)

        if not new_ms_id:
            top = candidates[0]
            print(f"  ✗ 无匹配标题，搜索第一条: {top['productId']} | {top['title']}")
            manual.append({"id": p["id"], "name": name, "old": current_ms_id,
                           "suggestion": top["productId"], "suggestion_title": top["title"]})
            failed += 1
            time.sleep(1)
            continue

        if new_ms_id.lower() == current_ms_id.lower():
            print(f"  ✓ ms_id 未变化: {new_ms_id}")
            time.sleep(0.3)
            continue

        print(f"  → 新 ms_id: {new_ms_id} (匹配: {matched_title}, 方式: {match_type})")

        if args.dry_run:
            print(f"  [dry-run] 跳过写入")
            updated += 1
        else:
            p_rows, r_rows = update_ms_id(current_ms_id, new_ms_id)
            if p_rows == -1:
                print(f"  ✗ 冲突: ms_id {new_ms_id} 已被 [{r_rows['id']}] {r_rows['title']} 使用")
                manual.append({"id": p["id"], "name": name, "old": current_ms_id,
                               "suggestion": new_ms_id, "suggestion_title": f"冲突: 已被 {r_rows['title']} 占用"})
                failed += 1
            else:
                print(f"  ✓ 已更新 (products: {p_rows} 行, related_products: {r_rows} 行)")
                updated += 1
        time.sleep(1)

    print(f"\n{'='*60}")
    print(f"完成! 自动更新: {updated}, 失败/需人工: {failed}, 总计: {len(products)}")

    if manual:
        print(f"\n以下 {len(manual)} 个产品标题不匹配，需要人工确认:")
        print("-" * 60)
        for m in manual:
            print(f"  [{m['id']}] {m['name']}")
            print(f"       旧 ms_id: {m['old']}")
            print(f"       建议:     {m['suggestion']} | {m['suggestion_title']}")


if __name__ == "__main__":
    main()
