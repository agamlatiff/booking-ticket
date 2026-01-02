"use client";

import { useState } from "react";
import { AdminLayout, AdminHeader } from "@/components/ui/admin-layout";

export default function AdminSettingsPage() {
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [paypalEnabled, setPaypalEnabled] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [birthdayEnabled, setBirthdayEnabled] = useState(false);

  return (
    <AdminLayout>
      <AdminHeader
        title="Settings"
        subtitle="Manage your clinic preferences and integrations."
        actions={
          <button className="flex items-center gap-2 rounded-xl bg-accent-yellow px-4 py-2 text-sm font-bold text-foreground border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            <span className="material-symbols-outlined text-base">save</span>
            Save Changes
          </button>
        }
      />
      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-foreground bg-white p-8 shadow-card transition-all hover:shadow-pop">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-purple/20 blur-2xl"></div>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-foreground bg-accent-purple text-foreground shadow-[2px_2px_0px_0px_#111817]">
                  <span className="material-symbols-outlined text-2xl">storefront</span>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-foreground">Clinic Info</h2>
                  <p className="text-sm font-bold text-gray-500">General details about your practice</p>
                </div>
              </div>
              <div className="space-y-6">
                {/* Logo Upload */}
                <div className="flex items-center gap-6 rounded-2xl border-2 border-dashed border-gray-300 p-6">
                  <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-foreground bg-gray-100">
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">Clinic Logo</h3>
                    <p className="mb-3 text-xs text-gray-500">Recommended size: 500x500px. JPG, PNG.</p>
                    <button className="rounded-lg px-4 py-2 text-xs font-bold border-2 border-foreground bg-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Upload New</button>
                  </div>
                </div>
                {/* Form Fields */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-foreground">Clinic Name</label>
                    <input className="w-full border-2 border-foreground rounded-xl p-3 outline-none transition-all bg-gray-50 focus:bg-white focus:shadow-pop focus:-translate-x-0.5 focus:-translate-y-0.5" placeholder="Enter clinic name" type="text" defaultValue="Dental Clinic Sehat Selalu" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-foreground">Registration Number</label>
                    <input className="w-full border-2 border-foreground rounded-xl p-3 outline-none transition-all bg-gray-50 focus:bg-white focus:shadow-pop focus:-translate-x-0.5 focus:-translate-y-0.5" placeholder="Enter reg number" type="text" defaultValue="SIP. 123/DINKES/2023" />
                  </div>
                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-bold text-foreground">Street Address</label>
                    <input className="w-full border-2 border-foreground rounded-xl p-3 outline-none transition-all bg-gray-50 focus:bg-white focus:shadow-pop focus:-translate-x-0.5 focus:-translate-y-0.5" placeholder="e.g. Jl. Kebahagiaan No. 88" type="text" defaultValue="Jl. Kebahagiaan No. 88" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-foreground">City</label>
                    <input className="w-full border-2 border-foreground rounded-xl p-3 outline-none transition-all bg-gray-50 focus:bg-white focus:shadow-pop focus:-translate-x-0.5 focus:-translate-y-0.5" placeholder="e.g. Jakarta Selatan" type="text" defaultValue="Jakarta Selatan" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-foreground">Postal Code / Zip</label>
                    <input className="w-full border-2 border-foreground rounded-xl p-3 outline-none transition-all bg-gray-50 focus:bg-white focus:shadow-pop focus:-translate-x-0.5 focus:-translate-y-0.5" placeholder="e.g. 12430" type="text" defaultValue="12430" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-foreground">Email Resmi</label>
                    <input className="w-full border-2 border-foreground rounded-xl p-3 outline-none transition-all bg-gray-50 focus:bg-white focus:shadow-pop focus:-translate-x-0.5 focus:-translate-y-0.5" type="email" defaultValue="contact@dentalclinic.com" />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="mb-2 block text-sm font-bold text-foreground">Nomor Telepon</label>
                    <input className="w-full border-2 border-foreground rounded-xl p-3 outline-none transition-all bg-gray-50 focus:bg-white focus:shadow-pop focus:-translate-x-0.5 focus:-translate-y-0.5" type="tel" defaultValue="+62 812 3456 7890" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-8">
            {/* Opening Hours */}
            <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-foreground bg-white p-8 shadow-card hover:shadow-pop transition-all">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-yellow/20 blur-2xl"></div>
              <div className="mb-6 flex items-center justify-between relative z-10">
                <h3 className="text-xl font-black text-foreground">Opening Hours</h3>
                <button className="text-primary font-bold text-sm hover:underline">Edit Hours</button>
              </div>
              <div className="flex flex-col gap-3 relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-background border-2 border-transparent hover:border-foreground transition-all">
                  <span className="font-bold text-gray-600 text-sm">Monday - Friday</span>
                  <span className="font-black text-foreground text-sm whitespace-nowrap">09:00 - 20:00</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-background border-2 border-transparent hover:border-foreground transition-all">
                  <span className="font-bold text-gray-600 text-sm">Saturday</span>
                  <span className="font-black text-foreground text-sm whitespace-nowrap">09:00 - 15:00</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-red-50 border-2 border-transparent hover:border-red-200 transition-all opacity-70">
                  <span className="font-bold text-red-500 text-sm">Sunday</span>
                  <span className="font-black text-red-500 text-sm whitespace-nowrap">Closed</span>
                </div>
              </div>
            </div>

            {/* Payment Gateway */}
            <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-foreground bg-white p-8 shadow-card transition-all hover:shadow-pop">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20 blur-2xl"></div>
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-foreground bg-primary text-white shadow-[2px_2px_0px_0px_#111817]">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <h2 className="text-xl font-black text-foreground">Payment Gateway</h2>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border-2 border-foreground bg-white p-4 transition-transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center text-white font-bold text-xs">S</div>
                      <span className="font-bold">Stripe</span>
                    </div>
                    <button
                      onClick={() => setStripeEnabled(!stripeEnabled)}
                      className={`relative w-10 h-6 rounded-full border-2 border-foreground transition-colors ${stripeEnabled ? "bg-primary" : "bg-gray-200"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white border border-foreground transition-transform ${stripeEnabled ? "translate-x-4" : ""}`}></span>
                    </button>
                  </div>
                  <input className="w-full text-xs font-mono bg-gray-50 border border-gray-300 rounded-lg p-2 text-gray-500" disabled type="password" defaultValue="sk_test_51Mz..." />
                </div>
                <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-4 opacity-75 hover:opacity-100 hover:border-foreground transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs">P</div>
                      <span className="font-bold">PayPal</span>
                    </div>
                    <button
                      onClick={() => setPaypalEnabled(!paypalEnabled)}
                      className={`relative w-10 h-6 rounded-full border-2 border-foreground transition-colors ${paypalEnabled ? "bg-primary" : "bg-gray-200"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white border border-foreground transition-transform ${paypalEnabled ? "translate-x-4" : ""}`}></span>
                    </button>
                  </div>
                  <button className="text-xs font-bold text-primary hover:underline">Connect Account</button>
                </div>
              </div>
            </div>

            {/* WhatsApp Integration */}
            <div className="group relative overflow-hidden rounded-[2.5rem] border-2 border-foreground bg-white p-8 shadow-card transition-all hover:shadow-pop">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-green-200 blur-2xl opacity-50"></div>
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-foreground bg-green-500 text-white shadow-[2px_2px_0px_0px_#111817]">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <h2 className="text-xl font-black text-foreground">WhatsApp</h2>
              </div>
              <div className="mb-6 rounded-xl bg-green-50 border-2 border-green-200 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="font-bold text-green-800 text-sm">Connected</span>
                </div>
                <p className="text-xs text-green-700 mb-3">Integrated with +62 812-3456-7890</p>
                <button className="w-full py-2 rounded-lg text-xs font-bold text-red-500 border-2 border-red-200 bg-white hover:bg-red-50 transition-colors">Disconnect</button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-3">
                  <span className="text-sm font-bold text-foreground">Appointment Reminders</span>
                  <button
                    onClick={() => setRemindersEnabled(!remindersEnabled)}
                    className={`relative w-10 h-6 rounded-full border-2 border-foreground transition-colors ${remindersEnabled ? "bg-primary" : "bg-gray-200"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white border border-foreground transition-transform ${remindersEnabled ? "translate-x-4" : ""}`}></span>
                  </button>
                </div>
                <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-3">
                  <span className="text-sm font-bold text-foreground">Birthday Wishes</span>
                  <button
                    onClick={() => setBirthdayEnabled(!birthdayEnabled)}
                    className={`relative w-10 h-6 rounded-full border-2 border-foreground transition-colors ${birthdayEnabled ? "bg-primary" : "bg-gray-200"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white border border-foreground transition-transform ${birthdayEnabled ? "translate-x-4" : ""}`}></span>
                  </button>
                </div>
                <button className="w-full mt-2 text-center text-sm font-bold text-primary hover:underline">Edit Message Templates</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
