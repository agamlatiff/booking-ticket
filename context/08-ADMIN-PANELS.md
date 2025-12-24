# Admin Panels

## Overview

Panel administrasi untuk mengelola data aplikasi Booking Ticket. Akses melalui `/dashboard`.

---

## Dashboard Home (`/dashboard`)

### Stats Cards

| Stat           | Description                   |
| -------------- | ----------------------------- |
| Total Revenue  | Total pendapatan dari booking |
| Total Bookings | Jumlah total booking          |
| Active Flights | Jumlah penerbangan aktif      |
| Total Users    | Jumlah user terdaftar         |

### Recent Bookings

Tabel 10 booking terbaru dengan informasi:

- Kode tiket
- Nama customer
- Rute penerbangan
- Tanggal booking
- Status
- Harga

---

## Airplanes (`/dashboard/airplanes`)

### Data Table Columns

| Column        | Description        |
| ------------- | ------------------ |
| Code          | Kode pesawat       |
| Name          | Nama pesawat       |
| Image         | Gambar pesawat     |
| Total Flights | Jumlah penerbangan |
| Actions       | Edit, Delete       |

### Form Fields

| Field | Type        | Required |
| ----- | ----------- | -------- |
| Code  | Text        | Yes      |
| Name  | Text        | Yes      |
| Image | File Upload | Yes      |

---

## Flights (`/dashboard/flights`)

### Data Table Columns

| Column          | Description                   |
| --------------- | ----------------------------- |
| Route           | Kota asal → Kota tujuan       |
| Airplane        | Nama pesawat                  |
| Departure       | Tanggal & waktu keberangkatan |
| Arrival         | Tanggal & waktu kedatangan    |
| Price           | Harga tiket                   |
| Available Seats | Kursi tersedia                |
| Actions         | Edit, Delete, View Seats      |

### Form Fields

| Field                 | Type     | Required |
| --------------------- | -------- | -------- |
| Airplane              | Select   | Yes      |
| Departure City        | Text     | Yes      |
| Departure City Code   | Text     | Yes      |
| Destination City      | Text     | Yes      |
| Destination City Code | Text     | Yes      |
| Departure Date        | DateTime | Yes      |
| Arrival Date          | DateTime | Yes      |
| Price                 | Number   | Yes      |

---

## Tickets (`/dashboard/tickets`)

### Data Table Columns

| Column       | Description            |
| ------------ | ---------------------- |
| Code         | Kode tiket             |
| Customer     | Nama customer          |
| Flight       | Rute penerbangan       |
| Seat         | Nomor kursi            |
| Booking Date | Tanggal booking        |
| Price        | Harga tiket            |
| Status       | PENDING/SUCCESS/FAILED |
| Actions      | View, Update Status    |

### Status Filter

- All
- Pending
- Success
- Failed

---

## Users (`/dashboard/users`)

### Data Table Columns

| Column         | Description       |
| -------------- | ----------------- |
| Name           | Nama user         |
| Email          | Email user        |
| Role           | CUSTOMER/ADMIN    |
| Total Bookings | Jumlah booking    |
| Actions        | Edit Role, Delete |

### Role Management

Admin dapat mengubah role user antara:

- `CUSTOMER` - User biasa
- `ADMIN` - Administrator

---

## Access Control

| Role     | Access Level   |
| -------- | -------------- |
| CUSTOMER | ❌ No access   |
| ADMIN    | ✅ Full access |

Middleware melakukan pengecekan role sebelum akses ke `/dashboard/*`.
