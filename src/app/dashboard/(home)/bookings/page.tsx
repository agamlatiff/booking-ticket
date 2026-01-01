import prisma from "@/lib/prisma";
import Link from "next/link";
import BookingsTable from "./_components/BookingsTable";

export const dynamic = "force-dynamic";

interface BookingsPageProps {
  searchParams: {
    status?: string;
    doctor?: string;
    date?: string;
    search?: string;
    page?: string;
  };
}

async function getBookings(params: BookingsPageProps["searchParams"]) {
  const { status, doctor, date, search, page = "1" } = params;
  const limit = 20;
  const offset = (parseInt(page) - 1) * limit;

  const where: any = {};

  if (status && status !== "all") {
    where.status = status;
  }

  if (doctor) {
    where.doctorId = doctor;
  }

  if (date) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    where.appointmentDate = {
      gte: startDate,
      lte: endDate,
    };
  }

  if (search) {
    where.OR = [
      { patientName: { contains: search, mode: "insensitive" } },
      { code: { contains: search, mode: "insensitive" } },
      { patientPhone: { contains: search } },
    ];
  }

  const [bookings, total, doctors] = await Promise.all([
    prisma.booking.findMany({
      where,
      include: {
        service: { select: { name: true } },
        doctor: { select: { id: true, name: true, image: true } },
      },
      orderBy: [{ appointmentDate: "desc" }, { appointmentTime: "desc" }],
      skip: offset,
      take: limit,
    }),
    prisma.booking.count({ where }),
    prisma.doctor.findMany({
      where: { isActive: true },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return { bookings, total, doctors, limit };
}

export default async function BookingsPage({ searchParams }: BookingsPageProps) {
  const { bookings, total, doctors, limit } = await getBookings(searchParams);
  const currentPage = parseInt(searchParams.page || "1");
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manajemen Booking</h1>
          <p className="text-gray-500 text-sm mt-1">
            Total {total} booking
          </p>
        </div>
        <Link
          href="/booking"
          target="_blank"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-medium transition-colors"
        >
          + Booking Baru
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
        <form className="flex flex-wrap gap-4">
          {/* Status Filter */}
          <select
            name="status"
            defaultValue={searchParams.status || "all"}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
          >
            <option value="all">Semua Status</option>
            <option value="PENDING">Pending</option>
            <option value="PAID">Dibayar</option>
            <option value="CHECKED_IN">Check-In</option>
            <option value="COMPLETED">Selesai</option>
            <option value="CANCELLED">Dibatalkan</option>
            <option value="EXPIRED">Expired</option>
          </select>

          {/* Doctor Filter */}
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

          {/* Date Filter */}
          <input
            type="date"
            name="date"
            defaultValue={searchParams.date || ""}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
          />

          {/* Search */}
          <input
            type="text"
            name="search"
            defaultValue={searchParams.search || ""}
            placeholder="Cari nama/kode..."
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm flex-1 min-w-[200px]"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-gray-900 dark:bg-gray-600 text-white rounded-xl text-sm font-medium"
          >
            Filter
          </button>
        </form>
      </div>

      {/* Table */}
      <BookingsTable bookings={bookings} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={{
                pathname: "/dashboard/bookings",
                query: { ...searchParams, page },
              }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-colors ${page === currentPage
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
            >
              {page}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
