"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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

      {/* Auth Buttons & Theme Toggle */}
      <div className="flex items-center gap-3">
        {showAuth && (
          <>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition hidden sm:block"
            >
              Log In
            </Link>
            <Button asChild size="sm">
              <Link href="/sign-up">Get Started</Link>
            </Button>
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
