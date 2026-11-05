import { isFirebaseConfigured, getFns } from './firebase.js';

const KEY = 'mybiz_demo_orders';
const read = () => { try { return JSON.parse(sessionStorage.getItem(KEY) || '{}'); } catch { return {}; } };
const write = (o) => { try { sessionStorage.setItem(KEY, JSON.stringify(o)); } catch { /* ignore */ } };

export const STATUS_MS = {
  'New Order': 'Pesanan Baru', 'Accepted': 'Diterima', 'Preparing': 'Sedang Disediakan',
  'Ready for Pickup': 'Sedia Diambil', 'Out for Delivery': 'Dalam Penghantaran', 'Completed': 'Selesai', 'Cancelled': 'Dibatalkan'
};
export const flowFor = (type) =>
  type === 'delivery' ? ['New Order', 'Accepted', 'Preparing', 'Out for Delivery', 'Completed']
  : type === 'dinein' ? ['New Order', 'Accepted', 'Preparing', 'Completed']
  : ['New Order', 'Accepted', 'Preparing', 'Ready for Pickup', 'Completed'];

// payload: { name, phone, type, address, pickupTime, table, payment, notes, items:[{id,qty,note}] }
export async function placeOrder(payload, displayTotals) {
  if (isFirebaseConfigured) {
    // Phase 2: trusted Cloud Function recalculates prices/stock and issues the order number.
    try {
      const { fns, fn } = await getFns();
      const res = await fn.httpsCallable(fns, 'placeOrder')(payload);
      return res.data;
    } catch {
      throw new Error('Pelayan tempahan belum tersedia (Fasa 2). Sila cuba lagi kemudian.');
    }
  }
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const orderNo = `MB${stamp}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const order = { orderNo, ...payload, ...displayTotals, status: 'New Order', paymentStatus: 'pending', createdAt: Date.now(), demo: true };
  const all = read(); all[orderNo] = order; write(all);
  return order;
}
export async function getOrder(orderNo) {
  return read()[(orderNo || '').trim().toUpperCase()] || null;
}
