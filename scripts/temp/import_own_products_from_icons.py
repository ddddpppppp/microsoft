#!/usr/bin/env python3
"""
根据 scripts/site_icons 下的图标文件，搜索微软商店并导入 products 表（自有产品）。

功能:
1) 读取图标目录中的图片文件名（不含后缀）作为产品 slug
2) 使用“中文名映射”或 slug 作为关键词在微软商店搜索
3) 获取匹配应用详情
4) 复制图标到 public/assets/images/products
5) 插入/更新数据库 products，标记为 is_own_product = 1

说明:
- custom_url 固定为 "/{slug}"
- local_icon 固定为 "/assets/images/products/{文件名}"
- custom_download_url 使用微软商店详情页地址
"""

from __future__ import annotations

import argparse
import html
import json
import re
import shutil
import time
from pathlib import Path
from typing import Any
from urllib.parse import quote, urlsplit
from urllib.request import Request, urlopen

import mysql.connector
from mysql.connector import errors as mysql_errors


DB_CONFIG = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "root",
    "database": "ms_store",
    "charset": "utf8mb4",
}

# 可按需补充: key=图标文件名(不带后缀), value=用于搜索的中文关键词
# 例如: "shurufa-sougou": "搜狗输入法"
ZH_NAME_MAP: dict[str, str] = {
    "shurufa-sougou": "搜狗输入法",
    "signal-pc": "Signal",
    "edatong": "译达通",
    "zalo-pc": "Zalo",
    "batchatim": "蝙蝠",
    "line-me": "LINE",
    "hello-gtp": "ChatGPT",
    "aifanyicrm": "爱翻译CRM",
    "efyi": "e福音",
    "paopaoim": "泡泡IM",
    "3tiao": "三条",
    "letsvpn-kl": "LetsVPN",
    "youdao-fy": "有道翻译",
    "music-163": "网易云音乐",
    "safew-web": "SafeW",
    "potato-im": "Potato",
    "aisi-i4": "爱思助手",
    "wps-excel": "WPS Office",
    "sunlogin-orayc": "向日葵远程控制",
}

# 可按需精确指定 ms_id，优先级最高（可避免搜索歧义）
MS_ID_MAP: dict[str, str] = {
    # "7-zip": "XPDM3X7FL84X2K",
    "aifanyicrm": "XPFD0ZPGX1K0CC",
    "browser-qq": "XP8LZ1TLKPX6DH",
    "douyin-qishui": "XPFNWJR850BCQZ",
    "hsz-gc": "XPFFR7TM2CPK2P",
    "meeting-tencent": "XP9KMB526PC22Q",
    "music-163": "9NBLGGH6G0JF",
    "pan-baidu": "XP9CXM3N2B06J1",
    "pc-meitu": "9P92JZM0JCLT",
    "xiaohongshu-pc": "XP88X2KJK5CL7C",
}


PROJECT_ROOT = Path(__file__).resolve().parents[1]
ICONS_DIR = PROJECT_ROOT / "scripts" / "site_icons"
TARGET_ICON_DIR = PROJECT_ROOT / "public" / "assets" / "images" / "products"

ALLOWED_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico"}

IMAGE_CT_TO_EXT = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/x-icon": ".ico",
    "image/vnd.microsoft.icon": ".ico",
}


def db_connect():
    return mysql.connector.connect(**DB_CONFIG)


def ensure_db_connection(conn):
    """
    确保连接可用；若已断开则自动重连。
    """
    if conn is None:
        return db_connect()
    try:
        conn.ping(reconnect=True, attempts=3, delay=2)
        return conn
    except Exception:
        try:
            conn.close()
        except Exception:
            pass
        return db_connect()


def fetch_text(url: str) -> str:
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/122.0.0.0 Safari/537.36"
        ),
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    }
    req = Request(url, headers=headers)
    with urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", errors="ignore")


def fetch_bytes(url: str) -> tuple[bytes, str]:
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/122.0.0.0 Safari/537.36"
        ),
        "Accept": "*/*",
    }
    req = Request(url, headers=headers)
    with urlopen(req, timeout=30) as resp:
        content_type = str(resp.headers.get("Content-Type", "")).split(";")[0].strip().lower()
        return resp.read(), content_type


def infer_ext(image_url: str, content_type: str) -> str:
    if content_type in IMAGE_CT_TO_EXT:
        return IMAGE_CT_TO_EXT[content_type]
    path = urlsplit(image_url).path
    suffix = Path(path).suffix.lower()
    if suffix in ALLOWED_EXTS:
        return suffix
    return ".jpg"


def to_text(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, str):
        return value.strip()
    if isinstance(value, (int, float, bool)):
        return str(value)
    if isinstance(value, list):
        return ", ".join([to_text(v) for v in value if to_text(v)])
    if isinstance(value, dict):
        return json.dumps(value, ensure_ascii=False)
    return str(value)


def to_ymd_hms(iso_dt: str) -> str:
    # API 返回格式通常是 2025-11-10T05:48:35Z，数据库里保存常规字符串即可
    text = (iso_dt or "").strip()
    if not text:
        return ""
    return text.replace("T", " ").replace("Z", "")


def encode_screenshots_meta(logo_alt: str, items: list[dict[str, str]]) -> str:
    return json.dumps(
        {"logo_alt": logo_alt, "items": items},
        ensure_ascii=False,
        separators=(",", ":"),
    )


def extract_support_url(payload: dict[str, Any]) -> str:
    support_uris = payload.get("supportUris")
    if not isinstance(support_uris, list):
        return ""
    uris: list[str] = []
    for item in support_uris:
        if isinstance(item, dict):
            uri = to_text(item.get("uri"))
        else:
            uri = to_text(item)
        if uri:
            uris.append(uri)
    if not uris:
        return ""
    for u in uris:
        if u.startswith("http://") or u.startswith("https://"):
            return u
    return uris[0]


def extract_age_rating(payload: dict[str, Any]) -> tuple[str, str]:
    ratings = payload.get("productRatings")
    if not isinstance(ratings, list) or not ratings:
        return "", ""
    first = ratings[0] if isinstance(ratings[0], dict) else {}
    if not first:
        return "", ""

    rating_system = to_text(first.get("ratingSystem"))
    rating_value = to_text(first.get("ratingValue"))
    logo_url = to_text(first.get("ratingValueLogoUrl") or first.get("ratingIconUrl"))

    age_rating = " ".join([s for s in [rating_system, rating_value] if s]).strip()
    return age_rating, logo_url


def detect_product_type(payload: dict[str, Any]) -> str:
    media_type = to_text(payload.get("mediaType")).lower()
    category_id = to_text(payload.get("categoryId")).lower()
    if "game" in media_type or "game" in category_id:
        return "game"
    return "app"


def build_screenshot_items(
    payload: dict[str, Any],
    slug: str,
    title: str,
    dry_run: bool,
    max_items: int = 8,
) -> list[dict[str, str]]:
    images = payload.get("images", [])
    if not isinstance(images, list):
        return []

    TARGET_ICON_DIR.mkdir(parents=True, exist_ok=True)
    items: list[dict[str, str]] = []
    shot_index = 0

    for image in images:
        if not isinstance(image, dict):
            continue
        if to_text(image.get("imageType")).lower() != "screenshot":
            continue
        img_url = to_text(image.get("url"))
        if not img_url:
            continue
        shot_index += 1
        if shot_index > max_items:
            break

        if dry_run:
            local_url = f"/assets/images/products/{slug}-screenshot-{shot_index}.jpg"
        else:
            raw, ct = fetch_bytes(img_url)
            ext = infer_ext(img_url, ct)
            filename = f"{slug}-screenshot-{shot_index}{ext}"
            dst = TARGET_ICON_DIR / filename
            with open(dst, "wb") as f:
                f.write(raw)
            local_url = f"/assets/images/products/{filename}"

        alt = f"{title} screenshot {shot_index}".strip()
        items.append({"url": local_url, "alt": alt})

    return items


def normalize_slug(raw: str) -> str:
    slug = raw.strip().lower()
    slug = slug.replace(" ", "-")
    slug = re.sub(r"[^a-z0-9\-_]+", "-", slug)
    slug = re.sub(r"-{2,}", "-", slug).strip("-")
    return slug or "unknown-product"


def to_search_keyword(slug: str) -> str:
    if slug in ZH_NAME_MAP and ZH_NAME_MAP[slug].strip():
        return ZH_NAME_MAP[slug].strip()
    # 兜底: 用 slug 自身做检索词
    return slug.replace("-", " ").strip()


def has_cjk(text: str) -> bool:
    return bool(re.search(r"[\u4e00-\u9fff]", text))


def normalize_for_match(text: str) -> str:
    s = (text or "").lower()
    return re.sub(r"[^a-z0-9\u4e00-\u9fff]+", "", s)


def search_ms_store_id(keyword: str) -> str | None:
    # 使用微软商店页面真实调用的搜索接口
    url = (
        "https://apps.microsoft.com/api/products/search"
        f"?query={quote(keyword)}&mediaType=all&age=all&price=all"
        "&category=all&subscription=all&cursor=&gl=CN&hl=zh-CN"
    )
    payload = json.loads(fetch_text(url))
    search_results = payload.get("productsList", [])
    if not isinstance(search_results, list) or not search_results:
        return None

    keyword = keyword.strip()
    if not keyword:
        return None

    keyword_norm = normalize_for_match(keyword)
    keyword_is_cjk = has_cjk(keyword)

    best_id = None
    best_score = -1

    for item in search_results:
        pid = str(item.get("productId", "")).strip().upper()
        title = str(item.get("title", "")).strip()
        if not pid or not title:
            continue

        title_norm = normalize_for_match(title)
        score = 0

        if keyword_is_cjk:
            # 中文关键词：必须至少命中一次包含，避免误匹配
            if keyword in title or keyword_norm in title_norm:
                score += 100
            else:
                continue
        else:
            token_hits = 0
            tokens = [t for t in re.split(r"[\s\-_/]+", keyword.lower()) if t.strip()]
            if keyword_norm and keyword_norm in title_norm:
                score += 80
            # token 命中加分
            for token in tokens:
                if token in title.lower():
                    token_hits += 1
                    score += 10

            # 多 token 场景至少命中 2 个，避免明显误匹配
            if len(tokens) >= 2 and token_hits < 2 and (keyword_norm not in title_norm):
                continue

        if score > best_score:
            best_score = score
            best_id = pid

    return best_id


def fetch_product_detail(ms_id: str) -> dict[str, Any]:
    api_url = (
        "https://apps.microsoft.com/api/ProductsDetails/GetProductDetailsById/"
        f"{ms_id}?gl=CN&hl=zh-CN"
    )
    detail_page_url = f"https://apps.microsoft.com/detail/{ms_id}?hl=zh-cn&gl=CN"
    payload = json.loads(fetch_text(api_url))

    result: dict[str, Any] = {
        "ms_id": ms_id,
        "detail_url": detail_page_url,
        "title": str(payload.get("title", "")).strip(),
        "description": html.unescape(str(payload.get("description", "")).strip()),
        "developer": str(payload.get("developerName", "")).strip()
        or str(payload.get("publisherName", "")).strip(),
        "category": (
            str((payload.get("categories") or [""])[0]).strip()
            if isinstance(payload.get("categories"), list)
            else str(payload.get("categoryId", "")).strip()
        ),
        "price": "Free",
        "price_type": "free",
    }

    display_price = str(payload.get("displayPrice", "")).strip()
    numeric_price = payload.get("price")
    if display_price:
        result["price"] = display_price
    elif numeric_price not in (None, ""):
        result["price"] = str(numeric_price)

    price_text = str(result["price"]).lower()
    if (
        "free" in price_text
        or "免费下载" in str(result["price"])
        or str(numeric_price) in {"0", "0.0", "0.00"}
    ):
        result["price_type"] = "free"
    else:
        result["price_type"] = "paid"

    if payload.get("averageRating") not in (None, ""):
        try:
            result["rating"] = float(payload["averageRating"])
        except Exception:
            pass
    if payload.get("ratingCount") not in (None, ""):
        try:
            result["rating_count"] = int(payload["ratingCount"])
        except Exception:
            pass

    images = payload.get("images", [])
    if isinstance(images, list):
        for image in images:
            if not isinstance(image, dict):
                continue
            image_type = str(image.get("imageType", "")).lower()
            image_url = str(image.get("url", "")).strip()
            if image_type == "logo" and image_url:
                result["icon_url"] = image_url
                break
        if "icon_url" not in result:
            for image in images:
                if isinstance(image, dict) and image.get("url"):
                    result["icon_url"] = str(image["url"]).strip()
                    break

    result["payload"] = payload
    return result


def copy_icon(src: Path, slug: str) -> str:
    TARGET_ICON_DIR.mkdir(parents=True, exist_ok=True)
    ext = src.suffix.lower() if src.suffix else ".png"
    filename = f"{slug}{ext}"
    dst = TARGET_ICON_DIR / filename
    shutil.copy2(src, dst)
    return f"/assets/images/products/{filename}"


def upsert_product(conn, data: dict[str, Any]) -> tuple[str, int]:
    """
    返回: (action, product_id)
    action: inserted | updated
    """
    cursor = conn.cursor(dictionary=True)

    ms_id = data["ms_id"]
    custom_url = data["custom_url"]

    cursor.execute("SELECT id FROM products WHERE ms_id = %s LIMIT 1", (ms_id,))
    row = cursor.fetchone()
    if not row:
        cursor.execute(
            "SELECT id FROM products WHERE custom_url = %s AND is_own_product = 1 LIMIT 1",
            (custom_url,),
        )
        row = cursor.fetchone()

    fields = {
        "ms_id": ms_id,
        "title": data.get("title", ""),
        "description": data.get("description", ""),
        "icon_url": data.get("icon_url", ""),
        "local_icon": data.get("local_icon", ""),
        "rating": data.get("rating", 0.0),
        "rating_count": data.get("rating_count", 0),
        "category": data.get("category", ""),
        "price": data.get("price", "Free"),
        "price_type": data.get("price_type", "free"),
        "original_price": data.get("original_price", ""),
        "discount_percent": data.get("discount_percent", ""),
        "original_url": data.get("detail_url", ""),
        "custom_url": custom_url,
        "custom_title": data.get("title", ""),
        "custom_keywords": data.get("custom_keywords", ""),
        "custom_description": data.get("description", ""),
        "custom_download_url": data.get("detail_url", ""),
        "is_own_product": 1,
        "product_type": data.get("product_type", "app"),
        "has_gamepass": data.get("has_gamepass", 0),
        "developer": data.get("developer", ""),
        "screenshots": data.get("screenshots", ""),
        "whats_new": data.get("whats_new", ""),
        "release_date": data.get("release_date", ""),
        "last_update": data.get("last_update", ""),
        "app_size": data.get("app_size", ""),
        "system_requirements": data.get("system_requirements", ""),
        "age_rating": data.get("age_rating", ""),
        "age_rating_icon": data.get("age_rating_icon", ""),
        "supported_languages": data.get("supported_languages", ""),
        "publisher_website": data.get("publisher_website", ""),
        "publisher_support": data.get("publisher_support", ""),
        "privacy_policy_url": data.get("privacy_policy_url", ""),
        "social_card_image": data.get("social_card_image", ""),
    }

    if row:
        product_id = int(row["id"])
        set_sql = ", ".join([f"`{k}`=%s" for k in fields.keys()])
        values = list(fields.values()) + [product_id]
        cursor.execute(f"UPDATE products SET {set_sql} WHERE id = %s", values)
        conn.commit()
        cursor.close()
        return "updated", product_id

    columns = ", ".join([f"`{k}`" for k in fields.keys()])
    placeholders = ", ".join(["%s"] * len(fields))
    cursor.execute(
        f"INSERT INTO products ({columns}) VALUES ({placeholders})",
        list(fields.values()),
    )
    conn.commit()
    product_id = int(cursor.lastrowid)
    cursor.close()
    return "inserted", product_id


def find_existing_product_id(conn, ms_id: str, custom_url: str) -> int:
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM products WHERE ms_id = %s LIMIT 1", (ms_id,))
    row = cursor.fetchone()
    if not row:
        cursor.execute(
            "SELECT id FROM products WHERE custom_url = %s AND is_own_product = 1 LIMIT 1",
            (custom_url,),
        )
        row = cursor.fetchone()
    cursor.close()
    if not row:
        return 0
    return int(row[0])


def iter_icon_files(icon_dir: Path) -> list[Path]:
    files: list[Path] = []
    for p in sorted(icon_dir.iterdir(), key=lambda x: x.name.lower()):
        if p.is_file() and p.suffix.lower() in ALLOWED_EXTS:
            files.append(p)
    return files


def main() -> None:
    parser = argparse.ArgumentParser(
        description="从 scripts/site_icons 导入自有产品到 ms_store.products"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="仅打印结果，不写数据库、不复制文件",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=0,
        help="限制处理数量（0=全部）",
    )
    parser.add_argument(
        "--update-existing",
        action="store_true",
        help="默认跳过已存在产品；加此参数则允许更新已存在产品",
    )
    args = parser.parse_args()

    if not ICONS_DIR.exists():
        raise SystemExit(f"图标目录不存在: {ICONS_DIR}")

    icon_files = iter_icon_files(ICONS_DIR)
    if args.limit > 0:
        icon_files = icon_files[: args.limit]

    if not icon_files:
        raise SystemExit(f"未找到图标文件: {ICONS_DIR}")

    print(f"发现图标 {len(icon_files)} 个")
    print("=" * 60)

    conn = None if args.dry_run else db_connect()
    inserted = 0
    updated = 0
    skipped = 0

    try:
        for icon_path in icon_files:
            raw_name = icon_path.stem
            slug = normalize_slug(raw_name)
            custom_url = f"/{slug}"
            keyword = to_search_keyword(slug)
            print(f"\n处理: {icon_path.name}")
            print(f"  slug: {slug}")
            print(f"  keyword: {keyword}")

            manual_ms_id = str(MS_ID_MAP.get(slug, "")).strip().upper()
            if manual_ms_id:
                ms_id = manual_ms_id
                print(f"  ms_id(from map): {ms_id}")
            else:
                try:
                    ms_id = search_ms_store_id(keyword)
                except Exception as exc:  # noqa: BLE001
                    print(f"  [SKIP] 搜索失败: {exc}")
                    skipped += 1
                    continue

            if not ms_id:
                print("  [SKIP] 未检索到微软商店应用")
                skipped += 1
                continue

            if not manual_ms_id:
                print(f"  ms_id: {ms_id}")

            if not args.dry_run and not args.update_existing:
                conn = ensure_db_connection(conn)
                existing_id = find_existing_product_id(conn, ms_id, custom_url)
                if existing_id:
                    print(f"  [SKIP] 已存在产品 id={existing_id}（ms_id/custom_url 命中）")
                    skipped += 1
                    continue

            try:
                detail = fetch_product_detail(ms_id)
            except Exception as exc:  # noqa: BLE001
                print(f"  [SKIP] 拉取详情失败: {exc}")
                skipped += 1
                continue

            local_icon = f"/assets/images/products/{slug}{icon_path.suffix.lower()}"
            if not args.dry_run:
                local_icon = copy_icon(icon_path, slug)

            raw_payload = detail.get("payload", {}) if isinstance(detail, dict) else {}
            title_for_meta = to_text(detail.get("title")) or slug
            screenshot_items = build_screenshot_items(
                raw_payload if isinstance(raw_payload, dict) else {},
                slug=slug,
                title=title_for_meta,
                dry_run=args.dry_run,
                max_items=8,
            )
            screenshots_meta = encode_screenshots_meta(title_for_meta, screenshot_items)

            notes = raw_payload.get("notes") if isinstance(raw_payload, dict) else None
            features = raw_payload.get("features") if isinstance(raw_payload, dict) else None
            whats_new = ""
            if isinstance(notes, list):
                whats_new = "\n".join([to_text(x) for x in notes if to_text(x)]).strip()
            if not whats_new and isinstance(features, list):
                whats_new = "\n".join([to_text(x) for x in features if to_text(x)]).strip()

            age_rating, age_rating_icon = extract_age_rating(raw_payload if isinstance(raw_payload, dict) else {})

            supported_languages = to_text(
                raw_payload.get("supportedLanguages") if isinstance(raw_payload, dict) else ""
            )
            system_requirements_raw = (
                raw_payload.get("systemRequirements") if isinstance(raw_payload, dict) else {}
            )
            system_requirements = (
                json.dumps(system_requirements_raw, ensure_ascii=False, separators=(",", ":"))
                if isinstance(system_requirements_raw, (dict, list)) and system_requirements_raw
                else ""
            )

            app_size = ""
            if isinstance(system_requirements_raw, dict):
                candidates: list[str] = []
                for section in ("minimum", "recommended"):
                    section_val = system_requirements_raw.get(section, {})
                    items = section_val.get("items", []) if isinstance(section_val, dict) else []
                    if not isinstance(items, list):
                        continue
                    for it in items:
                        if not isinstance(it, dict):
                            continue
                        item_name = to_text(it.get("name")).lower()
                        if "存储" in item_name or "storage" in item_name or "disk" in item_name:
                            desc = to_text(it.get("description"))
                            if desc:
                                candidates.append(desc)
                if candidates:
                    app_size = candidates[0]

            strikethrough_price = to_text(
                raw_payload.get("strikethroughPrice") if isinstance(raw_payload, dict) else ""
            )

            price_text = to_text(detail.get("price"))
            discount_percent = ""
            if strikethrough_price and price_text:
                # 简单提取数字估算折扣，提取失败则留空
                m_old = re.search(r"(\d+(?:\.\d+)?)", strikethrough_price.replace(",", ""))
                m_new = re.search(r"(\d+(?:\.\d+)?)", price_text.replace(",", ""))
                if m_old and m_new:
                    try:
                        old_v = float(m_old.group(1))
                        new_v = float(m_new.group(1))
                        if old_v > 0 and 0 <= new_v < old_v:
                            discount_percent = f"{round((old_v - new_v) / old_v * 100)}%"
                    except Exception:
                        discount_percent = ""

            publisher_website = to_text(
                raw_payload.get("appWebsiteUrl") if isinstance(raw_payload, dict) else ""
            )
            publisher_support = extract_support_url(raw_payload if isinstance(raw_payload, dict) else {})
            privacy_policy_url = to_text(
                raw_payload.get("privacyUrl") if isinstance(raw_payload, dict) else ""
            )
            social_card_image = to_text(
                raw_payload.get("pdpImageUrl") if isinstance(raw_payload, dict) else ""
            )

            release_date = to_ymd_hms(
                to_text(raw_payload.get("packageLastUpdateDateUtc") if isinstance(raw_payload, dict) else "")
            )
            last_update = to_ymd_hms(
                to_text(raw_payload.get("lastUpdateDateUtc") if isinstance(raw_payload, dict) else "")
            )
            product_type = detect_product_type(raw_payload if isinstance(raw_payload, dict) else {})
            custom_keywords = ", ".join(
                [x for x in [title_for_meta, to_text(detail.get("developer")), to_text(detail.get("category"))] if x]
            )

            payload = {
                **detail,
                "custom_url": custom_url,
                "local_icon": local_icon,
                "screenshots": screenshots_meta,
                "whats_new": whats_new,
                "release_date": release_date,
                "last_update": last_update,
                "app_size": app_size,
                "system_requirements": system_requirements,
                "age_rating": age_rating,
                "age_rating_icon": age_rating_icon,
                "supported_languages": supported_languages,
                "publisher_website": publisher_website,
                "publisher_support": publisher_support,
                "privacy_policy_url": privacy_policy_url,
                "social_card_image": social_card_image,
                "original_price": strikethrough_price,
                "discount_percent": discount_percent,
                "product_type": product_type,
                "has_gamepass": 0,
                "custom_keywords": custom_keywords,
            }

            title = payload.get("title", "") or "(无标题)"
            print(f"  title: {title}")
            print(f"  custom_url: {custom_url}")
            print(f"  local_icon: {local_icon}")
            print(f"  screenshots: {len(screenshot_items)} 张")

            if args.dry_run:
                print("  [DRY-RUN] 跳过入库")
            else:
                conn = ensure_db_connection(conn)
                try:
                    action, product_id = upsert_product(conn, payload)
                except (mysql_errors.OperationalError, mysql_errors.InterfaceError) as exc:
                    # 连接中途断开时重连并重试一次
                    print(f"  [WARN] 数据库连接异常，正在重连重试: {exc}")
                    conn = ensure_db_connection(None)
                    action, product_id = upsert_product(conn, payload)
                if action == "inserted":
                    inserted += 1
                else:
                    updated += 1
                print(f"  [OK] {action} product_id={product_id}")

            time.sleep(0.8)
    finally:
        if conn:
            conn.close()

    print("\n" + "=" * 60)
    if args.dry_run:
        print(f"完成(DRY-RUN): 跳过写入 {len(icon_files)}，检索失败/跳过 {skipped}")
    else:
        print(f"完成: 新增 {inserted}，更新 {updated}，跳过 {skipped}")


if __name__ == "__main__":
    main()
