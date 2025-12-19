import Image from "next/image";
import Link from "next/link";
import NavbarAuth from "./NavbarAuth";

const Navbar = () => {
  return (
    <nav
      id="Navbar"
      className="container max-w-[1130px] mx-auto flex justify-between items-center pt-[30px]"
    >
      <Link href="/" className="flex items-center shrink-0">
        <Image
          width={120}
          height={60}
          src="/assets/images/logos/logo.svg"
          alt="logo"
        />
      </Link>
      <ul className="nav-menus flex gap-[30px] items-center w-fit">
        <li>
          <Link href="/" className="font-medium">
            Home
          </Link>
        </li>
        <li>
          <Link href="/available-flights" className="font-medium">
            Flights
          </Link>
        </li>
        <li>
          <Link href="/about" className="font-medium">
            About
          </Link>
        </li>
        <NavbarAuth />
      </ul>
    </nav>
  );
};

export default Navbar;
