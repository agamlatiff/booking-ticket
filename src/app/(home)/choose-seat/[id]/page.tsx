import NavbarLight from "@/app/_components/NavbarLight";
import SeatList from "./_components/SeatList";
import FlightDetail from "./_components/FlightDetail";
import { getFlightById } from "../../lib/data";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { CheckCircle, Plane } from "lucide-react";

type Params = {
  id: string;
};

interface ChooseSeatProps {
  params: Params;
}

const ChooseSeatPage = async ({ params }: ChooseSeatProps) => {
  const { session } = await getUser();
  const flight = await getFlightById(params.id);

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
          <div className="lg:col-span-8 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-text-dark tracking-tight mb-2">
                  Where would you like to sit?
                </h1>
                <p className="text-gray-500 text-lg">
                  Select your preferred spot for your journey to{" "}
                  {flight?.destinationCity}.
                </p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50">
                <div className="w-5 h-5 rounded border-2 border-gray-300 bg-white" />
                <span className="text-sm font-medium text-gray-600">
                  Available
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50">
                <div className="w-5 h-5 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                  ✕
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Occupied
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-primary/10">
                <div className="w-5 h-5 rounded bg-sky-primary text-white flex items-center justify-center text-xs">
                  ✓
                </div>
                <span className="text-sm font-medium text-sky-primary">
                  Selected
                </span>
              </div>
            </div>

            {/* Fuselage Visual Container */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow-soft border border-gray-200 p-8 flex flex-col items-center">
              {/* Decorative Cockpit Shape */}
              <div className="w-24 h-24 bg-gray-100 rounded-t-full absolute -top-12 left-1/2 -translate-x-1/2 z-0 opacity-50" />

              {/* Cabin Interior */}
              <div className="relative z-10 w-full max-w-md bg-gray-50 rounded-[4rem] px-6 py-12 border-4 border-gray-200 shadow-inner">
                {/* Front Decoration */}
                <div className="flex justify-center mb-8 opacity-40">
                  <Plane className="w-8 h-8 text-gray-400" />
                </div>

                {/* Class Label */}
                <div className="text-center mb-6">
                  <span className="text-xs font-bold tracking-widest text-sky-primary uppercase bg-sky-primary/10 px-3 py-1 rounded-full">
                    {flight?.seats?.[0]?.type || "Economy"} Class
                  </span>
                </div>

                {/* Seat Grid */}
                {flight?.seats && <SeatList seats={flight.seats} />}

                {/* Rear/Bathroom Visual */}
                <div className="mt-8 flex justify-center gap-12 opacity-50">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                      🚻
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                      ☕
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Summary Sidebar */}
          {flight && <FlightDetail flight={flight} session={session} />}
        </div>
      </main>
    </div>
  );
};

export default ChooseSeatPage;
