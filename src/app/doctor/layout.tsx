import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { signOutUser } from "@/app/(auth)/sign-in/lib/actions";

export const metadata: Metadata = {
  title: "Portal Dokter | Klinik Gigi Senyum Sejahtera",
};

export default async function DoctorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user || session.user.role !== "DOCTOR") {
    return redirect("/sign-in");
  }

  const navItems = [
    { href: "/doctor", icon: "dashboard", label: "Dashboard" },
    { href: "/doctor/schedule", icon: "calendar_month", label: "Jadwal Saya" },
    { href: "/doctor/patients", icon: "group", label: "Pasien" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-surface-dark border-r border-gray-100 dark:border-gray-800 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <Link href="/doctor" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-xl">
              <span className="text-xl">👨‍⚕️</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
                Portal Dokter
              </span>
              <span className="text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-400 font-medium">
                Senyum Sejahtera
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 mb-3">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "Dokter"}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {session.user.name?.charAt(0) || "D"}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                {session.user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
            </div>
          </div>
          <form action={signOutUser}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
              <span className="font-medium">Keluar</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">{children}</main>

      <Toaster />
    </div>
  );
}
