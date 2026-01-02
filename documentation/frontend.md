# Dental Care - Task Breakdown (Frontend Development)

> **Task Registry** — Daftar tugas pengembangan front-end beserta detail teknis yang dibutuhkan.

---

## Legend

- `[ ]` — Belum dikerjakan
- `[/]` — Sedang dikerjakan
- `[x]` — Selesai

---

## 1. Public Pages

### 1.1 Landing Page (`/`)

**Design Reference:** `dental-care-design/home-page`

#### Components

| Task | Component           | Deskripsi                                                                                     |
| ---- | ------------------- | --------------------------------------------------------------------------------------------- |
| [ ]  | `Navbar`            | Navbar dengan logo, menu navigasi, auth button (Sign In/User Avatar dropdown)                 |
| [ ]  | `HeroSection`       | Hero dengan headline, subheadline, CTA button "Booking Sekarang", hero image                  |
| [ ]  | `FeaturesGrid`      | 4 feature cards (Online Booking, Dokter Berpengalaman, Notifikasi WhatsApp, Pembayaran Mudah) |
| [ ]  | `ServicesBentoGrid` | Bento grid layout untuk showcase 6 layanan utama dengan gambar                                |
| [ ]  | `HowItWorks`        | 3-step process (Pilih Layanan → Pilih Dokter & Jadwal → Bayar DP)                             |
| [ ]  | `DoctorPreview`     | Grid/carousel 3-4 dokter dengan foto, nama, spesialisasi                                      |
| [ ]  | `CTASection`        | Call-to-action banner dengan button booking                                                   |
| [ ]  | `Footer`            | Footer dengan info klinik, jam operasional, links, social media                               |

#### State Management

```typescript
// Tidak memerlukan global state khusus
// Menggunakan server component untuk data fetching
```

#### API Requirements

| Endpoint        | Method | Deskripsi                                       |
| --------------- | ------ | ----------------------------------------------- |
| `/api/services` | GET    | Fetch layanan untuk ServicesBentoGrid (limit 6) |
| `/api/doctors`  | GET    | Fetch dokter untuk DoctorPreview (limit 4)      |

#### Query Hooks

```typescript
// hooks/useServicesPreview.ts
useQuery(["services-preview"], () => api.get("/services?limit=6"));

// hooks/useDoctorsPreview.ts
useQuery(["doctors-preview"], () => api.get("/doctors?limit=4"));
```

---

### 1.2 Layanan Page (`/layanan`)

**Design Reference:** `dental-care-design/layanan`

#### Components

| Task | Component          | Deskripsi                                                              |
| ---- | ------------------ | ---------------------------------------------------------------------- |
| [ ]  | `PageHeader`       | Header dengan title "Layanan Kami" dan deskripsi singkat               |
| [ ]  | `ServiceCardsGrid` | Grid semua service cards dengan filter kategori                        |
| [ ]  | `ServiceCard`      | Card dengan icon/image, nama, deskripsi, harga, DP, durasi, CTA button |

#### State Management

```typescript
// Using URL state for filters
// searchParams: ?category=general|cosmetic|orthodontic
```

#### API Requirements

| Endpoint        | Method | Deskripsi                                                 |
| --------------- | ------ | --------------------------------------------------------- |
| `/api/services` | GET    | Fetch semua layanan aktif dengan optional category filter |

---

### 1.3 Layanan Detail (`/layanan/[slug]`)

**Design Reference:** `dental-care-design/layanan-detail`

#### Components

| Task | Component         | Deskripsi                                          |
| ---- | ----------------- | -------------------------------------------------- |
| [ ]  | `ServiceHero`     | Header dengan nama, gambar besar, badge kategori   |
| [ ]  | `ServiceInfo`     | Deskripsi lengkap, durasi, harga penuh, DP         |
| [ ]  | `ServiceFAQ`      | Accordion FAQ khusus layanan ini                   |
| [ ]  | `PricingCard`     | Card sticky dengan breakdown harga dan CTA booking |
| [ ]  | `RelatedServices` | Grid 3 layanan terkait                             |

#### API Requirements

| Endpoint               | Method | Deskripsi                                        |
| ---------------------- | ------ | ------------------------------------------------ |
| `/api/services/[slug]` | GET    | Detail satu layanan by slug                      |
| `/api/services`        | GET    | Layanan terkait (exclude current, same category) |

#### Database Query

```sql
-- Perlu menambahkan field 'category' pada table Service jika belum ada
-- untuk filter layanan terkait
```

---

### 1.4 Dokter Page (`/dokter`)

**Design Reference:** `dental-care-design/doctor`

#### Components

| Task | Component    | Deskripsi                                                    |
| ---- | ------------ | ------------------------------------------------------------ |
| [ ]  | `PageHeader` | Header "Tim Dokter Kami"                                     |
| [ ]  | `DoctorGrid` | Grid semua dokter                                            |
| [ ]  | `DoctorCard` | Card dengan foto, nama, spesialisasi, availability indicator |

#### API Requirements

| Endpoint       | Method | Deskripsi                |
| -------------- | ------ | ------------------------ |
| `/api/doctors` | GET    | Fetch semua dokter aktif |

---

### 1.5 Dokter Detail (`/dokter/[id]`)

**Design Reference:** `dental-care-design/doctor-detail`

#### Components

| Task | Component        | Deskripsi                                      |
| ---- | ---------------- | ---------------------------------------------- |
| [ ]  | `DoctorProfile`  | Foto besar, nama, spesialisasi, bio lengkap    |
| [ ]  | `DoctorStats`    | Stats (tahun pengalaman, total pasien, rating) |
| [ ]  | `DoctorSchedule` | Preview jadwal mingguan                        |
| [ ]  | `CTABooking`     | Button booking dengan dokter ini               |

#### API Requirements

| Endpoint                         | Method | Deskripsi                      |
| -------------------------------- | ------ | ------------------------------ |
| `/api/doctors/[id]`              | GET    | Detail dokter                  |
| `/api/doctors/[id]/availability` | GET    | Jadwal ketersediaan minggu ini |

#### Database Query (New)

```sql
-- Mungkin perlu menambahkan beberapa field:
ALTER TABLE "Doctor" ADD COLUMN "yearsExperience" INT DEFAULT 0;
ALTER TABLE "Doctor" ADD COLUMN "rating" DECIMAL(2,1) DEFAULT 5.0;
```

---

### 1.6 Gallery Page (`/gallery`)

**Design Reference:** `dental-care-design/gallery`

#### Components

| Task | Component       | Deskripsi                              |
| ---- | --------------- | -------------------------------------- |
| [ ]  | `PageHeader`    | Header "Galeri"                        |
| [ ]  | `GalleryTabs`   | Tabs: Semua, Before/After, Klinik, Tim |
| [ ]  | `PhotoGrid`     | Masonry grid gambar dengan lightbox    |
| [ ]  | `LightboxModal` | Modal fullscreen untuk view gambar     |

#### State Management

```typescript
// Zustand store untuk lightbox
interface GalleryState {
  selectedImage: Image | null;
  isLightboxOpen: boolean;
  setSelectedImage: (img: Image) => void;
  closeLightbox: () => void;
}
```

#### API Requirements

| Endpoint       | Method | Deskripsi                              |
| -------------- | ------ | -------------------------------------- |
| `/api/gallery` | GET    | [NEW] Fetch gallery images by category |

#### New Table/Model

```prisma
model GalleryImage {
  id        String   @id @default(cuid())
  title     String?
  imageUrl  String
  category  GalleryCategory
  order     Int      @default(0)
  createdAt DateTime @default(now())
}

enum GalleryCategory {
  BEFORE_AFTER
  CLINIC
  TEAM
}
```

---

### 1.7 Blog Page (`/blog`)

**Design Reference:** `dental-care-design/blog`

#### Components

| Task | Component        | Deskripsi                                           |
| ---- | ---------------- | --------------------------------------------------- |
| [ ]  | `PageHeader`     | Header "Blog Kesehatan Gigi"                        |
| [ ]  | `FeaturedPost`   | Hero post terbaru dengan gambar besar               |
| [ ]  | `ArticleGrid`    | Grid artikel dengan pagination                      |
| [ ]  | `ArticleCard`    | Card dengan thumbnail, title, excerpt, date, author |
| [ ]  | `CategoryFilter` | Sidebar/tabs kategori                               |

#### API Requirements

| Endpoint           | Method | Deskripsi                            |
| ------------------ | ------ | ------------------------------------ |
| `/api/blog`        | GET    | [NEW] List artikel dengan pagination |
| `/api/blog/[slug]` | GET    | [NEW] Detail artikel                 |

#### New Table/Model

```prisma
model BlogPost {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  excerpt     String
  content     String   @db.Text
  thumbnail   String?
  category    String
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
  publishedAt DateTime?
  isPublished Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

### 1.8 About Page (`/about`)

**Design Reference:** `dental-care-design/about`

#### Components

| Task | Component           | Deskripsi                          |
| ---- | ------------------- | ---------------------------------- |
| [ ]  | `StorySection`      | Tentang klinik, sejarah, visi misi |
| [ ]  | `TeamSection`       | Grid tim dokter dan staff          |
| [ ]  | `FacilitiesGallery` | Carousel foto fasilitas klinik     |
| [ ]  | `ClinicInfo`        | Alamat, jam operasional, peta      |

#### Static Content

Tidak memerlukan API khusus — konten dapat di-hardcode atau dari CMS.

---

### 1.9 Contact Page (`/contact`)

**Design Reference:** `dental-care-design/contact`

#### Components

| Task | Component     | Deskripsi                              |
| ---- | ------------- | -------------------------------------- |
| [ ]  | `ContactInfo` | Alamat, telepon, email, jam buka       |
| [ ]  | `ContactForm` | Form dengan nama, email, subjek, pesan |
| [ ]  | `MapEmbed`    | Google Maps embed lokasi klinik        |

#### API Requirements

| Endpoint       | Method | Deskripsi                                          |
| -------------- | ------ | -------------------------------------------------- |
| `/api/contact` | POST   | [NEW] Submit contact form → kirim email notifikasi |

#### Validation Schema

```typescript
// src/lib/validations/contact.ts
const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  subject: z.string().min(5, "Subjek minimal 5 karakter"),
  message: z.string().min(20, "Pesan minimal 20 karakter").max(1000),
});
```

---

### 1.10 Privacy Policy (`/privacy`)

**Design Reference:** `dental-care-design/privacy`

#### Components

| Task | Component         | Deskripsi                                  |
| ---- | ----------------- | ------------------------------------------ |
| [ ]  | `PolicyContent`   | Render markdown/HTML konten privacy policy |
| [ ]  | `TableOfContents` | Sidebar navigasi section                   |

#### Static Content

Konten statis, tidak perlu API.

---

### 1.11 Terms of Service (`/terms`)

**Design Reference:** `dental-care-design/terms`

#### Components

| Task | Component         | Deskripsi                         |
| ---- | ----------------- | --------------------------------- |
| [ ]  | `TermsContent`    | Render markdown/HTML konten terms |
| [ ]  | `TableOfContents` | Sidebar navigasi section          |

---

### 1.12 404 Not Found (`/not-found`)

**Design Reference:** `dental-care-design/not-found`

#### Components

| Task | Component         | Deskripsi                                      |
| ---- | ----------------- | ---------------------------------------------- |
| [ ]  | `NotFoundContent` | Ilustrasi, pesan error, button kembali ke home |

---

## 2. Auth Pages

### 2.1 Sign In (`/sign-in`)

**Design Reference:** `dental-care-design/login`

#### Components

| Task | Component     | Deskripsi                       |
| ---- | ------------- | ------------------------------- |
| [ ]  | `SignInCard`  | Card dengan Google OAuth button |
| [ ]  | `HeroImage`   | Side image/ilustrasi dental     |
| [ ]  | `InfoBox`     | Info tentang benefits login     |
| [ ]  | `FooterTerms` | Link ke privacy & terms         |

#### Logic

```typescript
// Menggunakan Auth.js (next-auth)
// signIn('google', { callbackUrl: '/' })
```

---

### 2.2 Sign Up (`/sign-up`)

**Design Reference:** `dental-care-design/register`

_Same structure as Sign In — redirect to Google OAuth_

---

### 2.3 Edit Profile (`/profile`)

**Design Reference:** `dental-care-design/edit-profile`

#### Components

| Task | Component      | Deskripsi                             |
| ---- | -------------- | ------------------------------------- |
| [ ]  | `ProfileForm`  | Form edit nama, no. WhatsApp, alamat  |
| [ ]  | `AvatarUpload` | Upload foto profil (Supabase Storage) |

#### API Requirements

| Endpoint            | Method | Deskripsi                |
| ------------------- | ------ | ------------------------ |
| `/api/user/profile` | PUT    | [NEW] Update profil user |
| `/api/user/avatar`  | POST   | [NEW] Upload avatar      |

#### Validation Schema

```typescript
const profileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/),
  address: z.string().optional(),
});
```

---

## 3. Booking Flow

### 3.1 Booking - Combined Flow (`/booking`)

**Design Reference:** `dental-care-design/booking`

#### Components

| Task | Component                | Deskripsi                                                      |
| ---- | ------------------------ | -------------------------------------------------------------- |
| [ ]  | `BookingStepper`         | Step indicator (1. Layanan → 2. Dokter & Jadwal → 3. Checkout) |
| [ ]  | `Step1_ServiceSelection` | Grid ServiceCard, select untuk lanjut                          |
| [ ]  | `Step2_DoctorSchedule`   | DoctorCard + DatePicker + TimeSlotGrid                         |
| [ ]  | `Step3_Checkout`         | Form pasien + BookingSummary + Submit                          |
| [ ]  | `ServiceCard`            | Card dengan nama, harga, DP, durasi — selectable               |
| [ ]  | `DoctorCard`             | Card dokter dengan foto, nama, spesialisasi — selectable       |
| [ ]  | `DatePicker`             | Horizontal calendar picker (7-14 hari ke depan)                |
| [ ]  | `TimeSlotGrid`           | Grid slot waktu tersedia — color-coded                         |
| [ ]  | `BookingSummary`         | Ringkasan: layanan, dokter, waktu, harga                       |
| [ ]  | `PatientInfoForm`        | Form: nama, WhatsApp, catatan keluhan                          |

#### State Management (Zustand)

```typescript
// stores/useBookingStore.ts
interface BookingState {
  currentStep: 1 | 2 | 3;
  selectedService: Service | null;
  selectedDoctor: Doctor | null;
  selectedDate: Date | null;
  selectedSlot: TimeSlot | null;
  patientInfo: {
    name: string;
    phone: string;
    notes: string;
  } | null;

  // Actions
  setStep: (step: number) => void;
  setService: (service: Service) => void;
  setDoctor: (doctor: Doctor) => void;
  setDate: (date: Date) => void;
  setSlot: (slot: TimeSlot) => void;
  setPatientInfo: (info: PatientInfo) => void;
  reset: () => void;
}

// Persist to localStorage
```

#### API Requirements

| Endpoint        | Method | Deskripsi                                 |
| --------------- | ------ | ----------------------------------------- |
| `/api/services` | GET    | List layanan aktif                        |
| `/api/doctors`  | GET    | List dokter aktif                         |
| `/api/slots`    | GET    | Slot tersedia (query: doctorId, date)     |
| `/api/bookings` | POST   | Buat booking baru → return Midtrans token |

#### Query Hooks

```typescript
// hooks/useServices.ts
useQuery(["services"], fetchServices);

// hooks/useDoctors.ts
useQuery(["doctors"], fetchDoctors);

// hooks/useAvailableSlots.ts
useQuery(["slots", doctorId, date], () => fetchSlots(doctorId, date), {
  enabled: !!doctorId && !!date,
});

// hooks/useCreateBooking.ts
useMutation(createBooking, {
  onSuccess: (data) => {
    // Open Midtrans Snap popup
    window.snap.pay(data.token);
  },
});
```

#### Validation

```typescript
const patientInfoSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  phone: z
    .string()
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, "Format WhatsApp tidak valid"),
  notes: z.string().max(500).optional(),
});
```

#### Backend Requirements

```typescript
// POST /api/bookings
// 1. Validate request body
// 2. Check slot masih available (SELECT FOR UPDATE, lock row)
// 3. Create booking dengan status PENDING
// 4. Set expiresAt = now + 15 minutes
// 5. Mark slot isAvailable = false
// 6. Generate Midtrans token
// 7. Return { bookingId, token }
```

---

### 3.2 Booking Success (`/booking/success`)

**Design Reference:** `dental-care-design/booking-success`

#### Components

| Task | Component        | Deskripsi                                    |
| ---- | ---------------- | -------------------------------------------- |
| [ ]  | `SuccessHeader`  | Checkmark icon, "Booking Berhasil!" message  |
| [ ]  | `ETicketCard`    | QR Code, kode booking, detail appointment    |
| [ ]  | `BookingDetails` | Dokter, layanan, tanggal, jam                |
| [ ]  | `PaymentInfo`    | Status pembayaran, jumlah DP                 |
| [ ]  | `ClinicAddress`  | Alamat klinik dengan link Google Maps        |
| [ ]  | `ReminderAlert`  | Info tentang WhatsApp notification           |
| [ ]  | `ActionButtons`  | "Simpan Screenshot", "Lihat Riwayat Booking" |

#### API Requirements

| Endpoint             | Method | Deskripsi                     |
| -------------------- | ------ | ----------------------------- |
| `/api/bookings/[id]` | GET    | Detail booking untuk e-ticket |

#### Logic

```typescript
// Generate QR Code dengan kode booking
// Menggunakan external QR API atau library qrcode.react
```

---

## 4. Patient Pages

### 4.1 My Bookings (`/my-bookings`)

**Design Reference:** `dental-care-design/my-bookings`

#### Components

| Task | Component         | Deskripsi                                                        |
| ---- | ----------------- | ---------------------------------------------------------------- |
| [ ]  | `PageHeader`      | "Riwayat Booking Saya"                                           |
| [ ]  | `FilterTabs`      | Filter: Semua, Aktif, Selesai, Dibatalkan                        |
| [ ]  | `BookingCardList` | List BookingCard                                                 |
| [ ]  | `BookingCard`     | Card dengan kode, layanan, dokter, jadwal, status badge, actions |
| [ ]  | `EmptyState`      | Ilustrasi + pesan jika tidak ada booking                         |
| [ ]  | `CancelModal`     | Modal konfirmasi pembatalan                                      |

#### State Management

```typescript
// URL state for filter
// /my-bookings?status=ACTIVE|COMPLETED|CANCELLED
```

#### API Requirements

| Endpoint                    | Method | Deskripsi                        |
| --------------------------- | ------ | -------------------------------- |
| `/api/bookings`             | GET    | List booking user (dari session) |
| `/api/bookings/[id]/cancel` | PUT    | Batalkan booking                 |

#### Logic

```typescript
// Cancellation policy check
const hoursUntilAppointment = differenceInHours(appointmentDate, now);
const canCancel = hoursUntilAppointment > 24;
// Jika < 24 jam, tampilkan warning "DP tidak dapat dikembalikan"
```

---

## 5. Doctor Portal

### 5.1 Doctor Dashboard (`/doctor`)

**Design Reference:** `dental-care-design/doctor`

#### Components

| Task | Component              | Deskripsi                                               |
| ---- | ---------------------- | ------------------------------------------------------- |
| [ ]  | `DoctorHeader`         | Welcome message, nama dokter                            |
| [ ]  | `StatCards`            | 4 cards: Hari Ini, Pending, Pasien Bulan Ini, Completed |
| [ ]  | `TodaySchedule`        | Timeline jadwal hari ini                                |
| [ ]  | `UpcomingAppointments` | List 5 appointment mendatang                            |

#### API Requirements

| Endpoint               | Method | Deskripsi                                          |
| ---------------------- | ------ | -------------------------------------------------- |
| `/api/doctor/stats`    | GET    | [NEW] Stats untuk dashboard dokter                 |
| `/api/doctor/schedule` | GET    | [NEW] Jadwal dokter (by session userId → doctorId) |

---

### 5.2 Doctor Schedule (`/doctor/schedule`)

**Design Reference:** `dental-care-design/doctor-schedule`

#### Components

| Task | Component            | Deskripsi                               |
| ---- | -------------------- | --------------------------------------- |
| [ ]  | `WeeklyCalendar`     | Kalender mingguan dengan slot grid      |
| [ ]  | `SlotCell`           | Cell per slot waktu dengan status color |
| [ ]  | `AppointmentPopover` | Popover detail saat click slot          |
| [ ]  | `DateNavigation`     | Navigasi minggu sebelum/sesudah         |

#### State Management

```typescript
// Local state untuk selected week
const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
```

---

### 5.3 Doctor Patients (`/doctor/patients`)

**Design Reference:** `dental-care-design/doctor-patients`

#### Components

| Task | Component     | Deskripsi                                |
| ---- | ------------- | ---------------------------------------- |
| [ ]  | `SearchBar`   | Search by nama/phone                     |
| [ ]  | `PatientList` | List pasien yang pernah ditangani        |
| [ ]  | `PatientCard` | Nama, phone, total kunjungan, last visit |

#### API Requirements

| Endpoint               | Method | Deskripsi                                          |
| ---------------------- | ------ | -------------------------------------------------- |
| `/api/doctor/patients` | GET    | [NEW] List pasien yang pernah ditangani dokter ini |

---

### 5.4 Buat Janji Temu (`/doctor/booking/new`)

**Design Reference:** `dental-care-design/doctor-booking-new`

> **Flow:** Dokter/staff dapat membuat booking untuk pasien walk-in atau via telepon. Pembayaran dilakukan offline di klinik, jadi **skip Midtrans** dan status langsung `CONFIRMED`.

#### Components

| Task | Component             | Deskripsi                                                        |
| ---- | --------------------- | ---------------------------------------------------------------- |
| [ ]  | `PatientSelect`       | Combobox autocomplete pasien existing atau input data baru       |
| [ ]  | `NewPatientForm`      | Inline form untuk pasien baru (nama, phone, email) — collapsible |
| [ ]  | `ServiceSelect`       | Dropdown layanan dengan harga                                    |
| [ ]  | `DatePicker`          | Calendar picker tanggal                                          |
| [ ]  | `TimeSlotGrid`        | Grid slot waktu (reuse dari booking flow)                        |
| [ ]  | `BookingSummary`      | Ringkasan sebelum submit                                         |
| [ ]  | `NotesTextarea`       | Catatan/keluhan pasien (optional)                                |
| [ ]  | `BookingTypeSelector` | Toggle: Walk-in / Telepon / Referral                             |

#### State Management

```typescript
// Local state (tidak perlu Zustand karena single page)
interface DoctorBookingState {
  patientMode: "existing" | "new";
  selectedPatient: Patient | null;
  newPatientData: { name: string; phone: string; email?: string } | null;
  selectedService: Service | null;
  selectedDate: Date | null;
  selectedSlot: TimeSlot | null;
  bookingType: "WALK_IN" | "PHONE" | "REFERRAL";
  notes: string;
}
```

#### API Requirements

| Endpoint               | Method | Deskripsi                                           |
| ---------------------- | ------ | --------------------------------------------------- |
| `/api/doctor/patients` | GET    | Search pasien existing (autocomplete)               |
| `/api/services`        | GET    | List layanan                                        |
| `/api/slots`           | GET    | Slot tersedia (doctorId from session)               |
| `/api/doctor/bookings` | POST   | [NEW] Buat booking dari dokter (status = CONFIRMED) |

#### Query Hooks

```typescript
// hooks/usePatientSearch.ts
useQuery(
  ["patients-search", searchTerm],
  () => api.get(`/doctor/patients?search=${searchTerm}`),
  {
    enabled: searchTerm.length >= 2,
    debounce: 300,
  }
);

// hooks/useDoctorCreateBooking.ts
useMutation(createDoctorBooking, {
  onSuccess: () => {
    toast.success("Booking berhasil dibuat!");
    router.push("/doctor");
  },
});
```

#### Validation Schema

```typescript
const doctorBookingSchema = z
  .object({
    patientId: z.string().optional(), // Jika pasien existing
    newPatient: z
      .object({
        name: z.string().min(2),
        phone: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/),
        email: z.string().email().optional(),
      })
      .optional(), // Jika pasien baru
    serviceId: z.string().min(1, "Pilih layanan"),
    slotId: z.string().min(1, "Pilih jadwal"),
    bookingType: z.enum(["WALK_IN", "PHONE", "REFERRAL"]),
    notes: z.string().max(500).optional(),
  })
  .refine((data) => data.patientId || data.newPatient, {
    message: "Pilih pasien atau isi data pasien baru",
  });
```

#### Backend Logic

```typescript
// POST /api/doctor/bookings
// 1. Validate user role === DOCTOR || ADMIN
// 2. Get doctorId from session (Doctor table linked to User)
// 3. If newPatient → create User with role PATIENT
// 4. Check slot availability
// 5. Create booking dengan:
//    - status: 'CONFIRMED' (bukan PENDING)
//    - dpPaid: 0 (bayar offline)
//    - bookingSource: 'DOCTOR_PORTAL'
//    - bookingType: WALK_IN | PHONE | REFERRAL
// 6. Mark slot isAvailable = false
// 7. Optional: Send WhatsApp confirmation
// 8. Return booking data
```

#### Database Changes (Optional)

```prisma
// Tambahkan field baru di model Booking untuk tracking source
model Booking {
  // ... existing fields
  bookingSource  BookingSource  @default(PATIENT_ONLINE)
  bookingType    BookingType?   // WALK_IN, PHONE, REFERRAL
}

enum BookingSource {
  PATIENT_ONLINE   // Booking oleh pasien via website
  DOCTOR_PORTAL    // Booking oleh dokter/staff
  ADMIN_DASHBOARD  // Booking oleh admin
}

enum BookingType {
  WALK_IN
  PHONE
  REFERRAL
}
```

---

### 5.5 Tambah Pasien (`/doctor/patients/new`)

**Design Reference:** `dental-care-design/doctor-patient-new`

#### Components

| Task | Component      | Deskripsi                        |
| ---- | -------------- | -------------------------------- |
| [ ]  | `PatientForm`  | Form: nama, phone, email, alamat |
| [ ]  | `SubmitButton` | Button simpan                    |

#### API Requirements

| Endpoint               | Method | Deskripsi                            |
| ---------------------- | ------ | ------------------------------------ |
| `/api/doctor/patients` | POST   | [NEW] Tambah pasien baru dari dokter |

---

## 6. Admin Dashboard

### 6.1 Dashboard Home (`/dashboard`)

**Design Reference:** `dental-care-design/admin-dashboard`

#### Components

| Task | Component               | Deskripsi                                                            |
| ---- | ----------------------- | -------------------------------------------------------------------- |
| [ ]  | `AdminHeader`           | Welcome, quick stats                                                 |
| [ ]  | `StatCards`             | 4 cards: Booking Hari Ini, Pending Payment, Revenue DP, Total Pasien |
| [ ]  | `TodayScheduleTimeline` | Timeline grouped by dokter                                           |
| [ ]  | `RecentBookingsTable`   | Tabel 10 booking terbaru                                             |
| [ ]  | `QuickActions`          | Button: Check-in, Update Status                                      |

#### API Requirements

| Endpoint              | Method | Deskripsi                   |
| --------------------- | ------ | --------------------------- |
| `/api/admin/stats`    | GET    | [NEW] Dashboard stats       |
| `/api/admin/bookings` | GET    | List booking dengan filters |

---

### 6.2 Schedule Master (`/dashboard/schedule`)

**Design Reference:** `dental-care-design/admin-dashboard-schedule`

#### Components

| Task | Component             | Deskripsi                         |
| ---- | --------------------- | --------------------------------- |
| [ ]  | `DoctorFilterTabs`    | Filter by dokter                  |
| [ ]  | `ScheduleCalendar`    | Kalender dengan view daily/weekly |
| [ ]  | `SlotManagement`      | Block/unblock slot                |
| [ ]  | `GenerateSlotsButton` | Button generate slot baru         |

#### API Requirements

| Endpoint                      | Method | Deskripsi                   |
| ----------------------------- | ------ | --------------------------- |
| `/api/admin/schedule`         | GET    | [NEW] Jadwal semua dokter   |
| `/api/admin/slots/generate`   | POST   | Generate slot dari template |
| `/api/admin/slots/[id]/block` | PUT    | [NEW] Block/unblock slot    |

---

### 6.3 Bookings Management (`/dashboard/bookings`)

**Design Reference:** `dental-care-design/admin-dashboard-bookings`

#### Components

| Task | Component            | Deskripsi                                |
| ---- | -------------------- | ---------------------------------------- |
| [ ]  | `FilterBar`          | Filters: status, dokter, tanggal, search |
| [ ]  | `BookingsDataTable`  | DataTable dengan sorting, pagination     |
| [ ]  | `StatusDropdown`     | Inline status update                     |
| [ ]  | `RowActions`         | View detail, cancel, send reminder       |
| [ ]  | `BookingDetailModal` | Modal detail booking lengkap             |

#### API Requirements

| Endpoint                            | Method | Deskripsi                       |
| ----------------------------------- | ------ | ------------------------------- |
| `/api/admin/bookings`               | GET    | List dengan filter & pagination |
| `/api/admin/bookings/[id]/status`   | PUT    | Update status                   |
| `/api/admin/bookings/[id]/reminder` | POST   | [NEW] Manual send reminder      |

---

### 6.4 Doctors Management (`/dashboard/doctors`)

**Design Reference:** `dental-care-design/admin-dashboard-doctor`

#### Components

| Task | Component              | Deskripsi                                           |
| ---- | ---------------------- | --------------------------------------------------- |
| [ ]  | `DoctorGridCards`      | Grid card dokter                                    |
| [ ]  | `DoctorCard`           | Foto, nama, spesialisasi, hari kerja, booking count |
| [ ]  | `AddDoctorModal`       | Modal form tambah dokter                            |
| [ ]  | `EditDoctorModal`      | Modal form edit dokter                              |
| [ ]  | `ScheduleTemplateForm` | Form jadwal mingguan dokter                         |

#### API Requirements

| Endpoint                           | Method | Deskripsi                      |
| ---------------------------------- | ------ | ------------------------------ |
| `/api/admin/doctors`               | GET    | List dokter                    |
| `/api/admin/doctors`               | POST   | Tambah dokter                  |
| `/api/admin/doctors/[id]`          | PUT    | Update dokter                  |
| `/api/admin/doctors/[id]`          | DELETE | Hapus dokter (soft delete)     |
| `/api/admin/doctors/[id]/schedule` | PUT    | [NEW] Update schedule template |

---

### 6.5 Services Management (`/dashboard/services`)

**Design Reference:** `dental-care-design/admin-dashboard-services`

#### Components

| Task | Component            | Deskripsi                 |
| ---- | -------------------- | ------------------------- |
| [ ]  | `ServicesDataTable`  | DataTable layanan         |
| [ ]  | `AddServiceModal`    | Modal form tambah layanan |
| [ ]  | `EditServiceModal`   | Modal form edit layanan   |
| [ ]  | `ToggleActiveSwitch` | Toggle aktif/nonaktif     |

#### API Requirements

| Endpoint                   | Method | Deskripsi                   |
| -------------------------- | ------ | --------------------------- |
| `/api/admin/services`      | GET    | List layanan                |
| `/api/admin/services`      | POST   | Tambah layanan              |
| `/api/admin/services/[id]` | PUT    | Update layanan              |
| `/api/admin/services/[id]` | DELETE | Hapus layanan (soft delete) |

---

### 6.6 Patients Database (`/dashboard/patients`)

**Design Reference:** `dental-care-design/admin-dashboard-patients-database`

#### Components

| Task | Component             | Deskripsi                              |
| ---- | --------------------- | -------------------------------------- |
| [ ]  | `SearchBar`           | Search nama/phone/email                |
| [ ]  | `PatientsDataTable`   | DataTable dengan info pasien           |
| [ ]  | `PatientDetailDrawer` | Drawer dengan detail + riwayat booking |
| [ ]  | `WhatsAppLink`        | Clickable link ke WhatsApp             |

#### API Requirements

| Endpoint                   | Method | Deskripsi                          |
| -------------------------- | ------ | ---------------------------------- |
| `/api/admin/patients`      | GET    | [NEW] List semua pasien            |
| `/api/admin/patients/[id]` | GET    | [NEW] Detail pasien dengan riwayat |

---

### 6.7 Reports Page (`/dashboard/reports`)

**Design Reference:** `dental-care-design/admin-dashboard-reports`

#### Components

| Task | Component                 | Deskripsi                                      |
| ---- | ------------------------- | ---------------------------------------------- |
| [ ]  | `DateRangeFilter`         | Filter range tanggal                           |
| [ ]  | `RevenueChart`            | Line chart pendapatan DP                       |
| [ ]  | `BookingsPerServiceChart` | Bar chart booking per layanan                  |
| [ ]  | `BookingsPerDoctorChart`  | Bar chart booking per dokter                   |
| [ ]  | `StatusBreakdownPie`      | Pie chart breakdown status                     |
| [ ]  | `KPICards`                | Cards: Total Revenue, Avg per Day, Top Service |

#### Library

```bash
npm install recharts
# atau
npm install chart.js react-chartjs-2
```

#### API Requirements

| Endpoint             | Method | Deskripsi                             |
| -------------------- | ------ | ------------------------------------- |
| `/api/admin/reports` | GET    | Data reports dengan date range filter |

---

### 6.8 Settings Page (`/dashboard/settings`)

**Design Reference:** `dental-care-design/admin-dashboard-setting-integration`

#### Components

| Task | Component                 | Deskripsi                |
| ---- | ------------------------- | ------------------------ |
| [ ]  | `ClinicInfoForm`          | Form info klinik         |
| [ ]  | `PaymentSettingsForm`     | Payment timeout setting  |
| [ ]  | `WhatsAppIntegrationForm` | Fonnte API config        |
| [ ]  | `OperationalHoursForm`    | Jam operasional per hari |

#### API Requirements

| Endpoint              | Method | Deskripsi              |
| --------------------- | ------ | ---------------------- |
| `/api/admin/settings` | GET    | Get clinic settings    |
| `/api/admin/settings` | PUT    | Update clinic settings |

---

## 7. Shared UI Components

### 7.1 Base Components (`/components/ui`)

| Task | Component   | Deskripsi                                                           |
| ---- | ----------- | ------------------------------------------------------------------- |
| [ ]  | `Button`    | Button dengan variants (primary, secondary, outline, ghost, danger) |
| [ ]  | `Input`     | Input field dengan label, error state                               |
| [ ]  | `Select`    | Dropdown select                                                     |
| [ ]  | `Textarea`  | Multiline input                                                     |
| [ ]  | `Badge`     | Status badges dengan color variants                                 |
| [ ]  | `Card`      | Container card                                                      |
| [ ]  | `Modal`     | Modal dialog                                                        |
| [ ]  | `Drawer`    | Slide-in drawer                                                     |
| [ ]  | `Toast`     | Notification toast                                                  |
| [ ]  | `Skeleton`  | Loading skeleton                                                    |
| [ ]  | `Avatar`    | User/doctor avatar                                                  |
| [ ]  | `DataTable` | Reusable data table dengan sorting, pagination                      |
| [ ]  | `Calendar`  | Date picker                                                         |
| [ ]  | `Tabs`      | Tab navigation                                                      |
| [ ]  | `Dropdown`  | Dropdown menu                                                       |
| [ ]  | `Tooltip`   | Tooltip on hover                                                    |
| [ ]  | `Alert`     | Alert boxes (info, warning, error, success)                         |
| [ ]  | `Spinner`   | Loading spinner                                                     |

---

## 8. Additional Features

### 8.1 WhatsApp Notifications

#### Backend Logic

```typescript
// lib/whatsapp.ts
// Fonnte API integration

// Templates yang perlu dibuat:
// 1. BOOKING_CONFIRMATION - setelah payment sukses
// 2. BOOKING_REMINDER_H1 - H-1 reminder
// 3. BOOKING_CANCELLED - konfirmasi pembatalan
// 4. ADMIN_NEW_BOOKING - notif ke admin
```

---

### 8.2 Midtrans Payment

#### Frontend Component

| Task | Component        | Deskripsi                   |
| ---- | ---------------- | --------------------------- |
| [ ]  | `MidtransScript` | Script loader untuk Snap.js |
| [ ]  | `PaymentModal`   | Wrapper untuk Snap popup    |
| [ ]  | `PaymentTimer`   | Countdown 15 menit          |

#### Logic

```typescript
// hooks/useMidtrans.ts
const openPayment = (token: string) => {
  window.snap.pay(token, {
    onSuccess: (result) => {
      /* redirect to success */
    },
    onPending: (result) => {
      /* show pending */
    },
    onError: (result) => {
      /* show error */
    },
    onClose: () => {
      /* payment popup closed */
    },
  });
};
```

---

### 8.3 File Upload (Supabase Storage)

#### Components

| Task | Component      | Deskripsi                          |
| ---- | -------------- | ---------------------------------- |
| [ ]  | `ImageUpload`  | Drag & drop image upload           |
| [ ]  | `AvatarUpload` | Avatar specific upload dengan crop |

#### Helper Functions

```typescript
// lib/supabase-storage.ts
export async function uploadImage(
  file: File,
  bucket: string,
  path: string
): Promise<string>;
export async function deleteImage(path: string): Promise<void>;
export function getPublicUrl(path: string): string;
```

---

## 9. Summary: New API Endpoints Required (Frontend Perspective)

| Endpoint                            | Method | Priority | Description                   |
| ----------------------------------- | ------ | -------- | ----------------------------- |
| `/api/gallery`                      | GET    | Medium   | Gallery images by category    |
| `/api/blog`                         | GET    | Low      | Blog articles list            |
| `/api/blog/[slug]`                  | GET    | Low      | Blog article detail           |
| `/api/contact`                      | POST   | Medium   | Submit contact form           |
| `/api/user/profile`                 | PUT    | High     | Update user profile           |
| `/api/user/avatar`                  | POST   | Medium   | Upload avatar                 |
| `/api/doctor/stats`                 | GET    | High     | Doctor dashboard stats        |
| `/api/doctor/schedule`              | GET    | High     | Doctor's own schedule         |
| `/api/doctor/patients`              | GET    | High     | Doctor's patient list         |
| `/api/doctor/patients`              | POST   | Medium   | Add new patient               |
| `/api/doctor/bookings`              | POST   | Medium   | Create booking (skip payment) |
| `/api/admin/stats`                  | GET    | High     | Admin dashboard stats         |
| `/api/admin/schedule`               | GET    | High     | All doctors schedule          |
| `/api/admin/slots/[id]/block`       | PUT    | Medium   | Block/unblock slot            |
| `/api/admin/bookings/[id]/reminder` | POST   | Low      | Manual send reminder          |
| `/api/admin/doctors/[id]/schedule`  | PUT    | Medium   | Update schedule template      |
| `/api/admin/patients`               | GET    | High     | All patients list             |
| `/api/admin/patients/[id]`          | GET    | Medium   | Patient detail with history   |

---

## 10. Summary: New Database Tables/Columns Required

### New Tables

| Table          | Purpose              | Priority |
| -------------- | -------------------- | -------- |
| `GalleryImage` | Store gallery photos | Medium   |
| `BlogPost`     | Store blog articles  | Low      |

### New Columns

| Table     | Column            | Type    | Purpose                    |
| --------- | ----------------- | ------- | -------------------------- |
| `Doctor`  | `yearsExperience` | Int     | Dokter detail page         |
| `Doctor`  | `rating`          | Decimal | Review score display       |
| `Service` | `category`        | String  | Filter layanan by category |
| `User`    | `address`         | String? | Profile edit               |

---

## 11. Library Dependencies

### Core Dependencies (Already Installed)

- `next` v14/15
- `react` v18
- `typescript`
- `tailwindcss`
- `prisma` + `@prisma/client`
- `next-auth` (Auth.js v5)
- `zustand`
- `@tanstack/react-query`
- `axios`
- `react-hook-form` + `@hookform/resolvers` + `zod`
- `@supabase/supabase-js`

### Additional Dependencies To Install

```bash
# Charts
npm install recharts
# atau
npm install chart.js react-chartjs-2

# QR Code
npm install qrcode.react

# Date utilities
npm install date-fns

# Animations (optional)
npm install framer-motion

# Image cropping (for avatar upload)
npm install react-image-crop

# Icons
npm install lucide-react

# Toast notifications
npm install sonner
# atau
npm install react-hot-toast
```

---

## Notes

- Semua komponen menggunakan **TypeScript** dengan proper typing
- Gunakan **Server Components** untuk data fetching di halaman statis/SEO
- Gunakan **Client Components** untuk interaktivitas (booking wizard, modals, forms)
- Semua forms harus memiliki **loading state**, **error handling**, dan **validation messages**
- Semua API calls harus menggunakan **TanStack Query** untuk caching dan refetching
- State management booking flow menggunakan **Zustand** dengan **persist middleware**
- Responsive design: **Mobile-first** approach
