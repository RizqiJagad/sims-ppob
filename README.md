<div align="center">
  <img src="src/assets/Logo.png" alt="SIMS PPOB Logo" width="120" height="auto" />
  <h1>SIMS PPOB</h1>
  <p>
    <strong>SIMS PPOB - Taqiy Rizqi Jagad Samudra</strong>
  </p>
  
  <p>
    <a href="https://github.com/RizqiJagad/sims-ppob/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License" />
    </a>
    <img src="https://img.shields.io/badge/React-18-61DAFB.svg?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC.svg?style=flat-square&logo=redux&logoColor=white" alt="Redux Toolkit" />
     <img src="https://img.shields.io/badge/Status-Completed-success.svg?style=flat-square" alt="Status" />
  </p>

  <p>
    <a href="#fitur-utama">Fitur Utama</a> •
    <a href="#tampilan-aplikasi">Tampilan</a> •
    <a href="#teknologi">Teknologi</a> •
    <a href="#instalasi">Instalasi</a> •
    <a href="#gitflow">GitFlow</a>
  </p>
</div>

<br />

> **SIMS PPOB** adalah solusi berbasis web untuk transaksi pembayaran digital yang terintegrasi langsung dengan API Nutech Integrasi. Dibangun dengan fokus pada *User Experience* premium, performa tinggi, dan struktur kode yang modular.

---

## ✨ Fitur Utama

<table>
  <tr>
    <td width="50%">
      <h3>🔐 Membership & Keamanan</h3>
      <ul>
        <li>Registrasi akun baru & Login aman dengan JWT.</li>
        <li>Manajemen Profil (Update data diri & Foto Profil).</li>
        <li>Validasi input visual & notifikasi informatif.</li>
      </ul>
    </td>
    <td width="50%">
      <h3>💳 Transaksi & Layanan</h3>
      <ul>
        <li>Top Up Saldo dengan nominal preset (10k - 250k).</li>
        <li>Pembayaran Tagihan (Listrik, Pulsa, PDAM, dll).</li>
        <li>Riwayat Transaksi detil dengan pagination.</li>
      </ul>
    </td>
  </tr>
     <tr>
    <td colspan="2">
      <h3>📊 Dashboard Interaktif</h3>
      <ul>
        <li>Widget Saldo dengan privasi (Show/Hide).</li>
        <li>Slider Banner Promosi dinamis.</li>
        <li>Grid Layanan responsif.</li>
      </ul>
    </td>
  </tr>
</table>

<br />

## 📸 Tampilan Aplikasi

<div align="center">
  <img src="src/assets/Tampilan.png" alt="Screenshot Dashboard SIMS PPOB" width="100%" style="border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" />
  <p><em>Dashboard Utama - Ringkas, Modern, Informatif</em></p>
</div>

<br />

## 🛠 Teknologi

Project ini dibangun menggunakan stack modern untuk menjamin performa dan kemudahan pengembangan:

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Core** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | Library UI Utama versi 18 |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Bundler super cepat |
| **State** | ![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white) | Manajemen State Global (Auth, Transaction) |
| **Styling** | ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | Vanilla CSS dengan Custom Properties |
| **Network** | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white) | HTTP Client dengan Interceptors |
| **Testing** | ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white) | Unit & Component Testing framework |

<br />

## 🚀 Instalasi & Menjalankan

Ikuti langkah berikut untuk menjalankan proyek di komputer lokal Anda:

### Prasyarat
- **Node.js** (v18+)
- **NPM** atau **Yarn**

### Langkah-langkah

1. **Clone Repositori**
   ```bash
   git clone https://github.com/RizqiJagad/sims-ppob.git
   cd sims-ppob
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   ```

3. **Jalankan Mode Pengembangan**
   ```bash
   npm run dev
   ```
   Akses aplikasi di `http://localhost:5173`

4. **Build untuk Produksi & Linting**
   ```bash
   npm run build
   npm run lint
   ```

5. **Menjalankan Test**
    ```bash
    npm run test
    ```

<br />

## 🌿 GitFlow Structure

Kami menerapkan **GitFlow Architecture** yang disiplin untuk menjaga stabilitas kode:

- **`main`**: Branch produksi yang stabil (Protected).
- **`develop`**: Branch utama integrasi sebelum rilis.
- **`feature/*`**: Branch untuk pengembangan fitur spesifik (e.g., `feature/transaction`).

<br />

---

<div align="center">
  <p>Dikembangkan dengan ❤️ oleh <strong>Rizqi Jagad</strong></p>
  <p><em>Take Home Test Implementation Project</em></p>
</div>
