import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={null} />

      <main className="flex-grow flex items-center justify-center relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute left-[-5%] top-40 opacity-40 pointer-events-none">
          <svg className="text-accent-yellow animate-bounce" fill="currentColor" height="200" viewBox="0 0 200 200" width="200" style={{ animationDuration: "5s" }}>
            <path d="M45.7,-76.3C58.9,-69.3,69.1,-55.6,76.5,-41.2C83.9,-26.8,88.5,-11.7,85.8,2.2C83.1,16.1,73.1,28.8,63.1,40.3C53.1,51.8,43.1,62.1,31.2,68.9C19.3,75.7,5.5,79,-8.9,79.8C-23.3,80.6,-38.3,78.9,-51.1,72.1C-63.9,65.3,-74.5,53.4,-81.4,39.7C-88.3,26,-91.5,10.5,-88.7,-3.7C-85.9,-17.9,-77.1,-30.8,-66.6,-41.2C-56.1,-51.6,-43.9,-59.5,-31.6,-67C-19.3,-74.5,-6.9,-81.6,4.6,-88.8C16.1,-96.1,32.5,-103.5,45.7,-76.3Z" transform="translate(100 100)"></path>
          </svg>
        </div>
        <div className="absolute right-[-2%] bottom-10 opacity-30 pointer-events-none">
          <svg className="text-primary animate-bounce" fill="currentColor" height="150" viewBox="0 0 200 200" width="150" style={{ animationDuration: "4s" }}>
            <path d="M41.7,-68.6C54.8,-62.3,66.9,-53.4,76.4,-42.1C85.9,-30.8,92.8,-17.1,89.9,-4.8C87,7.5,74.3,18.4,63.9,28.6C53.5,38.8,45.4,48.3,35.6,56.7C25.8,65.1,14.3,72.4,1.4,70.2C-11.5,68,-25.1,56.3,-38.4,46.3C-51.7,36.3,-64.7,28,-72.1,16.3C-79.5,4.6,-81.3,-10.5,-75.6,-23.4C-69.9,-36.3,-56.7,-47,-43.8,-53.4C-30.9,-59.8,-18.3,-61.9,-4.9,-54.2C8.5,-46.5,28.6,-74.9,41.7,-68.6Z" transform="translate(100 100)"></path>
          </svg>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 rounded-[2.5rem] bg-white border-2 border-foreground shadow-card overflow-hidden">
            {/* Form Side */}
            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center order-2 lg:order-1">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-accent-yellow/30 px-3 py-1 text-xs font-bold text-foreground mb-3 border border-foreground">
                  👋 Halo Teman Baru
                </div>
                <h1 className="font-display text-4xl font-black text-foreground mb-2">Buat Akun Baru</h1>
                <p className="text-gray-600">Bergabunglah dengan kami untuk senyum yang lebih sehat.</p>
              </div>

              {/* Google Button */}
              <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-bold mb-6 bg-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                Daftar dengan Google
              </button>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-dashed border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500 font-medium">atau daftar manual</span>
                </div>
              </div>

              {/* Form */}
              <form className="space-y-4">
                {/* Photo Upload */}
                <div className="space-y-1">
                  <label className="text-sm font-bold text-foreground ml-1">Foto Profil</label>
                  <div className="flex items-center gap-3 p-2 border-2 border-foreground border-dashed rounded-xl bg-gray-50/50">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-foreground bg-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-2xl text-gray-300">add_a_photo</span>
                    </div>
                    <input
                      accept="image/*"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-2 file:border-foreground file:text-xs file:font-bold file:bg-white file:text-foreground file:shadow-[2px_2px_0px_0px_#111817] hover:file:bg-accent-yellow hover:file:shadow-none hover:file:translate-y-[1px] hover:file:translate-x-[1px] transition-all cursor-pointer focus:outline-none bg-transparent"
                      type="file"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-foreground ml-1" htmlFor="fullname">Nama Lengkap</label>
                  <input
                    className="w-full border-2 border-foreground rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-primary focus:shadow-[2px_2px_0px_0px_#0d9488] transition-all"
                    id="fullname"
                    placeholder="Budi Santoso"
                    type="text"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-foreground ml-1" htmlFor="email">Email Address</label>
                  <input
                    className="w-full border-2 border-foreground rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-primary focus:shadow-[2px_2px_0px_0px_#0d9488] transition-all"
                    id="email"
                    placeholder="nama@email.com"
                    type="email"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-foreground ml-1" htmlFor="phone">Nomor Telepon</label>
                  <input
                    className="w-full border-2 border-foreground rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-primary focus:shadow-[2px_2px_0px_0px_#0d9488] transition-all"
                    id="phone"
                    placeholder="0812 3456 7890"
                    type="tel"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-foreground ml-1" htmlFor="password">Password</label>
                  <input
                    className="w-full border-2 border-foreground rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-primary focus:shadow-[2px_2px_0px_0px_#0d9488] transition-all"
                    id="password"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-2 pt-2">
                  <div className="flex h-5 items-center">
                    <input className="w-5 h-5 rounded border-2 border-foreground text-primary focus:ring-primary" type="checkbox" />
                  </div>
                  <label className="text-xs text-gray-600 font-medium leading-tight">
                    Saya menyetujui <Link className="text-primary hover:underline" href="/terms">Syarat & Ketentuan</Link> serta <Link className="text-primary hover:underline" href="/privacy">Kebijakan Privasi</Link> Dental Clinic.
                  </label>
                </div>

                <button
                  className="w-full rounded-xl bg-primary py-3.5 text-white font-bold text-lg mt-4 border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                  type="submit"
                >
                  Daftar Sekarang
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </form>

              <p className="mt-8 text-center text-gray-600 text-sm font-medium">
                Sudah punya akun?
                <Link className="text-secondary font-bold hover:underline ml-1" href="/api/auth/signin">Masuk disini</Link>
              </p>
            </div>

            {/* Image Side */}
            <div className="relative bg-background border-b-2 lg:border-b-0 lg:border-l-2 border-foreground min-h-[300px] lg:min-h-full overflow-hidden flex items-center justify-center order-1 lg:order-2 group">
              <div className="absolute inset-0 bg-accent-purple/20"></div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
              <div className="relative z-10 w-full h-full p-8 flex flex-col justify-end lg:justify-center items-center">
                <div className="w-full max-w-sm rounded-[2rem] border-2 border-foreground overflow-hidden shadow-pop bg-white mb-6 lg:mb-0 transform transition-transform group-hover:scale-[1.02] duration-500">
                  <img
                    alt="Happy Patient"
                    className="w-full h-64 lg:h-80 object-cover"
                    src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80"
                  />
                  <div className="p-6 bg-white border-t-2 border-foreground">
                    <h3 className="font-bold text-xl text-foreground mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-accent-yellow bg-foreground rounded-full p-1 text-sm">star</span>
                      Kenapa Gabung Kami?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
                          <span className="material-symbols-outlined text-sm">calendar_month</span>
                        </div>
                        <span>Atur ulang jadwal tanpa ribet</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 shrink-0">
                          <span className="material-symbols-outlined text-sm">history_edu</span>
                        </div>
                        <span>Akses riwayat perawatan digital</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-6 h-6 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple border border-accent-purple/20 shrink-0">
                          <span className="material-symbols-outlined text-sm">notifications_active</span>
                        </div>
                        <span>Pengingat kontrol rutin otomatis</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
