"use client ";

import type { Airplane } from "@prisma/client";
import { useContext, type ChangeEvent } from "react";
import {
  FilterActionKind,
  flightContext,
  type FContext,
} from "../providers/FlightProvider";

interface CheckboxAirlineProps {
  item: Airplane;
}

const CheckboxAirline = ({ item }: CheckboxAirlineProps) => {
  const { dispatch } = useContext(flightContext) as FContext;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    dispatch({
      type: isChecked
        ? FilterActionKind.ADD_PLANE
        : FilterActionKind.REMOVE_PLANE,
        payload: {
          planeId: value,
        }
    });
  };

  return (
    <label
      htmlFor={item.name}
      className="font-semibold flex items-center gap-[10px] text-white"
    >
      <input
        type="checkbox"
        name="airlines"
        id={item.name}
        value={item.id}
        onChange={handleChange}
        className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
      />
      {item.name}
    </label>
  );
};

export default CheckboxAirline;
