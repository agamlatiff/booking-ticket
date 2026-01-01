import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET doctor detail (admin)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const doctor = await prisma.doctor.findUnique({
      where: { id: params.id },
      include: {
        scheduleTemplates: true,
        blockedDates: { orderBy: { date: "asc" } },
      },
    });

    if (!doctor) {
      return NextResponse.json(
        { error: "Dokter tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ doctor });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data dokter" },
      { status: 500 }
    );
  }
}

// PUT update doctor
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const doctor = await prisma.doctor.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json({ success: true, doctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate dokter" },
      { status: 500 }
    );
  }
}

// DELETE doctor (soft delete via isActive)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if doctor has future bookings
    const futureBookings = await prisma.booking.count({
      where: {
        doctorId: params.id,
        appointmentDate: { gte: new Date() },
        status: { in: ["PENDING", "PAID"] },
      },
    });

    if (futureBookings > 0) {
      return NextResponse.json(
        { error: `Dokter masih memiliki ${futureBookings} booking aktif` },
        { status: 400 }
      );
    }

    await prisma.doctor.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return NextResponse.json(
      { error: "Gagal menghapus dokter" },
      { status: 500 }
    );
  }
}
