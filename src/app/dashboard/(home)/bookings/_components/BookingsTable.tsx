"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  code: string;
  status: string;
  appointmentDate: string;
  appointmentTime: string;
  patientName: string;
  patientPhone: string;
  service: { name: string };
  doctor: { id: string; name: string; image: string | null };
}

interface BookingsTableProps {
  bookings: Booking[];
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-green-100 text-green-700",
  CHECKED_IN: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-teal-100 text-teal-700",
  CANCELLED: "bg-red-100 text-red-700",
  EXPIRED: "bg-gray-100 text-gray-700",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  PAID: "Dibayar",
  CHECKED_IN: "Check-In",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
  EXPIRED: "Expired",
};

const statusOptions = ["PENDING", "PAID", "CHECKED_IN", "COMPLETED", "CANCELLED"];

export default function BookingsTable({ bookings }: BookingsTableProps) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    setUpdatingId(bookingId);
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Gagal mengupdate status");
      }
    } catch (error) {
      alert("Terjadi kesalahan");
    } finally {
      setUpdatingId(null);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-700">
        <div className="text-4xl mb-3">📭</div>
        <p className="text-gray-500">Tidak ada booking ditemukan</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-750">
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Kode
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Pasien
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Layanan
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Dokter
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Jadwal
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <td className="py-4 px-6">
                  <span className="font-mono text-sm text-teal-600 dark:text-teal-400">
                    {booking.code}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {booking.patientName}
                  </p>
                  <p className="text-xs text-gray-500">{booking.patientPhone}</p>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">
                  {booking.service.name}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={booking.doctor.image || "/placeholder-doctor.jpg"}
                      alt={booking.doctor.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {booking.doctor.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {new Date(booking.appointmentDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-gray-500">{booking.appointmentTime}</p>
                </td>
                <td className="py-4 px-6">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    disabled={updatingId === booking.id}
                    className={`text-xs font-medium px-2 py-1 rounded-full border-none cursor-pointer ${statusColors[booking.status]} ${updatingId === booking.id ? "opacity-50" : ""
                      }`}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {statusLabels[status]}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
