import { LitElement, html, css } from 'lit';
import '../components/ms-hero-carousel.js';
import '../components/ms-featured-row.js';
import '../components/ms-collection-row.js';
import '../components/ms-collection-grid.js';
import '../components/ms-collection-cards.js';

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
    /* dual-collection-layout 一比一还原官方：flex + --left/right-flex-ratio 0.5，gap 12px（MCP 实测） */
    .dual-collection-layout {
      display: flex;
      gap: 12px;
      --left-flex-ratio: 0.5;
      --right-flex-ratio: 0.5;
    }
    .dual-collection-layout .slot-left {
      flex: var(--left-flex-ratio);
      min-width: 0;
    }
    .dual-collection-layout .slot-right {
      flex: var(--right-flex-ratio);
      min-width: 0;
    }
    /* apppack-banner 一比一官方样式：渐变 242.09deg、padding 16px 32px、title 20px/600、desc 14px（MCP 实测） */
    .apppack-banner {
      display: block;
      height: 100%;
      min-height: 200px;
      border-radius: 8px;
      overflow: hidden;
      background: linear-gradient(242.09deg, rgb(136, 196, 230) -8.22%, rgb(96, 201, 185) 98.66%);
    }
    .apppack-banner a {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 16px 32px;
      height: 100%;
      min-height: 200px;
      color: #fff;
      text-decoration: none;
      box-sizing: border-box;
    }
    .apppack-banner .promo-title {
      font-size: 20px;
      font-weight: 600;
      color: rgb(255, 255, 255);
      margin: 16.6px 0 12px;
      line-height: 1.3;
    }
    .apppack-banner .promo-sub {
      font-size: 14px;
      color: rgb(255, 255, 255);
      margin: 0 0 24px;
      line-height: 1.4;
    }
    @media (max-width: 1100px) {
      .dual-collection-layout { flex-direction: column; }
      .apppack-banner { min-height: 120px; }
      .apppack-banner a { min-height: 120px; padding: 16px 24px; }
    }
    @media (max-width: 900px) {
      .product-collections-wrap { margin: 48px 20px 0; padding: 0 20px; }
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
    try {
      const [appsRes, homeRes] = await Promise.all([
        fetch('/api/apps'),
        fetch('/api/home')
      ]);
      this.data = await appsRes.json();
      this.homeData = await homeRes.json();
    } catch (e) {
      console.error('Failed to load apps data:', e);
    }
    this.loading = false;
  }

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
    // On apps page, do not use "多应用安装介绍" as hero side card — it goes in the middle row on the right.
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
        <div class="section-spacer"></div>
      ` : ''}

      <div class="product-collections-wrap">
        ${firstCollection ? html`
          <div class="dual-collection-layout" auto-height-sync column-ratio="50% 50%">
            <div class="slot-left">${this._renderCollection(firstCollection)}</div>
            <div class="slot-right">
              <div class="apppack-banner" from-page="Apps">
                <a href="https://apps.microsoft.com/apppack" target="_blank" rel="noopener">
                  <span class="promo-title">多应用安装介绍</span>
                  <span class="promo-sub">一次选择并安装多个应用</span>
                </a>
              </div>
            </div>
          </div>
        ` : ''}
        ${restCollections.map(col => this._renderCollection(col))}
        ${collectionCards.length > 0 ? html`
          <ms-collection-cards title="Collections" .cards=${collectionCards}></ms-collection-cards>
        ` : ''}
      </div>
    `;
  }
}
customElements.define('apps-page', AppsPage);
