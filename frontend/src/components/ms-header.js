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
      background: #fff;
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      border-bottom: 1px solid #e5e5e5;
    }
    nav {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 1600px;
      margin: 0 auto;
    }
    /* Logo area: Microsoft logo | Store */
    .logo-area {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      gap: 0;
      margin-right: 4px;
    }
    .logo-area a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
    }
    .ms-logo {
      height: 18px;
      display: block;
    }
    .separator {
      width: 1px;
      height: 16px;
      background: #c8c8c8;
      margin: 0 12px;
      flex-shrink: 0;
    }
    .store-text {
      font-size: 15px;
      font-weight: 600;
      color: #131316;
      white-space: nowrap;
      line-height: 1;
    }

    /* Nav links */
    .nav-links {
      display: flex;
      gap: 0;
      margin-left: 12px;
      flex-shrink: 0;
    }
    .nav-links a {
      position: relative;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 13px;
      color: #424242;
      cursor: pointer;
      white-space: nowrap;
      font-weight: 400;
      transition: background 0.12s;
      line-height: 1.5;
      text-decoration: none;
    }
    .nav-links a:hover {
      background: #f5f5f5;
      color: #131316;
    }
    .nav-links a.active {
      font-weight: 600;
      color: #131316;
    }
    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 12px;
      right: 12px;
      height: 2px;
      background: #0067b8;
      border-radius: 1px;
    }

    /* Search */
    .search-area {
      flex: 1;
      display: flex;
      justify-content: center;
      max-width: 468px;
      margin: 0 20px;
      position: relative;
    }
    .search-icon {
      position: absolute;
      left: 10px;
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
      padding: 5px 12px 5px 32px;
      color: #131316;
      font-size: 14px;
      font-family: 'Segoe UI', sans-serif;
      outline: none;
      transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
      line-height: 1.4;
    }
    .search-box:focus {
      border-color: #0067b8;
      background: #fff;
      box-shadow: 0 0 0 1px #0067b8;
    }
    .search-box::placeholder {
      color: #868686;
      font-size: 13px;
    }

    /* Right area */
    .right-area {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-left: auto;
      flex-shrink: 0;
    }
    .right-link {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #424242;
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 4px;
      white-space: nowrap;
      text-decoration: none;
      transition: background 0.12s;
      line-height: 1;
    }
    .right-link:hover {
      background: #f5f5f5;
      color: #131316;
    }
    .right-link svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
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
      margin-left: 2px;
    }
    .user-btn:hover {
      background: #f5f5f5;
    }
    .user-btn svg {
      width: 20px;
      height: 20px;
      color: #424242;
    }
  `;

  constructor() {
    super();
    this.currentRoute = 'home';
  }

  _isActive(route) {
    return this.currentRoute === route ? 'active' : '';
  }

  render() {
    return html`
      <header>
        <nav>
          <div class="logo-area">
            <a href="https://microsoft.com/" target="_blank" rel="noopener">
              <img class="ms-logo" src="/assets/icons/microsoft-logo-light-1.svg" alt="Microsoft" />
            </a>
            <span class="separator"></span>
            <a href="/" data-nav>
              <span class="store-text">Store</span>
            </a>
          </div>

          <div class="nav-links">
            <a href="/" data-nav class=${this._isActive('home')}>主页</a>
            <a href="/apps" data-nav class=${this._isActive('apps')}>应用</a>
            <a href="/games" data-nav class=${this._isActive('games')}>游戏</a>
            <a href="/about" data-nav class=${this._isActive('about')}>关于</a>
          </div>

          <div class="search-area">
            <svg class="search-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 3a5.5 5.5 0 014.383 8.823l4.147 4.147a.75.75 0 01-1.06 1.06l-4.147-4.147A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z" fill="currentColor"/>
            </svg>
            <input type="text" class="search-box" placeholder="搜索应用、游戏等" />
          </div>

          <div class="right-area">
            <a href="https://apps.microsoft.com/apppack" target="_blank" class="right-link" rel="noopener">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M1 1h6v6H1V1zm1 1v4h4V2H2zm7-1h6v6H9V1zm1 1v4h4V2h-4zM1 9h6v6H1V9zm1 1v4h4v-4H2zm7-1h6v6H9V9zm1 1v4h4v-4h-4z"/>
              </svg>
              多应用安装
            </a>
            <a href="https://login.live.com/" target="_blank" class="right-link" rel="noopener">
              登录
            </a>
            <a href="https://login.live.com/" target="_blank" class="user-btn" title="登录" aria-label="登录" rel="noopener">
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
