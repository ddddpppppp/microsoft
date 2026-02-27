import { LitElement, html, css } from 'lit';
import './ms-lazy-img.js';

class MsCollectionGrid extends LitElement {
  static properties = {
    title: { type: String },
    viewAllUrl: { type: String },
    products: { type: Array },
    _showLeftArrow: { type: Boolean, state: true },
    _showRightArrow: { type: Boolean, state: true }
  };

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
    }
    .section { margin-bottom: 32px; }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .section-title-area {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .section-title-link {
      display: flex;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }
    .section-title-link:hover .section-title {
      text-decoration: underline;
    }
    .section-title {
      font-size: 20px;
      font-weight: 600;
      font-family: var(--header-font);
      color: #1a1a1a;
      margin: 0;
    }
    .title-chevron {
      font-size: 18px;
      color: #1a1a1a;
      margin-left: 2px;
    }
    .view-all-link {
      font-size: 13px;
      font-weight: 600;
      color: #0067b8;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .view-all-link:hover { text-decoration: underline; }

    .scroll-wrapper { position: relative; }
    .scroll-container {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 4px 0 8px;
    }
    .scroll-container::-webkit-scrollbar { display: none; }
    .scroll-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid #d1d1d1;
      background: #fff;
      color: #424242;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      opacity: 0;
      transition: opacity 0.2s, background 0.12s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .scroll-btn:hover { background: #f5f5f5; }
    .scroll-wrapper:hover .scroll-btn.visible { opacity: 1; }
    .scroll-btn.left { left: -4px; }
    .scroll-btn.right { right: -4px; }

    .card {
      flex-shrink: 0;
      min-width: 160px;
      width: 160px;
      display: flex;
      flex-direction: column;
      border: 1px solid hsl(240 5.9% 90%);
      border-radius: 8px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.06);
      background: rgba(255,255,255,0.7);
      padding: 16px;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .card-top {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 120px;
      margin: -16px -16px 12px -16px;
      padding: 24px 16px;
      border-radius: 8px 8px 0 0;
      overflow: hidden;
    }
    .card-icon-bg {
      position: absolute;
      inset: -20px;
      background-size: 120%;
      background-position: center;
      background-repeat: no-repeat;
      filter: blur(24px);
      opacity: 0.6;
    }
    .card-icon {
      width: 84px;
      height: 84px;
      border-radius: 12px;
      object-fit: cover;
      position: relative;
      z-index: 1;
    }
    .card-bottom {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
    }
    .card-title {
      font-size: 13px;
      font-weight: 400;
      color: #1a1a1a;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .item-meta {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-wrap: wrap;
    }
    .item-rating {
      display: flex;
      align-items: center;
      gap: 1px;
    }
    .stars { display: flex; gap: 0; }
    .star { font-size: 9px; color: #FFB900; }
    .star.empty { color: #d1d1d1; }
    .rating-count { font-size: 10px; color: #616161; margin-left: 2px; }
    .item-price { font-size: 12px; color: #616161; white-space: nowrap; }
    .price-original { text-decoration: line-through; color: #767676; font-size: 11px; margin-right: 4px; }
    .price-current { color: #1a1a1a; }
    .price-free { color: #0e7a0d; }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      font-size: 9px;
      padding: 1px 5px;
      border-radius: 2px;
      font-weight: 700;
      white-space: nowrap;
    }
    .badge-gamepass { background: #107c10; color: #fff; }
    .badge-discount { background: #c42b1c; color: #fff; }

    @media (max-width: 600px) {
      :host { padding: 0 12px; }
      .card { min-width: 148px; width: 148px; }
      .card-title { font-size: 16px; }
    }
  `;

  constructor() {
    super();
    this.title = '';
    this.viewAllUrl = '';
    this.products = [];
    this._showLeftArrow = false;
    this._showRightArrow = true;
  }

  firstUpdated() {
    this._updateArrows();
    const el = this._getScrollContainer();
    if (el) el.addEventListener('scroll', this._onScrollBound = () => this._updateArrows());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const el = this._getScrollContainer();
    if (el && this._onScrollBound) el.removeEventListener('scroll', this._onScrollBound);
  }

  _getScrollContainer() {
    return this.renderRoot?.querySelector('.scroll-container');
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

  _renderStars(rating = 0) {
    const full = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(html`<span class="star ${i < full ? '' : 'empty'}">★</span>`);
    }
    return stars;
  }

  _renderPrice(product) {
    if (product.price_type === 'free' || product.price === 0 || product.price === '0' || product.price === 'Free') {
      return html`<span class="price-free">免费下载</span>`;
    }
    const parts = [];
    if (product.discount && product.original_price) {
      parts.push(html`<span class="price-original">${product.original_price}</span>`);
      parts.push(html`<span class="price-current">${product.price}</span>`);
    } else if (product.price) {
      parts.push(html`<span class="price-current">${product.price}</span>`);
    }
    return parts;
  }

  _renderBadges(product) {
    const badges = [];
    if (product.has_gamepass) {
      badges.push(html`<span class="badge badge-gamepass">Game Pass</span>`);
    }
    if (product.discount) {
      badges.push(html`<span class="badge badge-discount">-${product.discount}%</span>`);
    }
    return badges;
  }

  _onItemClick(product, e) {
    e.preventDefault();
    if (product.product_id) {
      window.msApp?.navigate('/detail/' + product.product_id);
    }
  }

  render() {
    const items = (this.products || []).slice(0, 12);
    return html`
      <div class="section">
        <div class="section-header">
          <div class="section-title-area">
            <a class="section-title-link" href=${this.viewAllUrl || '#'} data-nav>
              <h2 class="section-title">${this.title}</h2>
              <span class="title-chevron">&#8250;</span>
            </a>
          </div>
          <a class="view-all-link" href=${this.viewAllUrl || '#'} data-nav>查看全部 &#8250;</a>
        </div>
        <div class="scroll-wrapper">
          <button class="scroll-btn left ${this._showLeftArrow ? 'visible' : ''}" @click=${() => this._scroll('left')} aria-label="向左滚动">&#8249;</button>
          <div class="scroll-container" @scroll=${this._onScroll}>
            ${items.map((product) => {
              const iconUrl = product.icon_url || product.image_url || '';
              return html`
              <a class="card" href=${product.product_id ? '/detail/' + product.product_id : '#'} data-nav
                @click=${(e) => this._onItemClick(product, e)}>
                <div class="card-top">
                  ${iconUrl ? html`
                    <div class="card-icon-bg" style="background-image: url('${iconUrl}')"></div>
                  ` : ''}
                  <ms-lazy-img class="card-icon" src=${iconUrl || ''} alt=${product.title || product.name || ''} width="84px" height="84px" radius="12px" style="position:relative;z-index:1;"></ms-lazy-img>
                </div>
                <div class="card-bottom">
                  <span class="card-title">${product.title || product.name}</span>
                  <div class="item-meta">
                    ${product.rating ? html`
                      <span class="item-rating">
                        <span class="stars">${this._renderStars(product.rating)}</span>
                        ${product.rating_count ? html`<span class="rating-count">${product.rating_count}</span>` : ''}
                      </span>
                    ` : ''}
                    ${this._renderBadges(product)}
                  </div>
                  <div class="item-price">${this._renderPrice(product)}</div>
                </div>
              </a>
            `})}
          </div>
          <button class="scroll-btn right ${this._showRightArrow ? 'visible' : ''}" @click=${() => this._scroll('right')} aria-label="向右滚动">&#8250;</button>
        </div>
      </div>
    `;
  }
}
customElements.define('ms-collection-grid', MsCollectionGrid);
