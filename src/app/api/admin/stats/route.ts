import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { successResponse, internalError } from "@/lib/api/response";
import { withAdmin } from "@/lib/api/middleware";

// ============================================
// GET /api/admin/stats - Admin dashboard stats
// ============================================

export const GET = withAdmin(async (request: NextRequest) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    // Parallel queries for better performance
    const [
      todayBookings,
      pendingPayment,
      todayRevenue,
      monthRevenue,
      lastMonthRevenue,
      totalPatients,
      bookingsByStatus,
      topServices,
      topDoctors,
    ] = await Promise.all([
      // Today's bookings
      prisma.booking.count({
        where: {
          appointmentDate: { gte: today, lt: tomorrow },
          status: { in: ["PAID", "CHECKED_IN", "COMPLETED"] },
        },
      }),

      // Pending payment count
      prisma.booking.count({
        where: { status: "PENDING" },
      }),

      // Today's DP revenue
      prisma.booking.aggregate({
        where: {
          paidAt: { gte: today, lt: tomorrow },
          status: { in: ["PAID", "CHECKED_IN", "COMPLETED"] },
        },
        _sum: { dpPaid: true },
      }),

      // This month's revenue
      prisma.booking.aggregate({
        where: {
          paidAt: { gte: startOfMonth, lte: endOfMonth },
          status: { in: ["PAID", "CHECKED_IN", "COMPLETED"] },
        },
        _sum: { dpPaid: true },
      }),

      // Last month's revenue (for comparison)
      prisma.booking.aggregate({
        where: {
          paidAt: { gte: lastMonthStart, lte: lastMonthEnd },
          status: { in: ["PAID", "CHECKED_IN", "COMPLETED"] },
        },
        _sum: { dpPaid: true },
      }),

      // Total registered patients
      prisma.user.count({
        where: { role: "PATIENT" },
      }),

      // Bookings by status
      prisma.booking.groupBy({
        by: ["status"],
        _count: { id: true },
      }),

      // Top services this month
      prisma.booking.groupBy({
        by: ["serviceId"],
        where: {
          appointmentDate: { gte: startOfMonth, lte: endOfMonth },
          status: { in: ["PAID", "CHECKED_IN", "COMPLETED"] },
        },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 5,
      }),

      // Top doctors this month
      prisma.booking.groupBy({
        by: ["doctorId"],
        where: {
          appointmentDate: { gte: startOfMonth, lte: endOfMonth },
          status: { in: ["PAID", "CHECKED_IN", "COMPLETED"] },
        },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 5,
      }),
    ]);

    // Get service and doctor names for top charts
    const serviceIds = topServices.map((s) => s.serviceId);
    const doctorIds = topDoctors.map((d) => d.doctorId);

    const [services, doctors] = await Promise.all([
      prisma.service.findMany({
        where: { id: { in: serviceIds } },
        select: { id: true, name: true },
      }),
      prisma.doctor.findMany({
        where: { id: { in: doctorIds } },
        select: { id: true, name: true },
      }),
    ]);

    const serviceMap = new Map(services.map((s) => [s.id, s.name]));
    const doctorMap = new Map(doctors.map((d) => [d.id, d.name]));

    return successResponse({
      overview: {
        todayBookings,
        pendingPayment,
        todayRevenue: todayRevenue._sum.dpPaid || 0,
        totalPatients,
      },
      revenue: {
        thisMonth: monthRevenue._sum.dpPaid || 0,
        lastMonth: lastMonthRevenue._sum.dpPaid || 0,
        growth:
          lastMonthRevenue._sum.dpPaid && lastMonthRevenue._sum.dpPaid > 0
            ? (((monthRevenue._sum.dpPaid || 0) - lastMonthRevenue._sum.dpPaid) /
              lastMonthRevenue._sum.dpPaid) *
            100
            : 0,
      },
      bookingsByStatus: bookingsByStatus.map((b) => ({
        status: b.status,
        count: b._count.id,
      })),
      topServices: topServices.map((s) => ({
        serviceId: s.serviceId,
        serviceName: serviceMap.get(s.serviceId) || "Unknown",
        count: s._count.id,
      })),
      topDoctors: topDoctors.map((d) => ({
        doctorId: d.doctorId,
        doctorName: doctorMap.get(d.doctorId) || "Unknown",
        count: d._count.id,
      })),
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return internalError("Gagal mengambil statistik");
  }
});

export const dynamic = "force-dynamic";
