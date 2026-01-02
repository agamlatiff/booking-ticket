# Dental Care - Task Breakdown (Backend Development)

> **Backend Registry** — Daftar tugas pengembangan backend: API, database, validasi, dan business logic.

---

## ⚠️ Project Info

- **Project Name:** Dental Care (Sistem Reservasi Klinik Gigi)
- **Design Source:** `dental-care-design/` folder (untuk referensi UI flow & data requirements)
- **Design Files:** Setiap folder berisi `code.html` (slicing HTML) dan `screen.png` (visual design)

> **Note:** Backend endpoints harus mendukung semua flow UI yang ada di design. Lihat `frontend.md` untuk detail komponen yang membutuhkan data dari API.

---

## Legend

- `[ ]` — Belum dikerjakan
- `[/]` — Sedang dikerjakan
- `[x]` — Selesai

---

## 1. Database Schema Changes

### 1.1 New Tables

#### GalleryImage

| Task | Description                                             |
| ---- | ------------------------------------------------------- |
| [ ]  | Create `GalleryImage` model in Prisma schema            |
| [ ]  | Add `GalleryCategory` enum (BEFORE_AFTER, CLINIC, TEAM) |
| [ ]  | Run migration                                           |

```prisma
model GalleryImage {
  id        String          @id @default(cuid())
  title     String?
  imageUrl  String
  category  GalleryCategory
  order     Int             @default(0)
  isActive  Boolean         @default(true)
  createdAt DateTime        @default(now())
  updatedAt DateTime        @updatedAt

  @@index([category, isActive])
}

enum GalleryCategory {
  BEFORE_AFTER
  CLINIC
  TEAM
}
```

---

#### BlogPost

| Task | Description                              |
| ---- | ---------------------------------------- |
| [ ]  | Create `BlogPost` model in Prisma schema |
| [ ]  | Add relation to User (author)            |
| [ ]  | Run migration                            |

```prisma
model BlogPost {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  excerpt     String
  content     String    @db.Text
  thumbnail   String?
  category    String
  authorId    String
  author      User      @relation(fields: [authorId], references: [id])
  publishedAt DateTime?
  isPublished Boolean   @default(false)
  viewCount   Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([isPublished, publishedAt])
  @@index([category])
  @@index([slug])
}
```

---

#### ContactSubmission

| Task | Description                                               |
| ---- | --------------------------------------------------------- |
| [ ]  | Create `ContactSubmission` model untuk store contact form |
| [ ]  | Run migration                                             |

```prisma
model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String   @db.Text
  isRead    Boolean  @default(false)
  repliedAt DateTime?
  createdAt DateTime @default(now())

  @@index([isRead])
}
```

---

### 1.2 Table Modifications

#### Doctor Table

| Task | Column            | Type         | Description                   |
| ---- | ----------------- | ------------ | ----------------------------- |
| [ ]  | `yearsExperience` | Int          | Tahun pengalaman dokter       |
| [ ]  | `rating`          | Decimal(2,1) | Rating dokter (default 5.0)   |
| [ ]  | `totalPatients`   | Int          | Counter pasien yang ditangani |

```sql
ALTER TABLE "Doctor" ADD COLUMN "yearsExperience" INT DEFAULT 0;
ALTER TABLE "Doctor" ADD COLUMN "rating" DECIMAL(2,1) DEFAULT 5.0;
ALTER TABLE "Doctor" ADD COLUMN "totalPatients" INT DEFAULT 0;
```

---

#### Service Table

| Task | Column     | Type   | Description                                       |
| ---- | ---------- | ------ | ------------------------------------------------- |
| [ ]  | `category` | String | Kategori layanan (general, cosmetic, orthodontic) |
| [ ]  | `faq`      | Json?  | FAQ specific untuk layanan ini                    |

```sql
ALTER TABLE "Service" ADD COLUMN "category" VARCHAR(50) DEFAULT 'general';
ALTER TABLE "Service" ADD COLUMN "faq" JSONB;
```

---

#### User Table

| Task | Column    | Type    | Description     |
| ---- | --------- | ------- | --------------- |
| [ ]  | `address` | String? | Alamat pasien   |
| [ ]  | `avatar`  | String? | URL foto profil |

```sql
ALTER TABLE "User" ADD COLUMN "address" TEXT;
ALTER TABLE "User" ADD COLUMN "avatar" VARCHAR(500);
```

---

#### Booking Table

| Task | Column          | Type          | Description                                           |
| ---- | --------------- | ------------- | ----------------------------------------------------- |
| [ ]  | `bookingSource` | BookingSource | Sumber booking (PATIENT_ONLINE, DOCTOR_PORTAL, ADMIN) |
| [ ]  | `bookingType`   | BookingType?  | Tipe booking (WALK_IN, PHONE, REFERRAL)               |

```prisma
enum BookingSource {
  PATIENT_ONLINE
  DOCTOR_PORTAL
  ADMIN_DASHBOARD
}

enum BookingType {
  WALK_IN
  PHONE
  REFERRAL
}
```

---

### 1.3 Database Indexes

| Task | Table    | Index                           | Purpose                    |
| ---- | -------- | ------------------------------- | -------------------------- |
| [ ]  | Booking  | `[doctorId, appointmentDate]`   | Faster schedule queries    |
| [ ]  | Booking  | `[patientId, status]`           | Faster my-bookings queries |
| [ ]  | TimeSlot | `[doctorId, date, isAvailable]` | Faster slot availability   |
| [ ]  | BlogPost | `[isPublished, publishedAt]`    | Published articles list    |

---

## 2. API Endpoints

### 2.1 Public API (No Auth Required)

#### GET /api/services

| Task | Item     | Description                                             |
| ---- | -------- | ------------------------------------------------------- | -------- | ------------ |
| [ ]  | Query    | Fetch services with `isActive=true`, ordered by `order` |
| [ ]  | Filter   | Optional `?category=general                             | cosmetic | orthodontic` |
| [ ]  | Filter   | Optional `?limit=6` for homepage preview                |
| [ ]  | Response | `{ data: Service[], total: number }`                    |

```typescript
// Validation
const querySchema = z.object({
  category: z.enum(["general", "cosmetic", "orthodontic"]).optional(),
  limit: z.coerce.number().min(1).max(50).optional(),
});
```

---

#### GET /api/services/[slug]

| Task | Item     | Description                  |
| ---- | -------- | ---------------------------- |
| [ ]  | Query    | Fetch single service by slug |
| [ ]  | Include  | FAQ data if available        |
| [ ]  | Response | `{ data: Service }`          |
| [ ]  | Error    | 404 if not found             |

---

#### GET /api/doctors

| Task | Item     | Description                              |
| ---- | -------- | ---------------------------------------- |
| [ ]  | Query    | Fetch doctors with `isActive=true`       |
| [ ]  | Include  | Schedule template summary (working days) |
| [ ]  | Filter   | Optional `?limit=4` for homepage preview |
| [ ]  | Response | `{ data: Doctor[] }`                     |

---

#### GET /api/doctors/[id]

| Task | Item     | Description                    |
| ---- | -------- | ------------------------------ |
| [ ]  | Query    | Fetch single doctor by ID      |
| [ ]  | Include  | Bio, stats, schedule templates |
| [ ]  | Response | `{ data: Doctor }`             |

---

#### GET /api/doctors/[id]/availability

| Task | Item     | Description                                         |
| ---- | -------- | --------------------------------------------------- |
| [ ]  | Query    | Available slots for doctor                          |
| [ ]  | Params   | `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`          |
| [ ]  | Logic    | Filter by `isAvailable=true`, exclude blocked dates |
| [ ]  | Response | `{ data: { date: string, slots: TimeSlot[] }[] }`   |

---

#### GET /api/slots

| Task | Item     | Description                                |
| ---- | -------- | ------------------------------------------ |
| [ ]  | Query    | Available slots by doctor and date         |
| [ ]  | Params   | `?doctorId=xxx&date=YYYY-MM-DD` (required) |
| [ ]  | Logic    | Return slots with `isAvailable=true`       |
| [ ]  | Response | `{ data: TimeSlot[] }`                     |

```typescript
const querySchema = z.object({
  doctorId: z.string().min(1, "doctorId required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
});
```

---

#### GET /api/gallery

| Task | Item     | Description                      |
| ---- | -------- | -------------------------------- | ------ | ----- |
| [ ]  | Query    | Fetch gallery images             |
| [ ]  | Filter   | Optional `?category=BEFORE_AFTER | CLINIC | TEAM` |
| [ ]  | Order    | By `order` field                 |
| [ ]  | Response | `{ data: GalleryImage[] }`       |

---

#### GET /api/blog

| Task | Item       | Description                                     |
| ---- | ---------- | ----------------------------------------------- |
| [ ]  | Query      | Fetch published blog posts                      |
| [ ]  | Filter     | `isPublished=true`, `publishedAt <= now`        |
| [ ]  | Pagination | `?page=1&limit=10`                              |
| [ ]  | Filter     | Optional `?category=xxx`                        |
| [ ]  | Order      | By `publishedAt DESC`                           |
| [ ]  | Response   | `{ data: BlogPost[], total, page, totalPages }` |

---

#### GET /api/blog/[slug]

| Task | Item     | Description                    |
| ---- | -------- | ------------------------------ |
| [ ]  | Query    | Fetch single blog post by slug |
| [ ]  | Logic    | Increment `viewCount`          |
| [ ]  | Include  | Author info                    |
| [ ]  | Response | `{ data: BlogPost }`           |

---

#### POST /api/contact

| Task | Item       | Description                                    |
| ---- | ---------- | ---------------------------------------------- |
| [ ]  | Validation | Validate contact form data                     |
| [ ]  | Save       | Create ContactSubmission record                |
| [ ]  | Email      | Send notification email to admin (optional)    |
| [ ]  | Response   | `{ success: true, message: "Pesan terkirim" }` |

```typescript
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(20).max(2000),
});
```

---

### 2.2 Patient API (Auth Required - Role: PATIENT)

#### POST /api/bookings

| Task | Item        | Description                             |
| ---- | ----------- | --------------------------------------- |
| [ ]  | Auth        | Verify session, get patientId           |
| [ ]  | Validation  | Validate booking request                |
| [ ]  | Check       | Slot availability (SELECT FOR UPDATE)   |
| [ ]  | Transaction | Create booking + mark slot unavailable  |
| [ ]  | Set         | `expiresAt = now + 15 minutes`          |
| [ ]  | Midtrans    | Generate payment token                  |
| [ ]  | Response    | `{ bookingId, code, token, expiresAt }` |

```typescript
const createBookingSchema = z.object({
  serviceId: z.string().min(1),
  doctorId: z.string().min(1),
  slotId: z.string().min(1),
  patientName: z.string().min(2),
  patientPhone: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/),
  notes: z.string().max(500).optional(),
});
```

**Business Logic:**

```typescript
async function createBooking(data, userId) {
  return prisma.$transaction(async (tx) => {
    // 1. Check slot still available
    const slot = await tx.timeSlot.findUnique({
      where: { id: data.slotId },
      select: {
        id: true,
        isAvailable: true,
        doctorId: true,
        date: true,
        startTime: true,
      },
    });

    if (!slot || !slot.isAvailable) {
      throw new Error("SLOT_UNAVAILABLE");
    }

    // 2. Get service for pricing
    const service = await tx.service.findUnique({
      where: { id: data.serviceId },
    });

    // 3. Generate booking code
    const code = generateBookingCode(); // e.g., DENT-ABC123

    // 4. Create booking
    const booking = await tx.booking.create({
      data: {
        code,
        patientId: userId,
        patientName: data.patientName,
        patientPhone: data.patientPhone,
        doctorId: slot.doctorId,
        serviceId: data.serviceId,
        slotId: slot.id,
        appointmentDate: slot.date,
        appointmentTime: slot.startTime,
        dpAmount: service.dpAmount,
        totalPrice: service.price,
        status: "PENDING",
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        notes: data.notes,
        bookingSource: "PATIENT_ONLINE",
      },
    });

    // 5. Mark slot as unavailable
    await tx.timeSlot.update({
      where: { id: slot.id },
      data: { isAvailable: false },
    });

    // 6. Generate Midtrans token
    const token = await generateMidtransToken(booking);

    // 7. Update booking with token
    await tx.booking.update({
      where: { id: booking.id },
      data: { tokenMidtrans: token },
    });

    return {
      bookingId: booking.id,
      code: booking.code,
      token,
      expiresAt: booking.expiresAt,
    };
  });
}
```

---

#### GET /api/bookings

| Task | Item     | Description                                       |
| ---- | -------- | ------------------------------------------------- | --------- | ---------- |
| [ ]  | Auth     | Verify session, get patientId                     |
| [ ]  | Query    | Fetch bookings where `patientId = session.userId` |
| [ ]  | Filter   | Optional `?status=ACTIVE                          | COMPLETED | CANCELLED` |
| [ ]  | Order    | By `appointmentDate DESC`                         |
| [ ]  | Include  | Doctor, service info                              |
| [ ]  | Response | `{ data: Booking[] }`                             |

---

#### GET /api/bookings/[id]

| Task | Item     | Description                      |
| ---- | -------- | -------------------------------- |
| [ ]  | Auth     | Verify booking belongs to user   |
| [ ]  | Query    | Fetch booking with all relations |
| [ ]  | Include  | Doctor, service, slot info       |
| [ ]  | Response | `{ data: Booking }`              |

---

#### PUT /api/bookings/[id]/cancel

| Task | Item        | Description                              |
| ---- | ----------- | ---------------------------------------- |
| [ ]  | Auth        | Verify booking belongs to user           |
| [ ]  | Check       | Status must be PENDING or PAID           |
| [ ]  | Check       | 24-hour cancellation policy              |
| [ ]  | Transaction | Update status, release slot              |
| [ ]  | WhatsApp    | Send cancellation notification           |
| [ ]  | Response    | `{ success: true, refundable: boolean }` |

**Business Logic:**

```typescript
async function cancelBooking(bookingId, userId) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { slot: true },
  });

  // Verify ownership
  if (booking.patientId !== userId) {
    throw new Error("UNAUTHORIZED");
  }

  // Check if cancellable
  if (!["PENDING", "PAID"].includes(booking.status)) {
    throw new Error("CANNOT_CANCEL");
  }

  // Check 24-hour policy
  const hoursUntil = differenceInHours(booking.appointmentDate, new Date());
  const isRefundable = hoursUntil > 24;

  await prisma.$transaction([
    // Update booking status
    prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED", cancelledAt: new Date() },
    }),
    // Release slot
    prisma.timeSlot.update({
      where: { id: booking.slotId },
      data: { isAvailable: true },
    }),
  ]);

  // Send WhatsApp notification
  await sendCancellationNotification(booking);

  return { success: true, refundable: isRefundable };
}
```

---

#### PUT /api/user/profile

| Task | Item       | Description           |
| ---- | ---------- | --------------------- |
| [ ]  | Auth       | Verify session        |
| [ ]  | Validation | Validate profile data |
| [ ]  | Update     | Update user record    |
| [ ]  | Response   | `{ data: User }`      |

```typescript
const profileSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/),
  address: z.string().max(500).optional(),
});
```

---

#### POST /api/user/avatar

| Task | Item     | Description                |
| ---- | -------- | -------------------------- |
| [ ]  | Auth     | Verify session             |
| [ ]  | Upload   | Upload to Supabase Storage |
| [ ]  | Update   | Update user.avatar field   |
| [ ]  | Response | `{ avatarUrl: string }`    |

---

### 2.3 Doctor API (Auth Required - Role: DOCTOR)

#### GET /api/doctor/stats

| Task | Item     | Description                                                       |
| ---- | -------- | ----------------------------------------------------------------- |
| [ ]  | Auth     | Verify role = DOCTOR                                              |
| [ ]  | Get      | doctorId from session.userId → Doctor table                       |
| [ ]  | Query    | Today's bookings count                                            |
| [ ]  | Query    | Pending bookings count                                            |
| [ ]  | Query    | This month's completed count                                      |
| [ ]  | Query    | Total unique patients                                             |
| [ ]  | Response | `{ todayCount, pendingCount, completedThisMonth, totalPatients }` |

---

#### GET /api/doctor/schedule

| Task | Item     | Description                                      |
| ---- | -------- | ------------------------------------------------ |
| [ ]  | Auth     | Verify role = DOCTOR                             |
| [ ]  | Params   | `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`       |
| [ ]  | Query    | Slots and bookings for this doctor               |
| [ ]  | Include  | Patient info, service info                       |
| [ ]  | Response | `{ data: { date, slots: SlotWithBooking[] }[] }` |

---

#### GET /api/doctor/patients

| Task | Item     | Description                               |
| ---- | -------- | ----------------------------------------- |
| [ ]  | Auth     | Verify role = DOCTOR                      |
| [ ]  | Query    | Distinct patients from completed bookings |
| [ ]  | Search   | Optional `?search=xxx` (name or phone)    |
| [ ]  | Include  | Last visit date, total visits             |
| [ ]  | Response | `{ data: PatientWithStats[] }`            |

---

#### POST /api/doctor/patients

| Task | Item       | Description                   |
| ---- | ---------- | ----------------------------- |
| [ ]  | Auth       | Verify role = DOCTOR          |
| [ ]  | Validation | Validate patient data         |
| [ ]  | Check      | Email not already registered  |
| [ ]  | Create     | Create User with role PATIENT |
| [ ]  | Response   | `{ data: User }`              |

```typescript
const newPatientSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/),
  email: z.string().email().optional(),
  address: z.string().max(500).optional(),
});
```

---

#### POST /api/doctor/bookings

| Task | Item       | Description                                    |
| ---- | ---------- | ---------------------------------------------- |
| [ ]  | Auth       | Verify role = DOCTOR                           |
| [ ]  | Validation | Validate booking data                          |
| [ ]  | Logic      | If `newPatient` provided, create User first    |
| [ ]  | Check      | Slot availability                              |
| [ ]  | Create     | Booking with status = CONFIRMED (skip payment) |
| [ ]  | Set        | `bookingSource = DOCTOR_PORTAL`                |
| [ ]  | WhatsApp   | Send confirmation to patient                   |
| [ ]  | Response   | `{ data: Booking }`                            |

```typescript
const doctorBookingSchema = z
  .object({
    patientId: z.string().optional(),
    newPatient: z
      .object({
        name: z.string().min(2),
        phone: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/),
        email: z.string().email().optional(),
      })
      .optional(),
    serviceId: z.string().min(1),
    slotId: z.string().min(1),
    bookingType: z.enum(["WALK_IN", "PHONE", "REFERRAL"]),
    notes: z.string().max(500).optional(),
  })
  .refine((d) => d.patientId || d.newPatient, {
    message: "patientId or newPatient required",
  });
```

**Business Logic:**

```typescript
async function createDoctorBooking(data, doctorUserId) {
  // 1. Get doctor record
  const doctor = await prisma.doctor.findUnique({
    where: { userId: doctorUserId },
  });

  if (!doctor) throw new Error("DOCTOR_NOT_FOUND");

  return prisma.$transaction(async (tx) => {
    // 2. Create patient if new
    let patientId = data.patientId;
    if (data.newPatient) {
      const patient = await tx.user.create({
        data: {
          name: data.newPatient.name,
          email: data.newPatient.email || `${Date.now()}@placeholder.com`, // Temp email if not provided
          phone: data.newPatient.phone,
          role: "PATIENT",
        },
      });
      patientId = patient.id;
    }

    // 3. Check slot
    const slot = await tx.timeSlot.findUnique({ where: { id: data.slotId } });
    if (!slot || !slot.isAvailable) throw new Error("SLOT_UNAVAILABLE");

    // 4. Get service
    const service = await tx.service.findUnique({
      where: { id: data.serviceId },
    });

    // 5. Get patient info
    const patient = await tx.user.findUnique({ where: { id: patientId } });

    // 6. Create booking (CONFIRMED status, skip payment)
    const booking = await tx.booking.create({
      data: {
        code: generateBookingCode(),
        patientId,
        patientName: patient.name,
        patientPhone: patient.phone,
        doctorId: doctor.id,
        serviceId: data.serviceId,
        slotId: data.slotId,
        appointmentDate: slot.date,
        appointmentTime: slot.startTime,
        dpAmount: service.dpAmount,
        totalPrice: service.price,
        status: "CONFIRMED", // Skip PENDING
        dpPaid: 0, // Paid offline
        bookingSource: "DOCTOR_PORTAL",
        bookingType: data.bookingType,
        notes: data.notes,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Dummy, not used
      },
    });

    // 7. Mark slot unavailable
    await tx.timeSlot.update({
      where: { id: slot.id },
      data: { isAvailable: false },
    });

    // 8. Send WhatsApp confirmation (async, don't block)
    sendBookingConfirmation(booking).catch(console.error);

    return booking;
  });
}
```

---

### 2.4 Admin API (Auth Required - Role: ADMIN)

#### GET /api/admin/stats

| Task | Item     | Description                                                      |
| ---- | -------- | ---------------------------------------------------------------- |
| [ ]  | Auth     | Verify role = ADMIN                                              |
| [ ]  | Query    | Today's bookings count                                           |
| [ ]  | Query    | Pending payment count                                            |
| [ ]  | Query    | Today's DP revenue                                               |
| [ ]  | Query    | Total registered patients                                        |
| [ ]  | Response | `{ todayBookings, pendingPayment, todayRevenue, totalPatients }` |

---

#### GET /api/admin/bookings

| Task | Item       | Description                                                   |
| ---- | ---------- | ------------------------------------------------------------- |
| [ ]  | Auth       | Verify role = ADMIN                                           |
| [ ]  | Filter     | `?status=xxx&doctorId=xxx&dateFrom=xxx&dateTo=xxx&search=xxx` |
| [ ]  | Pagination | `?page=1&limit=20`                                            |
| [ ]  | Order      | Default by `createdAt DESC`                                   |
| [ ]  | Include    | Patient, doctor, service info                                 |
| [ ]  | Response   | `{ data, total, page, totalPages }`                           |

---

#### PUT /api/admin/bookings/[id]/status

| Task | Item       | Description                        |
| ---- | ---------- | ---------------------------------- |
| [ ]  | Auth       | Verify role = ADMIN                |
| [ ]  | Validation | Status must be valid BookingStatus |
| [ ]  | Update     | Update booking status              |
| [ ]  | Logic      | If COMPLETED → set completedAt     |
| [ ]  | Logic      | If CANCELLED → release slot        |
| [ ]  | Response   | `{ data: Booking }`                |

---

#### POST /api/admin/bookings/[id]/reminder

| Task | Item     | Description                  |
| ---- | -------- | ---------------------------- |
| [ ]  | Auth     | Verify role = ADMIN          |
| [ ]  | Send     | WhatsApp reminder via Fonnte |
| [ ]  | Response | `{ success: true }`          |

---

#### GET /api/admin/schedule

| Task | Item     | Description                                                      |
| ---- | -------- | ---------------------------------------------------------------- |
| [ ]  | Auth     | Verify role = ADMIN                                              |
| [ ]  | Params   | `?date=YYYY-MM-DD` or `?startDate&endDate`                       |
| [ ]  | Filter   | Optional `?doctorId=xxx`                                         |
| [ ]  | Query    | All slots with booking info                                      |
| [ ]  | Response | `{ data: { doctorId, doctorName, slots: SlotWithBooking[] }[] }` |

---

#### PUT /api/admin/slots/[id]/block

| Task | Item     | Description                      |
| ---- | -------- | -------------------------------- |
| [ ]  | Auth     | Verify role = ADMIN              |
| [ ]  | Toggle   | Set `isAvailable = !isAvailable` |
| [ ]  | Check    | Cannot block if already booked   |
| [ ]  | Response | `{ data: TimeSlot }`             |

---

#### CRUD /api/admin/doctors

| Method       | Task | Description                                     |
| ------------ | ---- | ----------------------------------------------- |
| GET          | [ ]  | List all doctors (including inactive)           |
| POST         | [ ]  | Create new doctor + optional schedule templates |
| PUT /[id]    | [ ]  | Update doctor info                              |
| DELETE /[id] | [ ]  | Soft delete (set isActive = false)              |

---

#### PUT /api/admin/doctors/[id]/schedule

| Task | Item       | Description                               |
| ---- | ---------- | ----------------------------------------- |
| [ ]  | Auth       | Verify role = ADMIN                       |
| [ ]  | Validation | Validate schedule templates               |
| [ ]  | Upsert     | Update or create ScheduleTemplate records |
| [ ]  | Response   | `{ data: ScheduleTemplate[] }`            |

```typescript
const scheduleTemplateSchema = z.array(
  z.object({
    dayOfWeek: z.enum([
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ]),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
    slotDuration: z.number().min(15).max(180).default(60),
    isActive: z.boolean().default(true),
  })
);
```

---

#### CRUD /api/admin/services

| Method       | Task | Description                            |
| ------------ | ---- | -------------------------------------- |
| GET          | [ ]  | List all services (including inactive) |
| POST         | [ ]  | Create new service                     |
| PUT /[id]    | [ ]  | Update service                         |
| DELETE /[id] | [ ]  | Soft delete (set isActive = false)     |

---

#### GET /api/admin/patients

| Task | Item       | Description                                 |
| ---- | ---------- | ------------------------------------------- |
| [ ]  | Auth       | Verify role = ADMIN                         |
| [ ]  | Query      | All users with role = PATIENT               |
| [ ]  | Search     | Optional `?search=xxx` (name, email, phone) |
| [ ]  | Include    | Booking count, last visit                   |
| [ ]  | Pagination | `?page=1&limit=20`                          |
| [ ]  | Response   | `{ data, total, page, totalPages }`         |

---

#### GET /api/admin/patients/[id]

| Task | Item     | Description                               |
| ---- | -------- | ----------------------------------------- |
| [ ]  | Auth     | Verify role = ADMIN                       |
| [ ]  | Query    | Patient detail with all bookings          |
| [ ]  | Include  | Booking history with doctor, service info |
| [ ]  | Response | `{ data: PatientWithHistory }`            |

---

#### GET /api/admin/reports

| Task | Item     | Description                                                 |
| ---- | -------- | ----------------------------------------------------------- |
| [ ]  | Auth     | Verify role = ADMIN                                         |
| [ ]  | Params   | `?startDate=xxx&endDate=xxx`                                |
| [ ]  | Query    | Revenue by date (for chart)                                 |
| [ ]  | Query    | Bookings per service                                        |
| [ ]  | Query    | Bookings per doctor                                         |
| [ ]  | Query    | Status breakdown                                            |
| [ ]  | Response | `{ revenue[], perService[], perDoctor[], statusBreakdown }` |

---

#### GET/PUT /api/admin/settings

| Method | Task | Description           |
| ------ | ---- | --------------------- |
| GET    | [ ]  | Get ClinicSettings    |
| PUT    | [ ]  | Update ClinicSettings |

---

#### CRUD /api/admin/gallery

| Method       | Task | Description                                 |
| ------------ | ---- | ------------------------------------------- |
| GET          | [ ]  | List all gallery images                     |
| POST         | [ ]  | Upload new image (Supabase) + create record |
| PUT /[id]    | [ ]  | Update image metadata                       |
| DELETE /[id] | [ ]  | Delete image from Supabase + record         |

---

#### CRUD /api/admin/blog

| Method            | Task | Description                            |
| ----------------- | ---- | -------------------------------------- |
| GET               | [ ]  | List all blog posts (including drafts) |
| POST              | [ ]  | Create new blog post                   |
| PUT /[id]         | [ ]  | Update blog post                       |
| DELETE /[id]      | [ ]  | Delete blog post                       |
| PUT /[id]/publish | [ ]  | Publish/unpublish blog post            |

---

### 2.5 Webhook

#### POST /api/webhooks/midtrans

| Task | Item     | Description                                          |
| ---- | -------- | ---------------------------------------------------- |
| [ ]  | Verify   | Validate Midtrans signature                          |
| [ ]  | Parse    | Parse notification payload                           |
| [ ]  | Logic    | If `settlement` → update status to PAID              |
| [ ]  | Logic    | If `expire` → update status to EXPIRED, release slot |
| [ ]  | WhatsApp | If PAID → send confirmation notification             |
| [ ]  | Response | HTTP 200                                             |

```typescript
async function handleMidtransWebhook(notification) {
  // 1. Verify signature
  const isValid = verifyMidtransSignature(notification);
  if (!isValid) throw new Error("INVALID_SIGNATURE");

  const { order_id, transaction_status } = notification;
  const bookingId = order_id; // Assuming order_id = booking.id

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) return; // Ignore

  if (transaction_status === "settlement" || transaction_status === "capture") {
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: "PAID",
        dpPaid: booking.dpAmount,
        paidAt: new Date(),
        confirmationSent: false, // Will be sent below
      },
    });

    // Send WhatsApp confirmation
    await sendBookingConfirmation(booking);

    await prisma.booking.update({
      where: { id: bookingId },
      data: { confirmationSent: true },
    });
  }

  if (transaction_status === "expire" || transaction_status === "cancel") {
    await prisma.$transaction([
      prisma.booking.update({
        where: { id: bookingId },
        data: { status: "EXPIRED" },
      }),
      prisma.timeSlot.update({
        where: { id: booking.slotId },
        data: { isAvailable: true },
      }),
    ]);
  }
}
```

---

### 2.6 Cron Jobs

#### GET /api/cron/expire-bookings

| Task | Item     | Description                                           |
| ---- | -------- | ----------------------------------------------------- |
| [ ]  | Schedule | Every 1 minute                                        |
| [ ]  | Query    | Bookings where `status=PENDING` AND `expiresAt < now` |
| [ ]  | Update   | Set status = EXPIRED                                  |
| [ ]  | Release  | Mark slot isAvailable = true                          |
| [ ]  | Auth     | Verify cron secret header                             |

---

#### GET /api/cron/generate-slots

| Task | Item     | Description                     |
| ---- | -------- | ------------------------------- |
| [ ]  | Schedule | Daily at 00:01                  |
| [ ]  | Logic    | Generate slots for next 14 days |
| [ ]  | Logic    | Use ScheduleTemplate per doctor |
| [ ]  | Logic    | Skip BlockedDates               |
| [ ]  | Auth     | Verify cron secret header       |

---

#### GET /api/cron/send-reminders

| Task | Item     | Description                                                        |
| ---- | -------- | ------------------------------------------------------------------ |
| [ ]  | Schedule | Daily at 10:00                                                     |
| [ ]  | Query    | Bookings for tomorrow where `reminderSent=false` AND `status=PAID` |
| [ ]  | Send     | WhatsApp reminder via Fonnte                                       |
| [ ]  | Update   | Set `reminderSent=true`                                            |
| [ ]  | Auth     | Verify cron secret header                                          |

---

## 3. Business Logic Helpers

### 3.1 Booking Code Generator

```typescript
// lib/booking.ts
export function generateBookingCode(): string {
  const prefix = "DENT";
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${random}`; // e.g., DENT-A1B2C3
}
```

---

### 3.2 Midtrans Helper

```typescript
// lib/midtrans.ts
import Midtrans from "midtrans-client";

const snap = new Midtrans.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export async function generateMidtransToken(booking: Booking): Promise<string> {
  const parameter = {
    transaction_details: {
      order_id: booking.id,
      gross_amount: booking.dpAmount,
    },
    customer_details: {
      first_name: booking.patientName,
      phone: booking.patientPhone,
    },
    item_details: [
      {
        id: booking.serviceId,
        price: booking.dpAmount,
        quantity: 1,
        name: `DP - ${booking.service.name}`,
      },
    ],
    expiry: {
      unit: "minutes",
      duration: 15,
    },
  };

  const transaction = await snap.createTransaction(parameter);
  return transaction.token;
}

export function verifyMidtransSignature(notification: any): boolean {
  const crypto = require("crypto");
  const { order_id, status_code, gross_amount, signature_key } = notification;
  const serverKey = process.env.MIDTRANS_SERVER_KEY;

  const hash = crypto
    .createHash("sha512")
    .update(order_id + status_code + gross_amount + serverKey)
    .digest("hex");

  return hash === signature_key;
}
```

---

### 3.3 WhatsApp (Fonnte) Helper

```typescript
// lib/whatsapp.ts
const FONNTE_API = "https://api.fonnte.com/send";
const FONNTE_TOKEN = process.env.FONNTE_API_KEY;

export async function sendWhatsApp(
  phone: string,
  message: string
): Promise<boolean> {
  try {
    const response = await fetch(FONNTE_API, {
      method: "POST",
      headers: {
        Authorization: FONNTE_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target: phone,
        message,
      }),
    });

    const result = await response.json();
    return result.status === true;
  } catch (error) {
    console.error("WhatsApp send error:", error);
    return false;
  }
}

export function formatBookingConfirmation(booking: any): string {
  return `✅ *Booking Berhasil!*

Halo ${booking.patientName},
Terima kasih telah melakukan reservasi di Klinik Gigi Senyum Sejahtera.

📋 *Detail Booking:*
🔢 Kode: ${booking.code}
🦷 Layanan: ${booking.service.name}
👨‍⚕️ Dokter: ${booking.doctor.name}
📅 Tanggal: ${formatDate(booking.appointmentDate)}
⏰ Jam: ${booking.appointmentTime}

📍 Lokasi: Jl. Contoh No. 123, Jakarta

Harap datang 15 menit sebelum jadwal.
Sampai jumpa! 😊`;
}

export function formatBookingReminder(booking: any): string {
  return `⏰ *Pengingat Appointment*

Halo ${booking.patientName},
Ini pengingat untuk jadwal kunjungan Anda besok:

🦷 ${booking.service.name}
👨‍⚕️ ${booking.doctor.name}
📅 ${formatDate(booking.appointmentDate)}
⏰ ${booking.appointmentTime}

Jangan lupa bawa foto KTP/identitas.
Jika ingin reschedule, hubungi kami segera.

Salam sehat! 🦷`;
}
```

---

### 3.4 Supabase Storage Helper

```typescript
// lib/supabase-storage.ts
import { supabaseAdmin } from "./supabase";

export async function uploadImage(
  file: File,
  bucket: string,
  folder: string
): Promise<string> {
  const fileName = `${folder}/${Date.now()}-${file.name}`;

  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from(bucket).getPublicUrl(fileName);

  return publicUrl;
}

export async function deleteImage(bucket: string, path: string): Promise<void> {
  const { error } = await supabaseAdmin.storage.from(bucket).remove([path]);

  if (error) throw error;
}
```

---

### 3.5 Schedule Generation

```typescript
// lib/schedule.ts
import {
  addDays,
  startOfDay,
  format,
  parse,
  addMinutes,
  isBefore,
} from "date-fns";

export async function generateSlotsForDoctor(
  doctorId: string,
  startDate: Date,
  endDate: Date
): Promise<number> {
  // Get templates
  const templates = await prisma.scheduleTemplate.findMany({
    where: { doctorId, isActive: true },
  });

  // Get blocked dates
  const blocked = await prisma.blockedDate.findMany({
    where: {
      doctorId,
      date: { gte: startDate, lte: endDate },
    },
  });
  const blockedSet = new Set(blocked.map((b) => format(b.date, "yyyy-MM-dd")));

  const slots = [];
  let current = startOfDay(startDate);

  while (isBefore(current, endDate)) {
    const dayName = format(current, "EEEE").toUpperCase(); // MONDAY, TUESDAY, etc.
    const dateStr = format(current, "yyyy-MM-dd");

    // Skip if blocked
    if (!blockedSet.has(dateStr)) {
      const template = templates.find((t) => t.dayOfWeek === dayName);

      if (template) {
        // Generate slots from template
        let time = parse(template.startTime, "HH:mm", current);
        const end = parse(template.endTime, "HH:mm", current);

        while (isBefore(time, end)) {
          const slotEnd = addMinutes(time, template.slotDuration);
          if (isBefore(slotEnd, end) || slotEnd.getTime() === end.getTime()) {
            slots.push({
              doctorId,
              date: current,
              startTime: format(time, "HH:mm"),
              endTime: format(slotEnd, "HH:mm"),
              isAvailable: true,
            });
          }
          time = slotEnd;
        }
      }
    }

    current = addDays(current, 1);
  }

  // Bulk insert, skip duplicates
  const result = await prisma.timeSlot.createMany({
    data: slots,
    skipDuplicates: true,
  });

  return result.count;
}
```

---

## 4. Validation Schemas (Zod)

### 4.1 File Structure

```
src/lib/validations/
├── booking.ts      # Booking-related schemas
├── user.ts         # User/profile schemas
├── doctor.ts       # Doctor management schemas
├── service.ts      # Service management schemas
├── contact.ts      # Contact form schema
├── blog.ts         # Blog post schemas
├── gallery.ts      # Gallery schemas
└── settings.ts     # Clinic settings schema
```

---

## 5. Error Handling

### 5.1 Standard API Response Format

```typescript
// Success
{
  success: true,
  data: { ... },
  message?: string
}

// Error
{
  success: false,
  error: {
    code: 'ERROR_CODE',
    message: 'Human readable message'
  }
}
```

### 5.2 Error Codes

| Code               | HTTP | Description              |
| ------------------ | ---- | ------------------------ |
| `UNAUTHORIZED`     | 401  | Not logged in            |
| `FORBIDDEN`        | 403  | Wrong role               |
| `NOT_FOUND`        | 404  | Resource not found       |
| `VALIDATION_ERROR` | 400  | Invalid input            |
| `SLOT_UNAVAILABLE` | 409  | Slot already booked      |
| `CANNOT_CANCEL`    | 400  | Cancellation not allowed |
| `PAYMENT_EXPIRED`  | 400  | Payment timeout          |
| `INTERNAL_ERROR`   | 500  | Server error             |

---

## 6. Summary: API Endpoints Count

| Category  | New    | Existing | Total  |
| --------- | ------ | -------- | ------ |
| Public    | 10     | 4        | 14     |
| Patient   | 6      | 0        | 6      |
| Doctor    | 5      | 0        | 5      |
| Admin     | 20     | 8        | 28     |
| Webhook   | 1      | 0        | 1      |
| Cron      | 3      | 0        | 3      |
| **Total** | **45** | **12**   | **57** |

---

## 7. Security Checklist

| Task | Description                                         |
| ---- | --------------------------------------------------- |
| [ ]  | All protected routes check session via `auth()`     |
| [ ]  | Role-based access control on admin/doctor routes    |
| [ ]  | Input validation with Zod on all endpoints          |
| [ ]  | SQL injection prevention via Prisma (parameterized) |
| [ ]  | Rate limiting on public endpoints                   |
| [ ]  | CSRF protection via Next.js defaults                |
| [ ]  | Midtrans signature verification                     |
| [ ]  | Cron endpoints protected with secret header         |
| [ ]  | Environment variables not exposed to client         |
| [ ]  | Supabase RLS policies configured                    |

---

## 8. Database Seeders

### 8.1 Seeder Setup

| Task | Description                                     |
| ---- | ----------------------------------------------- |
| [ ]  | Create `prisma/seed.ts` file                    |
| [ ]  | Add seed script to `package.json`               |
| [ ]  | Configure `prisma` seed command in package.json |

```json
// package.json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  },
  "scripts": {
    "db:seed": "prisma db seed",
    "db:reset": "prisma migrate reset"
  }
}
```

---

### 8.2 User Seeder

| Task | Description                               |
| ---- | ----------------------------------------- |
| [ ]  | Create admin user (role: ADMIN)           |
| [ ]  | Create test patient users (role: PATIENT) |
| [ ]  | Hash passwords using bcrypt               |

```typescript
// prisma/seeders/users.ts
import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function seedUsers(prisma: PrismaClient) {
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Admin
  await prisma.user.upsert({
    where: { email: "admin@dentalcare.com" },
    update: {},
    create: {
      email: "admin@dentalcare.com",
      name: "Admin Klinik",
      password: hashedPassword,
      phone: "+628123456789",
      role: UserRole.ADMIN,
    },
  });

  // Test Patient
  await prisma.user.upsert({
    where: { email: "pasien@test.com" },
    update: {},
    create: {
      email: "pasien@test.com",
      name: "Budi Santoso",
      password: hashedPassword,
      phone: "+628123456790",
      role: UserRole.PATIENT,
    },
  });

  console.log("✅ Users seeded");
}
```

---

### 8.3 Doctor Seeder

| Task | Description                               |
| ---- | ----------------------------------------- |
| [ ]  | Create doctor users (role: DOCTOR)        |
| [ ]  | Create Doctor records with bio, specialty |
| [ ]  | Link doctors to their user accounts       |

```typescript
// prisma/seeders/doctors.ts
import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const doctorsData = [
  {
    email: "drg.siti@dentalcare.com",
    name: "drg. Siti Aminah, Sp.Ort",
    specialty: "Spesialis Ortodonti",
    bio: "Dokter gigi spesialis ortodonti dengan pengalaman 10+ tahun dalam perawatan behel dan aligner.",
    yearsExperience: 12,
    rating: 4.9,
  },
  {
    email: "drg.budi@dentalcare.com",
    name: "drg. Budi Santoso",
    specialty: "Dokter Gigi Umum",
    bio: "Dokter gigi umum yang berpengalaman dalam scaling, tambal gigi, dan perawatan gigi anak.",
    yearsExperience: 8,
    rating: 4.8,
  },
  {
    email: "drg.rina@dentalcare.com",
    name: "drg. Rina Wati, Sp.KG",
    specialty: "Spesialis Konservasi Gigi",
    bio: "Ahli dalam perawatan saluran akar dan restorasi gigi estetik.",
    yearsExperience: 15,
    rating: 5.0,
  },
];

export async function seedDoctors(prisma: PrismaClient) {
  const hashedPassword = await bcrypt.hash("doctor123", 10);

  for (const doc of doctorsData) {
    const user = await prisma.user.upsert({
      where: { email: doc.email },
      update: {},
      create: {
        email: doc.email,
        name: doc.name,
        password: hashedPassword,
        phone: "+628" + Math.floor(Math.random() * 1000000000),
        role: UserRole.DOCTOR,
      },
    });

    await prisma.doctor.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        specialty: doc.specialty,
        bio: doc.bio,
        yearsExperience: doc.yearsExperience,
        rating: doc.rating,
        totalPatients: Math.floor(Math.random() * 500),
        isActive: true,
      },
    });
  }

  console.log("✅ Doctors seeded");
}
```

---

### 8.4 Service Seeder

| Task | Description                        |
| ---- | ---------------------------------- |
| [ ]  | Create dental services with prices |
| [ ]  | Set DP amounts (30% of price)      |
| [ ]  | Add categories and duration        |

```typescript
// prisma/seeders/services.ts
import { PrismaClient } from "@prisma/client";

const servicesData = [
  {
    name: "Scaling Gigi",
    slug: "scaling",
    price: 350000,
    duration: 30,
    category: "general",
    description:
      "Pembersihan karang gigi dan plak menggunakan alat ultrasonik.",
  },
  {
    name: "Tambal Gigi",
    slug: "tambal-gigi",
    price: 250000,
    duration: 45,
    category: "general",
    description: "Penambalan gigi berlubang dengan bahan komposit estetik.",
  },
  {
    name: "Cabut Gigi",
    slug: "cabut-gigi",
    price: 200000,
    duration: 30,
    category: "general",
    description: "Pencabutan gigi dengan anestesi lokal.",
  },
  {
    name: "Bleaching",
    slug: "bleaching",
    price: 1500000,
    duration: 60,
    category: "cosmetic",
    description: "Pemutihan gigi untuk senyum lebih cerah.",
  },
  {
    name: "Veneer Gigi",
    slug: "veneer",
    price: 3500000,
    duration: 90,
    category: "cosmetic",
    description: "Lapisan tipis untuk memperbaiki bentuk dan warna gigi.",
  },
  {
    name: "Behel / Kawat Gigi",
    slug: "behel",
    price: 15000000,
    duration: 60,
    category: "orthodontic",
    description: "Pemasangan behel untuk meratakan susunan gigi.",
  },
  {
    name: "Perawatan Saluran Akar",
    slug: "root-canal",
    price: 1200000,
    duration: 90,
    category: "general",
    description: "Perawatan gigi yang terinfeksi untuk menghindari pencabutan.",
  },
  {
    name: "Gigi Palsu / Crown",
    slug: "crown",
    price: 2500000,
    duration: 60,
    category: "cosmetic",
    description: "Pemasangan mahkota gigi untuk gigi yang rusak.",
  },
];

export async function seedServices(prisma: PrismaClient) {
  for (const service of servicesData) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        name: service.name,
        slug: service.slug,
        description: service.description,
        price: service.price,
        dpAmount: Math.round(service.price * 0.3), // 30% DP
        duration: service.duration,
        category: service.category,
        isActive: true,
      },
    });
  }

  console.log("✅ Services seeded");
}
```

---

### 8.5 Schedule Template Seeder

| Task | Description                               |
| ---- | ----------------------------------------- |
| [ ]  | Create schedule templates for each doctor |
| [ ]  | Define working days (Mon-Sat)             |
| [ ]  | Set working hours (09:00-17:00)           |

```typescript
// prisma/seeders/scheduleTemplates.ts
import { PrismaClient, DayOfWeek } from "@prisma/client";

export async function seedScheduleTemplates(prisma: PrismaClient) {
  const doctors = await prisma.doctor.findMany();

  const days = [
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY,
    DayOfWeek.SATURDAY,
  ];

  for (const doctor of doctors) {
    for (const day of days) {
      await prisma.scheduleTemplate.upsert({
        where: {
          doctorId_dayOfWeek: {
            doctorId: doctor.id,
            dayOfWeek: day,
          },
        },
        update: {},
        create: {
          doctorId: doctor.id,
          dayOfWeek: day,
          startTime: "09:00",
          endTime: "17:00",
          slotDuration: 30,
          isActive: true,
        },
      });
    }
  }

  console.log("✅ Schedule templates seeded");
}
```

---

### 8.6 Time Slots Seeder

| Task | Description                          |
| ---- | ------------------------------------ |
| [ ]  | Generate time slots for next 14 days |
| [ ]  | Based on schedule templates          |
| [ ]  | 30-minute intervals                  |

```typescript
// prisma/seeders/timeSlots.ts
import { PrismaClient } from "@prisma/client";
import { addDays, format, parse, addMinutes } from "date-fns";

export async function seedTimeSlots(prisma: PrismaClient) {
  const doctors = await prisma.doctor.findMany({
    include: { scheduleTemplates: true },
  });

  const today = new Date();

  for (const doctor of doctors) {
    for (let i = 0; i < 14; i++) {
      const date = addDays(today, i);
      const dayOfWeek = format(date, "EEEE").toUpperCase();

      const template = doctor.scheduleTemplates.find(
        (t) => t.dayOfWeek === dayOfWeek && t.isActive
      );

      if (!template) continue;

      let currentTime = parse(template.startTime, "HH:mm", date);
      const endTime = parse(template.endTime, "HH:mm", date);

      while (currentTime < endTime) {
        const startTimeStr = format(currentTime, "HH:mm");
        const endTimeStr = format(
          addMinutes(currentTime, template.slotDuration),
          "HH:mm"
        );

        await prisma.timeSlot.upsert({
          where: {
            doctorId_date_startTime: {
              doctorId: doctor.id,
              date: date,
              startTime: startTimeStr,
            },
          },
          update: {},
          create: {
            doctorId: doctor.id,
            date: date,
            startTime: startTimeStr,
            endTime: endTimeStr,
            isAvailable: true,
            isBlocked: false,
          },
        });

        currentTime = addMinutes(currentTime, template.slotDuration);
      }
    }
  }

  console.log("✅ Time slots seeded (14 days)");
}
```

---

### 8.7 Gallery & Blog Seeder (Optional)

| Task | Description                |
| ---- | -------------------------- |
| [ ]  | Seed sample gallery images |
| [ ]  | Seed sample blog posts     |

```typescript
// prisma/seeders/content.ts
import { PrismaClient, GalleryCategory } from "@prisma/client";

export async function seedContent(prisma: PrismaClient) {
  // Gallery
  const galleryImages = [
    {
      title: "Before After Scaling",
      category: GalleryCategory.BEFORE_AFTER,
      imageUrl: "/images/gallery/ba-scaling.jpg",
    },
    {
      title: "Ruang Tunggu",
      category: GalleryCategory.CLINIC,
      imageUrl: "/images/gallery/waiting-room.jpg",
    },
    {
      title: "Tim Dokter",
      category: GalleryCategory.TEAM,
      imageUrl: "/images/gallery/team.jpg",
    },
  ];

  for (let i = 0; i < galleryImages.length; i++) {
    await prisma.galleryImage.create({
      data: {
        ...galleryImages[i],
        order: i,
        isActive: true,
      },
    });
  }

  console.log("✅ Gallery seeded");
}
```

---

### 8.8 Main Seed File

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./seeders/users";
import { seedDoctors } from "./seeders/doctors";
import { seedServices } from "./seeders/services";
import { seedScheduleTemplates } from "./seeders/scheduleTemplates";
import { seedTimeSlots } from "./seeders/timeSlots";
import { seedContent } from "./seeders/content";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...\n");

  await seedUsers(prisma);
  await seedDoctors(prisma);
  await seedServices(prisma);
  await seedScheduleTemplates(prisma);
  await seedTimeSlots(prisma);
  await seedContent(prisma);

  console.log("\n✅ Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

### 8.9 Seed Commands

| Command                    | Description                      |
| -------------------------- | -------------------------------- |
| `npx prisma db seed`       | Run seeders                      |
| `npx prisma migrate reset` | Reset DB + run seeders           |
| `npm run db:seed`          | Run seeders (via npm script)     |
| `npm run db:reset`         | Reset DB + seed (via npm script) |
