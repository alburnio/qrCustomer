import { cart } from '../state/cart.js';
import { loadMenu } from '../services/menuService.js';
import { asset, esc } from '../utils/format.js';

let timer;
export function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(timer); timer = setTimeout(() => { t.hidden = true; }, 2400);
}

export async function mountHeader(el) {
  const { settings, demo } = await loadMenu();
  el.innerHTML = `${demo ? '<div class="demo">MOD DEMO: data contoh sahaja</div>' : ''}
  <header class="top"><a class="brand" href="#/"><img src="${asset('logo.svg')}" alt="" width="36" height="36"><span>${esc(settings.name)}</span></a>
  <nav><a class="btn ghost" href="#/track">Semak Pesanan</a><a class="btn cart" href="#/cart" aria-label="Troli">🛒 <b id="cc">0</b></a></nav></header>`;
  const upd = () => { el.querySelector('#cc').textContent = cart.count(); };
  upd(); cart.subscribe(upd);
}

export const stepper = (qty, attr = '') =>
  `<div class="qty"><button type="button" ${attr} data-d="-1" aria-label="Kurang">−</button><b>${qty}</b><button type="button" ${attr} data-d="1" aria-label="Tambah">+</button></div>`;
