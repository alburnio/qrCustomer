// Firebase integration structure. Phase 1 only prepares this; nothing is written without configuration.
const env = import.meta.env;
const config = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  appId: env.VITE_FIREBASE_APP_ID
};
export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

let appPromise;
// Lazy-loaded so the demo build does not download Firebase code.
export async function getApp() {
  if (!isFirebaseConfigured) throw new Error('Firebase belum dikonfigurasi.');
  appPromise ||= import('firebase/app').then((m) => m.initializeApp(config));
  return appPromise;
}
export async function getDb() {
  const [app, fs] = await Promise.all([getApp(), import('firebase/firestore')]);
  return { db: fs.getFirestore(app), fs };
}
export async function getFns() {
  const [app, fn] = await Promise.all([getApp(), import('firebase/functions')]);
  return { fns: fn.getFunctions(app), fn };
}
