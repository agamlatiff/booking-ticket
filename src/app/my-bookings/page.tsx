"use client";

import { useState } from "react";
import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";

const bookings = [
  {
    id: "DC-88291",
    service: "Pemasangan Behel",
    date: { day: "Senin", date: 12, month: "Agustus" },
    time: "11:00",
    doctor: { name: "drg. Siti Aminah", specialty: "Spesialis Gigi Anak", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80" },
    status: "confirmed",
  },
  {
    id: "DC-99120",
    service: "Scaling Gigi",
    date: { day: "Selasa", date: 20, month: "Agustus" },
    time: "14:00",
    doctor: { name: "drg. Budi Santoso", specialty: "Spesialis Ortodonti", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80" },
    status: "pending",
  },
];

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const tabs = [
    { id: "upcoming", label: "Akan Datang", count: 2 },
    { id: "completed", label: "Selesai", count: 0 },
    { id: "cancelled", label: "Dibatalkan", count: 0 },
  ];

  const filteredBookings = activeTab === "upcoming" ? bookings : [];

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={null} />

      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <div className="inline-flex items-center rounded-full border-2 border-foreground bg-white px-4 py-1 text-sm font-bold shadow-pop mb-4 text-primary">
                🦷 Member Area
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-black text-foreground">
                Booking Saya
              </h1>
              <p className="text-lg text-gray-600 mt-2">Kelola jadwal perawatan senyum indahmu di sini.</p>
            </div>
            <div className="hidden md:block">
              <svg className="text-accent-purple animate-spin" fill="none" height="60" viewBox="0 0 100 100" width="60" style={{ animationDuration: "10s" }}>
                <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" fill="currentColor" stroke="#111817" strokeWidth="2"></path>
              </svg>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 overflow-x-auto pb-4">
            <div className="flex gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`border-2 border-foreground px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${activeTab === tab.id
                      ? "bg-accent-yellow shadow-pop transform translate-x-[-1px] translate-y-[-1px]"
                      : "bg-white hover:bg-gray-50"
                    }`}
                >
                  {tab.label} {tab.count > 0 && `(${tab.count})`}
                </button>
              ))}
            </div>
          </div>

          {/* Booking Cards */}
          {filteredBookings.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 mb-16">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="group relative bg-white rounded-[2rem] border-2 border-foreground p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-pop"
                >
                  {/* Status Badge */}
                  <div className="absolute right-6 top-6">
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${booking.status === "confirmed"
                        ? "border-foreground bg-teal-50 text-teal-700"
                        : "border-foreground bg-yellow-50 text-yellow-700"
                      }`}>
                      <span className={`mr-1.5 h-2 w-2 rounded-full ${booking.status === "confirmed" ? "bg-teal-500" : "bg-yellow-500"
                        }`}></span>
                      {booking.status === "confirmed" ? "Terkonfirmasi" : "Menunggu Konfirmasi"}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Date Box */}
                    <div className="flex shrink-0 flex-row md:flex-col items-center justify-center gap-1 rounded-2xl border-2 border-foreground bg-background p-4 text-center md:w-28 md:gap-0">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{booking.date.month}</span>
                      <span className="text-3xl font-black text-foreground">{booking.date.date}</span>
                      <span className="text-sm font-bold text-gray-700">{booking.date.day}</span>
                      <div className="mt-0 md:mt-2 border-t-2 border-dashed border-foreground/20 pt-1 w-full hidden md:block"></div>
                      <span className="text-sm font-black text-primary md:mt-1 ml-4 md:ml-0">{booking.time}</span>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-black text-foreground mb-1">{booking.service}</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Kode Booking: <span className="font-mono font-bold text-foreground">#{booking.id}</span>
                      </p>

                      {/* Doctor */}
                      <div className="flex items-center gap-3 mb-6 bg-gray-50 p-3 rounded-xl border border-gray-200 w-fit">
                        <img
                          alt={booking.doctor.name}
                          className="h-10 w-10 rounded-full border-2 border-foreground object-cover"
                          src={booking.doctor.image}
                        />
                        <div>
                          <p className="text-sm font-bold text-foreground">{booking.doctor.name}</p>
                          <p className="text-xs text-gray-500">{booking.doctor.specialty}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        {booking.status === "confirmed" && (
                          <>
                            <button className="rounded-xl border-2 border-foreground bg-white px-5 py-2 text-sm font-bold text-foreground shadow-pop-sm transition-all hover:bg-gray-50 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">
                              Reschedule
                            </button>
                            <button className="rounded-xl border-2 border-transparent px-5 py-2 text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors">
                              Batalkan
                            </button>
                          </>
                        )}
                        {booking.status === "pending" && (
                          <button className="rounded-xl border-2 border-foreground bg-white px-5 py-2 text-sm font-bold text-foreground shadow-pop-sm transition-all hover:bg-gray-50 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none">
                            Detail Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="mt-12 flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-foreground/30 bg-white/50 p-12 text-center">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-accent-yellow rounded-full blur-xl opacity-30"></div>
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-foreground bg-white shadow-pop rotate-3">
                  <span className="material-symbols-outlined text-5xl text-primary">calendar_today</span>
                </div>
              </div>
              <h3 className="mb-2 text-2xl font-black text-foreground">Belum Ada Jadwal</h3>
              <p className="mb-8 max-w-md text-gray-500">
                {activeTab === "cancelled"
                  ? "Sepertinya kamu belum pernah membatalkan janji temu. Bagus sekali!"
                  : "Belum ada booking di kategori ini. Yuk buat janji baru!"}
              </p>
              <Link href="/booking">
                <button className="flex items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-bold text-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <span className="material-symbols-outlined text-lg">add_circle</span>
                  Buat Janji Baru
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
