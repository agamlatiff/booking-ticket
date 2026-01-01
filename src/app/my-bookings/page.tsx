import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getBookings(userId: string) {
  return prisma.booking.findMany({
    where: { patientId: userId },
    include: {
      service: { select: { name: true, slug: true, duration: true } },
      doctor: { select: { name: true, speciality: true, image: true } },
    },
    orderBy: { appointmentDate: "desc" },
  });
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  PAID: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  CHECKED_IN: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  COMPLETED: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  EXPIRED: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400",
};

const statusLabels: Record<string, string> = {
  PENDING: "Menunggu Pembayaran",
  PAID: "Sudah Dibayar",
  CHECKED_IN: "Check-In",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
  EXPIRED: "Kadaluarsa",
};

export default async function MyBookingsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in?callbackUrl=/my-bookings");
  }

  const bookings = await getBookings(session.user.id);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Booking Saya
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Riwayat dan jadwal perawatan gigi Anda
              </p>
            </div>
            <Link
              href="/booking"
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
            >
              + Booking Baru
            </Link>
          </div>

          {/* Bookings List */}
          {bookings.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm">
              <div className="text-5xl mb-4">🦷</div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Belum Ada Booking
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Anda belum memiliki jadwal perawatan gigi
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Booking Sekarang
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left: Booking Info */}
                    <div className="flex items-start gap-4">
                      <img
                        src={booking.doctor.image || "/placeholder-doctor.jpg"}
                        alt={booking.doctor.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[booking.status]}`}
                          >
                            {statusLabels[booking.status]}
                          </span>
                          <span className="text-xs text-gray-400">
                            #{booking.code}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {booking.service.name}
                        </h3>
                        <p className="text-sm text-teal-600 dark:text-teal-400">
                          {booking.doctor.name} - {booking.doctor.speciality}
                        </p>
                      </div>
                    </div>

                    {/* Right: Date & Time */}
                    <div className="text-left md:text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {new Date(booking.appointmentDate).toLocaleDateString("id-ID", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-gray-500">
                        Jam {booking.appointmentTime}
                      </p>
                      <p className="text-sm text-teal-600 dark:text-teal-400 font-medium mt-1">
                        Rp {booking.totalAmount.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  {booking.status === "PENDING" && (
                    <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <Link
                        href={`/checkout/${booking.id}`}
                        className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-center py-2.5 rounded-xl font-medium transition-colors"
                      >
                        Bayar Sekarang
                      </Link>
                      <button className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                        Batalkan
                      </button>
                    </div>
                  )}

                  {booking.status === "PAID" && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 px-4 py-3 rounded-xl text-sm">
                        ✅ Pembayaran DP diterima. Silakan datang sesuai jadwal.
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
