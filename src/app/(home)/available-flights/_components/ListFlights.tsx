
import FlightItem from "./FlightItem";
import { useContext } from "react";
import { flightContext, type FContext } from "../providers/FlightProvider";
import LoadingListFlights from "./LoadingListFlights";

const ListFlights = () => {
  const { flights, isLoading } = useContext(flightContext) as FContext;

  if(isLoading) {
    return <LoadingListFlights/>
  }
  
  return (
    <div className="ticket-container flex flex-col w-full gap-6">
      {flights?.map((val) => (
        <FlightItem key={val.id} data={val}/>
      ))}
      <p className="text-center text-sm text-[#A0A0AC] h-fit">
        You’ve reached the end of results.
      </p>
    </div>
  );
};

export default ListFlights;
