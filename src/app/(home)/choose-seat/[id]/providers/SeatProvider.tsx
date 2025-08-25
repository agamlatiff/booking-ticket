"use client";

import type { FlightSeat } from "@prisma/client";
import type { FC, ReactNode } from "react";
import { createContext, useState } from "react";

interface SeatProviderProps {
  children: ReactNode;
}

export type SeatContextType = {
  seat: FlightSeat | null;
  setSelectedSeat: (seat: FlightSeat) => void;
};

export const seatContext = createContext<SeatContextType | null>(null);

const SeatProvider: FC<SeatProviderProps> = ({ children }) => {
  const [seat, setSeat] = useState<FlightSeat | null>(null);

  const setSelectedSeat = (seat: FlightSeat) => {
    setSeat(seat);
  };

  return (
    <seatContext.Provider value={{ seat, setSelectedSeat }}>
      {children}
    </seatContext.Provider>
  );
};

export default SeatProvider;
