"use client";

import useCheckoutData from "@/hooks/useCheckoutData";
import SeatItem from "./SeatItem";
import type { FlightSeat } from "@prisma/client";
import { useMemo } from "react";

interface SeatListProps {
  seats: FlightSeat[];
}

const SeatList = ({ seats }: SeatListProps) => {
  const checkout = useCheckoutData();

  const { seatA, seatB, seatC, seatD } = useMemo(() => {
    const rawSeats = seats.filter((seat) => seat.type === checkout?.data?.seat);

    const seatA = rawSeats.filter((seat) => seat.seatNumber.startsWith("A"));
    const seatB = rawSeats.filter((seat) => seat.seatNumber.startsWith("B"));
    const seatC = rawSeats.filter((seat) => seat.seatNumber.startsWith("C"));
    const seatD = rawSeats.filter((seat) => seat.seatNumber.startsWith("D"));

    return { seatA, seatB, seatC, seatD };
  }, [checkout, seats]);

  // Get row numbers
  const rowNumbers = useMemo(() => {
    const allSeats = [...seatA, ...seatB, ...seatC, ...seatD];
    const rows = new Set(allSeats.map((s) => s.seatNumber.slice(1)));
    return Array.from(rows).sort((a, b) => parseInt(a) - parseInt(b));
  }, [seatA, seatB, seatC, seatD]);

  return (
    <form className="space-y-3">
      {rowNumbers.map((rowNum) => {
        const leftSeats = [
          ...seatA.filter((s) => s.seatNumber.endsWith(rowNum)),
          ...seatB.filter((s) => s.seatNumber.endsWith(rowNum)),
        ];
        const rightSeats = [
          ...seatC.filter((s) => s.seatNumber.endsWith(rowNum)),
          ...seatD.filter((s) => s.seatNumber.endsWith(rowNum)),
        ];

        return (
          <div
            key={rowNum}
            className="flex items-center justify-between gap-1 sm:gap-3"
          >
            {/* Left side seats */}
            <div className="flex gap-1 sm:gap-2">
              {leftSeats.map((seat) => (
                <SeatItem key={seat.id} seat={seat} />
              ))}
            </div>

            {/* Row number */}
            <span className="text-[10px] font-medium text-gray-300 w-3 text-center">
              {rowNum}
            </span>

            {/* Right side seats */}
            <div className="flex gap-1 sm:gap-2">
              {rightSeats.map((seat) => (
                <SeatItem key={seat.id} seat={seat} />
              ))}
            </div>
          </div>
        );
      })}
    </form>
  );
};

export default SeatList;
