'use server'

import type { ActionResult } from "@/app/dashboard/(auth)/signin/lib/actions";
import { redirect } from "next/navigation";

export async function saveFlight (_: unknown, formData: FormData) : Promise<ActionResult> {
  redirect('/dashboard/flights/create')
}