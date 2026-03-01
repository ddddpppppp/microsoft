import { LitElement, html, css } from 'lit';
import { updatePageMeta } from '../utils/seo.js';

class ArticlesPage extends LitElement {
  static properties = {
    data: { type: Object },
    loading: { type: Boolean },
    currentPage: { type: Number },
    currentCategory: { type: String }
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

    .page-banner {
      background: linear-gradient(135deg, #0078d4 0%, #004578 100%);
      color: #fff; padding: 48px 0 40px; margin-bottom: 40px;
    }
    .page-banner .inner {
      max-width: 1200px; margin: 0 auto; padding: 0 24px;
    }
    .page-banner h1 { font-size: 32px; font-weight: 700; margin: 0 0 8px; }
    .page-banner p { font-size: 15px; opacity: 0.85; margin: 0; }

    .container {
      max-width: 1200px; margin: 0 auto; padding: 0 24px;
      display: grid; grid-template-columns: 1fr 320px; gap: 40px;
    }

    .categories {
      display: flex; gap: 8px; margin-bottom: 28px; flex-wrap: wrap;
    }
    .cat-tag {
      display: inline-block; padding: 6px 16px; border-radius: 20px;
      font-size: 13px; font-weight: 500; cursor: pointer;
      background: #f0f0f0; color: #333; border: none;
      transition: all 0.2s; font-family: inherit;
    }
    .cat-tag:hover { background: #e0e0e0; }
    .cat-tag.active {
      background: #0078d4; color: #fff;
    }

    .article-list { display: flex; flex-direction: column; gap: 24px; }
    .article-card {
      display: flex; gap: 20px; background: #fff;
      border-radius: 12px; overflow: hidden;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      transition: box-shadow 0.25s, transform 0.25s;
      cursor: pointer; text-decoration: none; color: inherit;
    }
    .article-card:hover {
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      transform: translateY(-2px);
    }
    .article-cover {
      width: 260px; min-height: 180px; flex-shrink: 0;
      object-fit: cover; background: #f0f0f0;
    }
    .article-cover.placeholder {
      display: flex; align-items: center; justify-content: center;
      color: #bbb; font-size: 40px; background: linear-gradient(135deg, #e8f4fd, #f0f0f0);
    }
    .article-body { padding: 20px 20px 20px 0; flex: 1; display: flex; flex-direction: column; }
    .article-meta {
      display: flex; align-items: center; gap: 12px;
      font-size: 12px; color: #999; margin-bottom: 10px;
    }
    .article-meta .cat {
      background: #e8f4fd; color: #0078d4; padding: 2px 10px;
      border-radius: 10px; font-weight: 500;
    }
    .article-body h3 {
      font-size: 18px; font-weight: 600; margin: 0 0 10px;
      color: #1a1a1a; line-height: 1.4;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .article-body .summary {
      font-size: 14px; color: #666; line-height: 1.6; flex: 1;
      display: -webkit-box; -webkit-line-clamp: 3;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .article-footer {
      display: flex; align-items: center; gap: 16px;
      font-size: 12px; color: #999; margin-top: 12px;
    }
    .article-footer span { display: flex; align-items: center; gap: 4px; }
    .meta-icon { width: 14px; height: 14px; flex-shrink: 0; opacity: 0.55; }

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
    .rec-list { list-style: none; padding: 0; margin: 0; }
    .rec-list li { padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
    .rec-list li:last-child { border: none; }
    .rec-list a {
      text-decoration: none; color: #333; font-size: 14px;
      line-height: 1.5; display: block; transition: color 0.2s;
    }
    .rec-list a:hover { color: #0078d4; }
    .rec-list .rec-meta { font-size: 12px; color: #999; margin-top: 4px; }

    .rec-cover-item {
      display: flex; gap: 12px; padding: 10px 0;
      border-bottom: 1px solid #f0f0f0; text-decoration: none; color: inherit;
    }
    .rec-cover-item:last-child { border: none; }
    .rec-cover-item img {
      width: 80px; height: 56px; object-fit: cover;
      border-radius: 6px; flex-shrink: 0;
    }
    .rec-cover-item .rec-text {
      font-size: 14px; color: #333; line-height: 1.4;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical; overflow: hidden;
    }
    .rec-cover-item:hover .rec-text { color: #0078d4; }

    .pagination {
      display: flex; justify-content: center; gap: 8px;
      margin-top: 32px;
    }
    .page-btn {
      padding: 8px 16px; border-radius: 8px; border: 1px solid #ddd;
      background: #fff; color: #333; cursor: pointer; font-size: 14px;
      transition: all 0.2s; font-family: inherit;
    }
    .page-btn:hover { border-color: #0078d4; color: #0078d4; }
    .page-btn.active {
      background: #0078d4; color: #fff; border-color: #0078d4;
    }
    .page-btn:disabled { opacity: 0.5; cursor: default; }

    @media (max-width: 900px) {
      .container { grid-template-columns: 1fr; }
      .article-card { flex-direction: column; }
      .article-cover { width: 100%; min-height: 200px; }
      .article-body { padding: 16px; }
    }
    @media (max-width: 600px) {
      .page-banner h1 { font-size: 24px; }
      .page-banner { padding: 32px 0 24px; margin-bottom: 24px; }
    }
  `;

  constructor() {
    super();
    this.data = null;
    this.loading = true;
    this.currentPage = 1;
    this.currentCategory = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
  }

  async _loadData() {
    this.loading = true;
    try {
      const params = new URLSearchParams();
      params.set('page', this.currentPage);
      if (this.currentCategory) params.set('category', this.currentCategory);
      const res = await fetch(`/api/articles?${params}`);
      this.data = await res.json();
      if (this.data?.seo) {
        const s = this.data.seo;
        updatePageMeta({ title: s.title, keywords: s.keywords, description: s.description });
      }
    } catch (e) {
      console.error('Failed to load articles:', e);
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

  _changeCategory(cat) {
    this.currentCategory = cat;
    this.currentPage = 1;
    this._loadData();
  }

  _changePage(page) {
    this.currentPage = page;
    this._loadData();
    this.scrollIntoView({ behavior: 'smooth' });
  }

  _formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - d) / 86400000);
    if (diff === 0) return '今天';
    if (diff === 1) return '昨天';
    if (diff < 7) return `${diff}天前`;
    return d.toLocaleDateString('zh-CN');
  }

  _renderArticleCard(article) {
    return html`
      <a class="article-card" @click=${(e) => { e.preventDefault(); this._navigate(article.slug); }}>
        ${article.cover_image
          ? html`<img class="article-cover" src="${article.cover_image}" alt="${article.title}" loading="lazy">`
          : html`<div class="article-cover placeholder"><svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6zm7 1.5L18.5 9H14a1 1 0 01-1-1V3.5zM8 12h8v1.5H8V12zm0 4h5v1.5H8V16z"/></svg></div>`
        }
        <div class="article-body">
          <div class="article-meta">
            ${article.category ? html`<span class="cat">${article.category}</span>` : ''}
            <span>${this._formatDate(article.created_at)}</span>
            ${article.author ? html`<span>${article.author}</span>` : ''}
          </div>
          <h3>${article.title}</h3>
          <div class="summary">${article.summary || ''}</div>
          <div class="article-footer">
            <span><svg class="meta-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10 4.5C5.813 4.5 2.257 7.473 1.088 9.667a.75.75 0 000 .666C2.257 12.527 5.813 15.5 10 15.5s7.743-2.973 8.912-5.167a.75.75 0 000-.666C17.743 7.473 14.187 4.5 10 4.5zM10 13a3 3 0 110-6 3 3 0 010 6z"/></svg>${article.views || 0} 阅读</span>
          </div>
        </div>
      </a>
    `;
  }

  render() {
    if (this.loading) {
      return html`<div class="loading"><div class="loading-spinner"></div><br>正在加载...</div>`;
    }
    if (!this.data) {
      return html`<div class="loading">加载失败，请刷新重试</div>`;
    }

    const { articles, pagination, categories, recommended } = this.data;

    return html`
      <div class="page-banner">
        <div class="inner">
          <h1>资讯中心</h1>
          <p>发现最新技术资讯、使用教程和行业动态</p>
        </div>
      </div>

      <div class="container">
        <div class="main-content">
          ${(categories && categories.length > 0) ? html`
            <div class="categories">
              <button class="cat-tag ${!this.currentCategory ? 'active' : ''}"
                @click=${() => this._changeCategory('')}>全部</button>
              ${categories.map(c => html`
                <button class="cat-tag ${this.currentCategory === c.category ? 'active' : ''}"
                  @click=${() => this._changeCategory(c.category)}>
                  ${c.category} (${c.count})
                </button>
              `)}
            </div>
          ` : ''}

          <div class="article-list">
            ${articles && articles.length > 0
              ? articles.map(a => this._renderArticleCard(a))
              : html`<div class="loading" style="padding:60px 0">暂无资讯</div>`
            }
          </div>

          ${pagination && pagination.total_pages > 1 ? html`
            <div class="pagination">
              <button class="page-btn" ?disabled=${pagination.page <= 1}
                @click=${() => this._changePage(pagination.page - 1)}>上一页</button>
              ${Array.from({length: pagination.total_pages}, (_, i) => i + 1).map(p => html`
                <button class="page-btn ${p === pagination.page ? 'active' : ''}"
                  @click=${() => this._changePage(p)}>${p}</button>
              `)}
              <button class="page-btn" ?disabled=${pagination.page >= pagination.total_pages}
                @click=${() => this._changePage(pagination.page + 1)}>下一页</button>
            </div>
          ` : ''}
        </div>

        <div class="sidebar">
          ${recommended && recommended.length > 0 ? html`
            <div class="sidebar-card">
              <h4>推荐阅读</h4>
              <div>
                ${recommended.map(r => html`
                  <a class="rec-cover-item" @click=${(e) => { e.preventDefault(); this._navigate(r.slug); }}>
                    ${r.cover_image
                      ? html`<img src="${r.cover_image}" alt="${r.title}" loading="lazy">`
                      : ''
                    }
                    <div>
                      <div class="rec-text">${r.title}</div>
                      <div class="rec-meta">${this._formatDate(r.created_at)}</div>
                    </div>
                  </a>
                `)}
              </div>
            </div>
          ` : ''}

          ${categories && categories.length > 0 ? html`
            <div class="sidebar-card">
              <h4>文章分类</h4>
              <ul class="rec-list">
                ${categories.map(c => html`
                  <li>
                    <a href="javascript:void(0)" @click=${() => this._changeCategory(c.category)}>
                      ${c.category}
                      <span style="float:right;color:#999">${c.count}</span>
                    </a>
                  </li>
                `)}
              </ul>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}
customElements.define('articles-page', ArticlesPage);
