import { LitElement, html, css } from 'lit';
import './ms-rating.js';
import './ms-lazy-img.js';

class MsProductCard extends LitElement {
  static properties = {
    product: { type: Object }
  };

  static styles = css`
    :host {
      display: block;
      width: 148px;
      flex-shrink: 0;
    }
    .card {
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      transition: background 0.12s ease;
      background: transparent;
    }
    .card:hover {
      background: rgba(0, 0, 0, 0.04);
    }
    .icon-wrapper {
      position: relative;
      width: 68px;
      height: 68px;
      margin-bottom: 8px;
    }
    ms-lazy-img {
      display: block;
    }
    .gamepass-badge {
      position: absolute;
      top: -3px;
      left: -3px;
      background: #107c10;
      color: #fff;
      font-size: 8px;
      font-weight: 700;
      padding: 2px 5px;
      border-radius: 3px;
      line-height: 1.2;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .title {
      font-size: 13px;
      color: #1a1a1a;
      line-height: 1.3;
      margin-bottom: 4px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
      font-weight: 400;
    }
    .rating-row { margin-bottom: 3px; }
    .category {
      font-size: 12px;
      color: #616161;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .price-area {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
    }
    .price-free {
      font-size: 12px;
      color: #0e7a0d;
      font-weight: 600;
    }
    .price-value {
      font-size: 12px;
      color: #1a1a1a;
      font-weight: 600;
    }
    .price-original {
      font-size: 11px;
      color: #767676;
      text-decoration: line-through;
    }
    .price-discounted {
      font-size: 12px;
      color: #1a1a1a;
      font-weight: 600;
    }
    .discount-badge {
      font-size: 9px;
      font-weight: 700;
      color: #fff;
      background: #c42b1c;
      padding: 1px 4px;
      border-radius: 2px;
      line-height: 1.2;
    }
    .owned-badge {
      font-size: 12px;
      color: #0067b8;
      font-weight: 500;
    }
  `;

  constructor() {
    super();
    this.product = {};
  }

  _getHref() {
    const p = this.product;
    if (!p) return '#';
    if (p.is_own_product && p.custom_url) return p.custom_url;
    if (p.original_url) return p.original_url;
    return '#';
  }

  _onClick(e) {
    const href = this._getHref();
    if (href.startsWith('/')) {
      e.preventDefault();
      window.msApp?.navigate(href);
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
      return html`<span class="owned-badge">已拥有</span>`;
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
      <a class="card" href=${this._getHref()} @click=${this._onClick}
        rel=${this._getHref().startsWith('/') ? '' : 'nofollow noopener'}
        target=${this._getHref().startsWith('/') ? '' : '_blank'}
        style="text-decoration:none;color:inherit;display:block;">
        <div class="icon-wrapper">
          <ms-lazy-img src=${this._getIconSrc()} alt=${p.title || ''} width="68px" height="68px" radius="6px"></ms-lazy-img>
          ${p.has_gamepass ? html`<span class="gamepass-badge">Game Pass</span>` : ''}
        </div>
        <div class="title">${p.title || ''}</div>
        <div class="rating-row">
          <ms-rating .value=${p.rating || 0}></ms-rating>
        </div>
        <div class="category">${p.category || ''}</div>
        <div class="price-area">
          ${this._renderPrice()}
        </div>
      </a>
    `;
  }
}
customElements.define('ms-product-card', MsProductCard);
