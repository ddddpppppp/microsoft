import { LitElement, html, css } from 'lit';
import './ms-rating.js';

class MsProductHero extends LitElement {
  static properties = {
    product: { type: Object }
  };

  static styles = css`
    :host { display: block; width: 320px; flex-shrink: 0; }
    .card {
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 12px;
      padding: 16px;
      cursor: pointer;
      transition: background 0.15s ease, box-shadow 0.15s ease;
      height: 100%;
      box-sizing: border-box;
    }
    .card:hover {
      background: #fafafa;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }
    .header {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 12px;
    }
    .icon {
      width: 56px;
      height: 56px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
      background: #f0f0f0;
    }
    .header-info { flex: 1; min-width: 0; }
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #131316;
      line-height: 1.3;
      margin-bottom: 4px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
    }
    .rating-row { margin-bottom: 4px; }
    .category {
      display: inline-block;
      font-size: 11px;
      color: #616161;
      background: #e5e5e5;
      padding: 2px 8px;
      border-radius: 3px;
      margin-bottom: 10px;
    }
    .description {
      font-size: 13px;
      color: #616161;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      margin-bottom: 12px;
    }
    .price-area {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .price-free { font-size: 13px; color: #0e7a0d; font-weight: 600; }
    .price-value { font-size: 13px; color: #131316; font-weight: 600; }
    .price-original { font-size: 12px; color: #767676; text-decoration: line-through; }
    .price-discounted { font-size: 13px; color: #131316; font-weight: 600; }
    .discount-badge {
      font-size: 10px; font-weight: 700; color: #fff;
      background: #c42b1c; padding: 2px 5px; border-radius: 3px; line-height: 1.2;
    }
    .gamepass-badge {
      font-size: 8px; font-weight: 700; color: #fff;
      background: #107c10; padding: 2px 5px; border-radius: 3px;
      text-transform: uppercase; letter-spacing: 0.3px;
      margin-left: auto; flex-shrink: 0; white-space: nowrap;
    }
  `;

  constructor() {
    super();
    this.product = {};
  }

  _handleClick() {
    const p = this.product;
    if (!p) return;
    if (p.is_own_product && p.custom_url) {
      window.location.href = p.custom_url;
    } else if (p.original_url) {
      window.location.href = p.original_url;
    }
  }

  _getIconSrc() {
    const p = this.product;
    if (p.local_icon) return p.local_icon;
    if (p.icon_url) return p.icon_url;
    return '';
  }

  _renderPrice() {
    const p = this.product;
    if (!p) return '';
    if (p.price_type === 'free' || p.price === '免费' || p.price === 'Free' || p.price === '免费下载') {
      return html`<span class="price-free">免费下载</span>`;
    }
    if (p.price_type === 'owned') {
      return html`<span style="font-size:12px;color:#0067b8;">已拥有</span>`;
    }
    if (p.discount_percent && p.original_price) {
      const discounted = p.price || p.original_price;
      return html`
        <span class="price-original">${p.original_price}</span>
        <span class="price-discounted">${discounted}</span>
        <span class="discount-badge">-${p.discount_percent}%</span>
      `;
    }
    if (p.price) {
      return html`<span class="price-value">${p.price}</span>`;
    }
    return html`<span class="price-free">免费下载</span>`;
  }

  render() {
    const p = this.product || {};
    return html`
      <div class="card" @click=${this._handleClick}>
        <div class="header">
          <img class="icon" src=${this._getIconSrc()} alt=${p.title || ''} loading="lazy" />
          <div class="header-info">
            <div class="title">${p.title || ''}</div>
            <div class="rating-row">
              <ms-rating .value=${p.rating || 0}></ms-rating>
            </div>
          </div>
          ${p.has_gamepass ? html`<span class="gamepass-badge">Game Pass</span>` : ''}
        </div>
        ${p.category ? html`<span class="category">${p.category}</span>` : ''}
        ${p.description ? html`<div class="description">${p.description}</div>` : ''}
        <div class="price-area">
          ${this._renderPrice()}
        </div>
      </div>
    `;
  }
}
customElements.define('ms-product-hero', MsProductHero);
