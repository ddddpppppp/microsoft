import { LitElement, html, css } from 'lit';

class MsHeader extends LitElement {
  static properties = {
    currentRoute: { type: String }
  };

  static styles = css`
    :host { display: block; position: sticky; top: 0; z-index: 1000; }
    header {
      background: #fff;
      height: 48px;
      display: flex;
      align-items: center;
      padding: 0 24px;
      border-bottom: 1px solid #e5e5e5;
    }
    nav {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 1600px;
      margin: 0 auto;
      gap: 8px;
    }
    .logo-area {
      display: flex;
      align-items: center;
      gap: 0;
      flex-shrink: 0;
    }
    .logo-area a {
      display: flex;
      align-items: center;
    }
    .logo-area img { height: 20px; }
    .separator {
      width: 1px;
      height: 16px;
      background: #d1d1d1;
      margin: 0 12px;
      flex-shrink: 0;
    }
    .nav-links {
      display: flex;
      gap: 0;
      margin-left: 8px;
      flex-shrink: 0;
    }
    .nav-links a {
      padding: 6px 14px;
      border-radius: 4px;
      font-size: 13px;
      color: #131316;
      cursor: pointer;
      white-space: nowrap;
      font-weight: 400;
      transition: background 0.15s;
    }
    .nav-links a:hover { background: #f3f3f3; }
    .nav-links a.active {
      font-weight: 600;
      position: relative;
    }
    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 14px;
      right: 14px;
      height: 2px;
      background: #0067b8;
      border-radius: 1px;
    }
    .search-area {
      flex: 1;
      display: flex;
      justify-content: center;
      max-width: 400px;
      margin: 0 24px;
      position: relative;
    }
    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 14px;
      height: 14px;
      color: #616161;
      pointer-events: none;
    }
    .search-box {
      width: 100%;
      background: #f5f5f5;
      border: 1px solid transparent;
      border-radius: 4px;
      padding: 6px 12px 6px 34px;
      color: #131316;
      font-size: 14px;
      outline: none;
      transition: border-color 0.15s, background 0.15s;
    }
    .search-box:focus { 
      border-color: #0067b8; 
      background: #fff;
    }
    .search-box::placeholder { color: #767676; }
    .right-area {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-left: auto;
      flex-shrink: 0;
    }
    .right-area a, .right-area button {
      font-size: 13px;
      color: #131316;
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px 12px;
      border-radius: 4px;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: background 0.15s;
    }
    .right-area a:hover, .right-area button:hover { background: #f3f3f3; }
    .icon-btn {
      width: 20px;
      height: 20px;
      color: #131316;
    }
    .right-area .icon-only {
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .user-icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #f3f3f3;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.15s;
    }
    .user-icon:hover { background: #e5e5e5; }
    .user-icon svg {
      width: 16px;
      height: 16px;
      color: #616161;
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
            <a href="https://microsoft.com/" target="_blank">
              <img src="/assets/icons/microsoft-logo-light-1.svg" alt="Microsoft" />
            </a>
            <span class="separator"></span>
            <a href="/" data-nav>
              <img src="/assets/icons/microsoft-logo-light-2.svg" alt="Store" />
            </a>
          </div>
          <div class="nav-links">
            <a href="/" data-nav class=${this._isActive('home')}>主页</a>
            <a href="/apps" data-nav class=${this._isActive('apps')}>应用</a>
            <a href="/games" data-nav class=${this._isActive('games')}>游戏</a>
            <a href="/about" data-nav class=${this._isActive('about')}>关于</a>
          </div>
          <div class="search-area">
            <svg class="search-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="7" cy="7" r="5.5"/>
              <line x1="11" y1="11" x2="14.5" y2="14.5"/>
            </svg>
            <input type="text" class="search-box" placeholder="搜索" />
          </div>
          <div class="right-area">
            <a href="#" class="icon-only" title="购物车" aria-label="购物车">
              <svg class="icon-btn" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M2 2h2l2 8h8l1.5-6H5.5"/>
                <circle cx="6" cy="14" r="1.5"/>
                <circle cx="12" cy="14" r="1.5"/>
              </svg>
            </a>
            <a href="https://login.live.com/" target="_blank" class="icon-only" title="登录" aria-label="登录">
              <div class="user-icon">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1a3 3 0 110 6 3 3 0 010-6zM3 13c0-2.8 2.2-5 5-5s5 2.2 5 5H3z"/>
                </svg>
              </div>
            </a>
            <button type="button" class="icon-only" title="更多" aria-label="更多">
              <svg class="icon-btn" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="3" r="1.5"/>
                <circle cx="8" cy="8" r="1.5"/>
                <circle cx="8" cy="13" r="1.5"/>
              </svg>
            </button>
          </div>
        </nav>
      </header>
    `;
  }
}
customElements.define('ms-header', MsHeader);
