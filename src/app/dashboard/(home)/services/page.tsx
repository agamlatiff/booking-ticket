import prisma from "@/lib/prisma";
import Link from "next/link";
import ServicesTable from "./_components/ServicesTable";

export const dynamic = "force-dynamic";

async function getServices() {
  return prisma.service.findMany({
    include: {
      _count: {
        select: { bookings: true },
      },
    },
    orderBy: { order: "asc" },
  });
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Layanan</h1>
          <p className="text-gray-500 text-sm mt-1">
            {services.length} layanan tersedia
          </p>
        </div>
        <Link
          href="/dashboard/services/create"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          + Tambah Layanan
        </Link>
      </div>

      {/* Services Table */}
      <ServicesTable services={services} />
    </div>
  );
}
