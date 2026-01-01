import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/lib/auth";
import {
  CalendarCheck,
  MapPin,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Clock,
  UserCheck
} from "lucide-react";

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarAuth user={session?.user || null} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-teal-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                Klinik Gigi Terpercaya Keluarga Anda
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                Senyum Sehat, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
                  Hidup Lebih Bahagia
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Dapatkan perawatan gigi terbaik dengan teknologi modern, dokter berpengalaman, dan pengalaman yang nyaman.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 h-12 px-8 rounded-full text-lg w-full sm:w-auto shadow-lg shadow-teal-600/20">
                    Buat Janji Temu
                  </Button>
                </Link>
                <Link href="#doctors">
                  <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-lg border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 w-full sm:w-auto">
                    Lihat Dokter
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-[600px] h-[600px] bg-teal-200/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200/20 blur-[100px] rounded-full pointer-events-none" />
        </section>

        {/* Features / Keunggulan Section */}
        <section className="py-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheck, title: "Steril & Higienis", desc: "Protokol sterilisasi tingkat tinggi demi keamanan pasien." },
                { icon: Stethoscope, title: "Dokter Ahli", desc: "Ditangani langsung oleh dokter spesialis berpengalaman." },
                { icon: Sparkles, title: "Teknologi Modern", desc: "Peralatan canggih untuk perawatan presisi & minim rasa sakit." },
                { icon: MapPin, title: "Lokasi Strategis", desc: "Akses mudah di pusat kota dengan parkir luas." },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Highlight */}
        <section id="layanan" className="py-24 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-teal-600 font-semibold uppercase tracking-wider text-sm">Layanan Kami</span>
              <h2 className="text-3xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">Solusi Lengkap Kesehatan Gigi</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Dari perawatan rutin hingga bedah kompleks, kami siap melayani kebutuhan Anda.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🦷",
                  title: "Pemeriksaan & Scaling",
                  desc: "Pembersihan karang gigi menyeluruh dan pemeriksaan rutin untuk mencegah masalah gigi.",
                  link: "/booking?service=scaling"
                },
                {
                  icon: "✨",
                  title: "Estetika & Bleaching",
                  desc: "Layanan pemutihan gigi dan veneer untuk senyum yang lebih cerah dan percaya diri.",
                  link: "/booking?service=bleaching"
                },
                {
                  icon: "🔧",
                  title: "Kawat Gigi (Orthodonti)",
                  desc: "Perbaikan struktur gigi yang tidak rapi dengan berbagai pilihan kawat gigi modern.",
                  link: "/booking?service=ortho"
                },
              ].map((service, i) => (
                <div key={i} className="group p-8 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100 dark:border-gray-700">
                  <div className="text-4xl mb-6 bg-teal-50 dark:bg-teal-900/20 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:bg-teal-100 transition-colors">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">{service.desc}</p>
                  <Link href={service.link} className="text-teal-600 font-medium hover:text-teal-700 flex items-center gap-2 group-hover:gap-3 transition-all">
                    Booking sekarang <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/services">
                <Button variant="outline" className="rounded-full">Lihat Semua Layanan</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <span className="text-teal-600 font-semibold uppercase tracking-wider text-sm">Mudah & Cepat</span>
                <h2 className="text-3xl font-bold mt-2 mb-6 text-gray-900 dark:text-white">Cara Booking Antrian</h2>
                <p className="text-gray-500 mb-8 text-lg">Tidak perlu antri lama di klinik. Cukup 4 langkah mudah dari handphone Anda.</p>

                <div className="space-y-8">
                  {[
                    { step: "01", title: "Pilih Layanan & Dokter", desc: "Cari layanan yang Anda butuhkan dan pilih dokter favorit Anda." },
                    { step: "02", title: "Pilih Waktu", desc: "Lihat slot waktu yang tersedia dan pilih yang cocok dengan jadwalmu." },
                    { step: "03", title: "Isi Data Diri", desc: "Lengkapi data pasien untuk rekam medis (otomatis jika sudah login)." },
                    { step: "04", title: "Datang ke Klinik", desc: "Dapatkan E-Ticket dan tunjukkan saat datang ke klinik." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold font-mono">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 rounded-3xl min-h-[400px] flex items-center justify-center relative overflow-hidden">
                {/* Placeholder illustration */}
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-blue-500/20" />
                <div className="text-center p-8 relative z-10">
                  <CalendarCheck className="w-24 h-24 text-teal-600 mx-auto mb-4 opacity-80" />
                  <p className="font-medium text-gray-600 dark:text-gray-300">Ilustrasi Booking App Interface</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Doctors Preview */}
        <section id="doctors" className="py-24 bg-teal-50/50 dark:bg-gray-800/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Dokter Kami</h2>
              <p className="text-gray-500">Tim dokter gigi profesional yang siap merawat senyum Anda</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                    {/* Placeholder Image */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <UserCheck className="w-12 h-12" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">Drg. Nama Dokter</h3>
                    <p className="text-teal-600 text-sm font-medium mb-2">Spesialis Orthodonti</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <Clock className="w-3 h-3" /> 5 Tahun Pengalaman
                    </div>
                    <Link href={`/booking?doctor=${i}`} className="block w-full">
                      <Button variant="secondary" className="w-full h-8 text-xs bg-teal-50 text-teal-700 hover:bg-teal-100">
                        Lihat Jadwal
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-teal-600 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap untuk Senyum Lebih Segar?</h2>
            <p className="text-teal-100 mb-8 max-w-2xl mx-auto text-lg">
              Jangan tunda kesehatan gigi Anda. Jadwalkan konsultasi hari ini dan rasakan perbedaannya.
            </p>
            <Link href="/booking">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 h-14 px-10 rounded-full text-lg font-bold shadow-xl">
                Booking Sekarang
              </Button>
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
