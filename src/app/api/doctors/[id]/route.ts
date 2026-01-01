import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: params.id, isActive: true },
      select: {
        id: true,
        name: true,
        speciality: true,
        bio: true,
        image: true,
        phone: true,
        scheduleTemplates: {
          where: { isActive: true },
          select: {
            dayOfWeek: true,
            startTime: true,
            endTime: true,
          },
        },
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
