"use server";

import { signIn } from "@/lib/auth";
import { loginSchema } from "@/lib/validations/auth";
import { AuthError } from "next-auth";

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}

export async function signInWithCredentials(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate input
  const parsed = loginSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message || "Data tidak valid" };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email atau password salah" };
        default:
          return { error: "Terjadi kesalahan. Silakan coba lagi." };
      }
    }
    throw error; // Re-throw for redirect
  }
}
