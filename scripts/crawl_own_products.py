#!/usr/bin/env python3
"""
Crawler script to fetch detailed product information from Microsoft Store
for all own products (is_own_product = 1)

Usage:
    python scripts/crawl_own_products.py
    python scripts/crawl_own_products.py --ms_id 9nztwsqntd0s
"""

import sys
import json
import re
import time
import argparse
import html as html_lib
import mysql.connector
from urllib.request import urlopen, Request
from urllib.parse import quote

# Database config - adjust as needed
DB_CONFIG = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': 'root',
    'database': 'ms_store',
    'charset': 'utf8mb4'
}

def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)

def fetch_url(url, accept='text/html'):
    """Fetch URL with proper headers"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': accept,
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    }
    req = Request(url, headers=headers)
    try:
        with urlopen(req, timeout=30) as response:
            return response.read().decode('utf-8')
    except Exception as e:
        print(f"  [ERROR] Failed to fetch {url}: {e}")
        return None

def fetch_json(url):
    """Fetch JSON from URL"""
    content = fetch_url(url, accept='application/json')
    if content:
        try:
            return json.loads(content)
        except:
            pass
    return None

def parse_ms_store_page(ms_id):
    """Parse Microsoft Store product page and extract data"""
    url = f"https://apps.microsoft.com/detail/{ms_id}?hl=zh-CN&gl=HK"
    print(f"  Fetching page: {url}")
    
    html = fetch_url(url)
    if not html:
        return None
    
    data = {}
    
    # Extract from JSON-LD if available
    json_ld_match = re.search(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
    if json_ld_match:
        try:
            ld_data = json.loads(json_ld_match.group(1))
            if isinstance(ld_data, dict):
                data['title'] = ld_data.get('name', '')
                data['description'] = html_lib.unescape(ld_data.get('description', ''))
                if 'aggregateRating' in ld_data:
                    data['rating'] = ld_data['aggregateRating'].get('ratingValue')
                    data['rating_count'] = ld_data['aggregateRating'].get('ratingCount')
                if 'author' in ld_data:
                    data['developer'] = ld_data['author'].get('name', '')
                if 'image' in ld_data:
                    imgs = ld_data['image']
                    if isinstance(imgs, list) and imgs:
                        data['icon_url'] = imgs[0]
        except Exception as e:
            print(f"  [WARN] Failed to parse JSON-LD: {e}")
    
    # Try to extract full description from __NEXT_DATA__ or similar
    next_data_match = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', html, re.DOTALL)
    if next_data_match:
        try:
            next_data = json.loads(next_data_match.group(1))
            # Navigate to product data
            props = next_data.get('props', {}).get('pageProps', {})
            if 'productDetails' in props:
                pd = props['productDetails']
                if pd.get('description'):
                    data['description'] = html_lib.unescape(pd['description'])
                if pd.get('whatsNew'):
                    data['whats_new'] = html_lib.unescape(pd['whatsNew'])
                if pd.get('publisherName'):
                    data['developer'] = pd['publisherName']
                if pd.get('approximateSizeInBytes'):
                    size_bytes = pd['approximateSizeInBytes']
                    if size_bytes > 1024*1024*1024:
                        data['app_size'] = f"{size_bytes/(1024*1024*1024):.1f} GB"
                    elif size_bytes > 1024*1024:
                        data['app_size'] = f"{size_bytes/(1024*1024):.1f} MB"
                    else:
                        data['app_size'] = f"{size_bytes/1024:.1f} KB"
        except Exception as e:
            pass  # Silently ignore
    
    # Extract description from meta tag
    if not data.get('description'):
        desc_match = re.search(r'<meta name="description" content="([^"]*)"', html)
        if desc_match:
            data['description'] = html_lib.unescape(desc_match.group(1))
    
    # Unescape HTML entities in description
    if data.get('description'):
        data['description'] = html_lib.unescape(data['description'])
    
    # Extract from page content using regex patterns
    # Rating
    if not data.get('rating'):
        rating_match = re.search(r'"averageRating":\s*([\d.]+)', html)
        if rating_match:
            data['rating'] = float(rating_match.group(1))
    
    # Rating count
    if not data.get('rating_count'):
        count_match = re.search(r'(\d+)\s*个评级', html)
        if count_match:
            data['rating_count'] = int(count_match.group(1))
    
    # Screenshots - find URLs with imagePositionInfo containing "Desktop" (actual screenshots)
    # This pattern specifically matches screenshot images, not icons or logos
    screenshot_pattern = r'"imagePositionInfo"\s*:\s*"Desktop/\d+"[^}]*"url"\s*:\s*"([^"]+)"'
    screenshots = re.findall(screenshot_pattern, html)
    
    # Also try alternate pattern where url comes before imagePositionInfo
    alt_pattern = r'"url"\s*:\s*"([^"]+)"[^}]*"imagePositionInfo"\s*:\s*"Desktop/\d+"'
    screenshots.extend(re.findall(alt_pattern, html))
    
    # Clean and deduplicate
    cleaned_screenshots = []
    seen = set()
    for url in screenshots:
        # Decode unicode escapes
        url = url.replace('\\u002F', '/')
        base_url = url.split('?')[0]
        if base_url not in seen:
            cleaned_screenshots.append(url)
            seen.add(base_url)
    
    if cleaned_screenshots:
        data['screenshots'] = cleaned_screenshots[:6]
    
    # What's new
    whats_new_match = re.search(r'此版本中的新增功能.*?<[^>]*>([^<]+)', html, re.DOTALL)
    if whats_new_match:
        data['whats_new'] = whats_new_match.group(1).strip()
    
    # App size
    size_match = re.search(r'近似大小.*?</h3>\s*<[^>]*>([^<]+)', html, re.DOTALL)
    if size_match:
        data['app_size'] = size_match.group(1).strip()
    
    # Last update
    update_match = re.search(r'上次更新日期.*?</h3>\s*<[^>]*>([^<]+)', html, re.DOTALL)
    if update_match:
        data['last_update'] = update_match.group(1).strip()
    
    # Release date
    release_match = re.search(r'发布日期.*?</h3>\s*<[^>]*>([^<]+)', html, re.DOTALL)
    if release_match:
        data['release_date'] = release_match.group(1).strip()
    
    # Age rating
    age_match = re.search(r'"ratingValue":\s*"([^"]+)"', html)
    if age_match:
        age_val = age_match.group(1)
        # Decode unicode escapes like \u002B
        age_val = age_val.encode().decode('unicode_escape')
        data['age_rating'] = html_lib.unescape(age_val)
    
    # Age rating icon
    age_icon_match = re.search(r'"ratingValueLogoUrl":\s*"([^"]+)"', html)
    if age_icon_match:
        data['age_rating_icon'] = age_icon_match.group(1)
    
    # Publisher support
    support_match = re.search(r'"publisherSupportUrl":\s*"([^"]+)"', html)
    if support_match:
        data['publisher_support'] = support_match.group(1)
    
    # Publisher website
    website_match = re.search(r'"publisherWebsiteUrl":\s*"([^"]+)"', html)
    if website_match:
        data['publisher_website'] = website_match.group(1)
    
    # Privacy policy
    privacy_match = re.search(r'"privacyPolicyUrl":\s*"([^"]+)"', html)
    if privacy_match:
        data['privacy_policy_url'] = privacy_match.group(1)
    
    # Supported languages
    lang_match = re.search(r'支持的语言.*?</h3>\s*<[^>]*>([^<]+)', html, re.DOTALL)
    if lang_match:
        data['supported_languages'] = lang_match.group(1).strip()
    
    return data

def fetch_related_products(ms_id, category='', product_type='Application'):
    """Fetch related products from Microsoft Store API"""
    category_encoded = quote(category) if category else ''
    url = f"https://apps.microsoft.com/api/Reco/GetRelatedProductsList/{ms_id}?noItems=6&pgNo=1&productType={product_type}&filteredCategories={category_encoded}&gl=HK&hl=zh-CN"
    
    print(f"  Fetching related products...")
    data = fetch_json(url)
    
    if data and 'productsList' in data:
        return data['productsList']
    return []

def update_product(conn, product_id, updates):
    """Update product in database"""
    if not updates:
        return
    
    cursor = conn.cursor()
    set_clauses = []
    values = []
    
    for field, value in updates.items():
        set_clauses.append(f"`{field}` = %s")
        if isinstance(value, (list, dict)):
            values.append(json.dumps(value, ensure_ascii=False))
        else:
            values.append(value)
    
    values.append(product_id)
    sql = f"UPDATE products SET {', '.join(set_clauses)} WHERE id = %s"
    
    cursor.execute(sql, values)
    conn.commit()
    cursor.close()

def save_related_products(conn, product_id, related_list):
    """Save related products to database"""
    cursor = conn.cursor()
    
    # Clear existing
    cursor.execute("DELETE FROM related_products WHERE product_id = %s", (product_id,))
    
    # Insert new
    for i, r in enumerate(related_list):
        cursor.execute("""
            INSERT INTO related_products 
            (product_id, related_ms_id, related_title, related_icon_url, related_rating, related_category, related_price, display_order)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            product_id,
            r.get('productId', ''),
            r.get('title', ''),
            r.get('iconUrl', ''),
            r.get('averageRating', 0),
            r.get('categories', [''])[0] if r.get('categories') else '',
            r.get('displayPrice', ''),
            i + 1
        ))
    
    conn.commit()
    cursor.close()

def main():
    parser = argparse.ArgumentParser(description='Crawl Microsoft Store product details')
    parser.add_argument('--ms_id', help='Specific MS ID to crawl')
    args = parser.parse_args()
    
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    # Get products to crawl
    if args.ms_id:
        cursor.execute("SELECT * FROM products WHERE ms_id = %s", (args.ms_id,))
    else:
        cursor.execute("SELECT * FROM products WHERE is_own_product = 1 AND ms_id != ''")
    
    products = cursor.fetchall()
    cursor.close()
    
    if not products:
        print("No own products found to crawl")
        print("Make sure products have is_own_product = 1 and a valid ms_id")
        return
    
    print(f"Found {len(products)} product(s) to process\n")
    print("=" * 60)
    
    for product in products:
        ms_id = product['ms_id']
        print(f"\nProcessing: {product['title']} ({ms_id})")
        print("-" * 40)
        
        # Parse page data
        page_data = parse_ms_store_page(ms_id)
        
        if page_data:
            updates = {}
            
            # Map parsed data to database fields
            field_mapping = {
                'description': 'description',
                'rating': 'rating',
                'rating_count': 'rating_count',
                'developer': 'developer',
                'screenshots': 'screenshots',
                'whats_new': 'whats_new',
                'release_date': 'release_date',
                'last_update': 'last_update',
                'app_size': 'app_size',
                'age_rating': 'age_rating',
                'age_rating_icon': 'age_rating_icon',
                'supported_languages': 'supported_languages',
                'publisher_website': 'publisher_website',
                'publisher_support': 'publisher_support',
                'privacy_policy_url': 'privacy_policy_url',
            }
            
            for src_field, db_field in field_mapping.items():
                if src_field in page_data and page_data[src_field]:
                    updates[db_field] = page_data[src_field]
                    value = page_data[src_field]
                    if isinstance(value, str) and len(value) > 80:
                        value = value[:80] + '...'
                    elif isinstance(value, list):
                        value = f"[{len(value)} items]"
                    print(f"  {db_field}: {value}")
            
            if updates:
                update_product(conn, product['id'], updates)
                print(f"  [OK] Updated {len(updates)} fields")
            else:
                print("  [WARN] No data extracted from page")
        else:
            print("  [ERROR] Failed to fetch page")
        
        # Fetch related products
        category = product.get('category', '')
        product_type = 'Game' if product.get('product_type') == 'game' else 'Application'
        related = fetch_related_products(ms_id, category, product_type)
        
        if related:
            save_related_products(conn, product['id'], related)
            print(f"  [OK] Saved {len(related)} related products")
        
        # Rate limiting
        time.sleep(1)
    
    conn.close()
    print("\n" + "=" * 60)
    print("Done!")

if __name__ == '__main__':
    main()
