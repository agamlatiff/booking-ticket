import prisma from "@/lib/prisma";
import Link from "next/link";
import DoctorsTable from "./_components/DoctorsTable";

export const dynamic = "force-dynamic";

async function getDoctors() {
  return prisma.doctor.findMany({
    include: {
      _count: {
        select: { bookings: true },
      },
      scheduleTemplates: {
        where: { isActive: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Dokter</h1>
          <p className="text-gray-500 text-sm mt-1">
            {doctors.length} dokter terdaftar
          </p>
        </div>
        <Link
          href="/dashboard/doctors/create"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          + Tambah Dokter
        </Link>
      </div>

      {/* Doctors Grid */}
      <DoctorsTable doctors={doctors} />
    </div>
  );
}
