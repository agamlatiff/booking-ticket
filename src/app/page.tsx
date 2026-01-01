import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦷</span>
            <span className="font-bold text-xl text-teal-600 dark:text-teal-400">
              Senyum Sejahtera
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#" className="hover:text-teal-600">Beranda</Link>
            <Link href="#layanan" className="hover:text-teal-600">Layanan</Link>
            <Link href="#dokter" className="hover:text-teal-600">Dokter</Link>
            <Link href="/dashboard" className="hover:text-teal-600">Dashboard</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-gray-600 hover:text-teal-600">
                Masuk
              </Button>
            </Link>
            <Link href="/booking">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6">
                Booking Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
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
                Dapatkan perawatan gigi terbaik dengan teknologi modern dan dokter berpengalaman.
                Booking jadwal konsultasi Anda sekarang dengan mudah.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 h-12 px-8 rounded-full text-lg w-full sm:w-auto">
                    Buat Janji Temu
                  </Button>
                </Link>
                <Link href="/schedule">
                  <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-lg border-gray-300 hover:bg-gray-50 w-full sm:w-auto">
                    Lihat Jadwal
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-[600px] h-[600px] bg-teal-200/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-200/20 blur-[100px] rounded-full pointer-events-none" />
        </section>

        {/* Services Highlight */}
        <section id="layanan" className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Layanan Unggulan</h2>
              <p className="text-gray-500">Solusi lengkap untuk kesehatan gigi dan mulut Anda</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: "🦷", title: "Pemeriksaan Rutin", desc: "Cek kesehatan gigi menyeluruh untuk pencegahan dini." },
                { icon: "✨", title: "Pemutihan Gigi", desc: "Kembalikan cerah alami senyum Anda dengan aman." },
                { icon: "🔧", title: "Kawat Gigi", desc: "Perbaiki struktur gigi untuk estetika dan fungsi optimal." },
              ].map((service, i) => (
                <div key={i} className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:-translate-y-1 transition-transform border border-gray-100 dark:border-gray-700">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Klinik Gigi Senyum Sejahtera. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
