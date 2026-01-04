import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  validationError,
  notFound,
  internalError,
} from "@/lib/api/response";
import { withAdmin } from "@/lib/api/middleware";
import { sendWhatsApp, formatReminderMessage } from "@/lib/whatsapp";

// ============================================
// POST /api/admin/bookings/[id]/reminder - Manual send reminder
// ============================================

export const POST = withAdmin(async (
  request: NextRequest,
  { params }
) => {
  try {
    const { id } = await params!;

    // Get booking
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        service: { select: { name: true } },
        doctor: { select: { name: true } },
      },
    });

    if (!booking) {
      return notFound("Booking");
    }

    // Only send reminder for PAID bookings
    if (booking.status !== "PAID") {
      return validationError(
        `Tidak dapat mengirim reminder untuk booking dengan status ${booking.status}`
      );
    }

    // Check if phone number exists
    if (!booking.patientPhone) {
      return validationError("Pasien tidak memiliki nomor WhatsApp");
    }

    // Send reminder
    const message = formatReminderMessage({
      patientName: booking.patientName,
      serviceName: booking.service.name,
      doctorName: booking.doctor.name,
      appointmentDate: booking.appointmentDate,
      appointmentTime: booking.appointmentTime,
    });

    const result = await sendWhatsApp({
      to: booking.patientPhone,
      message,
    });

    if (!result.success) {
      return internalError(`Gagal mengirim reminder: ${result.error}`);
    }

    // Update reminder sent flag
    await prisma.booking.update({
      where: { id },
      data: { reminderSent: true },
    });

    return successResponse(
      {
        sent: true,
        to: booking.patientPhone,
        bookingCode: booking.code,
      },
      "Reminder berhasil dikirim"
    );
  } catch (error) {
    console.error("Error sending manual reminder:", error);
    return internalError("Gagal mengirim reminder");
  }
});
