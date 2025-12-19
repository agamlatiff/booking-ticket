"use client";

import type { FlightSeat } from "@prisma/client";
import { useContext, useState } from "react";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";
import { X, Check, ArrowUpFromLine, Eye } from "lucide-react";

interface SeatItemProps {
  seat: FlightSeat;
  isExitRow?: boolean;
  isHighlighted?: boolean;
}

// Determine seat position based on letter
const getSeatPosition = (seatNumber: string): string => {
  const letter = seatNumber.charAt(0);
  if (letter === "A" || letter === "D") return "Window";
  if (letter === "B" || letter === "C") return "Aisle";
  return "Middle";
};

// Get seat amenities based on position and row
const getSeatAmenities = (seatNumber: string, isExitRow: boolean): string[] => {
  const position = getSeatPosition(seatNumber);
  const amenities: string[] = [];

  if (position === "Window") {
    amenities.push("🪟 Window View");
  }
  if (position === "Aisle") {
    amenities.push("🚶 Easy Access");
  }
  if (isExitRow) {
    amenities.push("🦵 Extra Legroom");
    amenities.push("⚠️ Emergency Exit");
  }
  amenities.push("💺 Reclinable Seat");
  amenities.push("🔌 Power Outlet");

  return amenities;
};

const SeatItem = ({ seat, isExitRow = false, isHighlighted = true }: SeatItemProps) => {
  const { selectedSeat, setSelectedSeat } = useContext(
    seatContext
  ) as SeatContextType;
  const [showTooltip, setShowTooltip] = useState(false);

  const isSelected = selectedSeat?.id === seat.id;
  const isBooked = seat.isBooked ?? false;
  const seatPosition = getSeatPosition(seat.seatNumber);
  const amenities = getSeatAmenities(seat.seatNumber, isExitRow);

  // Dim non-highlighted seats when filtering
  const dimmedClass = !isHighlighted && !isSelected ? "opacity-30 scale-90" : "";

  return (
    <div className={`relative transition-all duration-300 ${dimmedClass}`}>
      <label
        className="group cursor-pointer relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onTouchStart={() => setShowTooltip(true)}
        onTouchEnd={() => setTimeout(() => setShowTooltip(false), 2000)}
      >
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

          {/* Info indicator for non-booked seats */}
          {!isBooked && !isSelected && isHighlighted && (
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-2 h-2 text-gray-400" />
            </div>
          )}
        </div>
      </label>

      {/* Enhanced Tooltip */}
      {showTooltip && !isBooked && isHighlighted && (
        <div
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 animate-in fade-in-0 zoom-in-95 duration-200"
          style={{ pointerEvents: 'none' }}
        >
          <div className="bg-gray-900 text-white rounded-xl shadow-xl p-3 relative">
            {/* Arrow */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45" />

            {/* Header */}
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-700">
              <span className="font-bold text-sm">Seat {seat.seatNumber}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${seatPosition === "Window"
                  ? "bg-blue-500/20 text-blue-300"
                  : "bg-green-500/20 text-green-300"
                }`}>
                {seatPosition}
              </span>
            </div>

            {/* Amenities List */}
            <div className="space-y-1">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-1.5 text-[11px] text-gray-300">
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

            {/* Select hint */}
            <div className="mt-2 pt-2 border-t border-gray-700 text-center">
              <span className="text-[10px] text-gray-400">Tap to select</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatItem;
