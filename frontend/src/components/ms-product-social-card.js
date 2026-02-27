import { LitElement, html, css } from 'lit';
import './ms-lazy-img.js';

/**
 * 社交網路應用程式 卡片：上为扒拉入库的背景图（social_card_image），下为白底弧线区仅小图标+标题，与参考图布局一致。
 */
class MsProductSocialCard extends LitElement {
  static properties = {
    product: { type: Object }
  };

  static styles = css`
    :host {
      display: block;
      min-width: 260px;
      width: 260px;
      flex-shrink: 0;
    }
    a.card {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: inherit;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: box-shadow 0.2s ease;
      overflow: visible;
      height: 320px;
    }
    a.card:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    }

    /* 上：背景图约 70% */
    .screenshot-wrap {
      position: relative;
      width: 100%;
      flex: 0 0 70%;
      background: #e8e8e8;
      overflow: hidden;
      border-radius: 12px 12px 0 0;
    }
    .screenshot-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* 下：白底弧线区约 30%，仅小图标 + 标题 */
    .info {
      flex: 0 0 30%;
      min-height: 0;
      background: #fff;
      border-radius: 24px 24px 0 0;
      margin-top: -20px;
      position: relative;
      z-index: 1;
      padding: 14px 16px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 -1px 0 0 rgba(0,0,0,0.04);
    }
    .logo {
      width: 40px;
      height: 40px;
      min-width: 40px;
      border-radius: 10px;
      object-fit: cover;
      background: #f0f0f0;
    }
    .title-wrap {
      min-width: 0;
      flex: 1;
    }
    .title {
      font-size: 15px;
      font-weight: 600;
      color: #1a1a1a;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 0;
    }
  `;

  constructor() {
    super();
    this.product = {};
  }

  /** 优先使用扒拉入库的 social_card_image，其次首张截图/封面，再次 icon */
  _getBackgroundImage() {
    const p = this.product;
    if (!p) return '';
    if (p.social_card_image) return p.social_card_image;
    if (p.cover_url) return p.cover_url;
    if (p.screenshots) {
      try {
        const arr = typeof p.screenshots === 'string' ? JSON.parse(p.screenshots) : p.screenshots;
        if (Array.isArray(arr) && arr[0]) return typeof arr[0] === 'string' ? arr[0] : (arr[0].url || '');
      } catch (_) {}
    }
    return p.local_icon || p.icon_url || '';
  }

  _getIcon() {
    const p = this.product;
    if (!p) return '';
    return p.local_icon || p.icon_url || '';
  }

  _getHref() {
    const p = this.product;
    if (!p) return '#'; 
    if (p.is_own_product && p.custom_url) return p.custom_url;
    if (p.original_url) return p.original_url;
    if (p.product_id || p.ms_id || p.id) return '/detail/' + (p.product_id || p.ms_id || p.id);
    return '#';
  }

  _onClick(e) {
    const href = this._getHref();
    if (href.startsWith('/')) {
      e.preventDefault();
      window.msApp?.navigate(href);
    }
  }

  render() {
    const p = this.product || {};
    const bgImg = this._getBackgroundImage();
    const icon = this._getIcon();
    const href = this._getHref();
    const useNav = href.startsWith('/');

    return html`
      <a class="card" href=${href} ?data-nav=${useNav} @click=${this._onClick}
        rel=${useNav ? '' : 'nofollow noopener'} ?target=${!useNav ? '_blank' : ''}>
        <div class="screenshot-wrap">
          ${bgImg ? html`<ms-lazy-img src=${bgImg} alt="" width="100%" height="100%" radius="0"></ms-lazy-img>` : ''}
        </div>
        <div class="info">
          ${icon ? html`<ms-lazy-img class="logo" src=${icon} alt="" width="40px" height="40px" radius="10px"></ms-lazy-img>` : ''}
          <div class="title-wrap">
            <h3 class="title">${p.title || ''}</h3>
          </div>
        </div>
      </a>
    `;
  }
}
customElements.define('ms-product-social-card', MsProductSocialCard);
