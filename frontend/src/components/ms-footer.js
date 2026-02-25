import { LitElement, html, css } from 'lit';

class MsFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: #f2f2f2;
      margin-top: 48px;
    }
    .footer-content {
      max-width: 1600px;
      margin: 0 auto;
      padding: 36px 20px 16px;
    }
    .footer-columns {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
      margin-bottom: 32px;
    }
    .footer-col h3 {
      font-size: 13px;
      font-weight: 600;
      margin: 0 0 12px;
      color: #1a1a1a;
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
      .footer-columns { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .footer-content { padding: 24px 12px 12px; }
      .footer-columns { grid-template-columns: 1fr; gap: 20px; }
    }
  `;

  render() {
    return html`
      <footer>
        <div class="footer-content">
          <div class="footer-columns">
            <div class="footer-col">
              <h3>新增功能</h3>
              <a href="https://blogs.windows.com/windowsexperience/2022/09/20/more-content-and-new-developer-opportunities-in-the-microsoft-store/" target="_blank" rel="noopener">Microsoft Store 中的更多内容</a>
              <a href="/apps" data-nav>应用</a>
              <a href="/games" data-nav>游戏</a>
              <a href="https://apps.microsoft.com/apppack" target="_blank" rel="noopener">多应用安装</a>
              <a href="https://blogs.windows.com/" target="_blank" rel="noopener">Windows 体验博客</a>
            </div>
            <div class="footer-col">
              <h3>Microsoft Store</h3>
              <a href="https://account.microsoft.com/" target="_blank" rel="noopener">Microsoft 帐户</a>
              <a href="https://go.microsoft.com/fwlink/?linkid=2139749" target="_blank" rel="noopener">Microsoft Store 支持</a>
              <a href="https://go.microsoft.com/fwlink/p/?LinkID=824764&clcid=0x409" target="_blank" rel="noopener">返回</a>
              <a href="https://www.microsoft.com/store/b/payment-financing-options?icid=footer_financing_vcc" target="_blank" rel="noopener">灵活的付款方式</a>
              <a href="https://learn.microsoft.com/windows/apps/publish/store-policies-and-code-of-conduct" target="_blank" rel="noopener">策略和行为准则</a>
              <a href="https://apps.microsoft.com/detail/9WZDNCRFJBMP" target="_blank" rel="noopener">获取 Microsoft Store 应用</a>
            </div>
            <div class="footer-col">
              <h3>适用于开发人员</h3>
              <a href="https://developer.microsoft.com/microsoft-store" target="_blank" rel="noopener">发布应用</a>
              <a href="https://apps.microsoft.com/store/app-badge/" target="_blank" rel="noopener">生成应用徽章</a>
              <a href="https://www.pwabuilder.com/" target="_blank" rel="noopener">PWABuilder</a>
            </div>
            <div class="footer-col">
              <h3>Windows</h3>
              <a href="https://careers.microsoft.com/" target="_blank" rel="noopener">职业</a>
              <a href="https://www.microsoft.com/about" target="_blank" rel="noopener">关于 Microsoft</a>
              <a href="https://news.microsoft.com/" target="_blank" rel="noopener">公司新闻</a>
              <a href="https://www.microsoft.com/investor/default.aspx" target="_blank" rel="noopener">投资者</a>
              <a href="https://www.microsoft.com/diversity/" target="_blank" rel="noopener">多样性和包容性</a>
              <a href="https://www.microsoft.com/accessibility" target="_blank" rel="noopener">辅助功能</a>
              <a href="https://www.microsoft.com/sustainability/" target="_blank" rel="noopener">可持续性</a>
            </div>
          </div>
          <div class="footer-bottom">
            <button class="locale-btn">中文（中国）</button>
            <a href="https://aka.ms/yourcaliforniaprivacychoices" target="_blank" rel="noopener">你的隐私选择</a>
            <a href="https://support.microsoft.com/contactus" target="_blank" rel="noopener">联系 Microsoft</a>
            <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener">隐私</a>
            <a href="https://www.microsoft.com/legal/terms-of-use" target="_blank" rel="noopener">使用条款</a>
            <a href="https://www.microsoft.com/legal/intellectualproperty/trademarks" target="_blank" rel="noopener">商标</a>
            <a href="https://www.microsoft.com/legal/compliance/devices-safety-and-eco" target="_blank" rel="noopener">安全与生态</a>
            <a href="https://www.microsoft.com/legal/compliance/recycling" target="_blank" rel="noopener">回收</a>
            <a href="https://choice.microsoft.com/" target="_blank" rel="noopener">关于我们的广告</a>
            <span>&copy; Microsoft 2024</span>
          </div>
        </div>
      </footer>
    `;
  }
}
customElements.define('ms-footer', MsFooter);
