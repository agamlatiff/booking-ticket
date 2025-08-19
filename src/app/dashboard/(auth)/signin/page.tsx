import type { Metadata } from "next";
import React from "react";
import FormSignIn from "./_components/FormSignIn";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metdata: Metadata = {
  title: "Dashboard | Sign In",
};

const SignInPage = async () => {
  const {session, user} = await getUser()
  
  if(session || user.role === 'ADMIN') {
    return redirect('/dashboard');
  }
  
  return <FormSignIn />;
};

export default SignInPage;
