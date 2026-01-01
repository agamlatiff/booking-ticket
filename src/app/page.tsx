import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/auth";

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
                Dapatkan perawatan gigi terbaik dengan teknologi modern dan dokter berpengalaman.
                Booking jadwal konsultasi Anda sekarang dengan mudah.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700 h-12 px-8 rounded-full text-lg w-full sm:w-auto shadow-lg shadow-teal-600/20">
                    Buat Janji Temu
                  </Button>
                </Link>
                <Link href="/#dokter">
                  <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-lg border-gray-300 hover:bg-gray-50 w-full sm:w-auto">
                    Lihat Dokter
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
        <section id="layanan" className="py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Layanan Unggulan</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Kami menyediakan layanan perawatan gigi komprehensif dengan standar medis tertinggi untuk memastikan kesehatan senyum Anda.
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
                <div key={i} className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-750 hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100 dark:border-gray-700">
                  <div className="text-4xl mb-6 bg-white dark:bg-gray-900 w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm group-hover:scale-110 transition-transform">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">{service.desc}</p>
                  <Link href={service.link} className="text-teal-600 font-medium hover:text-teal-700 flex items-center gap-2 group-hover:gap-3 transition-all">
                    Booking Layanan ini <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
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
