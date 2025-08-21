const FilterAirline = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Airlines</p>
      <label
        htmlFor="garda"
        className="font-semibold flex items-center gap-[10px] text-white"
      >
        <input
          type="checkbox"
          name="airlines"
          id="garda"
          className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
        />
        Garda Flying
      </label>
      <label
        htmlFor="angga"
        className="font-semibold flex items-center gap-[10px] text-white"
      >
        <input
          type="checkbox"
          name="airlines"
          id="angga"
          className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
        />
        Angga Air
      </label>
      <label
        htmlFor="singaparna"
        className="font-semibold flex items-center gap-[10px] text-white"
      >
        <input
          type="checkbox"
          name="airlines"
          id="singaparna"
          className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
        />
        Singaparna
      </label>
      <label
        htmlFor="jakafly"
        className="font-semibold flex items-center gap-[10px] text-white"
      >
        <input
          type="checkbox"
          name="airlines"
          id="jakafly"
          className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
        />
        Jakafly
      </label>
    </div>
  );
};

export default FilterAirline;
