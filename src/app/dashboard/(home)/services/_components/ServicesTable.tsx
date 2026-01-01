"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  dpAmount: number;
  duration: number;
  order: number;
  isActive: boolean;
  _count: { bookings: number };
}

interface ServicesTableProps {
  services: Service[];
}

export default function ServicesTable({ services }: ServicesTableProps) {
  const router = useRouter();
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggle = async (serviceId: string, currentActive: boolean) => {
    setTogglingId(serviceId);
    try {
      const response = await fetch(`/api/admin/services/${serviceId}`, {
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-750">
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Layanan
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Harga
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                DP
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Durasi
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Booking
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {services.map((service, index) => (
              <tr
                key={service.id}
                className={`hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${!service.isActive ? "opacity-50" : ""
                  }`}
              >
                <td className="py-4 px-6 text-sm text-gray-400">{index + 1}</td>
                <td className="py-4 px-6">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {service.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-xs">
                    {service.description}
                  </p>
                </td>
                <td className="py-4 px-6 text-sm text-gray-900 dark:text-white">
                  Rp {service.price.toLocaleString("id-ID")}
                </td>
                <td className="py-4 px-6 text-sm text-teal-600 dark:text-teal-400">
                  Rp {service.dpAmount.toLocaleString("id-ID")}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">
                  {service.duration} menit
                </td>
                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">
                  {service._count.bookings}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${service.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {service.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/services/edit/${service.id}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleToggle(service.id, service.isActive)}
                      disabled={togglingId === service.id}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${service.isActive
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                    >
                      {service.isActive ? "Off" : "On"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
