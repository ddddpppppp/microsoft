import { LitElement, html, css } from 'lit';
import './ms-lazy-img.js';

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
      box-sizing: border-box;
    }
    .section { margin-bottom: 32px; }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 600;
      font-family: var(--header-font);
      color: #1a1a1a;
      margin: 0;
    }
    .scroll-wrapper { position: relative; }
    .scroll-container {
      display: flex;
      gap: 12px;
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
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid #d1d1d1;
      background: #fff;
      color: #424242;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      opacity: 0;
      transition: opacity 0.2s, background 0.12s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .scroll-btn:hover { background: #f5f5f5; }
    .scroll-wrapper:hover .scroll-btn.visible { opacity: 1; }
    .scroll-btn.left { left: -4px; }
    .scroll-btn.right { right: -4px; }
    .card {
      flex-shrink: 0;
      width: 340px;
      height: 240px;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      text-decoration: none;
      color: inherit;
      transition: box-shadow 0.2s;
    }
    .card:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }
    .card-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      z-index: 1;
    }
    .card-gradient {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
    .card-gradient-0 { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); }
    .card-gradient-1 { background: linear-gradient(135deg, #2d1b4e 0%, #1a0a2e 50%, #0d0221 100%); }
    .card-gradient-2 { background: linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%); }
    .card-gradient-3 { background: linear-gradient(135deg, #5c4d7d 0%, #3d2c5e 50%, #2d1b4e 100%); }
    .card-gradient-4 { background: linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%); }
    .card-gradient-5 { background: linear-gradient(135deg, #3d0a0a 0%, #6b2d2d 50%, #8b3a3a 100%); }
    .card-content {
      position: relative;
      z-index: 2;
      padding: 12px 14px;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
    }
    .card-name {
      font-size: 13px;
      font-weight: 600;
      font-family: var(--header-font);
      color: #fff;
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-subtitle {
      font-size: 11px;
      color: rgba(255,255,255,0.75);
      margin-top: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (max-width: 600px) {
      :host { padding: 0 12px; }
      .card { width: 200px; height: 116px; }
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

  _getGradientClass(index) {
    return `card-gradient-${index % 6}`;
  }

  render() {
    return html`
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">${this.title}</h2>
        </div>
        <div class="scroll-wrapper">
          <button class="scroll-btn left ${this._showLeftArrow ? 'visible' : ''}" @click=${() => this._scroll('left')} aria-label="向左滚动">&#8249;</button>
          <div class="scroll-container" @scroll=${this._onScroll}>
            ${(this.cards || []).map((card, i) => html`
              <a class="card" href=${card.link_url || '#'} ?data-nav=${!(card.link_url || '').startsWith('http')}
                rel=${(card.link_url || '').startsWith('http') ? 'nofollow noopener' : ''} ?target=${(card.link_url || '').startsWith('http') ? '_blank' : ''}>
                ${card.image_url ? html`<ms-lazy-img class="card-bg" src=${card.image_url} alt="" width="100%" height="100%" radius="0" style="position:absolute;inset:0;z-index:1;"></ms-lazy-img>` : ''}
                <div class="card-gradient ${this._getGradientClass(i)}"></div>
                <div class="card-content">
                  <div class="card-name">${card.name}</div>
                  ${card.subtitle ? html`<div class="card-subtitle">${card.subtitle}</div>` : ''}
                </div>
              </a>
            `)}
          </div>
          <button class="scroll-btn right ${this._showRightArrow ? 'visible' : ''}" @click=${() => this._scroll('right')} aria-label="向右滚动">&#8250;</button>
        </div>
      </div>
    `;
  }
}
customElements.define('ms-collection-cards', MsCollectionCards);
