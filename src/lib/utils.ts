import type { TypeSeat } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSeatPerClass = (flightId: string) => {
  const SEAT_CLASS: TypeSeat[] = ["ECONOMY", "BUSSINESS", "FIRST"];
  const SEAT_CODE = ["A", "B", "C", "D"];

  const seats: { seatNumber: string; type: TypeSeat; flightId: string }[] = [];

  SEAT_CLASS.forEach((className) => {
    SEAT_CODE.map((seat) => {
      for (let i = 1; i <= 5; i++) {
        seats.push({
          seatNumber: seat + i,
          type: className as TypeSeat,
          flightId,
        });
      }
    });
  });

  return seats;
};
