"use client";

import type { Airplane } from "@prisma/client";
import { useContext, type ChangeEvent } from "react";
import {
  FilterActionKind,
  flightContext,
  type FContext,
} from "../providers/FlightProvider";
import Image from "next/image";
import { getUrlFile } from "@/lib/supabase";

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
        planeIds: [],
      },
    });
  };

  return (
    <label
      htmlFor={item.name}
      className="flex items-center gap-3 cursor-pointer group"
    >
      <input
        type="checkbox"
        name="airlines"
        id={item.name}
        value={item.id}
        onChange={handleChange}
        className="w-5 h-5 rounded-md border-2 border-gray-300 text-sky-primary focus:ring-sky-primary/20 transition-all"
      />
      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
        <Image
          src={getUrlFile(item.image)}
          alt={item.name}
          width={24}
          height={24}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-gray-500 text-sm font-medium group-hover:text-sky-primary transition-colors">
        {item.name}
      </span>
    </label>
  );
};

export default CheckboxAirline;
