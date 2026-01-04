import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withCronAuth } from "@/lib/api/middleware";

// ============================================
// GET /api/cron/expire-bookings
// Cron job to expire unpaid bookings after timeout
// ============================================

export const GET = withCronAuth(async (request: NextRequest) => {
  try {
    const now = new Date();

    // Find all expired pending bookings
    const expiredBookings = await prisma.booking.findMany({
      where: {
        status: "PENDING",
        expiresAt: { lte: now },
      },
      select: {
        id: true,
        code: true,
        slotId: true,
      },
    });

    if (expiredBookings.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No expired bookings found",
        expired: 0,
      });
    }

    // Batch update: expire all bookings and release slots in single transaction
    const slotIds = expiredBookings.map((b) => b.slotId);
    const bookingIds = expiredBookings.map((b) => b.id);

    await prisma.$transaction([
      // Update all bookings to EXPIRED
      prisma.booking.updateMany({
        where: { id: { in: bookingIds } },
        data: { status: "EXPIRED" },
      }),
      // Release all slots
      prisma.timeSlot.updateMany({
        where: { id: { in: slotIds } },
        data: { isAvailable: true },
      }),
    ]);

    console.log(`[CRON] Expired ${expiredBookings.length} bookings:`,
      expiredBookings.map((b) => b.code).join(", "));

    return NextResponse.json({
      success: true,
      message: `Expired ${expiredBookings.length} bookings`,
      expired: expiredBookings.length,
      bookingCodes: expiredBookings.map((b) => b.code),
    });
  } catch (error) {
    console.error("[CRON] Error expiring bookings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to expire bookings" },
      { status: 500 }
    );
  }
});

// Force dynamic for cron
export const dynamic = "force-dynamic";
