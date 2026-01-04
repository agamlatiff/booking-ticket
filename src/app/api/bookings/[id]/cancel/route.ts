import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  validationError,
  notFound,
  forbidden,
  internalError,
  ErrorCodes,
  errorResponse,
} from "@/lib/api/response";
import { withAuth } from "@/lib/api/middleware";
import { sendWhatsApp, formatCancellationNotification } from "@/lib/whatsapp";

// ============================================
// PUT /api/bookings/[id]/cancel - Cancel a booking
// ============================================

export const PUT = withAuth(async (
  request: NextRequest,
  { params, session }
) => {
  try {
    const { id } = await params!;

    // Get booking with relations
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        slot: true,
        service: { select: { name: true } },
        doctor: { select: { name: true } },
      },
    });

    if (!booking) {
      return notFound("Booking");
    }

    // Check ownership (patient can cancel own, admin can cancel any)
    const isOwner = booking.patientId === session.user.id;
    const isAdmin = session.user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return forbidden("Anda tidak dapat membatalkan booking ini");
    }

    // Can only cancel PENDING or PAID bookings
    if (!["PENDING", "PAID"].includes(booking.status)) {
      return validationError("Booking dengan status ini tidak dapat dibatalkan");
    }

    // Check 24-hour cancellation policy for PAID bookings (skip for admin)
    let isRefundable = false;
    if (booking.status === "PAID") {
      const appointmentDateTime = new Date(booking.appointmentDate);
      const [hours, minutes] = booking.appointmentTime.split(":").map(Number);
      appointmentDateTime.setHours(hours, minutes, 0, 0);

      const hoursUntilAppointment =
        (appointmentDateTime.getTime() - Date.now()) / (1000 * 60 * 60);

      isRefundable = hoursUntilAppointment > 24;

      // Non-admin cannot cancel within 24 hours
      if (!isAdmin && hoursUntilAppointment < 24) {
        return errorResponse(
          ErrorCodes.CANCELLATION_TOO_LATE,
          "Pembatalan hanya bisa dilakukan minimal 24 jam sebelum jadwal. Silakan hubungi admin untuk bantuan.",
          400
        );
      }
    }

    // Get optional reason from body
    let reason: string | undefined;
    try {
      const body = await request.json();
      reason = body.reason;
    } catch {
      // No body is fine
    }

    // Cancel booking and release slot in transaction
    await prisma.$transaction([
      prisma.booking.update({
        where: { id },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
          notes: reason
            ? `${booking.notes || ""}\n[Alasan pembatalan: ${reason}]`.trim()
            : booking.notes,
        },
      }),
      prisma.timeSlot.update({
        where: { id: booking.slotId },
        data: { isAvailable: true },
      }),
    ]);

    // Send WhatsApp notification (async)
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
      }).catch((err) => {
        console.error("Failed to send cancellation notification:", err);
      });
    }

    return successResponse(
      {
        cancelled: true,
        isRefundable,
        message: isRefundable
          ? "Booking berhasil dibatalkan. DP akan dikembalikan."
          : "Booking berhasil dibatalkan.",
      },
      "Booking berhasil dibatalkan"
    );
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return internalError("Gagal membatalkan booking");
  }
});
