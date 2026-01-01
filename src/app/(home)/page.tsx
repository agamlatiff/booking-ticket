import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import Link from "next/link";
import prisma from "@/lib/prisma";

// Fetch services and doctors from database
async function getServices() {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    take: 6,
  });
}

async function getDoctors() {
  return prisma.doctor.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  });
}

const HomePage = async () => {
  const [services, doctors] = await Promise.all([getServices(), getDoctors()]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-16 pb-24 px-6 overflow-hidden bg-gradient-to-br from-teal-50 via-white to-teal-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-teal-900/20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-teal-200 dark:text-teal-800" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900/50 px-4 py-2 rounded-full text-sm font-medium mb-6 text-teal-700 dark:text-teal-300">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                Klinik Gigi Terpercaya Sejak 2010
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-gray-900 dark:text-white">
                Senyum Sehat,{" "}
                <span className="text-teal-600 dark:text-teal-400">Hidup Bahagia</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mb-8 leading-relaxed">
                Klinik Gigi Senyum Sejahtera menyediakan perawatan gigi berkualitas
                dengan dokter berpengalaman dan teknologi modern.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/booking"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-teal-600/25 flex items-center justify-center gap-2"
                >
                  <span>📅</span>
                  Booking Sekarang
                </Link>
                <Link
                  href="#layanan"
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2"
                >
                  Lihat Layanan
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 mt-10 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-teal-500">✓</span>
                  <span>10.000+ Pasien Puas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-teal-500">✓</span>
                  <span>Dokter Bersertifikat</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-teal-500">✓</span>
                  <span>Alat Modern</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-teal-600 rounded-3xl blur-2xl opacity-20" />
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600"
                  alt="Dental Care"
                  className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
                />

                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center text-2xl">
                      🦷
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">15+ Tahun</p>
                      <p className="text-sm text-gray-500">Pengalaman</p>
                    </div>
                  </div>
                </div>

                {/* Floating Card 2 */}
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">H</div>
                      <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center text-white text-xs font-bold">S</div>
                      <div className="w-8 h-8 bg-teal-300 rounded-full flex items-center justify-center text-white text-xs font-bold">B</div>
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-gray-900 dark:text-white">3 Dokter</p>
                      <p className="text-gray-500 text-xs">Siap Melayani</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="layanan" className="py-20 px-6 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4 inline-block">
              Layanan Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Perawatan Gigi Lengkap
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Kami menyediakan berbagai layanan perawatan gigi dengan harga terjangkau dan hasil terbaik
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/booking?service=${service.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-teal-200 dark:hover:border-teal-700 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.slug)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-400">Mulai dari</span>
                        <p className="font-bold text-teal-600 dark:text-teal-400">
                          Rp {service.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <span className="text-xs bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 px-2 py-1 rounded-full">
                        DP Rp {service.dpAmount.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-10">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:underline"
            >
              Lihat Semua Layanan
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="dokter" className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4 inline-block">
              Tim Dokter
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Dokter Berpengalaman
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ditangani oleh dokter gigi profesional yang berdedikasi untuk kesehatan gigi Anda
            </p>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="group bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-teal-600 dark:text-teal-400 text-sm font-medium mb-3">
                    {doctor.speciality}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                    {doctor.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-teal-600 dark:bg-teal-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cara Booking yang Mudah
          </h2>
          <p className="text-teal-100 mb-12 max-w-xl mx-auto">
            Hanya 3 langkah sederhana untuk mendapatkan jadwal perawatan gigi Anda
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                1️⃣
              </div>
              <h3 className="font-bold text-xl mb-2">Pilih Layanan</h3>
              <p className="text-teal-100 text-sm">
                Pilih jenis perawatan gigi yang Anda butuhkan
              </p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                2️⃣
              </div>
              <h3 className="font-bold text-xl mb-2">Pilih Jadwal</h3>
              <p className="text-teal-100 text-sm">
                Pilih dokter dan waktu yang sesuai dengan Anda
              </p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                3️⃣
              </div>
              <h3 className="font-bold text-xl mb-2">Bayar DP</h3>
              <p className="text-teal-100 text-sm">
                Bayar DP untuk konfirmasi, sisa dibayar di klinik
              </p>
            </div>
          </div>

          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-xl font-bold text-lg mt-12 hover:bg-teal-50 transition-colors shadow-lg"
          >
            Booking Sekarang
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800/50 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-around items-center text-center gap-10">
          <div>
            <p className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">
              10.000+
            </p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Pasien Puas
            </p>
          </div>
          <div className="w-px h-12 bg-gray-200 dark:bg-gray-700 hidden md:block" />
          <div>
            <p className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">
              15+
            </p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Tahun Pengalaman
            </p>
          </div>
          <div className="w-px h-12 bg-gray-200 dark:bg-gray-700 hidden md:block" />
          <div>
            <p className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">
              7+
            </p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Layanan Tersedia
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Siap untuk Senyum Lebih Sehat?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Booking jadwal perawatan gigi Anda sekarang dan dapatkan senyum yang Anda impikan
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg shadow-teal-600/25"
            >
              Booking Sekarang
            </Link>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
              <span>💬</span>
              Chat via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Helper function for service icons
function getServiceIcon(slug: string): string {
  const icons: Record<string, string> = {
    "scaling-polishing": "🪥",
    "cabut-gigi": "🦷",
    "tambal-gigi": "🔧",
    "veneer-gigi": "✨",
    "behel-kawat": "😁",
    "bleaching": "🌟",
    "konsultasi": "💬",
  };
  return icons[slug] || "🦷";
}

export default HomePage;
