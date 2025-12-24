import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import SeatMapWrapper from "./_components/SeatMapWrapper";
import FlightDetail from "./_components/FlightDetail";
import SeatClassToggle from "./_components/SeatClassToggle";
import MobileSummaryWrapper from "./_components/MobileSummaryWrapper";
import { getFlightById } from "../../lib/data";
import { getUser } from "@/lib/auth";
import Link from "next/link";

type Params = {
  id: string;
};

interface ChooseSeatProps {
  params: Params;
}

const ChooseSeatPage = async ({ params }: ChooseSeatProps) => {
  const { session } = await getUser();
  const flight = await getFlightById(params.id);

  if (!flight) {
    return (
      <div className="bg-background dark:bg-background-dark min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-4">
              flight_off
            </span>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Flight not found
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              The flight you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/available-flights"
              className="inline-flex items-center gap-2 text-accent hover:underline"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back to flights
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-300">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <Navbar />
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center gap-3 text-sm font-medium">
            <li>
              <Link
                href="/available-flights"
                className="text-gray-400 dark:text-gray-500 hover:text-accent transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-lg">check_circle</span>
                Flight
              </Link>
            </li>
            <li className="text-gray-300 dark:text-gray-600">/</li>
            <li className="text-accent flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">airline_seat_recline_extra</span>
              Seats
            </li>
            <li className="text-gray-300 dark:text-gray-600">/</li>
            <li className="text-gray-400 dark:text-gray-500">Payment</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Seat Map & Controls */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
                  Where would you like to sit?
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Select your preferred spot for your journey to{" "}
                  {flight.destinationCity}.
                </p>
              </div>
            </div>

            {/* Class Toggle */}
            <SeatClassToggle seats={flight.seats} basePrice={flight.price} />

            {/* Interactive Legend + Seat Grid with Fuselage */}
            <SeatMapWrapper seats={flight.seats} />
          </div>

          {/* Right Column: Summary Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-4">
            <FlightDetail flight={flight} session={session} />
          </div>
        </div>

        {/* Bottom padding for mobile sticky bar */}
        <div className="h-32 lg:hidden" />
      </main>

      {/* Mobile Sticky Bottom Bar */}
      <MobileSummaryWrapper flight={flight} session={session} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ChooseSeatPage;
