import type { Metadata } from "next";
import React, { type FC } from "react";
import FormSignIn from "./_components/FormSignIn";

interface SignInPageProps {}

export const metdata: Metadata = {
  title: "Dashboard | Sign In",
};

const SignInPage: FC<SignInPageProps> = () => {
  return <FormSignIn />;
};

export default SignInPage;
