# Dental Care - Task Breakdown (Frontend Development)

> **Task Registry** — Daftar tugas pengembangan front-end beserta detail teknis yang dibutuhkan.

---

## ⚠️ IMPORTANT: Design Slicing Notes

### Project Info

- **Project Name:** Dental Care (Sistem Reservasi Klinik Gigi)
- **Design Source:** `dental-care-design/` folder
- **Objective:** Rombak total design website sesuai dengan design yang sudah disiapkan

### Design Resources

Setiap halaman di folder `dental-care-design/` memiliki **2 resource** yang harus dimanfaatkan:

| File         | Fungsi                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------- |
| `code.html`  | HTML hasil slicing — gunakan sebagai referensi struktur, class names, dan styling        |
| `screen.png` | Screenshot design — gunakan sebagai referensi visual untuk memastikan hasil akhir sesuai |

### Workflow Slicing

1. **Buka** folder design: `dental-care-design/[nama-halaman]/`
2. **Lihat** `screen.png` untuk memahami visual design
3. **Baca** `code.html` untuk referensi struktur HTML dan Tailwind classes
4. **Convert** ke React/Next.js component dengan proper TypeScript
5. **Sesuaikan** dengan arsitektur project (hooks, state, API integration)

### Design Style Guide

Berdasarkan design di `dental-care-design/`:

- **Style:** Playful "pop/sticker" style dengan border solid dan shadow
- **Primary Color:** Teal (`#0d9488`)
- **Secondary Color:** Coral (`#FF8A65`)
- **Accent Colors:** Yellow (`#FFD54F`), Purple (`#B39DDB`)
- **Background:** Warm Cream (`#FFFAEB`)
- **Border Style:** `border-2 border-[#111817]`
- **Shadow Style:** `shadow-pop` (4px 4px 0px 0px)
- **Border Radius:** Large rounded corners (`rounded-2xl`, `rounded-full`)
- **Font:** Spline Sans

### Available Design Pages

```
dental-care-design/
├── home-page/           # Landing page
├── layanan/             # Services list
├── layanan-detail/      # Service detail
├── doctor/              # Doctors list
├── doctor-detail/       # Doctor profile
├── booking/             # Booking flow (3 steps)
├── booking-success/     # E-Ticket page
├── my-bookings/         # Patient booking history
├── login/               # Sign in page
├── register/            # Sign up page
├── edit-profile/        # Profile edit
├── gallery/             # Photo gallery
├── blog/                # Blog list
├── about/               # About us
├── contact/             # Contact page
├── privacy/             # Privacy policy
├── terms/               # Terms of service
├── not-found/           # 404 page
├── admin-dashboard/     # Admin home
├── admin-dashboard-bookings/
├── admin-dashboard-schedule/
├── admin-dashboard-doctor/
├── admin-dashboard-services/
├── admin-dashboard-patients-database/
├── admin-dashboard-reports/
├── admin-dashboard-setting-integration/
├── doctor/              # Doctor portal home
├── doctor-schedule/     # Doctor schedule
├── doctor-patients/     # Doctor patient list
├── doctor-booking-new/  # Doctor create booking
└── doctor-patient-new/  # Doctor add patient
```

---

## Legend

- `[ ]` — Belum dikerjakan
- `[/]` — Sedang dikerjakan
- `[x]` — Selesai

---

## 1. Public Pages

### 1.1 Landing Page (`/`) ✅ COMPLETED

**Design Reference:** `dental-care-design/home-page`

#### Components

| Task | Component           | Deskripsi                                                          |
| ---- | ------------------- | ------------------------------------------------------------------ |
| [x]  | `Navbar`            | Floating pill navbar dengan logo, menu navigasi, auth button       |
| [x]  | `HeroSection`       | Hero dengan headline, blob-shaped image, CTA button                |
| [x]  | `FeaturesGrid`      | 4 feature cards dengan colored icons (yellow, purple, coral, teal) |
| [x]  | `ServicesBentoGrid` | Bento grid layout untuk showcase layanan utama dengan harga        |
| [x]  | `HowItWorks`        | 3-step process dengan numbered circles                             |
| [x]  | `DoctorPreview`     | 2 dokter dengan foto circular, badge, dan bio                      |
| [x]  | `CTASection`        | Yellow background dengan dotted pattern, CTA buttons               |
| [x]  | `Footer`            | Dark footer dengan colored section headers, contact info           |

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

### 1.2 Layanan (Services List) (`/layanan`) ✅ COMPLETED

**Design Reference:** `dental-care-design/layanan`

#### Components

| Task | Component          | Deskripsi                                                            |
| ---- | ------------------ | -------------------------------------------------------------------- |
| [x]  | `PageHeader`       | Header dengan breadcrumb, title "Happy!" highlight, category filters |
| [x]  | `ServiceCardsGrid` | Grid 6 service cards dengan colored icons                            |
| [x]  | `ServiceCard`      | Card dengan icon, category badge, nama, deskripsi, CTA button        |
| [x]  | `CTASection`       | Yellow section dengan booking buttons                                |

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

### 1.3 Layanan Detail (`/layanan/[slug]`) ✅ COMPLETED

**Design Reference:** `dental-care-design/layanan-detail`

#### Components

| Task | Component      | Deskripsi                                          |
| ---- | -------------- | -------------------------------------------------- |
| [x]  | `ServiceHero`  | Blob image, info badges, rating badge, CTA buttons |
| [x]  | `ProcessSteps` | 4 numbered steps dengan colored backgrounds        |
| [x]  | `PricingCards` | 3 packages dengan "PALING LARIS" badge             |
| [x]  | `ServiceFAQ`   | Accordion FAQ dengan expand animation              |
| [x]  | `CTASection`   | Yellow background dengan promo CTA                 |

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

### 1.4 Dokter Page (`/dokter`) ✅ COMPLETED

**Design Reference:** `dental-care-design/doctor`

#### Components

| Task | Component    | Deskripsi                                                     |
| ---- | ------------ | ------------------------------------------------------------- |
| [x]  | `PageHeader` | Header "Tim Dokter Super" dengan purple highlight             |
| [x]  | `DoctorGrid` | Grid 4 dokter dengan 2 columns                                |
| [x]  | `DoctorCard` | Card dengan foto, badge, quote, stats (rating, exp, patients) |
| [x]  | `CTASection` | Yellow section "Bingung Pilih Dokter?"                        |

#### API Requirements

| Endpoint       | Method | Deskripsi                |
| -------------- | ------ | ------------------------ |
| `/api/doctors` | GET    | Fetch semua dokter aktif |

---

### 1.5 Dokter Detail (`/dokter/[id]`) ✅ COMPLETED

**Design Reference:** `dental-care-design/doctor-detail`

#### Components

| Task | Component           | Deskripsi                                           |
| ---- | ------------------- | --------------------------------------------------- |
| [x]  | `DoctorHero`        | Foto besar dengan tilt, STR badge, verified         |
| [x]  | `DoctorBio`         | Bio card dengan quote dan extended bio              |
| [x]  | `DoctorCredentials` | Education & Certifications boxes                    |
| [x]  | `DoctorStats`       | Stats row (experience, patients, rating, guarantee) |
| [x]  | `DoctorSchedule`    | Schedule cards dengan available/booked slots        |
| [x]  | `Testimonials`      | 3 testimonial cards dengan star ratings             |

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

### 1.6 Gallery Page (`/gallery`) ✅ COMPLETED

**Design Reference:** `dental-care-design/gallery`

#### Components

| Task | Component             | Deskripsi                             |
| ---- | --------------------- | ------------------------------------- |
| [x]  | `PageHeader`          | Header "Galeri Momen & Senyum Happy!" |
| [x]  | `TransformasiSection` | 2 before/after cards dengan compare   |
| [x]  | `KlinikSection`       | Bento grid dengan varied shapes       |
| [x]  | `StaffSection`        | 4 circular photos dengan colored bg   |

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

### 1.7 Blog Page (`/blog`) ✅ COMPLETED

**Design Reference:** `dental-care-design/blog`

#### Components

| Task | Component      | Deskripsi                                        |
| ---- | -------------- | ------------------------------------------------ |
| [x]  | `PageHeader`   | Header "Tips Gigi & Gaya Hidup" dengan badge     |
| [x]  | `Sidebar`      | 5 Kategori + Newsletter signup                   |
| [x]  | `FeaturedPost` | Card besar 2-column dengan Featured badge        |
| [x]  | `ArticleGrid`  | 4 cards dalam 2x2 grid dengan varied backgrounds |
| [x]  | `Pagination`   | Numbered pagination buttons                      |
| [x]  | `CTASection`   | Yellow section "Punya Pertanyaan Spesifik?"      |

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

### 1.8 About Page (`/about`) ✅ COMPLETED

**Design Reference:** `dental-care-design/about`

#### Components

| Task | Component        | Deskripsi                            |
| ---- | ---------------- | ------------------------------------ |
| [x]  | `Header`         | Badge "Halo, Salam Kenal!" + tagline |
| [x]  | `ValueCards`     | 3 cards (Fun, Safety, Expert)        |
| [x]  | `TeamSection`    | 2 doctor cards dengan profil link    |
| [x]  | `FacilitiesGrid` | Bento grid 4 items                   |

#### Static Content

Tidak memerlukan API khusus — konten dapat di-hardcode atau dari CMS.

---

### 1.9 Contact Page (`/contact`) ✅ COMPLETED

**Design Reference:** `dental-care-design/contact`

#### Components

| Task | Component      | Deskripsi                              |
| ---- | -------------- | -------------------------------------- |
| [x]  | `Header`       | Badge "Kami Siap Membantu" + title     |
| [x]  | `ContactCards` | 3 cards: Telepon, Email, WhatsApp      |
| [x]  | `MapEmbed`     | Google Maps dengan "Lokasi Kami" badge |
| [x]  | `ContactForm`  | Form: nama, WA, email, topik, pesan    |

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

### 1.10 Privacy Policy (`/privacy`) ✅ COMPLETED

**Design Reference:** `dental-care-design/privacy`

#### Components

| Task | Component     | Deskripsi                         |
| ---- | ------------- | --------------------------------- |
| [x]  | `Header`      | Badge "Privasi Anda Aman" + title |
| [x]  | `ContentCard` | 6 sections dengan checkmark lists |
| [x]  | `ContactBox`  | Email privacy@dentalclinic.id     |

#### Static Content

Konten statis, tidak perlu API.

---

### 1.11 Terms of Service (`/terms`) ✅ COMPLETED

**Design Reference:** `dental-care-design/terms`

#### Components

| Task | Component     | Deskripsi                         |
| ---- | ------------- | --------------------------------- |
| [x]  | `Header`      | Badge "Ketentuan Layanan" + title |
| [x]  | `ContentCard` | 6 sections dengan checkmark lists |
| [x]  | `ContactBox`  | Email help@dentalclinic.id        |

---

### 1.12 404 Not Found (`/not-found`) ✅ COMPLETED

**Design Reference:** `dental-care-design/not-found`

#### Components

| Task | Component         | Deskripsi                                                                                  |
| ---- | ----------------- | ------------------------------------------------------------------------------------------ |
| [x]  | `NotFoundContent` | Ilustrasi 4-0-4 dengan sad emoji, badge "Oops! Gigi ini hilang...", button kembali ke home |

---

## 2. Auth Pages

### 2.1 Sign In (`/auth/login`) ✅ COMPLETED

**Design Reference:** `dental-care-design/login`

#### Components

| Task | Component     | Deskripsi                                                 |
| ---- | ------------- | --------------------------------------------------------- |
| [x]  | `SignInCard`  | 2-column layout, Google OAuth button, email/password form |
| [x]  | `HeroImage`   | Side image dengan member benefits card                    |
| [x]  | `InfoBox`     | Member benefits (jadwal, riwayat, pengingat)              |
| [x]  | `FooterTerms` | Link ke privacy & terms                                   |

#### Logic

```typescript
// Menggunakan Auth.js (next-auth)
// signIn('google', { callbackUrl: '/' })
```

---

### 2.2 Sign Up (`/auth/register`) ✅ COMPLETED

**Design Reference:** `dental-care-design/register`

#### Components

| Task | Component       | Deskripsi                                    |
| ---- | --------------- | -------------------------------------------- |
| [x]  | `RegisterCard`  | 2-column layout, Google OAuth, manual form   |
| [x]  | `PhotoUpload`   | Foto profil uploader                         |
| [x]  | `FormFields`    | Nama, email, phone, password                 |
| [x]  | `TermsCheckbox` | Agreement checkbox dengan link terms/privacy |

---

### 2.3 Edit Profile (`/profile/edit`) ✅ COMPLETED

**Design Reference:** `dental-care-design/edit-profile`

#### Components

| Task | Component        | Deskripsi                                 |
| ---- | ---------------- | ----------------------------------------- |
| [x]  | `ProfileSidebar` | Sidebar dengan foto, menu navigasi        |
| [x]  | `ProfileForm`    | Form edit nama, phone, address, city, zip |
| [x]  | `AvatarUpload`   | Foto profil dengan hover overlay          |

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

### 3.1 Booking - Combined Flow (`/booking`) ✅ COMPLETED

**Design Reference:** `dental-care-design/booking`

#### Components

| Task | Component                | Deskripsi                                                   |
| ---- | ------------------------ | ----------------------------------------------------------- |
| [x]  | `BookingStepper`         | 3-step progress bar (Layanan → Jadwal → Data Diri)          |
| [x]  | `Step1_ServiceSelection` | 4 ServiceCard (Behel, Tambal, Scaling, Bleaching)           |
| [x]  | `Step2_DoctorSchedule`   | Doctor selection + Date picker + Time slot grid             |
| [x]  | `Step3_Checkout`         | Form nama, WhatsApp, email, catatan                         |
| [x]  | `ServiceCard`            | Card dengan icon, nama, harga, selectable dengan check icon |
| [x]  | `DoctorCard`             | Card dokter dengan foto, nama, spesialisasi                 |
| [x]  | `DatePicker`             | Horizontal date cards (5 hari)                              |
| [x]  | `TimeSlotGrid`           | Grid 6 slot (09:00-15:00), disabled/available state         |
| [x]  | `BookingSummary`         | Sticky sidebar dengan ringkasan + total pembayaran          |
| [x]  | `PatientInfoForm`        | Form: nama, WhatsApp, email, catatan tambahan               |

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

### 3.2 Booking Success (`/booking/success`) ✅ COMPLETED

**Design Reference:** `dental-care-design/booking-success`

#### Components

| Task | Component        | Deskripsi                                        |
| ---- | ---------------- | ------------------------------------------------ |
| [x]  | `SuccessHeader`  | Checkmark icon, "Yey! Booking Berhasil!" message |
| [x]  | `ETicketCard`    | Ticket-style card dengan QR Code #BK-882910      |
| [x]  | `BookingDetails` | Dokter card, lokasi dengan icon                  |
| [x]  | `PaymentInfo`    | Total deposit Rp 50.000, sisa pembayaran         |
| [x]  | `ClinicAddress`  | Alamat klinik Jakarta Selatan                    |
| [x]  | `ReminderAlert`  | "Pengingat Ramah" box - datang 15 menit awal     |
| [x]  | `ActionButtons`  | "Add to Calendar", "Ke Dashboard Saya"           |

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

### 4.1 My Bookings (`/my-bookings`) ✅ COMPLETED

**Design Reference:** `dental-care-design/my-bookings`

#### Components

| Task | Component         | Deskripsi                                                             |
| ---- | ----------------- | --------------------------------------------------------------------- |
| [x]  | `PageHeader`      | "Booking Saya" header dengan animasi bintang                          |
| [x]  | `FilterTabs`      | 3 tabs: Akan Datang (2), Selesai, Dibatalkan                          |
| [x]  | `BookingCardList` | List BookingCard dengan date box                                      |
| [x]  | `BookingCard`     | Card dengan tanggal, layanan, kode, dokter, status badge, action btns |
| [x]  | `EmptyState`      | Ikon calendar + pesan "Belum Ada Jadwal" + CTA "Buat Janji Baru"      |

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

### 5.1 Doctor Dashboard (`/doctor`) ✅ COMPLETED

**Design Reference:** `dental-care-design/doctor`

#### Components

| Task | Component         | Deskripsi                                                                |
| ---- | ----------------- | ------------------------------------------------------------------------ |
| [x]  | `DoctorHeader`    | "Selamat Pagi, Dok!" dengan emoji 👋                                     |
| [x]  | `StatCards`       | 4 cards: Pasien Hari Ini (8), Akan Datang (24), Selesai (45), Pendapatan |
| [x]  | `TodaySchedule`   | 4 patient cards dengan waktu, nama, service badge, actions               |
| [x]  | `TomorrowSidebar` | 3 upcoming patients untuk besok                                          |
| [x]  | `TipsBox`         | Tips harian untuk dokter                                                 |

#### API Requirements

| Endpoint               | Method | Deskripsi                                          |
| ---------------------- | ------ | -------------------------------------------------- |
| `/api/doctor/stats`    | GET    | [NEW] Stats untuk dashboard dokter                 |
| `/api/doctor/schedule` | GET    | [NEW] Jadwal dokter (by session userId → doctorId) |

---

### 5.2 Doctor Schedule (`/doctor/schedule`) ✅ COMPLETED

**Design Reference:** `dental-care-design/doctor-schedule`

#### Components

| Task | Component               | Deskripsi                                                 |
| ---- | ----------------------- | --------------------------------------------------------- |
| [x]  | `WeeklyCalendar`        | 6-hari kalender grid (Sen-Sab) dengan time slots          |
| [x]  | `SlotCell`              | Appointment cards berwarna + dashed empty slot            |
| [x]  | `LunchBreak`            | Row istirahat siang                                       |
| [x]  | `DateNavigation`        | Tombol chevron prev/next, view toggle (Hari/Minggu/Bulan) |
| [x]  | `SlotManagementSidebar` | Add slot form + slot list dengan status (booked/tersedia) |
| [x]  | `TipsBox`               | Tips efisiensi kuning                                     |

#### State Management

```typescript
// Local state untuk selected week
const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
```

---

### 5.3 Doctor Patients (`/doctor/patients`) ✅ COMPLETED

**Design Reference:** `dental-care-design/doctor-patients`

#### Components

| Task | Component     | Deskripsi                                                         |
| ---- | ------------- | ----------------------------------------------------------------- |
| [x]  | `SearchBar`   | Search by nama/phone/ID dengan icon                               |
| [x]  | `FilterTabs`  | Tabs: Semua, Pasien Baru, Berlangganan + Filter button            |
| [x]  | `PatientList` | List pasien dengan cards                                          |
| [x]  | `PatientCard` | Avatar, nama, ID, phone, age, last visit, service, payment status |
| [x]  | `Pagination`  | Pagination dengan pop/sticker styling                             |

#### API Requirements

| Endpoint               | Method | Deskripsi                                          |
| ---------------------- | ------ | -------------------------------------------------- |
| `/api/doctor/patients` | GET    | [NEW] List pasien yang pernah ditangani dokter ini |

---

### 5.4 Buat Janji Temu (`/doctor/booking/new`) ✅ COMPLETED

**Design Reference:** `dental-care-design/doctor-booking-new`

> **Flow:** Dokter/staff dapat membuat booking untuk pasien walk-in atau via telepon. Pembayaran dilakukan offline di klinik, jadi **skip Midtrans** dan status langsung `CONFIRMED`.

#### Components

| Task | Component       | Deskripsi                                                                        |
| ---- | --------------- | -------------------------------------------------------------------------------- |
| [x]  | `PatientSearch` | Input search pasien + button "Pasien Baru"                                       |
| [x]  | `ServiceSelect` | 5 service cards dengan radio selection (Check-up, Scaling, Tambal, Cabut, Kawat) |
| [x]  | `DatePicker`    | Mini calendar Oktober 2023                                                       |
| [x]  | `TimeSlotGrid`  | 8 time slots dengan available/booked state                                       |
| [x]  | `NotesTextarea` | Catatan tambahan                                                                 |
| [x]  | `ActionButtons` | Batal + Simpan Janji Temu                                                        |

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

### 5.5 Tambah Pasien (`/doctor/patients/new`) ✅ COMPLETED

**Design Reference:** `dental-care-design/doctor-patient-new`

#### Components

| Task | Component       | Deskripsi                                               |
| ---- | --------------- | ------------------------------------------------------- |
| [x]  | `PageHeader`    | Icon + title "Tambah Pasien" + back link                |
| [x]  | `PatientForm`   | Form: nama, phone, email, alamat dengan pop input focus |
| [x]  | `ActionButtons` | Batal + Simpan Data Pasien buttons                      |

#### API Requirements

| Endpoint               | Method | Deskripsi                            |
| ---------------------- | ------ | ------------------------------------ |
| `/api/doctor/patients` | POST   | [NEW] Tambah pasien baru dari dokter |

---

## 6. Admin Dashboard

### 6.1 Dashboard Home (`/dashboard`) ✅ COMPLETED

**Design Reference:** `dental-care-design/admin-dashboard`

#### Components

| Task | Component               | Deskripsi                                            |
| ---- | ----------------------- | ---------------------------------------------------- |
| [x]  | `AdminLayout`           | Reusable layout with sidebar navigation              |
| [x]  | `AdminHeader`           | Welcome message, search, notifications               |
| [x]  | `StatCards`             | 4 cards: Janji Temu, Pendapatan, Pasien Baru, Rating |
| [x]  | `TodayScheduleTimeline` | Timeline with patient cards                          |
| [x]  | `QuickActions`          | Button: Booking Baru, Pasien Baru, Tagihan           |
| [x]  | `RecentBookingsTable`   | List recent bookings                                 |

#### API Requirements

| Endpoint              | Method | Deskripsi                   |
| --------------------- | ------ | --------------------------- |
| `/api/admin/stats`    | GET    | [NEW] Dashboard stats       |
| `/api/admin/bookings` | GET    | List booking dengan filters |

---

### 6.2 Schedule Master (`/dashboard/schedule`) ✅ COMPLETED

**Design Reference:** `dental-care-design/admin-dashboard-schedule`

#### Components

| Task | Component          | Deskripsi                            |
| ---- | ------------------ | ------------------------------------ |
| [x]  | `MonthYearNav`     | Month navigation with prev/next      |
| [x]  | `ViewToggle`       | Bulan/Minggu/Hari toggle buttons     |
| [x]  | `DoctorFilterTabs` | Doctor dropdown filter               |
| [x]  | `CalendarGrid`     | Monthly calendar with dot indicators |
| [x]  | `SlotManagement`   | Slot list with open/booked status    |
| [x]  | `BlockDayCard`     | Block seharian functionality         |

#### API Requirements

| Endpoint                      | Method | Deskripsi                   |
| ----------------------------- | ------ | --------------------------- |
| `/api/admin/schedule`         | GET    | [NEW] Jadwal semua dokter   |
| `/api/admin/slots/generate`   | POST   | Generate slot dari template |
| `/api/admin/slots/[id]/block` | PUT    | [NEW] Block/unblock slot    |

---

### 6.3 Bookings Management (`/dashboard/bookings`) ✅ COMPLETED

**Design Reference:** `dental-care-design/admin-dashboard-bookings`

#### Components

| Task | Component           | Deskripsi                                      |
| ---- | ------------------- | ---------------------------------------------- |
| [x]  | `FilterBar`         | Filters: search, doctor, service, status, date |
| [x]  | `BookingsDataTable` | DataTable with sorting, pagination             |
| [x]  | `StatusBadge`       | Status badges with colors                      |
| [x]  | `RowActions`        | View, edit, delete action buttons              |
| [x]  | `Pagination`        | Page navigation                                |

#### API Requirements

| Endpoint                            | Method | Deskripsi                       |
| ----------------------------------- | ------ | ------------------------------- |
| `/api/admin/bookings`               | GET    | List dengan filter & pagination |
| `/api/admin/bookings/[id]/status`   | PUT    | Update status                   |
| `/api/admin/bookings/[id]/reminder` | POST   | [NEW] Manual send reminder      |

---

### 6.4 Doctors Management (`/dashboard/doctors`) ✅ COMPLETED

**Design Reference:** `dental-care-design/admin-dashboard-doctor`

#### Components

| Task | Component         | Deskripsi                                    |
| ---- | ----------------- | -------------------------------------------- |
| [x]  | `SearchBar`       | Search doctor by name or ID                  |
| [x]  | `FilterTabs`      | All Specialists, Dentists, Surgeons          |
| [x]  | `DoctorGridCards` | Grid card dokter with avatar, stats, actions |
| [x]  | `AddDoctorCard`   | Add new doctor CTA card                      |

#### API Requirements

| Endpoint                           | Method | Deskripsi                      |
| ---------------------------------- | ------ | ------------------------------ |
| `/api/admin/doctors`               | GET    | List dokter                    |
| `/api/admin/doctors`               | POST   | Tambah dokter                  |
| `/api/admin/doctors/[id]`          | PUT    | Update dokter                  |
| `/api/admin/doctors/[id]`          | DELETE | Hapus dokter (soft delete)     |
| `/api/admin/doctors/[id]/schedule` | PUT    | [NEW] Update schedule template |

---

### 6.5 Services Management (`/dashboard/services`) ✅ COMPLETED

**Design Reference:** `dental-care-design/admin-dashboard-services`

#### Components

| Task | Component           | Deskripsi                          |
| ---- | ------------------- | ---------------------------------- |
| [x]  | `ServiceStats`      | Total services count               |
| [x]  | `CategoryTabs`      | Category filter tabs               |
| [x]  | `ServiceCards`      | Service cards with price, duration |
| [x]  | `AddServiceModal`   | Modal form tambah layanan          |
| [x]  | `EditDeleteButtons` | Edit and delete actions            |

#### API Requirements

| Endpoint                   | Method | Deskripsi                   |
| -------------------------- | ------ | --------------------------- |
| `/api/admin/services`      | GET    | List layanan                |
| `/api/admin/services`      | POST   | Tambah layanan              |
| `/api/admin/services/[id]` | PUT    | Update layanan              |
| `/api/admin/services/[id]` | DELETE | Hapus layanan (soft delete) |

---

### 6.6 Patients Database (`/dashboard/patients`) ✅ COMPLETED

**Design Reference:** `dental-care-design/admin-dashboard-patients-database`

#### Components

| Task | Component             | Deskripsi                               |
| ---- | --------------------- | --------------------------------------- |
| [x]  | `SearchBar`           | Search nama/phone/email                 |
| [x]  | `PatientsDataTable`   | DataTable dengan info pasien            |
| [x]  | `PatientDetailDrawer` | Sidebar dengan detail + riwayat booking |
| [x]  | `Pagination`          | Navigasi halaman                        |

#### API Requirements

| Endpoint                   | Method | Deskripsi                          |
| -------------------------- | ------ | ---------------------------------- |
| `/api/admin/patients`      | GET    | [NEW] List semua pasien            |
| `/api/admin/patients/[id]` | GET    | [NEW] Detail pasien dengan riwayat |

---

### 6.7 Reports Page (`/dashboard/reports`) ✅ COMPLETED

**Design Reference:** `dental-care-design/admin-dashboard-reports`

#### Components

| Task | Component                | Deskripsi                                      |
| ---- | ------------------------ | ---------------------------------------------- |
| [x]  | `DateRangeFilter`        | Filter range tanggal                           |
| [x]  | `KPICards`               | Cards: Total Revenue, Total Pasien, Avg Rating |
| [x]  | `RevenueChart`           | Bar chart pendapatan harian                    |
| [x]  | `PopularServicesChart`   | Progress bars layanan populer                  |
| [x]  | `DoctorPerformanceCards` | Cards performa per dokter                      |

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

### 6.8 Settings Page (`/dashboard/settings`) ✅ COMPLETED

**Design Reference:** `dental-care-design/admin-dashboard-setting-integration`

#### Components

| Task | Component                 | Deskripsi                      |
| ---- | ------------------------- | ------------------------------ |
| [x]  | `ClinicInfoForm`          | Form info klinik dengan upload |
| [x]  | `OpeningHoursCard`        | Jam operasional per hari       |
| [x]  | `PaymentGatewaySettings`  | Toggle Stripe/PayPal           |
| [x]  | `WhatsAppIntegrationCard` | WhatsApp status & toggles      |

#### API Requirements

| Endpoint              | Method | Deskripsi              |
| --------------------- | ------ | ---------------------- |
| `/api/admin/settings` | GET    | Get clinic settings    |
| `/api/admin/settings` | PUT    | Update clinic settings |

---

## 7. Shared UI Components

### 7.1 Base Components (`/components/ui`) ✅ COMPLETED

| Task | Component   | Deskripsi                                                           |
| ---- | ----------- | ------------------------------------------------------------------- |
| [x]  | `Button`    | Button dengan variants (primary, secondary, outline, ghost, danger) |
| [x]  | `Input`     | Input field dengan label, error state, leftIcon                     |
| [x]  | `Select`    | Dropdown select (existing)                                          |
| [x]  | `Textarea`  | Multiline input (existing)                                          |
| [x]  | `Badge`     | Status badges dengan color variants                                 |
| [x]  | `Card`      | Container card (existing)                                           |
| [x]  | `Modal`     | Modal dialog with pop/sticker styling                               |
| [x]  | `Drawer`    | Slide-in drawer (left/right)                                        |
| [x]  | `Toast`     | Notification toast (existing)                                       |
| [x]  | `Skeleton`  | Loading skeleton (existing)                                         |
| [x]  | `Avatar`    | User/doctor avatar with status, initials fallback                   |
| [x]  | `DataTable` | Reusable data table (existing)                                      |
| [x]  | `Calendar`  | Date picker dengan month navigation                                 |
| [x]  | `Tabs`      | Tab navigation (existing)                                           |
| [x]  | `Dropdown`  | Dropdown menu (existing)                                            |
| [x]  | `Tooltip`   | Tooltip on hover dengan positions                                   |
| [x]  | `Alert`     | Alert boxes (info, warning, error, success)                         |
| [x]  | `Spinner`   | Loading spinner (existing)                                          |

**Export:** All components exported via `src/components/ui/index.ts`

---

## ✅ Frontend Development Complete

All frontend pages and UI components have been implemented:

| Section                 | Status      | Count          |
| ----------------------- | ----------- | -------------- |
| 1. Landing Page         | ✅ Complete | 1 page         |
| 2. Public Pages         | ✅ Complete | 10 pages       |
| 3. Auth Pages           | ✅ Complete | 4 pages        |
| 4. Patient Pages        | ✅ Complete | 3 pages        |
| 5. Doctor Portal        | ✅ Complete | 5 pages        |
| 6. Admin Dashboard      | ✅ Complete | 8 pages        |
| 7. Shared UI Components | ✅ Complete | 18+ components |

**Total: 31 pages + 18+ reusable components**

---

## Notes

- Semua komponen menggunakan **TypeScript** dengan proper typing
- Gunakan **Server Components** untuk data fetching di halaman statis/SEO
- Gunakan **Client Components** untuk interaktivitas (booking wizard, modals, forms)
- Semua forms harus memiliki **loading state**, **error handling**, dan **validation messages**
- Semua API calls harus menggunakan **TanStack Query** untuk caching dan refetching
- State management booking flow menggunakan **Zustand** dengan **persist middleware**
- Responsive design: **Mobile-first** approach

---

> **See also:** `backend.md` for API endpoints, database schema, and integrations (WhatsApp, Midtrans, File Upload).
