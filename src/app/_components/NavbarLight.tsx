import Link from "next/link";
import { Plane } from "lucide-react";
import NavbarAuth from "./NavbarAuth";

const NavbarLight = () => {
  return (
    <header className="relative z-50 w-full">
      <div className="px-6 lg:px-12 py-5 flex items-center justify-between max-w-[1280px] mx-auto w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-sky-primary/10 rounded-xl flex items-center justify-center text-sky-primary">
            <Plane className="w-6 h-6" />
          </div>
          <h2 className="text-text-dark text-xl font-extrabold tracking-tight">
            FlyHigher
          </h2>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 bg-white/80 px-6 py-2.5 rounded-full shadow-sm backdrop-blur-sm border border-gray-200">
          <Link
            href="/"
            className="text-text-dark text-sm font-semibold hover:text-sky-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/available-flights"
            className="text-gray-500 text-sm font-medium hover:text-sky-primary transition-colors"
          >
            Flights
          </Link>
          <Link
            href="/about"
            className="text-gray-500 text-sm font-medium hover:text-sky-primary transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Auth */}
        <div className="shrink-0">
          <NavbarAuth variant="light" />
        </div>
      </div>
    </header>
  );
};

export default NavbarLight;

