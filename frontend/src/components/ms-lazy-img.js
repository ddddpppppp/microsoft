import { LitElement, html, css } from 'lit';

class MsLazyImg extends LitElement {
  static properties = {
    src: { type: String },
    alt: { type: String },
    width: { type: String },
    height: { type: String },
    radius: { type: String },
    objectFit: { type: String, attribute: 'object-fit' },
    /** 设为 true 时首屏立即加载，不等待进入视口（用于 Hero、首屏关键图） */
    eager: { type: Boolean },
    _loaded: { type: Boolean, state: true },
    _inView: { type: Boolean, state: true },
    _error: { type: Boolean, state: true }
  };

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
      overflow: hidden;
      line-height: 0;
    }
    .skeleton {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s ease-in-out infinite;
      z-index: 1;
      transition: opacity 0.3s ease;
    }
    .skeleton.hidden {
      opacity: 0;
      pointer-events: none;
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.35s ease;
    }
    img.visible {
      opacity: 1;
    }
  `;

  constructor() {
    super();
    this.src = '';
    this.alt = '';
    this.width = '';
    this.height = '';
    this.radius = '0';
    this.objectFit = 'cover';
    this.eager = false;
    this._loaded = false;
    this._inView = false;
    this._error = false;
    this._observer = null;
  }

  _checkInView() {
    const rect = this.getBoundingClientRect();
    const margin = 300;
    if (rect.top < window.innerHeight + margin && rect.bottom > -margin) {
      this._inView = true;
      this._observer?.disconnect();
      this._observer = null;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.eager) {
      this._inView = true;
      return;
    }
    requestAnimationFrame(() => {
      if (this._inView) return;
      this._checkInView();
    });
    this._observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this._inView = true;
          this._observer?.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0.01 }
    );
    this._observer.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
  }

  _onLoad() {
    this._loaded = true;
  }

  _onError() {
    this._error = true;
    this._loaded = true;
  }

  updated(changed) {
    if (changed.has('src')) {
      this._loaded = false;
      this._error = false;
    }
  }

  render() {
    const hostStyle = `
      width: ${this.width || '100%'};
      height: ${this.height || '100%'};
      border-radius: ${this.radius};
    `;
    const imgStyle = `
      object-fit: ${this.objectFit};
      border-radius: ${this.radius};
    `;

    this.style.cssText = hostStyle;

    return html`
      <div class="skeleton ${this._loaded ? 'hidden' : ''}" style="border-radius: ${this.radius}"></div>
      ${this._inView && this.src ? html`
        <img
          src=${this.src}
          alt=${this.alt}
          class=${this._loaded ? 'visible' : ''}
          style=${imgStyle}
          @load=${this._onLoad}
          @error=${this._onError}
        />
      ` : ''}
    `;
  }
}

customElements.define('ms-lazy-img', MsLazyImg);
