// Booking helper functions
import { nanoid } from "nanoid";

/**
 * Generate unique booking code
 * Format: DENT-XXXXXX (e.g., DENT-A1B2C3)
 */
export function generateBookingCode(): string {
  const prefix = "DENT";
  const random = nanoid(6).toUpperCase();
  return `${prefix}-${random}`;
}

/**
 * Calculate expiry time for booking payment
 * Default: 15 minutes from now
 */
export function calculateExpiryTime(minutes: number = 15): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}

/**
 * Check if booking is within cancellation window
 * Default: 24 hours before appointment
 */
export function isWithinCancellationWindow(
  appointmentDate: Date,
  hoursBeforeAppointment: number = 24
): boolean {
  const now = new Date();
  const diffMs = appointmentDate.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  return diffHours > hoursBeforeAppointment;
}

/**
 * Format appointment date for display
 */
export function formatAppointmentDate(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format price as Indonesian Rupiah
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Validate Indonesian phone number
 */
export function validatePhoneNumber(phone: string): boolean {
  const regex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
  return regex.test(phone.replace(/[\s-]/g, ""));
}

/**
 * Normalize phone number to Indonesian format (+62)
 */
export function normalizePhoneNumber(phone: string): string {
  let normalized = phone.replace(/[\s-]/g, "");
  if (normalized.startsWith("0")) {
    normalized = "+62" + normalized.substring(1);
  } else if (normalized.startsWith("62")) {
    normalized = "+" + normalized;
  }
  return normalized;
}
