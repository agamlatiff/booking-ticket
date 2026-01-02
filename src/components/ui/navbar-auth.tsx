"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Calendar, User as UserIcon, LayoutDashboard } from "lucide-react";
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

export function NavbarAuth({ user, showAuth = true }: NavbarAuthProps) {
  return (
    <nav className="w-full py-6 px-6 max-w-7xl mx-auto flex items-center justify-between z-50 relative">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-teal-600 text-white p-2 rounded-xl">
          <span className="text-xl">🦷</span>
        </div>
        <div className="hidden sm:block">
          <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">
            Senyum Sejahtera
          </span>
          <span className="block text-[10px] text-teal-600 dark:text-teal-400 -mt-1">
            Klinik Gigi
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
        <Link href="/#layanan" className="hover:text-teal-600 dark:hover:text-teal-400 transition">
          Layanan
        </Link>
        <Link href="/#dokter" className="hover:text-teal-600 dark:hover:text-teal-400 transition">
          Dokter
        </Link>
        <Link href="/booking" className="hover:text-teal-600 dark:hover:text-teal-400 transition">
          Booking
        </Link>
        <a
          href="https://wa.me/6285922430828"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-600 dark:hover:text-teal-400 transition"
        >
          Kontak
        </a>
      </div>

      {/* Auth Buttons & Theme Toggle */}
      <div className="flex items-center gap-3">
        {showAuth && (
          <>
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/my-bookings"
                  className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition"
                >
                  <Calendar className="w-4 h-4" />
                  Booking Saya
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-teal-500 transition"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold cursor-pointer hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
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

                    <DropdownMenuItem asChild>
                      <Link href="/my-bookings" className="cursor-pointer">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Booking Saya</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/complete-profile" className="cursor-pointer">
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
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition hidden sm:block"
                >
                  Masuk
                </Link>
                <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/booking">Booking</Link>
                </Button>
              </>
            )}
          </>
        )}
        <ThemeToggle />

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">menu</span>
        </button>
      </div>
    </nav>
  );
}
