import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getSchedule(date?: string, doctorId?: string) {
  const targetDate = date ? new Date(date) : new Date();
  targetDate.setHours(0, 0, 0, 0);

  const endDate = new Date(targetDate);
  endDate.setHours(23, 59, 59, 999);

  const where: any = {
    appointmentDate: {
      gte: targetDate,
      lte: endDate,
    },
  };

  if (doctorId) {
    where.doctorId = doctorId;
  }

  const [bookings, doctors] = await Promise.all([
    prisma.booking.findMany({
      where,
      include: {
        service: { select: { name: true, duration: true } },
        doctor: { select: { id: true, name: true, image: true } },
      },
      orderBy: { appointmentTime: "asc" },
    }),
    prisma.doctor.findMany({
      where: { isActive: true },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return { bookings, doctors, targetDate };
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 border-yellow-300 text-yellow-800",
  PAID: "bg-green-100 border-green-300 text-green-800",
  CHECKED_IN: "bg-blue-100 border-blue-300 text-blue-800",
  COMPLETED: "bg-teal-100 border-teal-300 text-teal-800",
  CANCELLED: "bg-red-100 border-red-300 text-red-800",
  EXPIRED: "bg-gray-100 border-gray-300 text-gray-600",
};

interface SchedulePageProps {
  searchParams: { date?: string; doctor?: string };
}

export default async function SchedulePage({ searchParams }: SchedulePageProps) {
  const { bookings, doctors, targetDate } = await getSchedule(
    searchParams.date,
    searchParams.doctor
  );

  // Time slots from 08:00 to 20:00
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = 8 + i;
    return `${String(hour).padStart(2, "0")}:00`;
  });

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Jadwal Klinik</h1>
          <p className="text-gray-500 text-sm mt-1">{formatDate(targetDate)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
        <form className="flex flex-wrap gap-4">
          <input
            type="date"
            name="date"
            defaultValue={searchParams.date || targetDate.toISOString().split("T")[0]}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
          />
          <select
            name="doctor"
            defaultValue={searchParams.doctor || ""}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
          >
            <option value="">Semua Dokter</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors"
          >
            Filter
          </button>
        </form>
      </div>

      {/* Schedule Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {bookings.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">📅</div>
            <p className="text-gray-500">Tidak ada jadwal untuk tanggal ini</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {timeSlots.map((time) => {
              const slotBookings = bookings.filter((b) => b.appointmentTime === time);

              return (
                <div key={time} className="flex">
                  {/* Time Label */}
                  <div className="w-20 flex-shrink-0 py-4 px-4 text-sm font-medium text-gray-500 border-r border-gray-100 dark:border-gray-700">
                    {time}
                  </div>

                  {/* Bookings */}
                  <div className="flex-1 py-3 px-4 min-h-[60px]">
                    {slotBookings.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {slotBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className={`px-3 py-2 rounded-lg border-l-4 ${statusColors[booking.status]}`}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={booking.doctor.image || "/placeholder-doctor.jpg"}
                                alt={booking.doctor.name}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <div>
                                <p className="text-sm font-medium">{booking.patientName}</p>
                                <p className="text-xs opacity-75">
                                  {booking.service.name} • {booking.doctor.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center">
                        <span className="text-xs text-gray-300 dark:text-gray-600">-</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
