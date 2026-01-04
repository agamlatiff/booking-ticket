import { z } from "zod";

// ============================================
// DENTAL BOOKING VALIDATION
// ============================================

/**
 * Indonesian phone number validation
 * Supports formats: +62xxx, 62xxx, 08xxx
 */
export const phoneSchema = z
  .string()
  .regex(
    /^(\+62|62|0)8[1-9][0-9]{7,10}$/,
    "Format nomor WhatsApp tidak valid (contoh: 08123456789)"
  );

/**
 * Create booking request validation
 */
export const createBookingSchema = z.object({
  serviceId: z.string().min(1, "Layanan harus dipilih"),
  doctorId: z.string().min(1, "Dokter harus dipilih"),
  slotId: z.string().min(1, "Slot waktu harus dipilih"),
  patientName: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama terlalu panjang"),
  patientPhone: phoneSchema,
  notes: z.string().max(500, "Catatan maksimal 500 karakter").optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

/**
 * Cancel booking request validation
 */
export const cancelBookingSchema = z.object({
  reason: z.string().max(500, "Alasan maksimal 500 karakter").optional(),
});

export type CancelBookingInput = z.infer<typeof cancelBookingSchema>;

/**
 * Booking filter query validation
 */
export const bookingFilterSchema = z.object({
  status: z
    .enum(["PENDING", "PAID", "CHECKED_IN", "COMPLETED", "CANCELLED", "EXPIRED"])
    .optional(),
  doctorId: z.string().optional(),
  dateFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  dateTo: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  search: z.string().max(100).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export type BookingFilterInput = z.infer<typeof bookingFilterSchema>;

// ============================================
// DOCTOR BOOKING VALIDATION (Skip Payment)
// ============================================

/**
 * New patient data for doctor portal
 */
export const newPatientSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(100),
  phone: phoneSchema,
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  address: z.string().max(500).optional(),
});

export type NewPatientInput = z.infer<typeof newPatientSchema>;

/**
 * Doctor create booking request (skip payment, status = CONFIRMED)
 */
export const doctorBookingSchema = z
  .object({
    patientId: z.string().optional(),
    newPatient: newPatientSchema.optional(),
    serviceId: z.string().min(1, "Layanan harus dipilih"),
    slotId: z.string().min(1, "Slot waktu harus dipilih"),
    bookingType: z.enum(["WALK_IN", "PHONE", "REFERRAL"]),
    notes: z.string().max(500).optional(),
  })
  .refine((data) => data.patientId || data.newPatient, {
    message: "Pilih pasien existing atau isi data pasien baru",
  });

export type DoctorBookingInput = z.infer<typeof doctorBookingSchema>;

// ============================================
// SLOT VALIDATION
// ============================================

/**
 * Slot query validation
 */
export const slotQuerySchema = z.object({
  doctorId: z.string().min(1, "doctorId harus diisi"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal: YYYY-MM-DD"),
});

export type SlotQueryInput = z.infer<typeof slotQuerySchema>;

/**
 * Availability query validation
 */
export const availabilityQuerySchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format: YYYY-MM-DD"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format: YYYY-MM-DD"),
});

export type AvailabilityQueryInput = z.infer<typeof availabilityQuerySchema>;
