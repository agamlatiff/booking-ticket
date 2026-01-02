import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={null} />

      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 md:pt-20">
        {/* Decorative */}
        <div className="absolute left-10 top-32 hidden opacity-60 md:block">
          <svg className="text-secondary animate-bounce" fill="none" height="80" viewBox="0 0 100 100" width="80" style={{ animationDuration: "3s" }}>
            <path d="M50 0C55 25 75 45 100 50C75 55 55 75 50 100C45 75 25 55 0 50C25 45 45 25 50 0Z" fill="currentColor"></path>
          </svg>
        </div>
        <div className="absolute right-20 top-40 hidden opacity-60 md:block">
          <svg className="text-accent-yellow animate-bounce" fill="none" height="60" viewBox="0 0 100 100" width="60" style={{ animationDuration: "4s" }}>
            <circle cx="50" cy="50" fill="currentColor" r="50"></circle>
          </svg>
        </div>
        <div className="absolute bottom-20 left-20 hidden opacity-40 md:block">
          <div className="h-24 w-24 rounded-full border-2 border-foreground bg-accent-purple"></div>
        </div>

        <div className="container relative z-10 mx-auto max-w-4xl text-center">
          {/* 404 Numbers */}
          <div className="mb-12 flex items-center justify-center gap-2 md:gap-6">
            <span className="font-display text-9xl font-black leading-none text-primary drop-shadow-[4px_4px_0px_#111817] md:text-[12rem] md:drop-shadow-[6px_6px_0px_#111817]">4</span>
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-foreground bg-accent-yellow shadow-pop animate-bounce md:h-48 md:w-48" style={{ animationDuration: "3s" }}>
              <span className="material-symbols-outlined text-7xl text-foreground md:text-9xl">sentiment_very_dissatisfied</span>
              <div className="absolute -right-6 -top-6 rotate-12 rounded-xl border-2 border-foreground bg-white px-3 py-1 shadow-pop-sm">
                <span className="text-xl font-bold">?</span>
              </div>
            </div>
            <span className="font-display text-9xl font-black leading-none text-secondary drop-shadow-[4px_4px_0px_#111817] md:text-[12rem] md:drop-shadow-[6px_6px_0px_#111817]">4</span>
          </div>

          {/* Badge */}
          <div className="mb-8 inline-flex -rotate-2 items-center rounded-full border-2 border-foreground bg-white px-6 py-2 shadow-pop">
            <span className="mr-2 text-xl">🦷</span>
            <span className="text-sm font-bold text-foreground md:text-base">Oops! Gigi ini hilang...</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 font-display text-4xl font-black leading-tight text-foreground md:text-6xl">
            Halaman Tidak Ditemukan
          </h1>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-xl text-lg font-medium text-gray-600 md:text-xl">
            Sepertinya halaman yang Anda cari sudah dicabut atau pindah tempat. Jangan khawatir, mari kembali ke beranda untuk merawat senyum Anda!
          </p>

          {/* CTA Button */}
          <Link href="/">
            <button className="inline-flex h-14 min-w-[220px] items-center justify-center gap-3 rounded-full bg-primary px-8 text-lg font-bold text-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
              <span className="material-symbols-outlined">home</span>
              Kembali ke Home
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
