import type { Metadata } from "next";
import React from "react";
import FormSignIn from "./_components/FormSignIn";

export const metdata: Metadata = {
  title: "Dashboard | Sign In",
};

const SignInPage = () => {
  return <FormSignIn />;
};

export default SignInPage;
