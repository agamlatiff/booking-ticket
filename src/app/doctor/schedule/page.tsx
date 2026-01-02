"use client";

import { useState } from "react";
import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";

const weekDays = [
  { day: "Sen", date: 16, isToday: true },
  { day: "Sel", date: 17, isToday: false },
  { day: "Rab", date: 18, isToday: false },
  { day: "Kam", date: 19, isToday: false },
  { day: "Jum", date: 20, isToday: false },
  { day: "Sab", date: 21, isToday: false, isClosed: true },
];

const timeSlots = ["09:00", "10:00", "11:00", "13:00"];

const appointments: Record<string, Record<number, { patient: string; service: string; color: string } | null>> = {
  "09:00": {
    16: { patient: "Budi Santoso", service: "Orthodontic", color: "accent-purple" },
    17: null,
    18: { patient: "Ahmad Rizki", service: "Cabut Gigi", color: "secondary" },
    19: null,
    20: null,
    21: null,
  },
  "10:00": {
    16: null,
    17: { patient: "Siti N.", service: "Scaling", color: "accent-yellow" },
    18: null,
    19: { patient: "Dewi P.", service: "Checkup", color: "primary" },
    20: null,
    21: null,
  },
  "11:00": {
    16: null,
    17: null,
    18: null,
    19: null,
    20: null,
    21: null,
  },
  "13:00": {
    16: { patient: "Andi P.", service: "Tambal", color: "accent-purple" },
    17: null,
    18: null,
    19: null,
    20: { patient: "Rina M.", service: "Cabut", color: "secondary" },
    21: null,
  },
};

const slotList = [
  { time: "09:00 - 10:00", patient: "Budi Santoso", isBooked: true },
  { time: "10:00 - 11:00", patient: null, isBooked: false },
  { time: "13:00 - 14:00", patient: "Andi Pratama", isBooked: true },
  { time: "14:00 - 15:00", patient: null, isBooked: false },
];

export default function DoctorSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(16);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={null} />

      <main className="pt-32 pb-20 px-4 md:px-10 min-h-screen">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="font-bold text-primary uppercase tracking-wider text-xs bg-teal-50 px-3 py-1 rounded-full border border-teal-100">Weekly Schedule</span>
              </div>
              <h1 className="font-display text-4xl font-black text-foreground">Jadwal Praktek</h1>
              <p className="text-lg text-gray-600 mt-2">Kelola waktu praktek dan janji temu pasien Anda minggu ini.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex h-12 items-center justify-center rounded-full px-6 font-bold text-sm bg-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <span className="material-symbols-outlined mr-2">print</span>
                Cetak Jadwal
              </button>
              <button className="flex h-12 items-center justify-center rounded-full bg-primary px-6 font-bold text-white text-sm border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <span className="material-symbols-outlined mr-2">add</span>
                Buat Janji Temu
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-8 xl:col-span-9 order-2 lg:order-1">
              <div className="bg-white rounded-[2rem] border-2 border-foreground p-6 shadow-card min-h-[700px] flex flex-col">
                {/* Calendar Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-full border-2 border-foreground bg-background p-1">
                      <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all">
                        <span className="material-symbols-outlined text-lg">chevron_left</span>
                      </button>
                      <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all">
                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                      </button>
                    </div>
                    <h2 className="text-2xl font-black text-foreground">Oktober 2023</h2>
                  </div>
                  <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
                    <button className="px-4 py-1.5 rounded-full text-xs font-bold text-gray-500 hover:text-foreground transition-colors">Hari</button>
                    <button className="px-4 py-1.5 rounded-full bg-white text-xs font-bold text-foreground shadow-sm border border-gray-200">Minggu</button>
                    <button className="px-4 py-1.5 rounded-full text-xs font-bold text-gray-500 hover:text-foreground transition-colors">Bulan</button>
                  </div>
                </div>

                {/* Week Day Headers */}
                <div className="flex-1 overflow-x-auto pb-4">
                  <div className="min-w-[800px]">
                    <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-0 mb-4">
                      <div className="text-center pt-2">
                        <span className="text-xs font-bold text-gray-400">GMT+7</span>
                      </div>
                      {weekDays.map((d) => (
                        <div
                          key={d.date}
                          onClick={() => !d.isClosed && setSelectedDate(d.date)}
                          className={`text-center cursor-pointer p-2 rounded-xl transition-all ${d.isToday ? "hover:bg-teal-50 border border-transparent hover:border-teal-100" : "hover:bg-gray-50"}`}
                        >
                          <span className="block text-gray-400 text-xs font-bold uppercase mb-1">{d.day}</span>
                          {d.isToday ? (
                            <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-black text-sm shadow-pop-hover border border-foreground">
                              {d.date}
                            </div>
                          ) : (
                            <span className="block text-foreground font-bold text-lg">{d.date}</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Time Slots Grid */}
                    <div className="relative space-y-4">
                      {timeSlots.map((time) => (
                        <div key={time} className="grid grid-cols-[80px_repeat(6,1fr)] gap-4 min-h-[90px]">
                          <div className="text-xs font-bold text-gray-400 text-right pt-2 pr-4 relative">
                            {time}
                            <span className="absolute right-0 top-1/2 w-2 h-[2px] bg-gray-200"></span>
                          </div>
                          {weekDays.map((d) => {
                            const apt = appointments[time]?.[d.date];
                            if (d.isClosed) {
                              return (
                                <div key={d.date} className="relative pt-2 pb-2">
                                  <div className="h-full bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-gray-300">Tutup</span>
                                  </div>
                                </div>
                              );
                            }
                            if (apt) {
                              return (
                                <div key={d.date} className="relative">
                                  <div className={`absolute inset-0 top-2 bottom-2 bg-${apt.color}/20 border-2 border-foreground rounded-xl p-3 shadow-sm hover:shadow-pop transition-all cursor-pointer group overflow-hidden`}>
                                    <div className="flex items-start justify-between">
                                      <h5 className="font-bold text-xs truncate w-20">{apt.patient}</h5>
                                      <span className="material-symbols-outlined text-[16px] text-foreground opacity-0 group-hover:opacity-100 transition-opacity">info</span>
                                    </div>
                                    <p className={`text-[10px] font-bold mt-1 px-1.5 py-0.5 rounded inline-block ${apt.color === "accent-purple" ? "text-purple-800 bg-purple-100" :
                                        apt.color === "secondary" ? "text-orange-800 bg-orange-100" :
                                          apt.color === "accent-yellow" ? "text-yellow-800 bg-yellow-100" :
                                            "text-teal-800 bg-teal-100"
                                      }`}>
                                      {apt.service}
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                            return (
                              <div key={d.date} className="relative pt-2 pb-2">
                                <div className="h-full border-2 border-dashed border-gray-200 rounded-xl hover:border-primary hover:bg-teal-50/50 transition-all cursor-pointer flex flex-col items-center justify-center group opacity-50 hover:opacity-100">
                                  <span className="material-symbols-outlined text-gray-300 group-hover:text-primary text-lg">add</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}

                      {/* Lunch Break */}
                      <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-4 min-h-[60px]">
                        <div className="text-xs font-bold text-gray-400 text-right pt-2 pr-4">11:00</div>
                        <div className="col-span-6 relative pt-2 pb-2">
                          <div className="h-full border-2 border-gray-100 bg-gray-50/50 rounded-xl flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-400 flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">coffee</span> Istirahat Siang
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3 order-1 lg:order-2">
              <div className="sticky top-32 space-y-6">
                {/* Slot Management */}
                <div className="bg-white rounded-[2rem] border-2 border-foreground p-6 shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-foreground">Kelola Slot</h3>
                    <div className="h-8 w-8 rounded-full bg-background border border-foreground flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-lg">edit_calendar</span>
                    </div>
                  </div>

                  {/* Selected Date */}
                  <div className="bg-teal-50 rounded-xl p-4 border border-teal-200 mb-6 text-center">
                    <span className="block text-teal-600 text-xs font-bold uppercase tracking-wide mb-1">Tanggal Dipilih</span>
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-gray-400 hover:text-foreground">
                        <span className="material-symbols-outlined">chevron_left</span>
                      </button>
                      <span className="block text-xl font-black text-foreground">Senin, {selectedDate} Okt</span>
                      <button className="text-gray-400 hover:text-foreground">
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </div>
                  </div>

                  {/* Add Slot Form */}
                  <div className="mb-6 relative">
                    <div className="absolute -left-2 -right-2 top-0 h-px border-t border-dashed border-gray-200"></div>
                    <div className="pt-6">
                      <label className="text-xs font-bold text-gray-500 mb-2 block flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">add_circle</span>
                        Tambah Slot Baru
                      </label>
                      <div className="flex gap-2 mb-3">
                        <div className="w-1/2">
                          <label className="text-[10px] font-bold text-gray-400 ml-1">Mulai</label>
                          <input
                            className="w-full rounded-xl border-2 border-gray-200 text-sm font-bold focus:border-foreground focus:ring-0 bg-gray-50"
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="text-[10px] font-bold text-gray-400 ml-1">Selesai</label>
                          <input
                            className="w-full rounded-xl border-2 border-gray-200 text-sm font-bold focus:border-foreground focus:ring-0 bg-gray-50"
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                          />
                        </div>
                      </div>
                      <button className="w-full bg-foreground text-white py-3 rounded-xl font-bold text-sm hover:bg-primary border-2 border-foreground transition-colors flex items-center justify-center gap-2 shadow-pop hover:shadow-pop-hover">
                        <span className="material-symbols-outlined text-sm">save</span>
                        Simpan Slot
                      </button>
                    </div>
                  </div>

                  {/* Slot List */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-sm text-foreground">Daftar Slot (4)</h4>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">2 Terisi</span>
                    </div>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      {slotList.map((slot, i) => (
                        <div key={i} className="group flex items-center justify-between p-3 rounded-xl border-2 border-gray-200 bg-white hover:border-foreground transition-all relative overflow-hidden">
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${slot.isBooked ? "bg-red-400" : "bg-green-400"}`}></div>
                          <div className="pl-2">
                            <div className="font-black text-sm text-foreground">{slot.time}</div>
                            <div className={`flex items-center gap-1 text-xs font-bold mt-0.5 ${slot.isBooked ? "text-red-500" : "text-green-600"}`}>
                              <span className="material-symbols-outlined text-[14px]">{slot.isBooked ? "person" : "check_circle"}</span>
                              {slot.patient || "Tersedia"}
                            </div>
                          </div>
                          <div className="flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            {!slot.isBooked && (
                              <button className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-foreground">
                                <span className="material-symbols-outlined text-lg">edit</span>
                              </button>
                            )}
                            <button className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500">
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tips Box */}
                <div className="bg-accent-yellow/20 rounded-[2rem] border-2 border-foreground p-6 shadow-card">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-yellow rounded-xl p-2 border-2 border-foreground text-foreground">
                      <span className="material-symbols-outlined">lightbulb</span>
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-foreground mb-1">Tips Efisiensi</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Atur slot istirahat di antara pasien prosedur panjang untuk menjaga performa tetap prima!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
