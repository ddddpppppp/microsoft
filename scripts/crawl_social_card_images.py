#!/usr/bin/env python3
"""
扒拉社交網路應用程式背景图：从 Microsoft Store 页面提取第一张屏幕截图（preload link），写入 social_card_image。

使用：
  $env:BASE_URL = "http://localhost:8080"
  python scripts/crawl_social_card_images.py
"""

import os
import re
import sys
import json
import urllib.request
import urllib.error

BASE_URL = os.environ.get('BASE_URL', 'http://localhost:8080').rstrip('/')
OUT_FILE = os.path.join(os.path.dirname(__file__), 'social_card_images.json')
DRY_RUN = '--dry-run' in sys.argv

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.read().decode('utf-8', errors='replace')
    except urllib.error.URLError as e:
        raise RuntimeError(f'Fetch error: {e.reason}')


def extract_first_screenshot(html: str) -> str:
    """从页面 HTML 中提取第一张 preload 截图 URL（非 icon）"""
    matches = re.findall(r'<link\s+rel=["\']preload["\']\s+href=["\'](https://store-images\.s-microsoft\.com/image/[^"\'?]+)', html, re.IGNORECASE)
    for url in matches:
        if 'apps.' in url:
            return url
    matches2 = re.findall(r'<link\s+[^>]*href=["\'](https://store-images\.s-microsoft\.com/image/apps\.[^"\'?]+)', html, re.IGNORECASE)
    if matches2:
        return matches2[0]
    return ''


def post_json(url: str, data: dict) -> dict:
    body = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=body, headers={**HEADERS, 'Content-Type': 'application/json'}, method='POST')
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return {'status': resp.status, 'body': resp.read().decode('utf-8', errors='replace')}
    except urllib.error.HTTPError as e:
        return {'status': e.code, 'body': e.read().decode('utf-8', errors='replace')}
    except urllib.error.URLError as e:
        return {'status': 0, 'body': str(e.reason)}


def main():
    collections = []
    for endpoint in ['/api/home', '/api/apps']:
        api_url = f'{BASE_URL}{endpoint}'
        print(f'Fetching {api_url} ...', file=sys.stderr)
        try:
            data = json.loads(fetch(api_url))
            collections.extend(data.get('collections', []))
        except Exception as e:
            print(f'Warning: Failed to fetch {endpoint}: {e}', file=sys.stderr)

    social_col = None
    for c in collections:
        name = c.get('name', '')
        slug = c.get('slug', '')
        if name == '社交網路應用程式' or 'social' in slug.lower():
            social_col = c
            break

    if not social_col or not social_col.get('products'):
        print('No 社交網路應用程式 collection or no products.', file=sys.stderr)
        with open(OUT_FILE, 'w', encoding='utf-8') as f:
            f.write('[]')
        sys.exit(0)

    products = [p for p in social_col['products'] if p.get('original_url', '').startswith('http')]
    print(f'Found {len(products)} products in 社交網路應用程式', file=sys.stderr)

    results = []
    for p in products:
        pid = p.get('id')
        url = p.get('original_url')
        title = p.get('title', '')
        print(f'Crawling id={pid} {title[:30]} ... ', end='', file=sys.stderr, flush=True)
        try:
            html = fetch(url)
            img_url = extract_first_screenshot(html)
            if img_url:
                results.append({'id': pid, 'social_card_image': img_url})
                if not DRY_RUN:
                    res = post_json(f'{BASE_URL}/api/product/{pid}/social-card-image', {'social_card_image': img_url})
                    if 200 <= res['status'] < 300:
                        print('OK (saved)', file=sys.stderr)
                    else:
                        print(f"API {res['status']}", file=sys.stderr)
                else:
                    print('OK (dry-run)', file=sys.stderr)
            else:
                print('(no screenshot found)', file=sys.stderr)
        except Exception as e:
            print(f'Error: {e}', file=sys.stderr)

    with open(OUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f'Wrote {len(results)} to {OUT_FILE}', file=sys.stderr)
    if DRY_RUN:
        print('Run: php scripts/update_social_card_images.php scripts/social_card_images.json', file=sys.stderr)


if __name__ == '__main__':
    main()
