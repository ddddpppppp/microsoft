import { LitElement, html, css } from 'lit';

class MsFooter extends LitElement {
  static properties = {
    _expanded: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      min-width: 0;
      background: #f2f2f2;
      margin-top: 48px;
    }
    .footer-content {
      width: 100%;
      max-width: var(--ms-content-max-width, 1600px);
      margin: 0 auto;
      padding: 36px 38px 16px;
      box-sizing: border-box;
      min-width: 0;
    }
    .footer-columns {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
      margin-bottom: 32px;
    }
    .footer-col-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 12px;
    }
    .footer-col h3 {
      font-size: 13px;
      font-weight: 600;
      margin: 0;
      color: #1a1a1a;
    }
    .footer-col-toggle {
      display: none;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      color: #616161;
      line-height: 1;
      width: 20px;
      height: 20px;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .footer-col-toggle svg {
      width: 14px;
      height: 14px;
      transition: transform 0.2s ease;
    }
    .footer-col-toggle.open svg {
      transform: rotate(180deg);
    }
    .footer-col-links {
      display: flex;
      flex-direction: column;
    }
    .footer-col a {
      display: block;
      font-size: 12px;
      color: #616161;
      padding: 3px 0;
      text-decoration: none;
    }
    .footer-col a:hover {
      color: #1a1a1a;
      text-decoration: underline;
    }
    .footer-bottom {
      border-top: 1px solid #d6d6d6;
      padding-top: 12px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
    }
    .footer-bottom a, .footer-bottom span {
      font-size: 11px;
      color: #616161;
      text-decoration: none;
    }
    .footer-bottom a:hover {
      color: #1a1a1a;
      text-decoration: underline;
    }
    .locale-btn {
      background: none;
      border: 1px solid #b3b3b3;
      color: #616161;
      padding: 3px 10px;
      border-radius: 3px;
      cursor: pointer;
      font-size: 11px;
      transition: border-color 0.12s;
    }
    .locale-btn:hover {
      border-color: #767676;
      color: #1a1a1a;
    }

    @media (max-width: 900px) {
      .footer-content { padding: 28px 24px 16px; }
      .footer-columns { grid-template-columns: repeat(2, 1fr); gap: 24px; }
    }

    @media (max-width: 600px) {
      :host { margin-top: 32px; }
      .footer-content { padding: 0 0 12px; }
      .footer-columns {
        grid-template-columns: 1fr;
        gap: 0;
        margin-bottom: 0;
        border-top: 1px solid #d6d6d6;
      }
      .footer-col {
        border-bottom: 1px solid #d6d6d6;
      }
      .footer-col-header {
        margin: 0;
        padding: 14px 16px;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      .footer-col h3 {
        font-size: 13px;
        color: #1a1a1a;
      }
      .footer-col-toggle {
        display: flex;
      }
      .footer-col-links {
        overflow: hidden;
        max-height: 0;
        transition: max-height 0.25s ease, padding 0.25s ease;
        padding: 0 16px;
      }
      .footer-col-links.open {
        max-height: 400px;
        padding: 0 16px 12px;
      }
      .footer-col a {
        font-size: 13px;
        padding: 0;
        min-height: 40px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ebebeb;
        color: #444;
      }
      .footer-col a:last-child { border-bottom: none; }
      .footer-bottom {
        flex-wrap: wrap;
        gap: 0;
        padding: 16px 16px 12px;
        row-gap: 0;
      }
      .footer-bottom a, .footer-bottom span {
        font-size: 12px;
        min-height: 36px;
        display: flex;
        align-items: center;
        padding-right: 12px;
      }
      .locale-btn {
        min-height: 36px;
        padding: 6px 14px;
        font-size: 12px;
        margin-bottom: 8px;
        width: 100%;
        text-align: left;
      }
    }

    @media (max-width: 420px) {
      .footer-bottom { padding: 12px 12px 10px; }
    }
  `;

  constructor() {
    super();
    this._expanded = new Set();
  }

  _toggle(idx) {
    const next = new Set(this._expanded);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
    }
    this._expanded = next;
  }

  _renderCol(idx, title, linksHtml) {
    const open = this._expanded.has(idx);
    return html`
      <div class="footer-col">
        <div class="footer-col-header" @click=${() => this._toggle(idx)}>
          <h3>${title}</h3>
          <button class="footer-col-toggle ${open ? 'open' : ''}" aria-label="${open ? '收起' : '展开'} ${title}" tabindex="-1">
            <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="footer-col-links ${open ? 'open' : ''}">
          ${linksHtml}
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <footer>
        <div class="footer-content">
          <div class="footer-columns">
            ${this._renderCol(0, '新增功能', html`
              <a href="https://blogs.windows.com/windowsexperience/2022/09/20/more-content-and-new-developer-opportunities-in-the-microsoft-store/" target="_blank" rel="nofollow noopener">Microsoft Store 中的更多内容</a>
              <a href="/apps" data-nav>应用</a>
              <a href="/games" data-nav>游戏</a>
              <a href="https://apps.microsoft.com/apppack" target="_blank" rel="nofollow noopener">多应用安装</a>
              <a href="https://blogs.windows.com/" target="_blank" rel="nofollow noopener">Windows 体验博客</a>
            `)}
            ${this._renderCol(1, 'Microsoft Store', html`
              <a href="https://account.microsoft.com/" target="_blank" rel="nofollow noopener">Microsoft 帐户</a>
              <a href="https://go.microsoft.com/fwlink/?linkid=2139749" target="_blank" rel="nofollow noopener">Microsoft Store 支持</a>
              <a href="https://go.microsoft.com/fwlink/p/?LinkID=824764&clcid=0x409" target="_blank" rel="nofollow noopener">返回</a>
              <a href="https://www.microsoft.com/store/b/payment-financing-options?icid=footer_financing_vcc" target="_blank" rel="nofollow noopener">灵活的付款方式</a>
              <a href="https://learn.microsoft.com/windows/apps/publish/store-policies-and-code-of-conduct" target="_blank" rel="nofollow noopener">策略和行为准则</a>
              <a href="https://apps.microsoft.com/detail/9WZDNCRFJBMP" target="_blank" rel="nofollow noopener">获取 Microsoft Store 应用</a>
            `)}
            ${this._renderCol(2, '适用于开发人员', html`
              <a href="https://developer.microsoft.com/microsoft-store" target="_blank" rel="nofollow noopener">发布应用</a>
              <a href="https://apps.microsoft.com/store/app-badge/" target="_blank" rel="nofollow noopener">生成应用徽章</a>
              <a href="https://www.pwabuilder.com/" target="_blank" rel="nofollow noopener">PWABuilder</a>
            `)}
            ${this._renderCol(3, 'Windows', html`
              <a href="https://careers.microsoft.com/" target="_blank" rel="nofollow noopener">职业</a>
              <a href="https://www.microsoft.com/about" target="_blank" rel="nofollow noopener">关于 Microsoft</a>
              <a href="https://news.microsoft.com/" target="_blank" rel="nofollow noopener">公司新闻</a>
              <a href="https://www.microsoft.com/investor/default.aspx" target="_blank" rel="nofollow noopener">投资者</a>
              <a href="https://www.microsoft.com/diversity/" target="_blank" rel="nofollow noopener">多样性和包容性</a>
              <a href="https://www.microsoft.com/accessibility" target="_blank" rel="nofollow noopener">辅助功能</a>
              <a href="https://www.microsoft.com/sustainability/" target="_blank" rel="nofollow noopener">可持续性</a>
            `)}
          </div>
          <div class="footer-bottom">
            <button class="locale-btn">中文（中国）</button>
            <a href="https://aka.ms/yourcaliforniaprivacychoices" target="_blank" rel="nofollow noopener">你的隐私选择</a>
            <a href="https://support.microsoft.com/contactus" target="_blank" rel="nofollow noopener">联系 Microsoft</a>
            <a href="/sitemap.xml">网站地图</a>
            <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="nofollow noopener">隐私</a>
            <a href="https://www.microsoft.com/legal/terms-of-use" target="_blank" rel="nofollow noopener">使用条款</a>
            <a href="https://www.microsoft.com/legal/intellectualproperty/trademarks" target="_blank" rel="nofollow noopener">商标</a>
            <a href="https://www.microsoft.com/legal/compliance/devices-safety-and-eco" target="_blank" rel="nofollow noopener">安全与生态</a>
            <a href="https://www.microsoft.com/legal/compliance/recycling" target="_blank" rel="nofollow noopener">回收</a>
            <a href="https://choice.microsoft.com/" target="_blank" rel="nofollow noopener">关于我们的广告</a>
            <span>&copy; Microsoft 2024</span>
          </div>
        </div>
      </footer>
    `;
  }
}
customElements.define('ms-footer', MsFooter);
