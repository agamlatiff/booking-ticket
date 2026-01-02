import Link from "next/link";
import { NavbarAuth } from "@/components/ui/navbar-auth";
import { Footer } from "@/components/ui/footer";
import { auth } from "@/lib/auth";

export default async function TermsPage() {
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
              <span className="material-symbols-outlined text-lg">gavel</span>
              Ketentuan Layanan Kami
            </div>
            <h1 className="font-display text-4xl font-black text-foreground md:text-6xl mb-6">
              Syarat & Ketentuan
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Demi kenyamanan bersama, berikut adalah aturan main dan pedoman layanan yang berlaku di Dental Clinic. Mari ciptakan pengalaman perawatan gigi yang menyenangkan!
            </p>
          </div>

          {/* Content Card */}
          <div className="relative bg-white rounded-[2.5rem] border-2 border-foreground shadow-card p-8 md:p-12 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
              {/* Last Updated */}
              <div className="flex items-center gap-3 mb-8 border-b-2 border-dashed border-gray-200 pb-6">
                <div className="w-12 h-12 rounded-xl bg-accent-purple/20 border-2 border-foreground flex items-center justify-center text-foreground">
                  <span className="material-symbols-outlined text-2xl">description</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">Terakhir Diperbarui</h3>
                  <p className="text-sm text-gray-500">24 Oktober 2023</p>
                </div>
              </div>

              <p className="text-lg font-medium text-foreground mb-6">
                Syarat dan ketentuan ini mengatur penggunaan layanan medis dan fasilitas di Dental Clinic. Dengan mendaftar sebagai pasien atau melakukan reservasi, Anda menyetujui poin-poin berikut:
              </p>

              {/* Section 1 */}
              <h2 className="text-2xl font-black mt-8 mb-4 text-foreground">1. Pendaftaran & Rekam Medis</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Sebagai langkah awal perawatan yang aman dan efektif, setiap pasien diwajibkan untuk:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Memberikan informasi identitas (KTP/ID) yang valid dan akurat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Mengisi formulir riwayat kesehatan dengan jujur (termasuk alergi dan obat yang dikonsumsi) demi keselamatan medis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Memperbarui data jika terjadi perubahan kontak darurat atau kondisi kesehatan.</span>
                </li>
              </ul>

              {/* Section 2 */}
              <h2 className="text-2xl font-black mt-8 mb-4 text-foreground">2. Janji Temu & Keterlambatan</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Kami sangat menghargai waktu Anda dan pasien lainnya. Agar jadwal berjalan lancar:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Mohon hadir 15 menit sebelum jadwal konsultasi untuk proses administrasi awal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Keterlambatan lebih dari 20 menit tanpa konfirmasi dapat mengakibatkan penjadwalan ulang otomatis (reschedule).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Prioritas antrean diberikan kepada pasien yang datang tepat waktu sesuai jadwal booking.</span>
                </li>
              </ul>

              {/* Section 3 */}
              <h2 className="text-2xl font-black mt-8 mb-4 text-foreground">3. Pembatalan & Rescheduling</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Kami mengerti bahwa hal tak terduga bisa terjadi. Jika Anda berhalangan hadir:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Harap informasikan kepada admin kami minimal 24 jam sebelum jadwal tindakan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Pembatalan mendadak atau ketidakhadiran tanpa kabar (No-Show) berulang kali dapat menyebabkan akun Anda ditangguhkan sementara.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Deposit booking mungkin diperlukan untuk jadwal tindakan besar atau durasi panjang.</span>
                </li>
              </ul>

              {/* Section 4 */}
              <h2 className="text-2xl font-black mt-8 mb-4 text-foreground">4. Pembayaran & Asuransi</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Kami menjunjung tinggi transparansi dalam setiap transaksi:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Estimasi biaya perawatan akan diinformasikan sebelum tindakan medis dilakukan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Pembayaran penuh wajib dilakukan segera setelah tindakan selesai di hari yang sama.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Untuk klaim asuransi, pastikan membawa kartu dan dokumen pendukung. Selisih biaya yang tidak ditanggung asuransi (excess) menjadi tanggung jawab penuh pasien.</span>
                </li>
              </ul>

              {/* Section 5 */}
              <h2 className="text-2xl font-black mt-8 mb-4 text-foreground">5. Hasil Perawatan & Garansi</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Kedokteran gigi adalah perpaduan ilmu pengetahuan dan seni yang hasilnya bisa bervariasi:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Hasil perawatan sangat dipengaruhi oleh respons biologis tubuh dan kepatuhan pasien dalam menjaga kebersihan mulut.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Dokter akan menjelaskan risiko dan komplikasi yang mungkin terjadi sebelum tindakan (Informed Consent).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-gray-600">Garansi perawatan (misal: tambalan lepas) berlaku sesuai ketentuan spesifik tiap jenis tindakan, selama pasien rutin melakukan kontrol berkala.</span>
                </li>
              </ul>

              {/* Section 6 */}
              <h2 className="text-2xl font-black mt-8 mb-4 text-foreground">6. Pertanyaan & Masukan</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Jika Anda memiliki pertanyaan mengenai ketentuan ini atau ingin memberikan masukan untuk layanan kami, tim manajemen kami siap mendengarkan:
              </p>

              {/* Contact Box */}
              <div className="mt-8 bg-background rounded-2xl border-2 border-foreground p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex-1">
                  <h4 className="font-bold text-foreground text-lg mb-1">Layanan Pelanggan Dental Clinic</h4>
                  <p className="text-sm text-gray-600 mb-2">Senin - Sabtu (09:00 - 17:00)</p>
                  <a className="text-primary font-bold hover:underline" href="mailto:help@dentalclinic.id">help@dentalclinic.id</a>
                </div>
                <Link href="/contact">
                  <button className="bg-foreground text-white px-6 py-3 rounded-full text-sm font-bold border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">chat</span>
                    Hubungi CS
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
