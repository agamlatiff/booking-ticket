import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";

const validTransitions: Record<BookingStatus, BookingStatus[]> = {
  PENDING: ["PAID", "CANCELLED", "EXPIRED"],
  PAID: ["CHECKED_IN", "CANCELLED"],
  CHECKED_IN: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
  EXPIRED: [],
};

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await request.json();

    if (!status || !Object.values(BookingStatus).includes(status)) {
      return NextResponse.json(
        { error: "Status tidak valid" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking tidak ditemukan" },
        { status: 404 }
      );
    }

    // Check valid status transition
    const allowedTransitions = validTransitions[booking.status];
    if (!allowedTransitions.includes(status)) {
      return NextResponse.json(
        { error: `Tidak bisa mengubah status dari ${booking.status} ke ${status}` },
        { status: 400 }
      );
    }

    // Update booking with appropriate timestamps
    const updateData: any = { status };

    if (status === "PAID") {
      updateData.paidAt = new Date();
      updateData.dpPaid = booking.dpAmount;
    } else if (status === "CHECKED_IN") {
      updateData.checkedInAt = new Date();
    } else if (status === "COMPLETED") {
      updateData.completedAt = new Date();
    } else if (status === "CANCELLED") {
      updateData.cancelledAt = new Date();
      // Release slot
      await prisma.timeSlot.update({
        where: { id: booking.slotId },
        data: { isAvailable: true },
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return NextResponse.json(
      { error: "Gagal mengubah status booking" },
      { status: 500 }
    );
  }
}
