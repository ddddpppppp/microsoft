import { LitElement, html, css } from 'lit';
import '../components/ms-rating.js';

class DetailPage extends LitElement {
  static properties = {
    productId: { type: String },
    customUrl: { type: String },
    data: { type: Object },
    relatedProducts: { type: Array },
    loading: { type: Boolean },
    descriptionExpanded: { type: Boolean },
    reviewData: { type: Object },
    reviewsExpanded: { type: Boolean }
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
    .description-wrapper {
      position: relative;
    }
    .description-text {
      font-size: 14px;
      color: #616161;
      line-height: 1.8;
      white-space: pre-wrap;
      word-break: break-word;
      max-height: 120px;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    .description-text.expanded {
      max-height: none;
    }
    .description-text:not(.expanded)::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40px;
      background: linear-gradient(transparent, #fff);
      pointer-events: none;
    }
    .description-toggle {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-top: 8px;
      padding: 0;
      border: none;
      background: none;
      color: #0067b8;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.2s;
    }
    .description-toggle:hover {
      color: #005a9e;
      text-decoration: underline;
    }
    .description-toggle svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
      transition: transform 0.2s;
    }
    .description-toggle.expanded svg {
      transform: rotate(180deg);
    }

    .screenshots {
      margin-bottom: 32px;
      position: relative;
    }
    .screenshots h3 {
      font-size: 18px;
      font-weight: 600;
      color: #131316;
      margin: 0 0 12px;
    }
    .screenshots-container {
      position: relative;
    }
    .screenshots-row {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding: 8px 0;
    }
    .screenshots-row::-webkit-scrollbar {
      display: none;
    }
    .screenshot-img {
      height: 220px;
      min-width: 300px;
      width: auto;
      border-radius: 8px;
      object-fit: contain;
      flex-shrink: 0;
      background: #f3f3f3;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .screenshot-img:hover { 
      transform: scale(1.02); 
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }
    .screenshots-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255,255,255,0.95);
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      transition: all 0.2s;
    }
    .screenshots-nav:hover {
      background: #fff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .screenshots-nav:active {
      transform: translateY(-50%) scale(0.95);
    }
    .screenshots-nav.prev {
      left: -20px;
    }
    .screenshots-nav.next {
      right: -20px;
    }
    .screenshots-nav svg {
      width: 20px;
      height: 20px;
      fill: #333;
    }
    .screenshots-nav.hidden {
      opacity: 0;
      pointer-events: none;
    }

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

    /* Reviews section */
    .reviews-section {
      margin-top: 32px;
      border-top: 1px solid #e5e5e5;
      padding-top: 24px;
    }
    .reviews-header h3 {
      font-size: 18px;
      font-weight: 600;
      color: #131316;
      margin: 0 0 20px;
    }
    .reviews-summary {
      display: flex;
      gap: 32px;
      margin-bottom: 24px;
      align-items: flex-start;
    }
    .reviews-score {
      text-align: center;
      min-width: 100px;
    }
    .reviews-score .big-number {
      font-size: 48px;
      font-weight: 700;
      color: #131316;
      line-height: 1;
    }
    .reviews-score .total-count {
      font-size: 13px;
      color: #767676;
      margin-top: 4px;
    }
    .reviews-bars {
      flex: 1;
      max-width: 300px;
    }
    .bar-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
      font-size: 13px;
      color: #767676;
    }
    .bar-label {
      width: 20px;
      text-align: right;
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .bar-label svg {
      width: 12px;
      height: 12px;
      fill: #e67700;
    }
    .bar-track {
      flex: 1;
      height: 8px;
      background: #eee;
      border-radius: 4px;
      overflow: hidden;
    }
    .bar-fill {
      height: 100%;
      background: #e67700;
      border-radius: 4px;
      transition: width 0.3s;
    }
    .reviews-list-wrapper {
      position: relative;
    }
    .reviews-list {
      max-height: 400px;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    .reviews-list.expanded {
      max-height: none;
    }
    .reviews-list:not(.expanded)::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: linear-gradient(transparent, #fff);
      pointer-events: none;
    }
    .review-item {
      border-bottom: 1px solid #f0f0f0;
      padding: 16px 0;
    }
    .review-item:last-child {
      border-bottom: none;
    }
    .review-top {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .review-rating {
      font-size: 14px;
      font-weight: 600;
      color: #e67700;
    }
    .review-rating svg {
      width: 14px;
      height: 14px;
      fill: #e67700;
      vertical-align: -2px;
    }
    .review-title {
      font-size: 14px;
      font-weight: 600;
      color: #131316;
    }
    .review-content {
      font-size: 14px;
      color: #444;
      line-height: 1.6;
      margin: 6px 0;
    }
    .review-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 12px;
      color: #999;
    }
    .review-author {
      color: #767676;
    }
    .review-helpful {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .review-helpful span {
      display: flex;
      align-items: center;
      gap: 3px;
    }
    .review-helpful svg {
      width: 14px;
      height: 14px;
      fill: #999;
    }
    .reviews-toggle {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-top: 12px;
      padding: 0;
      border: none;
      background: none;
      color: #0067b8;
      font-size: 14px;
      cursor: pointer;
    }
    .reviews-toggle:hover {
      text-decoration: underline;
    }
    .reviews-toggle svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
      transition: transform 0.2s;
    }
    .reviews-toggle.expanded svg {
      transform: rotate(180deg);
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
    this.descriptionExpanded = false;
    this.reviewData = null;
    this.reviewsExpanded = false;
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

  _scrollScreenshots(direction) {
    const row = this.shadowRoot.querySelector('.screenshots-row');
    if (!row) return;
    const scrollAmount = 320;
    row.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }

  _toggleDescription() {
    this.descriptionExpanded = !this.descriptionExpanded;
  }

  _onScreenshotsScroll() {
    const row = this.shadowRoot.querySelector('.screenshots-row');
    if (!row) return;
    const prevBtn = this.shadowRoot.querySelector('.screenshots-nav.prev');
    const nextBtn = this.shadowRoot.querySelector('.screenshots-nav.next');
    if (prevBtn) {
      prevBtn.classList.toggle('hidden', row.scrollLeft <= 0);
    }
    if (nextBtn) {
      const maxScroll = row.scrollWidth - row.clientWidth;
      nextBtn.classList.toggle('hidden', row.scrollLeft >= maxScroll - 5);
    }
  }

  firstUpdated() {
    super.firstUpdated && super.firstUpdated();
    setTimeout(() => this._onScreenshotsScroll(), 100);
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
          this._loadReviews(data.id);
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

  async _loadReviews(productId) {
    try {
      const res = await fetch(`/api/product/${productId}/reviews`);
      if (res.ok) {
        this.reviewData = await res.json();
      }
    } catch (e) {
      console.error('Failed to load reviews:', e);
    }
  }

  _toggleReviews() {
    this.reviewsExpanded = !this.reviewsExpanded;
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

  _renderReviews() {
    if (!this.reviewData || !this.reviewData.reviews || this.reviewData.reviews.length === 0) return '';

    const { reviews, avg_rating, total_count, distribution } = this.reviewData;
    const maxDist = Math.max(...Object.values(distribution), 1);
    const starSvg = html`<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;

    return html`
      <div class="reviews-section">
        <div class="reviews-header">
          <h3>评分和评价</h3>
        </div>
        <div class="reviews-summary">
          <div class="reviews-score">
            <div class="big-number">${avg_rating}</div>
            <div class="total-count">${total_count} 个评级</div>
          </div>
          <div class="reviews-bars">
            ${[5,4,3,2,1].map(star => {
              const cnt = distribution[star] || 0;
              const pct = (cnt / maxDist) * 100;
              return html`
                <div class="bar-row">
                  <div class="bar-label">${star}${starSvg}</div>
                  <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
                </div>
              `;
            })}
          </div>
        </div>
        <div class="reviews-list-wrapper">
          <div class="reviews-list ${this.reviewsExpanded ? 'expanded' : ''}">
            ${reviews.map(r => {
              const starCount = Math.min(5, Math.max(0, Math.round(Number(r.rating) || 0)));
              return html`
              <div class="review-item">
                <div class="review-top">
                  <span class="review-rating">${r.rating} ${Array.from({ length: starCount }, () => starSvg)}</span>
                  <span class="review-title">${r.title}</span>
                </div>
                <div class="review-content">${r.content}</div>
                <div class="review-meta">
                  <span class="review-author">${r.author_name}</span>
                  <span>${r.created_at ? r.created_at.split(' ')[0] : ''}</span>
                  <span class="review-helpful">
                    <span><svg viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg> ${r.helpful_count || 0}</span>
                    <span><svg viewBox="0 0 24 24"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/></svg> ${r.unhelpful_count || 0}</span>
                  </span>
                </div>
              </div>
            `;
            })}
          </div>
          ${reviews.length > 2 ? html`
            <button class="reviews-toggle ${this.reviewsExpanded ? 'expanded' : ''}" @click=${this._toggleReviews}>
              ${this.reviewsExpanded ? '收起' : '阅读更多信息'}
              <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
            </button>
          ` : ''}
        </div>
      </div>
    `;
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
            <div class="screenshots-container">
              <button class="screenshots-nav prev" @click=${this._scrollScreenshots.bind(this, -1)}>
                <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
              </button>
              <div class="screenshots-row" @scroll=${this._onScreenshotsScroll}>
                ${screenshots.map(s => html`<img class="screenshot-img" src=${s} alt="截图" loading="lazy" />`)}
              </div>
              <button class="screenshots-nav next" @click=${this._scrollScreenshots.bind(this, 1)}>
                <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
              </button>
            </div>
          </div>
        ` : ''}

        <div class="detail-body">
          <div class="main-content">
            <div class="section">
              <h3>说明</h3>
              <div class="description-wrapper">
                <div class="description-text ${this.descriptionExpanded ? 'expanded' : ''}">${p.custom_description || p.description || '暂无描述信息。'}</div>
                <button class="description-toggle ${this.descriptionExpanded ? 'expanded' : ''}" @click=${this._toggleDescription}>
                  ${this.descriptionExpanded ? '收起' : '展开更多'}
                  <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
                </button>
              </div>
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

        ${this._renderReviews()}

        ${this._renderRelatedProducts()}
      </div>
    `;
  }
}

customElements.define('detail-page', DetailPage);
