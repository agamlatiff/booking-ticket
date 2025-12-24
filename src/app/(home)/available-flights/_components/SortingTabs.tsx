"use client";

import { useContext } from "react";
import {
  flightContext,
  FilterActionKind,
  type FContext,
  type SortOption,
} from "../providers/FlightProvider";

const sortTabs = [
  { value: "recommended" as SortOption, label: "Best Value" },
  { value: "cheapest" as SortOption, label: "Cheapest" },
  { value: "fastest" as SortOption, label: "Fastest" },
];

const sortOptions = [
  { value: "recommended" as SortOption, label: "Recommended" },
  { value: "price_low" as SortOption, label: "Price: Low to High" },
  { value: "price_high" as SortOption, label: "Price: High to Low" },
  { value: "duration" as SortOption, label: "Duration: Short to Long" },
];

const SortingTabs = () => {
  const { state, dispatch } = useContext(flightContext) as FContext;

  const handleTabClick = (sort: SortOption) => {
    dispatch({
      type: FilterActionKind.SET_SORT,
      payload: { sort },
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: FilterActionKind.SET_SORT,
      payload: { sort: e.target.value as SortOption },
    });
  };

  // Map tabs to active state (handle mapping of aliases)
  const getActiveTab = (): SortOption => {
    if (state.sort === "price_low" || state.sort === "price_high") return "cheapest";
    if (state.sort === "duration") return "fastest";
    return state.sort;
  };

  const activeTab = getActiveTab();

  return (
    <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
      {/* Tab Buttons */}
      <div className="flex w-full sm:w-auto p-1 bg-gray-100/50 rounded-lg">
        {sortTabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleTabClick(tab.value)}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.value
                ? "bg-white text-text-dark shadow-sm border border-gray-100"
                : "text-gray-500 hover:text-sky-primary"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dropdown Sort */}
      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium px-2">
        <span>Sort by:</span>
        <select
          value={state.sort}
          onChange={handleSelectChange}
          className="bg-transparent border-none text-text-dark font-bold p-0 pr-6 focus:ring-0 cursor-pointer"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortingTabs;
