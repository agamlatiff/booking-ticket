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
        <section className="relative py-20 lg:py-28 bg-gradient-to-br from-teal-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Text Content */}
              <div className="flex-1 text-center lg:text-left">
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
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Dapatkan perawatan gigi terbaik dengan teknologi modern, dokter berpengalaman, dan pengalaman yang nyaman.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/booking">
                    <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white dark:text-white font-bold h-12 px-8 rounded-full text-lg w-full sm:w-auto shadow-lg shadow-teal-600/20">
                      Buat Janji Temu
                    </Button>
                  </Link>
                  <Link href="#doctors">
                    <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-lg border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-white w-full sm:w-auto">
                      Lihat Dokter
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Hero Image */}
              <div className="flex-1 relative">
                <div className="relative w-full max-w-[500px] aspect-square mx-auto">
                  <div className="absolute inset-0 bg-teal-200 rounded-full blur-[80px] opacity-40 dark:opacity-20 animate-pulse" />
                  <img
                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"
                    alt="Happy Patient Smiling"
                    className="relative w-full h-full object-cover rounded-[3rem] shadow-2xl z-10 border-4 border-white dark:border-gray-800"
                  />
                  <div className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Terpercaya</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">5000+ Pasien</p>
                    </div>
                  </div>
                </div>
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

        {/* Services Highlight - Bento Grid */}
        <section id="layanan" className="py-24 bg-gray-50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-teal-600 font-semibold uppercase tracking-wider text-sm">Layanan Kami</span>
              <h2 className="text-3xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">Solusi Lengkap Kesehatan Gigi</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Dari perawatan rutin hingga bedah kompleks, kami siap melayani kebutuhan Anda dengan teknologi terbaik.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
              {/* Service 1: Implan & Bedah (Large) */}
              <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Stethoscope className="w-48 h-48 text-teal-600" />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/40 text-teal-600 rounded-2xl flex items-center justify-center mb-6 text-2xl">
                      🔧
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Bedah Mulut & Implan</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md text-lg leading-relaxed">
                      Solusi permanen untuk gigi yang hilang dengan teknologi implan titanium terbaru. Prosedur bedah yang aman dan minim rasa sakit oleh spesialis bedah mulut berpengalaman.
                    </p>
                  </div>
                  <Link href="/booking?service=implan" className="inline-flex items-center gap-2 text-teal-600 font-bold mt-8 hover:gap-3 transition-all">
                    Konsultasi Bedah <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </div>

              {/* Service 2: Checkup (Regular) */}
              <div className="group rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center mb-4 text-xl">
                  🦷
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Scalling & Polishing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Pembersihan karang gigi menyeluruh untuk nafas segar dan gusi sehat.
                </p>
                <Link href="/booking?service=scaling" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Booking <span className="material-symbols-outlined text-sm">chevron_right</span>
                </Link>
              </div>

              {/* Service 3: Ortho (Regular) */}
              <div className="group rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center mb-4 text-xl">
                  ✨
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Kawat Gigi (Ortho)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Rapikan struktur gigi Anda dengan berbagai pilihan behel modern.
                </p>
                <Link href="/booking?service=ortho" className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1">
                  Booking <span className="material-symbols-outlined text-sm">chevron_right</span>
                </Link>
              </div>

              {/* Service 4: Bleaching (Regular) */}
              <div className="group rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-xl flex items-center justify-center mb-4 text-xl">
                  💎
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Bleaching Gigi</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Putihkan gigi secara instan dan aman untuk senyum cemerlang.
                </p>
                <Link href="/booking?service=bleaching" className="text-sm font-semibold text-yellow-600 hover:text-yellow-700 flex items-center gap-1">
                  Booking <span className="material-symbols-outlined text-sm">chevron_right</span>
                </Link>
              </div>

              {/* Service 5: Kids (Regular) */}
              <div className="group rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-xl flex items-center justify-center mb-4 text-xl">
                  🎈
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Gigi Anak</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Pendekatan ramah anak untuk pengalaman ke dokter gigi yang menyenangkan.
                </p>
                <Link href="/booking?service=kids" className="text-sm font-semibold text-pink-600 hover:text-pink-700 flex items-center gap-1">
                  Booking <span className="material-symbols-outlined text-sm">chevron_right</span>
                </Link>
              </div>
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
              <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 rounded-3xl min-h-[400px] flex items-center justify-center relative overflow-hidden group">
                <img
                  src="https://images.unsplash.com/photo-1550831107-1553da8c8464?w=800&q=80"
                  alt="Mobile Booking Illustration"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="text-center p-8 relative z-10 text-white">
                  <CalendarCheck className="w-16 h-16 mx-auto mb-4" />
                  <p className="font-medium text-lg">Booking Kapan Saja, Di Mana Saja</p>
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
              {[
                {
                  name: "Drg. Sarah Amalia",
                  role: "Spesialis Orthodonti",
                  exp: "8 Tahun",
                  image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"
                },
                {
                  name: "Drg. Budi Santoso",
                  role: "Bedah Mulut",
                  exp: "12 Tahun",
                  image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80"
                },
                {
                  name: "Drg. Jessica Tan",
                  role: "Estetika Gigi",
                  exp: "5 Tahun",
                  image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80"
                },
                {
                  name: "Drg. Ahmad Rizki",
                  role: "Konservasi Gigi",
                  exp: "7 Tahun",
                  image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80"
                }
              ].map((doc, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 group">
                  <div className="h-64 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">{doc.name}</h3>
                    <p className="text-teal-600 text-sm font-medium mb-3">{doc.role}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <Clock className="w-3 h-3" /> {doc.exp} Pengalaman
                    </div>
                    <Link href={`/booking`} className="block w-full">
                      <Button variant="secondary" className="w-full h-9 text-xs bg-teal-50 text-teal-700 hover:bg-teal-100 font-medium">
                        Lihat Jadwal
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 block md:hidden">
              <Link href="/doctors">
                <Button variant="link" className="text-teal-600">Lihat Semua Dokter &rarr;</Button>
              </Link>
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
