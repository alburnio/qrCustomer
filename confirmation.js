import { getOrder, STATUS_MS, flowFor } from '../services/orderService.js';
import { esc, rm, ORDER_TYPES, PAYMENTS } from '../utils/format.js';

export async function render(el, [no]) {
  const o = await getOrder(no);
  if (!o) { el.innerHTML = '<section class="page"><h2>Pesanan tidak dijumpai</h2><p class="mut">Semak nombor pesanan anda.</p><a class="btn primary" href="#/track">Semak Pesanan</a></section>'; return; }
  const flow = flowFor(o.type), i = flow.indexOf(o.status);
  el.innerHTML = `<section class="page center"><div class="tick">✅</div><h2>Pesanan diterima!</h2>
  <div class="ordno">${esc(o.orderNo)}</div><p class="mut">Simpan nombor ini untuk semak status pesanan.</p>
  <div class="steps">${flow.map((s, n) => `<span class="${o.status !== 'Cancelled' && n <= i ? 'on' : ''}" title="${esc(STATUS_MS[s])}"></span>`).join('')}</div>
  <p><b>${esc(STATUS_MS[o.status])}</b></p>
  <div class="box left"><p><b>${esc(ORDER_TYPES[o.type])}</b> · ${esc(PAYMENTS[o.payment] || o.payment)}</p>
  ${(o.lines || []).map((l) => `<div class="r"><span>${l.qty} × ${esc(l.name)}</span><span>${rm(l.price * l.qty)}</span></div>`).join('')}
  <div class="r"><span>Penghantaran</span><span>${rm(o.delivery)}</span></div><div class="r t"><span>Jumlah</span><span>${rm(o.total)}</span></div>
  <p class="mut">Status bayaran: menunggu pengesahan kedai.</p></div>
  ${o.demo ? '<p class="mut small">Mod demo: pesanan ini tidak dihantar ke kedai sebenar.</p>' : ''}
  <a class="btn primary" href="#/">Tempah Lagi</a></section>`;
}
