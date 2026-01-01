import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getDoctorData(doctorEmail: string) {
  // Get doctor by user email
  const doctor = await prisma.doctor.findFirst({
    where: {
      // Match by email or name - assuming doctor records are linked
      OR: [
        { phone: { not: null } },
      ],
    },
  });

  if (!doctor) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const [todayBookings, upcomingBookings, totalPatients, completedCount] = await Promise.all([
    // Today's appointments
    prisma.booking.findMany({
      where: {
        doctorId: doctor.id,
        appointmentDate: { gte: today, lt: tomorrow },
        status: { in: ["PAID", "CHECKED_IN", "COMPLETED"] },
      },
      include: {
        service: { select: { name: true, duration: true } },
      },
      orderBy: { appointmentTime: "asc" },
    }),

    // Upcoming (next 7 days)
    prisma.booking.findMany({
      where: {
        doctorId: doctor.id,
        appointmentDate: { gte: tomorrow, lt: nextWeek },
        status: { in: ["PAID", "CHECKED_IN"] },
      },
      include: {
        service: { select: { name: true } },
      },
      orderBy: [{ appointmentDate: "asc" }, { appointmentTime: "asc" }],
      take: 5,
    }),

    // Total unique patients
    prisma.booking.groupBy({
      by: ["patientId"],
      where: { doctorId: doctor.id },
    }),

    // Completed this month
    prisma.booking.count({
      where: {
        doctorId: doctor.id,
        status: "COMPLETED",
        appointmentDate: {
          gte: new Date(today.getFullYear(), today.getMonth(), 1),
        },
      },
    }),
  ]);

  return {
    doctor,
    todayBookings,
    upcomingBookings,
    totalPatients: totalPatients.length,
    completedCount,
  };
}

const statusColors: Record<string, string> = {
  PAID: "bg-green-100 text-green-700",
  CHECKED_IN: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-teal-100 text-teal-700",
};

const statusLabels: Record<string, string> = {
  PAID: "Dibayar",
  CHECKED_IN: "Check-In",
  COMPLETED: "Selesai",
};

export default async function DoctorDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const data = await getDoctorData(session.user.email || "");

  if (!data) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">⚠️</div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Akun Dokter Tidak Ditemukan
        </h1>
        <p className="text-gray-500">Hubungi admin untuk menghubungkan akun Anda.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Selamat Datang, {data.doctor.name}
        </h1>
        <p className="text-gray-500 text-sm mt-1">{data.doctor.speciality}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl">📅</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {data.todayBookings.length}
          </p>
          <p className="text-sm text-gray-500">Janji Hari Ini</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {data.completedCount}
          </p>
          <p className="text-sm text-gray-500">Selesai Bulan Ini</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl">👥</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {data.totalPatients}
          </p>
          <p className="text-sm text-gray-500">Total Pasien</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl">⏰</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {data.upcomingBookings.length}
          </p>
          <p className="text-sm text-gray-500">Minggu Ini</p>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">Jadwal Hari Ini</h2>
          <Link href="/doctor/schedule" className="text-sm text-blue-600 hover:underline">
            Lihat Semua →
          </Link>
        </div>

        {data.todayBookings.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <p className="text-gray-500">Tidak ada janji untuk hari ini</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {data.todayBookings.map((booking) => (
              <div key={booking.id} className="p-4 flex items-center gap-4">
                <div className="w-16 text-center">
                  <p className="font-bold text-lg text-gray-900 dark:text-white">
                    {booking.appointmentTime}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {booking.patientName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.service.name} • {booking.service.duration} menit
                  </p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[booking.status]}`}>
                  {statusLabels[booking.status]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Appointments */}
      {data.upcomingBookings.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">Janji Mendatang</h2>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {data.upcomingBookings.map((booking) => (
              <div key={booking.id} className="p-4 flex items-center gap-4">
                <div className="w-24 text-center">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(booking.appointmentDate).toLocaleDateString("id-ID", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                  <p className="text-xs text-gray-500">{booking.appointmentTime}</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {booking.patientName}
                  </p>
                  <p className="text-sm text-gray-500">{booking.service.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
