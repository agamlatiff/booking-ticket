"use server";

import type { ActionResult } from "@/app/dashboard/(auth)/signin/lib/actions";
import { airplaneFormSchema } from "./validation";
import { redirect } from "next/navigation";
import { uploadFile } from "@/lib/supabase";
import prisma from "../../../../../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAirplanesById(id: string) {
  try {
    const data = await prisma.airplane.findFirst({
      where: {
        id: id,
      },
    });
    return data;
  } catch (e) {
    console.log("Database airplanes error:", e);
    return null;
  }
}

export async function saveAirplane(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const values = airplaneFormSchema.safeParse({
    name: formData.get("name"),
    code: formData.get("code"),
    image: formData.get("image"),
  });

  if (!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Validation Error",
      errorDesc,
    };
  }

  const uploadedFile = await uploadFile(values.data.image);

  if (uploadedFile instanceof Error) {
    return {
      errorTitle: "Failed to upload file",
      errorDesc: ["Connection Error", "Please try again later"],
    };
  }

  try {
    const data = await prisma.airplane.create({
      data: {
        name: values.data.name,
        code: values.data.code,
        image: uploadedFile as string,
      },
    });
  } catch (e) {
    console.log(e);
    return {
      errorTitle: "Failed to save airplane",
      errorDesc: ["Database Error", "Please try again later"],
    };
  }

  revalidatePath("/dashboard/airplanes");
  return redirect("/dashboard/airplanes");
}
