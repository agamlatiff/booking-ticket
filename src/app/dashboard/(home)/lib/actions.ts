'use server'

import { getUser, lucia } from "@/lib/auth";
import type { ActionResult } from "@/app/(auth)/sign-in/lib/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(): Promise<ActionResult> {
  const { session } = await getUser()

  if (!session) {
    return {
      errorTitle: 'Logout Error',
      errorDesc: ['You are not logged in']
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect('/sign-in')
}