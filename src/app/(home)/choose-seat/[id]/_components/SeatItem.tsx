"use client";

import type { FlightSeat } from "@prisma/client";
import { useContext } from "react";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";
import { X, Check } from "lucide-react";

interface SeatItemProps {
  seat: FlightSeat;
}

const SeatItem = ({ seat }: SeatItemProps) => {
  const { selectedSeat, setSelectedSeat } = useContext(
    seatContext
  ) as SeatContextType;

  const isSelected = selectedSeat?.id === seat.id;
  const isBooked = seat.isBooked ?? false;

  return (
    <label className="group cursor-pointer">
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
          w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center font-bold text-sm transition-all
          ${isBooked
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : isSelected
              ? "bg-sky-primary text-white shadow-lg shadow-blue-200"
              : "border-2 border-gray-200 bg-white text-gray-500 hover:border-sky-primary hover:bg-blue-50 hover:text-sky-primary"
          }
        `}
      >
        {isBooked ? (
          <X className="w-4 h-4" />
        ) : isSelected ? (
          <Check className="w-4 h-4" />
        ) : (
          seat.seatNumber
        )}
      </div>
    </label>
  );
};

export default SeatItem;
