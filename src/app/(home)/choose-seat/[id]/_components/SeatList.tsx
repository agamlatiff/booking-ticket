"use client";

import useCheckoutData from "@/hooks/useCheckoutData";
import SeatItem from "./SeatItem";

const SeatList = () => {
  
  const checkout = useCheckoutData()
  return (
    <form className="flex flex-row  justify-between gap-5">
      <div className="flex gap-5">
        <div className="flex flex-col gap-[19px]">
          <SeatItem />
        </div>
        <div className="flex flex-col gap-[19px]">
          <SeatItem />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-[19px]">
          <SeatItem />
        </div>
        <div className="flex flex-col gap-[19px]">
          <SeatItem />
        </div>
      </div>
    </form>
  );
};

export default SeatList;
