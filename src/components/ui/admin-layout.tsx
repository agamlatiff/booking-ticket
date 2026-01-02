"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    section: "Main", items: [
      { name: "Dashboard Home", icon: "dashboard", href: "/dashboard" },
    ]
  },
  {
    section: "Management", items: [
      { name: "Bookings Management", icon: "book_online", href: "/dashboard/bookings" },
      { name: "Schedule Master", icon: "calendar_month", href: "/dashboard/schedule" },
      { name: "Doctor Management", icon: "medical_services", href: "/dashboard/doctors" },
      { name: "Services Management", icon: "dentistry", href: "/dashboard/services" },
      { name: "Patients Database", icon: "folder_shared", href: "/dashboard/patients" },
    ]
  },
  {
    section: "Analytics", items: [
      { name: "Reports", icon: "lab_profile", href: "/dashboard/reports" },
    ]
  },
  {
    section: "Configuration", items: [
      { name: "Settings", icon: "settings", href: "/dashboard/settings" },
    ]
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col justify-between border-r-2 border-foreground bg-white p-6 md:flex z-20 shadow-card">
      <div className="flex flex-col h-full min-h-0">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3 shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-foreground bg-primary text-white shadow-[2px_2px_0px_0px_#111817]">
            <span className="material-symbols-outlined text-2xl">dentistry</span>
          </div>
          <div>
            <span className="block text-xl font-black tracking-tight text-foreground">Dental Clinic</span>
            <span className="text-xs font-bold text-gray-500">Dashboard Admin</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto pr-2 -mr-2 pb-2">
          {menuItems.map((group) => (
            <div key={group.section} className="mb-6">
              <h3 className="mb-2 px-4 text-xs font-extrabold uppercase tracking-wider text-gray-400">{group.section}</h3>
              <div className="space-y-2">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all ${isActive
                          ? "border-foreground bg-accent-yellow font-bold text-foreground shadow-[2px_2px_0px_0px_#111817] rounded-full"
                          : "border-transparent font-medium text-gray-600 hover:border-foreground hover:text-foreground hover:bg-accent-yellow hover:shadow-[2px_2px_0px_0px_#111817] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                        }`}
                    >
                      <span className="material-symbols-outlined">{item.icon}</span>
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Profile */}
      <div className="rounded-2xl border-2 border-foreground bg-background p-4 mt-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-foreground bg-white">
            <img
              alt="Profile"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-bold">drg. Siti Aminah</p>
            <p className="truncate text-xs text-gray-500">Admin</p>
          </div>
          <button className="text-gray-500 hover:text-red-500">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

interface AdminHeaderProps {
  title: string;
  subtitle: string;
  emoji?: string;
  actions?: React.ReactNode;
}

export function AdminHeader({ title, subtitle, emoji, actions }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-foreground bg-white/90 px-8 py-5 backdrop-blur-md">
      <div>
        <h1 className="font-display text-2xl font-black text-foreground">
          {emoji && <span className="mr-2">{emoji}</span>}
          {title}
        </h1>
        <p className="text-sm font-medium text-gray-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        {actions}
        <button className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-foreground bg-white shadow-[2px_2px_0px_0px_#111817] transition-transform hover:-translate-y-1 relative">
          <span className="material-symbols-outlined text-foreground">notifications</span>
          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 border border-white"></span>
        </button>
        <button className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-foreground bg-accent-yellow shadow-[2px_2px_0px_0px_#111817] md:hidden">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}
