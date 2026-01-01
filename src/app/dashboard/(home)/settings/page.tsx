export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan</h1>
        <p className="text-gray-500 text-sm mt-1">Konfigurasi klinik dan sistem</p>
      </div>

      {/* Clinic Info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Informasi Klinik</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Nama Klinik</label>
            <input
              type="text"
              defaultValue="Klinik Gigi Senyum Sejahtera"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Nomor Telepon</label>
            <input
              type="text"
              defaultValue="0812-3456-7890"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-500 mb-1">Alamat</label>
            <textarea
              defaultValue="Jl. Kesehatan No. 123, Jakarta Selatan, 12345"
              rows={2}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm resize-none"
            />
          </div>
        </div>
      </div>

      {/* Booking Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Pengaturan Booking</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Timeout Pembayaran (menit)
            </label>
            <input
              type="number"
              defaultValue={15}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Booking akan expired jika tidak dibayar dalam waktu ini
            </p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Pengingat H-1 (jam sebelum)
            </label>
            <input
              type="number"
              defaultValue={24}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Waktu pengiriman reminder WhatsApp
            </p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Batas Pembatalan (jam sebelum)
            </label>
            <input
              type="number"
              defaultValue={24}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Pasien tidak bisa cancel jika kurang dari ini
            </p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Auto-Generate Slot (hari)
            </label>
            <input
              type="number"
              defaultValue={14}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Slot otomatis dibuat untuk X hari ke depan
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Integrasi WhatsApp</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Fonnte API Token</label>
            <input
              type="password"
              placeholder="••••••••••••••••"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Token dari dashboard Fonnte untuk WhatsApp Gateway
            </p>
          </div>
          <div className="bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 px-4 py-3 rounded-xl text-sm">
            💡 WhatsApp digunakan untuk mengirim reminder H-1 dan konfirmasi booking
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Pengaturan Pembayaran</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Midtrans Server Key</label>
            <input
              type="password"
              placeholder="••••••••••••••••"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Midtrans Client Key</label>
            <input
              type="password"
              placeholder="••••••••••••••••"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl border-none text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="sandbox" className="rounded" defaultChecked />
            <label htmlFor="sandbox" className="text-sm text-gray-600 dark:text-gray-300">
              Mode Sandbox (untuk testing)
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition-colors">
          Simpan Pengaturan
        </button>
      </div>
    </div>
  );
}
