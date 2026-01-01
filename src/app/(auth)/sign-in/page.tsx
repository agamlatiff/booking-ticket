import { signInWithGoogle } from "./lib/actions";

const SignInPage = () => {
  return (
    <div className="w-full max-w-[1000px] bg-white dark:bg-surface-dark rounded-2xl shadow-card flex flex-col md:flex-row overflow-hidden border border-white/50 dark:border-white/5 md:min-h-[600px]">
      {/* Left Side - Image */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 relative bg-teal-50 dark:bg-teal-900/20 flex-col justify-between overflow-hidden group">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-600/90 via-teal-600/20 to-transparent" />
        <div className="relative z-10 p-10 h-full flex flex-col justify-between">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white">
            <span className="text-2xl">🦷</span>
          </div>
          <div className="text-white space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-xs font-medium">
              <span>✨</span>
              <span>Senyum Sehat, Hidup Bahagia</span>
            </div>
            <h3 className="text-3xl font-bold leading-tight tracking-tight">
              Klinik Gigi Senyum Sejahtera
            </h3>
            <p className="text-white/80 font-medium leading-relaxed">
              Booking mudah, perawatan gigi terbaik dengan dokter berpengalaman.
            </p>
            <div className="flex gap-2 pt-2">
              <div className="w-8 h-1 bg-white rounded-full" />
              <div className="w-2 h-1 bg-white/30 rounded-full" />
              <div className="w-2 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign In */}
      <div className="w-full md:w-7/12 lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center h-full">
        {/* Mobile Logo */}
        <div className="md:hidden flex items-center gap-2 mb-6 text-teal-600">
          <span className="text-3xl">🦷</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Senyum Sejahtera
          </span>
        </div>

        {/* Header */}
        <div className="space-y-2 mb-8">
          <h1 className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold">
            Selamat Datang
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-normal">
            Masuk untuk booking jadwal perawatan gigi Anda.
          </p>
        </div>

        {/* Google Sign In Button */}
        <form action={signInWithGoogle}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-gray-700 dark:text-gray-200 font-medium">
              Masuk dengan Google
            </span>
          </button>
        </form>

        {/* Info */}
        <div className="mt-8 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
          <p className="text-sm text-teal-700 dark:text-teal-300 text-center">
            💡 Gunakan akun Google Anda untuk login. Akun baru akan otomatis
            terdaftar.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Dengan masuk, Anda menyetujui{" "}
            <a href="#" className="text-teal-600 hover:underline">
              Syarat & Ketentuan
            </a>{" "}
            dan{" "}
            <a href="#" className="text-teal-600 hover:underline">
              Kebijakan Privasi
            </a>{" "}
            kami.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
