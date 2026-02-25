import { LitElement, html, css } from 'lit';
import './ms-product-card.js';
import './ms-product-hero.js';
import './ms-product-tall-card.js';
import './ms-product-social-card.js';
import './ms-rating.js';

class MsCollectionRow extends LitElement {
  static properties = {
    title: { type: String },
    viewAllUrl: { type: String },
    products: { type: Array },
    variant: { type: String },
    sectionType: { type: String },
    _showLeftArrow: { type: Boolean, state: true },
    _showRightArrow: { type: Boolean, state: true }
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }
    .section { margin-bottom: 32px; }

    /* Section header */
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      padding: 0;
    }
    .section-title-area {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 600;
      font-family: var(--header-font);
      color: #1a1a1a;
      margin: 0;
      transform: translate3d(-12px, 0, 0);
      transition: transform 0.2s ease;
    }
    .section-title-link.collection-title:hover .section-title {
      transform: translate3d(0, 0, 0);
    }
    .title-chevron {
      font-size: 12px;
      color: #1a1a1a;
      margin-left: 2px;
      cursor: pointer;
    }
    .section-title-link {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      padding: 4px 8px;
      margin: -4px -8px;
      border-radius: 8px;
      transition: background-color 0.2s ease;
    }
    .section-title-link.collection-title:hover {
      background-color: #e8ebeb;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .view-all-link {
      font-size: 13px;
      font-weight: 600;
      color: #0067b8;
      text-decoration: none;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .view-all-link:hover { text-decoration: underline; }

    /* Nav arrows */
    .nav-arrows {
      display: flex;
      gap: 6px;
    }
    .scroll-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid #d1d1d1;
      background: #fff;
      color: #424242;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.12s, border-color 0.12s;
      padding: 0;
    }
    .scroll-btn:hover {
      background: #f5f5f5;
      border-color: #999;
    }
    .scroll-btn:disabled {
      opacity: 0.3;
      cursor: default;
    }
    .scroll-btn svg {
      width: 12px;
      height: 12px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Scroll container */
    .scroll-wrapper { position: relative; }
    .scroll-container {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 8px;
      margin: -8px;
    }
    .scroll-container::-webkit-scrollbar { display: none; }

    /* Card wrapper for twoColGrid variant (.component styling) */
    .two-col-card {
      border: 1px solid hsl(240 5.9% 90%);
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.7);
      padding: 36px;
      box-sizing: border-box;
    }
    .two-col-divider {
      border-top: 1px solid rgba(0, 0, 0, 0.06);
      opacity: 0.7;
      width: 92%;
      margin: 6px auto 16px;
    }
    /* 双列网格：与官网一致，每栏 2 列 x 3 行，item 横向（图标左 + 信息右） */
    .two-col-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0 16px;
      padding: 0;
    }
    .product-row {
      display: flex;
      align-items: center;
      gap: 0;
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      transition: background 0.12s;
      min-height: 64px;
      box-sizing: border-box;
    }
    .product-row:hover {
      background: rgba(0, 0, 0, 0.04);
    }
    .product-row-icon-wrap {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      margin-right: 16px;
      position: relative;
    }
    .product-row-icon {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      object-fit: cover;
      display: block;
      background: #f0f0f0;
    }
    .product-row .gamepass-badge {
      position: absolute;
      top: -2px;
      left: -2px;
      background: #107c10;
      color: #fff;
      font-size: 8px;
      font-weight: 700;
      padding: 2px 4px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.2px;
    }
    .product-row-info {
      flex: 1;
      min-width: 0;
      display: grid;
      gap: 4px 0;
      align-content: start;
    }
    .product-row-title {
      font-size: 13px;
      color: #1a1a1a;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-weight: 400;
    }
    .product-row-meta {
      font-size: 12px;
      color: #616161;
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
    }
    .product-row-price {
      font-size: 12px;
      font-weight: 600;
      color: #1a1a1a;
    }
    .product-row-price-free {
      color: #0e7a0d;
    }
    .product-row-price-original {
      font-size: 11px;
      color: #767676;
      text-decoration: line-through;
      font-weight: 400;
    }
  `;

  constructor() {
    super();
    this.title = '';
    this.viewAllUrl = '';
    this.products = [];
    this.variant = 'default';
    this.sectionType = '';
    this._showLeftArrow = false;
    this._showRightArrow = true;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('variant')) {
      this.classList.toggle('variant-two-col', this.variant === 'twoColGrid');
    }
  }

  firstUpdated() {
    this.classList.toggle('variant-two-col', this.variant === 'twoColGrid');
    this._updateArrows();
  }

  _getScrollContainer() {
    return this.renderRoot.querySelector('.scroll-container');
  }

  _updateArrows() {
    const el = this._getScrollContainer();
    if (!el) return;
    this._showLeftArrow = el.scrollLeft > 10;
    this._showRightArrow = el.scrollLeft < el.scrollWidth - el.clientWidth - 10;
  }

  _scroll(direction) {
    const el = this._getScrollContainer();
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    setTimeout(() => this._updateArrows(), 350);
  }

  _onScroll() { this._updateArrows(); }

  _renderCard(product) {
    if (this.variant === 'hero') {
      return html`<ms-product-hero .product=${product}></ms-product-hero>`;
    }
    if (this.variant === 'tall') {
      return html`<ms-product-tall-card .product=${product}></ms-product-tall-card>`;
    }
    if (this.variant === 'social') {
      return html`<ms-product-social-card .product=${product}></ms-product-social-card>`;
    }
    return html`<ms-product-card .product=${product}></ms-product-card>`;
  }

  _renderPriceRow(p) {
    if (!p) return '';
    if (p.price_type === 'free' || p.price === '免费' || p.price === 'Free' || p.price === '免费下载') {
      return html`<span class="product-row-price product-row-price-free">免费下载</span>`;
    }
    if (p.price_type === 'owned') {
      return html`<span class="product-row-price" style="color: #0067b8;">已拥有</span>`;
    }
    if (p.discount_percent && p.original_price) {
      const discounted = p.price || p.original_price;
      return html`
        <span class="product-row-price-original">${p.original_price}</span>
        <span class="product-row-price">${discounted}</span>
      `;
    }
    if (p.price) {
      return html`<span class="product-row-price">${p.price}</span>`;
    }
    return html`<span class="product-row-price product-row-price-free">免费下载</span>`;
  }

  _renderRowItem(product) {
    const p = product || {};
    const icon = p.local_icon || p.icon_url || '';
    const href = p.is_own_product && p.custom_url ? p.custom_url : (p.original_url || '#');
    const useNav = href.startsWith('/');
    return html`
      <a class="product-row" href=${href} ${useNav ? 'data-nav' : ''}>
        <div class="product-row-icon-wrap">
          <img class="product-row-icon" src=${icon} alt=${p.title || ''} loading="lazy" />
          ${p.has_gamepass ? html`<span class="gamepass-badge">Game Pass</span>` : ''}
        </div>
        <div class="product-row-info">
          <div class="product-row-title">${p.title || ''}</div>
          <div class="product-row-meta">
            <ms-rating .value=${p.rating || 0}></ms-rating>
            <span>${p.category || ''}</span>
          </div>
          <div class="product-row-meta">${this._renderPriceRow(p)}</div>
        </div>
      </a>
    `;
  }

  _renderHeader(useTwoColGrid) {
    return html`
      <div class="section-header">
        <div class="section-title-area">
          <a class="section-title-link collection-title" href=${this.viewAllUrl || '#'} data-nav>
            <h2 class="section-title">${this.title}</h2>
            <span class="title-chevron">&#8250;</span>
          </a>
        </div>
        <div class="header-right">
          <div class="nav-arrows">
            <button class="scroll-btn" ?disabled=${useTwoColGrid ? true : !this._showLeftArrow} @click=${() => this._scroll('left')} aria-label="向左滚动">
              <svg viewBox="0 0 16 16"><polyline points="10 3 5 8 10 13"/></svg>
            </button>
            <button class="scroll-btn" ?disabled=${useTwoColGrid ? true : !this._showRightArrow} @click=${() => this._scroll('right')} aria-label="向右滚动">
              <svg viewBox="0 0 16 16"><polyline points="6 3 11 8 6 13"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const useTwoColGrid = this.variant === 'twoColGrid';
    const list = this.products || [];
    const gridProducts = useTwoColGrid ? list.slice(0, 6) : list;

    if (useTwoColGrid) {
      return html`
        <div class="section">
          <div class="two-col-card">
            ${this._renderHeader(true)}
            <div class="two-col-divider"></div>
            <div class="two-col-grid">${gridProducts.map(p => this._renderRowItem(p))}</div>
          </div>
        </div>
      `;
    }

    return html`
      <div class="section">
        ${this._renderHeader(false)}
        <div class="scroll-wrapper">
          <div class="scroll-container" @scroll=${this._onScroll}>
            ${list.map(p => this._renderCard(p))}
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('ms-collection-row', MsCollectionRow);
