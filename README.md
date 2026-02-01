# 🌿 CleanPoint - Bersama Jaga Lingkungan

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**CleanPoint** adalah platform digital inovatif yang dirancang untuk menjembatani komunikasi antara warga dan instansi terkait dalam menangani masalah lingkungan secara *real-time*, cepat, dan transparan.

---

## 📌 Latar Belakang
Di banyak daerah, penanganan masalah lingkungan seperti tumpukan sampah liar dan saluran air tersumbat sering terlambat karena jalur pelaporan yang tidak efektif (hanya via media sosial atau WhatsApp pribadi). CleanPoint hadir untuk memberikan sistem pelaporan yang terstruktur, mudah diarsipkan, dan terpantau hingga tuntas.

## ✨ Fitur Utama

### 👤 Untuk Warga (User)
- **Pelaporan Real-Time**: Kirim laporan masalah lingkungan dalam hitungan detik.
- **Auto-GPS Location**: Deteksi lokasi kejadian secara otomatis menggunakan API Maps.
- **Evidence Upload**: Unggah foto bukti langsung dari perangkat (terintegrasi Cloudinary).
- **Track Status**: Pantau perkembangan laporan dari "Ditinjau" hingga "Selesai".

### 👨‍💼 Untuk Petugas (Admin)
- **Dashboard Statistik**: Visualisasi tren laporan mingguan menggunakan grafik interaktif.
- **Management System**: Kelola ribuan laporan dalam satu tabel yang rapi.
- **Update Status Cepat**: Ubah status laporan untuk memberi kepastian kepada pelapor.
- **Integrasi Data**: Seluruh data tersimpan aman di MongoDB.

## 🛠️ Stack Teknologi
- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Image Storage**: [Cloudinary](https://cloudinary.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

---

## 🚀 Cara Menjalankan Proyek

1. **Clone Repository**
   ```bash
   git clone [https://github.com/lewyinn/cleanpoint.git](https://github.com/lewyinn/cleanpoint.git)
   cd cleanpoint

```

2. **Install Dependensi**
```bash
npm install

```


3. **Konfigurasi Environment Variable**
Buat file `.env.local` di root folder dan isi sebagai berikut:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

```


4. **Jalankan Aplikasi**
```bash
npm run dev

```


Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) di browser Anda.

---

## 🗺️ Alur Pengguna (User Flow)

1. **Warga**: Buka Web → Login → Isi Form (Foto, Deskripsi, Lokasi) → Kirim.
2. **Sistem**: Notifikasi masuk ke Admin → Data tersimpan di DB.
3. **Admin**: Buka Dashboard → Tinjau Laporan → Update Status (Diproses/Selesai).
4. **Warga**: Menerima update status secara real-time di halaman "Status Saya".

---

## 👥 Tim Pengembang

* **Moch Ridho Kurniawan (Lewyinn)** 

---

## 🔗 Kontak & Sosmed

* **Instagram**: [@ridhokurnwnn](https://instagram.com/ridhokurnwnn)
* **GitHub**: [lewyinn](https://github.com/lewyinn)
* **LinkedIn**: [Moch Ridho Kurniawan](https://linkedin.com/in/moch-ridho-kurniawan)

---

*CleanPoint - Bersama Mewujudkan Lingkungan yang Lebih Bersih dan Nyaman.*

```