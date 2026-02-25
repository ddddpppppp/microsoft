import { LitElement, html, css } from 'lit';
import '../components/ms-rating.js';

class DetailPage extends LitElement {
  static properties = {
    productId: { type: String },
    customUrl: { type: String },
    data: { type: Object },
    relatedProducts: { type: Array },
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
    .product-developer a {
      color: inherit;
      text-decoration: none;
    }
    .product-developer a:hover { text-decoration: underline; }
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
    .rating-count {
      font-size: 13px;
      color: #767676;
    }

    .action-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 12px;
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
    .store-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      border-radius: 6px;
      border: 1px solid #0067b8;
      background: transparent;
      color: #0067b8;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s;
      text-decoration: none;
    }
    .store-btn:hover { background: #f0f6fc; }

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

    .age-rating {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
    .age-rating-icon {
      width: 32px;
      height: 32px;
    }
    .age-rating-text {
      font-size: 13px;
      color: #616161;
    }

    .detail-body {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 48px;
    }

    .main-content { }

    .section {
      margin-bottom: 32px;
    }
    .section h3 {
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
      height: 220px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
      background: #f3f3f3;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .screenshot-img:hover { transform: scale(1.02); }

    .whats-new {
      background: #f9f9f9;
      border-radius: 8px;
      padding: 16px;
    }
    .whats-new-text {
      font-size: 14px;
      color: #616161;
      line-height: 1.6;
      white-space: pre-wrap;
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
    .info-value { color: #131316; text-align: right; max-width: 60%; }
    .info-link {
      color: #0078d4;
      text-decoration: none;
      font-size: 13px;
    }
    .info-link:hover { text-decoration: underline; }

    .related-section {
      margin-top: 48px;
      padding-top: 32px;
      border-top: 1px solid #e5e5e5;
    }
    .related-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .related-header h3 {
      font-size: 20px;
      font-weight: 600;
      color: #131316;
      margin: 0;
    }
    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
    }
    .related-card {
      display: flex;
      flex-direction: column;
      padding: 16px;
      border-radius: 12px;
      background: #f9f9f9;
      text-decoration: none;
      transition: all 0.2s;
    }
    .related-card:hover {
      background: #f0f0f0;
      transform: translateY(-2px);
    }
    .related-icon {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      object-fit: cover;
      margin-bottom: 12px;
      background: #e5e5e5;
    }
    .related-title {
      font-size: 14px;
      font-weight: 600;
      color: #131316;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .related-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #767676;
      margin-bottom: 4px;
    }
    .related-category {
      font-size: 12px;
      color: #767676;
    }
    .related-price {
      font-size: 13px;
      color: #0e7a0d;
      font-weight: 500;
    }

    @media (max-width: 900px) {
      .detail-header { flex-direction: column; align-items: center; text-align: center; }
      .detail-body { grid-template-columns: 1fr; }
      .detail-container { padding: 24px 16px; }
      .action-row { flex-wrap: wrap; justify-content: center; }
      .related-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .product-icon { width: 96px; height: 96px; }
      .product-title { font-size: 22px; }
      .related-grid { grid-template-columns: 1fr 1fr; }
    }
  `;

  constructor() {
    super();
    this.productId = '';
    this.customUrl = '';
    this.data = null;
    this.relatedProducts = [];
    this.loading = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
  }

  updated(changed) {
    if ((changed.has('productId') && this.productId) || (changed.has('customUrl') && this.customUrl)) {
      this._loadData();
    }
  }

  async _loadData() {
    if (!this.productId && !this.customUrl) { this.loading = false; return; }
    this.loading = true;
    try {
      let url;
      if (this.customUrl) {
        url = `/api/product-by-url?url=${encodeURIComponent(this.customUrl)}`;
      } else {
        url = `/api/product/${this.productId}`;
      }
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        this.data = data;
        if (data.id) {
          this._loadRelatedProducts(data.id);
        }
      } else {
        this.data = null;
      }
    } catch (e) {
      console.error('Failed to load product:', e);
      this.data = null;
    }
    this.loading = false;
  }

  async _loadRelatedProducts(productId) {
    try {
      const res = await fetch(`/api/product/${productId}/related`);
      if (res.ok) {
        this.relatedProducts = await res.json();
      }
    } catch (e) {
      console.error('Failed to load related products:', e);
    }
  }

  _getDownloadUrl() {
    if (!this.data) return '#';
    if (this.data.custom_download_url) return this.data.custom_download_url;
    if (this.data.original_url) return this.data.original_url;
    return `https://apps.microsoft.com/detail/${this.data.ms_id}?hl=zh-CN&gl=HK`;
  }

  _getMsStoreUrl() {
    if (!this.data) return '#';
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

  _getRelatedProductUrl(r) {
    // If it's an own product with custom_url, link to our detail page
    if (r.is_own_product && r.custom_url) {
      return r.custom_url;
    }
    // Otherwise link to Microsoft Store
    return `https://apps.microsoft.com/detail/${r.related_ms_id}?hl=zh-CN&gl=HK`;
  }

  _renderRelatedProducts() {
    if (!this.relatedProducts || this.relatedProducts.length === 0) return '';
    
    return html`
      <div class="related-section">
        <div class="related-header">
          <h3>发现更多</h3>
        </div>
        <div class="related-grid">
          ${this.relatedProducts.map(r => {
            const href = this._getRelatedProductUrl(r);
            const isInternal = r.is_own_product && r.custom_url;
            return html`
              <a class="related-card" href=${href} ${isInternal ? 'data-nav' : 'target="_blank"'}>
                <img class="related-icon" src=${r.related_icon_url || ''} alt=${r.related_title} loading="lazy" />
                <div class="related-title">${r.related_title}</div>
                <div class="related-meta">
                  ${r.related_rating ? html`<span>${r.related_rating}</span>` : ''}
                </div>
                <div class="related-category">${r.related_category}</div>
                <div class="related-price">${r.related_price || '免费下载'}</div>
              </a>
            `;
          })}
        </div>
      </div>
    `;
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
            ${p.developer ? html`
              <div class="product-developer">
                <a href="https://apps.microsoft.com/search/publisher?name=${encodeURIComponent(p.developer)}&hl=zh-CN&gl=HK" target="_blank">${p.developer}</a>
              </div>
            ` : ''}
            ${p.category ? html`<div class="product-category">${p.category}</div>` : ''}
            ${p.rating ? html`
              <div class="rating-row">
                <ms-rating .value=${parseFloat(p.rating)}></ms-rating>
                <span class="rating-value">${p.rating}</span>
                ${p.rating_count ? html`<span class="rating-count">${p.rating_count} 个评级</span>` : ''}
              </div>
            ` : ''}
            <div class="action-row">
              <a class="get-btn" href=${this._getDownloadUrl()} target="_blank">
                ${p.price_type === 'free' || !p.price ? '免费获取' : '获取'}
              </a>
              <a class="store-btn" href=${this._getMsStoreUrl()} target="_blank">
                在 Microsoft Store 中查看
              </a>
              <div class="price-display">${this._renderPrice()}</div>
              ${p.has_gamepass ? html`<span class="gamepass-badge">Game Pass</span>` : ''}
            </div>
            ${p.age_rating ? html`
              <div class="age-rating">
                ${p.age_rating_icon ? html`<img class="age-rating-icon" src=${p.age_rating_icon} alt=${p.age_rating} />` : ''}
                <span class="age-rating-text">${p.age_rating}</span>
              </div>
            ` : ''}
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
          <div class="main-content">
            <div class="section">
              <h3>说明</h3>
              <div class="description-text">${p.custom_description || p.description || '暂无描述信息。'}</div>
            </div>

            ${p.whats_new ? html`
              <div class="section">
                <h3>此版本中的新增功能</h3>
                <div class="whats-new">
                  <div class="whats-new-text">${p.whats_new}</div>
                </div>
              </div>
            ` : ''}
          </div>

          <div class="sidebar">
            <div class="info-card">
              <h4>其他信息</h4>
              ${p.developer ? html`
                <div class="info-row">
                  <span class="info-label">发布者</span>
                  <span class="info-value">${p.developer}</span>
                </div>
              ` : ''}
              ${p.last_update ? html`
                <div class="info-row">
                  <span class="info-label">上次更新日期</span>
                  <span class="info-value">${p.last_update}</span>
                </div>
              ` : ''}
              ${p.release_date ? html`
                <div class="info-row">
                  <span class="info-label">发布日期</span>
                  <span class="info-value">${p.release_date}</span>
                </div>
              ` : ''}
              ${p.app_size ? html`
                <div class="info-row">
                  <span class="info-label">近似大小</span>
                  <span class="info-value">${p.app_size}</span>
                </div>
              ` : ''}
              ${p.category ? html`
                <div class="info-row">
                  <span class="info-label">类别</span>
                  <span class="info-value">${p.category}</span>
                </div>
              ` : ''}
              <div class="info-row">
                <span class="info-label">类型</span>
                <span class="info-value">${p.product_type === 'game' ? '游戏' : '应用'}</span>
              </div>
              ${p.supported_languages ? html`
                <div class="info-row">
                  <span class="info-label">支持的语言</span>
                  <span class="info-value">${p.supported_languages}</span>
                </div>
              ` : ''}
            </div>

            <div class="info-card">
              <h4>发行商信息</h4>
              ${p.publisher_support ? html`
                <div class="info-row">
                  <a class="info-link" href=${p.publisher_support} target="_blank">支持</a>
                </div>
              ` : ''}
              ${p.publisher_website ? html`
                <div class="info-row">
                  <a class="info-link" href=${p.publisher_website} target="_blank">网站</a>
                </div>
              ` : ''}
              ${p.privacy_policy_url ? html`
                <div class="info-row">
                  <a class="info-link" href=${p.privacy_policy_url} target="_blank">隐私政策</a>
                </div>
              ` : ''}
              <div class="info-row">
                <a class="info-link" href=${this._getMsStoreUrl()} target="_blank">在 Microsoft Store 中查看 ›</a>
              </div>
            </div>
          </div>
        </div>

        ${this._renderRelatedProducts()}
      </div>
    `;
  }
}

customElements.define('detail-page', DetailPage);
