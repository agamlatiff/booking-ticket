"use client";

import useCheckoutData from "@/hooks/useCheckoutData";
import { getUrlFile } from "@/lib/supabase";
import {
  dateFormat,
  rupiahFormat,
  SEAT_VALUES,
  type SeatValuesType,
} from "@/lib/utils";
import type { Airplane, Flight, FlightSeat } from "@prisma/client";
import Image from "next/image";
import { useContext, useMemo } from "react";
import { seatContext, type SeatContextType } from "../providers/SeatProvider";

type FlightProps = Flight & { seats: FlightSeat[]; plane: Airplane };

interface FlightDetailProps {
  flight: FlightProps;
}

const FlightDetail = ({ flight }: FlightDetailProps) => {
  const data = useCheckoutData();

  const { seat } = useContext(seatContext) as SeatContextType;

  const selectedSeat = useMemo(() => {
    return SEAT_VALUES[(data.data?.seat as SeatValuesType) ?? "ECONOMY"];
  }, [data.data?.seat]);

  return (
    <div className="flex flex-col items-center gap-[30px] mt-[61px] pb-[30px]">
      <h1 className="font-bold text-[32px] leading-[48px] text-center">
        {flight.departureCity} to {flight.destinationCity}
      </h1>
      <div className="flex flex-col items-center gap-[30px] w-[335px]">
        <div className="flex flex-col gap-[10px] w-full">
          <div className="flex justify-center shrink-0">
            <Image
              src="/assets/images/icons/plane-dotted-curve.svg"
              alt="icon"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-[2px] text-center">
              <p className="font-bold text-lg">
                {dateFormat(flight.departureDate, "HH:mm")}
              </p>
              <p className="text-sm text-flysha-off-purple">
                {flight.departureCityCode}
              </p>
            </div>
            <div className="flex flex-col gap-[2px] text-center">
              <p className="font-bold text-lg">
                {dateFormat(flight.arrivalDate, "HH:mm")}
              </p>
              <p className="text-sm text-flysha-off-purple">
                {flight.destinationCityCode}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex shrink-0 w-full h-[130px] rounded-[14px] overflow-hidden">
            <Image
              src={getUrlFile(flight.plane.name)}
              className="w-full h-full object-cover"
              alt="image"
              width={120}
              height={120}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-[2px]">
              <p className="font-bold text-lg">{flight.plane.name}</p>
              <p className="text-sm text-flysha-grey">
                {flight.plane.code} • {selectedSeat.label} Class
              </p>
            </div>
            <div className="flex h-fit">
              409
              <Image
                src="/assets/images/icons/Star.svg"
                className="w-5 h-5"
                alt="star"
                width={30}
                height={30}
              />
              <Image
                src="/assets/images/icons/Star.svg"
                className="w-5 h-5"
                alt="star"
                width={30}
                height={30}
              />
              <Image
                src="/assets/images/icons/Star.svg"
                className="w-5 h-5"
                alt="star"
                width={30}
                height={30}
              />
              <Image
                src="/assets/images/icons/Star.svg"
                className="w-5 h-5"
                alt="star"
                width={30}
                height={30}
              />
              <Image
                src="/assets/images/icons/Star.svg"
                className="w-5 h-5"
                alt="star"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] w-full">
          <div className="flex justify-between">
            <span>Date</span>
            <span className="font-semibold">
              {dateFormat(flight.departureDate)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Seat Choosen</span>
            <span className="font-semibold">{seat?.seatNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>Passenger</span>
            <span className="font-semibold">1 Person</span>
          </div>
          <div className="flex justify-between">
            <span>Seat Price</span>
            <span className="font-semibold">
              {" "}
              {rupiahFormat(flight.price + selectedSeat.additionalPrice)}3
            </span>
          </div>
        </div>
        <a
          href="checkout.html"
          className="font-bold text-flysha-black bg-flysha-light-purple rounded-full h-12 w-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF] flex justify-center items-center"
        >
          Continue to Book
        </a>
      </div>
    </div>
  );
};

export default FlightDetail;
