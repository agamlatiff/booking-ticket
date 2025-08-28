import { getUrlFile } from "@/lib/supabase";
import { dateFormat } from "@/lib/utils";
import type { Airplane, Flight, FlightSeat, Ticket } from "@prisma/client";
import Image from "next/image";

type Data = Pick<Ticket, "id"> & {
  flight: Pick<
    Flight,
    | "departureDate"
    | "departureCityCode"
    | "destinationCityCode"
    | "arrivalDate"
  > & {
    plane: Airplane;
  };
} & {
  seat: Pick<FlightSeat, "type">;
};

interface TicketCardProps {
  data: Data;
}

const TicketCard = ({ data }: TicketCardProps) => {
  return (
    <>
      <div className="ticket-card flex justify-between items-center rounded-[20px] p-5 bg-flysha-bg-purple">
        <div className="flex gap-[16px] items-center">
          <div className="flex shrink-0 w-[90px] h-[70px] rounded-[14px] overflow-hidden">
            <Image
              height={100}
              width={100}
              src={getUrlFile(data.flight.plane.image)}
              className="w-full h-full object-cover"
              alt="thumbnail"
            />
          </div>
          <div className="flex flex-col justify-center-center gap-[2px]">
            <p className="font-bold text-lg">{data.flight.plane.name}</p>
            <p className="text-sm text-flysha-off-purple">{data.seat.type}</p>
          </div>
        </div>
        <p className="w-fit h-fit font-bold text-lg">
          {dateFormat(data.flight.departureDate, "DD-MMM-YYYY")}
        </p>
        <div className="flex items-center gap-[30px]">
          <div className="flex flex-col gap-[2px] text-center">
            <p className="font-bold text-lg">{dateFormat(data.flight.departureDate, 'HH:mm')}</p>
            <p className="text-sm text-flysha-off-purple">{dateFormat(data.flight.departureCityCode)}</p>
          </div>
          <Image
            height={100}
            width={100}
            src="/assets/images/icons/plane-dotted.svg"
            alt="icon"
          />
          <div className="flex flex-col gap-[2px] text-center">
            <p className="font-bold text-lg">{dateFormat(data.flight.arrivalDate, 'HH:mm')}</p>
            <p className="text-sm text-flysha-off-purple">{data.flight.destinationCityCode}</p>
          </div>
        </div>
        <a
          href="my-ticket-details.html"
          className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_20px] h-[48px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
        >
          Details
        </a>
      </div>
    </>
  );
};

export default TicketCard;
