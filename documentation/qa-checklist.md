# Klinik Gigi Senyum Sejahtera - QA Checklist

> **The Quality Gate** — Checklist untuk memastikan sistem siap produksi.

---

## Pre-Launch Checklist

### 🔐 Authentication & Authorization

- [ ] Sign up form validasi (nama, email, WhatsApp, password)
- [ ] Sign in dengan email & password
- [ ] Sign out properly (clear session)
- [ ] Password hashing dengan bcrypt
- [ ] Role-based routing:
  - [ ] PATIENT dapat akses `/booking/*`, `/my-bookings/*`
  - [ ] DOCTOR dapat akses `/doctor/*`
  - [ ] ADMIN dapat akses `/dashboard/*`
- [ ] Protected routes redirect ke sign-in jika tidak auth
- [ ] Session expiry handling

### 📅 Booking Flow (Patient)

#### Step 1: Pilih Layanan

- [ ] Services load dengan benar
- [ ] Card menampilkan: nama, harga, DP, durasi
- [ ] Click card → selected state visible
- [ ] Button "Lanjut" enabled setelah select
- [ ] State tersimpan saat pindah step

#### Step 2: Pilih Dokter

- [ ] Doctors load dengan benar
- [ ] Card menampilkan: foto, nama, spesialisasi
- [ ] Availability indicator akurat
- [ ] Click card → selected state visible
- [ ] Button "Lanjut" enabled setelah select
- [ ] State tersimpan saat pindah step
- [ ] Button "Kembali" berfungsi

#### Step 3: Pilih Jadwal

- [ ] Calendar menampilkan tanggal yang tersedia
- [ ] Tanggal lampau disabled
- [ ] Selected date → load time slots
- [ ] Time slots menampilkan jam yang tersedia
- [ ] Slot yang sudah dibooking tidak tampil/disabled
- [ ] Click slot → selected state visible
- [ ] Button "Lanjut ke Checkout" enabled setelah select
- [ ] State tersimpan saat pindah step

#### Checkout

- [ ] Booking summary akurat (layanan, dokter, jadwal)
- [ ] Form pasien: nama (prefilled jika login), WhatsApp, catatan
- [ ] Validasi WhatsApp format Indonesia
- [ ] Countdown timer 15 menit tampil
- [ ] Midtrans Snap pop-up muncul
- [ ] Loading state saat proses pembayaran
- [ ] Error handling jika payment gagal

#### Booking Success

- [ ] Halaman tampil setelah payment sukses
- [ ] Kode booking ditampilkan
- [ ] QR code ter-generate
- [ ] Detail booking lengkap (dokter, layanan, jadwal)
- [ ] Alamat klinik tampil
- [ ] Mobile-friendly untuk screenshot

### 💳 Payment (Midtrans)

- [ ] Token Midtrans ter-generate dengan benar
- [ ] Snap pop-up menampilkan metode pembayaran
- [ ] QRIS berfungsi
- [ ] Bank Transfer berfungsi
- [ ] E-Wallet berfungsi
- [ ] Webhook menerima callback dengan benar
- [ ] Signature verification pada webhook
- [ ] Status booking update ke PAID setelah payment
- [ ] Slot ter-mark sebagai unavailable

### ⏰ Business Logic

#### Payment Timeout

- [ ] expiresAt di-set saat booking dibuat (now + 15 min)
- [ ] Cron job expire bookings berjalan
- [ ] Status berubah ke EXPIRED setelah timeout
- [ ] Slot ter-release (isAvailable = true)
- [ ] User tidak bisa bayar setelah expired

#### Cancel Policy

- [ ] Cancel button tampil jika > 24 jam
- [ ] Cancel button hidden/disabled jika < 24 jam
- [ ] Cancel action update status ke CANCELLED
- [ ] Slot ter-release setelah cancel
- [ ] Confirmation modal sebelum cancel

#### Conflict Prevention

- [ ] Tidak bisa book slot yang sama 2x
- [ ] Error handling jika slot sudah diambil
- [ ] Race condition prevention

### 📱 WhatsApp Notifications

- [ ] Fonnte API key configured
- [ ] Booking confirmation terkirim setelah payment
- [ ] Message template benar (kode, layanan, dokter, jadwal)
- [ ] H-1 reminder terkirim
- [ ] confirmationSent & reminderSent flags updated
- [ ] Error logging jika gagal kirim

### 👨‍⚕️ Doctor Portal

- [ ] Doctor dashboard menampilkan jadwal hari ini
- [ ] Schedule page menampilkan kalender personal
- [ ] Booking details accessible
- [ ] Patient history viewable

### 📊 Admin Dashboard

#### Dashboard Home

- [ ] Stats cards akurat:
  - [ ] Booking hari ini
  - [ ] Pending payment
  - [ ] DP revenue hari ini
  - [ ] Total pasien
- [ ] Today's schedule timeline
- [ ] Recent bookings table
- [ ] Quick actions berfungsi

#### Schedule Page

- [ ] Daily view default
- [ ] Weekly view toggle
- [ ] Filter by doctor berfungsi
- [ ] Status color coding benar
- [ ] Click slot → detail modal
- [ ] Quick status update berfungsi

#### Bookings Management

- [ ] Data table load dengan benar
- [ ] Pagination berfungsi
- [ ] Search by nama/kode berfungsi
- [ ] Filter by status berfungsi
- [ ] Filter by doctor berfungsi
- [ ] Filter by date range berfungsi
- [ ] Status update dropdown berfungsi
- [ ] Cancel booking action berfungsi
- [ ] View detail berfungsi

#### Doctors Management

- [ ] List doctors tampil
- [ ] Add doctor form berfungsi
- [ ] Edit doctor berfungsi
- [ ] Upload/change photo berfungsi
- [ ] Toggle active/inactive berfungsi
- [ ] Schedule template management berfungsi
- [ ] Blocked dates management berfungsi

#### Services Management

- [ ] List services tampil
- [ ] Add service form berfungsi
- [ ] Edit service berfungsi
- [ ] Price, DP, duration editable
- [ ] Toggle active/inactive berfungsi
- [ ] Reorder berfungsi (optional)

#### Patients Database

- [ ] Patient list tampil
- [ ] Search berfungsi
- [ ] Booking history per patient
- [ ] WhatsApp number tampil

#### Reports

- [ ] DP revenue chart tampil
- [ ] Bookings per service chart tampil
- [ ] Bookings per doctor chart tampil
- [ ] Date range filter berfungsi

#### Settings

- [ ] Clinic info editable
- [ ] Payment timeout configurable
- [ ] Reminder hours configurable
- [ ] Save settings berfungsi

### 🎨 UI/UX

- [ ] Teal & White color scheme applied
- [ ] Consistent typography
- [ ] Loading states pada semua async operations
- [ ] Error states dengan message yang jelas
- [ ] Empty states dengan helpful message
- [ ] Toast notifications untuk actions
- [ ] Modal confirmations untuk destructive actions

### 📱 Responsive Design

- [ ] Landing page responsive (mobile, tablet, desktop)
- [ ] Booking flow usable on mobile
- [ ] Checkout form usable on mobile
- [ ] E-Ticket mobile-friendly (screenshot-able)
- [ ] Admin dashboard usable on tablet
- [ ] Touch targets minimal 44x44px

### ⚡ Performance

- [ ] Lighthouse Performance score > 90
- [ ] Lighthouse Accessibility score > 90
- [ ] Lighthouse Best Practices score > 90
- [ ] Lighthouse SEO score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Images optimized (Next.js Image)
- [ ] Database queries optimized (no N+1)

### 🔒 Security

- [ ] All inputs validated (Zod)
- [ ] SQL injection prevented (Prisma)
- [ ] XSS prevented (React default)
- [ ] CSRF protection (SameSite cookies)
- [ ] Rate limiting on booking API
- [ ] Midtrans webhook signature verified
- [ ] Sensitive data not exposed to client
- [ ] Environment variables secured

### 🧪 Testing

#### Unit Tests

- [ ] Booking creation logic
- [ ] Schedule generation logic
- [ ] Cancellation policy logic
- [ ] Payment timeout logic
- [ ] Utility functions

#### E2E Tests

- [ ] Complete booking flow (guest)
- [ ] Complete booking flow (logged in)
- [ ] Cancel booking flow
- [ ] Admin: create doctor
- [ ] Admin: create service
- [ ] Admin: update booking status
- [ ] Doctor: view schedule

### 📝 Documentation

- [ ] README.md updated
- [ ] .env.example updated
- [ ] API documentation complete
- [ ] Admin user guide (basic)

### 🚀 Deployment

- [ ] Production database setup
- [ ] Vercel project created
- [ ] Environment variables configured
- [ ] Midtrans production credentials
- [ ] Fonnte production credentials
- [ ] Cron jobs configured
- [ ] Domain configured (optional)
- [ ] SSL active

---

## Post-Launch Monitoring

### Week 1

- [ ] Monitor error logs
- [ ] Check payment success rate
- [ ] Verify WhatsApp delivery
- [ ] Check no-show rate
- [ ] Gather user feedback

### Month 1

- [ ] Analyze booking patterns
- [ ] Check DP collection rate
- [ ] Review admin efficiency
- [ ] Plan feature improvements

---

## Known Issues / TODO

_List any known issues or pending improvements here_

1. ...
2. ...
3. ...
