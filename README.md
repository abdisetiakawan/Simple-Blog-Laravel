# 📄 Simple Blog Website – Laravel Backend

Proyek ini adalah **backend API** untuk aplikasi blog sederhana, dibangun menggunakan **Laravel**.  
Fitur utama mencakup **Back Office (Admin Panel)** untuk manajemen postingan blog dan **Public API** untuk diakses oleh frontend (web/mobile).

---

## 🚀 Features
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
- **Database**: MySQL / PostgreSQL
- **Auth**: Laravel Sanctum
- **WYSIWYG**: Trix / TinyMCE (opsional)
- **API Docs**: OpenAPI (Swagger)

---

## 📦 Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/abdisetiakawan/Simple-Blog-Laravel.git
cd simple-blog-backend
````

### 2️⃣ Install Dependencies

```bash
composer install
```

### 3️⃣ Setup Environment

Salin file `.env.example` menjadi `.env` lalu sesuaikan konfigurasi:

```bash
cp .env.example .env
```

Edit `.env`:

```env
APP_NAME=SimpleBlog
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=simple_blog
DB_USERNAME=root
DB_PASSWORD=
```

### 4️⃣ Generate Key

```bash
php artisan key:generate
```

### 5️⃣ Run Migration & Seeder

```bash
php artisan migrate --seed
```

Seeder akan membuat:

* 1 admin user default:

  * Email: `admin@example.com`
  * Password: `password`

### 6️⃣ Run Server

```bash
php artisan serve
```

Akses: [http://localhost:8000](http://localhost:8000)

---

## 🔗 API Documentation

Dokumentasi API tersedia dalam format **OpenAPI JSON** di:

```
/apispec.json
```

Bisa dibuka di:

* [Swagger Editor](https://editor.swagger.io/)
* [Postman](https://www.postman.com/)

---

## 🗄 Database Schema (ERD)

ERD dibuat menggunakan [dbdiagram.io](https://dbdiagram.io):

```dbml
Enum user_role {
  admin
}

Enum post_status {
  draft
  published
}

Table users {
  id bigint [pk, increment]
  name varchar(100)
  email varchar(150) [unique]
  password varchar(255)
  role user_role
  avatar varchar(255)
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp
}

Table posts {
  id bigint [pk, increment]
  title varchar(200)
  slug varchar(200) [unique]
  content text
  thumbnail varchar(255)
  status post_status
  published_at timestamp
  created_by bigint
  created_at timestamp
  updated_at timestamp
  deleted_at timestamp
}

Ref: posts.created_by > users.id
```

---

## 🧪 Testing

Jalankan unit & feature tests:

```bash
php artisan test
```

---


## 👤 Author

* Nama: **Abdi Setiawan**
* Email: [bedikadiryt@gmail.com](mailto:bedikadiryt@gmail.com)


