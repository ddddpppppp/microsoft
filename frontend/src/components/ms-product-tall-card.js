import { LitElement, html, css } from 'lit';
import './ms-rating.js';
import './ms-lazy-img.js';

/**
 * Tall card for game sections: large cover image, bottom overlay with title/rating/price,
 * optional Game Pass and discount badges on cover. Matches Microsoft Store "最畅销的游戏" style.
 */
class MsProductTallCard extends LitElement {
  static properties = {
    product: { type: Object }
  };

  static styles = css`
    :host {
      display: block;
      width: 180px;
      flex-shrink: 0;
    }
    a.card {
      display: block;
      text-decoration: none;
      color: inherit;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      transition: transform 0.2s ease;
    }
    a.card:hover {
      transform: scale(1.02);
    }

    .cover-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 2/3;
      overflow: hidden;
      border-radius: 12px;
      background: #1a1a1a;
    }
    .cover-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* 顶部徽章 */
    .badges {
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      z-index: 3;
      pointer-events: none;
    }
    .badge-left {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .gamepass-badge {
      background: #107c10;
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .discount-badge {
      background: #d13438;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 4px;
    }

    /* 底部渐变遮罩 + 信息 */
    .overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 60px 12px 12px;
      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, transparent 100%);
      z-index: 2;
    }
    .title {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 6px;
      text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }
    .meta {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
    }
    .rating-text {
      font-size: 12px;
      color: rgba(255,255,255,0.85);
    }
    .price-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .price-free {
      font-size: 12px;
      color: #7fba00;
      font-weight: 600;
    }
    .price-value {
      font-size: 12px;
      color: #fff;
      font-weight: 500;
    }
    .price-original {
      font-size: 11px;
      color: rgba(255,255,255,0.6);
      text-decoration: line-through;
    }
    .price-discounted {
      font-size: 12px;
      color: #fff;
      font-weight: 600;
    }
  `;

  constructor() {
    super();
    this.product = {};
  }

  _getCoverSrc() {
    const p = this.product;
    if (!p) return '';
    if (p.cover_url) return p.cover_url;
    if (p.screenshots) {
      try {
        const arr = typeof p.screenshots === 'string' ? JSON.parse(p.screenshots) : p.screenshots;
        if (Array.isArray(arr) && arr[0]) return typeof arr[0] === 'string' ? arr[0] : arr[0].url || '';
      } catch (_) {}
    }
    return p.local_icon || p.icon_url || '';
  }

  _getHref() {
    const p = this.product;
    if (!p) return '#';
    if (p.is_own_product && p.custom_url) return p.custom_url;
    if (p.original_url) return p.original_url;
    if (p.product_id || p.ms_id || p.id) return '/detail/' + (p.product_id || p.ms_id || p.id);
    return '#';
  }

  _renderPrice() {
    const p = this.product;
    if (!p) return '';
    if (p.price_type === 'free' || p.price === '免费' || p.price === 'Free' || p.price === '免费下载') {
      return html`<span class="price-free">免费下载</span>`;
    }
    if (p.price_type === 'owned') {
      return html`<span class="price-value" style="color:#0067b8;">已拥有</span>`;
    }
    if (p.discount_percent && p.original_price) {
      const discounted = p.price || p.original_price;
      return html`
        <span class="price-original">${p.original_price}</span>
        <span class="price-discounted">${discounted}</span>
      `;
    }
    if (p.price) {
      return html`<span class="price-value">${p.price}</span>`;
    }
    return html`<span class="price-free">免费下载</span>`;
  }

  _onClick(e) {
    const href = this._getHref();
    if (href.startsWith('/')) {
      e.preventDefault();
      window.msApp?.navigate(href);
    }
  }

  render() {
    const p = this.product || {};
    const coverSrc = this._getCoverSrc();
    const href = this._getHref();
    const useNav = href.startsWith('/');
    const rating = parseFloat(p.rating) || 0;

    return html`
      <a class="card" href=${href} ${useNav ? 'data-nav' : ''} @click=${this._onClick}>
        <div class="cover-wrap">
          ${coverSrc ? html`<ms-lazy-img class="cover-img" src=${coverSrc} alt="" width="100%" height="100%" radius="0" style="position:absolute;inset:0;"></ms-lazy-img>` : ''}
          <div class="badges">
            <div class="badge-left">
              ${p.has_gamepass ? html`<span class="gamepass-badge">Game Pass</span>` : ''}
            </div>
            ${p.discount_percent ? html`<span class="discount-badge">-${p.discount_percent}%</span>` : ''}
          </div>
          <div class="overlay">
            <div class="title">${p.title || ''}</div>
            <div class="meta">
              ${rating > 0 ? html`
                <ms-rating .value=${rating}></ms-rating>
                <span class="rating-text">${rating.toFixed(1)}</span>
              ` : ''}
            </div>
            <div class="price-row">${this._renderPrice()}</div>
          </div>
        </div>
      </a>
    `;
  }
}
customElements.define('ms-product-tall-card', MsProductTallCard);
