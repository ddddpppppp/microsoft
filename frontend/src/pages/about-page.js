import { LitElement, html, css } from 'lit';

class AboutPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding-bottom: 60px;
      color: #131316;
      background: #fff;
    }
    .hero {
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 40px 40px;
      text-align: center;
    }
    .hero-title {
      font-size: 40px;
      font-weight: 700;
      margin: 0 0 24px;
      color: #131316;
    }
    .hero-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 24px;
      border-radius: 4px;
      background: #0067b8;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.15s;
    }
    .hero-btn:hover { background: #005a9e; }
    .hero-sub {
      margin-top: 16px;
      font-size: 14px;
      color: #616161;
    }
    .hero-sub a {
      color: #0067b8;
      text-decoration: none;
    }
    .hero-sub a:hover { text-decoration: underline; }

    .sections {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 40px;
    }
    .section {
      margin-bottom: 64px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
    }
    .section.reverse { direction: rtl; }
    .section.reverse > * { direction: ltr; }
    .section-text-area {}
    .section-title {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 16px;
      color: #131316;
    }
    .section-desc {
      font-size: 15px;
      color: #616161;
      line-height: 1.7;
      margin: 0 0 16px;
    }
    .section-note {
      font-size: 13px;
      color: #767676;
      margin: 0 0 20px;
    }
    .section-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 20px;
      border-radius: 4px;
      background: #0067b8;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.15s;
    }
    .section-btn:hover { background: #005a9e; }
    .section-btn.outline {
      background: transparent;
      border: 1px solid #0067b8;
      color: #0067b8;
    }
    .section-btn.outline:hover {
      background: #f0f6ff;
    }
    .section-image {
      width: 100%;
      border-radius: 12px;
      background: #f3f3f3;
      min-height: 280px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .section-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
    }
    .placeholder-img {
      font-size: 64px;
      color: #d1d1d1;
    }

    .footnotes {
      max-width: 1200px;
      margin: 40px auto 0;
      padding: 0 40px;
      border-top: 1px solid #e5e5e5;
      padding-top: 24px;
    }
    .footnote {
      font-size: 12px;
      color: #767676;
      line-height: 1.6;
      margin-bottom: 8px;
    }
    .footnote a {
      color: #0067b8;
      text-decoration: none;
    }
    .footnote a:hover { text-decoration: underline; }
    .footnote sup {
      font-size: 10px;
      margin-right: 4px;
    }

    @media (max-width: 900px) {
      .section { grid-template-columns: 1fr; gap: 24px; }
      .section.reverse { direction: ltr; }
      .hero { padding: 48px 16px 24px; }
      .hero-title { font-size: 30px; }
      .sections { padding: 0 16px; }
    }
  `;

  render() {
    return html`
      <div class="hero">
        <h1 class="hero-title">你想要的一切，尽在其中</h1>
        <a class="hero-btn" href="https://apps.microsoft.com/detail/9WZDNCRFJBMP" target="_blank">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M7.5 1H1v6.5h6.5V1zM8.5 1v6.5H15V1H8.5zM1 8.5V15h6.5V8.5H1zM8.5 8.5V15H15V8.5H8.5z"/></svg>
          打开 Microsoft Store 应用
        </a>
        <p class="hero-sub">
          如果设备上没有 Microsoft Store 应用，<a href="https://apps.microsoft.com/detail/9WZDNCRFJBMP" target="_blank">单击此处</a>立即下载。
        </p>
      </div>

      <div class="sections">
        <div class="section">
          <div class="section-text-area">
            <h2 class="section-title">适用于工作和娱乐的应用和游戏</h2>
            <p class="section-desc">
              找到你喜爱的应用。放松心情，释放你的创造力和生产力。
            </p>
            <p class="section-note">设备上没有 Microsoft Store 应用?</p>
            <a class="section-btn outline" href="https://apps.microsoft.com/detail/9WZDNCRFJBMP" target="_blank">
              下载 Microsoft Store 应用
            </a>
          </div>
          <div class="section-image">
            <img src="/assets/images/about-discover-decoration.png" alt="发现应用" />
          </div>
        </div>

        <div class="section reverse">
          <div class="section-text-area">
            <h2 class="section-title">发现</h2>
            <p class="section-desc">
              在心仪的流媒体应用中收看剧集，用创意软件创作数字艺术，或借助强大的效率工具完成工作
            </p>
            <a class="section-btn" href="/apps" data-nav>探索应用</a>
          </div>
          <div class="section-image">
            <img src="/assets/images/banners/collection_creative.jpg" alt="创意应用" />
          </div>
        </div>

        <div class="section">
          <div class="section-text-area">
            <h2 class="section-title">桌面游戏</h2>
            <p class="section-desc">
              游玩来自获奖独立游戏开发者及 AAA 发行商的 PC 游戏
            </p>
            <a class="section-btn" href="/games" data-nav>探索游戏</a>
          </div>
          <div class="section-image">
            <img src="/assets/images/about-desktop-gaming.webp" alt="桌面游戏" />
          </div>
        </div>
      </div>

      <div class="footnotes">
        <p class="footnote"><sup>[+]</sup>模拟画面。功能和应用可用性可能根据地区变化。应用、游戏及其它内容或订阅需分别购买；免费应用可能包含广告或应用内购买。</p>
        <p class="footnote"><sup>[1]</sup>仅适用于所选区域。 <a href="https://www.microsoft.com/servicesagreement/" target="_blank">使用条款</a></p>
        <p class="footnote"><sup>[2]</sup>仅适用于所选区域。</p>
        <p class="footnote"><sup>[3]</sup>安全付款方式依赖于所选内容和应用。</p>
        <p class="footnote"><sup>[4]</sup>在 Store 中上架但由开发者自行分发的应用由开发者自行负责更新。</p>
      </div>
    `;
  }
}
customElements.define('about-page', AboutPage);
