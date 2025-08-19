import type { Metadata } from "next";
import "../../globals.css";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { BookTextIcon, Plane } from "lucide-react";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased`}>
        {children}
        <section>
          <nav className="border-b border-muted p-5">
            <div className="flex flex-row items-center justify-between">
              <span className="font-bold text-primary">Kennedy Dashboard</span>
            </div>
          </nav>
          <section className="flex flex-row gap-5 items-start flex-nowrap">
            <section className="grow-0 w-[-20%] h-screen shadow p-5 space-y-5">
              <div className="space-y-2">
                <Button
                  asChild
                  className="w-full justify-start"
                  variant={"ghost"}
                >
                  <Link href="/">Dashbiard</Link>
                </Button>
              </div>
              <div className="space-y-2">
                <div className="uppercase tex-xm font-bold">Master Data</div>
                <Button
                  asChild
                  className="w-full justify-start"
                  variant={"ghost"}
                >
                  <Link href="/">
                    <Plane className="mr-2 w-4 h-4" />
                    Airplanes
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full justify-start"
                  variant={"ghost"}
                >
                  <Link href="/">
                    <BookTextIcon className="mr-2 w-4 h-4" />
                    Flights
                  </Link>
                </Button>
              </div>
            </section>
          </section>
        </section>
      </body>
    </html>
  );
}
