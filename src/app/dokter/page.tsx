import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/lib/auth";

// Doctor data - will come from database later
const doctors = [
  {
    id: "siti-aminah",
    name: "drg. Siti Aminah Sp.KG",
    specialty: "Spesialis Gigi Anak & Konservasi",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    rating: 4.9,
    experience: "12+ Tahun",
    patients: "5000+",
    badge: "Ramah Anak",
    badgeIcon: "child_care",
    badgeColor: "bg-secondary text-white",
    cardColor: "bg-accent-yellow",
    quote: "Setiap senyum memiliki cerita yang unik.",
  },
  {
    id: "ahmad-wijaya",
    name: "drg. Ahmad Wijaya Sp.Ort",
    specialty: "Spesialis Ortodonti",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
    rating: 4.8,
    experience: "10+ Tahun",
    patients: "3500+",
    badge: "Expert Behel",
    badgeIcon: "workspace_premium",
    badgeColor: "bg-accent-purple text-foreground",
    cardColor: "bg-accent-purple",
    quote: "Senyum rapi adalah investasi seumur hidup.",
  },
  {
    id: "lisa-hartono",
    name: "drg. Lisa Hartono Sp.Pros",
    specialty: "Spesialis Prostodonsia",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
    rating: 4.9,
    experience: "15+ Tahun",
    patients: "6000+",
    badge: "Crown Expert",
    badgeIcon: "diamond",
    badgeColor: "bg-primary text-white",
    cardColor: "bg-primary",
    quote: "Gigi yang sempurna untuk senyum yang sempurna.",
  },
  {
    id: "rizky-pratama",
    name: "drg. Rizky Pratama Sp.BM",
    specialty: "Spesialis Bedah Mulut",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80",
    rating: 4.7,
    experience: "8+ Tahun",
    patients: "2500+",
    badge: "Minimal Pain",
    badgeIcon: "healing",
    badgeColor: "bg-secondary text-white",
    cardColor: "bg-secondary",
    quote: "Operasi tanpa rasa takut, dengan sentuhan lembut.",
  },
];

export default async function DokterPage() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={session?.user || null} />

      <main className="flex-1 pt-28 md:pt-36">
        {/* Header */}
        <section className="relative px-6 pb-20">
          {/* Decorative */}
          <div className="absolute left-10 top-20 h-32 w-32 animate-[spin_12s_linear_infinite] rounded-full border-2 border-dashed border-foreground opacity-50"></div>
          <div className="absolute right-0 top-10 -z-10 opacity-30">
            <svg className="text-accent-purple" height="300" viewBox="0 0 200 200" width="300" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.2,22.9,71.3,34.5C60.4,46.1,49.9,55.7,38.1,63.1C26.3,70.5,13.2,75.7,-0.7,76.9C-14.6,78.1,-29.2,75.3,-41.7,68.2C-54.2,61.1,-64.6,49.7,-73.1,36.5C-81.6,23.3,-88.2,8.3,-86.6,-5.9C-85,-20.1,-75.2,-33.5,-64,-44.4C-52.8,-55.3,-40.2,-63.7,-27.1,-71.4C-14,-79.1,-0.4,-86.1,14.2,-87.5C28.8,-88.9,40,-84.7,44.7,-76.4Z" fill="currentColor" transform="translate(100 100)"></path>
            </svg>
          </div>

          <div className="container mx-auto max-w-6xl text-center">
            {/* Breadcrumb */}
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-gray-500 justify-center">
              <Link className="hover:text-primary" href="/">Home</Link>
              <span className="material-symbols-outlined text-base">chevron_right</span>
              <span className="text-foreground">Dokter</span>
            </div>

            {/* Title */}
            <h1 className="mb-6 font-display text-4xl font-black leading-tight text-foreground md:text-5xl lg:text-6xl">
              Tim Dokter <span className="relative inline-block px-4">
                <span className="absolute inset-0 -skew-y-2 rounded-lg bg-accent-purple border-2 border-foreground shadow-pop"></span>
                <span className="relative z-10">Super</span>
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg font-medium text-gray-700 mb-10">
              Pilih dokter favoritmu! Semua dokter kami adalah spesialis berpengalaman
              dengan pendekatan yang ramah dan modern.
            </p>
          </div>
        </section>

        {/* Doctors Grid */}
        <section className="border-t-2 border-foreground bg-white py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {doctors.map((doctor) => (
                <Link key={doctor.id} href={`/dokter/${doctor.id}`} className="group">
                  <div className="relative flex flex-col md:flex-row gap-6 rounded-[2rem] border-2 border-foreground bg-background p-6 shadow-pop transition-all hover:-translate-y-2 hover:shadow-card overflow-hidden">
                    {/* Badge */}
                    <div className={`absolute -top-3 -right-3 z-20 ${doctor.badgeColor} text-sm border-2 border-foreground px-3 py-1 rounded-full shadow-pop-sm -rotate-6 font-bold flex items-center gap-1`}>
                      <span className="material-symbols-outlined text-lg">{doctor.badgeIcon}</span>
                      {doctor.badge}
                    </div>

                    {/* Image */}
                    <div className="relative flex-shrink-0">
                      <div className={`absolute inset-0 ${doctor.cardColor} rounded-2xl rotate-3 translate-x-2 translate-y-2 border-2 border-foreground`}></div>
                      <div className="relative z-10 h-48 w-48 md:h-40 md:w-40 overflow-hidden rounded-2xl border-2 border-foreground bg-white">
                        <img alt={doctor.name} className="h-full w-full object-cover" src={doctor.image} />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col flex-1">
                      <h3 className="text-xl font-black text-foreground mb-1">{doctor.name}</h3>
                      <p className="text-sm font-bold text-primary mb-3">{doctor.specialty}</p>

                      {/* Quote */}
                      <p className="text-sm text-gray-600 italic mb-4 border-l-4 border-accent-yellow pl-3">
                        "{doctor.quote}"
                      </p>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-3 mt-auto">
                        <div className="flex items-center gap-1 text-sm font-bold text-foreground bg-white px-3 py-1 rounded-full border border-foreground">
                          <span className="material-symbols-outlined text-accent-yellow text-sm">star</span>
                          {doctor.rating}
                        </div>
                        <div className="flex items-center gap-1 text-sm font-bold text-foreground bg-white px-3 py-1 rounded-full border border-foreground">
                          <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                          {doctor.experience}
                        </div>
                        <div className="flex items-center gap-1 text-sm font-bold text-foreground bg-white px-3 py-1 rounded-full border border-foreground">
                          <span className="material-symbols-outlined text-secondary text-sm">group</span>
                          {doctor.patients}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
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
              🩺 Konsultasi Gratis
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8 leading-tight">
              Bingung Pilih Dokter?<br />
              Kami Bantu Carikan!
            </h2>
            <p className="mb-10 text-xl font-medium text-foreground/80 max-w-2xl mx-auto">
              Ceritakan keluhan gigimu, tim kami akan merekomendasikan dokter yang paling cocok.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href="https://wa.me/6281234567890" target="_blank">
                <button className="flex h-14 min-w-[200px] items-center justify-center rounded-full bg-foreground border-2 border-foreground px-10 text-xl font-bold text-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all gap-3">
                  <span className="material-symbols-outlined text-green-400">chat</span>
                  <span>Chat Sekarang</span>
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
