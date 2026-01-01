import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { phone } = await request.json();

    // Validate phone format (Indonesian)
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Format nomor WhatsApp tidak valid" },
        { status: 400 }
      );
    }

    // Normalize phone to 62 format
    let normalizedPhone = phone;
    if (phone.startsWith("0")) {
      normalizedPhone = "62" + phone.slice(1);
    } else if (phone.startsWith("+62")) {
      normalizedPhone = phone.slice(1);
    }

    // Update user phone
    await prisma.user.update({
      where: { id: session.user.id },
      data: { phone: normalizedPhone },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating phone:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan nomor" },
      { status: 500 }
    );
  }
}
