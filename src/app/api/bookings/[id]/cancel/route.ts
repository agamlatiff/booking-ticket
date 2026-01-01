import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: { slot: true },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking tidak ditemukan" },
        { status: 404 }
      );
    }

    // Check ownership
    if (booking.patientId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Can only cancel PENDING or PAID bookings
    if (!["PENDING", "PAID"].includes(booking.status)) {
      return NextResponse.json(
        { error: "Booking tidak dapat dibatalkan" },
        { status: 400 }
      );
    }

    // Check 24-hour cancellation policy for PAID bookings
    if (booking.status === "PAID") {
      const appointmentDateTime = new Date(booking.appointmentDate);
      const [hours, minutes] = booking.appointmentTime.split(":").map(Number);
      appointmentDateTime.setHours(hours, minutes, 0, 0);

      const hoursUntilAppointment =
        (appointmentDateTime.getTime() - Date.now()) / (1000 * 60 * 60);

      if (hoursUntilAppointment < 24) {
        return NextResponse.json(
          { error: "Pembatalan hanya bisa dilakukan minimal 24 jam sebelum jadwal" },
          { status: 400 }
        );
      }
    }

    // Cancel booking and release slot
    await prisma.$transaction([
      prisma.booking.update({
        where: { id: params.id },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
        },
      }),
      prisma.timeSlot.update({
        where: { id: booking.slotId },
        data: { isAvailable: true },
      }),
    ]);

    return NextResponse.json({ success: true, message: "Booking berhasil dibatalkan" });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json(
      { error: "Gagal membatalkan booking" },
      { status: 500 }
    );
  }
}
