import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {
  successResponse,
  validationError,
  internalError,
} from "@/lib/api/response";
import { withAdmin } from "@/lib/api/middleware";
import { z } from "zod";

const querySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  doctorId: z.string().optional(),
});

// ============================================
// GET /api/admin/schedule - All doctors schedule
// ============================================

export const GET = withAdmin(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);

    const parsed = querySchema.safeParse({
      date: searchParams.get("date"),
      startDate: searchParams.get("startDate"),
      endDate: searchParams.get("endDate"),
      doctorId: searchParams.get("doctorId"),
    });

    if (!parsed.success) {
      return validationError("Parameter tidak valid");
    }

    const { date, startDate, endDate, doctorId } = parsed.data;

    // Determine date range
    let queryStartDate: Date;
    let queryEndDate: Date;

    if (date) {
      queryStartDate = new Date(date);
      queryEndDate = new Date(date);
    } else if (startDate && endDate) {
      queryStartDate = new Date(startDate);
      queryEndDate = new Date(endDate);
    } else {
      // Default: today
      queryStartDate = new Date();
      queryStartDate.setHours(0, 0, 0, 0);
      queryEndDate = new Date(queryStartDate);
    }

    // Build doctor filter
    const doctorFilter = doctorId ? { id: doctorId } : { isActive: true };

    // Get all active doctors
    const doctors = await prisma.doctor.findMany({
      where: doctorFilter,
      select: {
        id: true,
        name: true,
        speciality: true,
        image: true,
      },
      orderBy: { name: "asc" },
    });

    // Get all slots with bookings for the date range
    const slots = await prisma.timeSlot.findMany({
      where: {
        doctorId: { in: doctors.map((d) => d.id) },
        date: {
          gte: queryStartDate,
          lte: queryEndDate,
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
            service: { select: { name: true } },
          },
        },
      },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
    });

    // Group slots by doctor
    const scheduleByDoctor = doctors.map((doctor) => {
      const doctorSlots = slots.filter((s) => s.doctorId === doctor.id);

      // Group by date
      const slotsByDate = doctorSlots.reduce((acc, slot) => {
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

      return {
        doctor: {
          id: doctor.id,
          name: doctor.name,
          speciality: doctor.speciality,
          image: doctor.image,
        },
        schedule: Object.entries(slotsByDate).map(([date, slots]) => ({
          date,
          slots,
          stats: {
            total: slots.length,
            available: slots.filter((s) => s.isAvailable).length,
            booked: slots.filter((s) => !s.isAvailable).length,
          },
        })),
      };
    });

    // Calculate overall stats
    const totalSlots = slots.length;
    const availableSlots = slots.filter((s) => s.isAvailable).length;
    const bookedSlots = slots.filter((s) => !s.isAvailable).length;

    return successResponse({
      dateRange: {
        start: queryStartDate.toISOString().split("T")[0],
        end: queryEndDate.toISOString().split("T")[0],
      },
      stats: {
        totalSlots,
        availableSlots,
        bookedSlots,
        occupancyRate: totalSlots > 0 ? (bookedSlots / totalSlots) * 100 : 0,
      },
      doctors: scheduleByDoctor,
    });
  } catch (error) {
    console.error("Error fetching admin schedule:", error);
    return internalError("Gagal mengambil jadwal");
  }
});

export const dynamic = "force-dynamic";
