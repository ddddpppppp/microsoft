import { LitElement, html, css } from 'lit';

class MsHeader extends LitElement {
  static properties = {
    currentRoute: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    header {
      background-color: var(--theme-header-background-color, #fff);
    }
    header.sticky {
      box-shadow: rgba(0,0,0,0.14) 0px 4px 5px 0px, rgba(0,0,0,0.12) 0px 1px 10px 0px, rgba(0,0,0,0.2) 0px 2px 4px -1px;
    }
    nav {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: var(--ms-content-max-width, 1600px);
      margin: 0 auto;
      padding: 0 38px;
      box-sizing: border-box;
    }

    .home-logo-link {
      display: flex;
      padding: 16px 0;
      flex-shrink: 0;
      align-items: center;
    }
    .home-logo-link a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
    }
    .msft-logo {
      width: 120px;
      height: 36px;
      display: block;
    }
    .store-logo {
      width: 54px;
      height: 36px;
      display: block;
    }

    .nav-tabs {
      display: flex;
      align-items: center;
      align-self: center;
      position: relative;
      gap: 0;
    }
    .nav-tabs-indicator {
      position: absolute;
      bottom: -8px;
      height: 2px;
      background: var(--theme-primary-element-color, #005FB8);
      border-radius: 1px;
      transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }
    .nav-tabs a {
      position: relative;
      padding: 4px 20px;
      font-size: var(--sl-font-size-small, 0.875rem);
      font-weight: 600;
      color: var(--ms-text-secondary, #616161);
      cursor: pointer;
      white-space: nowrap;
      transition: color 0.15s;
      line-height: 1.5;
      text-decoration: none;
      font-family: var(--header-font);
    }
    .nav-tabs a:hover {
      color: var(--theme-primary-element-color, #005FB8);
    }
    .nav-tabs a.active {
      color: hsl(210 100% 22%);
    }

    .search-area {
      flex: 1;
      display: flex;
      align-self: center;
      justify-content: center;
      width: 600px;
      margin: 0 28px;
      position: relative;
    }
    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      color: #616161;
      pointer-events: none;
    }
    .search-box {
      width: 100%;
      background: #f5f5f5;
      border: 1px solid #d1d1d1;
      border-radius: 4px;
      padding: 6px 14px 6px 36px;
      color: var(--theme-font-color, #131316);
      font-size: 14px;
      font-family: var(--header-font);
      outline: none;
      transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
      line-height: 1.4;
    }
    .search-box:focus {
      border-color: var(--theme-primary-element-color, #005FB8);
      background: #fff;
      box-shadow: 0 0 0 1px var(--theme-primary-element-color, #005FB8);
    }
    .search-box::placeholder {
      color: #868686;
      font-size: 14px;
    }

    .right-elements {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      margin-left: auto;
    }
    .multi-app-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0 14px;
      height: 32px;
      border-radius: 24px;
      background-color: rgb(228, 241, 255);
      color: var(--theme-primary-element-color, #005FB8);
      font-size: 12px;
      font-weight: 400;
      border: 1px solid transparent;
      cursor: pointer;
      text-decoration: none;
      white-space: nowrap;
      transition: border 0.2s ease-out;
      font-family: var(--header-font);
    }
    .multi-app-btn:hover {
      border: 1px solid rgb(0, 95, 184);
    }
    .multi-app-btn svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
    .sign-in-btn {
      display: inline-flex;
      align-items: center;
      font-size: 13px;
      color: var(--ms-text-secondary, #616161);
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px 8px;
      border-radius: 4px;
      white-space: nowrap;
      text-decoration: none;
      transition: color 0.15s;
      font-family: var(--header-font);
    }
    .sign-in-btn:hover {
      color: var(--theme-font-color);
    }
    .user-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: none;
      border: none;
      cursor: pointer;
      transition: background 0.12s;
      padding: 0;
    }
    .user-btn:hover {
      background: #f5f5f5;
    }
    .user-btn svg {
      width: 20px;
      height: 20px;
      color: #424242;
    }

    @media (max-width: 1299px) {
      .multi-app-btn .label { display: none; }
      .multi-app-btn {
        width: 32px;
        min-width: auto;
        border-radius: 50%;
        padding: 0;
        justify-content: center;
        aspect-ratio: 1/1;
      }
    }
    @media (max-width: 1145px) {
      .search-area { max-width: 400px; margin: 0 16px; }
    }
    @media (max-width: 911px) {
      nav { flex-wrap: wrap; min-height: 96px; }
      .nav-tabs { order: 3; width: 100%; justify-content: center; padding-bottom: 4px; }
      .search-area { order: 2; flex: 0 1 auto; }
    }
    @media (max-width: 575px) {
      .home-logo-link { width: auto; padding: 12px; }
      .nav-tabs a { padding: 4px 16px; font-size: var(--sl-font-size-x-small, 0.75rem); }
      .sign-in-btn .sign-text { display: none; }
    }
  `;

  constructor() {
    super();
    this.currentRoute = 'home';
  }

  _isActive(route) {
    if (route === 'articles' && (this.currentRoute === 'articles' || this.currentRoute === 'article-detail')) {
      return 'active';
    }
    return this.currentRoute === route ? 'active' : '';
  }

  firstUpdated() {
    this._updateIndicator();
  }

  updated(changed) {
    if (changed.has('currentRoute')) {
      this._updateIndicator();
    }
  }

  _updateIndicator() {
    requestAnimationFrame(() => {
      const tabs = this.shadowRoot?.querySelector('.nav-tabs');
      const active = tabs?.querySelector('a.active');
      const indicator = tabs?.querySelector('.nav-tabs-indicator');
      if (!tabs || !active || !indicator) return;

      const tabsRect = tabs.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      const paddingLeft = 20;
      const paddingRight = 20;

      indicator.style.left = `${activeRect.left - tabsRect.left + paddingLeft}px`;
      indicator.style.width = `${activeRect.width - paddingLeft - paddingRight}px`;
    });
  }

  render() {
    return html`
      <header>
        <nav>
          <div class="home-logo-link">
            <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Microsoft">
              <img class="msft-logo" src="/assets/icons/microsoft-logo-dark-1.png" alt="Microsoft" />
            </a>
            <a href="/" data-nav aria-label="Microsoft Store">
              <img class="store-logo" src="/assets/icons/microsoft-logo-dark-2.png" alt="Store" />
            </a>
          </div>

          <div class="nav-tabs">
            <a href="/" data-nav class=${this._isActive('home')}>主页</a>
            <a href="/apps" data-nav class=${this._isActive('apps')}>应用</a>
            <a href="/games" data-nav class=${this._isActive('games')}>游戏</a>
            <a href="/articles" data-nav class=${this._isActive('articles')}>资讯</a>
            <a href="/about" data-nav class=${this._isActive('about')}>关于</a>
            <div class="nav-tabs-indicator"></div>
          </div>

          <div class="right-elements">
            <div class="search-area">
              <svg class="search-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 3a5.5 5.5 0 014.383 8.823l4.147 4.147a.75.75 0 01-1.06 1.06l-4.147-4.147A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z" fill="currentColor"/>
              </svg>
              <input type="text" class="search-box" placeholder="搜索应用、游戏等" />
            </div>
            <a href="https://apps.microsoft.com/apppack" target="_blank" class="multi-app-btn" rel="nofollow noopener">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M1 1h6v6H1V1zm1 1v4h4V2H2zm7-1h6v6H9V1zm1 1v4h4V2h-4zM1 9h6v6H1V9zm1 1v4h4v-4H2zm7-1h6v6H9V9zm1 1v4h4v-4h-4z"/>
              </svg>
              <span class="label">多应用安装</span>
            </a>
            <a href="https://login.live.com/" target="_blank" class="sign-in-btn" rel="nofollow noopener">
              <span class="sign-text">登录</span>
            </a>
            <a href="https://login.live.com/" target="_blank" class="user-btn" title="登录" aria-label="登录" rel="nofollow noopener">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a4 4 0 110 8 4 4 0 010-8zm0 1.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.25 16.5a5.75 5.75 0 0111.5 0 .75.75 0 01-1.5 0 4.25 4.25 0 00-8.5 0 .75.75 0 01-1.5 0z"/>
              </svg>
            </a>
          </div>
        </nav>
      </header>
    `;
  }
}
customElements.define('ms-header', MsHeader);
