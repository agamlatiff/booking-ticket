import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/lib/auth";

// Values data
const values = [
  {
    icon: "sentiment_satisfied",
    title: "Fun & Friendly",
    description: "Suasana klinik yang ceria, wangi, dan jauh dari kesan rumah sakit yang kaku.",
    color: "bg-accent-yellow",
  },
  {
    icon: "shield",
    title: "Safety First",
    description: "Protokol sterilisasi tingkat tinggi demi keamanan dan kenyamanan setiap pasien.",
    color: "bg-secondary",
  },
  {
    icon: "school",
    title: "Expert Team",
    description: "Ditangani langsung oleh dokter spesialis berpengalaman yang sabar dan telaten.",
    color: "bg-primary text-white",
  },
];

// Doctors data
const doctors = [
  {
    id: "siti-aminah",
    name: "drg. Siti Aminah Sp.KG",
    specialty: "Spesialis Gigi Anak",
    quote: "Si paling sabar ngadepin drama gigi si kecil. Punya jurus jitu biar anak nggak nangis!",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
    bgColor: "bg-accent-yellow",
    rotate: "rotate-6",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
  },
  {
    id: "ahmad-wijaya",
    name: "drg. Budi Santoso Sp.Ort",
    specialty: "Spesialis Ortodonti",
    quote: "Perfeksionis banget soal kerapihan gigi. Hobi bikin senyum pasien jadi aesthetic parah.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    bgColor: "bg-secondary",
    rotate: "-rotate-3",
    badgeColor: "bg-secondary/10 text-secondary border-secondary/20",
  },
];

// Facilities data
const facilities = [
  { title: "Ruang Tunggu Cozy", icon: "weekend", size: "large", color: "bg-accent-yellow/30" },
  { title: "Kids Corner", icon: "toys", size: "small", color: "bg-primary/20" },
  { title: "Modern Unit", icon: "dentistry", size: "tall", color: "bg-secondary/20", desc: "Kursi ergonomis dengan TV di langit-langit!" },
  { title: "Photo Booth", icon: "photo_camera", size: "small", color: "bg-accent-purple/20" },
];

export default async function AboutPage() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={session?.user || null} />

      <main className="flex-1">
        {/* Header */}
        <header className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute right-0 top-20 h-64 w-64 translate-x-1/2 rounded-full bg-accent-yellow/30 blur-3xl"></div>
          <div className="absolute left-0 bottom-0 h-64 w-64 -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex -rotate-2 items-center rounded-full border-2 border-foreground bg-accent-purple px-4 py-1 text-sm font-bold shadow-pop mb-6">
                👋 Halo, Salam Kenal!
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-black text-foreground mb-6 leading-tight">
                Lebih Dari Sekadar <br />
                <span className="text-primary relative inline-block">
                  Klinik Gigi
                  <svg className="absolute -bottom-2 left-0 w-full" height="10" preserveAspectRatio="none" viewBox="0 0 100 10">
                    <path d="M0 5 Q 50 10 100 5" fill="none" stroke="#FF8A65" strokeWidth="4"></path>
                  </svg>
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Kami percaya bahwa pergi ke dokter gigi seharusnya menyenangkan, bukan menakutkan.
                Sejak 2020, kami hadir dengan konsep <span className="font-bold text-secondary">"Playful Pop"</span>
                untuk mengubah persepsi Anda tentang perawatan gigi. Misi kami sederhana: Menciptakan senyum sehat tanpa air mata!
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] border-2 border-foreground shadow-card hover:shadow-pop transition-all transform hover:-translate-y-1">
                  <div className={`w-16 h-16 ${value.color} rounded-2xl border-2 border-foreground flex items-center justify-center mb-6 shadow-pop`}>
                    <span className="material-symbols-outlined text-3xl">{value.icon}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Meet The Team */}
        <section className="py-20 bg-white border-y-2 border-foreground" id="doctors">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">Meet The Tooth Fairies</h2>
              <p className="text-lg text-gray-600">Kenalan sama dokter-dokter kece yang siap bikin senyum kamu makin bersinar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="group relative flex flex-col items-center text-center rounded-[2.5rem] border-2 border-foreground bg-background p-8 shadow-card transition-all hover:shadow-pop hover:-translate-y-1">
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 ${doctor.bgColor} rounded-full ${doctor.rotate} border-2 border-foreground`}></div>
                    <div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-foreground bg-white">
                      <img alt={doctor.name} className="h-full w-full object-cover" src={doctor.image} />
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-2 rounded-full ${doctor.badgeColor} px-4 py-1 text-xs font-bold mb-3 border`}>
                    {doctor.specialty}
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-2">{doctor.name}</h3>
                  <p className="text-gray-600 mb-6">"{doctor.quote}"</p>
                  <div className="w-full mt-auto">
                    <Link href={`/dokter/${doctor.id}`}>
                      <button className="w-full bg-white rounded-xl py-3 font-bold text-sm border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                        Lihat Profil
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute top-10 right-10 opacity-40 hidden md:block">
            <svg className="text-accent-purple animate-pulse" fill="none" height="100" viewBox="0 0 100 100" width="100">
              <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor"></path>
            </svg>
          </div>
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-xl">
                <span className="mb-4 inline-block rounded-full bg-white border-2 border-foreground px-4 py-1 text-sm font-bold uppercase tracking-wider text-primary shadow-pop-sm">
                  Fasilitas Kami
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-black text-foreground">Klinik Rasa Playground</h2>
              </div>
              <p className="text-lg text-gray-600 max-w-sm text-left md:text-right">
                Intip sudut-sudut nyaman yang bikin kamu betah lama-lama di sini.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
              {/* Large */}
              <div className="md:col-span-2 md:row-span-2 rounded-[2rem] border-2 border-foreground bg-white p-3 shadow-card overflow-hidden relative group">
                <div className="w-full h-full bg-accent-yellow/30 rounded-[1.5rem] flex items-center justify-center relative overflow-hidden group-hover:bg-accent-yellow/40 transition-colors">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#111817 2px, transparent 2px)", backgroundSize: "24px 24px" }}></div>
                  <div className="text-center relative z-10">
                    <span className="material-symbols-outlined text-8xl text-foreground mb-4 block transform group-hover:scale-110 transition-transform">weekend</span>
                    <div className="inline-block bg-white border-2 border-foreground px-4 py-2 rounded-full font-bold text-xl shadow-pop-sm">Ruang Tunggu Cozy</div>
                  </div>
                </div>
              </div>

              {/* Kids Corner */}
              <div className="md:col-span-1 md:row-span-1 rounded-[2rem] border-2 border-foreground bg-white p-3 shadow-card hover:shadow-pop transition-all">
                <div className="w-full h-full bg-primary/20 rounded-[1.5rem] flex items-center justify-center flex-col gap-2 p-6 text-center">
                  <span className="material-symbols-outlined text-5xl text-primary">toys</span>
                  <p className="font-bold text-lg text-foreground">Kids Corner</p>
                </div>
              </div>

              {/* Modern Unit */}
              <div className="md:col-span-1 md:row-span-2 rounded-[2rem] border-2 border-foreground bg-white p-3 shadow-card hover:shadow-pop transition-all">
                <div className="w-full h-full bg-secondary/20 rounded-[1.5rem] flex items-center justify-center flex-col gap-4 relative overflow-hidden p-6 text-center">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-secondary rounded-full opacity-30"></div>
                  <span className="material-symbols-outlined text-6xl text-secondary">dentistry</span>
                  <p className="font-bold text-xl text-foreground">Modern Unit</p>
                  <p className="text-xs text-gray-600 font-medium">Kursi ergonomis dengan TV di langit-langit!</p>
                </div>
              </div>

              {/* Photo Booth */}
              <div className="md:col-span-1 md:row-span-1 rounded-[2rem] border-2 border-foreground bg-white p-3 shadow-card hover:shadow-pop transition-all">
                <div className="w-full h-full bg-accent-purple/20 rounded-[1.5rem] flex items-center justify-center flex-col gap-2 p-6 text-center">
                  <span className="material-symbols-outlined text-5xl text-accent-purple">photo_camera</span>
                  <p className="font-bold text-lg text-foreground">Photo Booth</p>
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
