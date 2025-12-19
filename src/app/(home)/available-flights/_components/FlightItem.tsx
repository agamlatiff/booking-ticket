"use client";

import Image from "next/image";
import {
  flightContext,
  type FContext,
  type FlightWithPlane,
} from "../providers/FlightProvider";
import { getUrlFile } from "@/lib/supabase";
import {
  CHECKOUT_KEY,
  dateFormat,
  rupiahFormat,
  SEAT_VALUES,
  type SeatValuesType,
} from "@/lib/utils";
import { useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plane, ArrowRight } from "lucide-react";

interface FlightItemProps {
  data: FlightWithPlane;
  isBestValue?: boolean;
}

const FlightItem = ({ data, isBestValue = false }: FlightItemProps) => {
  const { state } = useContext(flightContext) as FContext;
  const selectedSeat = useMemo(() => {
    return SEAT_VALUES[(state.seat as SeatValuesType) ?? "ECONOMY"];
  }, [state.seat]);

  const router = useRouter();

  const bookNow = () => {
    sessionStorage.setItem(
      CHECKOUT_KEY,
      JSON.stringify({
        id: data.id,
        seat: state.seat ? state.seat : "ECONOMY",
      })
    );
    router.push(`/choose-seat/${data.id}`);
  };

  // Calculate flight duration
  const departure = new Date(data.departureDate);
  const arrival = new Date(data.arrivalDate);
  const durationMs = arrival.getTime() - departure.getTime();
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMins = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="group bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 relative overflow-hidden">
      {/* Best Value Badge */}
      {isBestValue && (
        <div className="absolute top-0 right-0 bg-pastel-yellow text-yellow-800 text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 uppercase tracking-wider">
          Best Value
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Airline Info */}
        <div className="flex items-center gap-4 w-full md:w-48">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center p-2 shadow-sm border border-gray-100 overflow-hidden">
            <Image
              width={48}
              height={48}
              src={getUrlFile(data.plane.image)}
              className="w-full h-full object-contain"
              alt={data.plane.name}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-text-dark">{data.plane.name}</span>
            <span className="text-xs text-gray-500 font-medium">
              {selectedSeat.label}
            </span>
          </div>
        </div>

        {/* Flight Route Visual */}
        <div className="flex-1 w-full flex items-center justify-between gap-4 text-center">
          {/* Departure */}
          <div>
            <div className="text-xl md:text-2xl font-black text-text-dark">
              {dateFormat(data.departureDate, "HH:mm")}
            </div>
            <div className="text-gray-500 text-xs font-bold bg-gray-100 px-2 py-1 rounded-md mt-1 inline-block">
              {data.departureCityCode}
            </div>
          </div>

          {/* Route Line */}
          <div className="flex flex-col items-center flex-1 px-2 relative">
            <span className="text-xs font-bold text-gray-500 mb-1">
              {durationHours}h {durationMins}m
            </span>
            <div className="w-full h-[2px] bg-gray-200 relative rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-sky-primary/30 to-transparent" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full border border-gray-100 shadow-sm">
              <Plane className="w-4 h-4 text-sky-primary rotate-90" />
            </div>
            <span className="text-xs text-green-600 font-bold mt-2 bg-green-50 px-2 py-0.5 rounded-full">
              Non-stop
            </span>
          </div>

          {/* Arrival */}
          <div>
            <div className="text-xl md:text-2xl font-black text-text-dark">
              {dateFormat(data.arrivalDate, "HH:mm")}
            </div>
            <div className="text-gray-500 text-xs font-bold bg-gray-100 px-2 py-1 rounded-md mt-1 inline-block">
              {data.destinationCityCode}
            </div>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 gap-3">
          <div className="flex flex-col items-start md:items-end">
            <div className="text-2xl md:text-3xl font-black text-sky-primary">
              {rupiahFormat(data.price + selectedSeat.additionalPrice)}
            </div>
            <span className="text-xs text-gray-500 font-medium">One way</span>
          </div>
          <button
            type="button"
            onClick={bookNow}
            className={`font-bold py-3 px-6 rounded-xl w-auto md:w-full transition-all active:scale-95 flex items-center justify-center gap-2 ${isBestValue
                ? "bg-sky-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-gray-100 hover:bg-gray-200 text-text-dark"
              }`}
          >
            Select <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightItem;
