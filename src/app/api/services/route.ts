import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// ISR: Revalidate every 5 minutes (static but fresh)
export const revalidate = 300;

const querySchema = z.object({
  category: z.enum(["general", "cosmetic", "orthodontic"]).optional(),
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

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        orderBy: { order: "asc" },
        ...(limit && { take: limit }),
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          price: true,
          dpAmount: true,
          duration: true,
          image: true,
          category: true,
          order: true,
        },
      }),
      prisma.service.count({ where }),
    ]);

    // Add cache headers for CDN/browser caching
    const response = NextResponse.json({ data: services, total });
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return response;
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch services" } },
      { status: 500 }
    );
  }
}
