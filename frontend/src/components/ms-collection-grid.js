import { LitElement, html, css } from 'lit';

class MsCollectionGrid extends LitElement {
  static properties = {
    title: { type: String },
    viewAllUrl: { type: String },
    products: { type: Array }
  };

  static styles = css`
    :host {
      display: block;
      max-width: 1600px;
      margin: 0 auto;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .section { margin-bottom: 32px; }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
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
      font-weight: 700;
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

    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px 16px;
    }
    .grid-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 6px;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      transition: background 0.12s;
      min-height: 64px;
    }
    .grid-item:hover { background: rgba(0, 0, 0, 0.04); }
    .item-icon {
      width: 48px;
      height: 48px;
      border-radius: 6px;
      object-fit: cover;
      flex-shrink: 0;
      background: #f0f0f0;
    }
    .item-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .item-title {
      font-size: 13px;
      color: #1a1a1a;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
      font-weight: 400;
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
    .item-subtitle {
      font-size: 11px;
      color: #767676;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (max-width: 1200px) { .grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } :host { padding: 0 12px; } }
  `;

  constructor() {
    super();
    this.title = '';
    this.viewAllUrl = '';
    this.products = [];
  }

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

  _onItemClick(product) {
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
        <div class="grid">
          ${items.map((product) => html`
            <a class="grid-item" href=${product.product_id ? '/detail/' + product.product_id : '#'} data-nav
              @click=${(e) => { e.preventDefault(); this._onItemClick(product); }}>
              <img class="item-icon" src=${product.icon_url || product.image_url || ''} alt=${product.title || product.name || ''} loading="lazy" />
              <div class="item-info">
                <span class="item-title">${product.title || product.name}</span>
                ${product.developer ? html`<span class="item-subtitle">${product.developer}</span>` : ''}
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
          `)}
        </div>
      </div>
    `;
  }
}
customElements.define('ms-collection-grid', MsCollectionGrid);
