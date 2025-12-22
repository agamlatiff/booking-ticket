import NavbarLight from "@/app/_components/NavbarLight";
import TicketCard from "./_components/TicketCard";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getMyTicket } from "./lib/data";
import Link from "next/link";
import { Ticket } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Tickets - FlyHigher",
  description: "View and manage your flight bookings. Access your e-tickets, check flight status, and manage your reservations.",
};

const MyTicketsPage = async () => {
  const { user, session } = await getUser();

  if (!session) {
    return redirect("/sign-in");
  }

  const data = await getMyTicket(user.id);

  return (
    <div className="bg-background-light min-h-screen font-display">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <NavbarLight />
      </header>

      {/* Header */}
      <div className="bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-8 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-sky-primary/10 rounded-xl flex items-center justify-center">
              <Ticket className="w-5 h-5 text-sky-primary" />
            </div>
            <h1 className="text-text-dark text-3xl md:text-4xl font-extrabold tracking-tight">
              My Tickets
            </h1>
          </div>
          <p className="text-gray-500 text-lg">
            {data.length} booking{data.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-[1200px] mx-auto px-4 md:px-10 py-8">
        {data.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 text-center">
            <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-text-dark mb-2">
              No bookings yet
            </h2>
            <p className="text-gray-500 mb-6">
              Start planning your next adventure!
            </p>
            <Link
              href="/available-flights"
              className="inline-flex items-center gap-2 bg-sky-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Browse Flights
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {data.map((val) => (
              <TicketCard key={val.id} data={val} />
            ))}
            <p className="text-center text-sm text-gray-400 mt-6">
              You&apos;ve reached the end of results.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyTicketsPage;
