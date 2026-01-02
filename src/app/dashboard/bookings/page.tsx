"use client";

import { useState } from "react";
import { AdminLayout, AdminHeader } from "@/components/ui/admin-layout";

const bookings = [
  { id: "#BK-2023-001", name: "Budi Santoso", initials: "BS", color: "accent-yellow", service: "Scaling Gigi", icon: "medical_services", iconColor: "secondary", doctor: "drg. Siti Aminah", date: "24 Okt 2023", time: "09:00 - 10:00", status: "Confirmed", statusColor: "green" },
  { id: "#BK-2023-002", name: "Anisa Rahma", initials: "AR", color: "accent-purple", service: "Kontrol Behel", icon: "grid_on", iconColor: "accent-purple", doctor: "drg. Budi Santoso", date: "24 Okt 2023", time: "10:30 - 11:00", status: "Check-In", statusColor: "blue" },
  { id: "#BK-2023-003", name: "Michael Tan", initials: "MT", color: "secondary", service: "Tambal Gigi", icon: "healing", iconColor: "secondary", doctor: "drg. Siti Aminah", date: "24 Okt 2023", time: "13:00 - 14:00", status: "Pending", statusColor: "yellow" },
  { id: "#BK-2023-004", name: "Siti Nurhaliza", initials: "SN", color: "primary", service: "Bleaching", icon: "auto_awesome", iconColor: "primary", doctor: "drg. Budi Santoso", date: "24 Okt 2023", time: "14:45 - 15:45", status: "Confirmed", statusColor: "green" },
  { id: "#BK-2023-005", name: "Rina Wati", initials: "RW", color: "red", service: "Cabut Gigi", icon: "dentistry", iconColor: "red", doctor: "drg. Siti Aminah", date: "25 Okt 2023", time: "10:00 - 10:30", status: "Cancelled", statusColor: "red" },
];

export default function AdminBookingsPage() {
  const [search, setSearch] = useState("");

  return (
    <AdminLayout>
      <AdminHeader
        title="Bookings Management"
        subtitle="Kelola janji temu dan jadwal pasien dengan mudah."
        emoji="📅"
        actions={
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-bold text-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            <span className="material-symbols-outlined text-sm">add</span>
            Booking Baru
          </button>
        }
      />
      <div className="p-6 md:p-10 flex flex-col gap-8 h-auto min-h-full">
        {/* Filters */}
        <div className="rounded-[2rem] border-2 border-foreground bg-white p-6 shadow-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Search</label>
                <div className="relative">
                  <input
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2.5 pl-10 text-sm font-semibold hover:border-foreground focus:border-foreground focus:bg-white focus:outline-none focus:ring-0 placeholder:text-gray-400"
                    placeholder="ID or Patient Name"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Doctor</label>
                <select className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold hover:border-foreground focus:border-foreground focus:bg-white focus:outline-none focus:ring-0">
                  <option value="">All Doctors</option>
                  <option value="1">drg. Siti Aminah</option>
                  <option value="2">drg. Budi Santoso</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Service Type</label>
                <select className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold hover:border-foreground focus:border-foreground focus:bg-white focus:outline-none focus:ring-0">
                  <option value="">All Services</option>
                  <option value="scaling">Scaling</option>
                  <option value="filling">Tambal Gigi</option>
                  <option value="ortho">Orthodontic</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Status</label>
                <select className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold hover:border-foreground focus:border-foreground focus:bg-white focus:outline-none focus:ring-0">
                  <option value="">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Date Range</label>
                <div className="relative">
                  <input className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-2.5 pl-10 text-sm font-semibold hover:border-foreground focus:border-foreground focus:bg-white focus:outline-none focus:ring-0 placeholder:text-gray-400" type="date" />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">calendar_today</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-bold whitespace-nowrap h-[46px] border-2 border-foreground bg-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <span className="material-symbols-outlined text-sm">refresh</span>
                Reset
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl bg-accent-yellow px-5 py-2.5 font-bold text-foreground whitespace-nowrap h-[46px] border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 flex flex-col rounded-[2.5rem] border-2 border-foreground bg-white p-8 shadow-card overflow-hidden min-h-[500px]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-foreground">All Bookings</h2>
              <p className="text-sm font-medium text-gray-500">Showing 1-{bookings.length} of {bookings.length} bookings</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold border-2 border-foreground bg-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <span className="material-symbols-outlined text-sm">download</span>
                Export CSV
              </button>
              <button className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold border-2 border-foreground bg-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <span className="material-symbols-outlined text-sm">print</span>
                Print
              </button>
            </div>
          </div>
          <div className="w-full overflow-x-auto pb-4 flex-1">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="py-4 px-4 text-xs font-extrabold uppercase tracking-wider text-gray-500">ID Booking</th>
                  <th className="py-4 px-4 text-xs font-extrabold uppercase tracking-wider text-gray-500">Nama Pasien</th>
                  <th className="py-4 px-4 text-xs font-extrabold uppercase tracking-wider text-gray-500">Layanan</th>
                  <th className="py-4 px-4 text-xs font-extrabold uppercase tracking-wider text-gray-500">Dokter</th>
                  <th className="py-4 px-4 text-xs font-extrabold uppercase tracking-wider text-gray-500">Tanggal & Jam</th>
                  <th className="py-4 px-4 text-xs font-extrabold uppercase tracking-wider text-gray-500">Status</th>
                  <th className="py-4 px-4 text-xs font-extrabold uppercase tracking-wider text-gray-500 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm font-semibold text-foreground">
                {bookings.map((b) => (
                  <tr key={b.id} className="group border-b border-gray-100 hover:bg-background transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-gray-600">{b.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full border border-foreground flex items-center justify-center ${b.color === "accent-yellow" ? "bg-accent-yellow" : b.color === "accent-purple" ? "bg-accent-purple" : b.color === "secondary" ? "bg-secondary text-white" : b.color === "primary" ? "bg-primary text-white" : "bg-red-400 text-white"}`}>
                          <span className="text-xs font-black">{b.initials}</span>
                        </div>
                        <span>{b.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-sm ${b.iconColor === "secondary" ? "text-secondary" : b.iconColor === "accent-purple" ? "text-accent-purple" : b.iconColor === "primary" ? "text-primary" : "text-red-500"}`}>{b.icon}</span>
                        {b.service}
                      </div>
                    </td>
                    <td className="py-4 px-4">{b.doctor}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span>{b.date}</span>
                        <span className="text-xs text-gray-500">{b.time}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`rounded-full border px-3 py-1 text-xs font-bold ${b.statusColor === "green" ? "border-green-200 bg-green-100 text-green-700" : b.statusColor === "blue" ? "border-blue-200 bg-blue-100 text-blue-700" : b.statusColor === "yellow" ? "border-yellow-200 bg-yellow-100 text-yellow-800" : "border-red-200 bg-red-100 text-red-700"}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-transparent hover:border-foreground hover:bg-white text-gray-600 hover:text-blue-600">
                          <span className="material-symbols-outlined text-[1.2rem]">visibility</span>
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-transparent hover:border-foreground hover:bg-white text-gray-600 hover:text-orange-500">
                          <span className="material-symbols-outlined text-[1.2rem]">edit</span>
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-transparent hover:border-foreground hover:bg-white text-gray-600 hover:text-red-500">
                          <span className="material-symbols-outlined text-[1.2rem]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t-2 border-gray-100 pt-6 sm:flex-row">
            <p className="text-sm font-bold text-gray-500">Showing page 1 of 12</p>
            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-transparent text-gray-600 hover:border-foreground hover:bg-white disabled:opacity-50">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-foreground bg-accent-yellow text-foreground font-bold shadow-[2px_2px_0px_0px_#111817]">1</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-transparent text-gray-600 hover:border-foreground hover:bg-white font-bold">2</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-transparent text-gray-600 hover:border-foreground hover:bg-white font-bold">3</button>
              <span className="text-gray-400 font-bold">...</span>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-transparent text-gray-600 hover:border-foreground hover:bg-white font-bold">12</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-transparent text-gray-600 hover:border-foreground hover:bg-white">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
