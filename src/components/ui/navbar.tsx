import { auth } from "@/lib/auth";
import { NavbarAuth } from "./navbar-auth";

interface NavbarProps {
  showAuth?: boolean;
}

export async function Navbar({ showAuth = true }: NavbarProps) {
  const session = await auth();

  return <NavbarAuth user={session?.user ?? null} showAuth={showAuth} />;
}
