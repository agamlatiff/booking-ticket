import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-foreground pt-16 pb-8 text-white" id="contact">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white border border-white/20">
                <span className="material-symbols-outlined text-2xl">dentistry</span>
              </div>
              <span className="text-xl font-bold">Dental Clinic</span>
            </div>
            <p className="text-sm text-gray-400">
              Klinik gigi modern dengan pendekatan yang menyenangkan dan bersahabat untuk semua usia.
            </p>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h4 className="mb-4 text-lg font-bold text-accent-yellow">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">call</span>
                +62 812 3456 7890
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">chat</span>
                WhatsApp: +62 812 3456 7890
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">mail</span>
                hello@dentalclinic.id
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-accent-purple">Jam Operasional</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span>Senin - Sabtu</span>
                <span className="text-white">09:00 - 21:00</span>
              </li>
              <li className="flex justify-between pt-2">
                <span>Minggu</span>
                <span className="text-secondary">Tutup</span>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-secondary">Lokasi</h4>
            <p className="text-sm text-gray-400 mb-4">
              Jl. Kesehatan No. 123,<br />
              Jakarta Selatan, DKI Jakarta 12345
            </p>
            <Link
              href="https://maps.google.com"
              target="_blank"
              className="block w-full rounded-xl bg-gray-800 py-2 text-center text-xs font-bold text-white hover:bg-primary transition-colors"
            >
              Lihat di Google Maps
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>© 2026 Dental Clinic. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/privacy" className="hover:text-white transition">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
