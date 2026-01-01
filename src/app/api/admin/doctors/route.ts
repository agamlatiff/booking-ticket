import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET all doctors (admin)
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const doctors = await prisma.doctor.findMany({
      orderBy: { name: "asc" },
      include: {
        scheduleTemplates: true,
        _count: { select: { bookings: true } },
      },
    });

    return NextResponse.json({ doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data dokter" },
      { status: 500 }
    );
  }
}

// POST create doctor
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, speciality, bio, image, phone, isActive = true } = body;

    if (!name || !speciality) {
      return NextResponse.json(
        { error: "Nama dan spesialisasi wajib diisi" },
        { status: 400 }
      );
    }

    const doctor = await prisma.doctor.create({
      data: { name, speciality, bio, image, phone, isActive },
    });

    return NextResponse.json({ success: true, doctor }, { status: 201 });
  } catch (error) {
    console.error("Error creating doctor:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan dokter" },
      { status: 500 }
    );
  }
}
