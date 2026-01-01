# Sistem Reservasi Klinik Gigi Senyum Sejahtera 🦷

Sistem reservasi dan manajemen klinik gigi berbasis web untuk **Klinik Gigi Senyum Sejahtera** milik drg. Handoko. Dibangun menggunakan Next.js 14 dan PostgreSQL.

![Dental Clinic Banner](/public/banner-placeholder.png)
_(Note: Replace with actual screenshot)_

## ✨ Features

### 👤 Fitur Pasien

- **Booking Online 24/7**: Reservasi mandiri kapan saja dengan 3 langkah mudah
- **Pilih Layanan**: Scaling, Cabut Gigi, Veneer, Behel, dan lainnya
- **Pilih Dokter**: Lihat profil dan jadwal masing-masing dokter
- **Pilih Jadwal**: Kalender interaktif dengan slot waktu yang tersedia
- **Pembayaran DP**: Integrasi Midtrans (QRIS, Transfer Bank, E-Wallet)
- **E-Ticket**: Konfirmasi booking dengan QR code untuk check-in
- **Notifikasi WhatsApp**: Konfirmasi otomatis dan reminder H-1

### 👨‍⚕️ Fitur Dokter

- **Dashboard Pribadi**: Lihat jadwal hari ini dan mendatang
- **Kalender Jadwal**: View mingguan/bulanan jadwal praktik
- **Riwayat Pasien**: Histori pasien yang pernah ditangani

### 🛡️ Dashboard Admin

- **Overview Statistik**: Booking hari ini, pending, revenue DP, total pasien
- **Live Calendar**: Jadwal real-time semua dokter
- **Manajemen Booking**: Update status (Pending → Paid → Check-in → Completed)
- **Manajemen Dokter**: CRUD data dokter, jadwal, foto profil
- **Manajemen Layanan**: CRUD layanan perawatan, harga, dan durasi
- **Database Pasien**: List pasien dengan nomor WA dan riwayat booking
- **Laporan**: Grafik pendapatan DP dan statistik booking

## 🛠️ Tech Stack

| Category         | Technology                      |
| ---------------- | ------------------------------- |
| **Framework**    | Next.js 14 (App Router)         |
| **Language**     | TypeScript                      |
| **Database**     | PostgreSQL                      |
| **ORM**          | Prisma                          |
| **Auth**         | Auth.js v5 (Google OAuth)       |
| **Styling**      | Tailwind CSS (Medical Theme)    |
| **State Mgmt**   | Zustand                         |
| **Server State** | TanStack Query + Axios          |
| **Forms**        | React Hook Form + Zod           |
| **File Storage** | Supabase Storage                |
| **Payment**      | Midtrans Gateway                |
| **WhatsApp**     | Fonnte API                      |
| **Testing**      | Vitest (Unit), Playwright (E2E) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL Database (Local atau Cloud: Supabase/Neon)
- Midtrans Account (Sandbox untuk testing)
- Fonnte Account (untuk WhatsApp notifications)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/dental-care.git
   cd dental-care
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Copy `.env.example` ke `.env` dan isi dengan credentials Anda:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@host:port/db?schema=public"
   DIRECT_URL="postgresql://user:password@host:port/db?schema=public"

   # Auth.js (Google OAuth)
   AUTH_SECRET="your-secret-key"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Supabase Storage
   NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

   # Midtrans (Payment)
   MIDTRANS_SERVER_KEY="your-server-key"
   MIDTRANS_CLIENT_KEY="your-client-key"
   NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="your-client-key"
   MIDTRANS_IS_PRODUCTION=false

   # Fonnte (WhatsApp)
   FONNTE_API_KEY="your-fonnte-api-key"
   FONNTE_DEVICE_ID="your-device-id"

   # Public URL
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. **Setup Database**

   ```bash
   # Run migrations
   npx prisma migrate dev

   # Seed the database
   npx prisma db seed
   ```

   _Note: Seeding creates default admin, sample doctors, services, and time slots._

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing

```bash
# Run Unit Tests
npm test

# Run E2E Tests
npm run e2e
```

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── (auth)/           # Login & Register pages
│   │   ├── (home)/           # Patient-facing pages
│   │   │   ├── booking/      # 3-step booking wizard
│   │   │   ├── checkout/     # Payment page
│   │   │   └── my-bookings/  # Booking history
│   │   ├── dashboard/        # Admin panel
│   │   ├── doctor/           # Doctor portal
│   │   └── api/              # API routes
│   ├── components/           # Reusable UI components
│   ├── lib/                  # Utilities and helpers
│   └── hooks/                # Custom React hooks
├── prisma/                   # Database schema and seed
├── public/                   # Static assets
├── documentation/            # Project documentation
└── tests/                    # Unit and E2E tests
```

## 👥 Default Accounts

### Admin

- **Email**: admin@klinik.com
- **Password**: admin123

### Demo Patient

- **Email**: pasien@test.com
- **Password**: pasien123

### Demo Doctor

- **Email**: dokter@klinik.com
- **Password**: dokter123

## 📚 Documentation

- [Specifications](./documentation/specs.md) - Detailed feature specs
- [Architecture](./documentation/architecture.md) - Database schema & system design
- [Todo/Roadmap](./documentation/todo.md) - Development roadmap
- [QA Checklist](./documentation/qa-checklist.md) - Testing checklist

## 🎯 Business Rules

| Rule                    | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| **Slot Duration**       | 60 menit per appointment (MVP)                          |
| **Payment Timeout**     | 15 menit untuk menyelesaikan pembayaran DP              |
| **Cancellation**        | Batal > 24 jam = DP refund, Batal < 24 jam = DP hangus  |
| **Conflict Prevention** | 1 dokter tidak bisa menangani 2 pasien di jam yang sama |

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for Klinik Gigi Senyum Sejahtera
