# 📄 Simple Blog Website – Laravel Backend

Proyek ini adalah **backend API** untuk aplikasi blog sederhana, dibangun menggunakan **Laravel**.
Fitur utama mencakup **Back Office (Admin Panel)** untuk manajemen postingan blog dan **Public API** untuk diakses oleh frontend (web/mobile).

---

## 🚀 Fitur

- **Admin Authentication** (login dengan email & password).
- **CRUD Post** dengan:
  - WYSIWYG Editor untuk konten.
  - Upload gambar thumbnail.
  - Status *Draft* & *Published*.
  - Soft Delete (Trash & Restore).
- **Public API** untuk list & detail post.
- API terstruktur dengan **OpenAPI Spec**.
- **Pagination, Search & Filter** pada list posts.
- **Database Seeder** untuk data awal.

---

## 📂 Tech Stack

- **Framework**: Laravel 11
- **Database**: MySQL / PostgreSQL (direkomendasikan) atau SQLite (default)
- **Auth**: Laravel Sanctum

---

## 📦 Instalasi dan Menjalankan Proyek

### Backend (API)

1. **Masuk ke direktori API:**

   ```bash
   cd simple-blog-api
   ```
2. **Install dependensi Composer:**

   ```bash
   composer install
   ```
3. **Siapkan file `.env`:**
   Salin `.env.example` menjadi `.env` dan sesuaikan konfigurasi database Anda.

   ```bash
   cp .env.example .env
   ```

   Buka file `.env` dan atur koneksi database Anda (contoh menggunakan MySQL):

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=simple_blog
   DB_USERNAME=root
   DB_PASSWORD=
   ```
4. **Generate application key:**

   ```bash
   php artisan key:generate
   ```
5. **Jalankan migrasi dan seeder database:**
   Perintah ini akan membuat tabel yang diperlukan dan mengisi data awal (termasuk akun admin).

   ```bash
   php artisan migrate --seed
   ```

   Akun admin default yang akan dibuat:

   - **Email:** `admin@codingcollective.com`
   - **Password:** `password`
6. **Jalankan server API:**
   Pastikan server berjalan di `localhost` pada port `8000`.

   ```bash
   php artisan serve --port=8000
   ```

### Frontend (Client)

1. **Buka terminal baru** dan masuk ke direktori client:

   ```bash
   cd simple-blog-client
   ```
2. **Install dependensi NPM:**

   ```bash
   npm install
   ```
3. **Jalankan server development:**

   ```bash
   npm run dev
   ```

   Aplikasi frontend akan berjalan di [http://localhost:3000](http://localhost:3000).

---

## 🔗 Dokumentasi API

Anda dapat menjelajahi dan menguji API menggunakan beberapa cara:

* **Spesifikasi OpenAPI**: Lihat file [`apispec.json`](https://github.com/abdisetiakawan/Simple-Blog-Laravel/blob/main/apispec.json) yang dapat diimpor ke alat seperti [Swagger Editor](https://editor.swagger.io/).
* **Koleksi Postman**: Impor koleksi kami langsung ke Postman melalui tautan berikut: [Postman Collection](https://abdisetiawan-4530305.postman.co/workspace/My-Workspace~1582fbbb-20be-4d6e-80b3-c6c566c3f915/collection/46764747-20827210-a359-4815-8bf3-e09ab1b606bc?action=share&source=copy-link&creator=46764747).

---

## 🧪 Testing

Untuk menjalankan cd simple-blog-api

## 👤 Author

* Nama: **Abdi Setiawan**
* Email: [bedikadiryt@gmail.com](mailto:bedikadiryt@gmail.com)
