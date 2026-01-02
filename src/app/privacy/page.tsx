import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/lib/auth";

export default async function PrivacyPage() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <NavbarAuth user={session?.user || null} />

      <main className="relative pt-32 pb-20 md:pt-40 flex-grow">
        {/* Decorative */}
        <div className="absolute left-[-5%] top-[20%] hidden md:block opacity-60 pointer-events-none">
          <svg className="text-accent-purple animate-pulse" fill="currentColor" height="300" viewBox="0 0 200 200" width="300">
            <path d="M45.7,-76.3C58.9,-69.3,69.1,-55.5,76.5,-40.8C83.9,-26.1,88.5,-10.5,86.2,4.1C83.9,18.7,74.7,32.3,64.3,44.1C53.9,55.9,42.3,65.9,29.3,72.4C16.3,78.9,1.9,81.9,-11.6,79.5C-25.1,77.1,-37.7,69.3,-48.7,60.1C-59.7,50.9,-69.1,40.3,-75.4,27.8C-81.7,15.3,-84.9,0.9,-81.7,-12.3C-78.5,-25.5,-68.9,-37.5,-57.4,-45.8C-45.9,-54.1,-32.5,-58.7,-19.7,-64.1C-6.9,-69.5,5.3,-75.7,19.1,-79.1C32.9,-82.5,48.3,-83.1,45.7,-76.3Z" transform="translate(100 100)"></path>
          </svg>
        </div>
        <div className="absolute right-0 top-[10%] hidden md:block opacity-40 pointer-events-none">
          <svg className="text-secondary animate-bounce" fill="none" height="150" viewBox="0 0 100 100" width="150" style={{ animationDuration: "6s" }}>
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeDasharray="20 10" strokeWidth="15"></circle>
          </svg>
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-accent-yellow px-4 py-1 text-sm font-bold shadow-pop-sm mb-6 transform -rotate-2">
              <span className="material-symbols-outlined text-lg">shield_lock</span>
              Privasi Anda Aman Bersama Kami
            </div>
            <h1 className="font-display text-4xl font-black text-foreground md:text-6xl mb-6">
              Kebijakan Privasi
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kami berkomitmen untuk menjaga senyum dan data pribadi Anda tetap aman. Berikut adalah cara kami mengelola informasi Anda dengan transparan dan bertanggung jawab.
            </p>
          </div>

          {/* Content Card */}
          <div className="relative bg-white rounded-[2.5rem] border-2 border-foreground shadow-card p-8 md:p-12 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
              {/* Last Updated */}
              <div className="flex items-center gap-3 mb-8 border-b-2 border-dashed border-gray-200 pb-6">
                <div className="w-12 h-12 rounded-xl bg-accent-purple/20 border-2 border-foreground flex items-center justify-center text-foreground">
                  <span className="material-symbols-outlined text-2xl">info</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Terakhir Diperbarui</h3>
                  <p className="text-sm text-gray-500">24 Oktober 2023</p>
                </div>
              </div>

              <p className="text-lg font-medium text-foreground mb-6">
                Selamat datang di Dental Clinic! Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat menggunakan layanan kami.
              </p>

              {/* Section 1 */}
              <h2 className="text-2xl font-black mt-8 mb-4 text-foreground">1. Informasi yang Kami Kumpulkan</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Agar kami dapat memberikan layanan perawatan gigi terbaik untuk senyum Anda, kami mungkin perlu mengumpulkan beberapa informasi pribadi, antara lain:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600"><strong>Data Identitas:</strong> Nama lengkap, tanggal lahir, dan jenis kelamin.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600"><strong>Data Kontak:</strong> Nomor telepon (WhatsApp), alamat email, dan alamat rumah.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600"><strong>Data Kesehatan:</strong> Riwayat kesehatan gigi, alergi obat, dan catatan perawatan sebelumnya (Rekam Medis).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600"><strong>Data Teknis:</strong> Alamat IP dan data cookies saat Anda mengakses website kami.</span>
                </li>
              </ul>

              {/* Section 2 */}
              <h2 className="text-2xl font-black mt-8 mb-4 text-foreground">2. Bagaimana Kami Menggunakan Data Anda</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Data Anda digunakan sepenuhnya untuk mendukung pengalaman perawatan Anda di klinik kami:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Mengatur jadwal konsultasi dan mengirimkan pengingat janji temu.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Memberikan diagnosis dan rencana perawatan yang akurat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Menghubungi Anda terkait promo spesial atau informasi penting klinik.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Meningkatkan kualitas layanan website dan klinik kami.</span>
                </li>
              </ul>

              {/* Section 3 */}
              <h2 className="text-2xl font-black mt-8 mb-4 text-foreground">3. Perlindungan Data & Keamanan</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Keamanan data Anda adalah prioritas utama kami, sama pentingnya dengan kesehatan gigi Anda. Kami menerapkan langkah-langkah keamanan fisik, elektronik, dan manajerial untuk mencegah akses tidak sah, pengungkapan, atau penyalahgunaan data Anda. Rekam medis Anda disimpan dengan enkripsi standar industri kesehatan.
              </p>

              {/* Section 4 */}
              <h2 className="text-2xl font-black mt-8 mb-4 text-foreground">4. Berbagi Informasi Pihak Ketiga</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Kami <strong>tidak pernah menjual</strong> data pribadi Anda kepada pihak manapun. Kami hanya membagikan informasi Anda kepada pihak ketiga jika:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Diwajibkan oleh hukum atau peraturan pemerintah.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Diperlukan untuk memproses pembayaran atau asuransi kesehatan Anda.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Bekerja sama dengan laboratorium gigi mitra untuk pembuatan alat medis khusus (misal: behel atau gigi palsu).</span>
                </li>
              </ul>

              {/* Section 5 */}
              <h2 className="text-2xl font-black mt-8 mb-4 text-foreground">5. Hak Anda</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Sebagai pasien kami, Anda memiliki hak penuh untuk:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Meminta salinan data pribadi yang kami simpan tentang Anda.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Meminta koreksi jika ada data yang tidak akurat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Menarik persetujuan komunikasi pemasaran kapan saja.</span>
                </li>
              </ul>

              {/* Section 6 */}
              <h2 className="text-2xl font-black mt-8 mb-4 text-foreground">6. Hubungi Kami</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau ingin mendiskusikan data Anda sambil konsultasi gigi, jangan ragu untuk menghubungi kami:
              </p>

              {/* Contact Box */}
              <div className="mt-8 bg-background rounded-2xl border-2 border-foreground p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-lg mb-1">Tim Privasi Dental Clinic</h4>
                  <p className="text-sm text-gray-600 mb-2">Jl. Kesehatan No. 123, Jakarta Selatan</p>
                  <a className="text-primary font-bold hover:underline" href="mailto:privacy@dentalclinic.id">privacy@dentalclinic.id</a>
                </div>
                <Link href="/contact">
                  <button className="bg-foreground text-white px-6 py-3 rounded-full text-sm font-bold border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">chat</span>
                    Hubungi Kami
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
