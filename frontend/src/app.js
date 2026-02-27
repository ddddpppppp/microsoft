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
      min-height: 100vh;
      background: var(--ms-page-bg);
    }
    .page-slot {
      display: none;
    }
    .page-slot.active {
      display: block;
      animation: pageFadeIn 0.25s ease-out;
    }
    @keyframes pageFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
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
    } else if (path === '/apps') {
      this.currentRoute = 'apps';
    } else if (path === '/games') {
      this.currentRoute = 'games';
    } else if (path === '/about') {
      this.currentRoute = 'about';
    } else if (path === '/articles') {
      this.currentRoute = 'articles';
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
    if (CACHED_ROUTES.has(this.currentRoute)) {
      this._activatedRoutes.add(this.currentRoute);
    }
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this._handleRoute();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  connectedCallback() {
    super.connectedCallback();
    window.msApp = this;
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-nav]');
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
        <div class="page-slot ${this._isActive('articles') ? 'active' : ''}">${this._shouldRender('articles') ? html`<articles-page></articles-page>` : ''}</div>
        <div class="page-slot ${!CACHED_ROUTES.has(this.currentRoute) ? 'active' : ''}">${this._renderDynamicPage()}</div>
      </main>
      <ms-footer></ms-footer>
    `;
  }
}

customElements.define('ms-app', MsApp);
