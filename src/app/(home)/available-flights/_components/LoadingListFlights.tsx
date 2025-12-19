import LoadingFlightsItem from "./LoadingFlightsItem";

const LoadingListFlights = () => {
  return (
    <div className="ticket-container flex flex-col w-full gap-6">
      <LoadingFlightsItem />
      <LoadingFlightsItem />
    </div>
  );
};

export default LoadingListFlights;
