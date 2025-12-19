import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { logout } from "../(home)/lib/actions";

interface NavbarAuthProps {
  variant?: "light" | "dark";
}

const NavbarAuth = async ({ variant = "dark" }: NavbarAuthProps) => {
  const { session, user } = await getUser();

  const buttonStyles =
    variant === "light"
      ? "flex items-center justify-center rounded-xl h-10 px-6 bg-sky-primary hover:bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
      : "font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]";

  return (
    <div className="inline-flex items-center gap-3">
      {session ? (
        user.role === "CUSTOMER" ? (
          <Link href="/my-tickets" className={buttonStyles}>
            My Tickets
          </Link>
        ) : (
          <Link href="/dashboard" className={buttonStyles}>
            Dashboard
          </Link>
        )
      ) : (
        <Link href="/sign-in" className={buttonStyles}>
          Sign In
        </Link>
      )}

      {session && user.role === "CUSTOMER" && (
        <form action={logout}>
          <Button className="rounded-full" variant={"destructive"}>
            <LogOut className="size-4" />
          </Button>
        </form>
      )}
    </div>
  );
};

export default NavbarAuth;

