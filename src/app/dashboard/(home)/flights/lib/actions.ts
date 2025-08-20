"use server";

import type { ActionResult } from "@/app/dashboard/(auth)/signin/lib/actions";
import { redirect } from "next/navigation";
import { formFLightSchema } from "./validation";
import prisma from "../../../../../../lib/prisma";
import { generateSeatPerClass } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function saveFlight(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const departureDate = new Date(formData.get("departureDate") as string);
  const arrivalDate = new Date(formData.get("arrivalDate") as string);

  const validate = formFLightSchema.safeParse({
    planeId: formData.get("planeId"),
    price: formData.get("price"),
    departureCity: formData.get("departureCity"),
    departureDate: departureDate,
    departureCityCode: formData.get("departureCityCode"),
    destinationCity: formData.get("destinationCity"),
    arrivalDate: arrivalDate,
    destinationCityCode: formData.get("destinationCityCode"),
  });

  if (!validate.success) {
    const errorDesc = validate.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validation",
      errorDesc,
    };
  }

  const data = await prisma.flight.create({
    data: {
      ...validate.data,
      price: Number.parseInt(validate.data.price),
    },
  });
  
  const seats = generateSeatPerClass(data.id)
  
  await prisma.flightSeat.createMany({
    data: seats
  })

  revalidatePath('/dashboard/flights')
  redirect("/dashboard/flights");
}
