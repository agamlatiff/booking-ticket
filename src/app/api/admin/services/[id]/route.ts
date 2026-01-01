import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// PUT update service
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

    // Check slug uniqueness if changing
    if (body.slug) {
      const existingSlug = await prisma.service.findFirst({
        where: { slug: body.slug, NOT: { id: params.id } },
      });
      if (existingSlug) {
        return NextResponse.json(
          { error: "Slug sudah digunakan" },
          { status: 400 }
        );
      }
    }

    const service = await prisma.service.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate layanan" },
      { status: 500 }
    );
  }
}

// DELETE service (soft delete)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.service.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Gagal menghapus layanan" },
      { status: 500 }
    );
  }
}
