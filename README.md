# MyBiz POS — Fasa 1: Frontend & Customer Ordering App

Vite + Vanilla JS. Laman pelanggan: menu, kategori, butiran produk, troli, checkout (ambil sendiri / penghantaran / makan di kedai), pengesahan pesanan, semak status. Tiada fungsi admin/kewangan lagi (Fasa 2+).

## Struktur
```
index.html, vite.config.js, package.json, .env.example
public/            favicon.svg, logo.svg, manifest.webmanifest
src/main.js        pintu masuk + laluan
src/router.js      router hash (sesuai GitHub Pages)
src/pages/         home, product, cart, checkout, confirmation, track
src/components/    ui.js (header, toast, stepper)
src/services/      firebase.js (lazy, belum aktif), menuService.js, orderService.js
src/state/cart.js  troli (localStorage untuk troli sahaja)
src/data/          sampleData.js (DATA CONTOH untuk ujian antaramuka SAHAJA)
src/styles/        main.css
.github/workflows/deploy.yml
```

## Pasang & jalankan
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # hasil di dist/
npm run preview    # uji build produksi
```
Tanpa `.env.local`, app berjalan dalam MOD DEMO (data contoh; pesanan disimpan dalam sessionStorage pelayar sahaja, tidak dihantar ke mana-mana).

## Firebase (disediakan, belum digunakan)
Salin `.env.example` ke `.env.local` dan isi nilai Firebase. Bila dikonfigurasi, app membaca `business_settings/main`, `categories`, `products` dari Firestore dan memanggil Cloud Function `placeOrder` (dibina di Fasa 2). Sehingga Fasa 2 siap, checkout akan memaparkan mesej "pelayan belum tersedia" — tiada rekod palsu ditulis.

## Muat naik ke GitHub
```bash
git init && git add . && git commit -m "Fasa 1"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

## GitHub Pages
1. Repo > Settings > Pages > Source: **GitHub Actions**.
2. Push ke `main`; workflow `deploy.yml` membina dengan `VITE_BASE=/NAMA-REPO/` secara automatik.
3. Laman: `https://USERNAME.github.io/REPO/`.
Untuk build manual: `VITE_BASE=/REPO/ npm run build`. Nilai lalai dalam `vite.config.js` ialah `/mybiz-pos/`; tukar jika nama repo anda berbeza.
