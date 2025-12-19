"use server";

import type { ActionResult } from "@/app/dashboard/(auth)/signin/lib/actions";
import { userSchema } from "../../sign-up/lib/validation";

import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "../../../../../lib/prisma";

export async function SignInUser(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const signInSchema = userSchema.pick({
    email: true,
    password: true,
  });

  const validate = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    const errorDesc = validate.error.issues.map((issue) => issue.message);

    return {
      errorTitle: "Error Validataion",
      errorDesc,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
    },
  });

  if (!existingUser) {
    return {
      errorTitle: "Error",
      errorDesc: ["Email is not found"],
    };
  }

  const validPassword = await bcrypt.compare(
    validate.data.password,
    existingUser.password
  );

  if (!validPassword) {
    return {
      errorTitle: "Error",
      errorDesc: ["Password is wrong"],
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const seessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    seessionCookie.name,
    seessionCookie.value,
    seessionCookie.attributes
  );

  // Role-based redirect: ADMIN → dashboard, CUSTOMER → home
  if (existingUser.role === 'ADMIN') {
    return redirect('/dashboard');
  }

  return redirect('/');
}
