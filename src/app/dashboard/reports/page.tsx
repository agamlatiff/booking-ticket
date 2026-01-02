"use client";

import { AdminLayout, AdminHeader } from "@/components/ui/admin-layout";

const kpiStats = [
  { label: "Total Pendapatan", value: "Rp 45.2jt", icon: "payments", color: "primary", change: "▲ 12%", changeColor: "green" },
  { label: "Total Pasien", value: "128", icon: "group", color: "secondary", change: "▲ 5%", changeColor: "green" },
  { label: "Avg. Rating", value: "4.92", icon: "star", color: "accent-yellow", change: "Tetap", changeColor: "gray" },
];

const revenueData = [
  { day: "Sen", value: "Rp 4.2jt", height: "40%", color: "accent-purple" },
  { day: "Sel", value: "Rp 7.8jt", height: "65%", color: "secondary" },
  { day: "Rab", value: "Rp 5.5jt", height: "50%", color: "accent-yellow" },
  { day: "Kam", value: "Rp 9.2jt", height: "80%", color: "primary" },
  { day: "Jum", value: "Rp 6.8jt", height: "60%", color: "accent-purple" },
  { day: "Sab", value: "Rp 10.5jt", height: "90%", color: "secondary" },
  { day: "Min", value: "Rp 2.1jt", height: "30%", color: "gray-200" },
];

const popularServices = [
  { name: "Scaling Gigi", icon: "cleaning_services", color: "primary", percent: 45 },
  { name: "Tambal Gigi", icon: "healing", color: "secondary", percent: 25 },
  { name: "Bleaching", icon: "auto_awesome", color: "accent-yellow", percent: 20 },
  { name: "Behel (Braces)", icon: "grid_on", color: "accent-purple", percent: 10 },
];

const doctorPerformance = [
  { name: "drg. Siti Aminah", specialty: "Top Performer 🏆", patients: 42, isTop: true, hasImage: true },
  { name: "drg. Budi Santoso", specialty: "Spesialis Konservasi", patients: 35, isTop: false, hasImage: false },
  { name: "drg. Rina Wati", specialty: "Dokter Umum", patients: 28, isTop: false, hasImage: false },
];

export default function AdminReportsPage() {
  return (
    <AdminLayout>
      <AdminHeader
        title="📊 Laporan & Statistik"
        subtitle="Analisa performa klinik minggu ini"
        actions={
          <button className="flex items-center gap-2 h-11 rounded-full border-2 border-foreground bg-white px-4 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_#111817] hover:bg-gray-50">
            <span className="material-symbols-outlined text-gray-600">calendar_today</span>
            16 Okt - 22 Okt 2023
            <span className="material-symbols-outlined text-gray-400 text-sm ml-2">expand_more</span>
          </button>
        }
      />
      <div className="p-6 md:p-10 space-y-8">
        {/* KPI Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {kpiStats.map((stat) => (
            <div key={stat.label} className="group relative overflow-hidden rounded-[2rem] border-2 border-foreground bg-white p-6 shadow-card hover:shadow-pop transition-all">
              <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-xl ${stat.color === "primary" ? "bg-primary/20" : stat.color === "secondary" ? "bg-secondary/20" : "bg-accent-yellow/40"}`}></div>
              <div className="mb-2 flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 border-foreground ${stat.color === "primary" ? "bg-primary text-white" : stat.color === "secondary" ? "bg-secondary text-white" : "bg-accent-yellow text-foreground"}`}>
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">{stat.label}</h3>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-black text-foreground">{stat.value}</h2>
                <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${stat.changeColor === "green" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="rounded-[2.5rem] border-2 border-foreground bg-white p-8 shadow-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 relative z-10 gap-4">
            <div>
              <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">analytics</span>
                Grafik Pendapatan
              </h2>
              <p className="text-sm text-gray-500 font-medium">Visualisasi pendapatan harian minggu ini</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-xl text-sm font-bold text-foreground border-2 border-foreground bg-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Harian</button>
              <button className="px-4 py-2 rounded-xl border-2 border-transparent hover:bg-gray-100 text-sm font-bold text-gray-500">Bulanan</button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 w-full relative z-10">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="w-full border-t-2 border-foreground border-dashed"></div>
              <div className="w-full border-t-2 border-foreground border-dashed"></div>
              <div className="w-full border-t-2 border-foreground border-dashed"></div>
              <div className="w-full border-t-2 border-foreground border-dashed"></div>
            </div>
            {revenueData.map((item) => (
              <div key={item.day} className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
                <div className={`relative w-full max-w-[60px] rounded-t-2xl border-2 border-foreground border-b-0 transition-all duration-300 group-hover:opacity-90 shadow-[2px_0px_0px_0px_rgba(0,0,0,0.1)] ${item.color === "primary" ? "bg-primary" : item.color === "secondary" ? "bg-secondary" : item.color === "accent-yellow" ? "bg-accent-yellow" : item.color === "accent-purple" ? "bg-accent-purple" : "bg-gray-200"}`} style={{ height: item.height }}>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-white text-xs font-bold py-1 px-2 rounded-lg transition-opacity whitespace-nowrap z-20">{item.value}</div>
                </div>
                <span className="mt-3 text-xs font-bold text-gray-500 group-hover:text-foreground">{item.day}</span>
              </div>
            ))}
          </div>
          <div className="w-full border-t-2 border-foreground"></div>
        </div>

        {/* Popular Services & Doctor Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Services */}
          <div className="rounded-[2.5rem] border-2 border-foreground bg-white p-8 shadow-card flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black text-foreground">Layanan Populer</h2>
              <button className="text-sm font-bold text-primary hover:text-foreground hover:underline">Lihat Semua</button>
            </div>
            <div className="space-y-5 flex-1">
              {popularServices.map((service) => (
                <div key={service.name}>
                  <div className="flex justify-between items-end mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border-2 border-transparent ${service.color === "primary" ? "bg-primary/10" : service.color === "secondary" ? "bg-secondary/10" : service.color === "accent-yellow" ? "bg-accent-yellow/30" : "bg-accent-purple/20"}`}>
                        <span className={`material-symbols-outlined text-sm ${service.color === "primary" ? "text-primary" : service.color === "secondary" ? "text-secondary" : service.color === "accent-yellow" ? "text-foreground" : "text-accent-purple"}`}>{service.icon}</span>
                      </div>
                      <span className="font-bold text-foreground">{service.name}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">{service.percent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4 border-2 border-foreground overflow-hidden p-0.5">
                    <div className={`h-full rounded-full ${service.color === "primary" ? "bg-primary" : service.color === "secondary" ? "bg-secondary" : service.color === "accent-yellow" ? "bg-accent-yellow" : "bg-accent-purple"}`} style={{ width: `${service.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Performance */}
          <div className="rounded-[2.5rem] border-2 border-foreground bg-white p-8 shadow-card flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black text-foreground">Performa Dokter</h2>
              <button className="h-8 w-8 flex items-center justify-center rounded-lg p-0 border-2 border-foreground bg-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <span className="material-symbols-outlined text-sm">more_horiz</span>
              </button>
            </div>
            <div className="space-y-4">
              {doctorPerformance.map((doctor) => (
                <div key={doctor.name} className={`flex items-center gap-4 rounded-2xl border-2 p-4 transition-all ${doctor.isTop ? "border-foreground bg-primary/5 hover:bg-primary/10" : "border-transparent bg-gray-50 hover:border-foreground hover:bg-white"}`}>
                  <div className={`h-12 w-12 rounded-full border-2 ${doctor.isTop ? "border-foreground bg-white p-0.5" : "border-gray-300 bg-white"} flex items-center justify-center text-gray-400 overflow-hidden`}>
                    {doctor.hasImage ? (
                      <img alt={doctor.name} className="w-full h-full object-cover rounded-full" src="https://i.pravatar.cc/100?u=drgsiti" />
                    ) : (
                      <span className="material-symbols-outlined">person</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground">{doctor.name}</h4>
                    <p className={`text-xs font-semibold ${doctor.isTop ? "text-primary" : "text-gray-500"}`}>{doctor.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-foreground">{doctor.patients}</p>
                    <p className="text-[10px] uppercase font-bold text-gray-500">Pasien</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
