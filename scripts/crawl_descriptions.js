/**
 * Crawl Microsoft Store (or any) product pages and extract description from HTML.
 * Reads list from API: GET {BASE_URL}/api/products-missing-description
 * Writes scripts/descriptions.json for: php scripts/update_descriptions.php scripts/descriptions.json
 *
 * Usage (with PHP server running on 8080):
 *   set BASE_URL=http://localhost:8080
 *   node scripts/crawl_descriptions.js
 *
 * Or pass list file (JSON array of {id, original_url}) as first argument:
 *   node scripts/crawl_descriptions.js list.json
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const OUT_FILE = path.join(__dirname, 'descriptions.json');

function fetch(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

function extractDescription(html) {
  if (!html || typeof html !== 'string') return '';
  const og = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']*)["']/i);
  if (og && og[1]) return decodeEntities(og[1].trim());
  const meta = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  if (meta && meta[1]) return decodeEntities(meta[1].trim());
  return '';
}

function decodeEntities(s) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

async function main() {
  let list;
  const listFile = process.argv[2];
  if (listFile && fs.existsSync(listFile)) {
    list = JSON.parse(fs.readFileSync(listFile, 'utf8'));
  } else {
    const apiUrl = `${BASE_URL.replace(/\/$/, '')}/api/products-missing-description`;
    console.error('Fetching list from', apiUrl);
    const body = await fetch(apiUrl);
    list = JSON.parse(body);
  }
  if (!Array.isArray(list) || list.length === 0) {
    console.error('No products to crawl.');
    fs.writeFileSync(OUT_FILE, '[]');
    return;
  }
  const results = [];
  for (const item of list) {
    const url = item.original_url;
    const id = item.id;
    if (!url) continue;
    process.stderr.write(`Crawling id=${id} ${url.slice(0, 50)}... `);
    try {
      const html = await fetch(url);
      const description = extractDescription(html);
      if (description) {
        results.push({ id, description });
        process.stderr.write('OK\n');
      } else {
        process.stderr.write('(no description found)\n');
      }
    } catch (e) {
      process.stderr.write(`Error: ${e.message}\n`);
    }
  }
  fs.writeFileSync(OUT_FILE, JSON.stringify(results, null, 2));
  console.error('Wrote', results.length, 'descriptions to', OUT_FILE);
  console.error('Run: php scripts/update_descriptions.php scripts/descriptions.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
