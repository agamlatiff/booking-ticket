import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const doctor = await prisma.doctor.findUnique({
      where: { id, isActive: true },
      select: {
        id: true,
        name: true,
        speciality: true,
        bio: true,
        image: true,
        phone: true,
        yearsExperience: true,
        rating: true,
        totalPatients: true,
        scheduleTemplates: {
          where: { isActive: true },
          orderBy: { dayOfWeek: "asc" },
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
        { success: false, error: { code: "NOT_FOUND", message: "Doctor not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: doctor });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch doctor" } },
      { status: 500 }
    );
  }
}
