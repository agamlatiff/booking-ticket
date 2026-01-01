import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { DayOfWeek } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { doctorId, startDate, endDate } = body;

    if (!doctorId || !startDate || !endDate) {
      return NextResponse.json(
        { error: "doctorId, startDate, dan endDate wajib diisi" },
        { status: 400 }
      );
    }

    // Get schedule templates for the doctor
    const templates = await prisma.scheduleTemplate.findMany({
      where: { doctorId, isActive: true },
    });

    if (templates.length === 0) {
      return NextResponse.json(
        { error: "Dokter belum memiliki jadwal template" },
        { status: 400 }
      );
    }

    // Get blocked dates
    const blockedDates = await prisma.blockedDate.findMany({
      where: {
        doctorId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });

    const blockedDateSet = new Set(
      blockedDates.map((b) => b.date.toISOString().split("T")[0])
    );

    const dayOfWeekMap: Record<number, DayOfWeek> = {
      0: DayOfWeek.SUNDAY,
      1: DayOfWeek.MONDAY,
      2: DayOfWeek.TUESDAY,
      3: DayOfWeek.WEDNESDAY,
      4: DayOfWeek.THURSDAY,
      5: DayOfWeek.FRIDAY,
      6: DayOfWeek.SATURDAY,
    };

    let slotsCreated = 0;
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dateStr = date.toISOString().split("T")[0];

      // Skip blocked dates
      if (blockedDateSet.has(dateStr)) continue;

      const dayOfWeek = dayOfWeekMap[date.getDay()];
      const dayTemplates = templates.filter((t) => t.dayOfWeek === dayOfWeek);

      for (const template of dayTemplates) {
        const [startHour, startMin] = template.startTime.split(":").map(Number);
        const [endHour, endMin] = template.endTime.split(":").map(Number);

        let currentHour = startHour;
        let currentMin = startMin;

        while (
          currentHour < endHour ||
          (currentHour === endHour && currentMin < endMin)
        ) {
          const slotStartTime = `${String(currentHour).padStart(2, "0")}:${String(currentMin).padStart(2, "0")}`;

          let slotEndHour = currentHour;
          let slotEndMin = currentMin + template.slotDuration;
          if (slotEndMin >= 60) {
            slotEndHour += Math.floor(slotEndMin / 60);
            slotEndMin = slotEndMin % 60;
          }

          if (slotEndHour > endHour || (slotEndHour === endHour && slotEndMin > endMin)) {
            break;
          }

          const slotEndTime = `${String(slotEndHour).padStart(2, "0")}:${String(slotEndMin).padStart(2, "0")}`;

          // Upsert slot
          await prisma.timeSlot.upsert({
            where: {
              doctorId_date_startTime: {
                doctorId,
                date: new Date(dateStr),
                startTime: slotStartTime,
              },
            },
            update: {},
            create: {
              doctorId,
              date: new Date(dateStr),
              startTime: slotStartTime,
              endTime: slotEndTime,
              isAvailable: true,
            },
          });

          slotsCreated++;
          currentMin += template.slotDuration;
          if (currentMin >= 60) {
            currentHour += Math.floor(currentMin / 60);
            currentMin = currentMin % 60;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Berhasil membuat ${slotsCreated} slot`,
      slotsCreated,
    });
  } catch (error) {
    console.error("Error generating slots:", error);
    return NextResponse.json(
      { error: "Gagal generate slot" },
      { status: 500 }
    );
  }
}
