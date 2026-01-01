import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getDoctorPatients(doctorEmail: string, search?: string) {
  const doctor = await prisma.doctor.findFirst({
    where: { isActive: true },
  });

  if (!doctor) return null;

  // Get all bookings for this doctor grouped by patient
  const bookings = await prisma.booking.findMany({
    where: {
      doctorId: doctor.id,
      ...(search
        ? {
          OR: [
            { patientName: { contains: search, mode: "insensitive" } },
            { patientPhone: { contains: search } },
          ],
        }
        : {}),
    },
    include: {
      service: { select: { name: true } },
      patient: {
        select: { id: true, name: true, email: true, image: true },
      },
    },
    orderBy: { appointmentDate: "desc" },
  });

  // Group by patient
  const patientsMap = new Map<
    string,
    {
      id: string;
      name: string;
      phone: string;
      email: string | null;
      image: string | null;
      bookings: typeof bookings;
      lastVisit: Date;
    }
  >();

  bookings.forEach((booking) => {
    const key = booking.patientId;
    if (!patientsMap.has(key)) {
      patientsMap.set(key, {
        id: booking.patientId,
        name: booking.patientName,
        phone: booking.patientPhone,
        email: booking.patient?.email || null,
        image: booking.patient?.image || null,
        bookings: [],
        lastVisit: booking.appointmentDate,
      });
    }
    patientsMap.get(key)!.bookings.push(booking);
  });

  return {
    doctor,
    patients: Array.from(patientsMap.values()).sort(
      (a, b) => b.lastVisit.getTime() - a.lastVisit.getTime()
    ),
  };
}

export default async function DoctorPatientsPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const data = await getDoctorPatients(session.user.email || "", searchParams.search);

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Akun dokter tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pasien Saya</h1>
        <p className="text-gray-500 text-sm mt-1">
          {data.patients.length} pasien yang pernah ditangani
        </p>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
        <form className="flex gap-4">
          <input
            type="text"
            name="search"
            defaultValue={searchParams.search || ""}
            placeholder="Cari nama atau nomor HP..."
            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium"
          >
            Cari
          </button>
        </form>
      </div>

      {/* Patients List */}
      {data.patients.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-700">
          <div className="text-4xl mb-3">👥</div>
          <p className="text-gray-500">Belum ada pasien</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.patients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Patient Header */}
              <div className="p-4 flex items-center gap-4 border-b border-gray-100 dark:border-gray-700">
                {patient.image ? (
                  <img
                    src={patient.image}
                    alt={patient.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                      {patient.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">{patient.name}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <a
                      href={`https://wa.me/${patient.phone.replace(/^0/, "62")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {patient.phone}
                    </a>
                    {patient.email && <span>• {patient.email}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {patient.bookings.length}
                  </p>
                  <p className="text-xs text-gray-500">kunjungan</p>
                </div>
              </div>

              {/* Booking History */}
              <div className="p-4 bg-gray-50 dark:bg-gray-750">
                <p className="text-xs text-gray-500 mb-2">Riwayat Kunjungan</p>
                <div className="flex flex-wrap gap-2">
                  {patient.bookings.slice(0, 5).map((booking) => (
                    <span
                      key={booking.id}
                      className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded-lg"
                    >
                      {new Date(booking.appointmentDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "2-digit",
                      })}{" "}
                      - {booking.service.name}
                    </span>
                  ))}
                  {patient.bookings.length > 5 && (
                    <span className="text-xs text-gray-400">
                      +{patient.bookings.length - 5} lagi
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
