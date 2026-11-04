import { loadMenu } from '../services/menuService.js';
import { cart } from '../state/cart.js';
import { toast } from '../components/ui.js';
import { esc, rm, imgOf } from '../utils/format.js';

const card = (p) => `<article class="card"><a href="#/product/${esc(p.id)}"><img loading="lazy" src="${esc(imgOf(p))}" alt="${esc(p.name)}"></a>
<div class="b"><a href="#/product/${esc(p.id)}"><h4>${esc(p.name)}</h4></a><span class="price">${rm(p.price)}</span>
${p.stock === 0 ? '<span class="badge">Habis stok</span>' : ''}
<button class="btn primary" data-add="${esc(p.id)}" ${p.stock === 0 ? 'disabled' : ''}>Tambah</button></div></article>`;

export async function render(el) {
  el.innerHTML = '<section class="page"><p class="empty">Memuatkan menu…</p></section>';
  let m;
  try { m = await loadMenu(); } catch { el.innerHTML = '<section class="page"><p class="empty">Menu gagal dimuatkan. Sila cuba lagi.</p><button class="btn primary" onclick="location.reload()">Muat Semula</button></section>'; return; }
  const { settings: s, categories, products } = m;
  let cat = 'all';
  const paint = () => {
    const list = products.filter((p) => cat === 'all' || p.category === cat);
    const pop = products.filter((p) => p.popular);
    el.innerHTML = `<section class="hero"><h2>${esc(s.name)}</h2><p>🕒 ${esc(s.hours || '')}</p><p>📞 ${esc(s.phone || '')}</p>${s.announcement ? `<p class="ann">📢 ${esc(s.announcement)}</p>` : ''}</section>
    <section class="page">
    <nav class="chips">${[{ id: 'all', name: 'Semua' }, ...categories].map((c) => `<button class="chip ${c.id === cat ? 'on' : ''}" data-cat="${esc(c.id)}">${esc(c.name)}</button>`).join('')}</nav>
    ${cat === 'all' && pop.length ? `<h3>⭐ Popular</h3><div class="grid">${pop.map(card).join('')}</div>` : ''}
    <h3>${cat === 'all' ? 'Semua Menu' : esc(categories.find((c) => c.id === cat)?.name || '')}</h3>
    ${list.length ? `<div class="grid">${list.map(card).join('')}</div>` : '<p class="empty">Tiada produk dalam kategori ini.</p>'}</section>`;
  };
  paint();
  el.onclick = (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.cat) { cat = b.dataset.cat; paint(); }
    else if (b.dataset.add) { const p = products.find((x) => x.id === b.dataset.add); cart.add(p); toast(`${p.name} ditambah ke troli`); }
  };
  return () => { el.onclick = null; };
}
