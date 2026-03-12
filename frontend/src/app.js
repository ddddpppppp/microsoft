import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/shoelace.js';
import './components/ms-header.js';
import './components/ms-footer.js';
import './pages/home-page.js';
import './pages/apps-page.js';
import './pages/games-page.js';
import './pages/about-page.js';
import './pages/detail-page.js';
import './pages/articles-page.js';
import './pages/article-detail-page.js';

const CACHED_ROUTES = new Set(['home', 'apps', 'games', 'about', 'articles']);

class MsApp extends LitElement {
  static properties = {
    currentRoute: { type: String },
    routeParams: { type: Object },
    _transitioning: { type: Boolean, state: true }
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      min-height: 100vh;
      background: var(--ms-page-bg);
      overflow-x: hidden;
      box-sizing: border-box;
    }
    main {
      max-width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    .page-slot {
      display: none;
      max-width: 100%;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    .page-slot.active {
      display: block;
    }
  `;

  constructor() {
    super();
    this.currentRoute = 'home';
    this.routeParams = {};
    this._transitioning = false;
    this._activatedRoutes = new Set();
    this._handleRoute();
    window.addEventListener('popstate', () => this._handleRoute());
  }

  _handleRoute() {
    const path = window.location.pathname;
    if (path === '/' || path === '/home') {
      this.currentRoute = 'home';
      this.routeParams = {};
    } else if (path === '/apps') {
      this.currentRoute = 'apps';
      this.routeParams = {};
    } else if (path === '/games') {
      this.currentRoute = 'games';
      this.routeParams = {};
    } else if (path === '/about') {
      this.currentRoute = 'about';
      this.routeParams = {};
    } else if (path === '/articles') {
      this.currentRoute = 'articles';
      this.routeParams = { page: 1 };
    } else {
      const m = path.match(/^\/articles\/(\d+)$/);
      if (m) {
        this.currentRoute = 'articles';
        this.routeParams = { page: parseInt(m[1], 10) };
      } else if (path.startsWith('/article/')) {
        this.currentRoute = 'article-detail';
        this.routeParams = { slug: path.split('/article/')[1] };
      } else if (path.startsWith('/detail/')) {
        this.currentRoute = 'detail';
        this.routeParams = { id: path.split('/detail/')[1] };
      } else if (path === '/desk.html') {
        this.currentRoute = 'detail';
        this.routeParams = { id: 'xpdlt6q62bfqkz' };
      } else {
        this.currentRoute = 'custom-product';
        this.routeParams = { customUrl: path };
      }
    }
    if (CACHED_ROUTES.has(this.currentRoute)) {
      this._activatedRoutes.add(this.currentRoute);
    }
  }

  navigate(path) {
    const prevRoute = this.currentRoute;
    const fromPath = window.location.pathname || '/';
    window.__msPrevPath = fromPath;
    const isToHome = path === '/' || path === '/home';
    const isToApps = path === '/apps';
    if (isToHome && fromPath !== '/' && fromPath !== '/home') {
      const refUrl = window.location.origin + (fromPath.startsWith('/') ? fromPath : '/' + fromPath);
      fetch('/api/record-home-view?ref=' + encodeURIComponent(refUrl)).catch(() => {});
    }
    if (isToApps && fromPath !== '/apps') {
      const refUrl = window.location.origin + (fromPath.startsWith('/') ? fromPath : '/' + fromPath);
      fetch('/api/apps?ref=' + encodeURIComponent(refUrl)).catch(() => {});
    }
    const isToArticles = path === '/articles' || /^\/articles\/\d+$/.test(path);
    if (isToArticles && fromPath !== path && !fromPath.startsWith('/articles')) {
      const refUrl = window.location.origin + (fromPath.startsWith('/') ? fromPath : '/' + fromPath);
      const page = path === '/articles' ? 1 : parseInt(path.replace(/^\/articles\//, ''), 10) || 1;
      fetch(`/api/articles?page=${page}&ref=` + encodeURIComponent(refUrl)).catch(() => {});
    }
    window.history.pushState({}, '', path);
    this._handleRoute();
    if (this.currentRoute !== prevRoute) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  _storeOriginRef() {
    try {
      if (sessionStorage.getItem('__msOriginRef')) return;
      const ref = document.referrer || '';
      if (!ref) return;
      let refHost = '';
      try {
        const u = new URL(ref);
        refHost = (u.hostname || '').replace(/:\d+$/, '').toLowerCase();
        if (refHost === '127.0.0.1') refHost = 'localhost';
      } catch { return; }
      let ourHost = (window.location.hostname || '').replace(/:\d+$/, '').toLowerCase();
      if (ourHost === '127.0.0.1') ourHost = 'localhost';
      if (refHost && refHost !== ourHost) {
        sessionStorage.setItem('__msOriginRef', ref);
      }
    } catch (_) {}
  }

  connectedCallback() {
    super.connectedCallback();
    window.msApp = this;
    this._storeOriginRef();
    document.addEventListener('click', (e) => {
      const path = e.composedPath();
      const link = path.find(el => el instanceof HTMLAnchorElement && el.hasAttribute('data-nav'));
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
  }

  _isActive(route) {
    return this.currentRoute === route;
  }

  _shouldRender(route) {
    return this._activatedRoutes.has(route);
  }

  _renderDynamicPage() {
    if (CACHED_ROUTES.has(this.currentRoute)) return '';
    switch (this.currentRoute) {
      case 'article-detail': return html`<article-detail-page .slug=${this.routeParams.slug}></article-detail-page>`;
      case 'detail': return html`<detail-page .productId=${this.routeParams.id}></detail-page>`;
      case 'custom-product': return html`<detail-page .customUrl=${this.routeParams.customUrl}></detail-page>`;
      default: return '';
    }
  }

  render() {
    return html`
      <ms-header .currentRoute=${this.currentRoute}></ms-header>
      <main>
        <div class="page-slot ${this._isActive('home') ? 'active' : ''}">${this._shouldRender('home') ? html`<home-page></home-page>` : ''}</div>
        <div class="page-slot ${this._isActive('apps') ? 'active' : ''}">${this._shouldRender('apps') ? html`<apps-page></apps-page>` : ''}</div>
        <div class="page-slot ${this._isActive('games') ? 'active' : ''}">${this._shouldRender('games') ? html`<games-page></games-page>` : ''}</div>
        <div class="page-slot ${this._isActive('about') ? 'active' : ''}">${this._shouldRender('about') ? html`<about-page></about-page>` : ''}</div>
        <div class="page-slot ${this._isActive('articles') ? 'active' : ''}">${this._shouldRender('articles') ? html`<articles-page .currentPage=${this.routeParams.page ?? 1}></articles-page>` : ''}</div>
        <div class="page-slot ${!CACHED_ROUTES.has(this.currentRoute) ? 'active' : ''}">${this._renderDynamicPage()}</div>
      </main>
      <ms-footer></ms-footer>
    `;
  }
}

customElements.define('ms-app', MsApp);
