"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Doctor {
  id: string;
  name: string;
  speciality: string;
  bio: string | null;
  image: string | null;
  phone: string | null;
  scheduleTemplates: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[];
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface StepScheduleProps {
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  selectedDate: Date | null;
  selectedSlot: TimeSlot | null;
  onSelect: (doctor: Doctor, date: Date, slot: TimeSlot) => void;
  onBack: () => void;
}

export default function StepSchedule({
  doctors,
  selectedDoctor,
  selectedDate,
  selectedSlot,
  onSelect,
  onBack,
}: StepScheduleProps) {
  const [doctor, setDoctor] = useState<Doctor | null>(selectedDoctor);
  const [date, setDate] = useState<Date | null>(selectedDate);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [slot, setSlot] = useState<TimeSlot | null>(selectedSlot);
  const [loading, setLoading] = useState(false);

  // Generate next 14 days
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // Fetch slots when doctor and date are selected
  useEffect(() => {
    if (doctor && date) {
      setLoading(true);
      setSlot(null);

      const dateStr = date.toISOString().split("T")[0];
      fetch(`/api/slots?doctorId=${doctor.id}&date=${dateStr}`)
        .then((res) => res.json())
        .then((data) => {
          setSlots(data.slots || []);
          setLoading(false);
        })
        .catch(() => {
          setSlots([]);
          setLoading(false);
        });
    }
  }, [doctor, date]);

  const handleConfirm = () => {
    if (doctor && date && slot) {
      onSelect(doctor, date, slot);
    }
  };

  const formatDate = (d: Date) => {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    return {
      day: days[d.getDay()],
      date: d.getDate(),
      month: months[d.getMonth()],
    };
  };

  return (
    <div className="p-6 md:p-8">
      {/* Doctor Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Pilih Dokter
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          Pilih dokter yang akan menangani perawatan Anda
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {doctors.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setDoctor(d);
                setSlot(null);
              }}
              className={`p-4 rounded-xl border-2 text-left transition-all ${doctor?.id === d.id
                  ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                  : "border-gray-100 dark:border-gray-700 hover:border-teal-200"
                }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={d.image || "/placeholder-doctor.jpg"}
                  alt={d.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{d.name}</h3>
                  <p className="text-sm text-teal-600 dark:text-teal-400">{d.speciality}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      {doctor && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Pilih Tanggal
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {availableDates.map((d) => {
              const formatted = formatDate(d);
              const isSelected = date?.toDateString() === d.toDateString();
              const isToday = new Date().toDateString() === d.toDateString();

              return (
                <button
                  key={d.toISOString()}
                  onClick={() => setDate(d)}
                  className={`flex-shrink-0 w-16 py-3 rounded-xl text-center transition-all ${isSelected
                      ? "bg-teal-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-teal-100 dark:hover:bg-teal-900/30"
                    }`}
                >
                  <div className="text-xs opacity-75">{formatted.day}</div>
                  <div className="text-xl font-bold">{formatted.date}</div>
                  <div className="text-xs">{formatted.month}</div>
                  {isToday && (
                    <div className="text-[10px] mt-1 text-teal-600 dark:text-teal-300">Hari Ini</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Time Slot Selection */}
      {doctor && date && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Pilih Jam
          </h3>

          {loading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
              Memuat jadwal...
            </div>
          ) : slots.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-750 p-4 rounded-xl">
              Tidak ada jadwal tersedia untuk tanggal ini. Silakan pilih tanggal lain.
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {slots.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSlot(s)}
                  className={`py-3 px-4 rounded-xl text-center font-medium transition-all ${slot?.id === s.id
                      ? "bg-teal-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-teal-100 dark:hover:bg-teal-900/30"
                    }`}
                >
                  {s.startTime}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <Button variant="outline" onClick={onBack}>
          ← Kembali
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!doctor || !date || !slot}
          className="bg-teal-600 hover:bg-teal-700"
        >
          Lanjut ke Pembayaran →
        </Button>
      </div>
    </div>
  );
}
