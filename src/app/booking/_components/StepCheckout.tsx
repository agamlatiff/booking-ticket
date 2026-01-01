"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  dpAmount: number;
  duration: number;
  image: string | null;
}

interface Doctor {
  id: string;
  name: string;
  speciality: string;
  bio: string | null;
  image: string | null;
  phone: string | null;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface BookingData {
  service: Service | null;
  doctor: Doctor | null;
  date: Date | null;
  timeSlot: TimeSlot | null;
  patientName: string;
  patientPhone: string;
  notes: string;
}

interface StepCheckoutProps {
  bookingData: BookingData;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
  onBack: () => void;
  onComplete: () => void;
}

export default function StepCheckout({
  bookingData,
  setBookingData,
  onBack,
  onComplete,
}: StepCheckoutProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { service, doctor, date, timeSlot } = bookingData;

  // Pre-fill from session
  const [patientName, setPatientName] = useState(
    bookingData.patientName || session?.user?.name || ""
  );
  const [patientPhone, setPatientPhone] = useState(
    bookingData.patientPhone || (session?.user as any)?.phone || ""
  );
  const [notes, setNotes] = useState(bookingData.notes || "");

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = async () => {
    // Validation
    if (!patientName.trim()) {
      setError("Nama pasien wajib diisi");
      return;
    }
    if (!patientPhone.trim()) {
      setError("Nomor WhatsApp wajib diisi");
      return;
    }

    // Phone format validation
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
    if (!phoneRegex.test(patientPhone.replace(/[\s-]/g, ""))) {
      setError("Format nomor WhatsApp tidak valid");
      return;
    }

    if (!session?.user) {
      router.push("/sign-in?callbackUrl=/booking");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service?.id,
          doctorId: doctor?.id,
          slotId: timeSlot?.id,
          appointmentDate: date?.toISOString().split("T")[0],
          appointmentTime: timeSlot?.startTime,
          patientName,
          patientPhone: patientPhone.replace(/[\s-]/g, ""),
          notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Gagal membuat booking");
        setLoading(false);
        return;
      }

      // Success - redirect to payment or confirmation
      // For now, redirect to my-bookings
      router.push(`/my-bookings?success=true&code=${data.booking.code}`);
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Konfirmasi Booking
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Form */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Data Pasien
          </h3>

          <div className="space-y-4">
            <div>
              <Label htmlFor="patientName">Nama Lengkap *</Label>
              <Input
                id="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="patientPhone">Nomor WhatsApp *</Label>
              <Input
                id="patientPhone"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Untuk konfirmasi dan pengingat jadwal
              </p>
            </div>

            <div>
              <Label htmlFor="notes">Catatan / Keluhan (Opsional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Jelaskan keluhan atau catatan khusus..."
                className="mt-1"
                rows={3}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div>
          <div className="bg-gray-50 dark:bg-gray-750 rounded-2xl p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Ringkasan Booking
            </h3>

            {/* Service */}
            <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center text-xl">
                🦷
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{service?.name}</p>
                <p className="text-sm text-gray-500">{service?.duration} menit</p>
              </div>
            </div>

            {/* Doctor */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <img
                src={doctor?.image || "/placeholder-doctor.jpg"}
                alt={doctor?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{doctor?.name}</p>
                <p className="text-sm text-teal-600 dark:text-teal-400">{doctor?.speciality}</p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center text-xl">
                📅
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {date && formatDate(date)}
                </p>
                <p className="text-sm text-gray-500">
                  Jam {timeSlot?.startTime} - {timeSlot?.endTime}
                </p>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Harga Layanan</span>
                <span className="text-gray-900 dark:text-white">
                  Rp {service?.price.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Sisa (Bayar di Klinik)</span>
                <span className="text-gray-900 dark:text-white">
                  Rp {((service?.price || 0) - (service?.dpAmount || 0)).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="font-semibold text-gray-900 dark:text-white">DP (Bayar Sekarang)</span>
                <span className="font-bold text-xl text-teal-600 dark:text-teal-400">
                  Rp {service?.dpAmount.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 px-4 py-3 rounded-xl text-sm mb-4">
              💡 Sisa pembayaran dapat dilakukan langsung di klinik saat kunjungan.
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 mt-6 border-t border-gray-100 dark:border-gray-700">
        <Button variant="outline" onClick={onBack} disabled={loading}>
          ← Kembali
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-teal-600 hover:bg-teal-700 min-w-[180px]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Memproses...
            </span>
          ) : (
            <>Bayar DP Rp {service?.dpAmount.toLocaleString("id-ID")} →</>
          )}
        </Button>
      </div>
    </div>
  );
}
