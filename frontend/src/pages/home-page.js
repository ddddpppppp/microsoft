import { LitElement, html, css } from 'lit';
import '../components/ms-hero-carousel.js';
import '../components/ms-collection-row.js';
import '../components/ms-collection-grid.js';
import '../components/ms-collection-cards.js';

class HomePage extends LitElement {
  static properties = {
    data: { type: Object },
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
    .section-spacer { height: 16px; }
    /* 外层只做间距，不设白底，让中间缝隙露出灰底 */
    .two-column-wrap {
      max-width: 1600px;
      margin: 0 auto;
      /*padding: 36px;*/
      background: transparent;
      box-sizing: border-box;
    }
    /* 两栏中间留缝，缝隙处为 body 灰底 */
    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 24px;
    }
    .two-column ms-collection-row {
      width: 100%;
      min-width: 0;
      background: #fff;
      border-radius: 8px;
      padding: 24px;
      box-sizing: border-box;
    }
    @media (max-width: 900px) {
      .two-column-wrap { padding: 24px 20px; }
      .two-column { grid-template-columns: 1fr; gap: 0; }
      .two-column ms-collection-row:first-child,
      .two-column ms-collection-row:last-child {
        padding: 0;
      }
    }
  `;

  constructor() {
    super();
    this.data = null;
    this.loading = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
  }

  async _loadData() {
    try {
      const res = await fetch('/api/home');
      this.data = await res.json();
    } catch (e) {
      console.error('Failed to load home data:', e);
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

  _renderCollection(col) {
    const products = this._prepareProducts(col);
    switch (col.section_type) {
      case 'horizontal_scroll':
        return html`
          <ms-collection-row
            .title=${col.name}
            .viewAllUrl=${col.view_all_url || ''}
            .products=${products}
            variant="default"
          ></ms-collection-row>
        `;
      case 'grid':
        return html`
          <ms-collection-grid
            .title=${col.name}
            .viewAllUrl=${col.view_all_url || ''}
            .products=${products}
          ></ms-collection-grid>
        `;
      case 'hero_cards':
        return html`
          <ms-collection-row
            .title=${col.name}
            .viewAllUrl=${col.view_all_url || ''}
            .products=${products}
            variant="hero"
          ></ms-collection-row>
        `;
      case 'collection_cards':
        return '';
      default:
        return html`
          <ms-collection-row
            .title=${col.name}
            .viewAllUrl=${col.view_all_url || ''}
            .products=${products}
          ></ms-collection-row>
        `;
    }
  }

  _buildHeroSideCards(featuredBanners) {
    if (!featuredBanners?.length) return [];
    if (featuredBanners.length >= 3) {
      return [
        featuredBanners[0],
        { type: 'split', left: featuredBanners[1], right: featuredBanners[2] }
      ];
    }
    return featuredBanners.slice(0, 2);
  }

  _getCollectionCards() {
    if (!this.data?.collections) return [];
    const cardCollections = this.data.collections.filter(c =>
      c.section_type === 'collection_cards' && c.slug !== 'collections' && c.display_order > 10
    );
    return cardCollections.map(c => ({
      name: c.name,
      subtitle: c.hero_image || '',
      link_url: c.view_all_url || '#',
      image_url: ''
    }));
  }

  render() {
    if (this.loading) {
      return html`<div class="loading"><div class="loading-spinner"></div><br>正在加载...</div>`;
    }
    if (!this.data) {
      return html`<div class="loading">加载失败，请刷新重试</div>`;
    }

    const heroBanners = this.data.heroBanners || [];
    const featuredBanners = this.data.featuredBanners || [];
    const sideCards = this._buildHeroSideCards(featuredBanners);

    const collections = (this.data.collections || [])
      .filter(c => c.section_type !== 'collection_cards')
      .sort((a, b) => a.display_order - b.display_order);

    const collectionCards = this._getCollectionCards();

    const trendingGames = collections.find(c => c.slug === 'trending-games' || c.name === '热门游戏');
    const trendingApps = collections.find(c => c.slug === 'trending-apps' || c.name === '新潮应用');
    const remainingCollections = collections.filter(c => c !== trendingGames && c !== trendingApps);

    return html`
      <ms-hero-carousel .banners=${heroBanners} .sideCards=${sideCards}></ms-hero-carousel>

      <div class="section-spacer"></div>

      ${(trendingGames || trendingApps) ? html`
        <div class="two-column-wrap">
          <div class="two-column">
            ${trendingGames ? html`
            <ms-collection-row
              .title=${trendingGames.name}
              .viewAllUrl=${trendingGames.view_all_url || ''}
              .products=${this._prepareProducts(trendingGames)}
              variant="twoColGrid"
            ></ms-collection-row>
          ` : ''}
          ${trendingApps ? html`
            <ms-collection-row
              .title=${trendingApps.name}
              .viewAllUrl=${trendingApps.view_all_url || ''}
              .products=${this._prepareProducts(trendingApps)}
              variant="twoColGrid"
            ></ms-collection-row>
          ` : ''}
          </div>
        </div>
      ` : ''}

      ${remainingCollections.map(col => this._renderCollection(col))}

      ${collectionCards.length > 0 ? html`
        <ms-collection-cards title="Collections" .cards=${collectionCards}></ms-collection-cards>
      ` : ''}
    `;
  }
}
customElements.define('home-page', HomePage);
