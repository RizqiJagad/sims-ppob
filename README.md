# SIMS PPOB - React Application

Aplikasi Web PPOB (Payment Point Online Bank) yang dibangun menggunakan React.js, Redux Toolkit, dan Vite. Aplikasi ini terintegrasi dengan API Nutech Integrasi untuk layanan membership, informasi banner, serta transaksi top-up dan pembayaran layanan.

## Fitur Utama

- **Membership**: Registrasi, Login, dan Manajemen Profil (Update data & Foto).
- **Dashboard**: Informasi saldo (dengan fitur hide/show), banner promosi, dan grid layanan.
- **Transaksi**: Top Up saldo dan Pembayaran berbagai layanan PPOB.
- **Riwayat**: Daftar transaksi lengkap dengan fitur "Show More".

## Teknologi yang Digunakan

- **Frontend Core**: React.js 18 + Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Vanilla CSS (Custom Variable & Animations)
- **Icons**: Lucide React
- **HTTP Client**: Axios dengan Interceptor (JWT handling)

## Persyaratan Sistem

- Node.js (Versi 18.0 atau lebih baru)
- NPM atau Yarn

## Cara Instalasi

1. Clone repositori:
   ```bash
   git clone https://github.com/RizqiJagad/sims-ppob.git
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd sims-ppob
   ```
3. Instal dependensi:
   ```bash
   npm install
   ```

## Menjalankan Aplikasi

- **Mode Pengembangan**:
  ```bash
  npm run dev
  ```
  Buka `http://localhost:5173` di browser Anda.

- **Membangun untuk Produksi**:
  ```bash
  npm run build
  ```

- **Linting**:
  ```bash
  npm run lint
  ```

## Struktur GitFlow

Proyek ini menggunakan standar GitFlow:
- `main`: Branch stabil untuk produksi.
- `develop`: Branch integrasi pengembangan.
- `feature/*`: Branch fitur spesifik.

---
Dikembangkan oleh Rizqi Jagad sebagai bagian dari implementasi Take Home Test.
