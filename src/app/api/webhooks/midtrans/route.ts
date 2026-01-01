import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendWhatsApp, formatBookingConfirmation } from "@/lib/whatsapp";

// Midtrans webhook notification handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = body;

    // Verify signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY!;
    const expectedSignature = crypto
      .createHash("sha512")
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest("hex");

    if (signature_key !== expectedSignature) {
      console.error("Invalid Midtrans signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    // Find booking by code (order_id format: DENT-XXXXXX)
    const booking = await prisma.booking.findUnique({
      where: { code: order_id },
      include: {
        service: { select: { name: true, price: true } },
        doctor: { select: { name: true } },
      },
    });

    if (!booking) {
      console.error(`Booking not found: ${order_id}`);
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Handle transaction status
    let newStatus = booking.status;

    if (transaction_status === "capture" || transaction_status === "settlement") {
      if (fraud_status === "accept" || !fraud_status) {
        newStatus = "PAID";
      }
    } else if (transaction_status === "pending") {
      newStatus = "PENDING";
    } else if (
      transaction_status === "deny" ||
      transaction_status === "cancel" ||
      transaction_status === "expire"
    ) {
      newStatus = transaction_status === "expire" ? "EXPIRED" : "CANCELLED";
    }

    // Update booking status
    if (newStatus !== booking.status) {
      const updateData: any = { status: newStatus };

      if (newStatus === "PAID") {
        updateData.paidAt = new Date();
        updateData.dpPaid = booking.dpAmount;
        updateData.confirmationSent = true;

        // Send WhatsApp confirmation
        const message = formatBookingConfirmation({
          code: booking.code,
          patientName: booking.patientName,
          serviceName: booking.service.name,
          doctorName: booking.doctor.name,
          appointmentDate: booking.appointmentDate,
          appointmentTime: booking.appointmentTime,
          dpAmount: booking.dpAmount,
          totalPrice: booking.service.price,
        });

        const result = await sendWhatsApp({
          to: booking.patientPhone,
          message,
        });

        if (!result.success) {
          console.error(`Failed to send WhatsApp confirmation for ${order_id}:`, result.error);
          updateData.confirmationSent = false;
        }
      } else if (newStatus === "CANCELLED" || newStatus === "EXPIRED") {
        // Release slot
        await prisma.timeSlot.update({
          where: { id: booking.slotId },
          data: { isAvailable: true },
        });

        if (newStatus === "CANCELLED") {
          updateData.cancelledAt = new Date();
        }
      }

      await prisma.booking.update({
        where: { id: booking.id },
        data: updateData,
      });

      console.log(`Booking ${order_id} status updated to ${newStatus}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Midtrans webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

