'use server'

import { formSchema } from "./validation";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import prisma from "../../../../../../lib/prisma";

export interface ActionResult {
  errorTitle: string | null;
  errorDesc: string[] | null;
}

export async function handleSignIn(_: unknown, formData: FormData) : Promise<ActionResult> {
  console.log(`Sign in action triggered email: ${formData.get('email')}` );
  console.log(`Sign in action triggered password:  ${formData.get('password')}` );
  
  const values = formSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  })
  
  if(!values.success) {
    const errorDesc = values.error.issues.map((issue) => issue.message)
    
    return {
      errorTitle: 'Validation Error',
      errorDesc
    }
  }
  
  const existingUser = await prisma.user.findFirst({
    where :{
      email: values.data.email,
    }
  })
  
  
  if(!existingUser) {
    return {
      errorTitle: 'Sign In Error',
      errorDesc: ['User not found']
    }
  }
  const validPassword = await bcrypt.compare(values.data.password, existingUser.password);
  
  if(!validPassword) {
    return {
      errorTitle: 'Sign In Error',
      errorDesc: ['Invalid password']
    }
  }
  
  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  return redirect('/dashboard')
}