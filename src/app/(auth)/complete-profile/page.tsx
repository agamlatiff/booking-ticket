import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import CompleteProfileForm from "./_components/CompleteProfileForm";

export default async function CompleteProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  // If user already has phone, redirect to home
  if (session.user.phone) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🦷</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Lengkapi Profil Anda
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Tambahkan nomor WhatsApp untuk menerima notifikasi booking
          </p>
        </div>

        {/* User Info */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                {session.user.name?.charAt(0) || "U"}
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {session.user.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <CompleteProfileForm userId={session.user.id} />
      </div>
    </div>
  );
}
