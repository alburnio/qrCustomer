import { cart } from '../state/cart.js';
import { loadMenu } from '../services/menuService.js';
import { placeOrder } from '../services/orderService.js';
import { go } from '../router.js';
import { esc, rm, ORDER_TYPES, PAYMENTS } from '../utils/format.js';

export async function render(el) {
  const { settings: s } = await loadMenu();
  if (!cart.items.length) { el.innerHTML = '<section class="page"><p class="empty">Troli kosong.</p><a class="btn primary" href="#/">Lihat Menu</a></section>'; return; }
  el.innerHTML = `<section class="page"><a href="#/cart" class="back">← Troli</a><h2>Pembayaran</h2>
  <form id="f" novalidate>
    <label>Jenis pesanan</label>
    <div class="seg">${Object.entries(ORDER_TYPES).map(([k, v], i) => `<label class="opt"><input type="radio" name="type" value="${k}" ${i ? '' : 'checked'}><span>${v}</span></label>`).join('')}</div>
    <label for="name">Nama</label><input id="name" name="name" maxlength="80" autocomplete="name" required>
    <label for="phone">No. telefon</label><input id="phone" name="phone" type="tel" placeholder="01x-xxxxxxx" autocomplete="tel" required>
    <div data-for="pickup"><label for="pt">Masa ambil</label><input id="pt" name="pickupTime" type="time"></div>
    <div data-for="delivery" hidden><label for="ad">Alamat penghantaran</label><textarea id="ad" name="address" rows="3" maxlength="250"></textarea></div>
    <div data-for="dinein" hidden><label for="tb">No. meja</label><input id="tb" name="table" maxlength="10"></div>
    <label for="pay">Kaedah bayaran</label>
    <select id="pay" name="payment">${(s.payments || ['cash']).map((k) => `<option value="${k}">${PAYMENTS[k] || esc(k)}</option>`).join('')}</select>
    <label for="nt">Nota pesanan</label><textarea id="nt" name="notes" rows="2" maxlength="250"></textarea>
    <div class="sum" id="sum"></div><p class="err" id="err" role="alert"></p>
    <button class="btn primary block" id="sub">Hantar Pesanan</button>
  </form></section>`;
  const f = el.querySelector('#f'), err = el.querySelector('#err');
  const type = () => f.type.value;
  const upd = () => {
    el.querySelectorAll('[data-for]').forEach((d) => { d.hidden = d.dataset.for !== type(); });
    const t = cart.totals(s, type());
    el.querySelector('#sum').innerHTML = `<div><span>Subjumlah</span><span>${rm(t.subtotal)}</span></div><div><span>Caj penghantaran</span><span>${rm(t.delivery)}</span></div><div class="t"><span>Jumlah</span><span>${rm(t.total)}</span></div>`;
  };
  f.addEventListener('change', upd); upd();
  f.onsubmit = async (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f)), phone = d.phone.replace(/[\s-]/g, '');
    if (d.name.trim().length < 2) return (err.textContent = 'Sila masukkan nama.');
    if (!/^(\+?60|0)1\d{8,9}$/.test(phone)) return (err.textContent = 'No. telefon Malaysia tidak sah.');
    if (d.type === 'delivery' && d.address.trim().length < 8) return (err.textContent = 'Sila masukkan alamat penuh.');
    if (d.type === 'dinein' && !d.table.trim()) return (err.textContent = 'Sila masukkan no. meja.');
    if (cart.subtotal() < s.minOrder) return (err.textContent = `Pesanan minimum ${rm(s.minOrder)}.`);
    err.textContent = '';
    const btn = el.querySelector('#sub'); btn.disabled = true; btn.textContent = 'Menghantar…';
    try {
      const payload = { name: d.name.trim(), phone, type: d.type, address: d.type === 'delivery' ? d.address.trim() : '', pickupTime: d.type === 'pickup' ? d.pickupTime : '', table: d.type === 'dinein' ? d.table.trim() : '', payment: d.payment, notes: d.notes.trim(), items: cart.items.map((i) => ({ id: i.id, qty: i.qty, note: i.note })) };
      const t = cart.totals(s, d.type);
      // Display-only snapshot (names/prices) so the demo confirmation can show a summary.
      const order = await placeOrder(payload, { ...t, lines: cart.items.map((i) => ({ name: i.name, price: i.price, qty: i.qty, note: i.note })) });
      cart.clear();
      go('/order/' + encodeURIComponent(order.orderNo));
    } catch (x) { err.textContent = x.message || 'Gagal menghantar pesanan.'; btn.disabled = false; btn.textContent = 'Hantar Pesanan'; }
  };
}
