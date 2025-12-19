import type { Metadata } from "next";
import "../../globals.css";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { BookTextIcon, Plane, Ticket, User } from "lucide-react";
import Link from "next/link";
import ButtonLogout from "./_components/ButtonLogout";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, user } = await getUser();

  if (!session || user.role === "CUSTOMER") {
    return redirect("/sign-in");
  }
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased`}>
        <section>
          {/* Navigation */}
          <nav className="border-b border-muted p-5">
            <div className="flex flex-row items-center justify-between">
              <span className="font-bold ">FlyHigher Dashboard</span>
            </div>
          </nav>

          {/* Content */}
          <section className="flex flex-row gap-5 items-start flex-nowrap">
            {/* Sidebar */}
            <section className="grow-0 w-[-20%] h-screen shadow p-5 space-y-5">
              <div className="space-y-2">
                <Button
                  asChild
                  className="w-full justify-start"
                  variant={"ghost"}
                >
                  <Link href="/">Dashboard</Link>
                </Button>
              </div>
              <div className="space-y-2">
                <div className="uppercase tex-xm font-bold">Master Data</div>
                <Button
                  asChild
                  className="w-full justify-start"
                  variant={"ghost"}
                >
                  <Link href="/dashboard/airplanes">
                    <Plane className="mr-2 w-4 h-4" />
                    Airplanes
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full justify-start"
                  variant={"ghost"}
                >
                  <Link href="/dashboard/flights">
                    <BookTextIcon className="mr-2 w-4 h-4" />
                    Flights
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full justify-start"
                  variant={"ghost"}
                >
                  <Link href="/dashboard/tickets">
                    <Ticket className="mr-2 w-4 h-4" />
                    Tickets
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full justify-start"
                  variant={"ghost"}
                >
                  <Link href="/dashboard/users">
                    <User className="mr-2 w-4 h-4" />
                    Users
                  </Link>
                </Button>
              </div>
              <ButtonLogout />
            </section>

            {/* Main Content */}
            <section className="grow mr-5 mt-5 h-[87vh] overflow-y auto">
              {children}
            </section>
          </section>
        </section>
      </body>
    </html>
  );
}
