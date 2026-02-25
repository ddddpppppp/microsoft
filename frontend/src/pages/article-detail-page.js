import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

class ArticleDetailPage extends LitElement {
  static properties = {
    slug: { type: String },
    data: { type: Object },
    loading: { type: Boolean }
  };

  static styles = css`
    :host { display: block; padding-bottom: 64px; }
    .loading {
      text-align: center; padding: 120px 0;
      color: #767676; font-size: 16px;
    }
    .loading-spinner {
      display: inline-block; width: 32px; height: 32px;
      border: 3px solid #e5e5e5; border-top-color: #0067b8;
      border-radius: 50%; animation: spin 0.8s linear infinite;
      margin-bottom: 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .container {
      max-width: 1200px; margin: 0 auto; padding: 40px 24px;
      display: grid; grid-template-columns: 1fr 320px; gap: 40px;
    }

    .breadcrumb {
      font-size: 13px; color: #999; margin-bottom: 16px;
    }
    .breadcrumb a {
      color: #0078d4; text-decoration: none;
    }
    .breadcrumb a:hover { text-decoration: underline; }

    .article-header { margin-bottom: 28px; }
    .article-header h1 {
      font-size: 28px; font-weight: 700; line-height: 1.4;
      color: #1a1a1a; margin: 0 0 16px;
    }
    .article-meta {
      display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
      font-size: 13px; color: #999;
    }
    .article-meta .cat {
      background: #e8f4fd; color: #0078d4; padding: 3px 12px;
      border-radius: 12px; font-weight: 500; font-size: 12px;
    }
    .article-meta span { display: flex; align-items: center; gap: 4px; }
    .meta-icon { width: 14px; height: 14px; flex-shrink: 0; opacity: 0.6; }

    .cover-img {
      width: 100%; border-radius: 12px; margin-bottom: 28px;
      max-height: 400px; object-fit: cover;
    }

    .article-content {
      font-size: 16px; line-height: 1.8; color: #333;
    }
    .article-content h2,
    .article-content h3 {
      margin: 28px 0 14px; color: #1a1a1a; font-weight: 600;
    }
    .article-content h2 { font-size: 22px; }
    .article-content h3 { font-size: 18px; }
    .article-content p { margin: 0 0 16px; }
    .article-content img {
      max-width: 100%; border-radius: 8px; margin: 16px 0;
    }
    .article-content a { color: #0078d4; }
    .article-content blockquote {
      border-left: 4px solid #0078d4;
      padding: 12px 20px; margin: 16px 0;
      background: #f8f9fa; border-radius: 0 8px 8px 0;
      color: #555;
    }
    .article-content ul, .article-content ol {
      padding-left: 24px; margin: 12px 0;
    }
    .article-content li { margin-bottom: 8px; }
    .article-content pre {
      background: #1e1e1e; color: #d4d4d4; padding: 16px;
      border-radius: 8px; overflow-x: auto; font-size: 14px;
    }
    .article-content code {
      background: #f0f0f0; padding: 2px 6px;
      border-radius: 4px; font-size: 14px;
    }
    .article-content pre code {
      background: none; padding: 0;
    }

    .article-tags {
      display: flex; gap: 8px; flex-wrap: wrap;
      margin-top: 32px; padding-top: 24px;
      border-top: 1px solid #eee;
    }
    .tag {
      padding: 4px 14px; background: #f0f0f0;
      border-radius: 14px; font-size: 13px; color: #666;
    }

    .sidebar { display: flex; flex-direction: column; gap: 24px; }
    .sidebar-card {
      background: #fff; border-radius: 12px; padding: 20px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .sidebar-card h4 {
      font-size: 16px; font-weight: 600; margin: 0 0 16px;
      padding-bottom: 12px; border-bottom: 2px solid #0078d4;
      color: #1a1a1a;
    }

    .related-item {
      display: flex; gap: 12px; padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
      text-decoration: none; color: inherit; cursor: pointer;
    }
    .related-item:last-child { border: none; }
    .related-item img {
      width: 80px; height: 56px; object-fit: cover;
      border-radius: 6px; flex-shrink: 0;
    }
    .related-item .r-title {
      font-size: 14px; color: #333; line-height: 1.4;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .related-item .r-date { font-size: 12px; color: #999; margin-top: 4px; }
    .related-item:hover .r-title { color: #0078d4; }

    .popular-item {
      display: flex; gap: 12px; padding: 10px 0; align-items: flex-start;
      border-bottom: 1px solid #f0f0f0;
      text-decoration: none; color: inherit; cursor: pointer;
    }
    .popular-item:last-child { border: none; }
    .popular-num {
      font-size: 20px; font-weight: 700; color: #ddd;
      width: 28px; text-align: center; flex-shrink: 0; line-height: 1.2;
    }
    .popular-item:nth-child(1) .popular-num,
    .popular-item:nth-child(2) .popular-num,
    .popular-item:nth-child(3) .popular-num { color: #0078d4; }
    .popular-item .p-title {
      font-size: 14px; color: #333; line-height: 1.4;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .popular-item:hover .p-title { color: #0078d4; }

    .back-link {
      display: inline-flex; align-items: center; gap: 6px;
      margin-top: 32px; padding: 10px 24px; border-radius: 8px;
      background: #f0f0f0; color: #333; text-decoration: none;
      font-size: 14px; transition: background 0.2s; cursor: pointer;
      border: none; font-family: inherit;
    }
    .back-link:hover { background: #e0e0e0; }

    @media (max-width: 900px) {
      .container { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .article-header h1 { font-size: 22px; }
      .container { padding: 24px 16px; }
    }
  `;

  constructor() {
    super();
    this.slug = '';
    this.data = null;
    this.loading = true;
  }

  updated(changed) {
    if (changed.has('slug') && this.slug) {
      this._loadData();
    }
  }

  async _loadData() {
    this.loading = true;
    try {
      const res = await fetch(`/api/article/${encodeURIComponent(this.slug)}`);
      if (res.ok) {
        this.data = await res.json();
      } else {
        this.data = null;
      }
    } catch (e) {
      console.error('Failed to load article:', e);
      this.data = null;
    }
    this.loading = false;
  }

  _navigate(slug) {
    if (window.msApp) {
      window.msApp.navigate(`/article/${slug}`);
    } else {
      window.location.href = `/article/${slug}`;
    }
  }

  _goBack() {
    if (window.msApp) {
      window.msApp.navigate('/articles');
    } else {
      window.location.href = '/articles';
    }
  }

  _formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  render() {
    if (this.loading) {
      return html`<div class="loading"><div class="loading-spinner"></div><br>正在加载...</div>`;
    }
    if (!this.data || !this.data.article) {
      return html`<div class="loading">文章不存在或已被删除</div>`;
    }

    const { article, related, popular } = this.data;

    return html`
      <div class="container">
        <div class="main-content">
          <div class="breadcrumb">
            <a href="/articles" data-nav>资讯中心</a>
            ${article.category ? html` &gt; <a href="javascript:void(0)" @click=${() => this._goBack()}>${article.category}</a>` : ''}
            &gt; <span>${article.title}</span>
          </div>

          <div class="article-header">
            <h1>${article.title}</h1>
            <div class="article-meta">
              ${article.category ? html`<span class="cat">${article.category}</span>` : ''}
              ${article.author ? html`<span><svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a4 4 0 110 8 4 4 0 010-8zm0 1.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.25 16.5a5.75 5.75 0 0111.5 0 .75.75 0 01-1.5 0 4.25 4.25 0 00-8.5 0 .75.75 0 01-1.5 0z"/></svg>${article.author}</span>` : ''}
              <span><svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M7 2a1 1 0 011 1v1h4V3a1 1 0 112 0v1h1.5A2.5 2.5 0 0118 6.5v9a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 012 15.5v-9A2.5 2.5 0 014.5 4H6V3a1 1 0 011-1zm-2.5 6v7.5a1 1 0 001 1h9a1 1 0 001-1V8h-11z"/></svg>${this._formatDate(article.created_at)}</span>
              <span><svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 4.5C5.813 4.5 2.257 7.473 1.088 9.667a.75.75 0 000 .666C2.257 12.527 5.813 15.5 10 15.5s7.743-2.973 8.912-5.167a.75.75 0 000-.666C17.743 7.473 14.187 4.5 10 4.5zM10 13a3 3 0 110-6 3 3 0 010 6z"/></svg>${article.views || 0} 阅读</span>
            </div>
          </div>

          ${article.cover_image ? html`
            <img class="cover-img" src="${article.cover_image}" alt="${article.title}">
          ` : ''}

          <div class="article-content">
            ${unsafeHTML(article.content || '')}
          </div>

          ${article.keywords ? html`
            <div class="article-tags">
              ${article.keywords.split(',').map(k => k.trim()).filter(Boolean).map(k => html`
                <span class="tag">${k}</span>
              `)}
            </div>
          ` : ''}

          <button class="back-link" @click=${this._goBack}>← 返回资讯列表</button>
        </div>

        <div class="sidebar">
          ${related && related.length > 0 ? html`
            <div class="sidebar-card">
              <h4>相关推荐</h4>
              ${related.map(r => html`
                <a class="related-item" @click=${(e) => { e.preventDefault(); this._navigate(r.slug); }}>
                  ${r.cover_image ? html`<img src="${r.cover_image}" alt="${r.title}" loading="lazy">` : ''}
                  <div>
                    <div class="r-title">${r.title}</div>
                    <div class="r-date">${this._formatDate(r.created_at)}</div>
                  </div>
                </a>
              `)}
            </div>
          ` : ''}

          ${popular && popular.length > 0 ? html`
            <div class="sidebar-card">
              <h4>热门文章</h4>
              ${popular.map((p, i) => html`
                <a class="popular-item" @click=${(e) => { e.preventDefault(); this._navigate(p.slug); }}>
                  <span class="popular-num">${i + 1}</span>
                  <div class="p-title">${p.title}</div>
                </a>
              `)}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}
customElements.define('article-detail-page', ArticleDetailPage);
