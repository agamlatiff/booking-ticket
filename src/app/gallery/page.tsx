import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/lib/auth";

// Gallery data - using free Unsplash images for dental before/after
const transformations = [
  {
    id: 1,
    title: "Bleaching & Veneer",
    duration: "Perawatan 2 Sesi",
    // Dental treatment images
    before: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=300&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=400&h=300&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Orthodontic Treatment",
    duration: "Perawatan 18 Bulan",
    // Braces treatment images
    before: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=300&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Scaling & Polishing",
    duration: "Perawatan 1 Sesi",
    // Smile transformation
    before: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop&q=80",
  },
];

const clinicPhotos = [
  { id: 1, title: "Ruang Tunggu Cozy", image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80", size: "large" },
  { id: 2, title: "Kids Corner", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80", size: "circle" },
  { id: 3, title: "Equipment", image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&q=80", size: "blob" },
  { id: 4, title: "Ruang Perawatan Modern", image: "https://images.unsplash.com/photo-1629909615957-be38d6df9eb8?w=800&q=80", size: "wide" },
];

const staff = [
  { name: "Drg. Sarah", role: "Orthodontist", color: "bg-accent-yellow", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80" },
  { name: "Drg. Budi", role: "Pediatric Dentist", color: "bg-accent-purple", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80" },
  { name: "Suster Ani", role: "Dental Nurse", color: "bg-secondary", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&q=80" },
  { name: "Drg. Rey", role: "Oral Surgeon", color: "bg-primary", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&q=80" },
];

export default async function GalleryPage() {
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
            <svg className="text-secondary" height="300" viewBox="0 0 200 200" width="300" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.2,22.9,71.3,34.5C60.4,46.1,49.9,55.7,38.1,63.1C26.3,70.5,13.2,75.7,-0.7,76.9C-14.6,78.1,-29.2,75.3,-41.7,68.2C-54.2,61.1,-64.6,49.7,-73.1,36.5C-81.6,23.3,-88.2,8.3,-86.6,-5.9C-85,-20.1,-75.2,-33.5,-64,-44.4C-52.8,-55.3,-40.2,-63.7,-27.1,-71.4C-14,-79.1,-0.4,-86.1,14.2,-87.5C28.8,-88.9,40,-84.7,44.7,-76.4Z" fill="currentColor" transform="translate(100 100)"></path>
            </svg>
          </div>

          <div className="container mx-auto max-w-6xl text-center">
            {/* Breadcrumb */}
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-gray-500 justify-center">
              <Link className="hover:text-primary" href="/">Home</Link>
              <span className="material-symbols-outlined text-base">chevron_right</span>
              <span className="text-foreground">Gallery</span>
            </div>

            {/* Title */}
            <h1 className="mb-6 font-display text-4xl font-black leading-tight text-foreground md:text-5xl lg:text-6xl">
              Galeri Momen & <br className="hidden md:block" />
              Senyum <span className="relative inline-block px-4">
                <span className="absolute inset-0 -skew-y-2 rounded-lg bg-accent-yellow border-2 border-foreground shadow-pop"></span>
                <span className="relative z-10">Happy!</span>
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg font-medium text-gray-700 mb-10">
              Intip keseruan di klinik kami! Dari transformasi senyum yang memukau hingga sudut-sudut klinik yang nyaman dan instagramable.
            </p>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="border-t-2 border-foreground bg-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "radial-gradient(#111817 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
          <div className="container mx-auto max-w-6xl px-6 relative z-10">

            {/* Transformations */}
            <div className="mb-24">
              <div className="mb-12 text-center">
                <span className="inline-block rounded-full border-2 border-foreground bg-secondary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
                  Hasil Nyata
                </span>
                <h2 className="mt-3 text-3xl font-black text-foreground md:text-4xl flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-4xl text-secondary">auto_fix</span>
                  Transformasi Senyum
                </h2>
                <p className="mt-2 text-gray-600">Perubahan kecil untuk dampak yang besar.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {transformations.map((item) => (
                  <div key={item.id} className="relative overflow-hidden rounded-[2.5rem] border-2 border-foreground bg-white shadow-pop hover:shadow-card transition-all group">
                    <div className="grid grid-cols-2 h-64 md:h-80 relative">
                      <div className="relative border-r-2 border-foreground overflow-hidden">
                        <img alt="Before" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={item.before} />
                        <span className="absolute top-4 left-4 rounded-lg border-2 border-foreground bg-white px-3 py-1 text-xs font-bold shadow-sm">Sebelum</span>
                      </div>
                      <div className="relative overflow-hidden">
                        <img alt="After" className="h-full w-full object-cover" src={item.after} />
                        <span className="absolute top-4 right-4 rounded-lg border-2 border-foreground bg-primary text-white px-3 py-1 text-xs font-bold shadow-sm">Sesudah</span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-foreground rounded-full p-2 border-2 border-white text-white">
                          <span className="material-symbols-outlined text-sm">compare_arrows</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 text-center bg-background border-t-2 border-foreground">
                      <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                      <p className="text-xs text-gray-600">{item.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinic Tour */}
            <div className="mb-24">
              <div className="mb-12 text-center">
                <span className="inline-block rounded-full border-2 border-foreground bg-accent-yellow/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
                  Tour Klinik
                </span>
                <h2 className="mt-3 text-3xl font-black text-foreground md:text-4xl flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-4xl text-accent-yellow">chair</span>
                  Suasana Klinik
                </h2>
                <p className="mt-2 text-gray-600">Nyaman serasa di rumah sendiri.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
                {/* Large image */}
                <div className="md:col-span-2 row-span-2 relative group">
                  <div className="absolute inset-0 rounded-t-full rounded-b-xl border-2 border-foreground bg-primary translate-x-2 translate-y-2"></div>
                  <div className="relative h-full w-full overflow-hidden rounded-t-[10rem] rounded-b-[2rem] border-2 border-foreground bg-white transition-transform duration-300 group-hover:-translate-y-1">
                    <img alt="Reception" className="h-full w-full object-cover" src={clinicPhotos[0].image} />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-foreground/80 to-transparent p-6 pt-20">
                      <span className="text-white font-bold text-lg">{clinicPhotos[0].title}</span>
                    </div>
                  </div>
                </div>

                {/* Circle image */}
                <div className="md:col-span-1 row-span-1 relative group">
                  <div className="absolute inset-0 rounded-full border-2 border-foreground bg-accent-purple translate-x-2 translate-y-2"></div>
                  <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-foreground bg-white transition-transform duration-300 group-hover:-translate-y-1">
                    <img alt="Kids Room" className="h-full w-full object-cover" src={clinicPhotos[1].image} />
                  </div>
                  <span className="absolute bottom-4 right-4 bg-white border-2 border-foreground rounded-full px-3 py-1 text-xs font-bold shadow-pop">{clinicPhotos[1].title}</span>
                </div>

                {/* Blob image */}
                <div className="md:col-span-1 row-span-1 relative group flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-secondary border-2 border-foreground translate-x-2 translate-y-2 rounded-[60%_40%_30%_70%/60%_30%_70%_40%]"></div>
                    <div className="relative h-full w-full overflow-hidden border-2 border-foreground bg-white transition-transform duration-300 group-hover:-translate-y-1 rounded-[60%_40%_30%_70%/60%_30%_70%_40%]">
                      <img alt="Tools" className="h-full w-full object-cover" src={clinicPhotos[2].image} />
                    </div>
                  </div>
                </div>

                {/* Wide image */}
                <div className="md:col-span-3 row-span-1 relative group mt-4 md:mt-0">
                  <div className="absolute inset-0 rounded-[3rem] border-2 border-foreground bg-accent-yellow translate-x-2 translate-y-2"></div>
                  <div className="relative h-full w-full overflow-hidden rounded-[3rem] border-2 border-foreground bg-white transition-transform duration-300 group-hover:-translate-y-1">
                    <img alt="Treatment Room" className="h-full w-full object-cover" src={clinicPhotos[3].image} />
                    <div className="absolute bottom-4 left-8 bg-white border-2 border-foreground rounded-full px-4 py-2 font-bold shadow-pop">
                      {clinicPhotos[3].title}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Staff */}
            <div>
              <div className="mb-12 text-center">
                <span className="inline-block rounded-full border-2 border-foreground bg-primary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
                  Tim Hore
                </span>
                <h2 className="mt-3 text-3xl font-black text-foreground md:text-4xl flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-4xl text-primary">groups</span>
                  Dokter & Staff
                </h2>
                <p className="mt-2 text-gray-600">Siap menyapamu dengan ramah!</p>
              </div>

              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {staff.map((person, i) => (
                  <div key={i} className={`group flex flex-col items-center ${i % 2 === 1 ? 'mt-8 md:mt-0' : ''}`}>
                    <div className="relative mb-4 h-40 w-40">
                      <div className={`absolute inset-0 rounded-full border-2 border-foreground ${person.color} translate-x-1 translate-y-1`}></div>
                      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-foreground bg-white transition-transform duration-300 group-hover:-translate-y-2">
                        <img alt={person.name} className="h-full w-full object-cover" src={person.image} />
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-foreground">{person.name}</h3>
                    <p className={`text-sm font-bold ${person.color === 'bg-accent-yellow' ? 'text-primary' : person.color === 'bg-accent-purple' ? 'text-accent-purple' : person.color === 'bg-secondary' ? 'text-secondary' : 'text-primary'}`}>{person.role}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
