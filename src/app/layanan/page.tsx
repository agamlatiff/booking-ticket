import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/lib/auth";

// Service data - later this will come from API
const services = [
  {
    id: "orthodontics",
    name: "Orthodontics (Behel)",
    category: "Estetika",
    description: "Rapikan struktur gigi dan rahang dengan berbagai pilihan kawat gigi modern yang nyaman.",
    icon: "sentiment_very_satisfied",
    iconBg: "bg-[#FFF3E0]",
    iconColor: "text-secondary",
    hoverColor: "group-hover:bg-accent-yellow group-hover:text-foreground",
    featured: true,
  },
  {
    id: "scaling",
    name: "Scaling & Polishing",
    category: "Pencegahan",
    description: "Bersihkan karang gigi yang membandel agar nafas lebih segar dan gusi lebih sehat.",
    icon: "clean_hands",
    iconBg: "bg-[#E0F2F1]",
    iconColor: "text-primary",
    hoverColor: "group-hover:bg-primary group-hover:text-white",
  },
  {
    id: "whitening",
    name: "Teeth Whitening",
    category: "Estetika",
    description: "Kembalikan warna putih alami gigimu dengan perawatan bleaching yang aman dan instan.",
    icon: "wb_sunny",
    iconBg: "bg-[#F3E5F5]",
    iconColor: "text-accent-purple",
    hoverColor: "group-hover:bg-accent-purple group-hover:text-foreground",
  },
  {
    id: "kids-dentistry",
    name: "Kids Dentistry",
    category: "Anak",
    description: "Pendekatan khusus untuk si kecil agar tidak takut ke dokter gigi, edukatif dan menyenangkan.",
    icon: "child_care",
    iconBg: "bg-[#FFFDE7]",
    iconColor: "text-accent-yellow",
    hoverColor: "group-hover:bg-accent-yellow group-hover:text-foreground",
  },
  {
    id: "implant",
    name: "Dental Implant",
    category: "Bedah",
    description: "Solusi permanen untuk mengganti gigi yang hilang agar fungsi kunyah kembali optimal.",
    icon: "hardware",
    iconBg: "bg-[#E1F5FE]",
    iconColor: "text-gray-400",
    hoverColor: "group-hover:bg-gray-200 group-hover:text-foreground",
  },
  {
    id: "root-canal",
    name: "Root Canal Treatment",
    category: "Konservasi",
    description: "Perawatan saluran akar untuk menyelamatkan gigi yang terinfeksi parah tanpa perlu dicabut.",
    icon: "medical_services",
    iconBg: "bg-[#FFEBEE]",
    iconColor: "text-secondary",
    hoverColor: "group-hover:bg-secondary group-hover:text-white",
  },
];

const categories = ["Semua Layanan", "Estetika", "Anak", "Bedah", "Konservasi", "Pencegahan"];

export default async function LayananPage() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={session?.user || null} />

      <main className="flex-1 pt-28 md:pt-36">
        {/* Hero Header */}
        <section className="relative px-6 pb-20">
          {/* Decorative elements */}
          <div className="absolute left-10 top-20 h-32 w-32 animate-[spin_12s_linear_infinite] rounded-full border-2 border-dashed border-foreground text-gray-200 opacity-50"></div>
          <div className="absolute right-0 top-10 -z-10 opacity-30">
            <svg className="text-secondary" height="300" viewBox="0 0 200 200" width="300" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.2,22.9,71.3,34.5C60.4,46.1,49.9,55.7,38.1,63.1C26.3,70.5,13.2,75.7,-0.7,76.9C-14.6,78.1,-29.2,75.3,-41.7,68.2C-54.2,61.1,-64.6,49.7,-73.1,36.5C-81.6,23.3,-88.2,8.3,-86.6,-5.9C-85,-20.1,-75.2,-33.5,-64,-44.4C-52.8,-55.3,-40.2,-63.7,-27.1,-71.4C-14,-79.1,-0.4,-86.1,14.2,-87.5C28.8,-88.9,40,-84.7,44.7,-76.4Z" fill="currentColor" transform="translate(100 100)"></path>
            </svg>
          </div>

          <div className="container mx-auto max-w-6xl text-center">
            {/* Breadcrumb */}
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-gray-500 justify-center">
              <Link className="hover:text-primary" href="/">Home</Link>
              <span className="material-symbols-outlined text-base">chevron_right</span>
              <span className="text-foreground">Layanan</span>
            </div>

            {/* Title */}
            <h1 className="mb-6 font-display text-4xl font-black leading-tight text-foreground md:text-5xl lg:text-6xl">
              Perawatan Gigi <br className="hidden md:block" />
              Yang Bikin <span className="relative inline-block px-4">
                <span className="absolute inset-0 -skew-y-2 rounded-lg bg-accent-yellow border-2 border-foreground shadow-pop"></span>
                <span className="relative z-10">Happy!</span>
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg font-medium text-gray-700 mb-10">
              Apapun keluhan gigimu, kami punya solusinya. Mulai dari perawatan rutin hingga estetika, semua dilakukan dengan teknologi modern dan sentuhan yang ramah.
            </p>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, i) => (
                <button
                  key={category}
                  className={`rounded-full border-2 border-foreground px-6 py-2 text-sm font-bold shadow-pop hover:translate-y-0.5 hover:shadow-pop-hover transition-all ${i === 0
                      ? "bg-foreground text-white"
                      : "bg-white text-foreground hover:bg-accent-yellow"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="border-t-2 border-foreground bg-white py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group relative flex flex-col overflow-hidden rounded-[2rem] border-2 border-foreground bg-background shadow-pop transition-all hover:-translate-y-2 hover:shadow-card"
                >
                  {/* Icon Area */}
                  <div className={`h-48 w-full overflow-hidden border-b-2 border-foreground ${service.iconBg}`}>
                    <div className="flex h-full w-full items-center justify-center">
                      <span className={`material-symbols-outlined text-8xl ${service.iconColor}`}>
                        {service.icon}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-full border-2 border-foreground bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                        {service.category}
                      </span>
                      {service.featured && (
                        <span className="material-symbols-outlined text-secondary">star</span>
                      )}
                    </div>
                    <h3 className="mb-3 text-2xl font-black text-foreground">{service.name}</h3>
                    <p className="mb-6 text-sm text-gray-600">{service.description}</p>
                    <div className="mt-auto">
                      <Link
                        href={`/layanan/${service.id}`}
                        className={`flex w-full items-center justify-center rounded-xl border-2 border-foreground bg-white py-3 text-sm font-bold shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-hover transition-all ${service.hoverColor}`}
                      >
                        Lihat Detail
                        <span className="material-symbols-outlined ml-2 text-base">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-accent-yellow border-y-2 border-foreground py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full border-2 border-foreground -mr-32 -mt-32 opacity-50 z-0"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-purple rounded-full border-2 border-foreground -ml-24 -mb-24 opacity-50 z-0"></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
            <div className="inline-block bg-white border-2 border-foreground rounded-full px-6 py-2 text-sm font-bold mb-6 shadow-pop rotate-2">
              👋 Bingung Pilih Perawatan?
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 leading-tight">
              Konsultasikan Masalah <br />
              Gigimu Sekarang!
            </h2>
            <p className="mb-10 text-xl font-medium text-foreground/80 max-w-2xl mx-auto">
              Dokter kami siap mendengarkan dan memberikan solusi terbaik untuk senyum sehatmu. Gratis konsultasi awal via WhatsApp.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href="/booking">
                <button className="flex h-14 min-w-[200px] items-center justify-center rounded-full bg-foreground border-2 border-foreground px-10 text-xl font-bold text-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all gap-3">
                  <span>Booking Jadwal</span>
                  <span className="material-symbols-outlined">calendar_month</span>
                </button>
              </Link>
              <Link href="https://wa.me/6281234567890" target="_blank">
                <button className="flex h-14 min-w-[200px] items-center justify-center rounded-full bg-white border-2 border-foreground px-10 text-xl font-bold text-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all gap-3">
                  <span className="material-symbols-outlined text-green-600">chat</span>
                  <span>Chat WhatsApp</span>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
