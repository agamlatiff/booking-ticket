import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Cron job to expire unpaid bookings after 15 minutes
// Should be called every minute by Vercel Cron or similar
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret (for security)
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find expired pending bookings
    const expiredBookings = await prisma.booking.findMany({
      where: {
        status: "PENDING",
        expiresAt: { lte: new Date() },
      },
      include: { slot: true },
    });

    if (expiredBookings.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No expired bookings found",
        expired: 0,
      });
    }

    // Expire bookings and release slots
    for (const booking of expiredBookings) {
      await prisma.$transaction([
        prisma.booking.update({
          where: { id: booking.id },
          data: { status: "EXPIRED" },
        }),
        prisma.timeSlot.update({
          where: { id: booking.slotId },
          data: { isAvailable: true },
        }),
      ]);
    }

    console.log(`Expired ${expiredBookings.length} bookings`);

    return NextResponse.json({
      success: true,
      message: `Expired ${expiredBookings.length} bookings`,
      expired: expiredBookings.length,
      bookingCodes: expiredBookings.map((b) => b.code),
    });
  } catch (error) {
    console.error("Error expiring bookings:", error);
    return NextResponse.json(
      { error: "Failed to expire bookings" },
      { status: 500 }
    );
  }
}
