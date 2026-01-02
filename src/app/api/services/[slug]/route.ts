import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const service = await prisma.service.findUnique({
      where: { slug, isActive: true },
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
        faq: true,
      },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND", message: "Service not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: service });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch service" } },
      { status: 500 }
    );
  }
}
