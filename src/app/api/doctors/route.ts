import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

export const dynamic = "force-dynamic";

const querySchema = z.object({
  limit: z.coerce.number().min(1).max(50).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      limit: searchParams.get("limit") || undefined,
    });

    const { limit } = parsed.success ? parsed.data : {};

    const doctors = await prisma.doctor.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      ...(limit && { take: limit }),
      select: {
        id: true,
        name: true,
        speciality: true,
        bio: true,
        image: true,
        yearsExperience: true,
        rating: true,
        totalPatients: true,
        scheduleTemplates: {
          where: { isActive: true },
          select: { dayOfWeek: true },
        },
      },
    });

    // Format response with working days
    const data = doctors.map((doc) => ({
      ...doc,
      workingDays: doc.scheduleTemplates.map((t) => t.dayOfWeek),
      scheduleTemplates: undefined,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch doctors" } },
      { status: 500 }
    );
  }
}
