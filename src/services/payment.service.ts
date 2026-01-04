// ============================================
// PAYMENT SERVICE
// Midtrans payment business logic
// ============================================

import prisma from "@/lib/prisma";
import { createSnapTransaction, verifySignature } from "@/lib/midtrans";
import { sendConfirmation, notifyAdminNewBooking } from "./notification.service";

export interface PaymentResult {
  success: boolean;
  token?: string;
  redirectUrl?: string;
  error?: string;
}

/**
 * Generate new payment token for a booking
 */
export async function generatePaymentToken(bookingId: string): Promise<PaymentResult> {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      service: true,
      patient: { select: { email: true } },
    },
  });

  if (!booking) {
    return { success: false, error: "Booking tidak ditemukan" };
  }

  if (booking.status !== "PENDING") {
    return { success: false, error: "Booking sudah dibayar atau tidak valid" };
  }

  try {
    const response = await createSnapTransaction({
      orderId: booking.code,
      grossAmount: booking.dpAmount,
      customerDetails: {
        firstName: booking.patientName,
        email: booking.patient.email || "noemail@example.com",
        phone: booking.patientPhone,
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

    // Update token in database
    await prisma.booking.update({
      where: { id: bookingId },
      data: { tokenMidtrans: response.token },
    });

    return {
      success: true,
      token: response.token,
      redirectUrl: response.redirect_url,
    };
  } catch (error) {
    console.error("Error generating payment token:", error);
    return { success: false, error: "Gagal membuat token pembayaran" };
  }
}

/**
 * Handle Midtrans webhook notification
 */
export async function handlePaymentNotification(payload: {
  order_id: string;
  transaction_status: string;
  fraud_status: string;
  gross_amount: string;
  status_code: string;
  signature_key: string;
}): Promise<{ success: boolean; message: string }> {
  const { order_id, transaction_status, fraud_status, gross_amount, status_code, signature_key } = payload;

  // Verify signature
  const isValidSignature = verifySignature(order_id, status_code, gross_amount, signature_key);

  if (!isValidSignature) {
    console.error("Invalid Midtrans signature for order:", order_id);
    return { success: false, message: "Invalid signature" };
  }

  // Find booking by code
  const booking = await prisma.booking.findUnique({
    where: { code: order_id },
  });

  if (!booking) {
    console.error("Booking not found for order:", order_id);
    return { success: false, message: "Booking not found" };
  }

  // Process based on transaction status
  if (transaction_status === "capture" || transaction_status === "settlement") {
    if (fraud_status === "accept" || !fraud_status) {
      // Payment successful
      await prisma.booking.update({
        where: { id: booking.id },
        data: {
          status: "PAID",
          dpPaid: booking.dpAmount,
          paidAt: new Date(),
        },
      });

      // Send confirmation
      await sendConfirmation(booking.id);
      await notifyAdminNewBooking(booking.code);

      return { success: true, message: "Payment confirmed" };
    }
  } else if (transaction_status === "pending") {
    // Payment pending (e.g., bank transfer)
    return { success: true, message: "Payment pending" };
  } else if (
    transaction_status === "deny" ||
    transaction_status === "cancel" ||
    transaction_status === "expire"
  ) {
    // Payment failed/cancelled/expired - release slot
    await prisma.$transaction([
      prisma.booking.update({
        where: { id: booking.id },
        data: {
          status: transaction_status === "expire" ? "EXPIRED" : "CANCELLED",
          cancelledAt: new Date(),
        },
      }),
      prisma.timeSlot.update({
        where: { id: booking.slotId },
        data: { isAvailable: true },
      }),
    ]);

    return { success: true, message: `Payment ${transaction_status}` };
  }

  return { success: true, message: "Notification processed" };
}

/**
 * Check payment status from Midtrans
 */
export async function checkPaymentStatus(bookingCode: string): Promise<{
  status: string;
  transactionStatus?: string;
}> {
  const booking = await prisma.booking.findUnique({
    where: { code: bookingCode },
    select: { status: true },
  });

  if (!booking) {
    return { status: "NOT_FOUND" };
  }

  return { status: booking.status };
}
