"use client";
import type { TypeSeat } from "@prisma/client";
import { useContext, type ChangeEvent } from "react";
import {
  FilterActionKind,
  flightContext,
  type FContext,
} from "../providers/FlightProvider";

const SEAT_OPTIONS: TypeSeat[] = ["ECONOMY", "BUSSINESS", "FIRST"];
const SEAT_LABELS: Record<TypeSeat, string> = {
  ECONOMY: "Economy",
  BUSSINESS: "Business",
  FIRST: "First Class",
};

const FilterClass = () => {
  const { dispatch, state } = useContext(flightContext) as FContext;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FilterActionKind.SET_SEAT,
      payload: {
        seat: event.target.value,
        planeId: "",
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-gray-900 dark:text-white text-sm font-bold mb-1">Seat Class</p>
      {SEAT_OPTIONS.map((item, index) => (
        <label
          key={`${item + index}`}
          htmlFor={item}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <input
              onChange={handleChange}
              type="radio"
              name="seat"
              id={item}
              value={item}
              checked={state.seat === item}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 peer-checked:border-accent peer-checked:bg-accent transition-all flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform" />
            </div>
          </div>
          <span className="text-gray-600 dark:text-gray-300 text-sm font-medium group-hover:text-accent transition-colors">
            {SEAT_LABELS[item]}
          </span>
        </label>
      ))}
    </div>
  );
};

export default FilterClass;
