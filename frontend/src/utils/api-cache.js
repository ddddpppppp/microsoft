const _cache = new Map();

export async function cachedFetch(url, ttl = 5 * 60 * 1000) {
  const entry = _cache.get(url);
  if (entry && Date.now() - entry.ts < ttl) {
    return entry.data;
  }
  const res = await fetch(url);
  const data = await res.json();
  _cache.set(url, { data, ts: Date.now() });
  return data;
}
