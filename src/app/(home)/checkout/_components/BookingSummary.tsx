"use client";

import useCheckoutData from "@/hooks/useCheckoutData";
import { getUrlFile } from "@/lib/supabase";
import {
  dateFormat,
  rupiahFormat,
  SEAT_VALUES,
  type SeatValuesType,
} from "@/lib/utils";
import type { User } from "lucia";
import Image from "next/image";
import { useMemo } from "react";
import { Receipt, Armchair } from "lucide-react";

interface BookingSummaryProps {
  user: User | null;
}

const BookingSummary = ({ user }: BookingSummaryProps) => {
  const { data } = useCheckoutData();

  const selectedSeat = useMemo(() => {
    return SEAT_VALUES[(data?.seat as SeatValuesType) ?? "ECONOMY"];
  }, [data?.seat]);

  const totalPrice = useMemo(() => {
    if (!data?.flightDetail?.price) return 0;
    return data.flightDetail.price + selectedSeat.additionalPrice;
  }, [data?.flightDetail?.price, selectedSeat.additionalPrice]);

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-sky-primary/5 border border-gray-100 relative overflow-hidden">
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-primary via-blue-300 to-yellow-300" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-dashed border-gray-200">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-sky-primary">
          <Receipt className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-text-dark">Booking Summary</h3>
      </div>

      {/* Flight Info */}
      {data?.flightDetail && (
        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
            <Image
              width={64}
              height={48}
              src={getUrlFile(data.flightDetail.plane.image)}
              className="w-full h-full object-cover"
              alt={data.flightDetail.plane.name}
            />
          </div>
          <div>
            <p className="font-bold text-text-dark">
              {data.flightDetail.departureCity} → {data.flightDetail.destinationCity}
            </p>
            <p className="text-sm text-gray-500">
              {dateFormat(data.flightDetail.departureDate, "DD MMM YYYY")} •{" "}
              {data.flightDetail.plane.name}
            </p>
          </div>
        </div>
      )}

      {/* Items */}
      <div className="flex flex-col gap-4">
        {/* Seat Selection */}
        <div className="flex justify-between items-center group">
          <div className="flex items-center gap-3">
            <Armchair className="w-5 h-5 text-gray-400 group-hover:text-sky-primary transition-colors" />
            <div>
              <p className="text-text-dark text-sm font-bold">
                Seat {data?.seatDetail?.seatNumber || "—"}
              </p>
              <p className="text-gray-500 text-xs">{user?.name || "Passenger 1"}</p>
            </div>
          </div>
          <p className="text-text-dark text-base font-bold">
            {rupiahFormat(selectedSeat.additionalPrice)}
          </p>
        </div>

        {/* Flight Price */}
        <div className="flex justify-between items-center group">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 text-gray-400">✈️</div>
            <div>
              <p className="text-text-dark text-sm font-bold">Flight Ticket</p>
              <p className="text-gray-500 text-xs">{selectedSeat.label} Class</p>
            </div>
          </div>
          <p className="text-text-dark text-base font-bold">
            {rupiahFormat(data?.flightDetail?.price || 0)}
          </p>
        </div>
      </div>

      {/* Total */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-end">
        <p className="text-gray-500 text-sm font-medium">Total due today</p>
        <h2 className="text-sky-primary text-3xl font-black tracking-tight">
          {rupiahFormat(totalPrice)}
        </h2>
      </div>
    </div>
  );
};

export default BookingSummary;
