"use client";

import { useState } from "react";
import { Plane, Calendar, Users, ArrowRightLeft, Search } from "lucide-react";

interface FlightSearchWidgetProps {
  cities: { departureCity: string; destinationCity: string }[];
  searchAction: (formData: FormData) => void;
}

type TripType = "roundtrip" | "oneway" | "multicity";

const FlightSearchWidget = ({ cities, searchAction }: FlightSearchWidgetProps) => {
  const [tripType, setTripType] = useState<TripType>("roundtrip");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");

  const handleSwap = () => {
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  };

  const uniqueDepartures = [...new Set(cities.map((c) => c.departureCity))];
  const uniqueArrivals = [...new Set(cities.map((c) => c.destinationCity))];

  return (
    <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-soft border border-gray-100 p-6 md:p-8">
      {/* Trip Type Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-4 border-b border-gray-100 gap-2">
        <button
          type="button"
          onClick={() => setTripType("roundtrip")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${tripType === "roundtrip"
            ? "bg-sky-primary/10 text-sky-primary"
            : "text-gray-500 hover:bg-gray-50"
            }`}
        >
          <ArrowRightLeft className="w-5 h-5" />
          Round-trip
        </button>
        <button
          type="button"
          onClick={() => setTripType("oneway")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${tripType === "oneway"
            ? "bg-sky-primary/10 text-sky-primary"
            : "text-gray-500 hover:bg-gray-50"
            }`}
        >
          <Plane className="w-5 h-5" />
          One-way
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-500 hover:bg-gray-50 font-bold text-sm whitespace-nowrap transition-colors"
          >
            <Users className="w-5 h-5" />1 Traveler
          </button>
        </div>
      </div>

      {/* Search Form */}
      <form action={searchAction}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          {/* From & To */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            {/* From */}
            <div className="relative">
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide ml-1">
                From
              </label>
              <div className="relative flex items-center">
                <Plane className="absolute left-4 text-gray-400 w-5 h-5" />
                <select
                  name="departure"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 bg-gray-50 border-none rounded-2xl text-text-dark font-semibold focus:ring-2 focus:ring-sky-primary focus:bg-white transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select departure</option>
                  {uniqueDepartures.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <button
              type="button"
              onClick={handleSwap}
              className="hidden md:flex absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-100 rounded-full items-center justify-center text-sky-primary shadow-sm hover:scale-110 transition-transform"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>

            {/* To */}
            <div className="relative">
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide ml-1">
                To
              </label>
              <div className="relative flex items-center">
                <Plane className="absolute left-4 text-gray-400 w-5 h-5 rotate-90" />
                <select
                  name="arrival"
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 bg-gray-50 border-none rounded-2xl text-text-dark font-semibold focus:ring-2 focus:ring-sky-primary focus:bg-white transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select destination</option>
                  {uniqueArrivals.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Departure Date */}
            <div className="relative">
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide ml-1">
                Departure
              </label>
              <div className="relative flex items-center">
                <Calendar className="absolute left-4 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="date"
                  className="w-full h-14 pl-12 pr-4 bg-gray-50 border-none rounded-2xl text-text-dark font-semibold focus:ring-2 focus:ring-sky-primary focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            {/* Return Date */}
            {tripType === "roundtrip" && (
              <div className="relative">
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide ml-1">
                  Return
                </label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-4 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    name="returnDate"
                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border-none rounded-2xl text-text-dark font-semibold focus:ring-2 focus:ring-sky-primary focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full h-14 bg-sky-primary hover:bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Trust Indicators */}
      <div className="mt-6 flex flex-wrap items-center gap-6 pt-6 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-400">Trusted by:</p>
        <div className="flex items-center gap-6 opacity-60">
          <div className="flex items-center gap-1 font-bold text-gray-600">
            <Plane className="w-5 h-5" /> Jakarta Air
          </div>
          <div className="flex items-center gap-1 font-bold text-gray-600">
            <Plane className="w-5 h-5" /> Bali Express
          </div>
          <div className="flex items-center gap-1 font-bold text-gray-600">
            <Plane className="w-5 h-5" /> Global Wings
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchWidget;
