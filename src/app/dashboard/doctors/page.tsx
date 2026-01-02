"use client";

import { useState } from "react";
import { AdminLayout, AdminHeader } from "@/components/ui/admin-layout";

const doctors = [
  { id: 1, name: "drg. Siti Aminah", specialty: "Orthodontist", patients: "1.2k", exp: "8 Yrs", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80", status: "online" },
  { id: 2, name: "drg. Budi Santoso", specialty: "Oral Surgeon", patients: "850", exp: "5 Yrs", image: null, status: "online", icon: "person", iconBg: "secondary" },
  { id: 3, name: "drg. Sarah Jenkins", specialty: "Pediatric Dentist", patients: "2.1k", exp: "12 Yrs", image: null, status: "offline", icon: "face_3", iconBg: "accent-purple" },
  { id: 4, name: "drg. Michael Tan", specialty: "Prosthodontist", patients: "540", exp: "3 Yrs", image: null, status: "busy", icon: "face_6", iconBg: "primary" },
  { id: 5, name: "drg. Lisa Wong", specialty: "General Dentist", patients: "1.8k", exp: "10 Yrs", image: null, status: "online", icon: "face_2", iconBg: "accent-yellow" },
];

export default function AdminDoctorsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <AdminLayout>
      <AdminHeader
        title="Doctor Management"
        subtitle="Manage your clinic's medical specialists"
        actions={
          <button className="hidden md:flex h-11 items-center gap-2 rounded-full bg-primary px-4 text-white font-bold border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            <span className="material-symbols-outlined text-xl">add</span>
            <span className="text-sm">Add Doctor</span>
          </button>
        }
      />
      <div className="p-6 md:p-10">
        {/* Search & Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-96">
            <input
              className="w-full h-12 rounded-xl border-2 border-foreground bg-white px-4 py-2 pl-11 text-sm font-bold shadow-card focus:border-primary focus:outline-none focus:ring-0 focus:shadow-pop transition-all"
              placeholder="Search doctor by name or ID..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: "all", label: "All Specialists", icon: "filter_list" },
              { id: "dentists", label: "Dentists", icon: "dentistry" },
              { id: "surgeons", label: "Surgeons", icon: "medical_services" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold whitespace-nowrap border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${filter === f.id ? "bg-accent-yellow" : "bg-white"}`}
              >
                <span className="material-symbols-outlined text-lg">{f.icon}</span>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="group relative flex flex-col rounded-[2rem] border-2 border-foreground bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-pop">
              {/* Avatar */}
              <div className="mb-4 flex justify-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-foreground bg-accent-yellow/20">
                  {doctor.image ? (
                    <img alt={doctor.name} className="h-full w-full object-cover" src={doctor.image} />
                  ) : (
                    <div className={`h-full w-full flex items-center justify-center ${doctor.iconBg === "secondary" ? "bg-secondary/20 text-secondary" : doctor.iconBg === "accent-purple" ? "bg-accent-purple/20 text-accent-purple" : doctor.iconBg === "primary" ? "bg-primary/20 text-primary" : "bg-accent-yellow/30 text-foreground"}`}>
                      <span className="material-symbols-outlined text-5xl">{doctor.icon}</span>
                    </div>
                  )}
                  <span className={`absolute bottom-0 right-0 block h-6 w-6 rounded-full border-2 border-white ring-2 ring-foreground ${doctor.status === "online" ? "bg-green-500" : doctor.status === "offline" ? "bg-gray-400" : "bg-red-500"}`}></span>
                </div>
              </div>
              {/* Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-black text-foreground">{doctor.name}</h3>
                <p className="text-sm font-bold text-primary">{doctor.specialty}</p>
              </div>
              {/* Stats */}
              <div className="mb-6 grid grid-cols-2 divide-x-2 divide-foreground/10 border-y-2 border-foreground/10 py-3">
                <div className="text-center px-2">
                  <p className="text-xs font-bold text-gray-400 uppercase">Patients</p>
                  <p className="text-lg font-black text-foreground">{doctor.patients}</p>
                </div>
                <div className="text-center px-2">
                  <p className="text-xs font-bold text-gray-400 uppercase">Exp.</p>
                  <p className="text-lg font-black text-foreground">{doctor.exp}</p>
                </div>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-3 mt-auto">
                <button className="flex-1 rounded-xl py-2 text-sm font-bold border-2 border-foreground bg-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all hover:bg-gray-50">
                  View Profile
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-purple text-foreground border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
              </div>
            </div>
          ))}
          {/* Add New Doctor Card */}
          <button className="group relative flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-foreground bg-transparent p-6 hover:bg-white hover:border-solid hover:shadow-card transition-all min-h-[300px]">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white border-2 border-foreground group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl text-foreground">add</span>
            </div>
            <h3 className="text-xl font-black text-foreground">Add New Doctor</h3>
            <p className="text-sm font-medium text-gray-500 mt-2 text-center">Register a new specialist to the clinic database</p>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
