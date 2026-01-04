import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, notFound, internalError } from "@/lib/api/response";
import { withDoctor } from "@/lib/api/middleware";

// ============================================
// GET /api/doctor/stats - Doctor dashboard stats
// ============================================

export const GET = withDoctor(async (request, { session }) => {
  try {
    // Get doctor profile from user
    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!doctor) {
      return notFound("Profil dokter");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Get today's appointments
    const todayCount = await prisma.booking.count({
      where: {
        doctorId: doctor.id,
        appointmentDate: {
          gte: today,
          lt: tomorrow,
        },
        status: { in: ["PAID", "CHECKED_IN"] },
      },
    });

    // Get pending appointments (next 7 days)
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const pendingCount = await prisma.booking.count({
      where: {
        doctorId: doctor.id,
        appointmentDate: {
          gte: today,
          lte: nextWeek,
        },
        status: { in: ["PAID", "CHECKED_IN"] },
      },
    });

    // Get completed this month
    const completedThisMonth = await prisma.booking.count({
      where: {
        doctorId: doctor.id,
        appointmentDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        status: "COMPLETED",
      },
    });

    // Get total unique patients
    const totalPatients = await prisma.booking.groupBy({
      by: ["patientId"],
      where: {
        doctorId: doctor.id,
        status: { in: ["COMPLETED", "CHECKED_IN", "PAID"] },
      },
    });

    // Get this month's revenue (DP collected)
    const revenueResult = await prisma.booking.aggregate({
      where: {
        doctorId: doctor.id,
        appointmentDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        status: { in: ["PAID", "CHECKED_IN", "COMPLETED"] },
      },
      _sum: {
        dpPaid: true,
      },
    });

    return successResponse({
      todayCount,
      pendingCount,
      completedThisMonth,
      totalPatients: totalPatients.length,
      monthlyRevenue: revenueResult._sum.dpPaid || 0,
    });
  } catch (error) {
    console.error("Error fetching doctor stats:", error);
    return internalError("Gagal mengambil statistik");
  }
});
