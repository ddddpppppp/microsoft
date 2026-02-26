import { LitElement, html, css } from 'lit';
import '../components/ms-hero-carousel.js';
import '../components/ms-featured-row.js';
import '../components/ms-collection-row.js';
import '../components/ms-collection-grid.js';
import '../components/ms-collection-cards.js';

class GamesPage extends LitElement {
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
      if (col.section_type === 'collection_cards') continue;
      const gameProducts = (col.products || []).filter(p => p.product_type === 'game');
      if (gameProducts.length > 0) {
        gameCollections.push({ ...col, products: gameProducts });
      }
    }

    return gameCollections.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
  }

  _getCollectionCards() {
    const allCollections = [
      ...(this.data?.collections || []),
      ...(this.homeData?.collections || [])
    ];

    const gameRelatedSlugs = new Set([
      'xbox-play-anywhere', 'racing-games', 'kids-games',
      'free-games'
    ]);

    const cards = allCollections
      .filter(c => c.section_type === 'collection_cards' && c.slug !== 'collections' && gameRelatedSlugs.has(c.slug))
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

  _isTallGameSection(col) {
    const name = (col.name || '').trim();
    const slug = (col.slug || '').toLowerCase();
    return (
      name === '最畅销的游戏' ||
      name === '全新值得注目的電腦遊戲' ||
      slug === 'top-grossing' ||
      slug === 'new-pc-games' ||
      slug.includes('topgrossing') ||
      slug.includes('top-grossing') ||
      slug.includes('new-notable') ||
      slug.includes('new-pc')
    );
  }

  _renderCollection(col) {
    const products = this._prepareProducts(col);

    if (col.section_type === 'grid' && this._isTallGameSection(col)) {
      return html`
        <ms-collection-row
          .title=${col.name}
          .viewAllUrl=${col.view_all_url || ''}
          .products=${products}
          variant="tall"
        ></ms-collection-row>
      `;
    }

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
    const sideCards = this._buildHeroSideCards(featuredBanners);
    const collections = this._getGameCollections();
    const collectionCards = this._getCollectionCards();

    return html`
      ${heroBanners.length > 0 ? html`
        <ms-hero-carousel .banners=${heroBanners} .sideCards=${sideCards}></ms-hero-carousel>
        <div class="section-spacer"></div>
      ` : ''}

      <div class="product-collections-wrap">
        ${collections.map(col => this._renderCollection(col))}
        ${collectionCards.length > 0 ? html`
          <ms-collection-cards title="Collections" .cards=${collectionCards}></ms-collection-cards>
        ` : ''}
      </div>
    `;
  }
}
customElements.define('games-page', GamesPage);
