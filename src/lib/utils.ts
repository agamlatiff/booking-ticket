import type { FlightSeat, TypeSeat } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateSeatPerClass = (flightId: string) => {
  const SEAT_CLASS: TypeSeat[] = ["ECONOMY", "BUSSINESS", "FIRST"];
  const SEAT_CODE = ["A", "B", "C", "D"];

  const seats: { seatNumber: string; type: TypeSeat; flightId: string }[] = [];

  SEAT_CLASS.forEach((className) => {
    SEAT_CODE.map((seat) => {
      for (let i = 1; i <= 5; i++) {
        seats.push({
          seatNumber: seat + i,
          type: className as TypeSeat,
          flightId,
        });
      }
    });
  });

  return seats;
};

export const dateFormat = (
  date: Date | string,
  format = "DD MM YYYY HH:mm"
) => {
  if (!date) {
    return "";
  }

  const dateFormat = dayjs(date).format(format);

  return dateFormat;
};

export const rupiahFormat = (value: number) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

export const objectToParams = (obj: {[key: string]: unknown}) => {
  const queryParams = Object.keys(obj).map(key => {
    if(obj[key] !== null) {
      return key + '=' + obj[key]
    }
    return ''
  }).filter((key) => key !== '').join('&')
  
  return queryParams
}


export const mappingSeats = (seats: FlightSeat[]) => {
  const totalSeatEconomy = seats.filter(
    (item) => item.type === "ECONOMY"
  ).length;
  const totalSeatBussiness = seats.filter(
    (item) => item.type === "BUSSINESS"
  ).length;
  const totalSeatFirst = seats.filter((item) => item.type === "FIRST").length;

  const economy = seats.filter(
    (item) => item.type === "ECONOMY" && item.isBooked
  ).length;
  const bussiness = seats.filter(
    (item) => item.type === "BUSSINESS" && item.isBooked
  ).length;
  const first = seats.filter(
    (item) => item.type === "FIRST" && item.isBooked
  ).length;

  return {
    economy,
    bussiness,
    first,
    totalSeatEconomy,
    totalSeatBussiness,
    totalSeatFirst
  };
};
