import React from "react";

const FilterClass = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Seat Class</p>
      <label
        htmlFor="economy"
        className="font-semibold flex items-center gap-[10px] has-[:checked]:text-white"
      >
        <input
          type="radio"
          name="seat"
          id="economy"
          className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-full checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
        />
        Economy
      </label>
      <label
        htmlFor="business"
        className="font-semibold flex items-center gap-[10px] has-[:checked]:text-white"
      >
        <input
          type="radio"
          name="seat"
          id="business"
          className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-full checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
        />
        Business
      </label>
      <label
        htmlFor="first"
        className="font-semibold flex items-center gap-[10px] has-[:checked]:text-white"
      >
        <input
          type="radio"
          name="seat"
          id="first"
          className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-full checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
        />
        First
      </label>
    </div>
  );
};

export default FilterClass;
