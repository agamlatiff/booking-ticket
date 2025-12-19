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
      <p className="text-text-dark text-sm font-bold mb-1">Seat Class</p>
      {SEAT_OPTIONS.map((item, index) => (
        <label
          key={`${item + index}`}
          htmlFor={item}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <input
            onChange={handleChange}
            type="radio"
            name="seat"
            id={item}
            value={item}
            checked={state.seat === item}
            className="w-5 h-5 rounded-md border-2 border-gray-300 text-sky-primary focus:ring-sky-primary/20 transition-all"
          />
          <span className="text-gray-500 text-sm font-medium group-hover:text-sky-primary transition-colors">
            {SEAT_LABELS[item]}
          </span>
        </label>
      ))}
    </div>
  );
};

export default FilterClass;
