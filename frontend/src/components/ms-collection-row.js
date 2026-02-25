import { LitElement, html, css } from 'lit';
import './ms-product-card.js';
import './ms-product-hero.js';

class MsCollectionRow extends LitElement {
  static properties = {
    title: { type: String },
    viewAllUrl: { type: String },
    products: { type: Array },
    variant: { type: String },
    sectionType: { type: String },
    _showLeftArrow: { type: Boolean, state: true },
    _showRightArrow: { type: Boolean, state: true }
  };

  static styles = css`
    :host {
      display: block;
      max-width: 1600px;
      margin: 0 auto;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .section { margin-bottom: 32px; }

    /* Section header */
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      padding: 0;
    }
    .section-title-area {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #1a1a1a;
      margin: 0;
    }
    .title-chevron {
      font-size: 18px;
      color: #1a1a1a;
      margin-left: 2px;
      cursor: pointer;
    }
    .section-title-link {
      display: flex;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }
    .section-title-link:hover .section-title {
      text-decoration: underline;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .view-all-link {
      font-size: 13px;
      font-weight: 600;
      color: #0067b8;
      text-decoration: none;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .view-all-link:hover { text-decoration: underline; }

    /* Nav arrows */
    .nav-arrows {
      display: flex;
      gap: 6px;
    }
    .scroll-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid #d1d1d1;
      background: #fff;
      color: #424242;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.12s, border-color 0.12s;
      padding: 0;
    }
    .scroll-btn:hover {
      background: #f5f5f5;
      border-color: #999;
    }
    .scroll-btn:disabled {
      opacity: 0.3;
      cursor: default;
    }
    .scroll-btn svg {
      width: 12px;
      height: 12px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Scroll container */
    .scroll-wrapper { position: relative; }
    .scroll-container {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 4px 0 8px;
    }
    .scroll-container::-webkit-scrollbar { display: none; }
  `;

  constructor() {
    super();
    this.title = '';
    this.viewAllUrl = '';
    this.products = [];
    this.variant = 'default';
    this.sectionType = '';
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

  _renderCard(product) {
    if (this.variant === 'hero') {
      return html`<ms-product-hero .product=${product}></ms-product-hero>`;
    }
    return html`<ms-product-card .product=${product}></ms-product-card>`;
  }

  render() {
    return html`
      <div class="section">
        <div class="section-header">
          <div class="section-title-area">
            <a class="section-title-link" href=${this.viewAllUrl || '#'} data-nav>
              <h2 class="section-title">${this.title}</h2>
              <span class="title-chevron">&#8250;</span>
            </a>
          </div>
          <div class="header-right">
            <div class="nav-arrows">
              <button class="scroll-btn" ?disabled=${!this._showLeftArrow} @click=${() => this._scroll('left')} aria-label="向左滚动">
                <svg viewBox="0 0 16 16"><polyline points="10 3 5 8 10 13"/></svg>
              </button>
              <button class="scroll-btn" ?disabled=${!this._showRightArrow} @click=${() => this._scroll('right')} aria-label="向右滚动">
                <svg viewBox="0 0 16 16"><polyline points="6 3 11 8 6 13"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="scroll-wrapper">
          <div class="scroll-container" @scroll=${this._onScroll}>
            ${(this.products || []).map(p => this._renderCard(p))}
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('ms-collection-row', MsCollectionRow);
