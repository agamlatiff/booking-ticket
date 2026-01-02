"use client";

import { useState } from "react";
import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";

export default function DoctorPatientNewPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={null} />

      <main className="pt-32 pb-20 px-4 md:px-10 min-h-screen">
        <div className="mx-auto max-w-4xl">
          {/* Back Link */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Link href="/doctor/patients" className="group flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
                Kembali ke Dashboard
              </Link>
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-yellow border-2 border-foreground">
                <span className="material-symbols-outlined text-2xl text-foreground">person_add</span>
              </div>
              <h1 className="font-display text-4xl font-black text-foreground">Tambah Pasien</h1>
            </div>
            <p className="text-lg text-gray-600 ml-16 max-w-xl">Lengkapi formulir di bawah ini untuk mendaftarkan pasien baru ke dalam sistem klinik.</p>
          </div>

          {/* Form Card */}
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-foreground bg-white p-6 md:p-10 shadow-card">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[4rem] bg-accent-purple/20 -mr-8 -mt-8 pointer-events-none"></div>
            <div className="absolute left-0 bottom-0 h-24 w-24 rounded-tr-[3rem] bg-primary/10 -ml-6 -mb-6 pointer-events-none"></div>

            <form className="relative z-10 space-y-8">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-black text-foreground ml-1 text-lg flex items-center gap-2">
                    Nama Lengkap
                    <span className="text-red-500 text-sm">*</span>
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined group-focus-within:text-primary transition-colors">person</span>
                    <input
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-12 pr-4 py-3.5 font-bold text-foreground focus:border-foreground focus:bg-white focus:ring-0 placeholder:font-normal placeholder:text-gray-400 outline-none transition-all focus:shadow-pop focus:-translate-x-[2px] focus:-translate-y-[2px]"
                      placeholder="Contoh: Budi Santoso"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="font-black text-foreground ml-1 text-lg flex items-center gap-2">
                    No WhatsApp
                    <span className="text-red-500 text-sm">*</span>
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined group-focus-within:text-green-600 transition-colors">chat</span>
                    <input
                      className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-12 pr-4 py-3.5 font-bold text-foreground focus:border-foreground focus:bg-white focus:ring-0 placeholder:font-normal placeholder:text-gray-400 outline-none transition-all focus:shadow-pop focus:-translate-x-[2px] focus:-translate-y-[2px]"
                      placeholder="Contoh: 081234567890"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <label className="font-black text-foreground ml-1 text-lg">Email Address</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-symbols-outlined group-focus-within:text-accent-purple transition-colors">mail</span>
                  <input
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-12 pr-4 py-3.5 font-bold text-foreground focus:border-foreground focus:bg-white focus:ring-0 placeholder:font-normal placeholder:text-gray-400 outline-none transition-all focus:shadow-pop focus:-translate-x-[2px] focus:-translate-y-[2px]"
                    placeholder="Contoh: budi@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <label className="font-black text-foreground ml-1 text-lg flex items-center gap-2">
                  Alamat Domisili
                  <span className="text-red-500 text-sm">*</span>
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-6 text-gray-400 material-symbols-outlined group-focus-within:text-secondary transition-colors">home_pin</span>
                  <textarea
                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 pl-12 pr-4 py-3.5 font-bold text-foreground focus:border-foreground focus:bg-white focus:ring-0 placeholder:font-normal placeholder:text-gray-400 outline-none resize-none transition-all focus:shadow-pop focus:-translate-x-[2px] focus:-translate-y-[2px]"
                    placeholder="Masukkan alamat lengkap pasien..."
                    rows={4}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse md:flex-row items-center gap-4 pt-4 border-t border-dashed border-gray-200 mt-4">
                <Link href="/doctor/patients" className="w-full md:w-auto">
                  <button
                    type="button"
                    className="flex h-14 w-full md:min-w-[160px] items-center justify-center rounded-full bg-white px-8 font-black text-foreground border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    Batal
                  </button>
                </Link>
                <button
                  type="button"
                  className="flex h-14 w-full md:flex-1 items-center justify-center rounded-full bg-primary px-8 font-black text-white text-lg border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                  <span className="material-symbols-outlined mr-2 font-bold">save</span>
                  Simpan Data Pasien
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
