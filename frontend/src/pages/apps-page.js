import { LitElement, html, css } from 'lit';
import { cachedFetch } from '../utils/api-cache.js';
import '../components/ms-hero-carousel.js';
import '../components/ms-featured-row.js';
import '../components/ms-collection-row.js';
import '../components/ms-collection-grid.js';
import '../components/ms-collection-cards.js';
import '../components/ms-rating.js';
import '../components/ms-lazy-img.js';

class AppsPage extends LitElement {
  static properties = {
    data: { type: Object },
    homeData: { type: Object },
    loading: { type: Boolean }
  };

  static styles = css`
    :host { display: block; padding-bottom: 48px; background: transparent; }
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
    .section-spacer { height: 48px; }
    .product-collections-wrap {
      display: flex;
      flex-direction: column;
      gap: 48px;
      max-width: var(--ms-content-max-width, 1600px);
      margin: 48px auto 0;
      padding: 0 38px;
      box-sizing: border-box;
    }

    /* === dual-collection-layout: flex 50/50 with 12px gap === */
    .dual-collection-layout {
      display: flex;
      gap: 12px;
    }
    .dual-collection-layout .slot-left {
      flex: 1;
      min-width: 0;
    }
    .dual-collection-layout .slot-right {
      flex: 1;
      min-width: 0;
    }

    /* === Top Free section header === */
    .topfree-section { margin-bottom: 0; }
    .topfree-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .topfree-title-area {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .topfree-title-link {
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
    .topfree-title-link:hover { background-color: #e8ebeb; }
    .topfree-title {
      font-size: 20px;
      font-weight: 600;
      font-family: var(--header-font);
      color: #1a1a1a;
      margin: 0;
    }
    .topfree-chevron {
      font-size: 12px;
      color: #1a1a1a;
      margin-left: 2px;
    }

    /* === 2x2 product grid (left slot) - each item is a separate white card === */
    .topfree-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .topfree-item {
      display: flex;
      align-items: center;
      gap: 0;
      padding: 12px 16px;
      border-radius: 8px;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      transition: background 0.15s, box-shadow 0.15s;
      min-height: 72px;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.85);
      border: 1px solid hsl(240 5.9% 90%);
    }
    .topfree-item:hover { 
      background: #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .topfree-item-icon {
      flex-shrink: 0;
      width: 64px;
      height: 64px;
      border-radius: 12px;
      object-fit: cover;
      background: #f5f5f5;
      margin-right: 12px;
    }
    .topfree-item-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .topfree-item-name {
      font-size: 13px;
      font-weight: 400;
      color: #1a1a1a;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .topfree-item-meta {
      font-size: 12px;
      color: #616161;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .topfree-item-price {
      font-size: 12px;
      font-weight: 600;
      color: #0e7a0d;
    }

    /* === Apppack banner (right slot) === */
    .apppack-banner {
      display: flex;
      height: 100%;
      border-radius: 8px;
      overflow: hidden;
      background: linear-gradient(242.09deg, rgb(136, 196, 230) -8.22%, rgb(96, 201, 185) 98.66%);
    }
    .apppack-banner a {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 24px 32px;
      width: 100%;
      color: #fff;
      text-decoration: none;
      box-sizing: border-box;
      gap: 16px;
    }
    .apppack-text {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .apppack-banner .promo-title {
      font-size: 20px;
      font-weight: 600;
      color: rgb(255, 255, 255);
      margin: 0;
      line-height: 1.3;
    }
    .apppack-banner .promo-sub {
      font-size: 14px;
      color: rgb(255, 255, 255);
      margin: 4px 0 0;
      line-height: 1.4;
      opacity: 0.9;
    }
    .apppack-icons-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    .apppack-icons-scatter {
      position: relative;
      width: 180px;
      height: 100px;
    }
    .apppack-icons-scatter .apppack-icon {
      position: absolute;
      border-radius: 10px;
      object-fit: cover;
      box-shadow: 0 2px 8px rgba(0,0,0,0.18);
      background: #fff;
    }
    .apppack-icons-scatter .apppack-icon:nth-child(1) { width: 52px; height: 52px; top: 0; left: 72px; z-index: 7; }
    .apppack-icons-scatter .apppack-icon:nth-child(2) { width: 40px; height: 40px; top: 8px; left: 130px; z-index: 6; }
    .apppack-icons-scatter .apppack-icon:nth-child(3) { width: 36px; height: 36px; top: 2px; left: 28px; z-index: 5; }
    .apppack-icons-scatter .apppack-icon:nth-child(4) { width: 44px; height: 44px; top: 50px; left: 0; z-index: 4; }
    .apppack-icons-scatter .apppack-icon:nth-child(5) { width: 48px; height: 48px; top: 48px; left: 52px; z-index: 3; }
    .apppack-icons-scatter .apppack-icon:nth-child(6) { width: 38px; height: 38px; top: 56px; left: 108px; z-index: 2; }
    .apppack-icons-scatter .apppack-icon:nth-child(7) { width: 34px; height: 34px; top: 38px; left: 148px; z-index: 1; }
    .apppack-bottom {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 2px;
    }
    .apppack-selected-text {
      font-size: 12px;
      color: rgba(255,255,255,0.85);
      white-space: nowrap;
    }
    .apppack-install-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 16px;
      border-radius: 4px;
      background: #fff;
      color: #0067b8;
      font-size: 13px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      white-space: nowrap;
      text-decoration: none;
      line-height: 1.4;
    }

    @media (max-width: 1100px) {
      .dual-collection-layout { flex-direction: column; }
      .apppack-banner a { padding: 20px 24px; }
    }
    @media (max-width: 900px) {
      .product-collections-wrap { margin: 48px 20px 0; padding: 0 20px; }
      .topfree-grid { grid-template-columns: 1fr; }
      .apppack-icons-scatter { width: 140px; height: 80px; }
    }
  `;

  constructor() {
    super();
    this.data = null;
    this.homeData = null;
    this.loading = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
  }

  async _loadData() {
    if (this.data) { this.loading = false; return; }
    try {
      const [appsData, homeData] = await Promise.all([
        cachedFetch('/api/apps'),
        cachedFetch('/api/home')
      ]);
      this.data = appsData;
      this.homeData = homeData;
    } catch (e) {
      console.error('Failed to load apps data:', e);
    }
    this.loading = false;
  }

  static _apppackIcons = [
    '/assets/images/apppack/sketchbook.png',
    '/assets/images/apppack/acrobat.png',
    '/assets/images/apppack/hulu.png',
    '/assets/images/apppack/clipchamp.png',
    '/assets/images/apppack/whatsapp.png',
    '/assets/images/apppack/concepts.png',
    '/assets/images/apppack/ibispaint.png',
  ];

  _prepareProducts(col) {
    return (col.products || []).map(p => ({
      ...p,
      icon_url: p.local_icon || p.icon_url || '',
      product_id: p.ms_id || p.id
    }));
  }

  _isAppPackBanner(b) {
    const t = (b.title || '').trim();
    const s = (b.subtitle || '').trim();
    return /多应用|安装介绍|一次选择并安装/.test(t + s);
  }

  _buildHeroSideCards(featuredBanners) {
    if (!featuredBanners?.length) return [];
    const filtered = featuredBanners.filter(b => !this._isAppPackBanner(b));
    const list = filtered.length >= 2 ? filtered : featuredBanners;
    if (list.length >= 3) {
      return [
        list[0],
        { type: 'split', left: list[1], right: list[2] }
      ];
    }
    return list.slice(0, 2);
  }

  _getAppCollections() {
    const allCollections = [
      ...(this.data?.collections || []),
      ...(this.homeData?.collections || [])
    ];

    const seen = new Set();
    const appCollections = [];
    for (const col of allCollections) {
      if (seen.has(col.id)) continue;
      seen.add(col.id);
      if (col.section_type === 'collection_cards') continue;
      const appProducts = (col.products || []).filter(p => p.product_type === 'app');
      if (appProducts.length > 0) {
        appCollections.push({ ...col, products: appProducts });
      }
    }

    return appCollections.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }

  _getCollectionCards() {
    const allCollections = [
      ...(this.data?.collections || []),
      ...(this.homeData?.collections || [])
    ];

    const appRelatedSlugs = new Set([
      'creative-apps-collection', 'social-networking-collection',
      'best-entertainment-apps', 'get-started', 'productivity-apps-collection',
      'personalization-apps', 'widgets'
    ]);

    const cards = allCollections
      .filter(c => c.section_type === 'collection_cards' && c.slug !== 'collections' && appRelatedSlugs.has(c.slug))
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
      .map(c => ({
        name: c.name,
        subtitle: '',
        link_url: c.view_all_url || '#',
        image_url: c.hero_image || ''
      }));

    if (cards.length === 0) {
      return allCollections
        .filter(c => c.section_type === 'collection_cards' && c.slug !== 'collections' && c.display_order > 10)
        .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
        .map(c => ({
          name: c.name,
          subtitle: '',
          link_url: c.view_all_url || '#',
          image_url: c.hero_image || ''
        }));
    }
    return cards;
  }

  _isSocialSection(col) {
    const name = (col.name || '').trim();
    const slug = (col.slug || '').toLowerCase();
    return name === '社交網路應用程式' || slug.includes('social');
  }

  _renderCollection(col) {
    const products = this._prepareProducts(col);

    if (col.section_type === 'grid') {
      return html`
        <ms-collection-grid
          .title=${col.name}
          .viewAllUrl=${col.view_all_url || ''}
          .products=${products}
        ></ms-collection-grid>
      `;
    }

    if (this._isSocialSection(col)) {
      return html`
        <ms-collection-row
          .title=${col.name}
          .viewAllUrl=${col.view_all_url || ''}
          .products=${products}
          variant="social"
        ></ms-collection-row>
      `;
    }

    if (col.section_type === 'hero_cards') {
      return html`
        <ms-collection-row
          .title=${col.name}
          .viewAllUrl=${col.view_all_url || ''}
          .products=${products}
          variant="hero"
        ></ms-collection-row>
      `;
    }

    return html`
      <ms-collection-row
        .title=${col.name}
        .viewAllUrl=${col.view_all_url || ''}
        .products=${products}
        variant="default"
      ></ms-collection-row>
    `;
  }

  _renderTopFreeItem(p) {
    const icon = p.local_icon || p.icon_url || '';
    const href = p.is_own_product && p.custom_url ? p.custom_url : (p.original_url || '#');
    const useNav = href.startsWith('/');
    return html`
      <a class="topfree-item" href=${href} ?data-nav=${useNav}
        rel=${useNav ? '' : 'nofollow noopener'} ?target=${!useNav ? '_blank' : ''}>
        <ms-lazy-img class="topfree-item-icon" src=${icon} alt=${p.title || ''} width="64px" height="64px" radius="12px"></ms-lazy-img>
        <div class="topfree-item-info">
          <div class="topfree-item-name">${p.title || ''}</div>
          <div class="topfree-item-meta">
            <ms-rating .value=${p.rating || 0}></ms-rating>
            <span>${p.category || ''}</span>
          </div>
          <div class="topfree-item-price">免费下载</div>
        </div>
      </a>
    `;
  }

  _renderTopFreeSection(collection) {
    const products = this._prepareProducts(collection).slice(0, 4);
    const viewAllUrl = collection.view_all_url || '#';
    const icons = AppsPage._apppackIcons;

    return html`
      <div class="topfree-section">
        <div class="topfree-header">
          <div class="topfree-title-area">
            <a class="topfree-title-link" href=${viewAllUrl} data-nav>
              <h2 class="topfree-title">${collection.name || '必备免费应用'}</h2>
              <span class="topfree-chevron">&#8250;</span>
            </a>
          </div>
        </div>
        <div class="dual-collection-layout">
          <div class="slot-left">
            <div class="topfree-grid">
              ${products.map(p => this._renderTopFreeItem(p))}
            </div>
          </div>
          <div class="slot-right">
            <div class="apppack-banner" from-page="Apps">
              <a href="https://apps.microsoft.com/apppack" target="_blank" rel="nofollow noopener">
                <div class="apppack-text">
                  <span class="promo-title">多应用安装介绍</span>
                  <span class="promo-sub">一次选择并安装多个应用</span>
                </div>
                <div class="apppack-icons-area">
                  <div class="apppack-icons-scatter">
                    ${icons.slice(0, 7).map(src => html`
                      <img class="apppack-icon" src=${src} alt="" loading="lazy" />
                    `)}
                  </div>
                  <div class="apppack-bottom">
                    <span class="apppack-selected-text">3 apps selected</span>
                    <span class="apppack-install-btn">Install</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (this.loading) {
      return html`<div class="loading"><div class="loading-spinner"></div><br>正在加载...</div>`;
    }

    const heroBanners = this.data?.heroBanners || this.homeData?.heroBanners || [];
    const featuredBanners = this.data?.featuredBanners || this.homeData?.featuredBanners || [];
    const sideCards = this._buildHeroSideCards(featuredBanners);
    const collections = this._getAppCollections();
    const collectionCards = this._getCollectionCards();
    const firstCollection = collections[0] || null;
    const restCollections = firstCollection ? collections.slice(1) : collections;

    return html`
      ${heroBanners.length > 0 ? html`
        <ms-hero-carousel .banners=${heroBanners} .sideCards=${sideCards}></ms-hero-carousel>
      ` : ''}

      <div class="product-collections-wrap">
        ${firstCollection ? this._renderTopFreeSection(firstCollection) : ''}
        ${restCollections.map(col => this._renderCollection(col))}
        ${collectionCards.length > 0 ? html`
          <ms-collection-cards title="Collections" .cards=${collectionCards}></ms-collection-cards>
        ` : ''}
      </div>
    `;
  }
}
customElements.define('apps-page', AppsPage);
