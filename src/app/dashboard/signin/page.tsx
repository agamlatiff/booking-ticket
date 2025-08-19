import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Metadata } from "next";
import React, { type FC } from "react";

interface SignInPageProps {}

export const metdata: Metadata = {
  title: "Dashboard | Sign In",
};

const SignInPage: FC<SignInPageProps> = () => {
  return (
    <div className="w-full h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg-px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
            Sign in to your account
          </h2>
        </div>
        
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="" className="space-y-6">
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Password" name="password" />
          </form>
          
          <Button className="w-full" type="submit">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
