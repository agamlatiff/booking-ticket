const FIlterFlight = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-text-dark text-sm font-bold mb-1">Stops</p>
      <label
        htmlFor="direct"
        className="flex items-center gap-3 cursor-pointer group"
      >
        <input
          type="checkbox"
          name="flight"
          id="direct"
          defaultChecked
          className="w-5 h-5 rounded-md border-2 border-gray-300 text-sky-primary focus:ring-sky-primary/20 transition-all"
        />
        <span className="text-gray-500 text-sm font-medium group-hover:text-sky-primary transition-colors">
          Non-stop
        </span>
      </label>
      <label
        htmlFor="transit"
        className="flex items-center gap-3 cursor-pointer group"
      >
        <input
          type="checkbox"
          name="flight"
          id="transit"
          className="w-5 h-5 rounded-md border-2 border-gray-300 text-sky-primary focus:ring-sky-primary/20 transition-all"
        />
        <span className="text-gray-500 text-sm font-medium group-hover:text-sky-primary transition-colors">
          1 Stop
        </span>
      </label>
      <label
        htmlFor="transits"
        className="flex items-center gap-3 cursor-pointer group"
      >
        <input
          type="checkbox"
          name="flight"
          id="transits"
          className="w-5 h-5 rounded-md border-2 border-gray-300 text-sky-primary focus:ring-sky-primary/20 transition-all"
        />
        <span className="text-gray-500 text-sm font-medium group-hover:text-sky-primary transition-colors">
          2+ Stops
        </span>
      </label>
    </div>
  );
};

export default FIlterFlight;
