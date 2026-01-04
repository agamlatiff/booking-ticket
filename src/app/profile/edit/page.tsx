import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function EditProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={session.user} />

      <main className="flex-grow pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute left-[-5%] top-[20%] w-64 h-64 rounded-full bg-accent-yellow opacity-20 blur-3xl z-0"></div>
        <div className="absolute right-[-5%] bottom-[10%] w-80 h-80 rounded-full bg-primary opacity-10 blur-3xl z-0"></div>
        <div className="absolute right-[10%] top-[15%] hidden lg:block opacity-60">
          <svg className="text-secondary animate-bounce" fill="none" height="60" viewBox="0 0 100 100" width="60" style={{ animationDuration: "4s" }}>
            <circle cx="50" cy="50" fill="currentColor" r="50"></circle>
          </svg>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Sidebar */}
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-[2rem] border-2 border-foreground p-6 shadow-pop text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-accent-purple/30 z-0"></div>
                <div className="relative z-10 flex flex-col items-center mt-4">
                  {/* Profile Photo */}
                  <div className="w-32 h-32 rounded-full border-4 border-foreground bg-background overflow-hidden mb-4 shadow-sm relative group cursor-pointer">
                    <img
                      alt="Profile"
                      className="w-full h-full object-cover"
                      src={session.user.image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-black text-foreground">{session.user.name || "User"}</h2>
                  <p className="text-gray-500 font-medium mb-6">Patient ID: #DC-2024-889</p>

                  {/* Menu */}
                  <div className="w-full flex flex-col gap-3">
                    <button className="w-full py-3 px-4 rounded-xl border-2 border-foreground bg-primary text-white font-bold shadow-pop-sm flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-lg">edit</span>
                      Edit Profil
                    </button>
                    <Link href="/my-bookings" className="w-full">
                      <button className="w-full py-3 px-4 rounded-xl border-2 border-transparent hover:bg-gray-100 text-gray-600 font-bold flex items-center justify-center gap-2 transition-colors">
                        <span className="material-symbols-outlined text-lg">calendar_month</span>
                        Riwayat Booking
                      </button>
                    </Link>
                    <button className="w-full py-3 px-4 rounded-xl border-2 border-transparent hover:bg-gray-100 text-red-500 font-bold flex items-center justify-center gap-2 transition-colors">
                      <span className="material-symbols-outlined text-lg">logout</span>
                      Keluar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="w-full md:w-2/3">
              <div className="bg-white rounded-[2.5rem] border-2 border-foreground p-8 md:p-10 shadow-card relative">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-dashed border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-accent-yellow border-2 border-foreground flex items-center justify-center shadow-pop-sm">
                    <span className="material-symbols-outlined text-xl">person_edit</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-black text-foreground">Edit Profil</h1>
                    <p className="text-gray-600">Perbarui informasi pribadi Anda agar kami bisa melayani lebih baik.</p>
                  </div>
                </div>

                {/* Form */}
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-foreground uppercase tracking-wide" htmlFor="firstName">Nama Depan</label>
                      <input
                        className="w-full border-2 border-foreground rounded-xl px-4 py-3 bg-white focus:outline-none focus:shadow-pop focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all"
                        id="firstName"
                        defaultValue="Sari"
                        placeholder="Masukkan nama depan"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-foreground uppercase tracking-wide" htmlFor="lastName">Nama Belakang</label>
                      <input
                        className="w-full border-2 border-foreground rounded-xl px-4 py-3 bg-white focus:outline-none focus:shadow-pop focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all"
                        id="lastName"
                        defaultValue="Rahayu"
                        placeholder="Masukkan nama belakang"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-foreground uppercase tracking-wide" htmlFor="phone">Nomor Telepon</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">call</span>
                        <input
                          className="w-full border-2 border-foreground rounded-xl pl-12 pr-4 py-3 bg-white focus:outline-none focus:shadow-pop focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all"
                          id="phone"
                          defaultValue="081234567890"
                          placeholder="08xx-xxxx-xxxx"
                          type="tel"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-foreground uppercase tracking-wide" htmlFor="email">Email</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">mail</span>
                        <input
                          className="w-full border-2 border-foreground rounded-xl pl-12 pr-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
                          id="email"
                          defaultValue={session.user.email || "user@example.com"}
                          disabled
                          type="email"
                        />
                      </div>
                      <p className="text-xs text-gray-400 italic">*Email tidak dapat diubah. Hubungi admin jika perlu.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-foreground uppercase tracking-wide" htmlFor="address">Alamat Lengkap</label>
                    <textarea
                      className="w-full border-2 border-foreground rounded-xl px-4 py-3 bg-white focus:outline-none focus:shadow-pop focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all resize-none"
                      id="address"
                      placeholder="Masukkan alamat lengkap Anda"
                      rows={3}
                      defaultValue="Jl. Melati Indah No. 45, Kebayoran Baru, Jakarta Selatan"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-foreground uppercase tracking-wide" htmlFor="city">Kota</label>
                      <input
                        className="w-full border-2 border-foreground rounded-xl px-4 py-3 bg-white focus:outline-none focus:shadow-pop focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all"
                        id="city"
                        defaultValue="Jakarta Selatan"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-foreground uppercase tracking-wide" htmlFor="zip">Kode Pos</label>
                      <input
                        className="w-full border-2 border-foreground rounded-xl px-4 py-3 bg-white focus:outline-none focus:shadow-pop focus:translate-x-[-1px] focus:translate-y-[-1px] transition-all"
                        id="zip"
                        defaultValue="12160"
                        type="text"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-6 flex flex-col-reverse md:flex-row gap-4 md:justify-end border-t-2 border-gray-100 mt-8">
                    <Link href="/">
                      <button
                        className="w-full md:w-auto py-3 px-8 rounded-full font-bold text-center bg-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        type="button"
                      >
                        Batal
                      </button>
                    </Link>
                    <button
                      className="py-3 px-8 rounded-full font-bold bg-accent-yellow text-foreground border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                      type="submit"
                    >
                      <span className="material-symbols-outlined">save</span>
                      Simpan Perubahan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
