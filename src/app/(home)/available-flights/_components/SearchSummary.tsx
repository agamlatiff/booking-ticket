"use client";

import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  X,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import {
  flightContext,
  FilterActionKind,
  type FContext,
} from "../providers/FlightProvider";

interface SearchSummaryProps {
  onEditSearch: () => void;
}

const SearchSummary = ({ onEditSearch }: SearchSummaryProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, dispatch } = useContext(flightContext) as FContext;

  const departure = searchParams.get("departure") || "";
  const arrival = searchParams.get("arrival") || "";
  const date = searchParams.get("date") || "";

  const isValidDeparture = departure && departure !== "Select City";
  const isValidArrival = arrival && arrival !== "Select City";

  // Format date nicely
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    : "";

  // Count active filters
  const activeFilterCount = [
    isValidDeparture,
    isValidArrival,
    !!date,
    !!state.seat,
    state.planeIds.length > 0,
  ].filter(Boolean).length;

  const clearFilter = (param: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(param);
    router.push(`/available-flights?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/available-flights");
    dispatch({ type: FilterActionKind.SET_SEAT, payload: { seat: null } });
    dispatch({ type: FilterActionKind.SET_SORT, payload: { sort: "recommended" } });
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      {/* Search Summary Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Icon */}
        <div className="w-10 h-10 bg-sky-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <Search className="w-5 h-5 text-sky-primary" />
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Departure */}
          {isValidDeparture && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-primary/10 text-sky-primary text-sm font-bold rounded-full">
              <MapPin className="w-3.5 h-3.5" />
              {departure}
              <button
                onClick={() => clearFilter("departure")}
                className="hover:bg-sky-primary/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {/* Arrow */}
          {isValidDeparture && isValidArrival && (
            <ArrowRight className="w-4 h-4 text-gray-400" />
          )}

          {/* Arrival */}
          {isValidArrival && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-600 text-sm font-bold rounded-full">
              <MapPin className="w-3.5 h-3.5" />
              {arrival}
              <button
                onClick={() => clearFilter("arrival")}
                className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {/* Date */}
          {formattedDate && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-600 text-sm font-bold rounded-full">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
              <button
                onClick={() => clearFilter("date")}
                className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {/* Seat Class */}
          {state.seat && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-bold rounded-full">
              {state.seat}
              <button
                onClick={() =>
                  dispatch({ type: FilterActionKind.SET_SEAT, payload: { seat: null } })
                }
                className="hover:bg-yellow-200 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          {/* Airlines Count */}
          {state.planeIds.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 text-orange-600 text-sm font-bold rounded-full">
              {state.planeIds.length} airline{state.planeIds.length > 1 ? "s" : ""}
            </span>
          )}

          {/* No filters placeholder */}
          {activeFilterCount === 0 && (
            <span className="text-gray-400 text-sm font-medium">
              No filters applied — showing all flights
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-gray-500 hover:text-red-500 hover:bg-red-50 text-sm font-bold rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
          <button
            onClick={onEditSearch}
            className="flex items-center gap-2 px-4 py-2 bg-sky-primary hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Edit Search</span>
          </button>
        </div>
      </div>

      {/* Active Filter Count */}
      {activeFilterCount > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
          </span>
          <span className="text-xs text-gray-300">•</span>
          <button
            onClick={clearAllFilters}
            className="text-xs text-sky-primary hover:underline font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchSummary;
