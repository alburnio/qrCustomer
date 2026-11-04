const routes = [];
export const route = (re, mod) => routes.push({ re, mod });
export const go = (path) => { location.hash = path; };

let cleanup = null;
let token = 0;
export function start(el) {
  const run = async () => {
    const me = ++token;
    const path = location.hash.slice(1) || '/';
    if (cleanup) { cleanup(); cleanup = null; }
    for (const r of routes) {
      const m = path.match(r.re);
      if (!m) continue;
      window.scrollTo(0, 0);
      const c = await r.mod.render(el, m.slice(1).map(decodeURIComponent));
      if (me === token) cleanup = c || null; else if (c) c();
      return;
    }
    el.innerHTML = '<section class="page"><p class="empty">Halaman tidak dijumpai.</p><a class="btn primary" href="#/">Ke Laman Utama</a></section>';
  };
  addEventListener('hashchange', run);
  run();
}
