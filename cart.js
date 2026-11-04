import { cart } from '../state/cart.js';
import { loadMenu } from '../services/menuService.js';
import { stepper } from '../components/ui.js';
import { esc, rm, placeholderImg } from '../utils/format.js';

export async function render(el) {
  const { settings } = await loadMenu();
  const paint = () => {
    const items = cart.items;
    if (!items.length) { el.innerHTML = '<section class="page"><h2>Troli Anda</h2><p class="empty">Troli masih kosong.</p><a class="btn primary" href="#/">Lihat Menu</a></section>'; return; }
    const sub = cart.subtotal(), below = sub < settings.minOrder;
    el.innerHTML = `<section class="page"><a href="#/" class="back">← Tambah item lagi</a><h2>Troli Anda</h2>
    ${items.map((i) => `<div class="line"><img src="${esc(i.image || placeholderImg(i.emoji, i.hue))}" alt=""><div><b>${esc(i.name)}</b><br><span class="price">${rm(i.price * i.qty)}</span></div>
      ${stepper(i.qty, `data-id="${esc(i.id)}"`)}
      <input data-note="${esc(i.id)}" maxlength="200" placeholder="Arahan khas" value="${esc(i.note)}">
      <button class="link" data-rm="${esc(i.id)}">Buang</button></div>`).join('')}
    <div class="sum"><div><span>Subjumlah</span><span>${rm(sub)}</span></div><div><span>Caj penghantaran</span><span>dikira di pembayaran</span></div></div>
    ${below ? `<p class="err">Pesanan minimum ${rm(settings.minOrder)}.</p>` : ''}
    <a class="btn primary block ${below ? 'disabled' : ''}" ${below ? 'aria-disabled="true"' : 'href="#/checkout"'}>Teruskan ke Pembayaran</a>
    <button class="btn block" data-clear style="margin-top:8px">Kosongkan Troli</button></section>`;
  };
  paint();
  el.onclick = (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.d) { const i = cart.items.find((x) => x.id === b.dataset.id); cart.setQty(b.dataset.id, i.qty + +b.dataset.d); paint(); }
    else if (b.dataset.rm) { cart.remove(b.dataset.rm); paint(); }
    else if (b.dataset.clear !== undefined) { cart.clear(); paint(); }
  };
  el.oninput = (e) => { if (e.target.dataset.note) cart.setNote(e.target.dataset.note, e.target.value); };
  return () => { el.onclick = null; el.oninput = null; };
}
