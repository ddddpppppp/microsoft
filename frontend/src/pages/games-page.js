import { LitElement, html, css } from 'lit';
import '../components/ms-hero-carousel.js';
import '../components/ms-featured-row.js';
import '../components/ms-collection-row.js';
import '../components/ms-collection-grid.js';

class GamesPage extends LitElement {
  static properties = {
    data: { type: Object },
    homeData: { type: Object },
    loading: { type: Boolean }
  };

  static styles = css`
    :host { display: block; padding-bottom: 40px; background: transparent; }
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
    .page-header {
      max-width: 1600px;
      margin: 0 auto;
      padding: 24px 38px 8px;
    }
    .page-title {
      font-size: 28px;
      font-weight: 700;
      color: #131316;
      margin: 0;
    }
    .page-subtitle {
      font-size: 14px;
      color: #616161;
      margin-top: 8px;
    }
    .section-spacer { height: 48px; }
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
      const [gamesRes, homeRes] = await Promise.all([
        fetch('/api/games'),
        fetch('/api/home')
      ]);
      this.data = await gamesRes.json();
      this.homeData = await homeRes.json();
    } catch (e) {
      console.error('Failed to load games data:', e);
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

  _getGameCollections() {
    const allCollections = [
      ...(this.data?.collections || []),
      ...(this.homeData?.collections || [])
    ];

    const seen = new Set();
    const gameCollections = [];
    for (const col of allCollections) {
      if (seen.has(col.id)) continue;
      seen.add(col.id);
      const gameProducts = (col.products || []).filter(p => p.product_type === 'game');
      if (gameProducts.length > 0 && col.section_type !== 'collection_cards') {
        gameCollections.push({ ...col, products: gameProducts });
      }
    }

    return gameCollections.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
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
    return html`
      <ms-collection-row
        .title=${col.name}
        .viewAllUrl=${col.view_all_url || ''}
        .products=${products}
        variant=${col.section_type === 'hero_cards' ? 'hero' : 'default'}
      ></ms-collection-row>
    `;
  }

  render() {
    if (this.loading) {
      return html`<div class="loading"><div class="loading-spinner"></div><br>正在加载...</div>`;
    }

    const heroBanners = this.data?.heroBanners || this.homeData?.heroBanners || [];
    const featuredBanners = this.data?.featuredBanners || this.homeData?.featuredBanners || [];
    const sideCards = featuredBanners.slice(0, 2);
    const bottomFeatured = featuredBanners.slice(2, 5);
    const collections = this._getGameCollections();

    return html`
      <div class="page-header">
        <h1 class="page-title">游戏</h1>
        <p class="page-subtitle">发现适用于 Windows 的精选游戏</p>
      </div>

      ${heroBanners.length > 0 ? html`
        <ms-hero-carousel .banners=${heroBanners} .sideCards=${sideCards}></ms-hero-carousel>
        <div class="section-spacer"></div>
      ` : ''}

      ${bottomFeatured.length > 0 ? html`
        <ms-featured-row .banners=${bottomFeatured}></ms-featured-row>
      ` : ''}

      ${collections.map(col => this._renderCollection(col))}
    `;
  }
}
customElements.define('games-page', GamesPage);
