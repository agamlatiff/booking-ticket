"use server";

import prisma from "../../../../../../lib/prisma";

export const getFlights = async () => {
  try {
    const flights = await prisma.flight.findMany({
      include: {
        plane: true,
        seats: true,
      },
    });
    return flights;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getFlightById = async (id: string) => {
  try {
    const flight = await prisma.flight.findFirst({
      where: {
        id,
      },
    });
    return flight;
  } catch (e) {
    console.log(e);
    return null;
  }
};
