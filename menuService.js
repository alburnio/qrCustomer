import { isFirebaseConfigured, getDb } from './firebase.js';
import { sampleSettings, sampleCategories, sampleProducts } from '../data/sampleData.js';

let cache;
// Returns { demo, settings, categories, products }.
export async function loadMenu() {
  if (cache) return cache;
  if (!isFirebaseConfigured) {
    cache = { demo: true, settings: sampleSettings, categories: sampleCategories, products: sampleProducts };
    return cache;
  }
  // Phase 2 will populate these collections from the admin dashboard.
  const { db, fs } = await getDb();
  const [s, c, p] = await Promise.all([
    fs.getDoc(fs.doc(db, 'business_settings', 'main')),
    fs.getDocs(fs.collection(db, 'categories')),
    fs.getDocs(fs.query(fs.collection(db, 'products'), fs.where('active', '==', true)))
  ]);
  cache = {
    demo: false,
    settings: s.exists() ? s.data() : { ...sampleSettings, name: 'Kedai Anda', announcement: '', phone: '', payments: ['cash'] },
    categories: c.docs.map((d) => ({ id: d.id, ...d.data() })),
    products: p.docs.map((d) => ({ id: d.id, ...d.data() }))
  };
  return cache;
}
export const findProduct = async (id) => (await loadMenu()).products.find((p) => p.id === id);
