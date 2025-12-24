# API Endpoints

## Overview

API routes menggunakan Next.js App Router API Routes di folder `/src/app/api/`.

---

## Flights API

### GET `/api/flights`

Mengambil daftar penerbangan berdasarkan filter.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `from` | string | Kode kota asal |
| `to` | string | Kode kota tujuan |
| `date` | string | Tanggal keberangkatan |
| `passengers` | number | Jumlah penumpang |
| `seatType` | string | Tipe kursi (ECONOMY/BUSSINESS/FIRST) |

**Response:**

```json
{
  "flights": [
    {
      "id": "string",
      "slug": "string",
      "departureCity": "string",
      "departureCityCode": "string",
      "destinationCity": "string",
      "destinationCityCode": "string",
      "departureDate": "datetime",
      "arrivalDate": "datetime",
      "price": "number",
      "plane": {
        "name": "string",
        "code": "string",
        "image": "string"
      },
      "availableSeats": "number"
    }
  ]
}
```

---

## Transactions API

### POST `/api/transactions`

Membuat transaksi baru dan mendapatkan token pembayaran Midtrans.

**Request Body:**

```json
{
  "flightId": "string",
  "seatId": "string",
  "customerId": "string"
}
```

**Response:**

```json
{
  "ticket": {
    "id": "string",
    "code": "string",
    "status": "PENDING"
  },
  "token": "string" // Midtrans snap token
}
```

### PUT `/api/transactions/[id]`

Update status transaksi setelah callback dari Midtrans.

**Request Body:**

```json
{
  "status": "SUCCESS" | "FAILED"
}
```

---

## Server Actions

Aplikasi juga menggunakan Next.js Server Actions untuk beberapa operasi:

| Action          | Location                                  | Description        |
| --------------- | ----------------------------------------- | ------------------ |
| `signIn`        | `/src/app/(auth)/sign-in/lib/actions.ts`  | Login user         |
| `signUp`        | `/src/app/(auth)/sign-up/lib/actions.ts`  | Register user      |
| `createBooking` | `/src/app/(home)/checkout/lib/actions.ts` | Buat booking baru  |
| `getFlights`    | `/src/app/(home)/lib/actions.ts`          | Ambil data flights |
