import type { TypeSeat } from "@prisma/client";

const SEAT_OPTIONS: TypeSeat[] = ["ECONOMY", "BUSSINESS", "FIRST"];

const FilterClass = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Seat Class</p>
      {SEAT_OPTIONS.map((item, index) => (
        <label key={`${item + index}`}
          htmlFor={item}
          className="font-semibold flex items-center gap-[10px] has-[:checked]:text-white"
        >
          <input
            type="radio"
            name="seat"
            id={item}
            value={item}
            className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-full checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
          />
          {item}
        </label>
      ))}
    </div>
  );
};

export default FilterClass;
