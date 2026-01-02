import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-teal-600 text-white p-2 rounded-xl">
              <span className="text-xl">🦷</span>
            </div>
            <div>
              <span className="font-bold text-lg">Senyum Sejahtera</span>
              <span className="block text-xs text-teal-400">Klinik Gigi</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm max-w-sm mb-6">
            Klinik gigi terpercaya dengan dokter berpengalaman dan teknologi modern.
            Melayani dengan sepenuh hati untuk senyum yang lebih sehat.
          </p>
          <div className="flex flex-col gap-3 text-sm text-gray-400">
            <a
              className="hover:text-white transition flex items-center gap-2"
              href="https://wa.me/6285922430828"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>💬</span>
              0812-3456-7890 (WhatsApp)
            </a>
            <a
              className="hover:text-white transition flex items-center gap-2"
              href="mailto:info@senyumsejahtera.com"
            >
              <span>✉️</span>
              info@senyumsejahtera.com
            </a>
            <div className="flex items-start gap-2">
              <span>📍</span>
              <span>
                Jl. Kesehatan No. 123<br />
                Jakarta Selatan, 12345
              </span>
            </div>
          </div>
        </div>

        {/* Layanan */}
        <div>
          <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">
            Layanan
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/booking?service=scaling-polishing" className="hover:text-teal-400 transition">
                Scaling & Polishing
              </Link>
            </li>
            <li>
              <Link href="/booking?service=cabut-gigi" className="hover:text-teal-400 transition">
                Cabut Gigi
              </Link>
            </li>
            <li>
              <Link href="/booking?service=tambal-gigi" className="hover:text-teal-400 transition">
                Tambal Gigi
              </Link>
            </li>
            <li>
              <Link href="/booking?service=veneer-gigi" className="hover:text-teal-400 transition">
                Veneer Gigi
              </Link>
            </li>
            <li>
              <Link href="/booking?service=behel-kawat" className="hover:text-teal-400 transition">
                Behel / Kawat Gigi
              </Link>
            </li>
          </ul>
        </div>

        {/* Informasi */}
        <div>
          <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">
            Informasi
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/booking" className="hover:text-teal-400 transition">
                Booking Online
              </Link>
            </li>
            <li>
              <Link href="/#dokter" className="hover:text-teal-400 transition">
                Dokter Kami
              </Link>
            </li>
            <li>
              <Link href="/#layanan" className="hover:text-teal-400 transition">
                Daftar Layanan
              </Link>
            </li>
            <li>
              <a href="https://wa.me/6285922430828" className="hover:text-teal-400 transition">
                Hubungi Kami
              </a>
            </li>
          </ul>

          {/* Jam Operasional */}
          <h4 className="font-bold text-white mt-8 mb-4 text-sm uppercase tracking-wider">
            Jam Buka
          </h4>
          <div className="text-sm text-gray-400 space-y-1">
            <p>Senin - Jumat: 09:00 - 21:00</p>
            <p>Sabtu: 09:00 - 17:00</p>
            <p className="text-gray-500">Minggu: Libur</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2024 Klinik Gigi Senyum Sejahtera. Hak cipta dilindungi.</p>
          <div className="flex gap-6">
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
