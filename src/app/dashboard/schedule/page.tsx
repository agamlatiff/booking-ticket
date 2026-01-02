"use client";

import { useState } from "react";
import { AdminLayout, AdminHeader } from "@/components/ui/admin-layout";

const calendarDays = [
  { day: 29, disabled: true }, { day: 30, disabled: true },
  { day: 1 }, { day: 2, dots: ["primary", "accent-yellow"] }, { day: 3, dots: ["secondary"] }, { day: 4 }, { day: 5, dots: ["accent-purple"] },
  { day: 6 }, { day: 7 }, { day: 8, dots: ["primary", "primary"] }, { day: 9 }, { day: 10, dots: ["accent-yellow"] }, { day: 11 }, { day: 12 },
  { day: 13, dots: ["secondary"] }, { day: 14 }, { day: 15, dots: ["primary"] }, { day: 16 }, { day: 17, dots: ["accent-purple"] }, { day: 18 }, { day: 19 },
  { day: 20 }, { day: 21 }, { day: 22, dots: ["accent-yellow"] }, { day: 23, dots: ["primary"] }, { day: 24, active: true, dots: ["primary", "secondary", "accent-purple"] }, { day: 25 }, { day: 26 },
  { day: 27, dots: ["primary"] }, { day: 28 }, { day: 29 }, { day: 30, dots: ["accent-purple"] }, { day: 31 }, { day: 1, disabled: true }, { day: 2, disabled: true },
];

const slots = [
  { time: "09:00 - 10:00", status: "open", color: "primary" },
  { time: "10:30 - 11:30", status: "booked", name: "Budi" },
  { time: "13:00 - 14:00", status: "open", color: "secondary" },
  { time: "14:30 - 15:30", status: "open", color: "accent-purple" },
];

export default function AdminSchedulePage() {
  const [selectedDay, setSelectedDay] = useState(24);
  const [viewType, setViewType] = useState("Bulan");

  return (
    <AdminLayout>
      <AdminHeader
        title="Schedule Master"
        subtitle="Atur ketersediaan waktu dan jadwal dokter."
        emoji="📅"
        actions={
          <div className="relative hidden md:block">
            <input
              className="h-11 w-64 rounded-full border-2 border-foreground bg-white px-4 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_#111817] focus:border-primary focus:outline-none focus:ring-0"
              placeholder="Cari jadwal..."
              type="text"
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          </div>
        }
      />
      <div className="p-6 md:p-10 flex flex-col gap-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white rounded-full border-2 border-foreground shadow-pop p-1">
              <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="px-4 text-lg font-black text-foreground">Oktober 2023</div>
              <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <button className="hidden md:flex items-center gap-2 rounded-xl border-2 border-foreground bg-white px-4 py-2 text-sm font-bold shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <span className="material-symbols-outlined text-base">today</span> Today
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-xl border-2 border-foreground bg-white px-4 py-3 text-sm font-bold shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <span className="material-symbols-outlined text-primary">person</span>
              drg. Siti Aminah
              <span className="material-symbols-outlined text-gray-400">expand_more</span>
            </button>
            <div className="flex rounded-xl border-2 border-foreground bg-white p-1 shadow-pop">
              {["Bulan", "Minggu", "Hari"].map((v) => (
                <button
                  key={v}
                  onClick={() => setViewType(v)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${viewType === v ? "bg-foreground text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar + Slots */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="rounded-[2.5rem] border-2 border-foreground bg-white p-6 shadow-card">
              <div className="grid grid-cols-7 mb-4">
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
                  <div key={d} className="text-center text-xs font-extrabold text-gray-400 uppercase tracking-wider">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => !item.disabled && setSelectedDay(item.day)}
                    className={`aspect-square flex flex-col items-start justify-between rounded-2xl border-2 p-2 transition-all ${item.disabled
                        ? "border-transparent text-gray-300 cursor-default"
                        : item.active || selectedDay === item.day
                          ? "border-foreground bg-accent-yellow/20 shadow-pop transform -translate-y-1 cursor-pointer"
                          : "border-gray-100 bg-white hover:border-foreground hover:shadow-pop-hover cursor-pointer"
                      }`}
                  >
                    <span className={`text-sm font-bold ${item.active || selectedDay === item.day ? "font-black text-foreground" : item.disabled ? "" : "text-gray-700"}`}>
                      {item.day}
                    </span>
                    {item.dots && (
                      <div className="flex gap-1">
                        {item.dots.map((color, i) => (
                          <span key={i} className={`h-2 w-2 rounded-full ${color === "primary" ? "bg-primary" : color === "secondary" ? "bg-secondary" : color === "accent-purple" ? "bg-accent-purple" : "bg-accent-yellow"} ${item.active ? "ring-1 ring-white" : ""}`}></span>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            {/* Legend */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { color: "primary", label: "Praktek Pagi" },
                { color: "secondary", label: "Praktek Siang" },
                { color: "accent-purple", label: "Praktek Malam" },
                { color: "accent-yellow", label: "Libur" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 rounded-xl border border-foreground bg-white p-3 shadow-sm">
                  <span className={`h-3 w-3 rounded-full ${item.color === "primary" ? "bg-primary" : item.color === "secondary" ? "bg-secondary" : item.color === "accent-purple" ? "bg-accent-purple" : "bg-accent-yellow"}`}></span>
                  <span className="text-xs font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Manage Slots */}
          <div className="flex flex-col gap-6">
            <div className="rounded-[2.5rem] border-2 border-foreground bg-white p-6 shadow-card h-full flex flex-col">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-foreground">Manage Slots</h3>
                  <p className="text-sm font-medium text-gray-500">{selectedDay} Oktober 2023</p>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground hover:bg-red-50 hover:text-red-500">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[500px]">
                {slots.map((slot) => (
                  <div key={slot.time} className={`group flex items-center gap-3 rounded-xl border-2 p-3 hover:shadow-sm ${slot.status === "booked" ? "border-gray-200 bg-white opacity-60" : `border-foreground ${slot.color === "primary" ? "bg-primary/10" : slot.color === "secondary" ? "bg-secondary/10" : "bg-accent-purple/10"}`}`}>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 ${slot.status === "booked" ? "border-gray-200 bg-gray-100 text-gray-400" : "border-foreground bg-white text-foreground"}`}>
                      <span className="material-symbols-outlined text-sm">{slot.status === "booked" ? "lock" : "schedule"}</span>
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-black ${slot.status === "booked" ? "text-gray-500 line-through" : "text-foreground"}`}>{slot.time}</p>
                      <div className={`flex items-center gap-1 text-xs font-bold ${slot.status === "booked" ? "text-red-500" : slot.color === "primary" ? "text-primary" : slot.color === "secondary" ? "text-secondary" : "text-accent-purple"}`}>
                        <span className={`h-2 w-2 rounded-full ${slot.status === "booked" ? "bg-red-500" : slot.color === "primary" ? "bg-primary" : slot.color === "secondary" ? "bg-secondary" : "bg-accent-purple"}`}></span>
                        {slot.status === "booked" ? `Booked (${slot.name})` : "Open Slot"}
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white rounded-md transition-all">
                      <span className="material-symbols-outlined text-sm">{slot.status === "booked" ? "visibility" : "edit"}</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200">
                <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-foreground py-3 font-bold text-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <span className="material-symbols-outlined">add_circle</span>
                  Tambah Slot Baru
                </button>
              </div>
            </div>
            <div className="rounded-[2.5rem] border-2 border-foreground bg-accent-yellow p-6 shadow-card">
              <h4 className="font-black text-lg mb-2">Block Seharian?</h4>
              <p className="text-xs font-bold opacity-80 mb-4">Tandai tanggal ini sebagai hari libur dokter.</p>
              <button className="w-full rounded-xl border-2 border-foreground bg-white py-2 font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-colors">
                Tandai Libur
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
