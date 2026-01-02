import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

// Service data - later this will come from database
const servicesData: Record<string, ServiceDetail> = {
  orthodontics: {
    id: "orthodontics",
    name: "Orthodontics (Behel)",
    tagline: "Rapikan Senyum dengan",
    highlight: "Orthodontics",
    category: "Estetika",
    badge: "✨ Layanan Terpopuler",
    description: "Solusi pemasangan kawat gigi (behel) untuk memperbaiki struktur gigi dan rahang. Dapatkan senyum yang lebih rapi, sehat, dan percaya diri dengan berbagai pilihan metode terkini.",
    duration: "18 - 24 Bulan",
    recovery: "1-3 Hari",
    warranty: "Kontrol Rutin",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
    iconBg: "bg-secondary",
    benefits: [
      "Dokter Spesialis Orthodonti (Sp.Ort)",
      "Teknologi 3D Scanning",
      "Cicilan 0% Tersedia",
    ],
    steps: [
      { num: "1", title: "Konsultasi & Rontgen", desc: "Pemeriksaan kondisi gigi, foto rontgen panoramic, dan pencetakan model gigi untuk analisis dokter.", color: "bg-accent-yellow" },
      { num: "2", title: "Scaling & Persiapan", desc: "Pembersihan karang gigi dan penambalan jika diperlukan agar gigi steril sebelum dipasang bracket.", color: "bg-secondary text-white" },
      { num: "3", title: "Pemasangan Bracket", desc: "Proses pemasangan behel pada gigi. Dokter akan memberikan instruksi cara perawatan di rumah.", color: "bg-accent-purple" },
      { num: "4", title: "Kontrol Rutin", desc: "Kunjungan setiap 3-4 minggu sekali untuk penggantian karet dan penyesuaian kawat.", color: "bg-primary text-white" },
    ],
    pricing: [
      { name: "Metal Braces", icon: "🦷", desc: "Pilihan klasik paling efektif dan terjangkau.", price: "5 Juta", features: ["Bracket Metal Kokoh", "Bebas Pilih Warna Karet", "Free Cetak Gigi Awal"], iconBg: "bg-gray-100", popular: false },
      { name: "Ceramic Braces", icon: "✨", desc: "Warna transparan, lebih estetik dan tidak mencolok.", price: "8 Juta", features: ["Bracket Transparan", "Estetika Maksimal", "Free Cleaning Karang Gigi", "Cicilan 0% 12 Bulan"], iconBg: "bg-primary text-white", popular: true },
      { name: "Sapphire / Self Ligating", icon: "💎", desc: "Teknologi minim rasa sakit dan durasi lebih cepat.", price: "12 Juta", features: ["Tanpa Karet (Self Ligating)", "Lebih Jarang Kontrol", "Durasi Perawatan Cepat"], iconBg: "bg-accent-purple", popular: false },
    ],
    faq: [
      { q: "Apakah pasang behel itu sakit?", a: "Saat pemasangan awal tidak sakit sama sekali. Namun, 2-3 hari setelahnya mungkin akan terasa sedikit nyeri atau ngilu karena tekanan pada gigi. Ini tanda behel sedang bekerja! Kami akan meresepkan pereda nyeri jika diperlukan." },
      { q: "Berapa lama saya harus pakai behel?", a: "Rata-rata perawatan memakan waktu 18 hingga 24 bulan. Namun, ini sangat bergantung pada tingkat kerumitan kasus gigi Anda dan kedisiplinan kontrol rutin." },
      { q: "Apakah ada pantangan makanan?", a: "Sebaiknya hindari makanan yang terlalu keras (seperti es batu, kacang keras) atau terlalu lengket (seperti permen karamel) karena bisa membuat bracket lepas." },
      { q: "Berapa biaya kontrol rutinnya?", a: "Biaya kontrol rutin mulai dari Rp 200.000 - Rp 300.000 per kunjungan, sudah termasuk penggantian karet behel." },
    ],
  },
  scaling: {
    id: "scaling",
    name: "Scaling & Polishing",
    tagline: "Gigi Bersih dengan",
    highlight: "Scaling",
    category: "Pencegahan",
    badge: "🦷 Perawatan Dasar",
    description: "Pembersihan karang gigi secara menyeluruh untuk menjaga kesehatan gusi dan nafas segar. Sangat direkomendasikan setiap 6 bulan sekali.",
    duration: "30 - 60 Menit",
    recovery: "Langsung",
    warranty: "6 Bulan",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    iconBg: "bg-primary",
    benefits: ["Alat Ultrasonic Modern", "Tidak Sakit", "Hasil Langsung Terasa"],
    steps: [
      { num: "1", title: "Pemeriksaan Awal", desc: "Dokter akan memeriksa kondisi gigi dan gusi Anda.", color: "bg-accent-yellow" },
      { num: "2", title: "Scaling Ultrasonic", desc: "Pembersihan karang gigi menggunakan alat ultrasonic.", color: "bg-primary text-white" },
      { num: "3", title: "Polishing", desc: "Pemolesan gigi untuk hasil yang halus dan mengkilap.", color: "bg-accent-purple" },
      { num: "4", title: "Evaluasi", desc: "Dokter memberikan saran perawatan di rumah.", color: "bg-secondary text-white" },
    ],
    pricing: [
      { name: "Scaling Basic", icon: "🦷", desc: "Pembersihan karang gigi standar.", price: "300 Ribu", features: ["Scaling 1 Rahang", "Pemeriksaan Gigi"], iconBg: "bg-gray-100", popular: false },
      { name: "Scaling Komplit", icon: "✨", desc: "Pembersihan lengkap 2 rahang + polishing.", price: "500 Ribu", features: ["Scaling 2 Rahang", "Polishing", "Free Konsultasi"], iconBg: "bg-primary text-white", popular: true },
      { name: "Deep Scaling", icon: "💎", desc: "Untuk karang gigi yang sudah parah.", price: "800 Ribu", features: ["Deep Cleaning", "Perawatan Gusi", "Obat Kumur Khusus"], iconBg: "bg-accent-purple", popular: false },
    ],
    faq: [
      { q: "Apakah scaling itu sakit?", a: "Scaling modern menggunakan alat ultrasonic yang aman dan minim rasa sakit. Anda mungkin hanya merasakan sensasi getaran ringan." },
      { q: "Berapa lama prosesnya?", a: "Proses scaling biasanya memakan waktu 30-60 menit tergantung tingkat keparahan karang gigi." },
    ],
  },
  whitening: {
    id: "whitening",
    name: "Teeth Whitening",
    tagline: "Gigi Putih Cemerlang dengan",
    highlight: "Bleaching",
    category: "Estetika",
    badge: "☀️ Hasil Instan",
    description: "Kembalikan warna putih alami gigimu dengan perawatan bleaching yang aman dan hasilnya langsung terlihat dalam sekali kunjungan.",
    duration: "60 - 90 Menit",
    recovery: "Langsung",
    warranty: "6-12 Bulan",
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800&q=80",
    iconBg: "bg-accent-purple",
    benefits: ["Hasil Instan", "Aman untuk Email", "Tahan Lama"],
    steps: [
      { num: "1", title: "Konsultasi Warna", desc: "Menentukan shade gigi saat ini dan target yang diinginkan.", color: "bg-accent-yellow" },
      { num: "2", title: "Persiapan", desc: "Pembersihan gigi dan perlindungan gusi.", color: "bg-primary text-white" },
      { num: "3", title: "Aplikasi Gel", desc: "Penerapan gel bleaching dengan aktivasi LED.", color: "bg-accent-purple" },
      { num: "4", title: "Finishing", desc: "Evaluasi hasil dan tips menjaga warna.", color: "bg-secondary text-white" },
    ],
    pricing: [
      { name: "Home Whitening", icon: "🏠", desc: "Kit bleaching untuk dipakai di rumah.", price: "1.5 Juta", features: ["Custom Tray", "Gel 2 Minggu", "Panduan Penggunaan"], iconBg: "bg-gray-100", popular: false },
      { name: "In-Office Whitening", icon: "✨", desc: "Bleaching profesional di klinik.", price: "2.5 Juta", features: ["LED Activation", "Hasil Langsung", "Touch-up Gratis"], iconBg: "bg-primary text-white", popular: true },
      { name: "Premium Package", icon: "💎", desc: "Kombinasi in-office + home kit.", price: "3.5 Juta", features: ["In-Office + Home Kit", "Hasil Maksimal", "Garansi 1 Tahun"], iconBg: "bg-accent-purple", popular: false },
    ],
    faq: [
      { q: "Apakah bleaching aman?", a: "Ya, bleaching yang dilakukan oleh profesional sangat aman dan tidak merusak email gigi." },
      { q: "Berapa lama hasilnya bertahan?", a: "Hasil bleaching bisa bertahan 6-12 bulan dengan perawatan yang baik." },
    ],
  },
};

interface ServiceDetail {
  id: string;
  name: string;
  tagline: string;
  highlight: string;
  category: string;
  badge: string;
  description: string;
  duration: string;
  recovery: string;
  warranty: string;
  image: string;
  iconBg: string;
  benefits: string[];
  steps: { num: string; title: string; desc: string; color: string }[];
  pricing: { name: string; icon: string; desc: string; price: string; features: string[]; iconBg: string; popular: boolean }[];
  faq: { q: string; a: string }[];
}

export default async function LayananDetailPage({ params }: { params: { slug: string } }) {
  const session = await auth();
  const service = servicesData[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={session?.user || null} />

      <main className="flex-1 pt-28 md:pt-36">
        {/* Hero Section */}
        <section className="relative px-6 pb-20">
          <div className="absolute right-0 top-0 -z-10 opacity-30">
            <svg className="text-accent-purple" height="400" viewBox="0 0 200 200" width="400" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.2,22.9,71.3,34.5C60.4,46.1,49.9,55.7,38.1,63.1C26.3,70.5,13.2,75.7,-0.7,76.9C-14.6,78.1,-29.2,75.3,-41.7,68.2C-54.2,61.1,-64.6,49.7,-73.1,36.5C-81.6,23.3,-88.2,8.3,-86.6,-5.9C-85,-20.1,-75.2,-33.5,-64,-44.4C-52.8,-55.3,-40.2,-63.7,-27.1,-71.4C-14,-79.1,-0.4,-86.1,14.2,-87.5C28.8,-88.9,40,-84.7,44.7,-76.4Z" fill="currentColor" transform="translate(100 100)"></path>
            </svg>
          </div>

          <div className="container mx-auto max-w-6xl">
            {/* Breadcrumb */}
            <div className="mb-8 flex items-center gap-2 text-sm font-bold text-gray-500">
              <Link className="hover:text-primary" href="/">Home</Link>
              <span className="material-symbols-outlined text-base">chevron_right</span>
              <Link className="hover:text-primary" href="/layanan">Layanan</Link>
              <span className="material-symbols-outlined text-base">chevron_right</span>
              <span className="text-foreground">{service.name}</span>
            </div>

            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              {/* Text Content */}
              <div className="order-2 md:order-1">
                <div className="mb-6 inline-flex -rotate-2 items-center rounded-full border-2 border-foreground bg-accent-yellow px-4 py-1 text-sm font-bold shadow-pop-sm">
                  {service.badge}
                </div>
                <h1 className="mb-6 font-display text-4xl font-black leading-tight text-foreground md:text-5xl lg:text-6xl">
                  {service.tagline} <br />
                  <span className="text-primary underline decoration-secondary decoration-4 underline-offset-4">{service.highlight}</span>
                </h1>
                <p className="mb-8 text-lg font-medium text-gray-700">{service.description}</p>

                {/* Info badges */}
                <div className="mb-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-xl border-2 border-foreground bg-white px-4 py-2 shadow-pop-hover">
                    <span className="material-symbols-outlined text-secondary">timer</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-500">Durasi</span>
                      <span className="text-sm font-bold">{service.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border-2 border-foreground bg-white px-4 py-2 shadow-pop-hover">
                    <span className="material-symbols-outlined text-accent-purple">healing</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-500">Pemulihan</span>
                      <span className="text-sm font-bold">{service.recovery}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border-2 border-foreground bg-white px-4 py-2 shadow-pop-hover">
                    <span className="material-symbols-outlined text-primary">verified</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-500">Garansi</span>
                      <span className="text-sm font-bold">{service.warranty}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/booking">
                    <button className="flex h-12 items-center justify-center rounded-full bg-foreground border-2 border-foreground px-8 text-base font-bold text-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                      Booking Konsultasi
                    </button>
                  </Link>
                  <a href="#pricing" className="flex h-12 items-center justify-center rounded-full bg-white border-2 border-foreground px-8 text-base font-bold shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    Lihat Harga
                  </a>
                </div>
              </div>

              {/* Image */}
              <div className="order-1 flex justify-center md:order-2">
                <div className="relative">
                  <div className="absolute -right-4 top-10 h-32 w-32 animate-[spin_10s_linear_infinite] rounded-full border-2 border-dashed border-foreground text-gray-200"></div>
                  <div className={`relative z-10 h-[350px] w-full overflow-hidden border-4 border-foreground ${service.iconBg} shadow-pop md:h-[450px] md:w-[400px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%]`}>
                    <img alt={service.name} className="h-full w-full object-cover mix-blend-multiply" src={service.image} />
                  </div>
                  <div className="absolute -bottom-6 -right-6 z-20 -rotate-3 rounded-2xl border-2 border-foreground bg-white p-4 shadow-pop">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-yellow border-2 border-foreground">
                        <span className="material-symbols-outlined">sentiment_very_satisfied</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500">Rating Pasien</p>
                        <div className="flex text-accent-yellow">
                          {[1, 2, 3, 4, 5].map(i => (
                            <span key={i} className="material-symbols-outlined text-sm">star</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="border-y-2 border-foreground bg-white py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <h2 className="mb-6 font-display text-3xl font-black text-foreground">Proses Perawatan</h2>
                <p className="mb-6 text-gray-600">
                  Kami memastikan setiap langkah perjalanan senyum barumu terasa nyaman dan jelas.
                </p>
                <div className="rounded-2xl border-2 border-foreground bg-background p-6 shadow-card">
                  <h4 className="mb-2 text-lg font-bold">Kenapa harus di sini?</h4>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="material-symbols-outlined text-primary">check_circle</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="grid gap-6 md:grid-cols-2">
                  {service.steps.map((step, i) => (
                    <div key={i} className="group relative flex flex-col rounded-[2rem] border-2 border-foreground bg-white p-6 shadow-pop transition-transform hover:-translate-y-1">
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-foreground ${step.color} text-xl font-black shadow-pop-sm`}>
                        {step.num}
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-background py-24" id="pricing">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block rounded-full border border-foreground bg-white px-4 py-1 text-sm font-bold uppercase tracking-wider text-foreground shadow-pop-sm">
                Investasi Senyum
              </span>
              <h2 className="mb-4 font-display text-4xl font-black text-foreground md:text-5xl">Pilihan Paket</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">Transparan tanpa biaya tersembunyi.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {service.pricing.map((pkg, i) => (
                <div key={i} className={`relative flex flex-col rounded-[2.5rem] border-2 border-foreground bg-white p-8 transition-all hover:-translate-y-2 ${pkg.popular ? 'shadow-pop ring-4 ring-primary/20' : 'shadow-card'}`}>
                  {pkg.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full border-2 border-foreground bg-accent-yellow px-4 py-1 text-xs font-bold shadow-sm">
                      PALING LARIS
                    </div>
                  )}
                  <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-foreground ${pkg.iconBg} text-3xl`}>
                    {pkg.icon}
                  </div>
                  <h3 className="text-2xl font-black text-foreground">{pkg.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{pkg.desc}</p>
                  <div className="my-8">
                    <span className="text-sm font-bold text-gray-500">Mulai dari</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-foreground">{pkg.price}</span>
                      <span className="text-sm font-bold text-gray-500">/paket</span>
                    </div>
                  </div>
                  <ul className="mb-8 space-y-4 text-sm font-medium text-gray-600">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">check</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/booking" className={`mt-auto w-full rounded-xl border-2 border-foreground py-3 text-center text-sm font-bold transition-all ${pkg.popular ? 'bg-primary text-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px]' : 'bg-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px]'}`}>
                    Pilih Paket
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-24 relative overflow-hidden" id="faq">
          <div className="absolute -left-10 top-20 h-40 w-40 rounded-full bg-accent-yellow/20 blur-3xl"></div>
          <div className="absolute -right-10 bottom-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="container mx-auto max-w-4xl px-6 relative z-10">
            <div className="mb-12 text-center">
              <h2 className="font-display text-4xl font-black text-foreground">Sering Ditanyakan</h2>
              <p className="mt-4 text-gray-600">Masih ragu? Yuk cari tahu jawabannya di sini.</p>
            </div>
            <div className="space-y-4">
              {service.faq.map((item, i) => (
                <details key={i} className="group rounded-2xl border-2 border-foreground bg-white shadow-pop open:bg-background">
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-foreground text-lg select-none">
                    {item.q}
                    <span className="material-symbols-outlined transition-transform duration-300 group-open:-rotate-180">expand_more</span>
                  </summary>
                  <div className="border-t-2 border-dashed border-gray-200 px-6 pb-6 pt-4 text-gray-600 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-accent-yellow border-t-2 border-foreground relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <pattern height="20" id="dotPattern" patternUnits="userSpaceOnUse" width="20" x="0" y="0">
                <circle cx="2" cy="2" fill="#111817" r="2"></circle>
              </pattern>
              <rect fill="url(#dotPattern)" height="100%" width="100%"></rect>
            </svg>
          </div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
            <div className="inline-block bg-white border-2 border-foreground rounded-full px-6 py-2 text-sm font-bold mb-6 shadow-pop -rotate-2">
              ✨ Promo Spesial Bulan Ini!
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 leading-tight">
              Siap untuk Senyum<br />
              Yang Lebih Sempurna?
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href="/booking">
                <button className="flex h-14 min-w-[200px] items-center justify-center rounded-full bg-foreground border-2 border-foreground px-10 text-xl font-bold text-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all gap-3">
                  <span>Ambil Promo</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </Link>
              <Link href="https://wa.me/6281234567890" target="_blank">
                <button className="flex h-14 min-w-[200px] items-center justify-center rounded-full bg-white border-2 border-foreground px-10 text-xl font-bold text-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all gap-3">
                  <span className="material-symbols-outlined">call</span>
                  <span>Konsultasi WA</span>
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
