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
    _showRightArrow: { type: Boolean, state: true },
    _hovering: { type: Boolean, state: true }
  };

  static styles = css`
    :host {
      display: block;
      max-width: 1600px;
      margin: 0 auto;
      padding: 0 40px;
      box-sizing: border-box;
    }
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      padding: 0 2px;
    }
    .section-title-link {
      display: flex;
      align-items: center;
      gap: 4px;
      text-decoration: none;
      color: inherit;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .section-title-link {
      font-size: 14px;
      font-weight: 600;
      color: #0067b8;
    }
    .section-title-link:hover { text-decoration: underline; }
    .section-title {
      font-size: 20px;
      font-weight: 600;
      color: #131316;
      margin: 0;
    }
    .title-arrow {
      font-size: 16px;
      font-weight: 600;
      color: #131316;
    }
    .nav-arrows {
      display: flex;
      gap: 8px;
    }
    .scroll-wrapper { position: relative; }
    .scroll-container {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 8px 0 16px;
    }
    .scroll-container::-webkit-scrollbar { display: none; }
    .scroll-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid #d1d1d1;
      background: #fff;
      color: #131316;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, border-color 0.15s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .scroll-btn:hover {
      background: #f3f3f3;
      border-color: #b0b0b0;
    }
    .scroll-btn:disabled {
      opacity: 0.4;
      cursor: default;
    }
    .section { margin-bottom: 40px; }
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
    this._hovering = false;
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
          <h2 class="section-title">${this.title}</h2>
          <div class="header-right">
            <a class="section-title-link" href=${this.viewAllUrl || '#'} data-nav>查看全部 <span class="title-arrow">›</span></a>
            <div class="nav-arrows">
            <button class="scroll-btn" ?disabled=${!this._showLeftArrow} @click=${() => this._scroll('left')} aria-label="向左滚动">‹</button>
            <button class="scroll-btn" ?disabled=${!this._showRightArrow} @click=${() => this._scroll('right')} aria-label="向右滚动">›</button>
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
