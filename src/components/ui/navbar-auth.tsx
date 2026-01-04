"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Calendar, User as UserIcon, LayoutDashboard, CalendarCheck, CalendarPlus } from "lucide-react";
import { signOutUser } from "@/app/(auth)/sign-in/lib/actions";

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface NavbarAuthProps {
  user: User | null;
  showAuth?: boolean;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/layanan", label: "Layanan" },
  { href: "/dokter", label: "Dokter" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function NavbarAuth({ user, showAuth = true }: NavbarAuthProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 z-50 w-full px-4 py-4 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex items-center justify-between rounded-full border-2 border-foreground bg-white px-6 py-3 shadow-pop">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white border-2 border-foreground">
              <span className="material-symbols-outlined text-2xl">dentistry</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">Dental Clinic</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden items-center gap-6 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm font-bold transition-colors ${isActive(link.href)
                    ? "text-primary relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
                    : "text-foreground hover:text-primary"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Icons only */}
          <div className="hidden md:flex items-center gap-3">
            {showAuth && (
              <>
                {user ? (
                  <div className="flex items-center gap-3">
                    {/* Cek Booking - Icon Button */}
                    <Link
                      href="/my-bookings"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                      title="Cek Booking"
                    >
                      <CalendarCheck className="h-5 w-5 text-foreground" />
                    </Link>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name || "User"}
                            className="w-10 h-10 rounded-full cursor-pointer border-2 border-foreground hover:shadow-pop-sm transition"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-accent-purple border-2 border-foreground flex items-center justify-center text-foreground font-bold cursor-pointer hover:shadow-pop-sm transition-all">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 rounded-xl border-2 border-foreground shadow-pop">
                        <DropdownMenuLabel>
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-bold leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {user.role === "ADMIN" && (
                          <DropdownMenuItem asChild>
                            <Link href="/dashboard" className="cursor-pointer">
                              <LayoutDashboard className="mr-2 h-4 w-4" />
                              <span>Dashboard Admin</span>
                            </Link>
                          </DropdownMenuItem>
                        )}

                        {user.role === "DOCTOR" && (
                          <DropdownMenuItem asChild>
                            <Link href="/doctor" className="cursor-pointer">
                              <LayoutDashboard className="mr-2 h-4 w-4" />
                              <span>Portal Dokter</span>
                            </Link>
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuItem asChild>
                          <Link href="/my-bookings" className="cursor-pointer">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Booking Saya</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/profile/edit" className="cursor-pointer">
                            <UserIcon className="mr-2 h-4 w-4" />
                            <span>Edit Profil</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-500 cursor-pointer"
                          onClick={async () => await signOutUser()}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Keluar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <>
                    {/* Cek Booking - Icon Button */}
                    <Link
                      href="/my-bookings"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                      title="Cek Booking"
                    >
                      <CalendarCheck className="h-5 w-5 text-foreground" />
                    </Link>
                    {/* Booking Sekarang - Icon Button */}
                    <Link
                      href="/booking"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary border-2 border-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                      title="Booking Sekarang"
                    >
                      <CalendarPlus className="h-5 w-5 text-white" />
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground bg-white text-foreground shadow-pop-sm md:hidden">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

