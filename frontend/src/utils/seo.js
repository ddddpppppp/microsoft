function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (content) {
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  } else if (el) {
    el.remove();
  }
}

export function updatePageMeta({ title, keywords, description }) {
  if (title) document.title = title;
  setMeta('keywords', keywords || '');
  setMeta('description', description || '');
}
