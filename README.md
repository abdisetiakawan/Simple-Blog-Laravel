# 📄 Simple Blog Website – Laravel Backend

This project is a **backend API** for a simple blog application, built using **Laravel**.
The main features include a **Back Office (Admin Panel)** for managing blog posts and a **Public API** to be accessed by the frontend (web/mobile).

---

## 🚀 Features

- **Admin Authentication** (login with email & password).
- **CRUD Post** with:
  - WYSIWYG Editor for content.
  - Thumbnail image upload.
  - *Draft* & *Published* status.
  - Soft Delete (Trash & Restore).
- **Public API** for post list & details.
- API structured with **OpenAPI Spec**.
- **Pagination, Search & Filter** on the posts list.
- **Database Seeder** for initial data.

---

## 📂 Tech Stack

- **Framework**: Laravel 11
- **Database**: MySQL / PostgreSQL (recommended) or SQLite (default)
- **Auth**: Laravel Sanctum

---

## 📦 Installation and Setup

### Backend (API)

1.  **Navigate to the API directory:**
    ```bash
    cd simple-blog-api
    ```

2.  **Install Composer dependencies:**
    ```bash
    composer install
    ```

3.  **Set up the `.env` file:**
    Copy `.env.example` to `.env` and adjust your database configuration.
    ```bash
    cp .env.example .env
    ```
    Open the `.env` file and set up your database connection (example using MySQL):
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=simple_blog
    DB_USERNAME=root
    DB_PASSWORD=
    ```

4.  **Generate application key:**
    ```bash
    php artisan key:generate
    ```

5.  **Run database migrations and seeders:**
    This command will create the necessary tables and fill in the initial data (including an admin account).
    ```bash
    php artisan migrate --seed
    ```
    The default admin account that will be created is:
    - **Email:** `admin@codingcollective.com`
    - **Password:** `password`

6.  **Run the API server:**
    Make sure the server is running on `localhost` at port `8000`.
    ```bash
    php artisan serve --port=8000
    ```

### Frontend (Client)

1.  **Open a new terminal** and navigate to the client directory:
    ```bash
    cd simple-blog-client
    ```

2.  **Install NPM dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend application will run at [http://localhost:3000](http://localhost:3000).

---

## 🔗 API Documentation

You can explore and test the API in several ways:

* **OpenAPI Specification**: View the [`apispec.json`](https://github.com/abdisetiakawan/Simple-Blog-Laravel/blob/main/apispec.json) file, which can be imported into tools like [Swagger Editor](https://editor.swagger.io/).
* **Postman Collection**: Import our collection directly into Postman via the following link: [Postman Collection](https://abdisetiawan-4530305.postman.co/workspace/My-Workspace~1582fbbb-20be-4d6e-80b3-c6c566c3f915/collection/46764747-20827210-a359-4815-8bf3-e09ab1b606bc?action=share&source=copy-link&creator=46764747).

---

## 🧪 Testing

To run unit & feature tests on the backend:
```bash
cd simple-blog-api
php artisan test
```
## 👤 Author
* Name: **Abdi Setiawan**
* Email: [bedikadiryt@gmail.com](mailto:bedikadiryt@gmail.com)
