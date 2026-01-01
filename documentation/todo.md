# Klinik Gigi Senyum Sejahtera - Todo / Roadmap

> **The Plan** — Langkah-langkah pengembangan sistem reservasi klinik gigi.

---

## Phase 1: Foundation & Database ⏳

### 1.1 Database Schema

- [x] Buat Prisma schema baru (Doctor, Service, TimeSlot, Booking, etc.)
- [x] Update enum untuk Role dan BookingStatus
- [x] Buat ScheduleTemplate model untuk jadwal mingguan
- [x] Tambahkan BlockedDate model untuk cuti dokter
- [x] Tambahkan ClinicSettings model
- [x] Run migration: `npx prisma migrate dev --name dental_clinic_init`

### 1.2 Seed Data

- [x] Data dokter (minimal 3 dokter)
- [x] Data layanan (Scaling, Cabut Gigi, Veneer, Behel, dll.)
- [x] Template jadwal mingguan per dokter
- [x] Admin user untuk testing
- [x] Sample time slots untuk 2 minggu ke depan

### 1.3 Setup Auth.js (Google OAuth)

- [x] Install next-auth dan @auth/prisma-adapter
- [x] Setup Google OAuth credentials (Google Cloud Console) - _User needs to add credentials_
- [x] Create auth config di `src/lib/auth.ts`
- [x] Create API route `/api/auth/[...nextauth]/route.ts`
- [x] Create `/sign-in` page dengan Google button
- [x] Create `/complete-profile` page (untuk isi no. WhatsApp)
- [x] Update middleware untuk role-based routing
- [x] Create extended User type declaration

---

## Phase 2: Core API Routes 🔌

### 2.1 Public API

- [x] `GET /api/services` - List layanan aktif
- [x] `GET /api/doctors` - List dokter aktif
- [x] `GET /api/doctors/[id]` - Detail dokter
- [x] `GET /api/slots` - Slot tersedia (query: doctorId, date)

### 2.2 Patient API

- [x] `POST /api/bookings` - Buat booking + generate Midtrans token
- [x] `GET /api/bookings` - List booking pasien (GET on same route)
- [x] `GET /api/bookings/[id]` - Detail booking
- [x] `PUT /api/bookings/[id]/cancel` - Batalkan booking (24h policy)
- [x] `POST /api/user/update-phone` - Update nomor WhatsApp

### 2.3 Admin API

- [x] `GET /api/admin/bookings` - List semua booking (dengan filter & pagination)
- [x] `PUT /api/admin/bookings/[id]/status` - Update status booking
- [x] CRUD `/api/admin/doctors` - GET all, POST create, PUT update, DELETE
- [x] CRUD `/api/admin/services` - GET all, POST create, PUT update, DELETE
- [x] `POST /api/admin/slots/generate` - Generate slot dari template

### 2.4 Webhook

- [x] `POST /api/webhooks/midtrans` - Handle payment callback

### 2.5 Cron Jobs

- [x] `GET /api/cron/expire-bookings` - Expire unpaid bookings (15 min)
- [x] `GET /api/cron/generate-slots` - Auto-generate slots (14 days)
- [x] `GET /api/cron/send-reminders` - Kirim reminder H-1 via Fonnte

---

## Phase 3: Patient Frontend 🎨

### 3.1 Landing Page

- [x] Redesign hero section (clinic branding)
- [x] Service showcase grid
- [x] Doctor profiles section
- [x] Clinic info (alamat, jam operasional)
- [x] CTA button ke booking
- [x] Navbar updated (Auth.js, dental branding)
- [x] Footer updated (clinic info, services links)
- [x] Mobile responsive

### 3.2 Booking Flow - Step 1: Pilih Layanan ✅

- [x] Service card component
- [x] Grid layout responsif
- [x] Price & DP display
- [x] Duration badge
- [x] Click to select → Next step

### 3.3 Booking Flow - Step 2: Pilih Dokter ✅

- [x] Doctor card component (foto, nama, spesialisasi)
- [x] Date picker (horizontal calendar)
- [x] Time slot grid from API
- [x] Available/unavailable state
- [x] Click to select → Checkout

### 3.4 Booking Flow - Step 3: Pembayaran ✅

- [x] Patient info form (nama, WhatsApp)
- [x] Booking summary
- [x] Pricing breakdown (DP, sisa bayar)
- [x] API submission to create booking

### 3.5 Booking Provider (State Management) ✅

- [x] Zustand store dengan selectedService, selectedDoctor, selectedSlot
- [x] Persist state via zustand/persist
- [x] Reset on booking complete

### 3.6 Checkout Page ✅

- [x] Booking summary card
- [x] Patient info form (nama, WhatsApp, catatan)
- [x] useCountdown hook for 15-min timer (ready)
- [x] Loading & error states

### 3.7 Booking Success Page ✅

- [x] E-Ticket display
- [x] QR code generation (via QR server API)
- [x] Booking details
- [x] Clinic address
- [x] Screenshot reminder

### 3.8 My Bookings Page ✅

- [x] List booking cards
- [x] Status badges (color-coded)
- [x] Filter by status tabs
- [x] Cancel button (dengan 24-hour check)
- [x] Link to E-Ticket

---

## Phase 4: Admin Dashboard 📊 ✅

### 4.1 Dashboard Home ✅

- [x] Stats cards (booking hari ini, pending, DP revenue, total pasien)
- [x] Today's schedule timeline
- [x] Recent bookings table
- [x] Quick actions

### 4.2 Schedule Page (Live Calendar) ✅

- [x] Daily view (default)
- [x] Filter by doctor
- [x] Color-coded status
- [x] Time slot timeline

### 4.3 Bookings Management ✅

- [x] Data table dengan sorting & filter
- [x] Status filter dropdown
- [x] Doctor filter
- [x] Date filter
- [x] Search by nama/kode
- [x] Status dropdown untuk update (inline)
- [x] Pagination

### 4.4 Doctors Management ✅

- [x] Card grid layout
- [x] Schedule day indicators
- [x] Booking count stats
- [x] Toggle active/inactive
- [x] Edit link

### 4.5 Services Management ✅

- [x] Data table
- [x] Price & DP display
- [x] Duration & booking count
- [x] Toggle active/inactive
- [x] Edit link

### 4.6 Patients Database ✅

- [x] Patient list dengan search
- [x] View booking history link
- [x] WhatsApp number display (clickable)
- [x] Booking count

### 4.7 Reports Page ✅

- [x] Revenue summary (this month vs last)
- [x] Bookings per service (bar chart)
- [x] Bookings per doctor (bar chart)
- [x] Status breakdown

### 4.8 Settings Page ✅

- [x] Clinic info (nama, alamat, telepon)
- [x] Payment timeout setting
- [x] Reminder hours setting
- [x] WhatsApp config (Fonnte)

---

## Phase 5: Doctor Portal 👨‍⚕️ ✅

### 5.1 Doctor Dashboard ✅

- [x] Today's appointments
- [x] Upcoming appointments (7 days)
- [x] Patient count stats
- [x] Completed this month

### 5.2 Doctor Schedule ✅

- [x] Weekly calendar view
- [x] Time slot grid
- [x] Color-coded status
- [x] Date navigation

### 5.3 Doctor Patient History ✅

- [x] List pasien yang pernah ditangani
- [x] Booking history per pasien
- [x] WhatsApp links
- [x] Search functionality

---

## Phase 6: Business Logic 🧠

### 6.1 Payment Timeout

- [ ] Set expiresAt saat booking dibuat (now + 15 min)
- [ ] Cron job untuk expire bookings
- [ ] Release slot when expired
- [ ] Update status to EXPIRED

### 6.2 Conflict Prevention

- [ ] Database unique constraint pada TimeSlot
- [ ] Check availability sebelum booking
- [ ] Transaction-safe booking creation
- [ ] Optimistic locking (optional)

### 6.3 Cancellation Policy

- [ ] Calculate hours until appointment
- [ ] Allow cancel if > 24 hours
- [ ] Block cancel if < 24 hours
- [ ] Admin override untuk refund manual

### 6.4 Schedule Generation

- [ ] Generate slots dari ScheduleTemplate
- [ ] Skip blocked dates
- [ ] Auto-generate untuk minggu depan (cron)

---

## Phase 7: WhatsApp Integration 📱

### 7.1 Fonnte Setup

- [ ] Configure API key di .env
- [ ] Create sendWhatsApp helper function
- [ ] Test dengan sandbox

### 7.2 Booking Confirmation

- [ ] Send setelah payment sukses (webhook)
- [ ] Message template dengan booking details
- [ ] Mark confirmationSent = true

### 7.3 H-1 Reminder

- [ ] Cron job setiap hari jam 10:00
- [ ] Query bookings untuk besok
- [ ] Filter yang belum dikirim reminder
- [ ] Send reminder message
- [ ] Mark reminderSent = true

---

## Phase 8: Styling & Branding 🎨

### 8.1 Color Scheme

- [ ] Update tailwind.config.ts dengan warna teal
- [ ] Update CSS variables di globals.css
- [ ] Apply medical theme ke semua pages

### 8.2 Component Styling

- [ ] Update Button variants
- [ ] Create ServiceCard styling
- [ ] Create DoctorCard styling
- [ ] Update form styling
- [ ] Create E-Ticket styling

### 8.3 Assets

- [ ] Replace favicon dengan logo klinik
- [ ] Add placeholder doctor images
- [ ] Add service icons/images
- [ ] Update hero background

---

## Phase 9: Testing & QA ✅

### 9.1 Unit Tests

- [ ] Booking logic tests
- [ ] Schedule generation tests
- [ ] Cancellation policy tests
- [ ] Payment timeout tests

### 9.2 E2E Tests

- [ ] Complete booking flow
- [ ] Admin booking management
- [ ] Doctor schedule view
- [ ] Cancel booking flow

### 9.3 Performance

- [ ] Lighthouse audit (target > 90)
- [ ] Database query optimization
- [ ] Image optimization

### 9.4 Manual Testing

- [ ] Mobile responsiveness
- [ ] Midtrans sandbox test
- [ ] WhatsApp notification test
- [ ] Cross-browser testing

---

## Phase 10: Cleanup & Deploy 🚀

### 10.1 Cleanup

- [ ] Remove flight booking code
- [ ] Remove unused components
- [ ] Remove old API routes
- [ ] Update README.md
- [ ] Update .env.example

### 10.2 Deploy

- [ ] Setup production database
- [ ] Configure Vercel env vars
- [ ] Deploy to Vercel
- [ ] Setup Midtrans production
- [ ] Setup Fonnte production
- [ ] Configure cron jobs

### 10.3 Documentation

- [ ] API documentation
- [ ] Admin user guide
- [ ] Doctor user guide

---

## Current Priority

1. **Database & Auth** - Foundation harus solid dulu
2. **Core API** - Backend siap untuk frontend
3. **Booking Flow** - Fitur utama pasien
4. **Admin Dashboard** - Manajemen klinik
5. **WhatsApp** - Notifikasi untuk engagement
6. **Polish** - Testing & deployment

---

## Notes

### Files to Delete (Flight Booking)

- `src/app/(home)/available-flights/` - Hapus seluruh folder
- `src/app/(home)/choose-seat/` - Hapus seluruh folder
- `src/app/(home)/destinations/` - Hapus seluruh folder
- `src/app/(home)/partners/` - Hapus seluruh folder
- `src/app/dashboard/airplanes/` - Hapus seluruh folder
- `src/app/dashboard/flights/` - Hapus seluruh folder
- `src/app/dashboard/tickets/` - Hapus seluruh folder (replace with bookings)
- `src/app/api/flights/` - Hapus seluruh folder

### Files to Rename

- `src/app/(home)/my-tickets/` → `src/app/(home)/my-bookings/`
- `src/app/(home)/success-checkout/` → `src/app/(home)/booking-success/`

### Env Variables Needed

```env
# Database
DATABASE_URL=
DIRECT_URL=

# Auth.js (Google OAuth)
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Midtrans
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false

# Fonnte (WhatsApp)
FONNTE_API_KEY=
FONNTE_DEVICE_ID=

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### NPM Packages to Install

```bash
# Core dependencies
npm install next-auth @auth/prisma-adapter
npm install @tanstack/react-query axios
npm install zustand
npm install react-hook-form @hookform/resolvers zod
npm install @supabase/supabase-js
npm install midtrans-client

# Dev dependencies
npm install -D @types/midtrans-client
```
