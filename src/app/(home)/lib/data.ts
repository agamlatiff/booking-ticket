"use server";

import prisma from "../../../../lib/prisma";

export async function getCityFilter() {
  try {
    const data = await prisma.flight.groupBy({
      by: ["departureCity", "destinationCity"],
      where: {
        departureDate: {
          gt: new Date(),
        },
      },
      _count: {
        departureCity: true,
        destinationCity: true,
      },
    });

    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}
