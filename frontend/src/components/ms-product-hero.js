import { LitElement, html, css } from 'lit';
import './ms-rating.js';
import './ms-lazy-img.js';

/**
 * Wide card for sections like 創意應用程式 / 幻化成真: left = large icon area with background,
 * right = title, rating+category, description. Matches Microsoft Store reference layout.
 */
class MsProductHero extends LitElement {
  static properties = {
    product: { type: Object }
  };

  static styles = css`
    :host {
      display: block;
      min-width: 320px;
      width: 320px;
      flex-shrink: 0;
    }
    /* 与商店 wide-details 一致：product product-wide-details */
    a.product.product-wide-details {
      display: flex;
      flex-direction: row;
      text-decoration: none;
      color: inherit;
      background: #fff;
      border: 1px solid hsl(240 5.9% 90%);
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      transition: box-shadow 0.2s ease;
      overflow: hidden;
      min-height: 140px;
    }
    a.product.product-wide-details:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    }

    .container {
      display: flex;
      flex-direction: row;
      flex: 1;
      min-width: 0;
    }

    /* 左：image-wrap = blur + product-image-wrap (与商店一致) */
    .image-wrap {
      width: 120px;
      min-width: 120px;
      min-height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }
    .image-wrap .blur {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }
    .image-wrap .gradual-blur {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      filter: blur(20px);
      opacity: 0.5;
    }
    .image-wrap .gradual-blur.fallback {
      filter: none;
      opacity: 1;
      background: #f0f0f0;
    }
    .product-image-wrap {
      position: relative;
      z-index: 1;
    }
    .product-image {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      object-fit: cover;
      display: block;
      background: rgba(255,255,255,0.3);
    }

    /* 右：details (与商店 .details.no-review 一致) */
    .details {
      flex: 1;
      min-width: 0;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .details-title { margin: 0; }
    .text-ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .details .title {
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 0;
    }
    .subtitle {
      font-size: 12px;
      color: #616161;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .details .desc {
      font-size: 12px;
      color: #616161;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      min-height: 0;
      margin: 0;
    }
    .price-row {
      margin-top: auto;
      padding-top: 4px;
    }
    .price-free { font-size: 12px; color: #0e7a0d; font-weight: 600; }
    .price-value { font-size: 12px; color: #1a1a1a; font-weight: 600; }
    .price-original { font-size: 11px; color: #767676; text-decoration: line-through; }
    .price-discounted { font-size: 12px; color: #1a1a1a; font-weight: 600; }
    .discount-badge {
      font-size: 9px; font-weight: 700; color: #fff;
      background: #c42b1c; padding: 1px 4px; border-radius: 2px; line-height: 1.2;
    }
  `;

  constructor() {
    super();
    this.product = {};
  }

  _getIconSrc() {
    const p = this.product;
    if (!p) return '';
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
        <span class="discount-badge">-${p.discount_percent}%</span>
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
    const iconSrc = this._getIconSrc();
    const href = this._getHref();
    const useNav = href.startsWith('/');

    return html`
      <a class="product product-wide-details" href=${href} ${useNav ? 'data-nav' : ''} @click=${this._onClick}>
        <div class="container">
          <div class="image-wrap">
            <div class="blur">
              ${iconSrc
                ? html`<div class="gradual-blur" style="background-image:url('${iconSrc}')"></div>`
                : html`<div class="gradual-blur fallback"></div>`}
            </div>
            <div class="product-image-wrap">
              ${iconSrc ? html`<ms-lazy-img class="product-image" src=${iconSrc} alt="" width="80px" height="80px" radius="12px"></ms-lazy-img>` : ''}
            </div>
          </div>
          <div class="details no-review">
            <div class="details-title">
              <p class="title text-ellipsis" title=${p.title || ''}>${p.title || ''}</p>
            </div>
            <div class="subtitle">
              <ms-rating .value=${p.rating || 0}></ms-rating>
              ${p.category ? html`<span class="categories"><span class="text-ellipsis">${p.category}</span></span>` : ''}
            </div>
            ${p.description ? html`<div class="desc">${p.description}</div>` : ''}
            <div class="price-row">${this._renderPrice()}</div>
          </div>
        </div>
      </a>
    `;
  }
}
customElements.define('ms-product-hero', MsProductHero);
