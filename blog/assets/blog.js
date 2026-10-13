(() => {
  'use strict';
  const posts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];
  const dict = {
    zh: {intro:'文字、观察与日常的存档。',allPosts:'所有文章',searchLabel:'搜索文章',search:'搜索文章 / Search',footer:'这里的内容属于个人存档。',back:'← 返回文章列表',all:'全部',notes:'随笔',design:'设计',other:'其他',none:'没有找到符合条件的文章。',missing:'文章不存在，或已被移除。',article:'文章'},
    ja: {intro:'言葉、観察、日々の記録。',allPosts:'記事一覧',searchLabel:'記事を検索',search:'記事を検索 / Search',footer:'ここは個人のアーカイブです。',back:'← 記事一覧へ戻る',all:'すべて',notes:'雑記',design:'デザイン',other:'その他',none:'該当する記事はありません。',missing:'記事が見つからないか、削除されました。',article:'記事'}
  };
  let lang = 'zh';
  try { lang = localStorage.getItem('lain-blog-lang') === 'ja' ? 'ja' : 'zh'; } catch (_) {}
  let category = 'all';
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const t = (post, field) => post[field]?.[lang] ?? post[field]?.zh ?? '';
  const cat = name => dict[lang][name] || name;
  function applyLanguage() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'ja';
    $('lang-toggle').textContent = lang === 'zh' ? '日本語' : '中文';
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = dict[lang][el.dataset.i18n] || ''; });
    if ($('search')) $('search').placeholder = dict[lang].search;
    if (document.body.dataset.page === 'index') renderIndex(); else renderPost();
  }
  function renderIndex() {
    const filters = $('filters');
    const categories = ['all',...new Set(posts.map(p => p.category || 'other'))];
    filters.innerHTML = categories.map(c => `<button type="button" data-cat="${esc(c)}" aria-pressed="${c===category}">${esc(cat(c))}</button>`).join('');
    const q = $('search').value.trim().toLocaleLowerCase();
    const visible = [...posts].filter(p => (category === 'all' || p.category === category) && (!q || [p.title?.zh,p.title?.ja,p.excerpt?.zh,p.excerpt?.ja,p.category].join(' ').toLocaleLowerCase().includes(q))).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
    $('count').textContent = String(visible.length).padStart(2,'0') + ' ENTRIES';
    $('posts').innerHTML = visible.map(p => `<article class="post"><time class="post-date" datetime="${esc(p.date)}">${esc(p.date)}</time><div><h3><a href="post.html?id=${encodeURIComponent(p.id)}">${esc(t(p,'title'))} ↗</a></h3><p>${esc(t(p,'excerpt'))}</p></div><span class="post-meta">${esc(cat(p.category || 'other'))}</span></article>`).join('');
    $('empty').hidden = visible.length > 0;
    $('empty').textContent = dict[lang].none;
  }
  function renderPost() {
    const id = new URLSearchParams(location.search).get('id');
    const p = posts.find(p => p.id === id);
    if (!p) { $('article').innerHTML = `<div class="article-header"><h1>${esc(dict[lang].missing)}</h1></div>`; document.title = '404 / Lain Visual'; return; }
    document.title = t(p,'title') + ' / Lain Visual';
    const paragraphs = p.body?.[lang] || p.body?.zh || [];
    $('article').innerHTML = `<header class="article-header"><div class="eyebrow">${esc(cat(p.category || 'other'))} / <time datetime="${esc(p.date)}">${esc(p.date)}</time></div><h1>${esc(t(p,'title'))}</h1><p class="subtitle">${esc(t(p,'excerpt'))}</p></header><div class="article-body">${paragraphs.map(s=>`<p>${esc(s)}</p>`).join('')}</div>`;
  }
  $('year').textContent = new Date().getFullYear();
  $('lang-toggle').addEventListener('click', () => { lang = lang === 'zh' ? 'ja' : 'zh'; try {localStorage.setItem('lain-blog-lang',lang);} catch (_) {} applyLanguage(); });
  if ($('search')) {
    $('search').addEventListener('input',renderIndex);
    $('filters').addEventListener('click',e=>{const b=e.target.closest('button[data-cat]');if(!b)return;category=b.dataset.cat;renderIndex();});
  }
  applyLanguage();
})();
