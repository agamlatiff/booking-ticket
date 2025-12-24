# Project Overview

## Booking Ticket System

Sistem pemesanan tiket penerbangan berbasis web yang dibangun menggunakan Next.js dan PostgreSQL.

## Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| **Frontend** | Next.js 14, React, TypeScript       |
| **Styling**  | Tailwind CSS                        |
| **Database** | PostgreSQL (via Prisma ORM)         |
| **Auth**     | Custom session-based authentication |
| **Payment**  | Midtrans                            |

---

## User Pages

| Route                | Page              | Description                       |
| -------------------- | ----------------- | --------------------------------- |
| `/`                  | Home              | Landing page dengan search flight |
| `/available-flights` | Available Flights | Daftar penerbangan tersedia       |
| `/choose-seat/[id]`  | Choose Seat       | Pilih kursi penerbangan           |
| `/checkout/[id]`     | Checkout          | Halaman pembayaran                |
| `/success-checkout`  | Success           | Konfirmasi booking berhasil       |
| `/my-tickets`        | My Tickets        | Daftar tiket user                 |
| `/my-tickets/[id]`   | Ticket Detail     | Detail tiket                      |
| `/about`             | About             | Tentang aplikasi                  |

---

## Auth Pages

| Route      | Page    | Description        |
| ---------- | ------- | ------------------ |
| `/sign-in` | Sign In | Halaman login      |
| `/sign-up` | Sign Up | Halaman registrasi |

---

## CMS / Admin Dashboard Pages

| Route                  | Page           | Description              |
| ---------------------- | -------------- | ------------------------ |
| `/dashboard`           | Dashboard Home | Overview statistik admin |
| `/dashboard/airplanes` | Airplanes      | Kelola data pesawat      |
| `/dashboard/flights`   | Flights        | Kelola data penerbangan  |
| `/dashboard/tickets`   | Tickets        | Kelola data tiket        |
| `/dashboard/users`     | Users          | Kelola data pengguna     |

---

## API Endpoints

| Route               | Method | Description            |
| ------------------- | ------ | ---------------------- |
| `/api/flights`      | GET    | Ambil data penerbangan |
| `/api/transactions` | POST   | Proses transaksi       |

---

## Documentation Index

| No  | Document                                           | Description                   |
| --- | -------------------------------------------------- | ----------------------------- |
| 00  | [Overview](./00-OVERVIEW.md)                       | Gambaran umum proyek          |
| 01  | [Architecture](./01-ARCHITECTURE.md)               | Arsitektur fundamental sistem |
| 02  | [Database](./02-DATABASE.md)                       | Struktur database dan model   |
| 03  | [Authentication](./03-AUTHENTICATION.md)           | Sistem autentikasi            |
| 04  | [API Endpoints](./04-API-ENDPOINTS.md)             | Dokumentasi API               |
| 05  | [Components](./05-COMPONENTS.md)                   | Komponen UI                   |
| 06  | [Features](./06-FEATURES.md)                       | Fitur-fitur aplikasi          |
| 07  | [Deployment](./07-DEPLOYMENT.md)                   | Panduan deployment            |
| 08  | [Admin Panels](./08-ADMIN-PANELS.md)               | Panel admin/CMS               |
| 09  | [Development Roadmap](./09-DEVELOPMENT-ROADMAP.md) | Roadmap pengembangan          |
