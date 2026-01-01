import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getDoctorSchedule(doctorEmail: string, date?: string) {
  const doctor = await prisma.doctor.findFirst({
    where: { isActive: true },
  });

  if (!doctor) return null;

  const targetDate = date ? new Date(date) : new Date();
  targetDate.setHours(0, 0, 0, 0);

  // Get 7 days starting from target date
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(targetDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  const endDate = new Date(dates[6]);
  endDate.setHours(23, 59, 59, 999);

  const bookings = await prisma.booking.findMany({
    where: {
      doctorId: doctor.id,
      appointmentDate: {
        gte: targetDate,
        lte: endDate,
      },
      status: { in: ["PAID", "CHECKED_IN", "COMPLETED"] },
    },
    include: {
      service: { select: { name: true, duration: true } },
    },
    orderBy: [{ appointmentDate: "asc" }, { appointmentTime: "asc" }],
  });

  return { doctor, dates, bookings };
}

const statusColors: Record<string, string> = {
  PAID: "bg-green-100 border-l-green-500",
  CHECKED_IN: "bg-blue-100 border-l-blue-500",
  COMPLETED: "bg-teal-100 border-l-teal-500",
};

export default async function DoctorSchedulePage({
  searchParams,
}: {
  searchParams: { date?: string };
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const data = await getDoctorSchedule(session.user.email || "", searchParams.date);

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Akun dokter tidak ditemukan</p>
      </div>
    );
  }

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 8 + i;
    return `${String(hour).padStart(2, "0")}:00`;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Jadwal Saya</h1>
          <p className="text-gray-500 text-sm mt-1">
            {data.dates[0].toLocaleDateString("id-ID", { month: "long", year: "numeric" })}
          </p>
        </div>
        <form className="flex gap-2">
          <input
            type="date"
            name="date"
            defaultValue={searchParams.date || new Date().toISOString().split("T")[0]}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium"
          >
            Lihat
          </button>
        </form>
      </div>

      {/* Weekly Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-8 border-b border-gray-100 dark:border-gray-700">
          <div className="p-3 text-center text-xs text-gray-400 font-medium">Jam</div>
          {data.dates.map((date, i) => {
            const isToday = date.toDateString() === new Date().toDateString();
            return (
              <div
                key={i}
                className={`p-3 text-center ${isToday ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
              >
                <p className="text-xs text-gray-500">
                  {date.toLocaleDateString("id-ID", { weekday: "short" })}
                </p>
                <p className={`text-lg font-bold ${isToday ? "text-blue-600" : "text-gray-900 dark:text-white"}`}>
                  {date.getDate()}
                </p>
              </div>
            );
          })}
        </div>

        {/* Time Grid */}
        {timeSlots.map((time) => (
          <div key={time} className="grid grid-cols-8 border-b border-gray-50 dark:border-gray-750">
            <div className="p-2 text-center text-xs text-gray-400 bg-gray-50 dark:bg-gray-750">
              {time}
            </div>
            {data.dates.map((date, i) => {
              const dateStr = date.toISOString().split("T")[0];
              const booking = data.bookings.find(
                (b) =>
                  new Date(b.appointmentDate).toISOString().split("T")[0] === dateStr &&
                  b.appointmentTime === time
              );

              return (
                <div key={i} className="p-1 min-h-[60px] border-l border-gray-50 dark:border-gray-750">
                  {booking && (
                    <div
                      className={`p-2 rounded-lg border-l-4 text-xs ${statusColors[booking.status]}`}
                    >
                      <p className="font-medium text-gray-900 truncate">{booking.patientName}</p>
                      <p className="text-gray-500 truncate">{booking.service.name}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span className="text-gray-500">Dibayar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span className="text-gray-500">Check-In</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-teal-500" />
          <span className="text-gray-500">Selesai</span>
        </div>
      </div>
    </div>
  );
}
