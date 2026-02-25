import { LitElement, html, css } from 'lit';

class MsCollectionCards extends LitElement {
  static properties = {
    title: { type: String },
    viewAllUrl: { type: String },
    cards: { type: Array },
    _showLeftArrow: { type: Boolean, state: true },
    _showRightArrow: { type: Boolean, state: true }
  };

  static styles = css`
    :host {
      display: block;
      max-width: 1600px;
      margin: 0 auto;
      padding: 0 40px;
      box-sizing: border-box;
    }
    .section { margin-bottom: 40px; }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      padding: 0 2px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #131316;
      margin: 0;
    }
    .scroll-wrapper { position: relative; }
    .scroll-container {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 4px 0 8px;
    }
    .scroll-container::-webkit-scrollbar { display: none; }
    .scroll-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid #d1d1d1;
      background: #fff;
      color: #131316;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      opacity: 0;
      transition: opacity 0.2s, background 0.15s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .scroll-btn:hover { background: #f3f3f3; }
    .scroll-wrapper:hover .scroll-btn.visible { opacity: 1; }
    .scroll-btn.left { left: -4px; }
    .scroll-btn.right { right: -4px; }
    .card {
      flex-shrink: 0;
      width: 220px;
      height: 140px;
      background: #1a1a1a;
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      text-decoration: none;
      color: inherit;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .card:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }
    .card-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      opacity: 0.85;
    }
    .card-content {
      position: relative;
      z-index: 1;
      padding: 14px 16px;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
    }
    .card-name {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-subtitle {
      font-size: 12px;
      color: rgba(255,255,255,0.8);
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (max-width: 600px) {
      :host { padding: 0 16px; }
      .card { width: 160px; height: 100px; }
    }
  `;

  constructor() {
    super();
    this.title = 'Collections';
    this.viewAllUrl = '';
    this.cards = [];
    this._showLeftArrow = false;
    this._showRightArrow = true;
  }

  firstUpdated() { this._updateArrows(); }

  _getScrollContainer() {
    return this.renderRoot.querySelector('.scroll-container');
  }

  _updateArrows() {
    const el = this._getScrollContainer();
    if (!el) return;
    this._showLeftArrow = el.scrollLeft > 10;
    this._showRightArrow = el.scrollLeft < el.scrollWidth - el.clientWidth - 10;
  }

  _scroll(direction) {
    const el = this._getScrollContainer();
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    setTimeout(() => this._updateArrows(), 350);
  }

  _onScroll() { this._updateArrows(); }

  render() {
    return html`
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">${this.title}</h2>
        </div>
        <div class="scroll-wrapper">
          <button class="scroll-btn left ${this._showLeftArrow ? 'visible' : ''}" @click=${() => this._scroll('left')} aria-label="向左滚动">‹</button>
          <div class="scroll-container" @scroll=${this._onScroll}>
            ${(this.cards || []).map(card => html`
              <a class="card" href=${card.link_url || '#'} ${card.link_url?.startsWith('http') ? html`` : html`data-nav`}>
                ${card.image_url ? html`<div class="card-bg" style="background-image: url('${card.image_url}')"></div>` : ''}
                <div class="card-content">
                  <div class="card-name">${card.name}</div>
                  ${card.subtitle ? html`<div class="card-subtitle">${card.subtitle}</div>` : ''}
                </div>
              </a>
            `)}
          </div>
          <button class="scroll-btn right ${this._showRightArrow ? 'visible' : ''}" @click=${() => this._scroll('right')} aria-label="向右滚动">›</button>
        </div>
      </div>
    `;
  }
}
customElements.define('ms-collection-cards', MsCollectionCards);
