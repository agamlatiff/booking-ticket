import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { DayOfWeek } from "@prisma/client";

// Cron job to auto-generate slots for future dates
// Should be called daily
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate slots for the next 14 days
    const daysAhead = 14;
    const doctors = await prisma.doctor.findMany({
      where: { isActive: true },
      include: {
        scheduleTemplates: { where: { isActive: true } },
        blockedDates: {
          where: {
            date: {
              gte: new Date(),
              lte: new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000),
            },
          },
        },
      },
    });

    const dayOfWeekMap: Record<number, DayOfWeek> = {
      0: DayOfWeek.SUNDAY,
      1: DayOfWeek.MONDAY,
      2: DayOfWeek.TUESDAY,
      3: DayOfWeek.WEDNESDAY,
      4: DayOfWeek.THURSDAY,
      5: DayOfWeek.FRIDAY,
      6: DayOfWeek.SATURDAY,
    };

    let totalSlotsCreated = 0;

    for (const doctor of doctors) {
      const blockedDateSet = new Set(
        doctor.blockedDates.map((b) => b.date.toISOString().split("T")[0])
      );

      for (let i = 0; i < daysAhead; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        date.setHours(0, 0, 0, 0);

        const dateStr = date.toISOString().split("T")[0];

        // Skip blocked dates
        if (blockedDateSet.has(dateStr)) continue;

        const dayOfWeek = dayOfWeekMap[date.getDay()];
        const templates = doctor.scheduleTemplates.filter(
          (t) => t.dayOfWeek === dayOfWeek
        );

        for (const template of templates) {
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

            // Create slot if not exists
            await prisma.timeSlot.upsert({
              where: {
                doctorId_date_startTime: {
                  doctorId: doctor.id,
                  date,
                  startTime: slotStartTime,
                },
              },
              update: {},
              create: {
                doctorId: doctor.id,
                date,
                startTime: slotStartTime,
                endTime: slotEndTime,
                isAvailable: true,
              },
            });

            totalSlotsCreated++;
            currentMin += template.slotDuration;
            if (currentMin >= 60) {
              currentHour += Math.floor(currentMin / 60);
              currentMin = currentMin % 60;
            }
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Generated/verified ${totalSlotsCreated} slots for ${doctors.length} doctors`,
      slotsProcessed: totalSlotsCreated,
      doctorsProcessed: doctors.length,
    });
  } catch (error) {
    console.error("Error generating slots:", error);
    return NextResponse.json(
      { error: "Failed to generate slots" },
      { status: 500 }
    );
  }
}
