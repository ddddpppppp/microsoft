import { LitElement, html, css } from 'lit';

class MsFeaturedRow extends LitElement {
  static properties = {
    banners: { type: Array }
  };

  static styles = css`
    :host {
      display: block;
      max-width: 1600px;
      margin: 0 auto;
      padding: 0 24px;
      box-sizing: border-box;
    }
    .section { margin-bottom: 32px; }
    .banner-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .banner-card {
      position: relative;
      height: 180px;
      border-radius: 12px;
      overflow: hidden;
      background: #f3f3f3;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .banner-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
    .banner-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      transition: transform 0.3s;
    }
    .banner-card:hover .banner-bg { transform: scale(1.03); }
    .banner-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%);
    }
    .banner-content {
      position: relative;
      z-index: 1;
      padding: 20px 24px;
    }
    .banner-badge {
      display: inline-block;
      font-size: 10px;
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
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 4px;
      line-height: 1.3;
    }
    .banner-subtitle {
      font-size: 14px;
      color: rgba(255,255,255,0.85);
      margin: 0 0 12px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .banner-btn {
      display: inline-flex;
      align-items: center;
      padding: 6px 16px;
      border-radius: 20px;
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.25);
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.15s;
      text-decoration: none;
    }
    .banner-btn:hover { background: rgba(255,255,255,0.25); }
    @media (max-width: 900px) {
      .banner-row { grid-template-columns: 1fr; }
      .banner-card { height: 160px; }
    }
    @media (max-width: 600px) {
      :host { padding: 0 16px; }
      .banner-card { height: 140px; }
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
            <a class="banner-card" href=${banner.link_url || '#'} ${banner.link_url?.startsWith('http') ? html`` : html`data-nav`}>
              ${(banner.image_url || banner.local_image) ? html`<div class="banner-bg" style="background-image: url('${banner.local_image || banner.image_url}')"></div>` : ''}
              <div class="banner-overlay"></div>
              <div class="banner-content">
                ${banner.badge_text ? html`<span class="banner-badge">${banner.badge_text}</span>` : ''}
                <h3 class="banner-title">${banner.title}</h3>
                ${banner.subtitle ? html`<p class="banner-subtitle">${banner.subtitle}</p>` : ''}
                ${banner.button_text ? html`<span class="banner-btn">${banner.button_text}</span>` : ''}
              </div>
            </a>
          `)}
        </div>
      </div>
    `;
  }
}
customElements.define('ms-featured-row', MsFeaturedRow);
