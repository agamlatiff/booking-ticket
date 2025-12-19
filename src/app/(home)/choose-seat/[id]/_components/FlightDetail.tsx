"use client";

import { getUrlFile } from "@/lib/supabase";
import {
  CHECKOUT_KEY,
  dateFormat,
  rupiahFormat,
  SEAT_VALUES,
  type Checkout,
  type SeatValuesType,
} from "@/lib/utils";
import type { Airplane, Flight, FlightSeat } from "@prisma/client";
import Image from "next/image";
import { useContext, useMemo } from "react";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";
import { useToast } from "@/hooks/use-toast";
import type { Session } from "lucia";
import { useRouter } from "next/navigation";
import { Plane, ArrowRight, Sparkles } from "lucide-react";

type FlightProps = Flight & { seats: FlightSeat[]; plane: Airplane };

interface FlightDetailProps {
  flight: FlightProps;
  session: Session | null;
}

const FlightDetail = ({ flight, session }: FlightDetailProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const { selectedSeat, selectedClass } = useContext(seatContext) as SeatContextType;

  const seatClass = useMemo(() => {
    return SEAT_VALUES[selectedClass as SeatValuesType];
  }, [selectedClass]);

  const continueBook = () => {
    if (selectedSeat === null) {
      toast({
        title: "Failed to checkout",
        description: "Please select a seat first",
      });
      return;
    }

    if (session === null) {
      router.replace("/sign-in");
      return;
    }

    const checkoutData: Checkout = {
      id: flight.id,
      seat: selectedClass,
      flightDetail: flight,
      seatDetail: selectedSeat,
    };

    sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(checkoutData));
    router.push("/checkout");
  };

  const totalPrice = flight.price + seatClass.additionalPrice;

  return (
    <div className="lg:sticky lg:top-24 space-y-6">
      {/* Flight Card - Separate Card */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-200 relative overflow-hidden">
        <div className="flex justify-between items-start mb-6 z-10 relative">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              Flight
            </p>
            <p className="text-xl font-black text-text-dark">
              {flight.departureCityCode}{" "}
              <span className="text-gray-300 font-light mx-1">→</span>{" "}
              {flight.destinationCityCode}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {dateFormat(flight.departureDate, "MMM dd, HH:mm a")}
            </p>
          </div>
          <div className="bg-sky-primary/10 text-sky-primary px-3 py-1 rounded-full text-xs font-bold">
            {flight.plane.code}
          </div>
        </div>

        {/* Decorative Map Line */}
        <div className="relative h-16 w-full">
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-200 border-t border-dashed border-gray-300" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-300 border-2 border-white" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sky-primary border-2 border-white shadow-sm ring-2 ring-sky-primary/20" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full border border-gray-100 shadow-sm">
            <Plane className="w-5 h-5 text-sky-primary rotate-90" />
          </div>
        </div>
      </div>

      {/* Selection Card - Separate Card */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-200">
        <h3 className="text-lg font-bold text-text-dark mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-primary" />
          Your Selection
        </h3>

        <div className="space-y-4">
          {/* Class Badge */}
          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-sky-primary/5 to-blue-50 rounded-xl border border-sky-primary/10">
            <span className="text-sm font-bold text-sky-primary">
              {seatClass.label} Class
            </span>
            {seatClass.additionalPrice > 0 && (
              <span className="ml-auto text-xs text-gray-500">
                +{rupiahFormat(seatClass.additionalPrice)}
              </span>
            )}
          </div>

          {/* Passenger Selection */}
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <div
              className={`text-white w-12 h-12 rounded-lg flex flex-col items-center justify-center shadow-lg transition-all duration-300 ${selectedSeat
                  ? "bg-sky-primary shadow-blue-200"
                  : "bg-gray-300"
                }`}
            >
              <span className="text-xs font-medium opacity-80">Seat</span>
              <span className="text-lg font-bold leading-none">
                {selectedSeat?.seatNumber || "—"}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-text-dark">Passenger 1</p>
              <p className="text-xs text-gray-500">{seatClass.label}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-text-dark">
                {rupiahFormat(seatClass.additionalPrice)}
              </p>
            </div>
          </div>

          {/* Airplane Image */}
          <div className="h-28 w-full rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center relative overflow-hidden group border border-gray-100">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#63a6e9_1px,transparent_1px)] [background-size:16px_16px]" />
            <Image
              src={getUrlFile(flight.plane.image)}
              alt={flight.plane.name}
              width={140}
              height={90}
              className="rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 object-cover"
            />
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-500 text-sm">Ticket Price</span>
            <span className="text-text-dark font-medium">
              {rupiahFormat(flight.price)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 text-sm">
              Seat Upgrade
            </span>
            <span className="text-sky-primary font-medium">
              {seatClass.additionalPrice > 0
                ? `+${rupiahFormat(seatClass.additionalPrice)}`
                : "Free"}
            </span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
            <span className="text-lg font-bold text-text-dark">Total</span>
            <span className="text-2xl font-black text-sky-primary">
              {rupiahFormat(totalPrice)}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={continueBook}
          disabled={!selectedSeat}
          className={`
            w-full mt-6 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2
            ${selectedSeat
              ? "bg-sky-primary hover:bg-blue-600 text-white shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Confirm Seat Selection
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FlightDetail;
