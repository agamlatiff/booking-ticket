"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  showAuth?: boolean;
}

export function Navbar({ showAuth = true }: NavbarProps) {
  return (
    <nav className="w-full py-6 px-6 max-w-7xl mx-auto flex items-center justify-between z-50 relative">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-primary dark:bg-accent text-white dark:text-primary p-1.5 rounded-lg">
          <span className="material-symbols-outlined text-xl">flight_takeoff</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-primary dark:text-white">
          FlyHigher
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
        <Link href="/available-flights" className="hover:text-primary dark:hover:text-accent transition">
          Flights
        </Link>
        <Link href="/destinations" className="hover:text-primary dark:hover:text-accent transition">
          Destinations
        </Link>
        <Link href="/partners" className="hover:text-primary dark:hover:text-accent transition">
          Partners
        </Link>
        <Link href="/support" className="hover:text-primary dark:hover:text-accent transition">
          Support
        </Link>
      </div>

      {/* Auth Buttons */}
      {showAuth && (
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            Log In
          </Link>
          <Button asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
          <button
            className="ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-500"
            onClick={() => document.documentElement.classList.toggle("dark")}
          >
            <span className="material-symbols-outlined text-sm block dark:hidden">
              dark_mode
            </span>
            <span className="material-symbols-outlined text-sm hidden dark:block">
              light_mode
            </span>
          </button>
        </div>
      )}
    </nav>
  );
}
