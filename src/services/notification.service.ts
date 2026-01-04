// ============================================
// NOTIFICATION SERVICE
// WhatsApp notification business logic
// ============================================

import { sendWhatsApp, formatBookingConfirmation, formatReminderMessage, formatCancellationMessage } from "@/lib/whatsapp";
import prisma from "@/lib/prisma";
import { BOOKING } from "@/lib/constants";

export interface NotificationResult {
  success: boolean;
  error?: string;
}

/**
 * Send booking confirmation via WhatsApp
 */
export async function sendConfirmation(bookingId: string): Promise<NotificationResult> {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      service: { select: { name: true } },
      doctor: { select: { name: true } },
    },
  });

  if (!booking) {
    return { success: false, error: "Booking tidak ditemukan" };
  }

  if (!booking.patientPhone) {
    return { success: false, error: "Nomor WhatsApp tidak tersedia" };
  }

  const message = formatBookingConfirmation({
    code: booking.code,
    patientName: booking.patientName,
    serviceName: booking.service.name,
    doctorName: booking.doctor.name,
    appointmentDate: booking.appointmentDate,
    appointmentTime: booking.appointmentTime,
    dpAmount: booking.dpAmount,
    totalPrice: booking.totalPrice,
  });

  const result = await sendWhatsApp({ to: booking.patientPhone, message });

  if (result.success) {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { confirmationSent: true },
    });
  }

  return result;
}

/**
 * Send H-1 reminder via WhatsApp
 */
export async function sendReminder(bookingId: string): Promise<NotificationResult> {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      service: { select: { name: true } },
      doctor: { select: { name: true } },
    },
  });

  if (!booking) {
    return { success: false, error: "Booking tidak ditemukan" };
  }

  if (!booking.patientPhone) {
    return { success: false, error: "Nomor WhatsApp tidak tersedia" };
  }

  if (booking.status !== "PAID") {
    return { success: false, error: "Hanya booking PAID yang dapat diingatkan" };
  }

  const message = formatReminderMessage({
    patientName: booking.patientName,
    serviceName: booking.service.name,
    doctorName: booking.doctor.name,
    appointmentDate: booking.appointmentDate,
    appointmentTime: booking.appointmentTime,
  });

  const result = await sendWhatsApp({ to: booking.patientPhone, message });

  if (result.success) {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { reminderSent: true },
    });
  }

  return result;
}

/**
 * Send reminders for bookings H-1
 * Used by cron job
 */
export async function sendUpcomingReminders(): Promise<{ sent: number; failed: number }> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  // Find bookings for tomorrow that haven't been reminded
  const bookings = await prisma.booking.findMany({
    where: {
      appointmentDate: {
        gte: tomorrow,
        lt: dayAfterTomorrow,
      },
      status: "PAID",
      reminderSent: false,
    },
    select: { id: true },
  });

  let sent = 0;
  let failed = 0;

  for (const booking of bookings) {
    const result = await sendReminder(booking.id);
    if (result.success) {
      sent++;
    } else {
      failed++;
    }
  }

  return { sent, failed };
}

/**
 * Notify admin about new booking
 */
export async function notifyAdminNewBooking(bookingCode: string): Promise<void> {
  const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER;
  if (!adminPhone) return;

  await sendWhatsApp({
    to: adminPhone,
    message: `📢 *Booking Baru*\n\nAda booking baru dengan kode: ${bookingCode}\n\nSilakan cek dashboard untuk detail.`,
  });
}
