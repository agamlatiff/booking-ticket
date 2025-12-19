"use client";

import { useContext, useMemo } from "react";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";
import type { FlightSeat, TypeSeat } from "@prisma/client";
import { SEAT_VALUES } from "@/lib/utils";
import { rupiahFormat } from "@/lib/utils";
import { Armchair, Crown, Sparkles } from "lucide-react";

interface SeatClassToggleProps {
  seats: FlightSeat[];
  basePrice: number;
}

const CLASS_OPTIONS: {
  value: TypeSeat;
  label: string;
  icon: typeof Armchair;
  color: string;
  bgColor: string;
}[] = [
    {
      value: "ECONOMY",
      label: "Economy",
      icon: Armchair,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
    {
      value: "BUSSINESS",
      label: "Business",
      icon: Sparkles,
      color: "text-sky-primary",
      bgColor: "bg-sky-primary/10",
    },
    {
      value: "FIRST",
      label: "First Class",
      icon: Crown,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

const SeatClassToggle = ({ seats, basePrice }: SeatClassToggleProps) => {
  const { selectedClass, setSelectedClass } = useContext(
    seatContext
  ) as SeatContextType;

  // Calculate seat availability for each class
  const seatCounts = useMemo(() => {
    const counts: Record<TypeSeat, { available: number; total: number }> = {
      ECONOMY: { available: 0, total: 0 },
      BUSSINESS: { available: 0, total: 0 },
      FIRST: { available: 0, total: 0 },
    };

    seats.forEach((seat) => {
      counts[seat.type].total++;
      if (!seat.isBooked) {
        counts[seat.type].available++;
      }
    });

    return counts;
  }, [seats]);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
        Select Class
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {CLASS_OPTIONS.map((option) => {
          const isSelected = selectedClass === option.value;
          const count = seatCounts[option.value];
          const priceInfo = SEAT_VALUES[option.value];
          const totalPrice = basePrice + priceInfo.additionalPrice;
          const Icon = option.icon;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setSelectedClass(option.value)}
              className={`
                relative flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300
                ${isSelected
                  ? `${option.bgColor} ring-2 ring-offset-2 ${option.value === "ECONOMY"
                    ? "ring-gray-400"
                    : option.value === "BUSSINESS"
                      ? "ring-sky-primary"
                      : "ring-amber-500"
                  }`
                  : "bg-gray-50 hover:bg-gray-100"
                }
                ${count.available === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
              disabled={count.available === 0}
            >
              {/* Icon */}
              <div
                className={`
                p-2 rounded-lg transition-colors duration-300
                ${isSelected ? option.bgColor : "bg-white"}
              `}
              >
                <Icon
                  className={`w-5 h-5 ${isSelected ? option.color : "text-gray-400"}`}
                />
              </div>

              {/* Label */}
              <span
                className={`text-sm font-bold ${isSelected ? option.color : "text-gray-600"
                  }`}
              >
                {option.label}
              </span>

              {/* Price */}
              <span className="text-xs text-gray-500">
                {rupiahFormat(totalPrice)}
              </span>

              {/* Availability Badge */}
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${count.available > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`}
              >
                {count.available}/{count.total} seats
              </span>

              {/* Selected indicator */}
              {isSelected && (
                <div
                  className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] ${option.value === "ECONOMY"
                      ? "bg-gray-500"
                      : option.value === "BUSSINESS"
                        ? "bg-sky-primary"
                        : "bg-amber-500"
                    }`}
                >
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SeatClassToggle;
