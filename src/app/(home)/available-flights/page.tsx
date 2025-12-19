import NavbarLight from "@/app/_components/NavbarLight";
import FilterClass from "./_components/FilterClass";
import FIlterFlight from "./_components/FIlterFlight";
import FilterAirline from "./_components/FilterAirline";
import ListFlights from "./_components/ListFlights";
import { Suspense } from "react";
import LoadingFilterAirlines from "./_components/LoadingFilterAirlines";
import { Calendar, User } from "lucide-react";
import Image from "next/image";

interface PageProps {
  searchParams: { departure?: string; arrival?: string; date?: string };
}

const AvailableFlightsPage = ({ searchParams }: PageProps) => {
  const departure = searchParams.departure || "Select City";
  const arrival = searchParams.arrival || "Select City";
  const date = searchParams.date || new Date().toISOString().split("T")[0];

  // Format date nicely
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-background-light min-h-screen font-display">
      {/* Top Navigation */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
        <NavbarLight />
      </header>

      {/* Search Header */}
      <div className="bg-white border-b border-gray-100 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-100 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        {/* Floating Cloud */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-80 pointer-events-none">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZt2CQsieq8P72F5fGfGX8uw-51cKdU8B6RX1E3Qy8IseX_UfAc_RNCXAbhX47YeVYQmGBtYRMovrSbM55YgbrFbCJHfmBs0Pw5-xHJhVQ2hyRBS10PX59ZxvIFlCy6EOGKsdSntpxFQDSd3t387gonP-pFcc-3FfCsqmaeAYIm4t6QC4JL89Vzmu6j05tDbrE7jXRj_DF_vIT2WLM8lDQWp3kozY7rpjr0DjUvXb6VcnMPnKoKZci2SCRO4EFyn6WPowMfvJbEcY"
            alt="3D cloud"
            width={128}
            height={128}
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-10 py-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Route Info */}
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h1 className="text-text-dark text-2xl md:text-3xl font-black leading-tight tracking-tight">
                {departure}{" "}
                <span className="text-gray-400 mx-2">→</span> {arrival}
              </h1>
              <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
                <span className="mx-2">•</span>
                <User className="w-4 h-4" />1 Passenger
              </p>
            </div>

            {/* Edit Search */}
            <div className="w-full md:w-auto min-w-[320px]">
              <div className="flex w-full items-center rounded-xl h-12 bg-gray-100 p-1 pr-1 shadow-inner">
                <span className="text-gray-500 ml-3 mr-2">🔍</span>
                <input
                  className="flex-1 bg-transparent border-none text-text-dark placeholder:text-gray-500 text-sm font-medium focus:ring-0 focus:outline-none h-full"
                  placeholder="Modify search..."
                  defaultValue="Economy, Round Trip"
                />
                <a
                  href="/"
                  className="h-10 px-5 rounded-lg bg-white text-sky-primary text-sm font-bold shadow-sm hover:shadow hover:bg-gray-50 transition-all flex items-center"
                >
                  Edit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:flex lg:col-span-3 flex-col gap-6 sticky top-24 h-fit">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-text-dark">Filters</h3>
              <button className="text-xs font-bold text-sky-primary hover:underline">
                Reset all
              </button>
            </div>

            {/* Filter Components */}
            <div className="flex flex-col gap-6 text-gray-500">
              <FilterClass />
              <hr className="border-dashed border-gray-200" />
              <FIlterFlight />
              <hr className="border-dashed border-gray-200" />
              <Suspense fallback={<LoadingFilterAirlines />}>
                <FilterAirline />
              </Suspense>
            </div>
          </div>

          {/* Promo Box */}
          <div className="bg-gradient-to-br from-sky-primary to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-sky-primary/30">
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-2">Get 20% Off!</h4>
              <p className="text-white/90 text-sm mb-4">
                Use code{" "}
                <span className="font-mono font-bold bg-white/20 px-1 rounded">
                  FLYHIGH20
                </span>{" "}
                on your first booking.
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
          </div>
        </aside>

        {/* Search Results */}
        <section className="col-span-1 lg:col-span-9 flex flex-col gap-6">
          {/* Sorting Tabs */}
          <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex w-full sm:w-auto p-1 bg-gray-100/50 rounded-lg">
              <button className="flex-1 sm:flex-none px-6 py-2 rounded-lg bg-white text-text-dark text-sm font-bold shadow-sm transition-all border border-gray-100">
                Best Value
              </button>
              <button className="flex-1 sm:flex-none px-6 py-2 rounded-lg text-gray-500 text-sm font-bold hover:text-sky-primary transition-all">
                Cheapest
              </button>
              <button className="flex-1 sm:flex-none px-6 py-2 rounded-lg text-gray-500 text-sm font-bold hover:text-sky-primary transition-all">
                Fastest
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium px-2">
              <span>Sort by:</span>
              <select className="bg-transparent border-none text-text-dark font-bold p-0 pr-6 focus:ring-0 cursor-pointer">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Duration: Short to Long</option>
              </select>
            </div>
          </div>

          {/* Flights List */}
          <ListFlights />
        </section>
      </main>
    </div>
  );
};

export default AvailableFlightsPage;
