// TEMPORARY SAMPLE DATA for interface testing only. Never used when Firebase is configured.
export const sampleSettings = {
  name: 'Kedai Contoh', hours: 'Setiap hari, 10:00 pagi - 9:00 malam', phone: '012-345 6789',
  announcement: 'MOD DEMO: produk ini hanya contoh untuk ujian antaramuka.',
  deliveryFee: 5, minOrder: 10,
  payments: ['cash', 'duitnow', 'bank', 'cod']
};
export const sampleCategories = [
  { id: 'nasi', name: 'Nasi' }, { id: 'mee', name: 'Mee' },
  { id: 'lauk', name: 'Lauk' }, { id: 'minuman', name: 'Minuman' }
];
export const sampleProducts = [
  { id: 'p1', name: 'Nasi Ayam Goreng', category: 'nasi', price: 9.5, emoji: '🍗', hue: 28, popular: true, stock: 20, description: 'Nasi putih dengan ayam goreng berempah yang rangup, disertai sambal dan timun.' },
  { id: 'p2', name: 'Nasi Lemak Special', category: 'nasi', price: 8, emoji: '🍚', hue: 120, popular: true, stock: null, description: 'Nasi lemak santan dengan telur, ikan bilis, kacang dan sambal tumis.' },
  { id: 'p3', name: 'Mee Goreng Mamak', category: 'mee', price: 7, emoji: '🍜', hue: 12, popular: true, stock: null, description: 'Mee goreng pedas ala mamak dengan tauhu, telur dan sayur.' },
  { id: 'p4', name: 'Kuey Teow Kerang', category: 'mee', price: 9, emoji: '🍝', hue: 48, popular: false, stock: 5, description: 'Kuey teow goreng berapi bersama kerang segar.' },
  { id: 'p5', name: 'Ayam Masak Merah', category: 'lauk', price: 6, emoji: '🍖', hue: 5, popular: false, stock: null, description: 'Lauk ayam dimasak dalam kuah merah pekat.' },
  { id: 'p6', name: 'Sambal Sotong', category: 'lauk', price: 7.5, emoji: '🦑', hue: 350, popular: false, stock: 0, description: 'Sotong tumis sambal pedas manis.' },
  { id: 'p7', name: 'Teh Tarik', category: 'minuman', price: 3, emoji: '🧋', hue: 35, popular: true, stock: null, description: 'Teh tarik panas atau sejuk.' },
  { id: 'p8', name: 'Sirap Bandung', category: 'minuman', price: 3.5, emoji: '🥤', hue: 330, popular: false, stock: null, description: 'Sirap ros dengan susu, sejuk menyegarkan.' }
].map((p) => ({ active: true, createdAt: 0, ...p }));
