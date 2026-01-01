# Page Structure & Components - Dental Clinic App

Dokumen ini mendetailkan setiap halaman yang ada di aplikasi, berserta section dan deskripsi tujuannya.

## 1. Landing Page (Public)

**Path:** `/` (src/app/page.tsx)
**Access:** All Users (Public)

- **Header / Navbar (`NavbarAuth`)**
  - Logo & Brand Name ("Dental Care").
  - Links: Beranda, Layanan, Dokter.
  - User Auth Status:
    - Guest: Tombol "Masuk", "Booking Sekarang".
    - Logged In: Avatar user, Dropdown menu (Dashboard, Booking Saya, Edit Profil, Logout).
- **Hero Section**
  - Headline: "Senyum Sehat, Hidup Lebih Bahagia".
  - Sub-headline/Description.
  - CTA Buttons: "Buat Janji Temu" (Primary), "Lihat Jadwal" (Secondary).
  - Visual: Decorative gradients/blobs.
- **Features / Keunggulan Section (New)**
  - Point-point keunggulan klinis: "Teknologi Modern", "Dokter Berpengalaman", "Higienis & Steril".
- **Services Highlight Section**
  - Grid 3 kartu layanan unggulan (Pemeriksaan, Estetika, Orthodonti).
  - Tiap kartu punya icon, judul, deskripsi, dan link langsung ke booking service tersebut.
- **Doctors Preview Section (New)**
  - Tampilan singkat profil dokter-dokter unggulan.
  - Link "Lihat Semua Dokter".
- **CTA Section (Bottom)**
  - Pesan ajakan terakhir "Siap untuk Senyum Lebih Segar?".
  - Tombol besar "Booking Sekarang".
- **Footer**
  - Logo & Brand.
  - Alamat Klinik, Navigasi Link (Layanan, Informasi), Kontak, Jam Buka.
  - Hak Cipta & Link Legal (Privacy, Terms).

---

## 2. Authentication Pages

**Path:** `/sign-in`, `/sign-up` (src/app/(auth)/...)
**Access:** Guest only

- **Sign In Page**

  - **Hero Image Section (Kiri/Atas):** Ilustrasi/Foto klinik yang estetik. Quote "Start Your Smile Journey".
  - **Form Section (Kanan/Bawah):**
    - Judul "Masuk ke Akun Anda".
    - Field Input: Email, Password.
    - Tombol "Masuk".
    - Tombol "Masuk dengan Google".
    - Link "Lupa Password?".
    - Link "Belum punya akun? Daftar".

- **Sign Up Page**
  - **Hero Image Section:** Visual yang konsisten dengan Sign In.
  - **Form Section:**
    - Judul "Buat Akun Baru".
    - Field Input: Nama Lengkap, Email, Password.
    - Tombol "Daftar".
    - Link "Sudah punya akun? Masuk".

---

## 3. Booking Flow

**Path:** `/booking` (src/app/booking/page.tsx)
**Access:** Public (Redirect to login if needed during submit)

- **Header & Progress Steps**
  - Menunjukkan tahapan: Pilih Layanan -> Pilih Dokter/Waktu -> Konfirmasi.
- **Step 1: Layanan & Dokter** (jika belum dipilih)
  - Form filter layanan & dokter.
- **Step 2: Kalender & Slot Waktu**
  - Kalender interaktif pilih tanggal.
  - Grid jam yang tersedia (`availableSlots`).
- **Step 3: Detail Pasien**
  - Form data diri pasien (auto-fill jika login).
  - Keluhan / Catatan tambahan.
- **Step 4: Payment / Confirmation**
  - Ringkasan booking.
  - Tombol "Bayar Sekarang" (Midtrans Snap) atau konfirmasi (jika Bayar di Klinik).

---

## 4. Patient Dashboard

**Path:** `/my-bookings` (src/app/my-bookings/page.tsx)
**Access:** Logged In User (`PATIENT`)

- **Booking History List**
  - Tabel/Card list booking user.
  - Status badges: `PENDING`, `PAID`, `COMPLETED`, `CANCELLED`.
- **Booking Action** (per item)
  - Tombol "Bayar" (jika `PENDING`).
  - Tombol "Batal" (jika belum H-1).
  - Link ke "E-Ticket" / Detail.
- **Profile Settings** (`/complete-profile`)
  - Form edit nama, no HP, alamat.

---

## 5. Doctor Portal

**Path:** `/doctor` (src/app/doctor/...)
**Access:** User with `role: DOCTOR`

- **Doctor Dashboard** (`/doctor`)
  - Stats: Jadwal Hari Ini, Pasien Selesai Bulan Ini, Total Pasien.
  - "Jadwal Hari Ini" (Timeline view).
- **Schedule Management** (`/doctor/schedule`)
  - Kalender mingguan dokter.
  - Lihat slot yang terbooking vs kosong.
- **Patient Records** (`/doctor/patients`)
  - List pasien yang pernah ditangani.
  - History medis ringkas.

---

## 6. Admin Dashboard

**Path:** `/dashboard` (src/app/dashboard/...)
**Access:** User with `role: ADMIN`

- **Dashboard Home** (`/dashboard`)
  - Overview Stats: Total Booking Hari Ini, Revenue Bulan Ini, Pending Payment.
  - Recent Booking Activity feed.
- **Bookings Management** (`/dashboard/bookings`)
  - Tabel lengkap semua booking.
  - Filter: Status, Tanggal, Dokter.
  - Action: Confirm Payment Manual, Set Status (Check-in, Completed, Cancel).
- **Schedule Master** (`/dashboard/schedule`)
  - Kalender Master seluruh klinik.
  - Manage Shift Dokter / Libur Klinik.
- **Doctor Management** (`/dashboard/doctors`)
  - CRUD Data Dokter (Nama, Spesialisasi, Foto, SIP).
  - Set status Aktif/Non-aktif.
- **Services Management** (`/dashboard/services`)
  - CRUD Layanan (Nama, Harga, Durasi).
- **Patients Database** (`/dashboard/patients`)
  - Database seluruh user registered.
- **Reports** (`/dashboard/reports`)
  - Grafik Revenue.
  - Statistik Layanan Terpopuler.
- **Settings** (`/dashboard/settings`)
  - Konfigurasi Klinik (Nama, Alamat, Kontak).
  - Payment Gateway Config (Midtrans Key).
  - WhatsApp Config (Fonnte Token).
