import Link from "next/link";
import { Metadata } from "next";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/lib/auth";

// SEO Metadata
export const metadata: Metadata = {
  title: "Blog Kesehatan Gigi | Tips & Artikel | Klinik Gigi Senyum Sejahtera",
  description: "Temukan informasi menarik seputar kesehatan gigi, tips perawatan, dan cerita inspiratif untuk senyum cerah setiap hari.",
  keywords: ["blog kesehatan gigi", "tips perawatan gigi", "artikel dokter gigi", "kesehatan mulut"],
  openGraph: {
    title: "Blog Kesehatan Gigi | Klinik Gigi Senyum Sejahtera",
    description: "Tips dan artikel seputar kesehatan gigi dari para ahli",
    type: "website",
  },
};

// JSON-LD Structured Data for Blog
function BlogJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog Kesehatan Gigi - Klinik Gigi Senyum Sejahtera",
    description: "Tips dan artikel seputar kesehatan gigi dari dokter spesialis",
    url: "https://senyumsejahtera.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Klinik Gigi Senyum Sejahtera",
      logo: {
        "@type": "ImageObject",
        url: "https://senyumsejahtera.com/logo.png",
      },
    },
    blogPost: [
      {
        "@type": "BlogPosting",
        headline: "Kenapa Gigi Berlubang Meski Sering Sikat Gigi?",
        description: "Sudah rajin sikat gigi dua kali sehari tapi masih ada lubang?",
        datePublished: "2023-10-20",
        author: { "@type": "Person", name: "drg. Siti Aminah" },
      },
      {
        "@type": "BlogPosting",
        headline: "Cara Mengajak Si Kecil ke Dokter Gigi Tanpa Drama",
        description: "Tips psikologis agar anak merasa nyaman saat kunjungan pertama",
        datePublished: "2023-10-18",
        author: { "@type": "Person", name: "drg. Siti Aminah" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}


// Blog data
const categories = [
  { name: "Semua Artikel", count: 12, active: true },
  { name: "Perawatan Gigi", count: 5, hoverColor: "hover:bg-accent-yellow" },
  { name: "Kesehatan Anak", count: 3, hoverColor: "hover:bg-accent-purple" },
  { name: "Tips & Trik", count: 4, hoverColor: "hover:bg-secondary" },
  { name: "Promo Klinik", count: 2, hoverColor: "hover:bg-green-200" },
];

const featuredPost = {
  id: "gigi-berlubang",
  title: "Kenapa Gigi Berlubang Meski Sering Sikat Gigi?",
  excerpt: "Sudah rajin sikat gigi dua kali sehari tapi masih ada lubang? Ternyata teknik menyikat dan jenis makanan juga berpengaruh besar lho. Simak penjelasan lengkap dari drg. Siti Aminah di sini.",
  category: "Perawatan Gigi",
  date: "20 Okt 2023",
  image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80",
};

const posts = [
  {
    id: "ajak-anak-dokter-gigi",
    title: "Cara Mengajak Si Kecil ke Dokter Gigi Tanpa Drama",
    excerpt: "Tips psikologis agar anak merasa nyaman dan tidak takut saat kunjungan pertamanya.",
    category: "Kesehatan Anak",
    categoryColor: "bg-accent-purple/20 text-purple-800",
    bgColor: "bg-accent-purple/30",
    date: "18 Okt 2023",
    readTime: "5 Menit Baca",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80",
  },
  {
    id: "mitos-scaling",
    title: "Mutos vs Fakta: Scaling Bikin Gigi Tipis?",
    excerpt: "Banyak yang takut scaling karena isu menipiskan email gigi. Benarkah demikian?",
    category: "Tips & Trik",
    categoryColor: "bg-secondary/20 text-secondary",
    bgColor: "bg-secondary/30",
    date: "15 Okt 2023",
    readTime: "3 Menit Baca",
    image: null,
    icon: "dentistry",
  },
  {
    id: "panduan-kawat-gigi",
    title: "Panduan Memilih Jenis Kawat Gigi yang Tepat",
    excerpt: "Metal, keramik, atau clear aligner? Mana yang paling cocok untuk gaya hidupmu?",
    category: "Perawatan Gigi",
    categoryColor: "bg-primary/20 text-primary",
    bgColor: "bg-primary/30",
    date: "10 Okt 2023",
    readTime: "7 Menit Baca",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80",
  },
  {
    id: "promo-bleaching",
    title: "Promo Akhir Tahun: Diskon Bleaching 20%!",
    excerpt: "Dapatkan senyum lebih cerah menyambut tahun baru dengan harga spesial.",
    category: "Promo Klinik",
    categoryColor: "bg-accent-yellow/40 text-yellow-900",
    bgColor: "bg-accent-yellow/30",
    date: "01 Okt 2023",
    readTime: "Promo",
    image: null,
    icon: "savings",
  },
];

export default async function BlogPage() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <BlogJsonLd />
      <NavbarAuth user={session?.user || null} />

      <main className="flex-1">
        {/* Header */}
        <header className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
          <div className="absolute -left-10 top-20 opacity-40">
            <svg className="text-accent-purple animate-bounce" fill="none" height="120" viewBox="0 0 100 100" width="120">
              <circle cx="50" cy="50" fill="currentColor" r="50"></circle>
            </svg>
          </div>
          <div className="absolute -right-10 top-32 opacity-40">
            <svg className="text-accent-yellow animate-bounce" fill="none" height="100" viewBox="0 0 100 100" width="100" style={{ animationDelay: "0.5s" }}>
              <path d="M50 0C55 25 75 45 100 50C75 55 55 75 50 100C45 75 25 55 0 50C25 45 45 25 50 0Z" fill="currentColor"></path>
            </svg>
          </div>
          <div className="container mx-auto px-6 max-w-6xl text-center relative z-10">
            <div className="inline-flex -rotate-2 items-center rounded-full border-2 border-foreground bg-secondary text-white px-4 py-1 text-sm font-bold shadow-pop-sm mb-6">
              ✨ Cerita Senyum Sehat
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-black text-foreground mb-6">
              Tips Gigi & <span className="text-primary relative inline-block">
                Gaya Hidup
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent-yellow" fill="none" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.00025 6.99997C29.6234 3.73719 86.9992 -1.49997 198 2.49997" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                </svg>
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Temukan informasi menarik seputar kesehatan gigi, tips perawatan, dan cerita inspiratif untuk senyum cerah setiap hari.
            </p>
          </div>
        </header>

        {/* Content */}
        <section className="pb-24 relative z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Sidebar */}
              <aside className="lg:col-span-3 lg:sticky lg:top-32 h-fit order-2 lg:order-1">
                <div className="bg-white rounded-[2rem] border-2 border-foreground p-6 shadow-pop">
                  <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined">category</span> Kategori
                  </h3>
                  <div className="flex flex-col gap-3">
                    {categories.map((cat, i) => (
                      <button
                        key={i}
                        className={`text-left px-4 py-3 rounded-xl font-bold border-2 flex justify-between items-center transition-all ${cat.active
                          ? "bg-primary text-white border-foreground shadow-pop-sm"
                          : `bg-background border-transparent ${cat.hoverColor} hover:border-foreground hover:shadow-pop-sm`
                          }`}
                      >
                        <span>{cat.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${cat.active ? "bg-white text-primary border border-foreground" : "bg-white/50 text-foreground"}`}>
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 pt-8 border-t-2 border-dashed border-gray-200">
                    <h3 className="font-bold text-lg mb-4">Newsletter</h3>
                    <p className="text-sm text-gray-500 mb-4">Dapatkan tips gigi sehat langsung di inbox kamu!</p>
                    <div className="space-y-3">
                      <input
                        className="w-full rounded-xl border-2 border-foreground px-4 py-2 text-sm focus:ring-primary focus:border-primary bg-background"
                        placeholder="Email kamu..."
                        type="email"
                      />
                      <button className="w-full bg-foreground text-white py-2 rounded-xl font-bold text-sm border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="lg:col-span-9 order-1 lg:order-2">
                {/* Featured */}
                <div className="mb-12">
                  <article className="group relative rounded-[2.5rem] border-2 border-foreground bg-white overflow-hidden shadow-pop hover:shadow-card transition-all duration-300">
                    <div className="grid md:grid-cols-2">
                      <div className="h-64 md:h-auto bg-accent-yellow/20 relative overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-foreground">
                        <img alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover" src={featuredPost.image} />
                        <div className="absolute top-4 left-4 bg-accent-yellow text-foreground text-xs font-black px-3 py-1 rounded-full border-2 border-foreground uppercase tracking-wide">Featured</div>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 font-bold">
                          <span className="text-primary">{featuredPost.category}</span>
                          <span>•</span>
                          <span>{featuredPost.date}</span>
                        </div>
                        <h2 className="text-3xl font-black mb-4 leading-tight group-hover:text-primary transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                        <Link href={`/blog/${featuredPost.id}`} className="inline-flex items-center gap-2 font-bold text-foreground hover:text-primary transition-colors">
                          Baca Selengkapnya <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.map((post) => (
                    <article key={post.id} className="flex flex-col h-full bg-white rounded-[2rem] border-2 border-foreground overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-pop transition-all">
                      <div className={`h-48 ${post.bgColor} relative border-b-2 border-foreground overflow-hidden`}>
                        {post.image ? (
                          <img alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" src={post.image} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-6xl text-foreground/20">{post.icon}</span>
                          </div>
                        )}
                        <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-lg text-xs font-bold border-2 border-foreground">{post.readTime}</span>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="mb-3">
                          <span className={`${post.categoryColor} text-xs font-bold px-2 py-1 rounded-md`}>{post.category}</span>
                        </div>
                        <h3 className="text-xl font-black mb-3 hover:text-primary cursor-pointer">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-6 flex-grow">{post.excerpt}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-xs text-gray-400 font-bold">{post.date}</span>
                          <Link href={`/blog/${post.id}`} className="text-sm font-bold underline decoration-2 decoration-primary underline-offset-4 hover:text-primary">Baca Artikel</Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-16 flex justify-center gap-2">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-foreground bg-white hover:bg-gray-100 text-foreground">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-foreground bg-foreground text-white font-bold shadow-pop">1</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-foreground bg-white hover:bg-gray-100 font-bold hover:shadow-pop-sm">2</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-foreground bg-white hover:bg-gray-100 font-bold hover:shadow-pop-sm">3</button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-foreground bg-white hover:bg-gray-100 text-foreground">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </main>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-accent-yellow rounded-[3rem] border-2 border-foreground p-10 md:p-16 text-center relative overflow-hidden shadow-pop">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-bl-[4rem] border-l-2 border-b-2 border-foreground z-0"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary rounded-tr-[3rem] border-r-2 border-t-2 border-foreground z-0"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">Punya Pertanyaan Spesifik?</h2>
                <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto font-medium">Jangan ragu untuk konsultasi langsung dengan dokter kami. Gratis konsultasi awal via WhatsApp!</p>
                <Link href="https://wa.me/6281234567890" target="_blank">
                  <button className="bg-white text-foreground px-8 py-4 rounded-full text-lg font-bold border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all inline-flex items-center gap-2">
                    <span className="material-symbols-outlined">chat</span>
                    Chat Dokter Sekarang
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
