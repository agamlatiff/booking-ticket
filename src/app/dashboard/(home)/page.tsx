import Link from "next/link";
import { getDashboardStats, getRecentBookings, getTodaySchedule } from "./lib/dashboard-data";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-green-100 text-green-700",
  CHECKED_IN: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-teal-100 text-teal-700",
  CANCELLED: "bg-red-100 text-red-700",
  EXPIRED: "bg-gray-100 text-gray-700",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  PAID: "Dibayar",
  CHECKED_IN: "Check-In",
  COMPLETED: "Selesai",
  CANCELLED: "Batal",
  EXPIRED: "Expired",
};

export default async function DashboardPage() {
  const [stats, recentBookings, todaySchedule] = await Promise.all([
    getDashboardStats(),
    getRecentBookings(5),
    getTodaySchedule(),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Selamat datang! Berikut ringkasan hari ini.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/bookings"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors"
          >
            + Booking Baru
          </Link>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Today's Bookings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
            <span className="text-xs bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 px-2 py-1 rounded-full">
              Hari Ini
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.todayBookings}</p>
          <p className="text-sm text-gray-500 mt-1">Booking Hari Ini</p>
        </div>

        {/* Pending Payments */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
            {stats.pendingBookings > 0 && (
              <span className="text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full animate-pulse">
                Perlu Aksi
              </span>
            )}
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.pendingBookings}</p>
          <p className="text-sm text-gray-500 mt-1">Menunggu Pembayaran</p>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <span className="text-xs text-gray-400">Bulan Ini</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            Rp {(stats.monthlyRevenue / 1000000).toFixed(1)}jt
          </p>
          <p className="text-sm text-gray-500 mt-1">DP Revenue</p>
        </div>

        {/* Total Patients */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalPatients}</p>
          <p className="text-sm text-gray-500 mt-1">Total Pasien</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Jadwal Hari Ini</h2>
            <Link
              href="/dashboard/schedule"
              className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

          {todaySchedule.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-gray-500">Tidak ada jadwal hari ini</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {todaySchedule.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  {/* Time */}
                  <div className="w-16 text-center">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {booking.appointmentTime}
                    </p>
                  </div>

                  {/* Doctor */}
                  <img
                    src={booking.doctor.image || "/placeholder-doctor.jpg"}
                    alt={booking.doctor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {booking.patientName}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {booking.service.name} • {booking.doctor.name}
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[booking.status]}`}
                  >
                    {statusLabels[booking.status]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Booking Terbaru</h2>
            <Link
              href="/dashboard/bookings"
              className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {booking.patientName}
                  </p>
                  <span
                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusColors[booking.status]}`}
                  >
                    {statusLabels[booking.status]}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {booking.service.name}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  #{booking.code}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/dashboard/bookings?status=PENDING"
          className="bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 p-4 rounded-xl text-center transition-colors"
        >
          <span className="text-2xl">⏳</span>
          <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300 mt-2">
            Pending ({stats.pendingBookings})
          </p>
        </Link>

        <Link
          href="/dashboard/doctors"
          className="bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/30 p-4 rounded-xl text-center transition-colors"
        >
          <span className="text-2xl">👨‍⚕️</span>
          <p className="text-sm font-medium text-teal-700 dark:text-teal-300 mt-2">Kelola Dokter</p>
        </Link>

        <Link
          href="/dashboard/services"
          className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 p-4 rounded-xl text-center transition-colors"
        >
          <span className="text-2xl">🦷</span>
          <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mt-2">Kelola Layanan</p>
        </Link>

        <Link
          href="/dashboard/reports"
          className="bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 p-4 rounded-xl text-center transition-colors"
        >
          <span className="text-2xl">📊</span>
          <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mt-2">Laporan</p>
        </Link>
      </div>
    </div>
  );
}
