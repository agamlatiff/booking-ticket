import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

// Doctor data - will come from database later
const doctorsData: Record<string, DoctorDetail> = {
  "siti-aminah": {
    id: "siti-aminah",
    name: "drg. Siti Aminah Sp.KG",
    specialty: "Spesialis Gigi Anak & Konservasi",
    str: "1234.5678.9012",
    strExpiry: "2028",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    badge: "Ramah Anak",
    badgeIcon: "child_care",
    bio: "Halo! Saya drg. Siti Aminah. Saya percaya bahwa setiap senyum memiliki cerita. Misi saya adalah membuktikan bahwa perawatan gigi itu nyaman, aman, dan menyenangkan.",
    bioExtended: "Dengan pengalaman lebih dari 10 tahun menangani pasien dengan berbagai tingkat kecemasan dental, saya mengembangkan pendekatan \"Tell-Show-Do\" yang efektif, terutama untuk anak-anak.",
    stats: { experience: "12+", patients: "5k+", rating: "4.9", guarantee: "100%" },
    education: ["S1 Kedokteran Gigi, UI (2010)", "Spesialis Konservasi Gigi, UI (2014)"],
    certifications: ["Certified Kids Hypnodontics", "Advanced Aesthetic Restoration"],
    schedule: [
      { day: "Senin", slots: ["09:00 - 10:00", "10:00 - 11:00", "13:00 - 14:00"], booked: ["11:00 - 12:00"] },
      { day: "Rabu", slots: ["13:00 - 14:00", "16:00 - 17:00"], booked: ["14:00 - 15:00", "15:00 - 16:00"] },
      { day: "Jumat", slots: ["09:00 - 10:00", "10:00 - 11:00", "13:00 - 14:00", "14:00 - 15:00"], booked: [] },
    ],
    testimonials: [
      { name: "Ibu Rina", role: "Ibu Rumah Tangga", initial: "R", color: "bg-accent-purple", text: "Anak saya biasanya trauma kalau lihat dokter gigi, tapi sama drg. Siti malah ketawa-ketawa terus. Pendekatannya ajaib!" },
      { name: "Bapak Budi", role: "Karyawan Swasta", initial: "B", color: "bg-secondary text-white", text: "Penjelasan dokter sangat detail dan mudah dimengerti. Proses tambal pun tidak sakit sama sekali." },
      { name: "Kak Sarah", role: "Mahasiswi", initial: "S", color: "bg-primary text-white", text: "Hasil tambal estetiknya bagus banget, warnanya pas sama gigi asli. Super recommended!" },
    ],
  },
  "ahmad-wijaya": {
    id: "ahmad-wijaya",
    name: "drg. Ahmad Wijaya Sp.Ort",
    specialty: "Spesialis Ortodonti",
    str: "2345.6789.0123",
    strExpiry: "2027",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
    badge: "Expert Behel",
    badgeIcon: "workspace_premium",
    bio: "Senyum rapi bukan sekadar estetika, tapi juga investasi kesehatan jangka panjang. Saya hadir untuk membantu Anda mencapai senyum impian.",
    bioExtended: "Dengan berbagai teknik modern mulai dari metal braces hingga clear aligners, saya menyesuaikan treatment dengan kebutuhan dan gaya hidup setiap pasien.",
    stats: { experience: "10+", patients: "3.5k+", rating: "4.8", guarantee: "100%" },
    education: ["S1 Kedokteran Gigi, UGM (2012)", "Spesialis Ortodonti, UI (2016)"],
    certifications: ["Certified Invisalign Provider", "Damon System Specialist"],
    schedule: [
      { day: "Selasa", slots: ["09:00 - 10:00", "10:00 - 11:00"], booked: ["11:00 - 12:00"] },
      { day: "Kamis", slots: ["13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00"], booked: [] },
      { day: "Sabtu", slots: ["09:00 - 10:00", "10:00 - 11:00"], booked: ["11:00 - 12:00"] },
    ],
    testimonials: [
      { name: "Dinda", role: "Content Creator", initial: "D", color: "bg-accent-yellow", text: "Behel ceramic dari dr. Ahmad bagus banget, hampir tidak kelihatan. Perfect untuk yang sering tampil!" },
      { name: "Andre", role: "Mahasiswa", initial: "A", color: "bg-primary text-white", text: "Prosesnya cepat dan tidak sakit. Kontrol rutin juga selalu tepat waktu." },
    ],
  },
};

interface DoctorDetail {
  id: string;
  name: string;
  specialty: string;
  str: string;
  strExpiry: string;
  image: string;
  badge: string;
  badgeIcon: string;
  bio: string;
  bioExtended: string;
  stats: { experience: string; patients: string; rating: string; guarantee: string };
  education: string[];
  certifications: string[];
  schedule: { day: string; slots: string[]; booked: string[] }[];
  testimonials: { name: string; role: string; initial: string; color: string; text: string }[];
}

export default async function DokterDetailPage({ params }: { params: { id: string } }) {
  const session = await auth();
  const doctor = doctorsData[params.id];

  if (!doctor) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={session?.user || null} />

      <main className="flex-1 pt-32 pb-20 overflow-hidden">
        {/* Back Link */}
        <div className="container mx-auto px-6 max-w-6xl mb-8">
          <Link className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors" href="/dokter">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Kembali ke Daftar Dokter
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-6 max-w-6xl mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Photo */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-accent-yellow rounded-[3rem] rotate-3 border-2 border-foreground translate-y-3 translate-x-3 z-0"></div>
              <div className="relative z-10 rounded-[3rem] border-2 border-foreground bg-white overflow-hidden shadow-pop h-[500px]">
                <img alt={doctor.name} className="h-full w-full object-cover" src={doctor.image} />
                <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm border-t-2 border-foreground p-4 text-center">
                  <p className="font-bold text-foreground">STR: {doctor.str}</p>
                  <p className="text-xs text-gray-600">Berlaku hingga {doctor.strExpiry}</p>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 z-20">
                <div className="bg-secondary text-white border-2 border-foreground px-4 py-2 rounded-full shadow-pop-sm -rotate-6 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-lg">{doctor.badgeIcon}</span>
                  {doctor.badge}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-4 border border-primary/20">
                  <span className="material-symbols-outlined text-lg">verified</span>
                  Dokter Terverifikasi
                </div>
                <h1 className="font-display text-4xl lg:text-5xl font-black text-foreground mb-2 leading-tight">
                  {doctor.name}
                </h1>
                <p className="text-xl font-bold text-gray-500">{doctor.specialty}</p>
              </div>

              {/* Bio */}
              <div className="prose prose-lg text-gray-600 leading-relaxed bg-white p-6 rounded-2xl border-2 border-foreground shadow-card">
                <p className="mb-4">"{doctor.bio}"</p>
                <p>{doctor.bioExtended}</p>
              </div>

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background p-5 rounded-2xl border-2 border-foreground relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent-purple rounded-full border-2 border-foreground flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm font-bold">school</span>
                  </div>
                  <h4 className="font-bold text-foreground mb-3 border-b-2 border-dashed border-gray-300 pb-2">Pendidikan</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {doctor.education.map((edu, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary font-bold">•</span> {edu}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-background p-5 rounded-2xl border-2 border-foreground relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent-yellow rounded-full border-2 border-foreground flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm font-bold">award_star</span>
                  </div>
                  <h4 className="font-bold text-foreground mb-3 border-b-2 border-dashed border-gray-300 pb-2">Sertifikasi</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {doctor.certifications.map((cert, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary font-bold">•</span> {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 mt-2">
                <Link href="/booking" className="flex-1">
                  <button className="w-full h-14 flex items-center justify-center rounded-full bg-foreground border-2 border-foreground px-8 text-lg font-bold text-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    <span className="material-symbols-outlined mr-2">calendar_month</span>
                    Buat Janji Temu
                  </button>
                </Link>
                <button className="w-14 h-14 flex items-center justify-center rounded-full bg-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y-2 border-foreground bg-white py-12 mb-20 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <h3 className="text-4xl md:text-5xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">{doctor.stats.experience}</h3>
                <p className="font-bold text-gray-600 text-sm uppercase tracking-wider">Tahun Pengalaman</p>
              </div>
              <div className="text-center group">
                <h3 className="text-4xl md:text-5xl font-black text-secondary mb-2 group-hover:scale-110 transition-transform">{doctor.stats.patients}</h3>
                <p className="font-bold text-gray-600 text-sm uppercase tracking-wider">Pasien Happy</p>
              </div>
              <div className="text-center group">
                <h3 className="text-4xl md:text-5xl font-black text-accent-yellow mb-2 group-hover:scale-110 transition-transform">{doctor.stats.rating}</h3>
                <div className="flex justify-center items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="material-symbols-outlined text-accent-yellow text-sm">star</span>
                  ))}
                </div>
                <p className="font-bold text-gray-600 text-sm uppercase tracking-wider">Rating Pasien</p>
              </div>
              <div className="text-center group">
                <h3 className="text-4xl md:text-5xl font-black text-accent-purple mb-2 group-hover:scale-110 transition-transform">{doctor.stats.guarantee}</h3>
                <p className="font-bold text-gray-600 text-sm uppercase tracking-wider">Garansi Senyum</p>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="container mx-auto px-6 max-w-6xl mb-24" id="schedule">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <span className="mb-2 inline-block rounded-full bg-accent-purple/20 px-4 py-1 text-sm font-bold uppercase tracking-wider text-primary">Ketersediaan</span>
              <h2 className="font-display text-4xl font-black text-foreground">Jadwal Praktik</h2>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-sm font-bold text-gray-500">
                <span className="w-3 h-3 rounded-full bg-primary"></span> Tersedia
              </span>
              <span className="flex items-center gap-2 text-sm font-bold text-gray-500">
                <span className="w-3 h-3 rounded-full bg-red-400"></span> Penuh
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctor.schedule.map((day, i) => (
              <div key={i} className="rounded-[2rem] border-2 border-foreground bg-white p-6 shadow-pop relative overflow-hidden group hover:-translate-y-1 transition-transform">
                <div className={`absolute top-0 right-0 w-24 h-24 ${i === 0 ? 'bg-accent-yellow/20' : i === 1 ? 'bg-accent-purple/20' : 'bg-secondary/20'} rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-150`}></div>
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <h3 className="text-2xl font-black text-foreground">{day.day}</h3>
                  <span className="text-sm font-bold bg-foreground text-white px-3 py-1 rounded-full">{day.slots.length} Slot</span>
                </div>
                <div className="space-y-3 relative z-10">
                  {day.slots.map((slot, j) => (
                    <button key={j} className="w-full flex justify-between items-center p-3 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group/btn">
                      <span className="font-bold text-gray-700 group-hover/btn:text-primary">{slot}</span>
                      <span className="material-symbols-outlined text-gray-300 group-hover/btn:text-primary">add_circle</span>
                    </button>
                  ))}
                  {day.booked.map((slot, j) => (
                    <div key={`booked-${j}`} className="w-full flex justify-between items-center p-3 rounded-xl border border-red-100 bg-red-50 cursor-not-allowed opacity-60">
                      <span className="font-bold text-red-400 line-through">{slot}</span>
                      <span className="text-xs font-bold text-red-400 uppercase">Booked</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-accent-yellow border-y-2 border-foreground py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#111817 2px, transparent 2px)", backgroundSize: "20px 20px" }}></div>
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-black text-foreground">Kata Mereka Tentang Dokter</h2>
              <p className="mt-4 text-lg font-medium text-foreground/80">Pengalaman jujur dari pasien kami.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {doctor.testimonials.map((testimonial, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] border-2 border-foreground shadow-pop hover:scale-105 transition-transform">
                  <div className="flex text-accent-yellow mb-4">
                    {[1, 2, 3, 4, 5].map(j => (
                      <span key={j} className="material-symbols-outlined">star</span>
                    ))}
                  </div>
                  <p className="text-gray-700 font-medium mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                    <div className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center font-bold border border-foreground`}>
                      {testimonial.initial}
                    </div>
                    <div>
                      <h5 className="font-bold text-foreground">{testimonial.name}</h5>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
