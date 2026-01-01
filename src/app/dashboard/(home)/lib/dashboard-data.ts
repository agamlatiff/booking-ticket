import prisma from "@/lib/prisma";

// Get dashboard stats for dental clinic
export async function getDashboardStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [
    todayBookings,
    pendingBookings,
    monthlyRevenue,
    totalPatients,
    completedToday,
  ] = await Promise.all([
    // Today's bookings
    prisma.booking.count({
      where: {
        appointmentDate: {
          gte: today,
          lt: tomorrow,
        },
        status: { in: ["PAID", "CHECKED_IN"] },
      },
    }),

    // Pending payments
    prisma.booking.count({
      where: { status: "PENDING" },
    }),

    // Monthly DP revenue
    prisma.booking.aggregate({
      _sum: { dpPaid: true },
      where: {
        paidAt: { gte: startOfMonth },
        status: { in: ["PAID", "CHECKED_IN", "COMPLETED"] },
      },
    }),

    // Total unique patients
    prisma.user.count({
      where: { role: "PATIENT" },
    }),

    // Completed today
    prisma.booking.count({
      where: {
        appointmentDate: {
          gte: today,
          lt: tomorrow,
        },
        status: "COMPLETED",
      },
    }),
  ]);

  return {
    todayBookings,
    pendingBookings,
    monthlyRevenue: monthlyRevenue._sum.dpPaid || 0,
    totalPatients,
    completedToday,
  };
}

// Get recent bookings
export async function getRecentBookings(limit: number = 10) {
  return prisma.booking.findMany({
    include: {
      service: { select: { name: true } },
      doctor: { select: { name: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

// Get today's schedule
export async function getTodaySchedule() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return prisma.booking.findMany({
    where: {
      appointmentDate: {
        gte: today,
        lt: tomorrow,
      },
      status: { in: ["PAID", "CHECKED_IN", "COMPLETED"] },
    },
    include: {
      service: { select: { name: true, duration: true } },
      doctor: { select: { name: true, image: true } },
    },
    orderBy: { appointmentTime: "asc" },
  });
}

// Get bookings by status for chart
export async function getBookingsByStatus() {
  const results = await prisma.booking.groupBy({
    by: ["status"],
    _count: true,
  });

  return results.map((r) => ({
    status: r.status,
    count: r._count,
  }));
}

// Get revenue by date for chart
export async function getRevenueByDate(days: number = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  const bookings = await prisma.booking.findMany({
    where: {
      paidAt: { gte: startDate },
      status: { in: ["PAID", "CHECKED_IN", "COMPLETED"] },
    },
    select: {
      paidAt: true,
      dpPaid: true,
    },
  });

  // Group by date
  const revenueByDate: Record<string, number> = {};

  bookings.forEach((booking) => {
    if (booking.paidAt) {
      const dateStr = booking.paidAt.toISOString().split("T")[0];
      revenueByDate[dateStr] = (revenueByDate[dateStr] || 0) + (booking.dpPaid || 0);
    }
  });

  return Object.entries(revenueByDate).map(([date, revenue]) => ({
    date,
    revenue,
  }));
}
