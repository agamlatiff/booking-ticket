import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getPatients(search?: string) {
  const where: any = { role: "PATIENT" };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search } },
    ];
  }

  return prisma.user.findMany({
    where,
    include: {
      _count: {
        select: { bookings: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

interface PatientsPageProps {
  searchParams: { search?: string };
}

export default async function PatientsPage({ searchParams }: PatientsPageProps) {
  const patients = await getPatients(searchParams.search);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Database Pasien</h1>
          <p className="text-gray-500 text-sm mt-1">
            {patients.length} pasien terdaftar
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
        <form className="flex gap-4">
          <input
            type="text"
            name="search"
            defaultValue={searchParams.search || ""}
            placeholder="Cari nama, email, atau nomor HP..."
            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors"
          >
            Cari
          </button>
        </form>
      </div>

      {/* Patients Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {patients.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-3">👥</div>
            <p className="text-gray-500">Tidak ada pasien ditemukan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-750">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Pasien
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    WhatsApp
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total Booking
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Bergabung
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {patients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {patient.image ? (
                          <img
                            src={patient.image}
                            alt={patient.name || ""}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                            <span className="text-teal-600 dark:text-teal-400 font-bold">
                              {patient.name?.charAt(0) || "P"}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {patient.name}
                          </p>
                          <p className="text-xs text-gray-500">{patient.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {patient.phone ? (
                        <a
                          href={`https://wa.me/${patient.phone.replace(/^0/, "62")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 dark:text-teal-400 hover:underline text-sm"
                        >
                          {patient.phone}
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {patient._count.bookings}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {new Date(patient.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-4 px-6">
                      <a
                        href={`/dashboard/bookings?search=${encodeURIComponent(patient.name || "")}`}
                        className="text-teal-600 dark:text-teal-400 hover:underline text-sm"
                      >
                        Lihat Booking →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
