import { LitElement, html, css } from 'lit';

class MsFeaturedRow extends LitElement {
  static properties = {
    banners: { type: Array }
  };

  static styles = css`
    :host {
      display: block;
      max-width: var(--ms-content-max-width, 1600px);
      margin: 0 auto;
      padding: 0 38px;
      box-sizing: border-box;
    }
    .section { margin-bottom: 28px; }
    .banner-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .banner-card {
      position: relative;
      height: 156px;
      border-radius: 8px;
      overflow: hidden;
      background: #f3f3f3;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      transition: box-shadow 0.2s;
    }
    .banner-card:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }
    .banner-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
    }
    .banner-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.02) 100%);
    }
    .banner-content {
      position: relative;
      z-index: 1;
      padding: 16px 20px;
    }
    .banner-badge {
      display: inline-block;
      font-size: 9px;
      font-weight: 700;
      color: #fff;
      background: #107c10;
      padding: 2px 6px;
      border-radius: 3px;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .banner-title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 3px;
      line-height: 1.25;
    }
    .banner-subtitle {
      font-size: 13px;
      color: rgba(255,255,255,0.8);
      margin: 0;
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    @media (max-width: 900px) {
      .banner-row { grid-template-columns: 1fr; }
      .banner-card { height: 140px; }
    }
    @media (max-width: 600px) {
      :host { padding: 0 12px; }
      .banner-card { height: 130px; }
    }
  `;

  constructor() {
    super();
    this.banners = [];
  }

  render() {
    return html`
      <div class="section">
        <div class="banner-row">
          ${(this.banners || []).map(banner => html`
            <a class="banner-card" href=${banner.link_url || '#'} ?data-nav=${!banner.link_url?.startsWith('http')}
              rel=${banner.link_url?.startsWith('http') ? 'nofollow noopener' : ''} ?target=${banner.link_url?.startsWith('http') ? '_blank' : ''}>
              ${(banner.image_url || banner.local_image) ? html`<div class="banner-bg" style="background-image: url('${banner.local_image || banner.image_url}')"></div>` : ''}
              <div class="banner-overlay"></div>
              <div class="banner-content">
                ${banner.badge_text ? html`<span class="banner-badge">${banner.badge_text}</span>` : ''}
                <h3 class="banner-title">${banner.title}</h3>
                ${banner.subtitle ? html`<p class="banner-subtitle">${banner.subtitle}</p>` : ''}
              </div>
            </a>
          `)}
        </div>
      </div>
    `;
  }
}
customElements.define('ms-featured-row', MsFeaturedRow);
