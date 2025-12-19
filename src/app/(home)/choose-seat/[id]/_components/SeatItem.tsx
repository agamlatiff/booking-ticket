"use client";

import type { FlightSeat } from "@prisma/client";
import { useContext } from "react";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";
import { X, Check, ArrowUpFromLine } from "lucide-react";

interface SeatItemProps {
  seat: FlightSeat;
  isExitRow?: boolean;
}

const SeatItem = ({ seat, isExitRow = false }: SeatItemProps) => {
  const { selectedSeat, setSelectedSeat } = useContext(
    seatContext
  ) as SeatContextType;

  const isSelected = selectedSeat?.id === seat.id;
  const isBooked = seat.isBooked ?? false;

  return (
    <label className="group cursor-pointer relative">
      <input
        type="radio"
        name="seat"
        className="seat-checkbox hidden"
        disabled={isBooked}
        checked={isSelected}
        onChange={() => setSelectedSeat(seat)}
      />
      <div
        className={`
          relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center 
          font-bold text-sm transition-all duration-200 ease-out
          ${isBooked
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : isSelected
              ? "bg-sky-primary text-white shadow-lg shadow-blue-300/50 scale-105"
              : isExitRow
                ? "border-2 border-amber-300 bg-amber-50 text-amber-700 hover:border-sky-primary hover:bg-blue-50 hover:text-sky-primary hover:scale-105"
                : "border-2 border-gray-200 bg-white text-gray-500 hover:border-sky-primary hover:bg-blue-50 hover:text-sky-primary hover:scale-105"
          }
          ${!isBooked && !isSelected ? "active:scale-95" : ""}
        `}
      >
        {isBooked ? (
          <X className="w-4 h-4" />
        ) : isSelected ? (
          <Check className="w-4 h-4" />
        ) : (
          <span>{seat.seatNumber}</span>
        )}

        {/* Extra legroom badge for exit row */}
        {isExitRow && !isBooked && !isSelected && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
            <ArrowUpFromLine className="w-2.5 h-2.5 text-white" />
          </div>
        )}

        {/* Selection ring animation */}
        {isSelected && (
          <div className="absolute inset-0 rounded-lg ring-4 ring-sky-primary/30 animate-pulse" />
        )}
      </div>
    </label>
  );
};

export default SeatItem;
