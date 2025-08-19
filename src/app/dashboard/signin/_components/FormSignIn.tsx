'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ActionResult } from "next/dist/server/app-render/types";
import { handleSignIn } from "../lib/actions";
import { useFormState } from "react-dom";
import type { FC } from "react";

interface FormSignInProps {}



const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const FormSignIn: FC<FormSignInProps> = () => {
  const [state, formAction] = useFormState(handleSignIn, initialFormState);

  console.log("Form state:", state);

  return (
    <div className="w-full h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg-px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action={formAction} className="space-y-6">
            <Input type="email" placeholder="Email" name="email" />
            <Input type="password" placeholder="Password" name="password" />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormSignIn;