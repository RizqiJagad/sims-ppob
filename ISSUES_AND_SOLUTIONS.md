# Dokumentasi Kendala Development & Deployment
**Project:** SIMS PPOB  
**Date:** 2026-01-09

Dokumen ini merangkum isu-isu teknis yang ditemui selama fase pengembangan dan deployment aplikasi, beserta analisis penyebab dan solusi yang diterapkan.

---

## 1. Deployment & Production Issues

### 1.1. Broken Images (Gambar Tidak Muncul)
- **Gejala**: Logo, ilustrasi login, dan background widget saldo tidak tampil di versi production (Vercel), meskipun berjalan normal di local development.
- **Penyebab (Analysis)**: 
  Kode menggunakan referensi path absolut ke folder source (contoh: `<img src="/src/assets/Logo.png" />`). 
  Pada arsitektur Vite, folder `src` tidak disalin mentah-mentah ke folder output (`dist`). Hanya aset yang di-*import* secara eksplisit atau berada di folder `public` yang akan disertakan dalam build production. Browser mencoba mengakses path `/src/...` yang tidak ada di server.
- **Solusi**:
  1. Mengganti pemanggilan string path menjadi **ES Module Import**:
     ```javascript
     // Sebelum
     <img src="/src/assets/Logo.png" />
     
     // Sesudah
     import logo from '../../assets/Logo.png';
     <img src={logo} />
     ```
  2. Untuk CSS, mengubah path menjadi relatif terhadap file CSS tersebut (e.g., `url('../../assets/bg.png')`).

### 1.2. 404 Not Found saat Refresh Halaman
- **Gejala**: Navigasi antar halaman lancar, namun saat melakukan **Reload/Refresh** di halaman selain Beranda (misal: `/transaction`), muncul error `404: NOT_FOUND`.
- **Penyebab (Analysis)**:
  Aplikasi ini adalah **Single Page Application (SPA)**. Routing (perpindahan halaman) terjadi di sisi klien (browser) menggunakan JavaScript.
  Saat refresh, browser meminta server (Vercel) untuk mengambil file spesifik (misal `transaction.html`). Karena file tersebut tidak ada (semua ada di `index.html`), server mengembalikan 404.
- **Solusi**:
  Menambahkan file konfigurasi **`vercel.json`** di root project untuk mengatur **Rewrites**.
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
  Ini menginstruksikan server untuk selalu mengirimkan `index.html` untuk semua request URL, membiarkan React Router mengambil alih rendering halaman yang tepat.

### 1.3. Saldo "Nol" (Zero Balance) saat Refresh
- **Gejala**: Saat melakukan Top Up, saldo bertambah dan tampil benar. Namun setelah melakukan refresh halaman di menu Transaction atau Top Up, saldo kembali menjadi `Rp 0` (atau loading terus menerus), padahal riwayat transaksi tercatat sukses.
- **Penyebab (Analysis)**: 
  Isu State Persistence. Pada Single Page Application, state Redux (penyimpanan data sementara di memori) akan hilang/reset saat browser di-refresh.
  Halaman widget saldo (`BalanceWidget`) bergantung pada data `balance` di Redux. Halaman `Home` memiliki logika untuk mengambil (*fetch*) data saldo saat dimuat (`dispatch(getBalance)`), namun halaman `Transaction` dan `TopUp` **tidak memiliki** logika tersebut. Akibatnya, saat user langsung me-refresh di halaman tersebut, aplikasi tidak meminta data saldo terbaru ke server.
- **Solusi**:
  Menambahkan *lifecycle hook* (`useEffect`) pada **HistoryPage** dan **TopUpPage** untuk memicu pengambilan data profil dan saldo saat halaman tersebut dimuat (mounting).
  ```javascript
  useEffect(() => {
      dispatch(getProfile());
      dispatch(getBalance()); // <- Fetch saldo secara eksplisit
      // ...
  }, [dispatch]);
  ```

---

## 2. Development & Quality Assurance Issues

### 2.1. Environment Testing (localStorage is not defined)
- **Gejala**: Unit test gagal dijalankan dengan error `ReferenceError: localStorage is not defined`.
- **Penyebab**:
  Tools testing (`Vitest`) berjalan di environment Node.js (via HappyDOM/JSDOM) yang tidak memiliki objek browser native seperti `localStorage` atau `window` secara default.
- **Solusi**:
  Membuat file setup pengujian `src/test-setup.js` untuk melakukan **Mocking** terhadap `localStorage`.
  ```javascript
  global.localStorage = {
      getItem: () => null,
      setItem: () => {},
      // ...
  };
  ```

### 2.2. Linting & Code Quality (ESLint Errors)
- **Gejala**: Proses build atau commit terhambat karena banyak warning/error dari ESLint (e.g., `react-hooks/exhaustive-deps`, `no-unused-vars`).
- **Penyebab**:
  Ketidakkonsistenan dalam manajemen dependency `useEffect` dan sisa variabel dari proses debugging yang tidak dibersihkan.
- **Solusi**:
  1. Melakukan refactoring kode manual pada `useEffect` untuk memasukkan dependency yang wajib.
  2. Menghapus variabel sampah (unused).
  3. Memperbarui konfigurasi `eslint.config.js` untuk mengecualikan (ignore) error spesifik pada file testing yang memerlukan global variables.

### 2.3. GitFlow Branch Mismatches
- **Gejala**: Dokumentasi README mencantumkan struktur branch yang generik, tidak sesuai dengan branch fitur yang sebenarnya dikerjakan.
- **Penyebab**: README awal dibuat berdasarkan template standar sebelum pengembangan fitur spesifik dimulai.
- **Solusi**:
  Mengupdate `README.md` secara berkala untuk mencerminkan kondisi riil repositori, mencantumkan branch fitur aktif seperti `feature/membership`, `feature/transaction-and-topup`, dll.

---

## Kesimpulan
Proses development SIMS PPOB telah melalui serangkaian iterasi perbaikan yang memperkuat stabilitas aplikasi. Isu-isu yang muncul mayoritas berkaitan dengan perbedaan perilaku antara environment **Development (Local)** dan **Production (Build)**, yang kini telah tertangani sepenuhnya.
