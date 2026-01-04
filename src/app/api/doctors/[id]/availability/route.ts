import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// ISR: Cache for 60 seconds, stale-while-revalidate for 5 min
export const revalidate = 60;

const querySchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);

    const parsed = querySchema.safeParse({
      startDate: searchParams.get("startDate"),
      endDate: searchParams.get("endDate"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "startDate and endDate are required (YYYY-MM-DD)",
          },
        },
        { status: 400 }
      );
    }

    const { startDate, endDate } = parsed.data;

    // Check if doctor exists (minimal select)
    const doctor = await prisma.doctor.findUnique({
      where: { id, isActive: true },
      select: { id: true },
    });

    if (!doctor) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND", message: "Doctor not found" } },
        { status: 404 }
      );
    }

    // Fetch available slots (optimized with select)
    const slots = await prisma.timeSlot.findMany({
      where: {
        doctorId: id,
        isAvailable: true,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      select: {
        id: true,
        date: true,
        startTime: true,
        endTime: true,
      },
    });

    // Group slots by date
    const groupedByDate = slots.reduce((acc, slot) => {
      const dateStr = slot.date.toISOString().split("T")[0];
      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push({
        id: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
      });
      return acc;
    }, {} as Record<string, { id: string; startTime: string; endTime: string }[]>);

    // Convert to array format
    const data = Object.entries(groupedByDate).map(([date, slots]) => ({
      date,
      slots,
    }));

    // Add cache headers
    const response = NextResponse.json({ data });
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300"
    );

    return response;
  } catch (error) {
    console.error("Error fetching doctor availability:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch availability" } },
      { status: 500 }
    );
  }
}
