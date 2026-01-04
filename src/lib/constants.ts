// ============================================
// APPLICATION CONSTANTS
// ============================================

/**
 * Clinic Information
 */
export const CLINIC = {
  name: "Klinik Gigi Senyum Sejahtera",
  tagline: "Wujudkan Senyum Impianmu",
  phone: "+62-21-1234567",
  whatsapp: "6281234567890",
  email: "info@dentalclinic.id",
  address: {
    street: "Jl. Kesehatan No. 123",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    postalCode: "12345",
    country: "Indonesia",
  },
  operatingHours: {
    weekdays: { open: "09:00", close: "17:00" },
    saturday: { open: "09:00", close: "14:00" },
    sunday: null, // Closed
  },
  social: {
    instagram: "https://instagram.com/klinikgigisenyumsejahtera",
    facebook: "https://facebook.com/klinikgigisenyumsejahtera",
  },
} as const;

/**
 * Booking Settings
 */
export const BOOKING = {
  // Payment timeout in minutes
  paymentTimeoutMinutes: 15,
  // Minimum hours before appointment for cancellation
  cancellationPolicyHours: 24,
  // Reminder hours before appointment
  reminderHoursBeforeAppointment: 24,
  // Maximum booking advance days
  maxAdvanceBookingDays: 30,
  // Time slot duration in minutes
  slotDurationMinutes: 60,
} as const;

/**
 * Pagination Defaults
 */
export const PAGINATION = {
  defaultLimit: 20,
  maxLimit: 100,
} as const;

/**
 * File Upload Limits
 */
export const FILE_UPLOAD = {
  maxAvatarSizeMB: 5,
  allowedImageTypes: ["image/jpeg", "image/png", "image/webp"],
  maxGallerySizeMB: 10,
} as const;

/**
 * Booking Status Labels (Indonesian)
 */
export const BOOKING_STATUS_LABELS: Record<string, string> = {
  PENDING: "Menunggu Pembayaran",
  PAID: "Terkonfirmasi",
  CHECKED_IN: "Check-in",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
  EXPIRED: "Kedaluwarsa",
} as const;

/**
 * Role Labels (Indonesian)
 */
export const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Administrator",
  DOCTOR: "Dokter",
  PATIENT: "Pasien",
} as const;

/**
 * API Error Codes (for consistent client-side handling)
 */
export const ERROR_CODES = {
  // Auth
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  SESSION_EXPIRED: "SESSION_EXPIRED",

  // Validation
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_INPUT: "INVALID_INPUT",

  // Resources
  NOT_FOUND: "NOT_FOUND",
  ALREADY_EXISTS: "ALREADY_EXISTS",
  CONFLICT: "CONFLICT",

  // Booking
  SLOT_UNAVAILABLE: "SLOT_UNAVAILABLE",
  BOOKING_EXPIRED: "BOOKING_EXPIRED",
  CANNOT_CANCEL: "CANNOT_CANCEL",
  CANCELLATION_TOO_LATE: "CANCELLATION_TOO_LATE",

  // Payment
  PAYMENT_FAILED: "PAYMENT_FAILED",
  INVALID_SIGNATURE: "INVALID_SIGNATURE",

  // Server
  INTERNAL_ERROR: "INTERNAL_ERROR",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
} as const;

/**
 * Format currency to Indonesian Rupiah
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date to Indonesian locale
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

/**
 * Format time (HH:mm)
 */
export function formatTime(time: string): string {
  return time; // Already in HH:mm format
}
