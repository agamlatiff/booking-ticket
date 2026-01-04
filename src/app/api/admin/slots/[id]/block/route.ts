import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  notFound,
  conflict,
  internalError,
} from "@/lib/api/response";
import { withAdmin } from "@/lib/api/middleware";

// ============================================
// PUT /api/admin/slots/[id]/block - Toggle slot availability
// ============================================

export const PUT = withAdmin(async (
  request: NextRequest,
  { params }
) => {
  try {
    const { id } = await params!;

    // Get slot with booking
    const slot = await prisma.timeSlot.findUnique({
      where: { id },
      include: {
        booking: { select: { id: true, status: true } },
        doctor: { select: { name: true } },
      },
    });

    if (!slot) {
      return notFound("Slot");
    }

    // Cannot block if slot has an active booking
    if (slot.booking && ["PENDING", "PAID", "CHECKED_IN"].includes(slot.booking.status)) {
      return conflict("Tidak dapat memblokir slot yang sudah memiliki booking aktif");
    }

    // Toggle availability
    const updatedSlot = await prisma.timeSlot.update({
      where: { id },
      data: { isAvailable: !slot.isAvailable },
      select: {
        id: true,
        date: true,
        startTime: true,
        endTime: true,
        isAvailable: true,
        doctor: { select: { name: true } },
      },
    });

    return successResponse(
      {
        slot: updatedSlot,
        message: updatedSlot.isAvailable
          ? "Slot berhasil dibuka kembali"
          : "Slot berhasil diblokir",
      },
      updatedSlot.isAvailable ? "Slot dibuka" : "Slot diblokir"
    );
  } catch (error) {
    console.error("Error toggling slot block:", error);
    return internalError("Gagal mengubah status slot");
  }
});
