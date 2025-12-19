"use client";

import type { FlightSeat, TypeSeat } from "@prisma/client";
import type { FC, ReactNode } from "react";
import { createContext, useState, useEffect, useCallback } from "react";
import { CHECKOUT_KEY, type Checkout } from "@/lib/utils";

interface SeatProviderProps {
  children: ReactNode;
}

export type SeatContextType = {
  seat: FlightSeat | null;
  selectedSeat: FlightSeat | null;
  setSelectedSeat: (seat: FlightSeat | null) => void;
  selectedClass: TypeSeat;
  setSelectedClass: (seatClass: TypeSeat) => void;
};

export const seatContext = createContext<SeatContextType | null>(null);

const SeatProvider: FC<SeatProviderProps> = ({ children }) => {
  const [seat, setSeat] = useState<FlightSeat | null>(null);
  const [selectedClass, setSelectedClassState] = useState<TypeSeat>("ECONOMY");

  // Initialize from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      const value = window.sessionStorage.getItem(CHECKOUT_KEY);
      if (value) {
        const parsed: Checkout = JSON.parse(value);
        if (parsed.seat) {
          setSelectedClassState(parsed.seat);
        }
      }
    }
  }, []);

  const setSelectedSeat = useCallback((newSeat: FlightSeat | null) => {
    setSeat(newSeat);
  }, []);

  const setSelectedClass = useCallback((seatClass: TypeSeat) => {
    setSelectedClassState(seatClass);
    // Reset selected seat when class changes
    setSeat(null);

    // Update sessionStorage
    if (typeof window !== "undefined" && window.sessionStorage) {
      const value = window.sessionStorage.getItem(CHECKOUT_KEY);
      if (value) {
        const parsed: Checkout = JSON.parse(value);
        parsed.seat = seatClass;
        window.sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(parsed));
      }
    }
  }, []);

  return (
    <seatContext.Provider
      value={{
        seat,
        selectedSeat: seat,
        setSelectedSeat,
        selectedClass,
        setSelectedClass,
      }}
    >
      {children}
    </seatContext.Provider>
  );
};

export default SeatProvider;
