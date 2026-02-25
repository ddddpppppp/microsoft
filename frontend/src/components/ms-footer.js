import { LitElement, html, css } from 'lit';

class MsFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      background: #fff;
      border-top: 1px solid #e5e5e5;
      padding: 40px 40px 20px;
      margin-top: 60px;
    }
    .footer-content {
      max-width: 1600px;
      margin: 0 auto;
    }
    .footer-columns {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;
      margin-bottom: 40px;
    }
    .footer-col h3 {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #131316;
    }
    .footer-col a {
      display: block;
      font-size: 13px;
      color: #616161;
      padding: 4px 0;
    }
    .footer-col a:hover {
      color: #131316;
      text-decoration: underline;
    }
    .footer-bottom {
      border-top: 1px solid #e5e5e5;
      padding-top: 16px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 16px;
    }
    .footer-bottom a, .footer-bottom span {
      font-size: 12px;
      color: #616161;
    }
    .footer-bottom a:hover {
      color: #131316;
    }
    .locale-btn {
      background: none;
      border: 1px solid #c8c8c8;
      color: #616161;
      padding: 4px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }
    .locale-btn:hover {
      border-color: #999;
      color: #131316;
    }
    @media (max-width: 900px) {
      .footer-columns { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      :host { padding: 24px 16px 16px; }
      .footer-columns { grid-template-columns: 1fr; gap: 24px; }
    }
  `;

  render() {
    return html`
      <footer>
        <div class="footer-content">
          <div class="footer-columns">
            <div class="footer-col">
              <h3>新增功能</h3>
              <a href="https://blogs.windows.com/windowsexperience/2022/09/20/more-content-and-new-developer-opportunities-in-the-microsoft-store/" target="_blank">Microsoft Store 中的更多内容</a>
              <a href="/apps" data-nav>应用</a>
              <a href="/games" data-nav>游戏</a>
              <a href="https://apps.microsoft.com/apppack" target="_blank">多应用安装</a>
              <a href="https://blogs.windows.com/" target="_blank">Windows 体验博客</a>
            </div>
            <div class="footer-col">
              <h3>Microsoft Store</h3>
              <a href="https://account.microsoft.com/" target="_blank">Microsoft 帐户</a>
              <a href="https://go.microsoft.com/fwlink/?linkid=2139749" target="_blank">Microsoft Store 支持</a>
              <a href="https://go.microsoft.com/fwlink/p/?LinkID=824764&clcid=0x409" target="_blank">返回</a>
              <a href="https://www.microsoft.com/store/b/payment-financing-options?icid=footer_financing_vcc" target="_blank">灵活的付款方式</a>
              <a href="https://learn.microsoft.com/windows/apps/publish/store-policies-and-code-of-conduct" target="_blank">策略和行为准则</a>
              <a href="https://apps.microsoft.com/detail/9WZDNCRFJBMP" target="_blank">获取 Microsoft Store 应用</a>
            </div>
            <div class="footer-col">
              <h3>适用于开发人员</h3>
              <a href="https://developer.microsoft.com/microsoft-store" target="_blank">发布应用</a>
              <a href="https://apps.microsoft.com/store/app-badge/" target="_blank">生成应用徽章</a>
              <a href="https://www.pwabuilder.com/" target="_blank">PWABuilder</a>
            </div>
            <div class="footer-col">
              <h3>Windows</h3>
              <a href="https://careers.microsoft.com/" target="_blank">职业</a>
              <a href="https://www.microsoft.com/about" target="_blank">关于 Microsoft</a>
              <a href="https://news.microsoft.com/" target="_blank">公司新闻</a>
              <a href="https://www.microsoft.com/investor/default.aspx" target="_blank">投资者</a>
              <a href="https://www.microsoft.com/diversity/" target="_blank">多样性和包容性</a>
              <a href="https://www.microsoft.com/accessibility" target="_blank">辅助功能</a>
              <a href="https://www.microsoft.com/sustainability/" target="_blank">可持续性</a>
            </div>
          </div>
          <div class="footer-bottom">
            <button class="locale-btn">中文（中国）</button>
            <a href="https://aka.ms/yourcaliforniaprivacychoices" target="_blank">你的隐私选择</a>
            <a href="https://support.microsoft.com/contactus" target="_blank">联系 Microsoft</a>
            <a href="https://privacy.microsoft.com/privacystatement" target="_blank">隐私</a>
            <a href="https://www.microsoft.com/legal/terms-of-use" target="_blank">使用条款</a>
            <a href="https://www.microsoft.com/legal/intellectualproperty/trademarks" target="_blank">商标</a>
            <a href="https://www.microsoft.com/legal/compliance/devices-safety-and-eco" target="_blank">安全与生态</a>
            <a href="https://www.microsoft.com/legal/compliance/recycling" target="_blank">回收</a>
            <a href="https://choice.microsoft.com/" target="_blank">关于我们的广告</a>
            <span>&copy; Microsoft 2024</span>
          </div>
        </div>
      </footer>
    `;
  }
}
customElements.define('ms-footer', MsFooter);
