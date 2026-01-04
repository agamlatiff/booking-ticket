"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error?.details) {
          setFieldErrors(result.error.details);
        }
        setError(result.error?.message || "Gagal mendaftar");
        setIsLoading(false);
        return;
      }

      // Success - redirect to sign-in
      router.push("/sign-in?registered=true");
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  const getFieldError = (field: string) => fieldErrors[field]?.[0];

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={null} />

      <main className="flex-grow flex items-center justify-center relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute left-[-5%] top-40 opacity-40 pointer-events-none">
          <svg className="text-primary animate-[bounce_5s_infinite]" fill="currentColor" height="200" viewBox="0 0 200 200" width="200">
            <path d="M45.7,-76.3C58.9,-69.3,69.1,-55.6,76.5,-41.2C83.9,-26.8,88.5,-11.7,85.8,2.2C83.1,16.1,73.1,28.8,63.1,40.3C53.1,51.8,43.1,62.1,31.2,68.9C19.3,75.7,5.5,79,-8.9,79.8C-23.3,80.6,-38.3,78.9,-51.1,72.1C-63.9,65.3,-74.5,53.4,-81.4,39.7C-88.3,26,-91.5,10.5,-88.7,-3.7C-85.9,-17.9,-77.1,-30.8,-66.6,-41.2C-56.1,-51.6,-43.9,-59.5,-31.6,-67C-19.3,-74.5,-6.9,-81.6,4.6,-88.8C16.1,-96.1,32.5,-103.5,45.7,-76.3Z" transform="translate(100 100)"></path>
          </svg>
        </div>
        <div className="absolute right-[-2%] bottom-10 opacity-30 pointer-events-none">
          <svg className="text-accent-yellow animate-[bounce_4s_infinite]" fill="currentColor" height="150" viewBox="0 0 200 200" width="150">
            <path d="M41.7,-68.6C54.8,-62.3,66.9,-53.4,76.4,-42.1C85.9,-30.8,92.8,-17.1,89.9,-4.8C87,7.5,74.3,18.4,63.9,28.6C53.5,38.8,45.4,48.3,35.6,56.7C25.8,65.1,14.3,72.4,1.4,70.2C-11.5,68,-25.1,56.3,-38.4,46.3C-51.7,36.3,-64.7,28,-72.1,16.3C-79.5,4.6,-81.3,-10.5,-75.6,-23.4C-69.9,-36.3,-56.7,-47,-43.8,-53.4C-30.9,-59.8,-18.3,-61.9,-4.9,-54.2C8.5,-46.5,28.6,-74.9,41.7,-68.6Z" transform="translate(100 100)"></path>
          </svg>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 rounded-[2.5rem] bg-white border-2 border-foreground shadow-card overflow-hidden">
            {/* Form Side */}
            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center order-2 lg:order-1">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-foreground mb-3 border border-foreground">
                  🎉 Bergabung Sekarang
                </div>
                <h1 className="font-display text-4xl font-black text-foreground mb-2">Buat Akun Baru</h1>
                <p className="text-gray-600">Daftar gratis dan nikmati kemudahan booking online.</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                  {error}
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-foreground ml-1" htmlFor="name">Nama Lengkap</label>
                  <input
                    className={`w-full border-2 rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-primary focus:shadow-[2px_2px_0px_0px_#0d9488] transition-all ${getFieldError("name") ? "border-red-500" : "border-foreground"}`}
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    type="text"
                    required
                    disabled={isLoading}
                  />
                  {getFieldError("name") && (
                    <p className="text-red-500 text-xs mt-1">{getFieldError("name")}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-foreground ml-1" htmlFor="email">Email Address</label>
                  <input
                    className={`w-full border-2 rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-primary focus:shadow-[2px_2px_0px_0px_#0d9488] transition-all ${getFieldError("email") ? "border-red-500" : "border-foreground"}`}
                    id="email"
                    name="email"
                    placeholder="nama@email.com"
                    type="email"
                    required
                    disabled={isLoading}
                  />
                  {getFieldError("email") && (
                    <p className="text-red-500 text-xs mt-1">{getFieldError("email")}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-foreground ml-1" htmlFor="password">Password</label>
                  <input
                    className={`w-full border-2 rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-primary focus:shadow-[2px_2px_0px_0px_#0d9488] transition-all ${getFieldError("password") ? "border-red-500" : "border-foreground"}`}
                    id="password"
                    name="password"
                    placeholder="Min. 8 karakter"
                    type="password"
                    required
                    disabled={isLoading}
                  />
                  {getFieldError("password") && (
                    <p className="text-red-500 text-xs mt-1">{getFieldError("password")}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">Minimal 8 karakter, huruf besar, huruf kecil, dan angka</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-foreground ml-1" htmlFor="confirmPassword">Konfirmasi Password</label>
                  <input
                    className={`w-full border-2 rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-primary focus:shadow-[2px_2px_0px_0px_#0d9488] transition-all ${getFieldError("confirmPassword") ? "border-red-500" : "border-foreground"}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Ulangi password"
                    type="password"
                    required
                    disabled={isLoading}
                  />
                  {getFieldError("confirmPassword") && (
                    <p className="text-red-500 text-xs mt-1">{getFieldError("confirmPassword")}</p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    className="w-5 h-5 rounded border-2 border-foreground text-primary focus:ring-primary"
                    type="checkbox"
                    id="terms"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Saya menyetujui{" "}
                    <a href="#" className="text-primary font-bold hover:underline">Syarat & Ketentuan</a>
                  </label>
                </div>

                <button
                  className="w-full rounded-xl bg-secondary py-3.5 text-white font-bold text-lg mt-2 border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin material-symbols-outlined text-lg">progress_activity</span>
                      Memproses...
                    </>
                  ) : (
                    <>
                      Daftar Sekarang
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-gray-600 text-sm font-medium">
                Sudah punya akun?
                <Link className="text-primary font-bold hover:underline ml-1" href="/sign-in">Masuk disini</Link>
              </p>
            </div>

            {/* Image Side */}
            <div className="relative bg-background border-b-2 lg:border-b-0 lg:border-l-2 border-foreground min-h-[300px] lg:min-h-full overflow-hidden flex items-center justify-center order-1 lg:order-2 group">
              <div className="absolute inset-0 bg-primary/10"></div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
              <div className="relative z-10 w-full h-full p-8 flex flex-col justify-end lg:justify-center items-center">
                <div className="w-full max-w-sm rounded-[2rem] border-2 border-foreground overflow-hidden shadow-pop bg-white mb-6 lg:mb-0 transform transition-transform group-hover:scale-[1.02] duration-500">
                  <img
                    alt="Dental Clinic Team"
                    className="w-full h-64 lg:h-80 object-cover"
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80"
                  />
                  <div className="p-6 bg-white border-t-2 border-foreground">
                    <h3 className="font-bold text-xl text-foreground mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary bg-primary/10 rounded-full p-1 text-sm">verified</span>
                      Kenapa Daftar?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                        <span>Booking jadwal dalam hitungan detik</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                        <span>Notifikasi pengingat via WhatsApp</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                        <span>Riwayat perawatan tersimpan aman</span>
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
