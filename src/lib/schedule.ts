// Schedule generation helper functions
import { addDays, format, parse, addMinutes, isWeekend, startOfDay } from "date-fns";
import { id } from "date-fns/locale";
import prisma from "./prisma";
import { DayOfWeek } from "@prisma/client";

/**
 * Map JavaScript day (0-6) to Prisma DayOfWeek enum
 */
const dayMap: Record<number, DayOfWeek> = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY",
};

/**
 * Generate time slots for a doctor based on their schedule template
 * @param doctorId - Doctor ID
 * @param daysAhead - Number of days to generate (default: 14)
 */
export async function generateSlotsForDoctor(
  doctorId: string,
  daysAhead: number = 14
): Promise<number> {
  const doctor = await prisma.doctor.findUnique({
    where: { id: doctorId },
    include: {
      scheduleTemplates: { where: { isActive: true } },
      blockedDates: {
        where: {
          date: {
            gte: startOfDay(new Date()),
            lte: addDays(new Date(), daysAhead),
          },
        },
      },
    },
  });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const blockedDateStrings = doctor.blockedDates.map((bd) =>
    format(bd.date, "yyyy-MM-dd")
  );

  let slotsCreated = 0;
  const today = startOfDay(new Date());

  for (let i = 0; i < daysAhead; i++) {
    const date = addDays(today, i);
    const dateStr = format(date, "yyyy-MM-dd");
    const dayOfWeek = dayMap[date.getDay()];

    // Skip blocked dates
    if (blockedDateStrings.includes(dateStr)) continue;

    // Find schedule template for this day
    const template = doctor.scheduleTemplates.find(
      (t) => t.dayOfWeek === dayOfWeek
    );

    if (!template) continue;

    // Generate slots based on template
    let currentTime = parse(template.startTime, "HH:mm", date);
    const endTime = parse(template.endTime, "HH:mm", date);

    while (currentTime < endTime) {
      const startTimeStr = format(currentTime, "HH:mm");
      const endTimeStr = format(
        addMinutes(currentTime, template.slotDuration),
        "HH:mm"
      );

      // Create slot if doesn't exist
      await prisma.timeSlot.upsert({
        where: {
          doctorId_date_startTime: {
            doctorId: doctor.id,
            date: date,
            startTime: startTimeStr,
          },
        },
        update: {},
        create: {
          doctorId: doctor.id,
          date: date,
          startTime: startTimeStr,
          endTime: endTimeStr,
          isAvailable: true,
        },
      });

      slotsCreated++;
      currentTime = addMinutes(currentTime, template.slotDuration);
    }
  }

  return slotsCreated;
}

/**
 * Generate slots for all active doctors
 * @param daysAhead - Number of days to generate (default: 14)
 */
export async function generateSlotsForAllDoctors(
  daysAhead: number = 14
): Promise<{ doctorId: string; slotsCreated: number }[]> {
  const doctors = await prisma.doctor.findMany({
    where: { isActive: true },
    select: { id: true },
  });

  const results = [];

  for (const doctor of doctors) {
    const slotsCreated = await generateSlotsForDoctor(doctor.id, daysAhead);
    results.push({ doctorId: doctor.id, slotsCreated });
  }

  return results;
}

/**
 * Get formatted date string in Indonesian
 */
export function formatDateIndonesian(date: Date): string {
  return format(date, "EEEE, d MMMM yyyy", { locale: id });
}

/**
 * Get day name in Indonesian
 */
export function getDayNameIndonesian(dayOfWeek: DayOfWeek): string {
  const dayNames: Record<DayOfWeek, string> = {
    MONDAY: "Senin",
    TUESDAY: "Selasa",
    WEDNESDAY: "Rabu",
    THURSDAY: "Kamis",
    FRIDAY: "Jumat",
    SATURDAY: "Sabtu",
    SUNDAY: "Minggu",
  };
  return dayNames[dayOfWeek];
}
