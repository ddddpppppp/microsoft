import { LitElement, html, css } from 'lit';
import './ms-lazy-img.js';

const DEFAULT_BANNERS = [
  {
    title: 'Microsoft 365',
    subtitle: '管理每日工作的應用程式',
    button_text: '获取',
    badge_text: '',
    gradient: 'linear-gradient(135deg, #1a1a4e 0%, #2d2d8a 40%, #4a4ac7 100%)',
    link_url: '/detail/microsoft-365'
  },
  {
    title: 'Xbox Game Pass',
    subtitle: '新作上市當天即可暢玩',
    button_text: '获取',
    badge_text: 'Game Pass',
    gradient: 'linear-gradient(135deg, #0b3d0b 0%, #1a5c1a 40%, #2d7a2d 100%)',
    link_url: '/detail/xbox-game-pass'
  },
  {
    title: 'Minecraft: Java & Bedrock Edition',
    subtitle: '立即遊戲',
    button_text: '获取',
    badge_text: 'Game Pass Premium',
    gradient: 'linear-gradient(135deg, #3d2b1f 0%, #6b4423 40%, #8b6914 100%)',
    link_url: '/detail/minecraft'
  },
  {
    title: '精选应用合集',
    subtitle: '发现最受欢迎的应用和游戏',
    button_text: '全部显示',
    badge_text: '',
    gradient: 'linear-gradient(135deg, #1b2838 0%, #2a475e 40%, #3d6b8e 100%)',
    link_url: '/apps'
  },
  {
    title: 'Copilot',
    subtitle: '你的日常 AI 助手',
    button_text: '获取',
    badge_text: '免费',
    gradient: 'linear-gradient(135deg, #2b1055 0%, #4a2c82 40%, #7b5ea7 100%)',
    link_url: '/detail/copilot'
  }
];

const DEFAULT_SIDE_CARDS = [
  {
    title: 'Overwatch\u00AE 2',
    subtitle: '立即透過 Xbox Game Pass 購買或玩遊戲',
    badge_text: 'Game Pass',
    gradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    link_url: '#'
  },
  {
    title: '社交網路應用程式',
    subtitle: '聯繫和學習',
    gradient: 'linear-gradient(135deg, #2d3436, #636e72)',
    link_url: '/apps'
  }
];

class MsHeroCarousel extends LitElement {
  static properties = {
    banners: { type: Array },
    sideCards: { type: Array },
    _activeIndex: { type: Number, state: true }
  };

  static styles = css`
    :host {
      display: block;
      padding: 12px 0 0;
      user-select: none;
    }
    .hero-layout {
      display: grid;
      grid-template-columns: 60fr 40fr;
      grid-template-rows: 340px auto;
      gap: 12px 12px;
      max-width: var(--ms-content-max-width, 1600px);
      margin: 0 auto;
      padding: 0 38px;
      box-sizing: border-box;
    }
    .carousel-wrapper {
      grid-column: 1;
      grid-row: 1;
      min-height: 0;
    }
    .hero-layout .side-cards {
      grid-column: 2;
      grid-row: 1;
      height: 340px;
    }
    .hero-layout .dots-row {
      grid-column: 1;
      grid-row: 2;
    }

    /* Main carousel */
    .carousel {
      position: relative;
      width: 100%;
      height: 340px;
      border-radius: 8px;
      overflow: hidden;
    }
    .slides {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .slide {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: flex-end;
      padding: 0 48px 44px;
      opacity: 0;
      transition: opacity 0.5s ease;
      pointer-events: none;
      z-index: 0;
    }
    .slide.active {
      opacity: 1;
      pointer-events: auto;
      z-index: 1;
    }
    .slide-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
    .slide-bg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .slide-bg .gradient-fill {
      width: 100%;
      height: 100%;
    }
    .slide-content {
      position: relative;
      z-index: 1;
      max-width: 420px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      color: #fff;
      background: #107c10;
      padding: 2px 8px;
      border-radius: 3px;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      margin-bottom: 4px;
      width: fit-content;
    }
    .title {
      font-size: 26px;
      font-weight: 700;
      color: #fff;
      line-height: 1.2;
      margin: 0;
      text-shadow: 0 1px 3px rgba(0,0,0,0.25);
    }
    .subtitle {
      font-size: 13px;
      color: rgba(255,255,255,0.88);
      line-height: 1.4;
      margin: 2px 0 10px;
    }
    .cta-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      padding: 6px 20px;
      border-radius: 4px;
      border: none;
      background: rgba(255,255,255,0.92);
      color: #131316;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s;
    }
    .cta-btn:hover { background: #fff; }

    /* Arrows */
    .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: rgba(0,0,0,0.4);
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.2s, background 0.15s;
      backdrop-filter: blur(4px);
    }
    .carousel:hover .arrow { opacity: 1; }
    .arrow:hover { background: rgba(0,0,0,0.6); }
    .arrow.left { left: 10px; }
    .arrow.right { right: 10px; }
    .arrow svg {
      width: 12px; height: 12px;
      fill: none; stroke: #fff;
      stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round;
    }

    /* Dots - 独立一行，仅在左列下方 */
    .dots-row {
      padding-top: 10px;
      padding-bottom: 2px;
    }
    .dots {
      display: flex;
      justify-content: center;
      gap: 6px;
    }
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      border: none;
      background: #c8c8c8;
      cursor: pointer;
      padding: 0;
      transition: background 0.2s, transform 0.2s;
    }
    .dot:hover { background: #999; }
    .dot.active { background: #333; }

    /* Side cards - 与左侧轮播同高 340px */
    .side-cards {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-height: 0;
    }
    .side-card {
      flex: 1;
      min-height: 0;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      transition: box-shadow 0.2s;
      min-height: 0;
    }
    .side-card:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    }
    .side-card-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
    .side-card-bg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .side-card-bg .gradient-fill {
      width: 100%;
      height: 100%;
    }
    .side-card-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
      z-index: 1;
    }
    .side-card-content {
      position: relative;
      z-index: 2;
      padding: 14px 16px;
    }
    .side-card-badge {
      display: inline-block;
      font-size: 9px;
      font-weight: 700;
      color: #fff;
      background: #107c10;
      padding: 2px 6px;
      border-radius: 3px;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .side-card-title {
      font-size: 15px;
      font-weight: 700;
      color: #fff;
      line-height: 1.25;
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }
    .side-card-subtitle {
      font-size: 12px;
      color: rgba(255,255,255,0.8);
      margin-top: 2px;
      line-height: 1.3;
    }

    /* Split card: one card, two halves (e.g. 社交 | CyberSafe) */
    .side-card.side-card-split {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
    }
    .side-card-half {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      min-height: 0;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      overflow: hidden;
    }
    .side-card-half:hover { opacity: 0.98; }
    .side-card-half .side-card-bg { position: absolute; inset: 0; z-index: 0; }
    .side-card-half .side-card-bg img { width: 100%; height: 100%; object-fit: cover; }
    .side-card-half .side-card-bg .gradient-fill { width: 100%; height: 100%; }
    .side-card-half .side-card-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
      z-index: 1;
    }
    .side-card-half .side-card-content {
      position: relative;
      z-index: 2;
      padding: 12px 14px;
    }
    .side-card-half .side-card-badge { margin-bottom: 2px; }
    .side-card-half .side-card-title { font-size: 14px; }
    .side-card-half .side-card-subtitle { font-size: 11px; margin-top: 0; }

    @media (max-width: 1100px) {
      .hero-layout {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
      }
      .carousel-wrapper { grid-column: 1; grid-row: 1; }
      .hero-layout .side-cards { grid-column: 1; grid-row: 2; height: auto; flex-direction: row; }
      .hero-layout .dots-row { grid-column: 1; grid-row: 3; }
      .side-card { min-height: 150px; }
    }
    @media (max-width: 700px) {
      :host { padding: 8px 12px 0; }
      .hero-layout { grid-template-rows: 240px auto auto; }
      .carousel { height: 240px; }
      .slide { padding: 0 24px 32px; }
      .title { font-size: 20px; }
      .side-cards { flex-direction: column; }
      .side-card { min-height: 110px; }
    }
  `;

  constructor() {
    super();
    this.banners = DEFAULT_BANNERS;
    this.sideCards = DEFAULT_SIDE_CARDS;
    this._activeIndex = 0;
    this._autoplayTimer = null;
    this._pauseTimeout = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._startAutoplay();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAutoplay();
    clearTimeout(this._pauseTimeout);
  }

  get _slides() {
    return this.banners?.length ? this.banners : DEFAULT_BANNERS;
  }

  get _cards() {
    return this.sideCards?.length ? this.sideCards : DEFAULT_SIDE_CARDS;
  }

  _startAutoplay() {
    this._stopAutoplay();
    this._autoplayTimer = setInterval(() => this._next(), 6000);
  }

  _stopAutoplay() {
    if (this._autoplayTimer) { clearInterval(this._autoplayTimer); this._autoplayTimer = null; }
  }

  _restartAutoplayDelayed() {
    this._stopAutoplay();
    clearTimeout(this._pauseTimeout);
    this._pauseTimeout = setTimeout(() => this._startAutoplay(), 10000);
  }

  _next() { this._activeIndex = (this._activeIndex + 1) % this._slides.length; }
  _prev() { this._activeIndex = (this._activeIndex - 1 + this._slides.length) % this._slides.length; }

  _goTo(index) {
    if (index === this._activeIndex) return;
    this._activeIndex = index;
    this._restartAutoplayDelayed();
  }

  _onArrowClick(dir) {
    if (dir === 'next') this._next(); else this._prev();
    this._restartAutoplayDelayed();
  }

  _onBannerClick(banner) {
    if (banner.link_url) {
      this.dispatchEvent(new CustomEvent('banner-click', { detail: banner, bubbles: true, composed: true }));
    }
  }

  _renderSlide(banner, index) {
    const isActive = index === this._activeIndex;
    const hasImage = banner.image_url || banner.local_image;
    const imageSrc = banner.local_image || banner.image_url;
    return html`
      <div class="slide ${isActive ? 'active' : ''}" @click=${() => this._onBannerClick(banner)}>
        <div class="slide-bg">
          ${hasImage
            ? html`<ms-lazy-img eager src=${imageSrc} alt="" width="100%" height="100%" radius="0"></ms-lazy-img>`
            : html`<div class="gradient-fill" style="background: ${banner.gradient || 'linear-gradient(135deg, #1b2838, #2a475e)'}"></div>`}
        </div>
        <div class="slide-content">
          ${banner.badge_text ? html`<span class="badge">${banner.badge_text}</span>` : ''}
          <h2 class="title">${banner.title}</h2>
          <p class="subtitle">${banner.subtitle}</p>
          <button class="cta-btn" @click=${(e) => { e.stopPropagation(); this._onBannerClick(banner); }}>
            ${banner.button_text || '获取'}
          </button>
        </div>
      </div>
    `;
  }

  _renderSideCard(card) {
    if (card.type === 'split' && card.left && card.right) {
      return this._renderSplitCard(card.left, card.right);
    }
    const hasImage = card.image_url || card.local_image;
    const imageSrc = card.local_image || card.image_url;
    return html`
      <a class="side-card" href=${card.link_url || '#'} ?data-nav=${card.link_url?.startsWith('/')}
        rel=${card.link_url?.startsWith('/') ? '' : 'nofollow noopener'} ?target=${!card.link_url?.startsWith('/') ? '_blank' : ''}>
        <div class="side-card-bg">
          ${hasImage
            ? html`<ms-lazy-img eager src=${imageSrc} alt="" width="100%" height="100%" radius="0"></ms-lazy-img>`
            : html`<div class="gradient-fill" style="background: ${card.gradient || 'linear-gradient(135deg, #2d3436, #636e72)'}"></div>`}
        </div>
        <div class="side-card-overlay"></div>
        <div class="side-card-content">
          ${card.badge_text ? html`<span class="side-card-badge">${card.badge_text}</span>` : ''}
          <div class="side-card-title">${card.title}</div>
          ${card.subtitle ? html`<div class="side-card-subtitle">${card.subtitle}</div>` : ''}
        </div>
      </a>
    `;
  }

  _renderSplitCard(left, right) {
    const renderHalf = (half) => {
      const hasImage = half.image_url || half.local_image;
      const imageSrc = half.local_image || half.image_url;
      const href = half.link_url || '#';
      return html`
        <a class="side-card-half" href=${href} ?data-nav=${href.startsWith('/')}
          rel=${href.startsWith('/') ? '' : 'nofollow noopener'} ?target=${!href.startsWith('/') ? '_blank' : ''}>
          <div class="side-card-bg">
            ${hasImage
              ? html`<ms-lazy-img eager src=${imageSrc} alt="" width="100%" height="100%" radius="0"></ms-lazy-img>`
              : html`<div class="gradient-fill" style="background: ${half.gradient || 'linear-gradient(135deg, #2d3436, #636e72)'}"></div>`}
          </div>
          <div class="side-card-overlay"></div>
          <div class="side-card-content">
            ${half.badge_text ? html`<span class="side-card-badge">${half.badge_text}</span>` : ''}
            <div class="side-card-title">${half.title}</div>
            ${half.subtitle ? html`<div class="side-card-subtitle">${half.subtitle}</div>` : ''}
          </div>
        </a>
      `;
    };
    return html`
      <div class="side-card side-card-split">
        ${renderHalf(left)}
        ${renderHalf(right)}
      </div>
    `;
  }

  render() {
    const slides = this._slides;
    const cards = this._cards;
    return html`
      <div class="hero-layout">
        <div class="carousel-wrapper">
          <div class="carousel"
            @mouseenter=${() => this._stopAutoplay()}
            @mouseleave=${() => this._startAutoplay()}>
            <div class="slides">
              ${slides.map((b, i) => this._renderSlide(b, i))}
            </div>
            <button class="arrow left" @click=${() => this._onArrowClick('prev')} aria-label="上一张">
              <svg viewBox="0 0 16 16"><polyline points="10 3 5 8 10 13"/></svg>
            </button>
            <button class="arrow right" @click=${() => this._onArrowClick('next')} aria-label="下一张">
              <svg viewBox="0 0 16 16"><polyline points="6 3 11 8 6 13"/></svg>
            </button>
          </div>
        </div>
        <div class="side-cards">
          ${cards.map(card => this._renderSideCard(card))}
        </div>
        <div class="dots-row">
          <div class="dots">
            ${slides.map((_, i) => html`
              <button class="dot ${i === this._activeIndex ? 'active' : ''}" @click=${() => this._goTo(i)} aria-label="第 ${i + 1} 张"></button>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('ms-hero-carousel', MsHeroCarousel);
