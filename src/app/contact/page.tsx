import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/lib/auth";

export default async function ContactPage() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={session?.user || null} />

      <main className="flex-1">
        {/* Header */}
        <section className="pt-32 pb-12 md:pt-40 text-center relative overflow-hidden">
          <div className="absolute left-10 top-20 hidden opacity-60 md:block">
            <svg className="text-secondary animate-bounce" fill="none" height="80" viewBox="0 0 100 100" width="80">
              <path d="M50 0C55 25 75 45 100 50C75 55 55 75 50 100C45 75 25 55 0 50C25 45 45 25 50 0Z" fill="currentColor"></path>
            </svg>
          </div>
          <div className="absolute right-20 bottom-10 hidden opacity-60 md:block">
            <svg className="text-accent-yellow animate-bounce" fill="none" height="60" viewBox="0 0 100 100" width="60" style={{ animationDelay: "1s" }}>
              <circle cx="50" cy="50" fill="currentColor" r="50"></circle>
            </svg>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="inline-block rounded-full bg-accent-yellow border-2 border-foreground px-6 py-2 text-sm font-bold uppercase tracking-wider text-foreground mb-6 shadow-pop-sm -rotate-1">
              👋 Kami Siap Membantu
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-black text-foreground mb-6">
              Punya Pertanyaan?<br />
              <span className="text-primary relative inline-block">
                Yuk, Ngobrol!
                <svg className="absolute -bottom-2 w-full h-3 text-secondary" preserveAspectRatio="none" viewBox="0 0 100 10">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3"></path>
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Entah itu pertanyaan soal behel, konsultasi sakit gigi, atau sekadar ingin menyapa, tim kami yang ramah siap mendengarkan.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 relative z-10">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Contact Info & Map */}
              <div className="flex flex-col gap-8">
                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Telepon */}
                  <div className="bg-white p-6 rounded-[2rem] border-2 border-foreground shadow-pop hover:-translate-y-1 transition-transform group">
                    <div className="w-14 h-14 bg-accent-purple rounded-2xl border-2 border-foreground flex items-center justify-center mb-4 shadow-pop-sm group-hover:rotate-6 transition-transform">
                      <span className="material-symbols-outlined text-2xl">call</span>
                    </div>
                    <h3 className="font-black text-xl mb-1 text-foreground">Telepon</h3>
                    <p className="text-gray-600 font-medium">+62 812 3456 7890</p>
                  </div>

                  {/* Email */}
                  <div className="bg-white p-6 rounded-[2rem] border-2 border-foreground shadow-pop hover:-translate-y-1 transition-transform group">
                    <div className="w-14 h-14 bg-secondary rounded-2xl border-2 border-foreground flex items-center justify-center mb-4 shadow-pop-sm group-hover:-rotate-6 transition-transform">
                      <span className="material-symbols-outlined text-2xl text-white">mail</span>
                    </div>
                    <h3 className="font-black text-xl mb-1 text-foreground">Email</h3>
                    <p className="text-gray-600 font-medium text-sm">hello@dentalclinic.id</p>
                  </div>

                  {/* WhatsApp */}
                  <div className="bg-white p-6 rounded-[2rem] border-2 border-foreground shadow-pop hover:-translate-y-1 transition-transform md:col-span-2 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                    <div className="w-16 h-16 bg-[#25D366] text-white rounded-full border-2 border-foreground flex items-center justify-center shrink-0 shadow-pop-sm">
                      <span className="material-symbols-outlined text-3xl">chat</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-xl text-foreground">WhatsApp Chat</h3>
                      <p className="text-gray-600 text-sm font-medium">Respon cepat di jam kerja (09:00 - 21:00)</p>
                    </div>
                    <Link href="https://wa.me/6281234567890" target="_blank">
                      <button className="px-6 py-3 rounded-xl text-sm font-bold bg-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all whitespace-nowrap">
                        Chat Sekarang
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Map */}
                <div className="w-full bg-white p-2 rounded-[2.5rem] border-2 border-foreground shadow-card relative">
                  <div className="w-full h-[350px] rounded-[2rem] border-2 border-foreground overflow-hidden relative z-10">
                    <iframe
                      allowFullScreen
                      height="100%"
                      loading="lazy"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24727142646!2d106.77663278556093!3d-6.229746499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%20Selatan%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1715671000000!5m2!1sen!2sid"
                      style={{ border: 0 }}
                      width="100%"
                    ></iframe>
                  </div>
                  <div className="absolute -top-4 -right-2 z-20 bg-accent-yellow border-2 border-foreground px-4 py-2 rounded-full shadow-pop rotate-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-foreground">location_on</span>
                    <span className="font-bold text-sm text-foreground">Lokasi Kami</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="bg-white rounded-[2.5rem] border-2 border-foreground p-8 md:p-10 shadow-card relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 bg-primary rounded-lg border-2 border-foreground flex items-center justify-center text-white">
                      <span className="material-symbols-outlined">edit_note</span>
                    </div>
                    <h3 className="text-3xl font-black text-foreground">Kirim Pesan</h3>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-bold text-sm ml-1 text-foreground">Nama Lengkap</label>
                        <input
                          className="w-full bg-background border-2 border-foreground rounded-xl px-4 py-3 focus:outline-none focus:shadow-pop focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all placeholder-gray-400 font-medium"
                          placeholder="John Doe"
                          type="text"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-bold text-sm ml-1 text-foreground">No. WhatsApp</label>
                        <input
                          className="w-full bg-background border-2 border-foreground rounded-xl px-4 py-3 focus:outline-none focus:shadow-pop focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all placeholder-gray-400 font-medium"
                          placeholder="0812..."
                          type="tel"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-bold text-sm ml-1 text-foreground">Email</label>
                      <input
                        className="w-full bg-background border-2 border-foreground rounded-xl px-4 py-3 focus:outline-none focus:shadow-pop focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all placeholder-gray-400 font-medium"
                        placeholder="john@example.com"
                        type="email"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-bold text-sm ml-1 text-foreground">Topik</label>
                      <div className="relative">
                        <select className="w-full bg-background border-2 border-foreground rounded-xl px-4 py-3 focus:outline-none focus:shadow-pop focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all font-medium appearance-none cursor-pointer">
                          <option>Pilih Topik Pertanyaan</option>
                          <option>Booking Jadwal</option>
                          <option>Konsultasi Umum</option>
                          <option>Informasi Harga</option>
                          <option>Lainnya</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground">
                          <span className="material-symbols-outlined">expand_more</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-bold text-sm ml-1 text-foreground">Pesan</label>
                      <textarea
                        className="w-full bg-background border-2 border-foreground rounded-xl px-4 py-3 focus:outline-none focus:shadow-pop focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all placeholder-gray-400 font-medium resize-none"
                        placeholder="Ceritakan keluhan atau pertanyaanmu..."
                        rows={4}
                      ></textarea>
                    </div>

                    <button
                      type="button"
                      className="w-full bg-primary text-white font-bold text-lg py-4 rounded-xl border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <span>Kirim Pesan</span>
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
