import { LitElement, html, css } from 'lit';

class MsHeader extends LitElement {
  static properties = {
    currentRoute: { type: String },
    _searchResults: { state: true },
    _searchOpen: { state: true },
    _searchLoading: { state: true },
    _menuOpen: { type: Boolean, state: true },
    _searchExpanded: { type: Boolean, state: true },
  };

  static styles = css`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1000;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      background-color: var(--theme-header-background-color, #fff);
      overflow-x: clip;
      overflow-y: visible;
    }
    header {
      background-color: var(--theme-header-background-color, #fff);
      width: 100%;
      max-width: 100%;
      border-bottom: 1px solid rgba(0,0,0,0.06);
      overflow: visible;
    }
    header.sticky {
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    nav {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      max-width: var(--ms-content-max-width, 1600px);
      margin: 0 auto;
      padding: 0 38px;
      box-sizing: border-box;
      min-width: 0;
    }
    .home-logo-link { order: 1; }
    .nav-tabs { order: 2; }
    .search-area { order: 3; }
    .right-elements { order: 4; }
    @media (max-width: 900px) {
      nav { padding: 0 24px; }
      .nav-tabs { order: 3; }
      .search-area { order: 2; }
    }
    @media (max-width: 600px) {
      nav { padding: 0 0 0 16px; max-width: 100%; }
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
      min-width: 0;
      width: 600px;
      max-width: 100%;
      margin: 0 28px;
      position: relative;
    }
    .search-inline {
      display: flex;
      position: relative;
      flex: 1;
      min-width: 0;
      width: 100%;
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

    .search-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 8px 32px rgba(0,0,0,.12);
      z-index: 100;
      max-height: 420px;
      overflow-y: auto;
    }
    .search-result-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      text-decoration: none;
      color: inherit;
      transition: background .12s;
      cursor: pointer;
    }
    .search-result-item:hover { background: #f5f5f5; }
    .search-result-item:first-child { border-radius: 8px 8px 0 0; }
    .search-result-item:last-child { border-radius: 0 0 8px 8px; }
    .sr-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      object-fit: cover;
      flex-shrink: 0;
      background: #f5f5f5;
    }
    .sr-info { flex: 1; min-width: 0; }
    .sr-title {
      font-size: 13px;
      font-weight: 500;
      color: #131316;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
    }
    .sr-meta {
      font-size: 11.5px;
      color: #767676;
      line-height: 1.3;
      margin-top: 1px;
    }
    .sr-price {
      font-size: 12px;
      color: #0067b8;
      font-weight: 500;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .sr-empty, .sr-loading {
      padding: 20px 16px;
      text-align: center;
      color: #767676;
      font-size: 13px;
    }
    .sr-loading-spinner {
      display: inline-block;
      width: 16px; height: 16px;
      border: 2px solid #e5e5e5;
      border-top-color: #0067b8;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
      margin-right: 6px;
      vertical-align: middle;
    }

    .right-elements {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      min-width: 0;
      margin-left: auto;
    }
    .header-actions {
      display: contents;
    }
    .menu-toggle {
      display: none;
      width: 40px;
      height: 40px;
      border: none;
      background: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      color: #424242;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease, color 0.2s ease;
    }
    .menu-toggle:hover { background: #f0f0f0; color: #1a1a1a; }
    .menu-toggle:focus-visible { outline: 2px solid var(--theme-primary-element-color, #005FB8); outline-offset: 2px; }
    .menu-toggle svg { width: 22px; height: 22px; }

    .search-trigger {
      display: none;
      width: 40px;
      height: 40px;
      border: none;
      background: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      color: #424242;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease, color 0.2s ease;
    }
    .search-trigger:hover { background: #f0f0f0; color: #1a1a1a; }
    .search-trigger:focus-visible { outline: 2px solid var(--theme-primary-element-color, #005FB8); outline-offset: 2px; }
    .search-trigger svg { width: 20px; height: 20px; }
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

    @media (max-width: 1200px) {
      .multi-app-btn .label { display: none; }
      .multi-app-btn {
        width: 44px;
        min-width: 44px;
        height: 44px;
        border-radius: 50%;
        padding: 0;
        justify-content: center;
        aspect-ratio: 1/1;
      }
      .search-area { max-width: 400px; margin: 0 16px; }
    }
    @media (max-width: 900px) {
      nav { flex-wrap: wrap; min-height: 96px; }
      .nav-tabs { order: 3; width: 100%; justify-content: center; padding-bottom: 8px; }
      .search-area { order: 2; flex: 0 1 auto; width: 100%; max-width: 360px; }
    }
    @media (max-width: 600px) {
      nav {
        flex-wrap: wrap;
        align-content: flex-start;
        gap: 0;
        padding: 0 8px 0 16px;
        max-width: 100%;
        min-height: 0;
        align-items: center;
      }
      :host header { position: relative; }
      .home-logo-link {
        padding: 12px 4px 12px 0;
        min-height: 44px;
        order: 1;
        flex-shrink: 1;
        min-width: 0;
        align-items: center;
      }
      .header-actions {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        gap: 2px;
        order: 2;
        margin-left: auto;
        min-width: 0;
        flex-shrink: 0;
        padding-right: 0;
      }
      .menu-toggle { display: flex; flex-shrink: 0; }
      .search-area {
        margin: 0;
        flex: 0 0 auto;
        width: auto;
        max-width: none;
      }
      .right-elements { margin-left: 0; gap: 2px; margin-right: 0; padding-right: 0; flex-shrink: 0; }
      .search-area.expanded {
        position: absolute;
        left: 0;
        right: 0;
        top: 100%;
        margin: 0;
        padding: 10px 16px 12px;
        background: #fff;
        border-bottom: 1px solid rgba(0,0,0,0.06);
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        z-index: 99;
        width: 100%;
        box-sizing: border-box;
      }
      .search-area.expanded .search-inline.expanded { display: flex; }
      .search-trigger { display: flex; }
      .search-area .search-inline { display: none; }
      .search-area .search-inline.expanded {
        display: flex;
        width: 100%;
        padding: 0;
        box-sizing: border-box;
      }
      .search-area.expanded .search-trigger { display: none; }
      .multi-app-btn, .sign-in-btn, .user-btn {
        width: 36px;
        min-width: 36px;
        height: 36px;
        padding: 0;
        justify-content: center;
        transition: background-color 0.2s ease, color 0.2s ease;
      }
      .multi-app-btn {
        background: none;
        color: #424242;
      }
      .multi-app-btn:hover {
        background: #f0f0f0;
        color: #1a1a1a;
        border-color: transparent;
      }
      .sign-in-btn .sign-text { display: none; }
      .sign-in-btn:hover, .user-btn:hover { color: #1a1a1a; }
      .sign-in-btn, .user-btn { min-width: 36px; min-height: 36px; }
      .user-btn svg { width: 18px; height: 18px; }
      .menu-toggle, .search-trigger {
        width: 36px;
        min-width: 36px;
        height: 36px;
      }
      .menu-toggle svg { width: 20px; height: 20px; }
      .search-trigger svg { width: 18px; height: 18px; }
      .nav-tabs {
        order: 5;
        width: 100%;
        min-width: 0;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0;
        padding: 8px 0 0;
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: max-height 0.25s ease, opacity 0.2s ease;
      }
      .nav-tabs.open {
        max-height: 280px;
        opacity: 1;
      }
      .nav-tabs a {
        padding: 10px 12px;
        font-size: var(--sl-font-size-x-small, 0.75rem);
        min-height: 44px;
        display: inline-flex;
        align-items: center;
        width: 100%;
        justify-content: center;
        box-sizing: border-box;
      }
      .nav-tabs-indicator { display: none; }
      .msft-logo { width: 84px; height: 26px; }
      .store-logo { width: 38px; height: 26px; }
      .search-inline .search-box { min-width: 0; width: 100%; box-sizing: border-box; }
      .sign-in-btn .sign-text { display: none; }
      .sign-in-btn, .user-btn { min-width: 40px; min-height: 40px; }
      .user-btn svg { width: 20px; height: 20px; }
    }
  `;

  constructor() {
    super();
    this.currentRoute = 'home';
    this._searchResults = [];
    this._searchOpen = false;
    this._searchLoading = false;
    this._searchTimer = null;
    this._menuOpen = false;
    this._searchExpanded = false;
    this._handleDocClick = this._handleDocClick.bind(this);
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

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleDocClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleDocClick);
  }

  _handleDocClick(e) {
    if (!e.composedPath().includes(this)) {
      this._searchOpen = false;
      this._menuOpen = false;
      this._searchExpanded = false;
    }
  }

  _toggleMenu() {
    this._menuOpen = !this._menuOpen;
  }

  _openSearch() {
    this._searchExpanded = true;
    this._searchOpen = true;
    requestAnimationFrame(() => {
      const input = this.shadowRoot?.querySelector('.search-box');
      if (input) input.focus();
    });
  }

  _onSearchInput(e) {
    const q = e.target.value.trim();
    clearTimeout(this._searchTimer);
    if (q.length < 1) {
      this._searchOpen = false;
      this._searchResults = [];
      return;
    }
    this._searchLoading = true;
    this._searchOpen = true;
    this._searchTimer = setTimeout(() => this._doSearch(q), 250);
  }

  async _doSearch(q) {
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) {
        this._searchResults = [];
        return;
      }
      const data = await res.json();
      this._searchResults = data.results || [];
    } catch {
      this._searchResults = [];
    } finally {
      this._searchLoading = false;
    }
  }

  _onSearchFocus(e) {
    if (e.target.value.trim() && this._searchResults.length) {
      this._searchOpen = true;
    }
  }

  _onSearchKeydown(e) {
    if (e.key === 'Escape') {
      this._searchOpen = false;
      this._searchExpanded = false;
      e.target.blur();
    }
  }

  _getResultHref(p) {
    if (p.is_own_product && p.custom_url) return p.custom_url;
    if (p.original_url) return p.original_url;
    if (p.ms_id) return '/detail/' + p.ms_id;
    return '#';
  }

  _isResultInternal(p) {
    return !!(p.is_own_product && p.custom_url);
  }

  _onResultClick(e, p) {
    this._searchOpen = false;
    const href = this._getResultHref(p);
    if (this._isResultInternal(p)) {
      e.preventDefault();
      window.msApp?.navigate(href);
    }
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

          <div class="header-actions">
          <button type="button" class="menu-toggle" aria-label="打开菜单" @click=${this._toggleMenu} aria-expanded=${this._menuOpen}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>

          <div class="search-area ${this._searchExpanded ? 'expanded' : ''}">
            <button type="button" class="search-trigger" aria-label="搜索" @click=${this._openSearch}>
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 3a5.5 5.5 0 014.383 8.823l4.147 4.147a.75.75 0 01-1.06 1.06l-4.147-4.147A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z" fill="currentColor"/>
              </svg>
            </button>
            <div class="search-inline ${this._searchExpanded ? 'expanded' : ''}">
              <svg class="search-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 3a5.5 5.5 0 014.383 8.823l4.147 4.147a.75.75 0 01-1.06 1.06l-4.147-4.147A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z" fill="currentColor"/>
              </svg>
              <input type="text" class="search-box" placeholder="搜索应用、游戏等"
                @input=${this._onSearchInput}
                @focus=${this._onSearchFocus}
                @keydown=${this._onSearchKeydown}
              />
              ${this._searchOpen ? html`
                <div class="search-dropdown">
                  ${this._searchLoading ? html`
                    <div class="sr-loading"><span class="sr-loading-spinner"></span>搜索中...</div>
                  ` : this._searchResults.length === 0 ? html`
                    <div class="sr-empty">未找到相关结果</div>
                  ` : this._searchResults.map(p => {
                    const href = this._getResultHref(p);
                    const internal = this._isResultInternal(p);
                    const icon = p.local_icon || p.icon_url || '';
                    return html`
                      <a class="search-result-item"
                        href=${href}
                        rel=${internal ? '' : 'nofollow noopener'}
                        target=${internal ? '' : '_blank'}
                        @click=${(e) => this._onResultClick(e, p)}
                      >
                        <img class="sr-icon" src=${icon} alt="" loading="lazy" />
                        <div class="sr-info">
                          <div class="sr-title">${p.title}</div>
                          <div class="sr-meta">${p.category || p.product_type}${p.rating > 0 ? ` · ${p.rating}` : ''}</div>
                        </div>
                        <span class="sr-price">${p.price || '免费'}</span>
                      </a>
                    `;
                  })}
                </div>
              ` : ''}
            </div>
          </div>

          <div class="right-elements">
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
          </div>

          <div class="nav-tabs ${this._menuOpen ? 'open' : ''}">
            <a href="/" data-nav class=${this._isActive('home')} @click=${() => { this._menuOpen = false; }}>主页</a>
            <a href="/apps" data-nav class=${this._isActive('apps')} @click=${() => { this._menuOpen = false; }}>应用</a>
            <a href="/games" data-nav class=${this._isActive('games')} @click=${() => { this._menuOpen = false; }}>游戏</a>
            <a href="/articles" data-nav class=${this._isActive('articles')} @click=${() => { this._menuOpen = false; }}>资讯</a>
            <a href="/about" data-nav class=${this._isActive('about')} @click=${() => { this._menuOpen = false; }}>关于</a>
            <div class="nav-tabs-indicator"></div>
          </div>
        </nav>
      </header>
    `;
  }
}
customElements.define('ms-header', MsHeader);
