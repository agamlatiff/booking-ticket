"use client";

import type { Airplane, Flight } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { createContext, type FC, type ReactNode } from "react";
import axios from "axios";

interface FlightProviderProps {
  children: ReactNode;
}

export type FlightWithPlane = Flight & {
  plane: Airplane;
};

export type FContext = {
  flights: FlightWithPlane[] | undefined;
  isLoading: boolean;
};

export const flightContext = createContext<FContext | null>(null);

const FlightProvider: FC<FlightProviderProps> = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["flights-list"],
    queryFn: () => axios.get("/api/flights").then((res) => res.data.data),
  });
  return (
    <flightContext.Provider value={{ flights: data, isLoading }}>
      {children}
    </flightContext.Provider>
  );
};

export default FlightProvider;
