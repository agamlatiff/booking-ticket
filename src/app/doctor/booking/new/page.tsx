"use client";

import { useState } from "react";
import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";

const services = [
  { id: "checkup", name: "Check-up", icon: "dentistry", color: "blue" },
  { id: "scaling", name: "Scaling", icon: "clean_hands", color: "orange" },
  { id: "tambal", name: "Tambal", icon: "auto_fix", color: "purple" },
  { id: "cabut", name: "Cabut Gigi", icon: "content_cut", color: "red" },
  { id: "kawat", name: "Kawat Gigi", icon: "personal_injury", color: "green" },
];

const timeSlots = [
  { time: "09:00", available: false },
  { time: "09:30", available: true },
  { time: "10:00", available: true },
  { time: "10:30", available: true },
  { time: "11:00", available: false },
  { time: "11:30", available: true },
  { time: "13:00", available: true },
  { time: "13:30", available: true },
];

export default function DoctorBookingNewPage() {
  const [selectedService, setSelectedService] = useState("checkup");
  const [selectedDate, setSelectedDate] = useState(6);
  const [selectedTime, setSelectedTime] = useState("09:30");
  const [notes, setNotes] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={null} />

      <main className="pt-32 pb-20 px-4 md:px-10 min-h-screen">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <Link href="/doctor" className="font-bold text-gray-500 uppercase tracking-wider text-xs hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <span className="text-gray-400">/</span>
                <span className="font-bold text-primary uppercase tracking-wider text-xs">Jadwal</span>
              </div>
              <h1 className="font-display text-4xl font-black text-foreground">Buat Janji Temu</h1>
              <p className="text-lg text-gray-600 mt-2">Isi formulir di bawah ini untuk menjadwalkan kunjungan pasien.</p>
            </div>
            <Link href="/doctor/schedule">
              <button className="flex h-10 items-center justify-center rounded-full px-4 font-bold text-sm bg-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <span className="material-symbols-outlined mr-2 text-lg">arrow_back</span>
                Kembali
              </button>
            </Link>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-[2rem] border-2 border-foreground p-6 md:p-10 shadow-card relative overflow-hidden">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[5rem] bg-accent-yellow/20 -mr-8 -mt-8 pointer-events-none"></div>
            <div className="absolute left-0 bottom-0 h-24 w-24 rounded-tr-[3rem] bg-primary/10 -ml-4 -mb-4 pointer-events-none"></div>

            <form className="relative z-10 space-y-10">
              {/* Step 1: Patient */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white border-2 border-foreground font-bold">1</div>
                  <h3 className="text-xl font-bold text-foreground">Pilih Pasien</h3>
                </div>
                <div className="ml-0 md:ml-11 flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                    <input
                      className="w-full h-12 rounded-xl border-2 border-gray-200 bg-gray-50 pl-12 pr-4 font-bold text-foreground placeholder-gray-400 focus:border-foreground focus:ring-0 focus:bg-white transition-all"
                      placeholder="Cari nama pasien, No. RM, atau NIK..."
                      type="text"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 font-bold text-sm uppercase tracking-wide md:self-center">atau</div>
                  <Link href="/doctor/patients/new">
                    <button
                      type="button"
                      className="h-12 px-6 rounded-xl font-bold flex items-center justify-center gap-2 bg-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all whitespace-nowrap group"
                    >
                      <span className="material-symbols-outlined group-hover:text-primary transition-colors">person_add</span>
                      Pasien Baru
                    </button>
                  </Link>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200"></div>

              {/* Step 2: Service */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white border-2 border-foreground font-bold">2</div>
                  <h3 className="text-xl font-bold text-foreground">Jenis Perawatan</h3>
                </div>
                <div className="ml-0 md:ml-11 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {services.map((service) => (
                    <label key={service.id} className="cursor-pointer group relative">
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        checked={selectedService === service.id}
                        onChange={() => setSelectedService(service.id)}
                        className="peer sr-only"
                      />
                      <div className="p-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-primary peer-checked:border-foreground peer-checked:bg-primary/5 peer-checked:shadow-pop transition-all h-full flex flex-col items-center text-center gap-3">
                        <div className={`h-12 w-12 rounded-full border flex items-center justify-center group-hover:scale-110 transition-transform ${service.color === "blue" ? "bg-blue-100 text-blue-600 border-blue-200" :
                            service.color === "orange" ? "bg-orange-100 text-orange-600 border-orange-200" :
                              service.color === "purple" ? "bg-purple-100 text-purple-600 border-purple-200" :
                                service.color === "red" ? "bg-red-100 text-red-600 border-red-200" :
                                  "bg-green-100 text-green-600 border-green-200"
                          }`}>
                          <span className="material-symbols-outlined">{service.icon}</span>
                        </div>
                        <span className="font-bold text-sm text-foreground">{service.name}</span>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 text-primary scale-0 peer-checked:scale-100 transition-all">
                        <span className="material-symbols-outlined text-xl">check_circle</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200"></div>

              {/* Step 3: DateTime */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-purple text-white border-2 border-foreground font-bold">3</div>
                  <h3 className="text-xl font-bold text-foreground">Waktu Kunjungan</h3>
                </div>
                <div className="ml-0 md:ml-11 flex flex-col lg:flex-row gap-8">
                  {/* Mini Calendar */}
                  <div className="flex-1 max-w-sm">
                    <div className="bg-white rounded-2xl border-2 border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-lg">Oktober 2023</h4>
                        <div className="flex gap-1">
                          <button type="button" className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600">
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                          </button>
                          <button type="button" className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600">
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-400 mb-2">
                        <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-sm font-bold">
                        {[28, 29, 30].map((d) => (
                          <button key={d} type="button" className="h-9 w-9 rounded-full flex items-center justify-center text-gray-300 pointer-events-none">{d}</button>
                        ))}
                        {[1, 2, 3].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setSelectedDate(d)}
                            className={`h-9 w-9 rounded-full flex items-center justify-center ${selectedDate === d ? "bg-foreground text-white shadow-lg" : "text-foreground hover:bg-gray-100"}`}
                          >
                            {d}
                          </button>
                        ))}
                        <button type="button" className="h-9 w-9 rounded-full flex items-center justify-center text-red-400 bg-red-50">4</button>
                        {[5, 6, 7, 8, 9, 10].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setSelectedDate(d)}
                            className={`h-9 w-9 rounded-full flex items-center justify-center ${selectedDate === d ? "bg-foreground text-white shadow-lg" : "text-foreground hover:bg-gray-100"}`}
                          >
                            {d}
                          </button>
                        ))}
                        <button type="button" className="h-9 w-9 rounded-full flex items-center justify-center text-red-400 bg-red-50">11</button>
                      </div>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-500">Jumat, 6 Oktober</h4>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">8 Slot Tersedia</span>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => slot.available && setSelectedTime(slot.time)}
                          className={`py-2 px-1 rounded-lg border-2 text-sm font-bold transition-all ${!slot.available
                              ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                              : selectedTime === slot.time
                                ? "border-primary text-white bg-primary shadow-pop-hover"
                                : "border-gray-200 text-foreground hover:border-foreground hover:bg-gray-50"
                            }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-4">* Waktu dalam format 24 jam (WIB)</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200"></div>

              {/* Step 4: Notes */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-yellow text-foreground border-2 border-foreground font-bold">4</div>
                  <h3 className="text-xl font-bold text-foreground">Catatan Tambahan</h3>
                </div>
                <div className="ml-0 md:ml-11">
                  <textarea
                    className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 p-4 font-medium text-foreground placeholder-gray-400 focus:border-foreground focus:ring-0 focus:bg-white transition-all resize-none"
                    placeholder="Keluhan pasien, alergi obat, atau catatan khusus lainnya..."
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t-2 border-gray-100 flex flex-col-reverse md:flex-row items-center justify-end gap-4">
                <Link href="/doctor/schedule">
                  <button type="button" className="w-full md:w-auto font-bold text-gray-500 hover:text-foreground py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors">
                    Batal
                  </button>
                </Link>
                <button
                  type="button"
                  className="w-full md:w-auto h-14 px-10 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 text-lg border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <span className="material-symbols-outlined">save</span>
                  Simpan Janji Temu
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
