import { findProduct } from '../services/menuService.js';
import { cart } from '../state/cart.js';
import { toast, stepper } from '../components/ui.js';
import { esc, rm, imgOf } from '../utils/format.js';

export async function render(el, [id]) {
  const p = await findProduct(id);
  if (!p) { el.innerHTML = '<section class="page"><p class="empty">Produk tidak dijumpai.</p><a class="btn primary" href="#/">Kembali ke Menu</a></section>'; return; }
  let qty = 1;
  const out = p.stock === 0, max = p.stock == null ? 99 : p.stock;
  el.innerHTML = `<section class="page detail"><a href="#/" class="back">← Kembali</a>
  <img class="big" src="${esc(imgOf(p))}" alt="${esc(p.name)}">
  <h2>${esc(p.name)}</h2><p class="price lg">${rm(p.price)}</p><p class="mut">${esc(p.description)}</p>
  ${out ? '<p class="badge">Habis stok</p>' : p.stock != null && p.stock <= 5 ? `<p class="badge">Tinggal ${p.stock} sahaja</p>` : ''}
  <label>Arahan khas (pilihan)</label><textarea id="note" rows="2" maxlength="200" placeholder="cth: kurang pedas"></textarea>
  <div class="row"><div id="q">${stepper(qty)}</div><button id="add" class="btn primary grow" ${out ? 'disabled' : ''}>Tambah ke Troli</button></div>
  <a class="btn block" href="#/cart">Lihat Troli</a></section>`;
  el.onclick = (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.d) { qty = Math.max(1, Math.min(max, qty + +b.dataset.d)); el.querySelector('#q').innerHTML = stepper(qty); }
    else if (b.id === 'add') { cart.add(p, qty, el.querySelector('#note').value.trim()); toast(`${qty} × ${p.name} ditambah`); }
  };
  return () => { el.onclick = null; };
}
