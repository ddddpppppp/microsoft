/**
 * 扒拉社交網路應用程式 背景图：从应用页拿到「社交」集合产品列表，抓 store 页 og:image 写入 social_card_image 并调 API 入库。
 *
 * 使用前：
 * 1. 执行 SQL：scripts/alter_add_social_card_image.sql
 * 2. 启动 PHP 服务（如 8080）
 *
 * 使用：
 *   set BASE_URL=http://localhost:8080
 *   node scripts/crawl_social_card_images.js
 *
 * 或先只输出到 JSON，再由 PHP 批量写入：
 *   node scripts/crawl_social_card_images.js --dry-run
 *   php scripts/update_social_card_images.php scripts/social_card_images.json
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const OUT_FILE = path.join(__dirname, 'social_card_images.json');
const DRY_RUN = process.argv.includes('--dry-run');

function fetch(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

function extractOgImage(html) {
  if (!html || typeof html !== 'string') return '';
  const m = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i);
  return m && m[1] ? m[1].trim() : '';
}

async function postJson(url, body) {
  const u = new URL(url);
  const lib = u.protocol === 'https:' ? https : http;
  const data = JSON.stringify(body);
  return new Promise((resolve, reject) => {
    const req = lib.request({
      hostname: u.hostname,
      port: u.port || (u.protocol === 'https:' ? 443 : 80),
      path: u.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const apiBase = BASE_URL.replace(/\/$/, '');
  let collections;
  try {
    const body = await fetch(`${apiBase}/api/apps`);
    const data = JSON.parse(body);
    collections = data.collections || [];
  } catch (e) {
    console.error('Failed to fetch /api/apps:', e.message);
    process.exit(1);
  }

  const socialCol = collections.find(
    (c) => c.name === '社交網路應用程式' || (c.slug || '').toLowerCase().includes('social')
  );
  if (!socialCol || !Array.isArray(socialCol.products) || socialCol.products.length === 0) {
    console.error('No 社交網路應用程式 collection or no products.');
    fs.writeFileSync(OUT_FILE, '[]');
    process.exit(0);
  }

  const products = socialCol.products.filter((p) => p.original_url && p.original_url.startsWith('http'));
  console.error('Found', products.length, 'products in 社交網路應用程式');
  const results = [];

  for (const p of products) {
    const id = p.id;
    const url = p.original_url;
    process.stderr.write(`Crawling id=${id} ${p.title || ''} ... `);
    try {
      const html = await fetch(url);
      const imageUrl = extractOgImage(html);
      if (imageUrl) {
        results.push({ id, social_card_image: imageUrl });
        if (!DRY_RUN) {
          const res = await postJson(`${apiBase}/api/product/${id}/social-card-image`, {
            social_card_image: imageUrl
          });
          if (res.status >= 200 && res.status < 300) {
            process.stderr.write('OK (saved)\n');
          } else {
            process.stderr.write(`API ${res.status}\n`);
          }
        } else {
          process.stderr.write('OK (dry-run)\n');
        }
      } else {
        process.stderr.write('(no og:image)\n');
      }
    } catch (e) {
      process.stderr.write(`Error: ${e.message}\n`);
    }
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(results, null, 2));
  console.error('Wrote', results.length, 'to', OUT_FILE);
  if (DRY_RUN) {
    console.error('Run: php scripts/update_social_card_images.php scripts/social_card_images.json');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
