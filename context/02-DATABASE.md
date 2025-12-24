# Database

## Overview

Database menggunakan **PostgreSQL** dengan **Prisma ORM** sebagai query builder dan migration tool.

## Connection

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

---

## Enums

### RoleUser

| Value      | Description   |
| ---------- | ------------- |
| `CUSTOMER` | User biasa    |
| `ADMIN`    | Administrator |

### TypeSeat

| Value       | Description       |
| ----------- | ----------------- |
| `ECONOMY`   | Kelas ekonomi     |
| `BUSSINESS` | Kelas bisnis      |
| `FIRST`     | Kelas first class |

### StatusTicket

| Value     | Description         |
| --------- | ------------------- |
| `PENDING` | Menunggu pembayaran |
| `SUCCESS` | Pembayaran berhasil |
| `FAILED`  | Pembayaran gagal    |

---

## Tables

### User

| Column     | Type          | Description               |
| ---------- | ------------- | ------------------------- |
| `id`       | String (cuid) | Primary key               |
| `name`     | String        | Nama user                 |
| `email`    | String        | Email (unique)            |
| `password` | String        | Password (hashed)         |
| `passport` | String?       | Nomor passport (optional) |
| `role`     | RoleUser      | Role user                 |

**Relations:**

- Has many `Ticket`
- Has many `Session`

### Session

| Column      | Type     | Description           |
| ----------- | -------- | --------------------- |
| `id`        | String   | Primary key           |
| `userId`    | String   | Foreign key ke User   |
| `expiresAt` | DateTime | Waktu expired session |

### Airplane

| Column  | Type          | Description                     |
| ------- | ------------- | ------------------------------- |
| `id`    | String (cuid) | Primary key                     |
| `code`  | String        | Kode pesawat (default: ABC-123) |
| `name`  | String        | Nama pesawat                    |
| `image` | String        | URL gambar pesawat              |

**Relations:**

- Has many `Flight`

### Flight

| Column                | Type          | Description             |
| --------------------- | ------------- | ----------------------- |
| `id`                  | String (cuid) | Primary key             |
| `slug`                | String?       | SEO-friendly URL        |
| `planeId`             | String        | Foreign key ke Airplane |
| `departureDate`       | DateTime      | Tanggal keberangkatan   |
| `departureCity`       | String        | Kota keberangkatan      |
| `departureCityCode`   | String        | Kode kota keberangkatan |
| `destinationCity`     | String        | Kota tujuan             |
| `destinationCityCode` | String        | Kode kota tujuan        |
| `arrivalDate`         | DateTime      | Tanggal kedatangan      |
| `price`               | Int           | Harga tiket             |

**Relations:**

- Belongs to `Airplane`
- Has many `FlightSeat`
- Has many `Ticket`

**Indexes:**

- `[departureCityCode, destinationCityCode, departureDate]`
- `[departureDate]`

### FlightSeat

| Column       | Type          | Description           |
| ------------ | ------------- | --------------------- |
| `id`         | String (cuid) | Primary key           |
| `flightId`   | String        | Foreign key ke Flight |
| `seatNumber` | String        | Nomor kursi           |
| `isBooked`   | Boolean       | Status booking        |
| `type`       | TypeSeat      | Tipe kursi            |

**Relations:**

- Belongs to `Flight`
- Has one `Ticket`

### Ticket

| Column          | Type          | Description               |
| --------------- | ------------- | ------------------------- |
| `id`            | String (cuid) | Primary key               |
| `code`          | String        | Kode tiket (unique)       |
| `slug`          | String?       | SEO-friendly URL          |
| `flightId`      | String        | Foreign key ke Flight     |
| `customerId`    | String        | Foreign key ke User       |
| `seatId`        | String        | Foreign key ke FlightSeat |
| `bookingDate`   | DateTime      | Tanggal booking           |
| `price`         | BigInt        | Harga tiket               |
| `status`        | StatusTicket  | Status tiket              |
| `tokenMidtrans` | String?       | Token untuk Midtrans      |

**Relations:**

- Belongs to `Flight`
- Belongs to `User`
- Belongs to `FlightSeat`

**Indexes:**

- `[customerId]`
- `[status]`
- `[bookingDate]`

---

## Entity Relationship Diagram

```
User 1──────N Session
  │
  └──1──────N Ticket N──────1 FlightSeat N──────1 Flight N──────1 Airplane
```
