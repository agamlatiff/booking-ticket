"use client";

import { useState } from "react";
import { AdminLayout, AdminHeader } from "@/components/ui/admin-layout";

const patients = [
  { id: "#P-2023-001", name: "Budi Santoso", initials: "BS", color: "accent-yellow", phone: "+62 812-3456-7890", email: "budi.san@email.com", lastVisit: "24 Oct 2023", lastService: "Scaling Gigi", status: "Active", statusColor: "green", hasImage: true, selected: true },
  { id: "#P-2023-042", name: "Anisa Rahma", initials: "AR", color: "accent-purple", phone: "+62 819-0022-3344", email: "anisa.rahma@email.com", lastVisit: "10 Sep 2023", lastService: "Kontrol Behel", status: "New", statusColor: "blue", hasImage: false },
  { id: "#P-2023-089", name: "Michael Tan", initials: "MT", color: "secondary", phone: "+62 813-9988-7766", email: "michael.t@email.com", lastVisit: "02 Aug 2023", lastService: "Tambal Gigi", status: "Pending", statusColor: "yellow", hasImage: true },
  { id: "#P-2023-112", name: "Siti Nurhaliza", initials: "SN", color: "secondary", phone: "+62 821-4455-6677", email: "siti.nur@email.com", lastVisit: "15 Oct 2023", lastService: "Bleaching", status: "Active", statusColor: "green", hasImage: false },
  { id: "#P-2023-156", name: "David Santoso", initials: "DS", color: "primary", phone: "+62 856-7890-1234", email: "david.s@email.com", lastVisit: "--", lastService: "Never visited", status: "New", statusColor: "blue", hasImage: true },
];

const selectedPatient = {
  name: "Budi Santoso",
  age: "32 Tahun",
  gender: "Pria",
  nextAppointment: "02 Nov 2023, 10:00",
  medicalAlert: "Alergi Penicillin",
  notes: "Patient prefers morning appointments. Needs extra anesthesia for deep cleaning.",
};

export default function AdminPatientsPage() {
  const [search, setSearch] = useState("");

  return (
    <AdminLayout>
      <AdminHeader
        title="🗂️ Patients Database"
        subtitle="Manage patient records and medical history"
        actions={
          <button className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-foreground bg-white shadow-[2px_2px_0px_0px_#111817] transition-transform hover:-translate-y-1 relative">
            <span className="material-symbols-outlined text-foreground">notifications</span>
            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border border-white"></span>
          </button>
        }
      />
      <div className="p-6 md:p-10 min-h-[calc(100vh-88px)]">
        {/* Search and Actions */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="relative w-full md:w-96">
            <input
              className="h-12 w-full rounded-2xl border-2 border-foreground bg-white pl-12 pr-4 text-sm font-bold shadow-card focus:border-primary focus:outline-none focus:ring-0 placeholder:text-gray-400"
              placeholder="Search by name, ID, or phone..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          </div>
          <div className="flex w-full items-center gap-3 md:w-auto">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold md:flex-none border-2 border-foreground bg-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <span className="material-symbols-outlined">filter_list</span>
              Filter
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white md:flex-none border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <span className="material-symbols-outlined">person_add</span>
              Add Patient
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 xl:flex-row items-start">
          {/* Table */}
          <div className="flex-1 w-full flex flex-col rounded-[2.5rem] border-2 border-foreground bg-white shadow-card overflow-hidden">
            <div className="border-b-2 border-foreground bg-gray-50 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-black text-foreground">All Patients (1,248)</h2>
              <button className="text-xs font-bold text-gray-500 hover:text-foreground flex items-center gap-1">
                Sort by: Recent <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b-2 border-foreground bg-accent-yellow/10 text-xs uppercase tracking-wider text-gray-600">
                    <th className="px-6 py-4 font-black">Patient Name</th>
                    <th className="px-6 py-4 font-black">Contact</th>
                    <th className="px-6 py-4 font-black">Last Visit</th>
                    <th className="px-6 py-4 font-black">Status</th>
                    <th className="px-6 py-4 font-black text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-medium">
                  {patients.map((p) => (
                    <tr key={p.id} className={`transition-colors hover:bg-gray-50 cursor-pointer ${p.selected ? "bg-accent-yellow/10" : ""}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-foreground ${p.hasImage ? "bg-white" : `${p.color === "accent-purple" ? "bg-accent-purple" : p.color === "secondary" ? "bg-secondary" : "bg-primary"}`}`}>
                            {p.hasImage ? (
                              <img alt={p.name} className="h-full w-full object-cover" src={`https://i.pravatar.cc/80?u=${p.id}`} />
                            ) : (
                              <span className="flex h-full w-full items-center justify-center font-bold text-white">{p.initials}</span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{p.name}</p>
                            <p className="text-xs text-gray-500">ID: {p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-foreground">{p.phone}</p>
                        <p className="text-xs text-gray-500">{p.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="block text-foreground">{p.lastVisit}</span>
                        <span className="text-xs text-gray-500">{p.lastService}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${p.statusColor === "green" ? "border-green-200 bg-green-100 text-green-700" : p.statusColor === "blue" ? "border-blue-200 bg-blue-100 text-blue-700" : "border-yellow-200 bg-yellow-100 text-yellow-800"}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-gray-400 hover:text-foreground">
                          <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between border-t-2 border-foreground p-4">
              <p className="text-sm font-bold text-gray-500">Showing 1-5 of 1,248</p>
              <div className="flex gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-transparent hover:border-foreground hover:bg-gray-100">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-foreground bg-accent-yellow font-bold text-foreground">1</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-transparent font-bold text-gray-500 hover:border-foreground">2</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-transparent font-bold text-gray-500 hover:border-foreground">3</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-transparent hover:border-foreground hover:bg-gray-100">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Detail Sidebar */}
          <div className="hidden w-80 shrink-0 flex-col gap-6 xl:flex">
            <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-foreground bg-white p-6 shadow-card">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent-yellow/30 blur-xl"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-foreground shadow-pop">
                  <img alt={selectedPatient.name} className="h-full w-full object-cover" src="https://i.pravatar.cc/200?u=budi" />
                </div>
                <h3 className="text-xl font-black text-foreground">{selectedPatient.name}</h3>
                <p className="text-sm font-bold text-gray-500">{selectedPatient.age} • {selectedPatient.gender}</p>
                <div className="mt-4 flex w-full gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-primary py-2 text-xs font-bold text-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    <span className="material-symbols-outlined align-middle text-sm">call</span> Call
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 rounded-xl py-2 text-xs font-bold border-2 border-foreground bg-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    <span className="material-symbols-outlined align-middle text-sm">mail</span> Email
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 rounded-[2.5rem] border-2 border-foreground bg-white p-6 shadow-card">
              <h4 className="mb-4 font-black text-foreground">Patient Info</h4>
              <div className="space-y-4">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <p className="text-xs font-bold text-gray-400 uppercase">Next Appointment</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">calendar_month</span>
                    <span className="font-bold text-foreground">{selectedPatient.nextAppointment}</span>
                  </div>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <p className="text-xs font-bold text-gray-400 uppercase">Medical Alert</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-500">warning</span>
                    <span className="font-bold text-foreground">{selectedPatient.medicalAlert}</span>
                  </div>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
                  <p className="text-xs font-bold text-gray-400 uppercase">Notes</p>
                  <p className="mt-1 text-sm font-medium text-gray-600">{selectedPatient.notes}</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-xl border-2 border-dashed border-foreground py-3 text-sm font-bold text-gray-500 hover:border-solid hover:bg-gray-50">
                View Full History
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
