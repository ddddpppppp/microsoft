import { LitElement, html, css } from 'lit';

class MsRating extends LitElement {
  static properties = {
    value: { type: Number }
  };

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .stars {
      display: inline-flex;
      align-items: center;
      position: relative;
      line-height: 1;
    }
    .stars-empty,
    .stars-filled {
      display: inline-flex;
      font-size: 12px;
      letter-spacing: 1px;
    }
    .stars-empty { color: #d1d1d1; }
    .stars-filled {
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      white-space: nowrap;
      color: #FFB900;
    }
    .value {
      font-size: 12px;
      color: #616161;
      margin-left: 2px;
      line-height: 1;
    }
  `;

  constructor() {
    super();
    this.value = 0;
  }

  render() {
    const val = Math.max(0, Math.min(5, this.value || 0));
    const pct = (val / 5) * 100;
    return html`
      <span class="stars">
        <span class="stars-empty">★★★★★</span>
        <span class="stars-filled" style="width: ${pct}%">★★★★★</span>
      </span>
      ${val > 0 ? html`<span class="value">${val.toFixed(1)}</span>` : ''}
    `;
  }
}
customElements.define('ms-rating', MsRating);
