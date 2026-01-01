"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Doctor {
  id: string;
  name: string;
  speciality: string;
  bio: string | null;
  image: string | null;
  phone: string | null;
  isActive: boolean;
  _count: { bookings: number };
  scheduleTemplates: { dayOfWeek: string; startTime: string; endTime: string }[];
}

interface DoctorsTableProps {
  doctors: Doctor[];
}

const dayLabels: Record<string, string> = {
  MONDAY: "Sen",
  TUESDAY: "Sel",
  WEDNESDAY: "Rab",
  THURSDAY: "Kam",
  FRIDAY: "Jum",
  SATURDAY: "Sab",
  SUNDAY: "Min",
};

export default function DoctorsTable({ doctors }: DoctorsTableProps) {
  const router = useRouter();
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggle = async (doctorId: string, currentActive: boolean) => {
    setTogglingId(doctorId);
    try {
      const response = await fetch(`/api/admin/doctors/${doctorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentActive }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Gagal mengubah status");
      }
    } catch (error) {
      alert("Terjadi kesalahan");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className={`bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden ${!doctor.isActive ? "opacity-60" : ""
            }`}
        >
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-br from-teal-500 to-teal-600">
            {/* Status Badge */}
            <span
              className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full ${doctor.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
                }`}
            >
              {doctor.isActive ? "Aktif" : "Nonaktif"}
            </span>

            {/* Avatar */}
            <div className="absolute -bottom-10 left-6">
              <img
                src={doctor.image || "/placeholder-doctor.jpg"}
                alt={doctor.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white dark:border-gray-800"
              />
            </div>
          </div>

          {/* Content */}
          <div className="pt-12 p-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              {doctor.name}
            </h3>
            <p className="text-sm text-teal-600 dark:text-teal-400 mb-3">
              {doctor.speciality}
            </p>

            {/* Stats */}
            <div className="flex gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {doctor._count.bookings}
                </p>
                <p className="text-xs text-gray-500">Booking</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {doctor.scheduleTemplates.length}
                </p>
                <p className="text-xs text-gray-500">Jadwal</p>
              </div>
            </div>

            {/* Schedule Days */}
            <div className="flex gap-1 mb-4">
              {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map(
                (day) => {
                  const hasSchedule = doctor.scheduleTemplates.some((s) => s.dayOfWeek === day);
                  return (
                    <span
                      key={day}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${hasSchedule
                          ? "bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                        }`}
                    >
                      {dayLabels[day]}
                    </span>
                  );
                }
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link
                href={`/dashboard/doctors/edit/${doctor.id}`}
                className="flex-1 text-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl text-sm font-medium transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => handleToggle(doctor.id, doctor.isActive)}
                disabled={togglingId === doctor.id}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${doctor.isActive
                    ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100"
                    : "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100"
                  }`}
              >
                {doctor.isActive ? "Nonaktifkan" : "Aktifkan"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
