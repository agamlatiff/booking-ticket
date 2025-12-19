"use client";
import FlightItem from "./FlightItem";
import { useContext } from "react";
import { flightContext, type FContext } from "../providers/FlightProvider";
import LoadingListFlights from "./LoadingListFlights";

const ListFlights = () => {
  const { flights, isLoading } = useContext(flightContext) as FContext;

  if (isLoading) {
    return <LoadingListFlights />;
  }

  return (
    <div className="flex flex-col gap-5">
      {flights?.map((val, index) => (
        <FlightItem key={val.id} data={val} isBestValue={index === 0} />
      ))}

      {flights && flights.length > 0 && (
        <div className="flex justify-center pt-8">
          <button className="text-gray-500 font-bold text-sm hover:text-sky-primary transition-colors flex items-center gap-2">
            You&apos;ve reached the end of results.
          </button>
        </div>
      )}

      {flights && flights.length === 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
          <p className="text-gray-500 font-medium">
            No flights found for this route. Try adjusting your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default ListFlights;
