import { go } from '../router.js';

export function render(el) {
  el.innerHTML = `<section class="page"><a href="#/" class="back">← Kembali</a><h2>Semak Pesanan</h2>
  <form id="f"><label for="no">Nombor pesanan</label><input id="no" required placeholder="MB261104-AB12">
  <p class="err" id="err" role="alert"></p><button class="btn primary block">Semak</button></form></section>`;
  el.querySelector('#f').onsubmit = (e) => {
    e.preventDefault();
    const v = el.querySelector('#no').value.trim();
    if (v.length < 6) { el.querySelector('#err').textContent = 'Masukkan nombor pesanan yang sah.'; return; }
    go('/order/' + encodeURIComponent(v.toUpperCase()));
  };
}
