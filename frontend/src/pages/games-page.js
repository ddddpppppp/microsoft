import { LitElement, html, css } from 'lit';
import { cachedFetch } from '../utils/api-cache.js';
import '../components/ms-hero-carousel.js';
import '../components/ms-featured-row.js';
import '../components/ms-collection-row.js';
import '../components/ms-collection-grid.js';
import '../components/ms-collection-cards.js';
import '../components/ms-rating.js';
import '../components/ms-lazy-img.js';

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

    /* === Top Games section header === */
    .topgames-section { margin-bottom: 0; }
    .topgames-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .topgames-title-area {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .topgames-title-link {
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
    .topgames-title-link:hover { background-color: #e8ebeb; }
    .topgames-title {
      font-size: 20px;
      font-weight: 600;
      font-family: var(--header-font);
      color: #1a1a1a;
      margin: 0;
    }
    .topgames-chevron {
      font-size: 12px;
      color: #1a1a1a;
      margin-left: 2px;
    }

    /* === 2x2 product grid - each item is a separate white card === */
    .topgames-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .topgames-item {
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
    .topgames-item:hover { 
      background: #fff;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .topgames-item-icon {
      flex-shrink: 0;
      width: 64px;
      height: 64px;
      border-radius: 8px;
      object-fit: cover;
      background: #f5f5f5;
      margin-right: 12px;
    }
    .topgames-item-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .topgames-item-name {
      font-size: 13px;
      font-weight: 400;
      color: #1a1a1a;
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .topgames-item-meta {
      font-size: 12px;
      color: #616161;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .topgames-item-price {
      font-size: 12px;
      font-weight: 600;
      color: #1a1a1a;
    }
    .topgames-item-price.free {
      color: #0e7a0d;
    }

    /* === Game Pass banner (right slot) === */
    .gamepass-banner {
      display: flex;
      height: 100%;
      border-radius: 8px;
      overflow: hidden;
      background: linear-gradient(135deg, #107c10 0%, #0b5c0b 100%);
    }
    .gamepass-banner a {
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
    .gamepass-text {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .gamepass-banner .promo-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .gamepass-banner .promo-badge svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
    .gamepass-banner .promo-title {
      font-size: 20px;
      font-weight: 600;
      color: rgb(255, 255, 255);
      margin: 0;
      line-height: 1.3;
    }
    .gamepass-banner .promo-sub {
      font-size: 14px;
      color: rgb(255, 255, 255);
      margin: 4px 0 0;
      line-height: 1.4;
      opacity: 0.9;
    }
    .gamepass-icons-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    .gamepass-icons-scatter {
      position: relative;
      width: 180px;
      height: 100px;
    }
    .gamepass-icons-scatter .gamepass-icon {
      position: absolute;
      border-radius: 10px;
      object-fit: cover;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      background: #fff;
    }
    .gamepass-icons-scatter .gamepass-icon:nth-child(1) { width: 52px; height: 52px; top: 0; left: 72px; z-index: 7; }
    .gamepass-icons-scatter .gamepass-icon:nth-child(2) { width: 40px; height: 40px; top: 8px; left: 130px; z-index: 6; }
    .gamepass-icons-scatter .gamepass-icon:nth-child(3) { width: 36px; height: 36px; top: 2px; left: 28px; z-index: 5; }
    .gamepass-icons-scatter .gamepass-icon:nth-child(4) { width: 44px; height: 44px; top: 50px; left: 0; z-index: 4; }
    .gamepass-icons-scatter .gamepass-icon:nth-child(5) { width: 48px; height: 48px; top: 48px; left: 52px; z-index: 3; }
    .gamepass-icons-scatter .gamepass-icon:nth-child(6) { width: 38px; height: 38px; top: 56px; left: 108px; z-index: 2; }
    .gamepass-icons-scatter .gamepass-icon:nth-child(7) { width: 34px; height: 34px; top: 38px; left: 148px; z-index: 1; }
    .gamepass-bottom {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 2px;
    }
    .gamepass-selected-text {
      font-size: 12px;
      color: rgba(255,255,255,0.85);
      white-space: nowrap;
    }
    .gamepass-join-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 5px 16px;
      border-radius: 4px;
      background: #fff;
      color: #107c10;
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
      .gamepass-banner a { padding: 20px 24px; }
    }
    @media (max-width: 900px) {
      .product-collections-wrap { margin: 48px 20px 0; padding: 0 20px; }
      .topgames-grid { grid-template-columns: 1fr; }
      .gamepass-icons-scatter { width: 140px; height: 80px; }
    }
  `;

  static _gamepackIcons = [
    '/assets/images/gamepack/minecraft.png',
    '/assets/images/gamepack/gta5.png',
    '/assets/images/gamepack/forza5.png',
    '/assets/images/gamepack/mcdungeons.png',
    '/assets/images/gamepack/flightsim.png',
    '/assets/images/gamepack/forza5premium.png',
    '/assets/images/gamepack/mcdeluxe.png',
  ];

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
      const [gamesData, homeData] = await Promise.all([
        cachedFetch('/api/games'),
        cachedFetch('/api/home')
      ]);
      this.data = gamesData;
      this.homeData = homeData;
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

  _renderTopGamesItem(p) {
    const icon = p.local_icon || p.icon_url || '';
    const href = p.is_own_product && p.custom_url ? p.custom_url : (p.original_url || '#');
    const useNav = href.startsWith('/');
    const isFree = p.price_type === 'free' || p.price === '免费' || p.price === 'Free' || p.price === '免费下载';
    const priceText = isFree ? '免费下载' : (p.price || '');
    
    return html`
      <a class="topgames-item" href=${href} ?data-nav=${useNav}
        rel=${useNav ? '' : 'nofollow noopener'} ?target=${!useNav ? '_blank' : ''}>
        <ms-lazy-img class="topgames-item-icon" src=${icon} alt=${p.title || ''} width="64px" height="64px" radius="8px"></ms-lazy-img>
        <div class="topgames-item-info">
          <div class="topgames-item-name">${p.title || ''}</div>
          <div class="topgames-item-meta">
            <ms-rating .value=${p.rating || 0}></ms-rating>
            <span>${p.category || ''}</span>
          </div>
          <div class="topgames-item-price ${isFree ? 'free' : ''}">${priceText}</div>
        </div>
      </a>
    `;
  }

  _renderTopGamesSection(collection) {
    const products = this._prepareProducts(collection).slice(0, 4);
    const viewAllUrl = collection.view_all_url || '#';
    const icons = GamesPage._gamepackIcons;

    return html`
      <div class="topgames-section">
        <div class="topgames-header">
          <div class="topgames-title-area">
            <a class="topgames-title-link" href=${viewAllUrl} data-nav>
              <h2 class="topgames-title">${collection.name || '热门游戏'}</h2>
              <span class="topgames-chevron">&#8250;</span>
            </a>
          </div>
        </div>
        <div class="dual-collection-layout">
          <div class="slot-left">
            <div class="topgames-grid">
              ${products.map(p => this._renderTopGamesItem(p))}
            </div>
          </div>
          <div class="slot-right">
            <div class="gamepass-banner">
              <a href="https://www.xbox.com/xbox-game-pass" target="_blank" rel="nofollow noopener">
                <div class="gamepass-text">
                  <div class="promo-badge">
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    GAME PASS
                  </div>
                  <span class="promo-title">Xbox Game Pass</span>
                  <span class="promo-sub">畅玩数百款高品质游戏</span>
                </div>
                <div class="gamepass-icons-area">
                  <div class="gamepass-icons-scatter">
                    ${icons.slice(0, 7).map(src => html`
                      <img class="gamepass-icon" src=${src} alt="" loading="lazy" />
                    `)}
                  </div>
                  <div class="gamepass-bottom">
                    <span class="gamepass-selected-text">100+ games</span>
                    <span class="gamepass-join-btn">Join now</span>
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
    const collections = this._getGameCollections();
    const collectionCards = this._getCollectionCards();
    const firstCollection = collections[0] || null;
    const restCollections = firstCollection ? collections.slice(1) : collections;

    return html`
      ${heroBanners.length > 0 ? html`
        <ms-hero-carousel .banners=${heroBanners} .sideCards=${sideCards}></ms-hero-carousel>
        <div class="section-spacer"></div>
      ` : ''}

      <div class="product-collections-wrap">
        ${firstCollection ? this._renderTopGamesSection(firstCollection) : ''}
        ${restCollections.map(col => this._renderCollection(col))}
        ${collectionCards.length > 0 ? html`
          <ms-collection-cards title="Collections" .cards=${collectionCards}></ms-collection-cards>
        ` : ''}
      </div>
    `;
  }
}
customElements.define('games-page', GamesPage);
