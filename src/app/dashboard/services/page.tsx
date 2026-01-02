"use client";

import { useState } from "react";
import { AdminLayout, AdminHeader } from "@/components/ui/admin-layout";

const services = [
  { id: 1, name: "Scaling & Polishing", category: "General", description: "Comprehensive cleaning procedure to remove plaque and tartar, followed by polishing for a smooth finish.", price: "Rp 350.000", duration: "45 Mins", icon: "dentistry", color: "accent-yellow" },
  { id: 2, name: "Teeth Whitening", category: "Cosmetic", description: "Professional bleaching treatment to brighten your smile up to 5 shades lighter safely.", price: "Rp 2.500.000", duration: "60 Mins", icon: "auto_awesome", color: "primary" },
  { id: 3, name: "Root Canal", category: "General", description: "Endodontic therapy to remove infection from inside the tooth and protect it from future infections.", price: "Rp 1.500.000", duration: "90 Mins", icon: "medical_services", color: "accent-purple" },
  { id: 4, name: "Kids Dental Checkup", category: "Pediatric", description: "Fun and friendly dental examination for children, including fluoride application.", price: "Rp 200.000", duration: "30 Mins", icon: "child_care", color: "secondary" },
  { id: 5, name: "Braces Consultation", category: "Orthodontics", description: "Initial assessment for orthodontic treatment and braces planning.", price: "Rp 150.000", duration: "30 Mins", icon: "grid_on", color: "gray" },
];

const categories = ["All Services", "General Dentistry", "Cosmetic", "Pediatric", "Orthodontics"];

export default function AdminServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All Services");
  const [showModal, setShowModal] = useState(false);

  return (
    <AdminLayout>
      <AdminHeader
        title="Services Management"
        subtitle="Manage dental services, prices, and details."
        actions={
          <div className="relative hidden md:block">
            <input
              className="h-11 w-64 rounded-full border-2 border-foreground bg-white px-4 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_#111817] focus:border-primary focus:outline-none focus:ring-0"
              placeholder="Search services..."
              type="text"
            />
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          </div>
        }
      />
      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-lg border-2 border-foreground bg-white px-3 py-1 text-sm font-bold text-foreground">Total: {services.length} Services</span>
            <span className="rounded-lg border-2 border-foreground bg-green-100 px-3 py-1 text-sm font-bold text-green-700">Active</span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Add New Service
          </button>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full border-2 border-foreground px-5 py-2 text-sm font-bold transition-all ${activeCategory === cat ? "bg-foreground text-white shadow-pop-hover" : "bg-white text-foreground hover:bg-gray-50"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {services.map((service) => (
            <div key={service.id} className="group relative flex flex-col gap-4 overflow-hidden rounded-[2rem] border-2 border-foreground bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-pop">
              <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-xl ${service.color === "accent-yellow" ? "bg-accent-yellow/20" : service.color === "primary" ? "bg-primary/20" : service.color === "accent-purple" ? "bg-accent-purple/20" : service.color === "secondary" ? "bg-secondary/20" : "bg-gray-100"}`}></div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-foreground ${service.color === "accent-yellow" ? "bg-accent-yellow text-foreground" : service.color === "primary" ? "bg-primary text-white" : service.color === "accent-purple" ? "bg-accent-purple text-foreground" : service.color === "secondary" ? "bg-secondary text-white" : "bg-gray-100 text-foreground"}`}>
                    <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-foreground">{service.name}</h3>
                    <span className="inline-block rounded-md bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-500">{service.category}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-white p-0 border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-foreground text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">{service.description}</p>
              <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-foreground">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  <span className="font-bold">{service.price}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span className="text-xs font-bold">{service.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg transform rounded-[2rem] border-2 border-foreground bg-white p-8 shadow-pop transition-all">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-black text-foreground">Add New Service</h2>
              <button
                onClick={() => setShowModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground hover:bg-red-100 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-foreground">Service Name</label>
                <input className="w-full rounded-xl border-2 border-foreground bg-gray-50 px-4 py-3 font-medium focus:bg-white focus:shadow-pop focus:outline-none transition-all placeholder:text-gray-400" placeholder="e.g. Root Canal Treatment" type="text" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-foreground">Price (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">Rp</span>
                    <input className="w-full rounded-xl border-2 border-foreground bg-gray-50 px-4 py-3 pl-10 font-medium focus:bg-white focus:shadow-pop focus:outline-none transition-all placeholder:text-gray-400" placeholder="500.000" type="text" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-foreground">Duration (Min)</label>
                  <input className="w-full rounded-xl border-2 border-foreground bg-gray-50 px-4 py-3 font-medium focus:bg-white focus:shadow-pop focus:outline-none transition-all placeholder:text-gray-400" placeholder="60" type="number" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-foreground">Description</label>
                <textarea className="w-full rounded-xl border-2 border-foreground bg-gray-50 px-4 py-3 font-medium focus:bg-white focus:shadow-pop focus:outline-none transition-all placeholder:text-gray-400 resize-none" placeholder="Brief description of the service..." rows={3}></textarea>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-foreground">Category</label>
                <select className="w-full rounded-xl border-2 border-foreground bg-gray-50 px-4 py-3 font-medium focus:bg-white focus:shadow-pop focus:outline-none transition-all text-foreground">
                  <option>General Dentistry</option>
                  <option>Cosmetic</option>
                  <option>Pediatric</option>
                  <option>Orthodontics</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 rounded-xl py-3 font-bold border-2 border-foreground bg-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Cancel</button>
                <button type="button" className="flex-1 rounded-xl bg-primary py-3 font-bold text-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
