// ============================================
// BOOKING SERVICE
// Business logic for booking operations
// ============================================

import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";
import { createSnapTransaction } from "@/lib/midtrans";
import { sendWhatsApp, formatBookingConfirmation, formatCancellationNotification } from "@/lib/whatsapp";
import { BOOKING } from "@/lib/constants";

export interface CreateBookingParams {
  userId: string;
  userEmail: string;
  serviceId: string;
  doctorId: string;
  slotId: string;
  patientName: string;
  patientPhone: string;
  notes?: string;
}

export interface BookingResult {
  success: boolean;
  booking?: {
    id: string;
    code: string;
    serviceName: string;
    doctorName: string;
    appointmentDate: Date;
    appointmentTime: string;
    dpAmount: number;
    totalPrice: number;
    expiresAt: Date;
    paymentToken?: string | null;
    paymentRedirectUrl?: string | null;
  };
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Create a new booking with payment token
 */
export async function createBooking(params: CreateBookingParams): Promise<BookingResult> {
  const { userId, userEmail, serviceId, doctorId, slotId, patientName, patientPhone, notes } = params;

  // Get service
  const service = await prisma.service.findUnique({
    where: { id: serviceId, isActive: true },
  });

  if (!service) {
    return { success: false, error: { code: "NOT_FOUND", message: "Layanan tidak ditemukan" } };
  }

  // Verify doctor
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId, isActive: true },
  });

  if (!doctor) {
    return { success: false, error: { code: "NOT_FOUND", message: "Dokter tidak ditemukan" } };
  }

  // Generate booking code
  const bookingCode = `DENT-${nanoid(6).toUpperCase()}`;
  const expiresAt = new Date(Date.now() + BOOKING.paymentTimeoutMinutes * 60 * 1000);

  try {
    // Create booking in transaction
    const booking = await prisma.$transaction(async (tx) => {
      // Check and lock slot
      const slot = await tx.timeSlot.findUnique({
        where: { id: slotId },
      });

      if (!slot) {
        throw new Error("SLOT_NOT_FOUND");
      }

      if (!slot.isAvailable) {
        throw new Error("SLOT_UNAVAILABLE");
      }

      if (slot.doctorId !== doctorId) {
        throw new Error("SLOT_DOCTOR_MISMATCH");
      }

      // Mark slot unavailable
      await tx.timeSlot.update({
        where: { id: slotId },
        data: { isAvailable: false },
      });

      // Create booking
      return tx.booking.create({
        data: {
          code: bookingCode,
          patientId: userId,
          patientName,
          patientPhone,
          doctorId,
          serviceId,
          slotId,
          appointmentDate: slot.date,
          appointmentTime: slot.startTime,
          dpAmount: service.dpAmount,
          totalPrice: service.price,
          notes,
          expiresAt,
          status: "PENDING",
          bookingSource: "PATIENT_ONLINE",
        },
        include: {
          service: { select: { name: true } },
          doctor: { select: { name: true } },
        },
      });
    });

    // Generate payment token
    let paymentToken: string | null = null;
    let paymentRedirectUrl: string | null = null;

    try {
      const midtransResponse = await createSnapTransaction({
        orderId: booking.code,
        grossAmount: booking.dpAmount,
        customerDetails: {
          firstName: patientName,
          email: userEmail,
          phone: patientPhone,
        },
        itemDetails: [
          {
            id: booking.serviceId,
            name: `DP - ${booking.service.name}`,
            price: booking.dpAmount,
            quantity: 1,
          },
        ],
      });

      paymentToken = midtransResponse.token;
      paymentRedirectUrl = midtransResponse.redirect_url;

      await prisma.booking.update({
        where: { id: booking.id },
        data: { tokenMidtrans: paymentToken },
      });
    } catch (err) {
      console.error("Midtrans token generation failed:", err);
    }

    return {
      success: true,
      booking: {
        id: booking.id,
        code: booking.code,
        serviceName: booking.service.name,
        doctorName: booking.doctor.name,
        appointmentDate: booking.appointmentDate,
        appointmentTime: booking.appointmentTime,
        dpAmount: booking.dpAmount,
        totalPrice: booking.totalPrice,
        expiresAt: booking.expiresAt,
        paymentToken,
        paymentRedirectUrl,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "SLOT_NOT_FOUND") {
        return { success: false, error: { code: "NOT_FOUND", message: "Slot tidak ditemukan" } };
      }
      if (error.message === "SLOT_UNAVAILABLE") {
        return { success: false, error: { code: "CONFLICT", message: "Slot sudah tidak tersedia" } };
      }
      if (error.message === "SLOT_DOCTOR_MISMATCH") {
        return { success: false, error: { code: "VALIDATION_ERROR", message: "Slot tidak sesuai dengan dokter" } };
      }
    }
    console.error("Error creating booking:", error);
    return { success: false, error: { code: "INTERNAL_ERROR", message: "Gagal membuat booking" } };
  }
}

/**
 * Cancel a booking
 */
export async function cancelBooking(
  bookingId: string,
  userId: string,
  userRole: string,
  reason?: string
): Promise<{ success: boolean; isRefundable?: boolean; error?: { code: string; message: string } }> {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      service: { select: { name: true } },
      doctor: { select: { name: true } },
    },
  });

  if (!booking) {
    return { success: false, error: { code: "NOT_FOUND", message: "Booking tidak ditemukan" } };
  }

  // Check ownership
  if (booking.patientId !== userId && userRole !== "ADMIN") {
    return { success: false, error: { code: "FORBIDDEN", message: "Tidak dapat membatalkan booking ini" } };
  }

  // Check status
  if (!["PENDING", "PAID"].includes(booking.status)) {
    return { success: false, error: { code: "VALIDATION_ERROR", message: "Booking tidak dapat dibatalkan" } };
  }

  // Check 24-hour policy
  let isRefundable = false;
  if (booking.status === "PAID") {
    const appointmentDateTime = new Date(booking.appointmentDate);
    const [hours, minutes] = booking.appointmentTime.split(":").map(Number);
    appointmentDateTime.setHours(hours, minutes, 0, 0);

    const hoursUntilAppointment = (appointmentDateTime.getTime() - Date.now()) / (1000 * 60 * 60);
    isRefundable = hoursUntilAppointment > BOOKING.cancellationPolicyHours;

    if (userRole !== "ADMIN" && hoursUntilAppointment < BOOKING.cancellationPolicyHours) {
      return {
        success: false,
        error: { code: "CANCELLATION_TOO_LATE", message: `Pembatalan harus ${BOOKING.cancellationPolicyHours} jam sebelum jadwal` },
      };
    }
  }

  // Cancel in transaction
  await prisma.$transaction([
    prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: "CANCELLED",
        cancelledAt: new Date(),
        notes: reason ? `${booking.notes || ""}\n[Alasan: ${reason}]`.trim() : booking.notes,
      },
    }),
    prisma.timeSlot.update({
      where: { id: booking.slotId },
      data: { isAvailable: true },
    }),
  ]);

  // Send notification
  if (booking.patientPhone) {
    sendWhatsApp({
      to: booking.patientPhone,
      message: formatCancellationNotification({
        code: booking.code,
        patientName: booking.patientName,
        serviceName: booking.service.name,
        doctorName: booking.doctor.name,
        appointmentDate: booking.appointmentDate,
        appointmentTime: booking.appointmentTime,
        isRefundable,
      }),
    }).catch(console.error);
  }

  return { success: true, isRefundable };
}

/**
 * Get booking by code
 */
export async function getBookingByCode(code: string) {
  return prisma.booking.findUnique({
    where: { code },
    include: {
      service: true,
      doctor: true,
      patient: {
        select: { name: true, email: true, phone: true },
      },
    },
  });
}
