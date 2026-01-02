"use client";

import { AdminLayout, AdminHeader } from "@/components/ui/admin-layout";
import Link from "next/link";

const stats = [
  { label: "Janji Temu Hari Ini", value: "24", icon: "calendar_today", color: "accent-yellow", change: "+12%" },
  { label: "Pendapatan Hari Ini", value: "Rp 8.5jt", icon: "payments", color: "primary", change: "+8%" },
  { label: "Pasien Baru", value: "5", icon: "person_add", color: "accent-purple", change: "+3" },
  { label: "Rating Klinik", value: "4.9", icon: "star", color: "secondary", change: "Tetap" },
];

const todaySchedule = [
  { time: "09:00", name: "Budi Santoso", service: "Scaling Gigi", icon: "medical_services", iconColor: "secondary", status: "Confirmed", statusColor: "green" },
  { time: "10:30", name: "Anisa Rahma", service: "Kontrol Behel", icon: "grid_on", iconColor: "accent-purple", status: "Check-In", statusColor: "blue", active: true },
  { time: "13:00", name: "Michael Tan", service: "Tambal Gigi", icon: "healing", iconColor: "secondary", status: "Pending", statusColor: "yellow" },
  { time: "14:45", name: "Siti Nurhaliza", service: "Bleaching", icon: "auto_awesome", iconColor: "primary", status: "Confirmed", statusColor: "green" },
];

const recentBookings = [
  { name: "Rina Wati", service: "Cabut Gigi", date: "Besok 10:00", time: "Baru saja", color: "accent-yellow" },
  { name: "Dimas A.", service: "Konsultasi", date: "26 Okt", time: "15m lalu", color: "secondary" },
  { name: "Sarah J.", service: "Scaling", date: "27 Okt", time: "1j lalu", color: "accent-purple" },
];

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <AdminHeader
        title="Halo, Dokter Siti!"
        subtitle="Semangat untuk senyum pasien hari ini!"
        emoji="👋"
        actions={
          <div className="relative hidden md:block">
            <input
              className="h-11 w-64 rounded-full border-2 border-foreground bg-white px-4 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_#111817] focus:border-primary focus:outline-none focus:ring-0"
              placeholder="Cari pasien..."
              type="text"
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          </div>
        }
      />
      <div className="p-6 md:p-10">
        {/* Stats Cards */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="group relative overflow-hidden rounded-[2rem] border-2 border-foreground bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-pop">
              <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-xl ${stat.color === "accent-yellow" ? "bg-accent-yellow/30" : stat.color === "primary" ? "bg-primary/20" : stat.color === "accent-purple" ? "bg-accent-purple/30" : "bg-secondary/20"}`}></div>
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 border-foreground ${stat.color === "accent-yellow" ? "bg-accent-yellow text-foreground" : stat.color === "primary" ? "bg-primary text-white" : stat.color === "accent-purple" ? "bg-accent-purple text-foreground" : "bg-secondary text-white"}`}>
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <span className={`rounded-lg px-2 py-1 text-xs font-bold ${stat.change === "Tetap" ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-700"}`}>{stat.change}</span>
              </div>
              <h3 className="text-3xl font-black text-foreground">{stat.value}</h3>
              <p className="text-sm font-bold text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Today Schedule */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="flex flex-col rounded-[2.5rem] border-2 border-foreground bg-white p-8 shadow-card">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-foreground">Jadwal Hari Ini</h2>
                  <p className="text-sm font-medium text-gray-500">Selasa, 24 Oktober 2023</p>
                </div>
                <Link href="/dashboard/schedule" className="flex items-center gap-2 rounded-xl border-2 border-foreground bg-white px-4 py-2 text-xs font-bold shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <span className="material-symbols-outlined text-sm">calendar_view_day</span>
                  Lihat Semua
                </Link>
              </div>
              <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2">
                {todaySchedule.map((item) => (
                  <div key={item.time} className={`group flex items-center gap-4 rounded-2xl border-2 p-4 transition-colors ${item.active ? "border-foreground bg-primary/5 shadow-[2px_2px_0px_0px_#111817]" : "border-gray-100 bg-white hover:border-foreground hover:bg-background"}`}>
                    <div className={`flex w-16 flex-col items-center justify-center rounded-xl p-2 text-center ${item.active ? "bg-primary text-white border-2 border-foreground" : "bg-accent-yellow/20 text-foreground"}`}>
                      <span className="text-xs font-bold">JAM</span>
                      <span className="text-lg font-black">{item.time}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-foreground">{item.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className={`material-symbols-outlined text-sm text-${item.iconColor}`}>{item.icon}</span>
                        {item.service}
                      </div>
                    </div>
                    <span className={`hidden rounded-full border px-3 py-1 text-xs font-bold sm:inline-block ${item.statusColor === "green" ? "border-green-200 bg-green-100 text-green-700" : item.statusColor === "blue" ? "border-blue-200 bg-blue-100 text-blue-700" : "border-yellow-200 bg-yellow-100 text-yellow-800"}`}>
                      {item.status}
                    </span>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg border-2 hover:bg-gray-50">
                      <span className="material-symbols-outlined text-sm">more_vert</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            {/* Quick Actions */}
            <div className="rounded-[2rem] border-2 border-foreground bg-accent-purple/10 p-6 shadow-card">
              <h3 className="mb-4 text-xl font-black text-foreground">Aksi Cepat ⚡</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/dashboard/bookings" className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <span className="material-symbols-outlined">add</span>
                  Booking Baru
                </Link>
                <Link href="/dashboard/patients" className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white p-3 py-4 text-xs font-bold border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <span className="material-symbols-outlined text-secondary text-2xl">person_add</span>
                  Pasien Baru
                </Link>
                <button className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white p-3 py-4 text-xs font-bold border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <span className="material-symbols-outlined text-accent-purple text-2xl">receipt_long</span>
                  Tagihan
                </button>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="flex-1 rounded-[2rem] border-2 border-foreground bg-white p-6 shadow-card">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-black text-foreground">Recent Bookings</h3>
                <Link href="/dashboard/bookings" className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground hover:bg-gray-100">
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.name} className="flex items-center gap-3 border-b border-dashed border-gray-200 pb-3 last:border-0 last:pb-0">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-foreground ${booking.color === "accent-yellow" ? "bg-accent-yellow" : booking.color === "secondary" ? "bg-secondary text-white" : "bg-accent-purple text-foreground"}`}>
                      <span className="material-symbols-outlined text-sm">person</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-foreground">{booking.name}</p>
                      <p className="text-xs text-gray-500">{booking.service} • {booking.date}</p>
                    </div>
                    <span className={`text-xs font-bold ${booking.time === "Baru saja" ? "text-primary" : "text-gray-400"}`}>{booking.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
