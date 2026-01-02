"use client";

import { useState } from "react";
import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";

const patients = [
  {
    id: "P-0291",
    name: "Budi Santoso",
    phone: "0812-3456-7890",
    age: 32,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    lastVisit: "Hari Ini",
    lastService: "Orthodontic",
    serviceColor: "purple",
    status: "paid",
    isOnline: true,
  },
  {
    id: "P-0292",
    name: "Siti Nurhaliza",
    phone: "0811-2233-4455",
    age: 28,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    lastVisit: "12 Okt 2023",
    lastService: "Scaling",
    serviceColor: "blue",
    nextVisit: "12 Apr 2024",
    isOnline: false,
  },
  {
    id: "P-0293",
    name: "Andi Pratama",
    phone: "0857-9988-7766",
    age: 45,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    lastVisit: "Hari Ini",
    lastService: "Tambal",
    serviceColor: "orange",
    status: "unpaid",
    isOnline: false,
  },
  {
    id: "P-0294",
    name: "Rina Mulyani",
    phone: "0813-5555-1234",
    age: 35,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    lastVisit: "Hari Ini",
    lastService: "Cabut",
    serviceColor: "red",
    status: "paid",
    isOnline: true,
  },
  {
    id: "P-0295",
    name: "Dewi Sartika",
    phone: "0819-1234-5678",
    age: 22,
    image: null,
    lastVisit: "20 Sep 2023",
    lastService: "Bleaching",
    serviceColor: "yellow",
    notes: "Pasien Baru",
    isOnline: false,
  },
];

export default function DoctorPatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "Semua" },
    { id: "new", label: "Pasien Baru" },
    { id: "returning", label: "Berlangganan" },
  ];

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery) ||
    p.id.includes(searchQuery)
  );

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={null} />

      <main className="pt-32 pb-20 px-4 md:px-10 min-h-screen">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="text-2xl">📂</span>
                <span className="font-bold text-gray-500 uppercase tracking-wider text-xs">Patient Management</span>
              </div>
              <h1 className="font-display text-4xl font-black text-foreground">Daftar Pasien</h1>
              <p className="text-lg text-gray-600 mt-2">Kelola data pasien, riwayat, dan jadwal kunjungan.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex h-12 items-center justify-center rounded-full px-6 font-bold text-sm bg-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <span className="material-symbols-outlined mr-2 text-lg">download</span>
                Export Data
              </button>
              <Link href="/doctor/patients/new">
                <button className="flex h-12 items-center justify-center rounded-full bg-primary px-6 font-bold text-white text-sm border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <span className="material-symbols-outlined mr-2 text-lg">person_add</span>
                  Tambah Pasien
                </button>
              </Link>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="mb-8 rounded-[2rem] border-2 border-foreground bg-white p-4 shadow-card">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-1/2 lg:w-1/3">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <span className="material-symbols-outlined">search</span>
                </span>
                <input
                  className="w-full rounded-full border-2 border-gray-200 py-3 pl-12 pr-4 text-sm font-medium focus:border-foreground focus:ring-0 placeholder:text-gray-400"
                  placeholder="Cari nama, no. telepon, atau ID pasien..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all ${activeFilter === f.id
                        ? "bg-foreground text-white"
                        : "border-2 border-gray-200 bg-white text-gray-500 hover:border-primary hover:text-primary"
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
                <div className="h-8 w-px bg-gray-300 mx-2 hidden md:block"></div>
                <button className="flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-foreground hover:bg-gray-50">
                  <span className="material-symbols-outlined text-lg">filter_list</span>
                  Filter Lanjutan
                </button>
              </div>
            </div>
          </div>

          {/* Patient List */}
          <div className="flex flex-col gap-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="group relative flex flex-col lg:flex-row items-center justify-between gap-6 rounded-[1.5rem] border-2 border-foreground bg-white p-5 shadow-sm hover:shadow-pop transition-all hover:translate-x-1 duration-200"
              >
                {/* Avatar + Info */}
                <div className="flex w-full lg:w-auto items-center gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    {patient.image ? (
                      <img
                        alt={patient.name}
                        className="h-full w-full rounded-2xl border-2 border-foreground object-cover"
                        src={patient.image}
                      />
                    ) : (
                      <div className="h-full w-full rounded-2xl border-2 border-foreground bg-gray-100 flex items-center justify-center text-gray-400">
                        <span className="material-symbols-outlined text-3xl">person</span>
                      </div>
                    )}
                    {patient.isOnline && (
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-green-500"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-foreground">{patient.name}</h3>
                      <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-bold text-gray-500">
                        ID: {patient.id}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs font-medium text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">call</span>
                        {patient.phone}
                      </span>
                      <span className="hidden md:inline">•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        {patient.age} Tahun
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex w-full lg:flex-1 items-center justify-between lg:justify-start lg:gap-12 border-t lg:border-t-0 border-dashed border-gray-200 pt-4 lg:pt-0">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Terakhir Berkunjung</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{patient.lastVisit}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-bold border ${patient.serviceColor === "purple" ? "bg-purple-100 text-purple-700 border-purple-200" :
                          patient.serviceColor === "blue" ? "bg-blue-100 text-blue-700 border-blue-200" :
                            patient.serviceColor === "orange" ? "bg-orange-100 text-orange-700 border-orange-200" :
                              patient.serviceColor === "red" ? "bg-red-100 text-red-700 border-red-200" :
                                "bg-yellow-100 text-yellow-700 border-yellow-200"
                        }`}>
                        {patient.lastService}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {patient.status ? "Status Pembayaran" : patient.nextVisit ? "Kunjungan Berikutnya" : "Catatan"}
                    </span>
                    {patient.status === "paid" && (
                      <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        Lunas
                      </div>
                    )}
                    {patient.status === "unpaid" && (
                      <div className="flex items-center gap-1 text-red-500 font-bold text-sm">
                        <span className="material-symbols-outlined text-base">pending</span>
                        Belum Lunas
                      </div>
                    )}
                    {patient.nextVisit && (
                      <div className="flex items-center gap-1 text-gray-700 font-bold text-sm">
                        <span className="material-symbols-outlined text-base text-secondary">event</span>
                        {patient.nextVisit}
                      </div>
                    )}
                    {patient.notes && (
                      <div className="text-gray-700 text-sm">{patient.notes}</div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex w-full lg:w-auto items-center gap-2">
                  <button
                    className="flex-1 lg:flex-none h-10 w-10 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:border-accent-purple hover:bg-accent-purple hover:text-white transition-colors"
                    title="Chat WhatsApp"
                  >
                    <span className="material-symbols-outlined">chat</span>
                  </button>
                  <button className="flex-1 lg:flex-none h-10 rounded-xl bg-white px-4 text-sm font-bold text-foreground border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border-2 border-foreground bg-white p-2 shadow-pop">
              <button className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-gray-100 disabled:opacity-50">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-bold text-white shadow-sm">1</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-foreground hover:bg-gray-100">2</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-foreground hover:bg-gray-100">3</button>
              <span className="px-2 text-gray-400">...</span>
              <button className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-foreground hover:bg-gray-100">12</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-gray-100">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
