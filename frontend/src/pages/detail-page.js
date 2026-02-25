import { LitElement, html, css } from 'lit';
import '../components/ms-rating.js';

class DetailPage extends LitElement {
  static properties = {
    productId: { type: String },
    data: { type: Object },
    loading: { type: Boolean }
  };

  static styles = css`
    :host { display: block; padding-bottom: 60px; background: #fff; }

    .loading {
      text-align: center;
      padding: 200px 0;
      color: #767676;
      font-size: 16px;
    }
    .loading-spinner {
      display: inline-block;
      width: 32px; height: 32px;
      border: 3px solid #e5e5e5;
      border-top-color: #0067b8;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-bottom: 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .not-found {
      text-align: center;
      padding: 200px 0;
      color: #767676;
    }
    .not-found h2 { color: #131316; margin-bottom: 16px; }
    .not-found a {
      color: #0067b8;
      text-decoration: none;
    }
    .not-found a:hover { text-decoration: underline; }

    .detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 40px;
    }

    .detail-header {
      display: flex;
      gap: 32px;
      margin-bottom: 40px;
    }
    .product-icon {
      width: 128px;
      height: 128px;
      border-radius: 16px;
      object-fit: cover;
      flex-shrink: 0;
      background: #f3f3f3;
    }
    .header-info {
      flex: 1;
      min-width: 0;
    }
    .product-title {
      font-size: 28px;
      font-weight: 700;
      color: #131316;
      margin: 0 0 8px;
      line-height: 1.2;
    }
    .product-developer {
      font-size: 14px;
      color: #0067b8;
      margin-bottom: 8px;
    }
    .product-category {
      font-size: 13px;
      color: #616161;
      margin-bottom: 12px;
    }
    .rating-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .rating-value {
      font-size: 14px;
      color: #616161;
    }

    .action-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 8px;
    }
    .get-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 40px;
      border-radius: 6px;
      border: none;
      background: #0067b8;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;
      text-decoration: none;
    }
    .get-btn:hover { background: #005a9e; }
    .get-btn:active { background: #004c87; }

    .price-display {
      font-size: 18px;
      font-weight: 600;
    }
    .price-free { color: #0e7a0d; }
    .price-paid { color: #131316; }
    .price-original {
      text-decoration: line-through;
      color: #767676;
      font-size: 14px;
      margin-right: 8px;
    }
    .discount-badge {
      background: #c42b1c;
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 4px;
      margin-left: 8px;
    }
    .gamepass-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #107c10;
      color: #fff;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 4px;
    }

    .detail-body {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 48px;
    }

    .description-section h3 {
      font-size: 18px;
      font-weight: 600;
      color: #131316;
      margin: 0 0 12px;
    }
    .description-text {
      font-size: 14px;
      color: #616161;
      line-height: 1.8;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .sidebar { }
    .info-card {
      background: #f3f3f3;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 16px;
    }
    .info-card h4 {
      font-size: 14px;
      font-weight: 600;
      color: #131316;
      margin: 0 0 12px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      font-size: 13px;
      border-bottom: 1px solid #e5e5e5;
    }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #767676; }
    .info-value { color: #131316; }

    .screenshots {
      margin-bottom: 32px;
    }
    .screenshots h3 {
      font-size: 18px;
      font-weight: 600;
      color: #131316;
      margin: 0 0 12px;
    }
    .screenshots-row {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      scrollbar-width: none;
      padding-bottom: 8px;
    }
    .screenshots-row::-webkit-scrollbar { display: none; }
    .screenshot-img {
      height: 200px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
      background: #f3f3f3;
    }

    @media (max-width: 900px) {
      .detail-header { flex-direction: column; align-items: center; text-align: center; }
      .detail-body { grid-template-columns: 1fr; }
      .detail-container { padding: 24px 16px; }
    }
    @media (max-width: 600px) {
      .product-icon { width: 96px; height: 96px; }
      .product-title { font-size: 22px; }
    }
  `;

  constructor() {
    super();
    this.productId = '';
    this.data = null;
    this.loading = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
  }

  updated(changed) {
    if (changed.has('productId') && this.productId) {
      this._loadData();
    }
  }

  async _loadData() {
    if (!this.productId) { this.loading = false; return; }
    this.loading = true;
    try {
      const res = await fetch(`/api/product/${this.productId}`);
      if (res.ok) {
        this.data = await res.json();
      } else {
        this.data = null;
      }
    } catch (e) {
      console.error('Failed to load product:', e);
      this.data = null;
    }
    this.loading = false;
  }

  _getDownloadUrl() {
    if (!this.data) return '#';
    if (this.data.custom_download_url) return this.data.custom_download_url;
    if (this.data.original_url) return this.data.original_url;
    return `https://apps.microsoft.com/detail/${this.data.ms_id}?hl=zh-CN&gl=HK`;
  }

  _renderPrice() {
    const p = this.data;
    if (!p) return '';

    if (p.price_type === 'free' || !p.price) {
      return html`<span class="price-free">免费</span>`;
    }
    if (p.price_type === 'discount' && p.original_price) {
      return html`
        <span class="price-original">${p.original_price}</span>
        <span class="price-paid">${p.price}</span>
        ${p.discount_percent ? html`<span class="discount-badge">${p.discount_percent}</span>` : ''}
      `;
    }
    return html`<span class="price-paid">${p.price}</span>`;
  }

  render() {
    if (this.loading) {
      return html`<div class="loading"><div class="loading-spinner"></div><br>正在加载...</div>`;
    }

    if (!this.data || this.data.error) {
      return html`
        <div class="not-found">
          <h2>未找到产品</h2>
          <p>该产品不存在或已下架。</p>
          <a href="/" data-nav>返回首页</a>
        </div>
      `;
    }

    const p = this.data;
    const icon = p.local_icon || p.icon_url || '';
    const displayTitle = p.custom_title || p.title;
    const screenshots = p.screenshots ? (typeof p.screenshots === 'string' ? JSON.parse(p.screenshots || '[]') : p.screenshots) : [];

    return html`
      <div class="detail-container">
        <div class="detail-header">
          <img class="product-icon" src=${icon} alt=${displayTitle} />
          <div class="header-info">
            <h1 class="product-title">${displayTitle}</h1>
            ${p.developer ? html`<div class="product-developer">${p.developer}</div>` : ''}
            ${p.category ? html`<div class="product-category">${p.category}</div>` : ''}
            ${p.rating ? html`
              <div class="rating-row">
                <ms-rating .value=${parseFloat(p.rating)}></ms-rating>
                <span class="rating-value">${p.rating}</span>
              </div>
            ` : ''}
            <div class="action-row">
              <a class="get-btn" href=${this._getDownloadUrl()} target="_blank">
                ${p.price_type === 'free' || !p.price ? '免费获取' : '获取'}
              </a>
              <div class="price-display">${this._renderPrice()}</div>
              ${p.has_gamepass ? html`<span class="gamepass-badge">Game Pass</span>` : ''}
            </div>
          </div>
        </div>

        ${screenshots.length > 0 ? html`
          <div class="screenshots">
            <h3>屏幕截图</h3>
            <div class="screenshots-row">
              ${screenshots.map(s => html`<img class="screenshot-img" src=${s} alt="截图" loading="lazy" />`)}
            </div>
          </div>
        ` : ''}

        <div class="detail-body">
          <div class="description-section">
            <h3>描述</h3>
            <div class="description-text">${p.custom_description || p.description || '暂无描述信息。'}</div>
          </div>

          <div class="sidebar">
            <div class="info-card">
              <h4>产品信息</h4>
              <div class="info-row">
                <span class="info-label">产品 ID</span>
                <span class="info-value">${p.ms_id}</span>
              </div>
              <div class="info-row">
                <span class="info-label">类型</span>
                <span class="info-value">${p.product_type === 'game' ? '游戏' : '应用'}</span>
              </div>
              ${p.category ? html`
                <div class="info-row">
                  <span class="info-label">分类</span>
                  <span class="info-value">${p.category}</span>
                </div>
              ` : ''}
              ${p.developer ? html`
                <div class="info-row">
                  <span class="info-label">开发者</span>
                  <span class="info-value">${p.developer}</span>
                </div>
              ` : ''}
              ${p.rating ? html`
                <div class="info-row">
                  <span class="info-label">评分</span>
                  <span class="info-value">${p.rating} / 5.0</span>
                </div>
              ` : ''}
            </div>

            <div class="info-card">
              <h4>链接</h4>
              <div class="info-row">
                <a href="https://apps.microsoft.com/detail/${p.ms_id}?hl=zh-CN&gl=HK" target="_blank"
                   style="color:#0078d4;text-decoration:none;font-size:13px;">
                  在 Microsoft Store 中查看 ›
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('detail-page', DetailPage);
