import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";

export default function BookingSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={null} />

      <main className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="container mx-auto max-w-2xl w-full">
          {/* Success Header */}
          <div className="text-center mb-10 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 -z-10 w-64 h-64 bg-accent-yellow/30 rounded-full blur-3xl"></div>
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary rounded-full border-4 border-foreground shadow-pop mb-6">
              <span className="material-symbols-outlined text-5xl text-white">check_circle</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">
              Yey! Booking Berhasil!
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Terima kasih, <span className="font-bold text-foreground">Budi Santoso</span>. Jadwal senyummu sudah kami amankan. Sampai jumpa di klinik!
            </p>
          </div>

          {/* Ticket Card */}
          <div className="bg-white rounded-[2rem] border-2 border-foreground shadow-card relative overflow-hidden mb-8">
            {/* Ticket Header */}
            <div className="h-3 bg-primary border-b-2 border-foreground"></div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* QR Code Side */}
                <div className="flex flex-col items-center justify-center gap-2 shrink-0 md:border-r-2 md:border-dashed md:border-gray-200 md:pr-8">
                  <div className="bg-white p-2 border-2 border-foreground rounded-2xl shadow-sm">
                    <span className="material-symbols-outlined text-[100px] leading-none text-foreground">qr_code_2</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-gray-400 tracking-widest">#BK-882910</span>
                  <div className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700 border border-green-200">
                    <span className="block w-2 h-2 rounded-full bg-green-500"></span>
                    PAID
                  </div>
                </div>

                {/* Details Side */}
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-black text-foreground mb-1">Pemasangan Behel</h2>
                      <p className="text-sm font-medium text-gray-500">Senin, 12 Agustus 2024 • 11:00 WIB</p>
                    </div>
                    <div className="hidden sm:block">
                      <span className="material-symbols-outlined text-4xl text-accent-yellow">verified</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Doctor */}
                    <div className="bg-background p-3 rounded-xl border border-foreground flex items-center gap-3">
                      <img
                        alt="Dr. Siti"
                        className="w-10 h-10 rounded-full border border-foreground object-cover bg-white"
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80"
                      />
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Dokter</p>
                        <p className="font-bold text-foreground text-sm">drg. Siti Aminah</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-secondary text-lg">location_on</span>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Lokasi</p>
                        <p className="font-bold text-foreground text-sm">Dental Clinic Jakarta Selatan</p>
                        <p className="text-xs text-gray-500">Jl. Kesehatan No. 123</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Divider */}
            <div className="relative h-6 bg-background border-t-2 border-b-2 border-foreground border-dashed flex items-center justify-between px-2">
              <div className="w-full border-t-2 border-dashed border-gray-300 opacity-0"></div>
            </div>

            {/* Ticket Footer */}
            <div className="bg-gray-50 p-6 md:p-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Total Deposit</p>
                  <p className="font-black text-2xl text-primary">Rp 50.000</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 italic mb-1">Sisa pembayaran di klinik</p>
                  <p className="text-sm font-bold text-foreground">Rp 4.950.000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reminder Box */}
          <div className="bg-accent-purple/10 border-2 border-accent-purple rounded-2xl p-4 flex items-start gap-4 mb-8 relative">
            <div className="bg-white rounded-full p-2 border-2 border-accent-purple shrink-0">
              <span className="material-symbols-outlined text-accent-purple">notifications_active</span>
            </div>
            <div>
              <h4 className="font-bold text-foreground text-sm mb-1">Pengingat Ramah 👋</h4>
              <p className="text-sm text-gray-700">
                Mohon datang <span className="font-bold">15 menit lebih awal</span> untuk verifikasi data diri. Jika berhalangan hadir, harap hubungi kami H-1.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-2 rounded-full px-8 py-3 font-bold text-foreground bg-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-full sm:w-auto">
              <span className="material-symbols-outlined">calendar_month</span>
              Add to Calendar
            </button>
            <Link href="/my-bookings" className="w-full sm:w-auto">
              <button className="flex items-center justify-center gap-2 rounded-full px-8 py-3 font-bold text-white bg-foreground border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all w-full">
                <span className="material-symbols-outlined">dashboard</span>
                Ke Dashboard Saya
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
