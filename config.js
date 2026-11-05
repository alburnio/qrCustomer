// ============================================================
//  TETAPAN KEDAI - edit fail ini untuk tukar maklumat kedai
//  Jaga tanda petikan " " dan koma , supaya tidak rosak.
// ============================================================
window.MYBIZ_CONFIG = {
  settings: {
    name: "Nama Kedai Anda",
    hours: "Setiap hari, 10:00 pagi - 9:00 malam",
    phone: "019-2993681",          // <-- tukar nombor telefon di sini
    announcement: "Selamat datang! Tempah dengan mudah di sini.",
    deliveryFee: 5,                 // caj penghantaran (RM)
    minOrder: 10,                   // pesanan minimum (RM)
    payments: ["cash", "duitnow", "bank", "cod"]
  },

  categories: [
    { id: "nasi", name: "Nasi" },
    { id: "minuman", name: "Minuman" }
  ],

  // Gambar sendiri: muat naik fail gambar ke repo (sebelah index.html),
  // kemudian tulis nama failnya di "image". Contoh: image: "nasi-ayam.jpg"
  // Biar image: "" jika belum ada gambar (ikon emoji akan dipaparkan).
  // Guna huruf kecil, tanpa ruang, saiz kurang 300KB.
  products: [
    { id: "p1", name: "Nasi Ayam Goreng", category: "nasi", price: 9.5, popular: true, stock: null,
      description: "Nasi putih dengan ayam goreng berempah.", image: "", emoji: "🍗", hue: 28 },
    { id: "p2", name: "Teh Tarik", category: "minuman", price: 3, popular: true, stock: null,
      description: "Teh tarik panas atau sejuk.", image: "", emoji: "🧋", hue: 35 }
  ]
  // stock: null = tiada had stok; 0 = habis stok; nombor = baki stok
  // active: false (tambah dalam produk) = sembunyikan produk
};
