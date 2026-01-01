import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const doctorId = searchParams.get("doctorId");
    const date = searchParams.get("date");

    if (!doctorId || !date) {
      return NextResponse.json(
        { error: "doctorId and date are required" },
        { status: 400 }
      );
    }

    // Parse date
    const slotDate = new Date(date);
    slotDate.setHours(0, 0, 0, 0);

    const slots = await prisma.timeSlot.findMany({
      where: {
        doctorId,
        date: slotDate,
        isAvailable: true,
      },
      orderBy: { startTime: "asc" },
      select: {
        id: true,
        doctorId: true,
        date: true,
        startTime: true,
        endTime: true,
        isAvailable: true,
      },
    });

    // Format date for response
    const formattedSlots = slots.map((slot) => ({
      ...slot,
      date: slot.date.toISOString().split("T")[0],
    }));

    return NextResponse.json({ slots: formattedSlots });
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch slots" },
      { status: 500 }
    );
  }
}
