import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getReportsData() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const [
    thisMonthRevenue,
    lastMonthRevenue,
    bookingsByService,
    bookingsByDoctor,
    bookingsByStatus,
    totalBookings,
    completedBookings,
  ] = await Promise.all([
    // This month revenue
    prisma.booking.aggregate({
      _sum: { dpPaid: true },
      where: {
        paidAt: { gte: startOfMonth },
        status: { in: ["PAID", "CHECKED_IN", "COMPLETED"] },
      },
    }),

    // Last month revenue
    prisma.booking.aggregate({
      _sum: { dpPaid: true },
      where: {
        paidAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        status: { in: ["PAID", "CHECKED_IN", "COMPLETED"] },
      },
    }),

    // Bookings by service
    prisma.booking.groupBy({
      by: ["serviceId"],
      _count: true,
      where: { createdAt: { gte: startOfMonth } },
    }),

    // Bookings by doctor
    prisma.booking.groupBy({
      by: ["doctorId"],
      _count: true,
      where: { createdAt: { gte: startOfMonth } },
    }),

    // Bookings by status
    prisma.booking.groupBy({
      by: ["status"],
      _count: true,
    }),

    // Total bookings
    prisma.booking.count(),

    // Completed bookings
    prisma.booking.count({ where: { status: "COMPLETED" } }),
  ]);

  // Get service names
  const serviceIds = bookingsByService.map((b) => b.serviceId);
  const services = await prisma.service.findMany({
    where: { id: { in: serviceIds } },
    select: { id: true, name: true },
  });

  // Get doctor names
  const doctorIds = bookingsByDoctor.map((b) => b.doctorId);
  const doctors = await prisma.doctor.findMany({
    where: { id: { in: doctorIds } },
    select: { id: true, name: true },
  });

  return {
    thisMonthRevenue: thisMonthRevenue._sum.dpPaid || 0,
    lastMonthRevenue: lastMonthRevenue._sum.dpPaid || 0,
    bookingsByService: bookingsByService.map((b) => ({
      name: services.find((s) => s.id === b.serviceId)?.name || "Unknown",
      count: b._count,
    })),
    bookingsByDoctor: bookingsByDoctor.map((b) => ({
      name: doctors.find((d) => d.id === b.doctorId)?.name || "Unknown",
      count: b._count,
    })),
    bookingsByStatus,
    totalBookings,
    completedBookings,
  };
}

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  PAID: "Dibayar",
  CHECKED_IN: "Check-In",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
  EXPIRED: "Expired",
};

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500",
  PAID: "bg-green-500",
  CHECKED_IN: "bg-blue-500",
  COMPLETED: "bg-teal-500",
  CANCELLED: "bg-red-500",
  EXPIRED: "bg-gray-500",
};

export default async function ReportsPage() {
  const data = await getReportsData();

  const revenueGrowth =
    data.lastMonthRevenue > 0
      ? ((data.thisMonthRevenue - data.lastMonthRevenue) / data.lastMonthRevenue) * 100
      : 0;

  const completionRate =
    data.totalBookings > 0
      ? ((data.completedBookings / data.totalBookings) * 100).toFixed(1)
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Laporan</h1>
        <p className="text-gray-500 text-sm mt-1">Statistik dan analisis klinik</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-1">Revenue Bulan Ini</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            Rp {(data.thisMonthRevenue / 1000000).toFixed(1)}jt
          </p>
          <p
            className={`text-sm mt-2 ${revenueGrowth >= 0 ? "text-green-600" : "text-red-600"
              }`}
          >
            {revenueGrowth >= 0 ? "↑" : "↓"} {Math.abs(revenueGrowth).toFixed(1)}% dari bulan lalu
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-1">Total Booking</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.totalBookings}
          </p>
          <p className="text-sm text-gray-400 mt-2">Semua waktu</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-1">Booking Selesai</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.completedBookings}
          </p>
          <p className="text-sm text-teal-600 mt-2">{completionRate}% completion rate</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-1">Layanan Aktif</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {data.bookingsByService.length}
          </p>
          <p className="text-sm text-gray-400 mt-2">Dengan booking bulan ini</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings by Service */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">
            Booking per Layanan (Bulan Ini)
          </h3>
          <div className="space-y-3">
            {data.bookingsByService
              .sort((a, b) => b.count - a.count)
              .map((item, i) => {
                const maxCount = Math.max(...data.bookingsByService.map((s) => s.count));
                const percentage = (item.count / maxCount) * 100;

                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.count}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Bookings by Doctor */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">
            Booking per Dokter (Bulan Ini)
          </h3>
          <div className="space-y-3">
            {data.bookingsByDoctor
              .sort((a, b) => b.count - a.count)
              .map((item, i) => {
                const maxCount = Math.max(...data.bookingsByDoctor.map((d) => d.count));
                const percentage = (item.count / maxCount) * 100;

                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.count}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Status Booking</h3>
        <div className="flex flex-wrap gap-4">
          {data.bookingsByStatus.map((item) => (
            <div
              key={item.status}
              className="flex items-center gap-3 bg-gray-50 dark:bg-gray-750 px-4 py-3 rounded-xl"
            >
              <div className={`w-3 h-3 rounded-full ${statusColors[item.status]}`} />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {item._count}
                </p>
                <p className="text-xs text-gray-500">{statusLabels[item.status]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
