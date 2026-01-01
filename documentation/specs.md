# Sistem Reservasi Klinik Gigi Senyum Sejahtera - Specifications

> **The Blueprint** — Single source of truth untuk pengembangan sistem.

---

## Overview

Sistem reservasi dan manajemen klinik gigi berbasis web untuk **Klinik Gigi Senyum Sejahtera** milik drg. Handoko. Dibangun menggunakan Next.js 14 dan PostgreSQL.

### Tech Stack

| Layer            | Technology                   |
| ---------------- | ---------------------------- |
| **Framework**    | Next.js 14/15 (App Router)   |
| **Language**     | TypeScript                   |
| **Styling**      | Tailwind CSS (Medical Theme) |
| **Database**     | PostgreSQL (via Prisma ORM)  |
| **Auth**         | Auth.js v5 (Google OAuth)    |
| **State Mgmt**   | Zustand (client state)       |
| **Server State** | TanStack Query + Axios       |
| **Forms**        | React Hook Form + Zod        |
| **File Storage** | Supabase Storage             |
| **Payment**      | Midtrans (Snap Pop-up)       |
| **WhatsApp**     | Fonnte API                   |

### Design Theme

- **Primary Color:** Teal (#0D9488)
- **Background:** White (#FFFFFF)
- **Accent:** Light Teal (#F0FDFA)
- **Style:** Clean, professional, trustworthy medical aesthetic

---

## Pages

### Patient Pages (Frontend)

| Route                    | Page            | Description                          |
| ------------------------ | --------------- | ------------------------------------ |
| `/`                      | Landing Page    | Homepage dengan info klinik dan CTA  |
| `/booking`               | Booking Wizard  | Redirect ke step pertama             |
| `/booking/pilih-layanan` | Pilih Layanan   | Step 1: Pilih jenis perawatan        |
| `/booking/pilih-dokter`  | Pilih Dokter    | Step 2: Pilih dokter                 |
| `/booking/pilih-jadwal`  | Pilih Jadwal    | Step 3: Pilih tanggal dan jam        |
| `/checkout`              | Checkout        | Form data pasien + pembayaran DP     |
| `/booking-success`       | E-Ticket        | Konfirmasi booking berhasil          |
| `/my-bookings`           | Riwayat Booking | Daftar booking pasien                |
| `/my-bookings/[id]`      | Detail Booking  | Detail satu booking                  |
| `/about`                 | Tentang Klinik  | Info klinik, alamat, jam operasional |
| `/support`               | Bantuan         | FAQ dan kontak                       |

### Auth Pages

| Route      | Page    | Description            |
| ---------- | ------- | ---------------------- |
| `/sign-in` | Sign In | Login untuk pasien     |
| `/sign-up` | Sign Up | Registrasi pasien baru |

### Admin Dashboard Pages

| Route                 | Page            | Description                      |
| --------------------- | --------------- | -------------------------------- |
| `/dashboard`          | Dashboard Home  | Overview statistik harian        |
| `/dashboard/schedule` | Jadwal Hari Ini | Kalender jadwal live             |
| `/dashboard/bookings` | Kelola Booking  | CRUD semua booking               |
| `/dashboard/doctors`  | Kelola Dokter   | CRUD data dokter                 |
| `/dashboard/services` | Kelola Layanan  | CRUD layanan perawatan           |
| `/dashboard/patients` | Database Pasien | List pasien + riwayat booking    |
| `/dashboard/reports`  | Laporan         | Grafik pendapatan DP & statistik |
| `/dashboard/settings` | Pengaturan      | Konfigurasi klinik & notifikasi  |

### Doctor Pages

| Route              | Page             | Description                    |
| ------------------ | ---------------- | ------------------------------ |
| `/doctor`          | Dashboard Dokter | Jadwal pribadi dokter hari ini |
| `/doctor/schedule` | Jadwal Saya      | Kalender jadwal dokter         |
| `/doctor/patients` | Riwayat Pasien   | Pasien yang pernah ditangani   |

---

## Authentication

### Auth Flow (Google OAuth)

**Sign In dengan Google:**

1. User klik "Sign in with Google"
2. Redirect ke Google OAuth consent screen
3. User approve → Callback ke aplikasi
4. Cek apakah email sudah terdaftar:
   - Jika belum → Buat user baru (role: PATIENT)
   - Jika sudah → Login ke akun existing
5. Simpan session → Redirect berdasarkan role:
   - PATIENT → `/`
   - ADMIN → `/dashboard`
   - DOCTOR → `/doctor`

**First-time User:**

- Setelah login pertama kali, user diminta melengkapi profil (no. WhatsApp) di `/complete-profile`

**Sign Out:**

1. Hapus session
2. Redirect ke landing page

### Session Management

- Menggunakan Auth.js session strategy: `database` (dengan Prisma adapter)
- Session token disimpan di cookie
- HttpOnly: true, Secure: true (production)

### Role-Based Access

| Role      | Access                                   |
| --------- | ---------------------------------------- |
| `PATIENT` | Booking flow, My Bookings, Profile       |
| `DOCTOR`  | Doctor dashboard, jadwal pribadi         |
| `ADMIN`   | Full dashboard access, semua fitur admin |

### Protected Routes

- **Patient:** `/checkout/*`, `/my-bookings/*`
- **Doctor:** `/doctor/*`
- **Admin:** `/dashboard/*`

---

## Booking Workflow (3 Steps)

### Step 1: Pilih Layanan

**URL:** `/booking/pilih-layanan`

**Display:**

- Grid cards layanan perawatan
- Setiap card menampilkan:
  - Nama layanan (e.g., "Scaling & Polishing")
  - Deskripsi singkat
  - Harga penuh (e.g., "Rp 350.000")
  - Uang muka / DP (e.g., "DP: Rp 100.000")
  - Durasi (e.g., "60 menit")
- Klik card → Simpan ke state → Lanjut Step 2

### Step 2: Pilih Dokter

**URL:** `/booking/pilih-dokter`

**Display:**

- List dokter dengan foto profil
- Nama dan spesialisasi
- Indikator ketersediaan (ada slot kosong atau tidak)
- Klik card → Simpan ke state → Lanjut Step 3

### Step 3: Pilih Jadwal

**URL:** `/booking/pilih-jadwal`

**Display:**

- Date picker (kalender minggu depan)
- Grid slot waktu yang tersedia
- Slot yang sudah dibooking = disabled/hidden
- Klik slot → Simpan ke state → Lanjut Checkout

### Checkout

**URL:** `/checkout`

**Form:**

- Nama lengkap (prefilled jika sudah login)
- No. WhatsApp (required, untuk notifikasi)
- Catatan/keluhan (optional)

**Summary:**

- Layanan yang dipilih
- Dokter yang dipilih
- Tanggal & jam
- Jumlah DP yang harus dibayar

**Payment:**

- Midtrans Snap Pop-up
- Mendukung: QRIS, Bank Transfer, E-Wallet
- Timer 15 menit untuk menyelesaikan pembayaran

### Success / E-Ticket

**URL:** `/booking-success?bookingId=XXX`

**Display:**

- Kode booking (e.g., "DENT-ABC123")
- QR Code untuk check-in
- Detail appointment (dokter, layanan, jadwal)
- Alamat klinik
- Tombol "Simpan Screenshot"
- Info: Notifikasi WhatsApp akan dikirim

---

## API Endpoints

### Public API

| Method | Endpoint                         | Description                           |
| ------ | -------------------------------- | ------------------------------------- |
| GET    | `/api/services`                  | List semua layanan aktif              |
| GET    | `/api/doctors`                   | List semua dokter aktif               |
| GET    | `/api/doctors/[id]/availability` | Ketersediaan slot dokter              |
| GET    | `/api/slots`                     | Slot tersedia (query: doctorId, date) |

### Protected API (Patient)

| Method | Endpoint                    | Description                        |
| ------ | --------------------------- | ---------------------------------- |
| POST   | `/api/bookings`             | Buat booking baru + token Midtrans |
| GET    | `/api/my-bookings`          | List booking pasien                |
| PUT    | `/api/bookings/[id]/cancel` | Batalkan booking                   |

### Webhook

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| POST   | `/api/webhooks/midtrans` | Callback pembayaran |

### Admin API

| Method | Endpoint                    | Description           |
| ------ | --------------------------- | --------------------- |
| GET    | `/api/admin/bookings`       | List semua booking    |
| PUT    | `/api/admin/bookings/[id]`  | Update status booking |
| POST   | `/api/admin/doctors`        | Tambah dokter         |
| PUT    | `/api/admin/doctors/[id]`   | Edit dokter           |
| DELETE | `/api/admin/doctors/[id]`   | Hapus dokter          |
| POST   | `/api/admin/services`       | Tambah layanan        |
| PUT    | `/api/admin/services/[id]`  | Edit layanan          |
| DELETE | `/api/admin/services/[id]`  | Hapus layanan         |
| POST   | `/api/admin/slots/generate` | Generate slot jadwal  |
| GET    | `/api/admin/reports`        | Data laporan          |

---

## UI Components

### Shared Components (`/src/components/ui/`)

| Component      | Description           |
| -------------- | --------------------- |
| `Button`       | Tombol dengan variant |
| `Card`         | Card container        |
| `Input`        | Form input field      |
| `Select`       | Dropdown select       |
| `Badge`        | Status badges         |
| `Calendar`     | Date picker           |
| `TimeSlotGrid` | Grid pilihan waktu    |
| `Modal`        | Dialog modal          |
| `Toast`        | Notification toast    |
| `Skeleton`     | Loading skeleton      |
| `Avatar`       | Doctor/user avatar    |
| `DataTable`    | Admin data table      |

### Page-Specific Components

- **Landing:** Hero, ServiceShowcase, DoctorProfiles, ClinicInfo
- **Booking:** ServiceCard, DoctorCard, TimeSlotButton, BookingStepper
- **Checkout:** BookingSummary, PaymentTimer, MidtransSnap
- **E-Ticket:** TicketCard, QRCode, ScreenshotButton
- **Dashboard:** StatCard, ScheduleCalendar, BookingTable, ReportChart

---

## Features

### Patient Features

| Feature           | Capabilities                                          |
| ----------------- | ----------------------------------------------------- |
| 📅 Booking Online | Pilih layanan → dokter → jadwal dalam 3 langkah mudah |
| 💳 Pembayaran DP  | Bayar uang muka via QRIS/Transfer/E-Wallet            |
| 🎫 E-Ticket       | Tiket digital dengan QR code untuk check-in           |
| 📱 Notifikasi WA  | Konfirmasi booking & reminder H-1 via WhatsApp        |
| 📋 Riwayat        | Lihat semua booking dan statusnya                     |

### Doctor Features

| Feature      | Capabilities                         |
| ------------ | ------------------------------------ |
| 📊 Dashboard | Lihat jadwal hari ini                |
| 📅 Kalender  | Jadwal mingguan/bulanan              |
| 👥 Pasien    | Riwayat pasien yang pernah ditangani |

### Admin Features

| Feature              | Capabilities                                         |
| -------------------- | ---------------------------------------------------- |
| 📊 Dashboard         | Stats: booking hari ini, pendapatan DP, total pasien |
| 📅 Live Calendar     | Jadwal real-time semua dokter                        |
| 👨‍⚕️ Kelola Dokter     | CRUD data dokter, jadwal, foto                       |
| 🦷 Kelola Layanan    | CRUD layanan, harga, durasi, DP                      |
| 📝 Manajemen Booking | Update status, cancel, refund                        |
| 👥 Database Pasien   | List pasien dengan riwayat & no. WA                  |
| 📈 Laporan           | Grafik pendapatan DP, pasien per layanan             |

---

## Business Logic Rules

### Durasi Slot

- Default: **60 menit** per appointment (MVP)
- Dapat dikonfigurasi per layanan

### Batas Waktu Pembayaran

- **15 menit** setelah booking dibuat
- Jika tidak bayar → status = `EXPIRED`, slot dibuka kembali
- Implementasi: Cron job setiap menit

### Kebijakan Pembatalan

| Waktu Pembatalan        | Kebijakan                         |
| ----------------------- | --------------------------------- |
| > 24 jam sebelum jadwal | DP dikembalikan (manual by admin) |
| < 24 jam sebelum jadwal | DP hangus                         |

### Conflict Prevention

- Satu dokter tidak bisa menangani 2 pasien di jam yang sama
- Database constraint: `@@unique([doctorId, date, startTime])` pada TimeSlot
- Check availability sebelum booking
- Transaction-safe booking creation

### Schedule Management

**Weekly Template System:**

- Admin membuat template jadwal mingguan per dokter
- Template berisi: hari kerja, jam mulai, jam selesai, durasi slot
- Sistem otomatis generate slot untuk minggu depan
- Dokter bisa block tanggal tertentu (cuti, libur)

**Example Template:**

```
drg. Handoko:
- Senin: 09:00 - 17:00 (8 slots × 60 min)
- Selasa: 09:00 - 17:00
- Rabu: 09:00 - 12:00 (3 slots)
- Kamis: 09:00 - 17:00
- Jumat: 09:00 - 17:00
- Sabtu: 09:00 - 14:00 (5 slots)
- Minggu: Libur
```

---

## WhatsApp Notifications (Fonnte)

### Notification Types

| Event          | Waktu            | Isi Pesan                          |
| -------------- | ---------------- | ---------------------------------- |
| Booking Sukses | Setelah bayar DP | Konfirmasi booking + detail jadwal |
| Reminder H-1   | 1 hari sebelum   | Pengingat appointment              |
| Reminder 2 Jam | 2 jam sebelum    | Pengingat terakhir (optional)      |

### Message Template

**Booking Sukses:**

```
✅ Booking Berhasil!

Halo {nama_pasien},
Terima kasih telah melakukan reservasi di Klinik Gigi Senyum Sejahtera.

📋 Detail Booking:
🔢 Kode: {kode_booking}
🦷 Layanan: {nama_layanan}
👨‍⚕️ Dokter: {nama_dokter}
📅 Tanggal: {tanggal}
⏰ Jam: {jam}

📍 Lokasi: {alamat_klinik}

Harap datang 15 menit sebelum jadwal.
Sampai jumpa! 😊
```

**Reminder H-1:**

```
⏰ Pengingat Appointment

Halo {nama_pasien},
Ini pengingat untuk jadwal kunjungan Anda besok:

🦷 {nama_layanan}
👨‍⚕️ {nama_dokter}
📅 {tanggal}
⏰ {jam}

Jangan lupa bawa foto KTP/identitas.
Jika ingin reschedule, hubungi kami segera.

Salam sehat! 🦷
```

---

## Dashboard Details

### Dashboard Home (`/dashboard`)

**Stats Cards:**

- Booking Hari Ini (count)
- Menunggu Pembayaran (count pending)
- Pendapatan DP Hari Ini (Rp)
- Total Pasien Terdaftar

**Today's Schedule:**

- Timeline view jadwal hari ini
- Grouped by dokter
- Status color: Pending (kuning), Paid (hijau), Checked In (biru), Completed (abu)

**Quick Actions:**

- Check-in pasien (scan QR atau search)
- Update status booking
- Lihat antrian

### Schedule (`/dashboard/schedule`)

**Views:**

- Daily view (default)
- Weekly view
- Filter by dokter

**Features:**

- Click slot untuk lihat detail booking
- Quick status update
- Block/unblock slot

### Bookings (`/dashboard/bookings`)

**Columns:** Kode, Pasien, Dokter, Layanan, Jadwal, Status, DP, Actions

**Filters:**

- Status: All, Pending, Paid, Checked In, Completed, Cancelled, Expired
- Dokter
- Tanggal range
- Search by nama/kode

**Actions:**

- Update status (dropdown)
- Cancel booking
- View detail
- Send reminder (manual)

### Reports (`/dashboard/reports`)

**Charts:**

- Pendapatan DP harian (line chart)
- Booking per layanan (pie chart)
- Booking per dokter (bar chart)
- No-show rate (gauge)

**Filters:**

- Date range
- Dokter
- Layanan

---

## Component Conventions

### Naming

| Type       | Convention                     | Example                      |
| ---------- | ------------------------------ | ---------------------------- |
| Components | PascalCase                     | `ServiceCard.tsx`            |
| Pages      | lowercase folder + `page.tsx`  | `pilih-dokter/page.tsx`      |
| Hooks      | camelCase with `use` prefix    | `useBookingState.tsx`        |
| Utils      | camelCase                      | `formatRupiah()`             |
| API Routes | lowercase + `route.ts`         | `api/bookings/route.ts`      |
| Types      | PascalCase + Type/Props suffix | `BookingType`, `DoctorProps` |

### File Structure

```
src/app/(home)/booking/
├── pilih-layanan/
│   ├── page.tsx
│   ├── loading.tsx
│   └── _components/
│       ├── ServiceCard.tsx
│       └── ServiceGrid.tsx
├── pilih-dokter/
│   ├── page.tsx
│   └── _components/
│       ├── DoctorCard.tsx
│       └── DoctorList.tsx
└── pilih-jadwal/
    ├── page.tsx
    └── _components/
        ├── DatePicker.tsx
        └── TimeSlotGrid.tsx
```

---

## Error Handling

### User-Facing Errors

| Scenario             | Message                                            |
| -------------------- | -------------------------------------------------- |
| Slot sudah diambil   | "Maaf, jadwal ini sudah tidak tersedia"            |
| Payment timeout      | "Waktu pembayaran habis, silakan ulangi"           |
| Server error         | "Terjadi kesalahan, coba lagi nanti"               |
| Booking cancel < 24h | "Pembatalan < 24 jam, DP tidak dapat dikembalikan" |

### Technical Errors

- All API errors return consistent format:

```typescript
{
  success: false,
  error: {
    code: "SLOT_UNAVAILABLE",
    message: "Slot sudah dibooking oleh pasien lain"
  }
}
```

---

## Performance Targets

| Metric                 | Target |
| ---------------------- | ------ |
| Lighthouse Score       | > 90   |
| First Contentful Paint | < 1.5s |
| Time to Interactive    | < 3s   |
| Mobile PageSpeed       | > 85   |

### Optimization Strategies

- SSR for SEO pages (landing, about)
- Client-side for interactive pages (booking wizard)
- Image optimization (Next.js Image)
- Database indexing on frequently queried fields
- Lazy loading for heavy components
