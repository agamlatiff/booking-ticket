import { getAirplanes } from "../../lib/data";

const FilterAirline = async () => {
  const airplanes = await getAirplanes();
  // absen
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Airlines</p>
      {airplanes.map((item, index) => (
        <label
        key={`${item.name}-${index}`}
          htmlFor={item.name}
          className="font-semibold flex items-center gap-[10px] text-white"
        >
          <input
            type="checkbox"
            name="airlines"
            id={item.name}
            value={item.id}
            className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
          />
          {item.name}
        </label>
      ))}
    </div>
  );
};

export default FilterAirline;
