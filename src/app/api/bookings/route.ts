import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Silakan login terlebih dahulu" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { serviceId, doctorId, slotId, patientName, patientPhone, notes } = body;

    // Validate required fields
    if (!serviceId || !doctorId || !slotId || !patientName || !patientPhone) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // Get service details
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Layanan tidak ditemukan" },
        { status: 404 }
      );
    }

    // Get slot and verify availability
    const slot = await prisma.timeSlot.findUnique({
      where: { id: slotId },
      include: { booking: true },
    });

    if (!slot) {
      return NextResponse.json(
        { error: "Slot tidak ditemukan" },
        { status: 404 }
      );
    }

    if (!slot.isAvailable || slot.booking) {
      return NextResponse.json(
        { error: "Slot sudah tidak tersedia" },
        { status: 400 }
      );
    }

    // Generate booking code
    const bookingCode = `DENT-${nanoid(6).toUpperCase()}`;

    // Set expiry time (15 minutes from now)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Create booking in transaction
    const booking = await prisma.$transaction(async (tx) => {
      // Mark slot as unavailable
      await tx.timeSlot.update({
        where: { id: slotId },
        data: { isAvailable: false },
      });

      // Create booking
      return tx.booking.create({
        data: {
          code: bookingCode,
          patientId: session.user.id,
          patientName,
          patientPhone,
          doctorId,
          serviceId,
          slotId,
          appointmentDate: slot.date,
          appointmentTime: slot.startTime,
          dpAmount: service.dpAmount,
          totalPrice: service.price,
          notes,
          expiresAt,
          status: "PENDING",
        },
        include: {
          service: true,
          doctor: true,
          slot: true,
        },
      });
    });

    // TODO: Generate Midtrans payment token here
    // For now, return booking without payment

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        code: booking.code,
        service: booking.service.name,
        doctor: booking.doctor.name,
        appointmentDate: booking.appointmentDate,
        appointmentTime: booking.appointmentTime,
        dpAmount: booking.dpAmount,
        expiresAt: booking.expiresAt,
      },
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Gagal membuat booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: { patientId: session.user.id },
      include: {
        service: { select: { name: true, slug: true } },
        doctor: { select: { name: true, speciality: true, image: true } },
      },
      orderBy: { appointmentDate: "desc" },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data booking" },
      { status: 500 }
    );
  }
}
