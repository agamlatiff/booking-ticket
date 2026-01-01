import type { Metadata } from "next";
import Link from "next/link";
import ButtonLogout from "./_components/ButtonLogout";
import DashboardThemeToggle from "./_components/DashboardThemeToggle";
import { SidebarNav } from "./_components/SidebarNav";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Dashboard | Klinik Gigi Senyum Sejahtera",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return redirect("/sign-in");
  }

  const navItems = [
    { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
    { href: "/dashboard/bookings", icon: "calendar_month", label: "Booking" },
    { href: "/dashboard/schedule", icon: "schedule", label: "Jadwal" },
    { href: "/dashboard/doctors", icon: "medical_services", label: "Dokter" },
    { href: "/dashboard/services", icon: "dental_hygiene", label: "Layanan" },
    { href: "/dashboard/patients", icon: "group", label: "Pasien" },
    { href: "/dashboard/reports", icon: "analytics", label: "Laporan" },
    { href: "/dashboard/settings", icon: "settings", label: "Pengaturan" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-surface-dark border-r border-gray-100 dark:border-gray-800 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-teal-600 text-white p-2 rounded-xl">
              <span className="text-xl">🦷</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
                Senyum Sejahtera
              </span>
              <span className="text-[10px] uppercase tracking-wider text-teal-600 dark:text-teal-400 font-medium">
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <SidebarNav items={navItems} />

        {/* User & Logout */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 mb-3">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "Admin"}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                <span className="text-teal-600 dark:text-teal-400 font-bold">
                  {session.user.name?.charAt(0) || "A"}
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
          <ButtonLogout />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="bg-white dark:bg-surface-dark border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Cari booking, pasien..."
                  className="pl-10 pr-4 py-2 w-64 rounded-xl bg-gray-50 dark:bg-gray-800 border-none text-sm focus:ring-2 focus:ring-teal-500/20 outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                <span className="material-symbols-outlined text-gray-500">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <DashboardThemeToggle />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
