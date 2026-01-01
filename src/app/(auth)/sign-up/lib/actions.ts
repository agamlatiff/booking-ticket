"use server";

import { redirect } from "next/navigation";

// With Google OAuth, users don't need to manually sign up
// This action redirects them to the sign-in page
export async function signUpUser() {
  return redirect("/sign-in");
}
