// ============================================
// BOOKING TYPES
// Types related to booking operations
// ============================================

import { BookingStatus, BookingSource, BookingType } from "@prisma/client";

/**
 * Booking summary for list views
 */
export interface BookingSummary {
  id: string;
  code: string;
  patientName: string;
  patientPhone: string;
  serviceName: string;
  doctorName: string;
  appointmentDate: Date;
  appointmentTime: string;
  status: BookingStatus;
  dpAmount: number;
  totalPrice: number;
  createdAt: Date;
}

/**
 * Booking detail with all relations
 */
export interface BookingDetail extends BookingSummary {
  patientId: string;
  patientEmail?: string;
  doctorId: string;
  doctorImage?: string | null;
  serviceId: string;
  serviceSlug?: string;
  slotId: string;
  dpPaid: number;
  notes?: string | null;
  bookingSource: BookingSource;
  bookingType?: BookingType | null;
  paidAt?: Date | null;
  checkedInAt?: Date | null;
  completedAt?: Date | null;
  cancelledAt?: Date | null;
  expiresAt: Date;
  confirmationSent: boolean;
  reminderSent: boolean;
}

/**
 * Create booking request
 */
export interface CreateBookingRequest {
  serviceId: string;
  doctorId: string;
  slotId: string;
  patientName: string;
  patientPhone: string;
  notes?: string;
}

/**
 * Create booking response
 */
export interface CreateBookingResponse {
  bookingId: string;
  code: string;
  service: string;
  doctor: string;
  appointmentDate: Date;
  appointmentTime: string;
  dpAmount: number;
  totalPrice: number;
  expiresAt: Date;
  paymentToken?: string | null;
  paymentRedirectUrl?: string | null;
}

/**
 * Doctor booking request (skip payment)
 */
export interface DoctorBookingRequest {
  patientId?: string;
  newPatient?: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
  };
  serviceId: string;
  slotId: string;
  bookingType: "WALK_IN" | "PHONE" | "REFERRAL";
  notes?: string;
}

/**
 * Slot availability
 */
export interface SlotInfo {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

/**
 * Doctor availability by date
 */
export interface DoctorAvailability {
  date: string;
  slots: SlotInfo[];
}

/**
 * Booking filter options
 */
export interface BookingFilter {
  status?: BookingStatus;
  doctorId?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
}
