import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/lib/auth";

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={session?.user || null} />

      <main className="flex-1">
        {/* Hero Section */}
        <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-32 md:pt-40">
          {/* Decorative elements */}
          <div className="absolute left-10 top-32 hidden opacity-60 md:block">
            <svg className="text-secondary animate-[bounce_3s_infinite]" fill="none" height="80" viewBox="0 0 100 100" width="80">
              <path d="M50 0C55 25 75 45 100 50C75 55 55 75 50 100C45 75 25 55 0 50C25 45 45 25 50 0Z" fill="currentColor"></path>
            </svg>
          </div>
          <div className="absolute right-20 top-40 hidden opacity-60 md:block">
            <svg className="text-accent-yellow animate-[bounce_4s_infinite]" fill="none" height="60" viewBox="0 0 100 100" width="60">
              <circle cx="50" cy="50" fill="currentColor" r="50"></circle>
            </svg>
          </div>

          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              {/* Text Content */}
              <div className="relative z-10 flex flex-col items-start gap-6 text-left order-2 md:order-1">
                <div className="inline-flex -rotate-2 items-center rounded-full border-2 border-foreground bg-accent-yellow px-4 py-1 text-sm font-bold shadow-pop-sm">
                  👋 Klinik Gigi Ramah & Menyenangkan
                </div>
                <h1 className="relative font-display text-5xl font-black leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                  Bebaskan Tawa,<br />
                  <span className="relative inline-block text-primary">
                    Pancarkan Pesona!
                    <div className="absolute -bottom-4 left-0 w-full flex flex-col gap-1.5">
                      <div className="h-2 w-full bg-secondary rounded-full"></div>
                      <div className="h-2 w-full bg-secondary rounded-full"></div>
                    </div>
                  </span>
                </h1>
                <p className="max-w-md text-lg font-medium text-foreground-muted md:text-xl">
                  Wujudkan senyum impianmu tanpa rasa takut! Nikmati perawatan gigi dengan teknologi modern dalam suasana yang asyik dan menenangkan.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link href="/booking">
                    <button className="flex h-14 min-w-[200px] items-center justify-center rounded-full bg-primary border-2 border-foreground px-8 text-lg font-bold text-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                      🗓️ Booking Sekarang
                    </button>
                  </Link>
                  <Link href="#services">
                    <button className="flex h-14 min-w-[200px] items-center justify-center rounded-full bg-white border-2 border-foreground px-8 text-lg font-bold text-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-gray-100 transition-all">
                      <span className="material-symbols-outlined mr-2">medical_services</span>
                      Lihat Layanan
                    </button>
                  </Link>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative flex justify-center order-1 md:order-2">
                <div className="absolute inset-0 -rotate-6 scale-105 bg-accent-purple opacity-30 blur-2xl rounded-[60%_40%_30%_70%/60%_30%_70%_40%]"></div>
                <div className="relative z-10 h-[350px] w-full overflow-hidden border-4 border-foreground bg-primary/10 shadow-pop md:h-[500px] md:w-[450px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%]">
                  <img
                    alt="Smiling doctor"
                    className="h-full w-full object-cover mix-blend-multiply opacity-90"
                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"
                  />
                </div>
                {/* Trust badge */}
                <div className="absolute -bottom-6 -left-4 z-20 rotate-6 rounded-xl border-2 border-foreground bg-white p-4 shadow-pop md:left-0 md:bottom-10">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-500">Terpercaya</span>
                      <span className="font-bold text-foreground">1000+ Pasien</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="py-20 bg-white border-y-2 border-foreground relative z-20" id="features">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: "sentiment_satisfied", title: "Painless Treatment", desc: "Teknologi anestesi terbaru untuk pengalaman minim rasa sakit.", color: "bg-accent-yellow" },
                { icon: "child_care", title: "Ramah Anak", desc: "Pendekatan psikologis khusus agar si kecil tidak takut ke dokter gigi.", color: "bg-accent-purple" },
                { icon: "health_and_safety", title: "Steril & Higienis", desc: "Alat medis berstandar internasional dengan proses sterilisasi ketat.", color: "bg-secondary" },
                { icon: "payments", title: "Harga Transparan", desc: "Tidak ada biaya tersembunyi. Semua dijelaskan di awal perawatan.", color: "bg-primary" },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 bg-background rounded-2xl border-2 border-foreground shadow-pop hover:-translate-y-1 transition-transform">
                  <div className={`w-16 h-16 ${feature.color} rounded-full border-2 border-foreground flex items-center justify-center mb-4 shadow-pop-sm`}>
                    <span className={`material-symbols-outlined text-3xl ${feature.color === 'bg-primary' ? 'text-white' : ''}`}>{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Bento Grid */}
        <section className="relative bg-background py-24" id="services">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="mb-16 text-center">
              <span className="mb-4 inline-block rounded-full bg-accent-purple/20 px-4 py-1 text-sm font-bold uppercase tracking-wider text-primary">Layanan Unggulan</span>
              <h2 className="mb-4 font-display text-4xl font-black text-foreground md:text-5xl">Solusi Gigi Lengkap</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">Pilih perawatan yang tepat untuk kebutuhan senyum Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Main service - large card */}
              <div className="group relative flex flex-col justify-between rounded-[2rem] border-2 border-foreground bg-white p-8 shadow-card hover:shadow-pop lg:col-span-2 lg:row-span-2 overflow-hidden transition-all">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-[4rem] bg-accent-yellow/30 z-0"></div>
                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-foreground bg-accent-purple text-foreground shadow-sm">
                    <span className="material-symbols-outlined text-3xl">grid_on</span>
                  </div>
                  <h4 className="mb-3 text-3xl font-black text-foreground">Pemasangan Behel (Orthodontic)</h4>
                  <p className="mb-6 text-gray-600 max-w-md">Rapikan susunan gigi Anda untuk fungsi pengunyahan yang lebih baik dan estetika maksimal. Tersedia berbagai jenis bracket: Metal, Ceramic, hingga Sapphire.</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-3 py-1 bg-background border border-foreground rounded-lg text-xs font-bold">Metal Braces</span>
                    <span className="px-3 py-1 bg-background border border-foreground rounded-lg text-xs font-bold">Clear Aligner</span>
                    <span className="px-3 py-1 bg-background border border-foreground rounded-lg text-xs font-bold">Kontrol Rutin</span>
                  </div>
                </div>
                <div className="relative z-10 mt-auto flex items-center justify-between border-t-2 border-dashed border-gray-200 pt-6">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Harga Mulai Dari</p>
                    <p className="text-2xl font-black text-primary">Rp 5.000.000</p>
                  </div>
                  <Link href="/booking?service=ortho">
                    <button className="rounded-full bg-primary border-2 border-foreground px-6 py-3 text-white font-bold shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                      Konsultasi
                    </button>
                  </Link>
                </div>
              </div>

              {/* Smaller service cards */}
              {[
                { icon: "dentistry", title: "Scaling Gigi", desc: "Bersihkan karang gigi secara menyeluruh.", price: "Rp 300.000", color: "bg-primary", textColor: "text-white", slug: "scaling" },
                { icon: "healing", title: "Tambal Estetik", desc: "Perbaikan gigi berlubang warna natural.", price: "Rp 400.000", color: "bg-accent-yellow", textColor: "", slug: "tambal" },
                { icon: "medical_services", title: "Cabut Gigi", desc: "Prosedur aman dan minim rasa sakit.", price: "Rp 500.000", color: "bg-secondary", textColor: "text-white", slug: "cabut" },
                { icon: "auto_awesome", title: "Bleaching", desc: "Putihkan gigi instan dalam sekali kunjungan.", price: "Rp 2.500.000", color: "bg-gray-900", textColor: "text-white", slug: "bleaching" },
              ].map((service, i) => (
                <div key={i} className="group relative flex flex-col justify-between rounded-[2rem] border-2 border-foreground bg-white p-6 shadow-card hover:shadow-pop transition-all">
                  <div>
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-foreground ${service.color} ${service.textColor}`}>
                      <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                    </div>
                    <h4 className="mb-2 text-xl font-bold text-foreground">{service.title}</h4>
                    <p className="mb-4 text-sm text-gray-600">{service.desc}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 font-bold">Mulai Dari</p>
                    <p className="font-bold text-lg text-secondary">{service.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white py-24" id="how-it-works">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="font-display text-4xl font-black text-foreground md:text-5xl">Cara Booking</h2>
              <p className="mt-4 text-lg text-gray-600">3 Langkah mudah menuju senyum sehat.</p>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Dashed line connector */}
              <div className="absolute top-8 left-0 hidden w-full px-16 md:block z-0">
                <div className="h-1 w-full border-t-4 border-dashed border-gray-200"></div>
              </div>
              {[
                { step: "1", title: "Pilih Jadwal", desc: "Tentukan hari dan jam yang sesuai dengan kesibukanmu.", color: "bg-primary text-white" },
                { step: "2", title: "Bayar DP", desc: "Lakukan pembayaran uang muka untuk mengamankan slot antrian.", color: "bg-accent-yellow text-foreground" },
                { step: "3", title: "Datang", desc: "Kunjungi klinik kami dan nikmati perawatan terbaik.", color: "bg-accent-purple text-foreground" },
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-foreground ${item.color} text-xl font-bold shadow-pop`}>
                    {item.step}
                  </div>
                  <h4 className="mb-2 text-xl font-bold text-foreground">{item.title}</h4>
                  <p className="text-sm text-gray-600 px-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Doctors Section */}
        <section className="bg-background py-20 relative overflow-hidden" id="doctors">
          <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-accent-yellow/20 blur-3xl"></div>
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-display text-4xl font-black text-foreground md:text-5xl">Tim Dokter Super</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">Lebih dari sekadar dokter gigi, kami adalah sahabat untuk senyum Anda.</p>
            </div>

            <div className="flex flex-col gap-12">
              {/* Doctor 1 */}
              <div className="group relative flex flex-col md:flex-row items-center gap-8 rounded-[2.5rem] border-2 border-foreground bg-white p-8 shadow-card transition-all hover:shadow-pop hover:-translate-y-1">
                <div className="relative w-full md:w-1/3 shrink-0 flex justify-center">
                  <div className="absolute inset-0 bg-accent-yellow rounded-full rotate-6 border-2 border-foreground translate-y-2 translate-x-2"></div>
                  <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-foreground bg-white">
                    <img alt="drg. Siti Aminah" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80" />
                  </div>
                  <div className="absolute -bottom-2 right-4 bg-white border-2 border-foreground px-4 py-1 rounded-full shadow-pop-sm rotate-3">
                    <span className="text-sm font-bold">⭐ "The Gentle Hands"</span>
                  </div>
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-bold text-primary mb-3">
                    <span className="material-symbols-outlined text-base">favorite</span>
                    Spesialis Gigi Anak & Konservasi
                  </div>
                  <h3 className="text-3xl font-black text-foreground mb-2">drg. Siti Aminah Sp.KG</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    "Banyak pasien yang datang dengan rasa takut, tapi pulang dengan senyuman lega. Misi saya adalah membuktikan bahwa perawatan gigi itu <strong>nyaman dan menenangkan</strong>."
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <span className="px-3 py-1 rounded-lg border-2 border-foreground bg-background text-xs font-bold">10+ Tahun Pengalaman</span>
                    <span className="px-3 py-1 rounded-lg border-2 border-foreground bg-background text-xs font-bold">Ramah Anak</span>
                    <span className="px-3 py-1 rounded-lg border-2 border-foreground bg-background text-xs font-bold">Painless Treatment</span>
                  </div>
                </div>
              </div>

              {/* Doctor 2 */}
              <div className="group relative flex flex-col md:flex-row-reverse items-center gap-8 rounded-[2.5rem] border-2 border-foreground bg-background p-8 shadow-card transition-all hover:shadow-pop hover:-translate-y-1">
                <div className="relative w-full md:w-1/3 shrink-0 flex justify-center">
                  <div className="absolute inset-0 bg-secondary rounded-full -rotate-3 border-2 border-foreground translate-y-2 -translate-x-2"></div>
                  <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-foreground bg-white">
                    <img alt="drg. Budi Santoso" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80" />
                  </div>
                  <div className="absolute -bottom-2 left-4 bg-white border-2 border-foreground px-4 py-1 rounded-full shadow-pop-sm -rotate-2">
                    <span className="text-sm font-bold">✨ "Mr. Perfectionist"</span>
                  </div>
                </div>
                <div className="w-full md:w-2/3 text-center md:text-right">
                  <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1 text-sm font-bold text-secondary mb-3">
                    <span className="material-symbols-outlined text-base">grid_on</span>
                    Spesialis Ortodonti (Behel)
                  </div>
                  <h3 className="text-3xl font-black text-foreground mb-2">drg. Budi Santoso Sp.Ort</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    "Senyum rapi bukan cuma soal estetika, tapi juga kepercayaan diri. Saya menggabungkan <strong>presisi medis dengan suasana santai</strong> yang penuh canda."
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-end gap-3">
                    <span className="px-3 py-1 rounded-lg border-2 border-foreground bg-white text-xs font-bold">8+ Tahun Pengalaman</span>
                    <span className="px-3 py-1 rounded-lg border-2 border-foreground bg-white text-xs font-bold">Ahli Estetika</span>
                    <span className="px-3 py-1 rounded-lg border-2 border-foreground bg-white text-xs font-bold">Konsultasi Detail</span>
                  </div>
                </div>
              </div>
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
              ✨ Slot Terbatas Hari Ini!
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 leading-tight">
              Jangan Tunda Lagi,<br />
              Waktunya Tampil Percaya Diri!
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href="/booking">
                <button className="flex h-14 min-w-[250px] items-center justify-center rounded-full bg-foreground border-2 border-foreground px-10 text-xl font-bold text-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all gap-3">
                  <span>Booking Sekarang</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </Link>
              <Link href="https://wa.me/6281234567890" target="_blank">
                <button className="flex h-14 min-w-[250px] items-center justify-center rounded-full bg-white border-2 border-foreground px-10 text-xl font-bold text-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all gap-3">
                  <span className="material-symbols-outlined">chat</span>
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
