import { LitElement, html, css } from 'lit';
import { updatePageMeta } from '../utils/seo.js';

class AboutPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding-bottom: 60px;
      color: #131316;
      background: #fff;
    }

    /* Hero section - two-column layout */
    .hero {
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 40px 60px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      top: -20%;
      right: -10%;
      width: 70%;
      height: 140%;
      background: radial-gradient(ellipse 60% 50% at 70% 30%, rgba(255, 105, 135, 0.35) 0%, transparent 60%),
        radial-gradient(ellipse 50% 60% at 80% 60%, rgba(255, 165, 0, 0.25) 0%, transparent 55%),
        radial-gradient(ellipse 55% 45% at 60% 80%, rgba(100, 149, 237, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse 40% 50% at 90% 20%, rgba(147, 112, 219, 0.2) 0%, transparent 45%);
      pointer-events: none;
      z-index: 0;
    }
    .hero-content {
      position: relative;
      z-index: 1;
    }
    .hero-title {
      font-size: 46px;
      font-weight: 700;
      margin: 0 0 24px;
      line-height: 1.2;
      background: linear-gradient(180deg, #0078D4 0%, #005FB8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      border-radius: 4px;
      background: #0078D4;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.15s;
    }
    .hero-btn:hover {
      background: #006cbd;
    }
    .hero-btn svg {
      flex-shrink: 0;
    }
    .hero-sub {
      margin-top: 20px;
      font-size: 14px;
      color: #616161;
    }
    .hero-sub a {
      color: #0078D4;
      text-decoration: none;
    }
    .hero-sub a:hover {
      text-decoration: underline;
    }
    .hero-visual {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .hero-visual-inner {
      position: relative;
      width: 100%;
      max-width: 480px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.12);
    }
    .hero-visual-inner img {
      width: 100%;
      height: auto;
      min-height: 280px;
      object-fit: cover;
      display: block;
      border-radius: 12px;
    }

    /* Icon carousel section */
    .icon-carousel {
      max-width: 1200px;
      margin: 0 auto;
      padding: 64px 40px;
      text-align: center;
    }
    .icon-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .icon-item {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .carousel-title {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 16px;
      color: #131316;
    }
    .carousel-desc {
      font-size: 15px;
      color: #616161;
      line-height: 1.7;
      margin: 0 0 24px;
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }
    .carousel-note {
      font-size: 13px;
      color: #767676;
      margin: 0 0 20px;
    }
    .carousel-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 24px;
      border-radius: 4px;
      background: #0078D4;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.15s;
    }
    .carousel-btn:hover {
      background: #006cbd;
    }

    /* Full-width feature panels */
    .panels {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 40px 40px;
    }
    .panel {
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
      min-height: 320px;
    }
    .panel-discover {
      background: linear-gradient(135deg, #6B4EAA 0%, #4A7FD4 50%, #3B6BB5 100%);
      padding: 48px 56px;
    }
    .panel-gaming {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      padding: 48px 56px;
    }
    .panel-content {
      color: #fff;
    }
    .panel-title {
      font-size: 32px;
      font-weight: 700;
      margin: 0 0 16px;
      color: #fff;
    }
    .panel-desc {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.9);
      line-height: 1.7;
      margin: 0 0 24px;
    }
    .panel-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 24px;
      border-radius: 4px;
      background: #fff;
      color: #0078D4;
      font-size: 14px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.15s, color 0.15s;
    }
    .panel-btn:hover {
      background: #f0f0f0;
      color: #006cbd;
    }
    .panel-visual {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .panel-visual img {
      max-width: 100%;
      max-height: 280px;
      object-fit: contain;
      border-radius: 8px;
    }
    .panel-gaming .panel-visual {
      justify-content: flex-start;
    }
    .panel-gaming .panel-visual img {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }

    /* Footnotes */
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
      color: #0078D4;
      text-decoration: none;
    }
    .footnote a:hover {
      text-decoration: underline;
    }
    .footnote sup {
      font-size: 10px;
      margin-right: 4px;
    }

    @media (max-width: 900px) {
      .hero {
        grid-template-columns: 1fr;
        padding: 48px 16px 40px;
        text-align: center;
      }
      .hero::before {
        top: -10%;
        right: -30%;
        width: 100%;
        height: 80%;
      }
      .hero-visual {
        justify-content: center;
      }
      .hero-title {
        font-size: 36px;
      }
      .icon-carousel {
        padding: 48px 16px;
      }
      .panels {
        padding: 0 16px 24px;
      }
      .panel {
        grid-template-columns: 1fr;
        gap: 32px;
        padding: 32px 24px;
        text-align: center;
      }
      .panel-gaming .panel-visual {
        justify-content: center;
        order: -1;
      }
      .footnotes {
        padding: 0 16px;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._applySeo();
  }

  async _applySeo() {
    try {
      const res = await fetch('/api/about');
      if (res.ok) {
        const data = await res.json();
        if (data?.seo) {
          updatePageMeta({ title: data.seo.title, keywords: data.seo.keywords, description: data.seo.description });
        }
      }
    } catch (e) { /* ignore */ }
  }

  render() {
    return html`
      <div class="hero">
        <div class="hero-content">
          <h1 class="hero-title">你想要的一切，尽在其中</h1>
          <a class="hero-btn" href="https://apps.microsoft.com/detail/9WZDNCRFJBMP" target="_blank">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M7.5 1H1v6.5h6.5V1zM8.5 1v6.5H15V1H8.5zM1 8.5V15h6.5V8.5H1zM8.5 8.5V15H15V8.5H8.5z"/>
            </svg>
            打开 Microsoft Store 应用
          </a>
          <p class="hero-sub">
            如果设备上没有 Microsoft Store 应用，<a href="https://apps.microsoft.com/detail/9WZDNCRFJBMP" target="_blank">单击此处</a>立即下载。
          </p>
        </div>
        <div class="hero-visual">
          <div class="hero-visual-inner">
            <img src="/assets/images/about-store-hero.png" alt="Microsoft Store 应用" />
          </div>
        </div>
      </div>

      <div class="icon-carousel">
        <div class="icon-row">
          <div class="icon-item" style="background: linear-gradient(135deg, #E1306C, #F77737);"></div>
          <div class="icon-item" style="background: linear-gradient(135deg, #25D366, #128C7E);"></div>
          <div class="icon-item" style="background: linear-gradient(135deg, #00F2EA, #FF0050);"></div>
          <div class="icon-item" style="background: linear-gradient(135deg, #5865F2, #7289DA);"></div>
          <div class="icon-item" style="background: linear-gradient(135deg, #FF0000, #CC0000);"></div>
          <div class="icon-item" style="background: linear-gradient(135deg, #1DA1F2, #0d8bd9);"></div>
        </div>
        <h2 class="carousel-title">适用于工作和娱乐的应用和游戏</h2>
        <p class="carousel-desc">
          找到你喜爱的应用。放松心情，释放你的创造力和生产力。
        </p>
        <p class="carousel-note">设备上没有 Microsoft Store 应用?</p>
        <a class="carousel-btn" href="https://apps.microsoft.com/detail/9WZDNCRFJBMP" target="_blank">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1v10l4-4-4-4V1zM3 2v12h10V2H3z"/>
          </svg>
          下载 Microsoft Store 应用
        </a>
      </div>

      <div class="panels">
        <div class="panel panel-discover">
          <div class="panel-content">
            <h2 class="panel-title">发现</h2>
            <p class="panel-desc">
              在心仪的流媒体应用中收看剧集，用创意软件创作数字艺术，或借助强大的效率工具完成工作
            </p>
            <a class="panel-btn" href="/apps" data-nav>探索应用</a>
          </div>
          <div class="panel-visual">
            <img src="/assets/images/about-discover-decoration.png" alt="发现应用" />
          </div>
        </div>

        <div class="panel panel-gaming">
          <div class="panel-visual">
            <img src="/assets/images/about-desktop-gaming.webp" alt="桌面游戏" />
          </div>
          <div class="panel-content">
            <h2 class="panel-title">桌面游戏</h2>
            <p class="panel-desc">
              游玩来自获奖独立游戏开发者及 AAA 发行商的 PC 游戏
            </p>
            <a class="panel-btn" href="/games" data-nav>探索游戏</a>
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
