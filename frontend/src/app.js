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

class MsApp extends LitElement {
  static properties = {
    currentRoute: { type: String },
    routeParams: { type: Object }
  };

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: #ffffff;
    }
  `;

  constructor() {
    super();
    this.currentRoute = 'home';
    this.routeParams = {};
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
    } else if (path.startsWith('/detail/')) {
      this.currentRoute = 'detail';
      this.routeParams = { id: path.split('/detail/')[1] };
    } else if (path === '/desk.html') {
      this.currentRoute = 'detail';
      this.routeParams = { id: 'xpdlt6q62bfqkz' };
    } else {
      this.currentRoute = 'home';
    }
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this._handleRoute();
    window.scrollTo(0, 0);
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

  _renderPage() {
    switch (this.currentRoute) {
      case 'home': return html`<home-page></home-page>`;
      case 'apps': return html`<apps-page></apps-page>`;
      case 'games': return html`<games-page></games-page>`;
      case 'about': return html`<about-page></about-page>`;
      case 'detail': return html`<detail-page .productId=${this.routeParams.id}></detail-page>`;
      default: return html`<home-page></home-page>`;
    }
  }

  render() {
    return html`
      <ms-header .currentRoute=${this.currentRoute}></ms-header>
      <main>${this._renderPage()}</main>
      <ms-footer></ms-footer>
    `;
  }
}

customElements.define('ms-app', MsApp);
