import NavbarLight from "@/app/_components/NavbarLight";
import SeatMapWrapper from "./_components/SeatMapWrapper";
import FlightDetail from "./_components/FlightDetail";
import SeatClassToggle from "./_components/SeatClassToggle";
import MobileSummaryWrapper from "./_components/MobileSummaryWrapper";
import { getFlightById } from "../../lib/data";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { CheckCircle, Plane, ArrowLeft } from "lucide-react";

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
      <div className="bg-background-light min-h-screen font-display flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Flight not found</h1>
          <p className="text-gray-500 mb-4">The flight you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/available-flights"
            className="inline-flex items-center gap-2 text-sky-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to flights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light min-h-screen font-display">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <NavbarLight />
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center gap-3 text-sm font-medium">
            <li>
              <Link
                href="/available-flights"
                className="text-gray-400 hover:text-sky-primary transition-colors flex items-center gap-1"
              >
                <CheckCircle className="w-4 h-4" /> Flight
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li className="text-sky-primary flex items-center gap-1">
              <Plane className="w-4 h-4" /> Seats
            </li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-400">Payment</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Seat Map & Controls */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-text-dark tracking-tight mb-2">
                  Where would you like to sit?
                </h1>
                <p className="text-gray-500 text-lg">
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
    </div>
  );
};

export default ChooseSeatPage;
