import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

export const dynamic = "force-dynamic";

const querySchema = z.object({
  category: z.enum(["BEFORE_AFTER", "CLINIC", "TEAM"]).optional(),
  limit: z.coerce.number().min(1).max(50).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = querySchema.safeParse({
      category: searchParams.get("category") || undefined,
      limit: searchParams.get("limit") || undefined,
    });

    const { category, limit } = parsed.success ? parsed.data : {};

    const where = {
      isActive: true,
      ...(category && { category }),
    };

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: { order: "asc" },
      ...(limit && { take: limit }),
      select: {
        id: true,
        title: true,
        imageUrl: true,
        category: true,
        order: true,
      },
    });

    return NextResponse.json({ data: images });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch gallery" } },
      { status: 500 }
    );
  }
}
