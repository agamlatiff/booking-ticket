import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  validationError,
  notFound,
  internalError,
} from "@/lib/api/response";
import { withDoctor } from "@/lib/api/middleware";
import { z } from "zod";

const querySchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

// ============================================
// GET /api/doctor/schedule - Doctor's schedule
// ============================================

export const GET = withDoctor(async (request, { session }) => {
  try {
    const { searchParams } = new URL(request.url);

    const parsed = querySchema.safeParse({
      startDate: searchParams.get("startDate"),
      endDate: searchParams.get("endDate"),
    });

    if (!parsed.success) {
      return validationError("Parameter tanggal tidak valid");
    }

    // Get doctor profile
    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
      select: { id: true, name: true },
    });

    if (!doctor) {
      return notFound("Profil dokter");
    }

    // Default to current week if no dates provided
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let startDate: Date;
    let endDate: Date;

    if (parsed.data.startDate && parsed.data.endDate) {
      startDate = new Date(parsed.data.startDate);
      endDate = new Date(parsed.data.endDate);
    } else {
      // Default: current week (Monday to Sunday)
      const dayOfWeek = today.getDay();
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      startDate = new Date(today);
      startDate.setDate(today.getDate() + mondayOffset);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
    }

    // Get slots with bookings
    const slots = await prisma.timeSlot.findMany({
      where: {
        doctorId: doctor.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        booking: {
          select: {
            id: true,
            code: true,
            patientName: true,
            patientPhone: true,
            status: true,
            service: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
    });

    // Group by date
    const groupedByDate = slots.reduce((acc, slot) => {
      const dateStr = slot.date.toISOString().split("T")[0];
      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push({
        id: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
        isAvailable: slot.isAvailable,
        booking: slot.booking
          ? {
            id: slot.booking.id,
            code: slot.booking.code,
            patientName: slot.booking.patientName,
            patientPhone: slot.booking.patientPhone,
            status: slot.booking.status,
            serviceName: slot.booking.service.name,
          }
          : null,
      });
      return acc;
    }, {} as Record<string, Array<{
      id: string;
      startTime: string;
      endTime: string;
      isAvailable: boolean;
      booking: {
        id: string;
        code: string;
        patientName: string;
        patientPhone: string;
        status: string;
        serviceName: string;
      } | null;
    }>>);

    // Convert to array
    const schedule = Object.entries(groupedByDate).map(([date, slots]) => ({
      date,
      slots,
    }));

    return successResponse({
      doctorId: doctor.id,
      doctorName: doctor.name,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      schedule,
    });
  } catch (error) {
    console.error("Error fetching doctor schedule:", error);
    return internalError("Gagal mengambil jadwal");
  }
});
