"use client";

import type { Airplane, Flight } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useReducer,
  type Dispatch,
  type FC,
  type ReactNode,
} from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

interface FlightProviderProps {
  children: ReactNode;
}

export enum FilterActionKind {
  ADD_PLANE = "ADD_PLANE",
  REMOVE_PLANE = "REMOVE_PLANE",
}

type FilterState = {
  departure?: string | null;
  arrival?: string | null;
  date?: string | null;
  planeId: string | null;
  planeIds: string[];
  seat?: string | null;
};

type FilterAction = {
  type: FilterActionKind;
  payload: Omit<FilterState, "planeids">;
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  const { payload, type } = action;

  switch (type) {
    case FilterActionKind.ADD_PLANE:
      return {
        ...state,
        planeIds: payload.planeId
          ? [...state.planeIds, payload.planeId]
          : state.planeIds,
      };
    case FilterActionKind.REMOVE_PLANE:
      return {
        ...state,
        planeIds: payload.planeIds
          ? state.planeIds.filter((item) => item !== payload.planeId)
          : payload.planeIds,
      };
    default:
      return state;
  }
}

export type FlightWithPlane = Flight & {
  plane: Airplane;
};

export type FContext = {
  flights: FlightWithPlane[] | undefined;
  isLoading: boolean;
  dispatch: Dispatch<FilterAction>;
};

export const flightContext = createContext<FContext | null>(null);

const FlightProvider: FC<FlightProviderProps> = ({ children }) => {
  
  const search = useSearchParams()
  
  const params = {
    departure: search.get('departure'),
    arrival: search.get('arrival'),
    date: search.get('date'),
  }
  
  const [state, dispatch] = useReducer(filterReducer, {
    arrival: params.arrival,
    date: params.date,
    departure: params.departure,
    planeId: "",
    planeIds: [],
    seat: null,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["flights-list", state],
    queryFn: () => axios.post("/api/flights", state).then((res) => res.data.data),
  });

  return (
    <flightContext.Provider value={{ flights: data, isLoading, dispatch }}>
      {children}
    </flightContext.Provider>
  );
};

export default FlightProvider;
