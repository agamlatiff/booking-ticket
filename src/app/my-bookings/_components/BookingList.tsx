"use client";

import { useState } from "react";
import Link from "next/link";

interface Booking {
  id: string;
  code: string;
  status: string;
  appointmentDate: string;
  appointmentTime: string;
  patientName: string;
  totalAmount: number;
  dpPaid: number | null;
  dpAmount: number;
  service: { name: string; slug: string; duration: number };
  doctor: { name: string; speciality: string; image: string | null };
}

interface BookingListProps {
  bookings: Booking[];
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

const filterOptions = [
  { value: "all", label: "Semua" },
  { value: "PENDING", label: "Pending" },
  { value: "PAID", label: "Dibayar" },
  { value: "COMPLETED", label: "Selesai" },
  { value: "CANCELLED", label: "Dibatalkan" },
];

export default function BookingList({ bookings }: BookingListProps) {
  const [filter, setFilter] = useState("all");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const filteredBookings =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const canCancel = (booking: Booking) => {
    if (!["PENDING", "PAID"].includes(booking.status)) return false;

    // Check 24-hour rule for PAID bookings
    if (booking.status === "PAID") {
      const appointmentDateTime = new Date(booking.appointmentDate);
      const [hours, minutes] = booking.appointmentTime.split(":").map(Number);
      appointmentDateTime.setHours(hours, minutes, 0, 0);

      const hoursUntilAppointment =
        (appointmentDateTime.getTime() - Date.now()) / (1000 * 60 * 60);

      return hoursUntilAppointment >= 24;
    }

    return true;
  };

  const handleCancel = async (bookingId: string) => {
    if (!confirm("Yakin ingin membatalkan booking ini?")) return;

    setCancellingId(bookingId);
    try {
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: "PUT",
      });

      if (response.ok) {
        window.location.reload();
      } else {
        const data = await response.json();
        alert(data.error || "Gagal membatalkan booking");
      }
    } catch (error) {
      alert("Terjadi kesalahan");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === option.value
                ? "bg-teal-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Booking Cards */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-sm">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Tidak Ada Booking
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {filter === "all"
              ? "Anda belum memiliki booking"
              : `Tidak ada booking dengan status "${statusLabels[filter] || filter}"`}
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
          {filteredBookings.map((booking) => (
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
                      <span className="text-xs text-gray-400">#{booking.code}</span>
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
                  <p className="text-sm text-gray-500">Jam {booking.appointmentTime}</p>
                  <p className="text-sm text-teal-600 dark:text-teal-400 font-medium mt-1">
                    Rp {booking.totalAmount.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Actions */}
              {booking.status === "PENDING" && (
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <Link
                    href={`/booking/success?code=${booking.code}`}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-center py-2.5 rounded-xl font-medium transition-colors"
                  >
                    Bayar Sekarang
                  </Link>
                  {canCancel(booking) && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      disabled={cancellingId === booking.id}
                      className="px-4 py-2.5 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                    >
                      {cancellingId === booking.id ? "..." : "Batalkan"}
                    </button>
                  )}
                </div>
              )}

              {booking.status === "PAID" && (
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <Link
                    href={`/booking/success?code=${booking.code}`}
                    className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-center py-2.5 rounded-xl font-medium transition-colors"
                  >
                    Lihat E-Ticket
                  </Link>
                  {canCancel(booking) && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      disabled={cancellingId === booking.id}
                      className="px-4 py-2.5 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                    >
                      {cancellingId === booking.id ? "..." : "Batalkan"}
                    </button>
                  )}
                </div>
              )}

              {booking.status === "COMPLETED" && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 px-4 py-3 rounded-xl text-sm">
                    ✅ Perawatan selesai. Terima kasih telah berkunjung!
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
