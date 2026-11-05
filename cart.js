const KEY = 'mybiz_cart_v1';
let items = [];
try { items = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { items = []; }
const subs = new Set();
const commit = () => {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
  subs.forEach((f) => f());
};
export const cart = {
  subscribe(f) { subs.add(f); return () => subs.delete(f); },
  get items() { return items; },
  count: () => items.reduce((s, i) => s + i.qty, 0),
  subtotal: () => items.reduce((s, i) => s + i.price * i.qty, 0),
  add(p, qty = 1, note = '') {
    const f = items.find((i) => i.id === p.id);
    const max = p.stock == null ? 99 : p.stock;
    if (f) { f.qty = Math.min(max, f.qty + qty); if (note) f.note = note; }
    else items.push({ id: p.id, name: p.name, price: p.price, qty: Math.min(max, qty), note, image: p.image || '', emoji: p.emoji, hue: p.hue, max });
    commit();
  },
  setQty(id, q) {
    const i = items.find((x) => x.id === id); if (!i) return;
    i.qty = Math.min(i.max, q);
    if (i.qty <= 0) items = items.filter((x) => x.id !== id);
    commit();
  },
  setNote(id, n) { const i = items.find((x) => x.id === id); if (i) { i.note = n.slice(0, 200); commit(); } },
  remove(id) { items = items.filter((x) => x.id !== id); commit(); },
  clear() { items = []; commit(); },
  // Display-only totals. The trusted backend (Phase 2) recalculates before accepting any order.
  totals(settings, type) {
    const subtotal = cart.subtotal();
    const delivery = type === 'delivery' && items.length ? Number(settings.deliveryFee) || 0 : 0;
    return { subtotal, delivery, total: subtotal + delivery };
  }
};
