"use client";

import type { ActionResult } from "@/app/dashboard/(auth)/signin/lib/actions";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { signUpUser } from "../lib/actions";
import { Button } from "@/components/ui/button";

const initialState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="text-center text-flysha-black rounded-full bg-flysha-light-purple font-bold w-full p-[12px_30px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF] disabled:opacity-40"
    >
      {pending ? "Creating..." : "Create New Account"}
    </Button>
  );
};

const FormSignUp = () => {
  const [state, formState] = useFormState(signUpUser, initialState);

  return (
    <form
      action={formState}
      className="bg-white text-flysha-black w-[500px] flex flex-col rounded-[20px] gap-5 p-5"
    >
      {state.errorTitle !== null && (
        <div className=" bg-red-500 w-full p-4 rounded-lg text-white">
          <div className="text-lg  mb-1 font-medium">{state.errorTitle}</div>
          <ul className="list-disc list-inside">
            {state.errorDesc?.map((e, index) => (
              <li key={index}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">
            Complete Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Write your name"
            className="rounded-full h-6 w-full p-[12px_20px] h-[48px] bg-[#EDE8F5] appearance-none outline-none font-semibold focus:ring-2 focus:ring-flysha-light-purple"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="passport" className="font-medium">
            No. Passport
          </label>
          <input
            type="text"
            name="passport"
            id="passport"
            placeholder="Write passport number"
            className="rounded-full h-6 w-full p-[12px_20px] h-[48px] bg-[#EDE8F5] appearance-none outline-none font-semibold ring-2 ring-flysha-light-purple"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-medium">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Write your email"
          className="rounded-full h-6 w-full p-[12px_20px] h-[48px] bg-[#EDE8F5] appearance-none outline-none font-semibold"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Type your password"
          className="rounded-full h-6 w-full p-[12px_20px] h-[48px] bg-[#EDE8F5] appearance-none outline-none font-semibold focus:ring-2 focus:ring-flysha-light-purple"
        />
        {/* <span class="error-messages font-medium text-xs text-flysha-red font-inter">Wrong format email address</span> */}
      </div>
      <SubmitButton />
      <Link
        href="signin.html"
        className="text-center text-flysha-black hover:text-white rounded-full bg-white hover:bg-flysha-black font-semibold w-full p-[12px_30px] border border-flysha-black transition-all duration-300"
      >
        Sign In
      </Link>
    </form>
  );
};

export default FormSignUp;
