"use client";

import { useState } from "react";
import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";

const services = [
  { id: "behel", name: "Pemasangan Behel", desc: "Orthodontic treatment untuk merapikan gigi.", price: 5000000, icon: "grid_on", color: "accent-purple" },
  { id: "tambal", name: "Tambal Estetik", desc: "Perbaikan gigi berlubang warna natural.", price: 400000, icon: "healing", color: "accent-yellow" },
  { id: "scaling", name: "Scaling Gigi", desc: "Membersihkan karang gigi secara total.", price: 300000, icon: "dentistry", color: "secondary" },
  { id: "bleaching", name: "Bleaching", desc: "Memutihkan gigi secara instan.", price: 2500000, icon: "auto_awesome", color: "gray-200" },
];

const doctors = [
  { id: "siti", name: "drg. Siti Aminah", specialty: "Spesialis Gigi Anak", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80" },
  { id: "budi", name: "drg. Budi Santoso", specialty: "Spesialis Ortodonti", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80" },
];

const dates = [
  { day: "Senin", date: 12, month: "Agt", available: true },
  { day: "Selasa", date: 13, month: "Agt", available: true },
  { day: "Rabu", date: 14, month: "Agt", available: true },
  { day: "Kamis", date: 15, month: "Agt", available: false },
  { day: "Jumat", date: 16, month: "Agt", available: true },
];

const times = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];
const unavailableTimes = ["09:00"];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState("behel");
  const [selectedDoctor, setSelectedDoctor] = useState("siti");
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState("11:00");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", notes: "" });

  const service = services.find(s => s.id === selectedService);
  const doctor = doctors.find(d => d.id === selectedDoctor);
  const date = dates[selectedDate];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const stepLabels = ["Layanan", "Jadwal", "Data Diri"];

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={null} />

      <main className="min-h-screen pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center relative">
            <div className="absolute top-0 right-10 hidden md:block">
              <svg className="text-accent-yellow animate-bounce" fill="none" height="50" viewBox="0 0 100 100" width="50" style={{ animationDuration: "4s" }}>
                <circle cx="50" cy="50" fill="currentColor" r="50"></circle>
              </svg>
            </div>
            <div className="inline-flex items-center rounded-full border-2 border-foreground bg-white px-4 py-1 text-sm font-bold shadow-pop mb-4 text-primary">
              🗓️ Booking Online
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
              Amankan Jadwal Senyummu!
            </h1>
            <p className="text-lg text-gray-600">Isi formulir di bawah ini, simpel dan cepat.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Sections */}
            <div className="lg:col-span-8 space-y-6">
              {/* Progress Steps */}
              <div className="relative flex items-center justify-between mb-8 px-4">
                <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-gray-200"></div>
                {stepLabels.map((label, index) => {
                  const stepNum = index + 1;
                  const isActive = currentStep >= stepNum;
                  const isCurrent = currentStep === stepNum;
                  return (
                    <div key={stepNum} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold shadow-pop transition-all ${isActive
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-400 border-foreground"
                        } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}>
                        {stepNum}
                      </div>
                      <span className={`text-xs font-bold bg-background px-1 ${isActive ? "text-foreground" : "text-gray-400"}`}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Step 1: Pilih Perawatan */}
              {currentStep === 1 && (
                <section className="bg-white rounded-[2rem] border-2 border-foreground p-6 md:p-8 shadow-card relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent-yellow rounded-full border-2 border-foreground opacity-20"></div>
                  <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-yellow border-2 border-foreground text-sm">1</span>
                    Pilih Perawatan
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((svc) => (
                      <label key={svc.id} className="cursor-pointer group relative">
                        <input
                          type="radio"
                          name="service"
                          value={svc.id}
                          checked={selectedService === svc.id}
                          onChange={() => setSelectedService(svc.id)}
                          className="peer sr-only"
                        />
                        <div className={`h-full rounded-2xl border-2 border-foreground bg-white p-4 transition-all hover:shadow-pop ${selectedService === svc.id ? "bg-primary/5 border-primary shadow-pop" : ""}`}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="p-2 bg-accent-purple/20 rounded-lg border-2 border-foreground">
                              <span className="material-symbols-outlined text-primary">{svc.icon}</span>
                            </div>
                            <span className={`material-symbols-outlined text-primary transition-all ${selectedService === svc.id ? "opacity-100" : "opacity-0"}`}>check_circle</span>
                          </div>
                          <h3 className="font-bold text-lg mb-1">{svc.name}</h3>
                          <p className="text-xs text-gray-500 mb-3">{svc.desc}</p>
                          <p className="text-sm font-black text-secondary">Rp {svc.price.toLocaleString("id-ID")}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-end mt-8">
                    <button
                      onClick={nextStep}
                      className="rounded-full bg-primary border-2 border-foreground px-8 py-3 text-white font-bold shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2"
                    >
                      Lanjut
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </section>
              )}

              {/* Step 2: Dokter & Jadwal */}
              {currentStep === 2 && (
                <section className="bg-white rounded-[2rem] border-2 border-foreground p-6 md:p-8 shadow-card relative overflow-hidden">
                  <div className="absolute -left-4 top-1/2 w-24 h-24 bg-accent-purple rounded-full border-2 border-foreground opacity-20"></div>
                  <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-purple border-2 border-foreground text-sm">2</span>
                    Dokter & Jadwal
                  </h2>

                  {/* Pilih Dokter */}
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Pilih Dokter</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {doctors.map((doc) => (
                        <label key={doc.id} className="cursor-pointer relative">
                          <input
                            type="radio"
                            name="doctor"
                            value={doc.id}
                            checked={selectedDoctor === doc.id}
                            onChange={() => setSelectedDoctor(doc.id)}
                            className="peer sr-only"
                          />
                          <div className={`flex items-center gap-4 rounded-2xl border-2 border-foreground bg-white p-3 transition-all hover:shadow-pop ${selectedDoctor === doc.id ? "bg-accent-yellow/10 border-accent-yellow shadow-pop" : ""}`}>
                            <div className="h-14 w-14 rounded-full border-2 border-foreground overflow-hidden bg-gray-200">
                              <img alt={doc.name} className="h-full w-full object-cover" src={doc.image} />
                            </div>
                            <div>
                              <h4 className="font-bold text-foreground">{doc.name}</h4>
                              <p className="text-xs text-gray-500">{doc.specialty}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pilih Tanggal */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Pilih Tanggal</label>
                    <div className="flex gap-3 overflow-x-auto pb-4">
                      {dates.map((d, i) => (
                        <label key={i} className={`cursor-pointer shrink-0 ${!d.available ? "pointer-events-none" : ""}`}>
                          <input
                            type="radio"
                            name="date"
                            disabled={!d.available}
                            checked={selectedDate === i}
                            onChange={() => setSelectedDate(i)}
                            className="peer sr-only"
                          />
                          <div className={`w-20 rounded-xl border-2 p-3 text-center transition-all ${!d.available
                            ? "border-gray-200 bg-gray-50 opacity-50"
                            : selectedDate === i
                              ? "border-foreground bg-foreground text-white shadow-pop"
                              : "border-foreground bg-white hover:bg-gray-50"
                            }`}>
                            <span className="block text-xs font-medium">{d.day}</span>
                            <span className="block text-xl font-black">{d.date}</span>
                            <span className="block text-xs">{d.available ? d.month : "Tutup"}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pilih Jam */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Pilih Jam</label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {times.map((time) => {
                        const disabled = unavailableTimes.includes(time);
                        return (
                          <label key={time} className={`cursor-pointer ${disabled ? "pointer-events-none" : ""}`}>
                            <input
                              type="radio"
                              name="time"
                              value={time}
                              disabled={disabled}
                              checked={selectedTime === time}
                              onChange={() => setSelectedTime(time)}
                              className="peer sr-only"
                            />
                            <div className={`rounded-lg border-2 py-2 text-center text-sm font-bold transition-all ${disabled
                              ? "border-gray-200 bg-gray-50 text-gray-400"
                              : selectedTime === time
                                ? "border-foreground bg-primary text-white shadow-pop-sm"
                                : "border-foreground bg-white text-foreground hover:bg-gray-50"
                              }`}>
                              {time}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={prevStep}
                      className="rounded-full bg-white border-2 border-foreground px-8 py-3 text-foreground font-bold shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined">arrow_back</span>
                      Kembali
                    </button>
                    <button
                      onClick={nextStep}
                      className="rounded-full bg-primary border-2 border-foreground px-8 py-3 text-white font-bold shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2"
                    >
                      Lanjut
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </section>
              )}

              {/* Step 3: Data Diri */}
              {currentStep === 3 && (
                <section className="bg-white rounded-[2rem] border-2 border-foreground p-6 md:p-8 shadow-card">
                  <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary border-2 border-foreground text-white text-sm">3</span>
                    Data Diri
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">Nama Lengkap</label>
                        <input
                          className="w-full rounded-xl border-2 border-foreground bg-background px-4 py-3 text-sm font-medium focus:border-primary focus:ring-0 placeholder:text-gray-400"
                          placeholder="Cth: Budi Santoso"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-foreground mb-1">Nomor WhatsApp</label>
                        <input
                          className="w-full rounded-xl border-2 border-foreground bg-background px-4 py-3 text-sm font-medium focus:border-primary focus:ring-0 placeholder:text-gray-400"
                          placeholder="0812..."
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-1">Email (Opsional)</label>
                      <input
                        className="w-full rounded-xl border-2 border-foreground bg-background px-4 py-3 text-sm font-medium focus:border-primary focus:ring-0 placeholder:text-gray-400"
                        placeholder="nama@email.com"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-1">Catatan Tambahan</label>
                      <textarea
                        className="w-full rounded-xl border-2 border-foreground bg-background px-4 py-3 text-sm font-medium focus:border-primary focus:ring-0 placeholder:text-gray-400"
                        placeholder="Punya alergi atau request khusus?"
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      ></textarea>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={prevStep}
                      className="rounded-full bg-white border-2 border-foreground px-8 py-3 text-foreground font-bold shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined">arrow_back</span>
                      Kembali
                    </button>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="rounded-[2rem] border-2 border-foreground bg-white p-6 shadow-pop">
                <h3 className="font-display text-xl font-black text-foreground mb-6 border-b-2 border-dashed border-gray-200 pb-4">
                  Ringkasan Booking
                </h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Perawatan</span>
                    <p className="font-bold text-foreground">{service?.name}</p>
                  </div>
                  {currentStep >= 2 && (
                    <>
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Dokter</span>
                        <div className="flex items-center gap-2 mt-1">
                          <img className="h-6 w-6 rounded-full border border-gray-200 object-cover" src={doctor?.image} alt={doctor?.name} />
                          <p className="font-bold text-foreground text-sm">{doctor?.name}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Jadwal</span>
                        <div className="flex gap-2 mt-1">
                          <span className="bg-accent-purple/20 text-xs font-bold px-2 py-1 rounded-md border border-foreground text-foreground">
                            {date?.day}, {date?.date} {date?.month}
                          </span>
                          <span className="bg-accent-yellow/20 text-xs font-bold px-2 py-1 rounded-md border border-foreground text-foreground">
                            {selectedTime}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="border-t-2 border-foreground border-dashed pt-4 mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Biaya Booking</span>
                    <span className="font-bold">Rp 50.000</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Estimasi Perawatan</span>
                    <span className="font-bold">Rp {service?.price.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-end">
                    <div>
                      <span className="text-xs font-bold text-gray-500">Total Pembayaran Awal</span>
                      <p className="text-3xl font-black text-primary">Rp 50.000</p>
                    </div>
                  </div>
                  <div className="mt-2 bg-yellow-50 p-2 rounded-lg border border-yellow-200 text-xs text-yellow-800">
                    *Biaya booking akan memotong total biaya perawatan.
                  </div>
                </div>
                {currentStep === 3 ? (
                  <Link href="/booking/success">
                    <button className="w-full rounded-full bg-foreground py-4 text-lg font-bold text-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2">
                      Konfirmasi Booking
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={nextStep}
                    className="w-full rounded-full bg-foreground py-4 text-lg font-bold text-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                  >
                    Lanjut ke Step {currentStep + 1}
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                )}
                <p className="text-center text-xs text-gray-400 mt-4">Data aman & terenkripsi.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
