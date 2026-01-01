import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface SuccessPageProps {
  searchParams: { code?: string };
}

async function getBooking(code: string, userId: string) {
  return prisma.booking.findFirst({
    where: {
      code,
      patientId: userId,
    },
    include: {
      service: true,
      doctor: true,
    },
  });
}

export default async function BookingSuccessPage({ searchParams }: SuccessPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const code = searchParams.code;
  if (!code) {
    redirect("/my-bookings");
  }

  const booking = await getBooking(code, session.user.id);
  if (!booking) {
    redirect("/my-bookings");
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
              ✅
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Booking Berhasil!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Silakan screenshot halaman ini untuk referensi
            </p>
          </div>

          {/* E-Ticket Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-6">
            {/* Header */}
            <div className="bg-teal-600 text-white p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">🦷</span>
                <span className="font-bold text-lg">Klinik Gigi Senyum Sejahtera</span>
              </div>
              <p className="text-teal-100 text-sm">E-Ticket Booking</p>
            </div>

            {/* QR Code Section */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 text-center">
              <div className="bg-white p-4 rounded-xl inline-block mb-3">
                {/* Simple QR Code using an API */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`DENTAL:${booking.code}`)}`}
                  alt="QR Code"
                  className="w-36 h-36"
                />
              </div>
              <p className="font-mono text-2xl font-bold text-gray-900 dark:text-white">
                {booking.code}
              </p>
              <p className="text-sm text-gray-500">Tunjukkan QR code ini saat check-in</p>
            </div>

            {/* Booking Details */}
            <div className="p-6 space-y-4">
              {/* Service */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center text-xl">
                  🦷
                </div>
                <div>
                  <p className="text-sm text-gray-500">Layanan</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {booking.service.name}
                  </p>
                </div>
              </div>

              {/* Doctor */}
              <div className="flex items-start gap-4">
                <img
                  src={booking.doctor.image || "/placeholder-doctor.jpg"}
                  alt={booking.doctor.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm text-gray-500">Dokter</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {booking.doctor.name}
                  </p>
                  <p className="text-sm text-teal-600 dark:text-teal-400">
                    {booking.doctor.speciality}
                  </p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center text-xl">
                  📅
                </div>
                <div>
                  <p className="text-sm text-gray-500">Jadwal</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatDate(booking.appointmentDate)}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Jam {booking.appointmentTime}
                  </p>
                </div>
              </div>

              {/* Patient */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nama Pasien</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {booking.patientName}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">{booking.patientPhone}</p>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-gray-50 dark:bg-gray-750 p-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">Total Biaya</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Rp {booking.service.price.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500">DP (Sudah Dibayar)</span>
                <span className="text-teal-600 dark:text-teal-400">
                  Rp {(booking.dpPaid || booking.dpAmount).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Sisa Bayar di Klinik
                </span>
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  Rp {(booking.service.price - (booking.dpPaid || booking.dpAmount)).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Clinic Address */}
            <div className="p-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center text-xl">
                  📍
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">
                    Alamat Klinik
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Jl. Kesehatan No. 123<br />
                    Jakarta Selatan, 12345
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 dark:text-teal-400 text-sm font-medium mt-2 inline-block"
                  >
                    Lihat di Google Maps →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Reminder */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              <strong>⚠️ Pengingat:</strong> Mohon datang 15 menit sebelum jadwal.
              Pembatalan dapat dilakukan maksimal 24 jam sebelum jadwal.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/my-bookings"
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-center py-3 rounded-xl font-medium transition-colors"
            >
              Lihat Semua Booking
            </Link>
            <Link
              href="/"
              className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-center py-3 rounded-xl font-medium transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
