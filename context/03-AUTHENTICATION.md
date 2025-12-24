# Authentication

## Overview

Sistem autentikasi menggunakan **session-based authentication** dengan penyimpanan session di database.

---

## Auth Flow

### Sign Up

```
1. User mengisi form registrasi (name, email, password)
2. Validasi input
3. Hash password
4. Simpan user ke database dengan role CUSTOMER
5. Buat session
6. Redirect ke home
```

### Sign In

```
1. User mengisi email & password
2. Cari user berdasarkan email
3. Verifikasi password
4. Buat session baru
5. Simpan session ke database
6. Set session cookie
7. Redirect ke home/dashboard
```

### Sign Out

```
1. Hapus session dari database
2. Hapus session cookie
3. Redirect ke sign-in
```

---

## Session Management

| Field       | Description                   |
| ----------- | ----------------------------- |
| `id`        | Session ID (stored in cookie) |
| `userId`    | Reference ke User             |
| `expiresAt` | Waktu expired session         |

### Session Cookie

- Name: `session`
- HttpOnly: true
- Secure: true (production)
- SameSite: Lax

---

## Role-Based Access

| Role       | Access                       |
| ---------- | ---------------------------- |
| `CUSTOMER` | User pages, My Tickets       |
| `ADMIN`    | Dashboard, semua fitur admin |

---

## Protected Routes

### User Routes (CUSTOMER)

- `/checkout/*`
- `/my-tickets/*`
- `/choose-seat/*`

### Admin Routes (ADMIN)

- `/dashboard/*`

---

## Auth Pages

| Route      | Component    | Description     |
| ---------- | ------------ | --------------- |
| `/sign-in` | `SignInForm` | Form login      |
| `/sign-up` | `SignUpForm` | Form registrasi |
