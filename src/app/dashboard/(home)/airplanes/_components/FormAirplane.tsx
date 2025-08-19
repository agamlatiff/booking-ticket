"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormState, useFormStatus } from "react-dom";
import { saveAirplane } from "../lib/actions";
import type { ActionResult } from "@/app/dashboard/(auth)/signin/lib/actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
};

const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const FormAirplane = () => {
  const [state, formState] = useFormState(saveAirplane, initialFormState);

  return (
    <form className="w-[40%] space-y-4" action={formState}>
      {state.errorTitle !== null && (
        <div className="my-7 bg-red-500 p-4 rounded-lg text-white">
          <div className="text-lg  mb-1 font-medium">{state.errorTitle}</div>
          <ul className="list-disc list-inside">
            {state.errorDesc?.map((e, index) => (
              <li key={index + e}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="code">Airplane Code</Label>
        <Input placeholder="Airplanes Code..." name="code" id="code" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Airplane Name</Label>
        <Input placeholder="Airplanes Name..." name="name" id="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Upload Photo</Label>
        <Input
          placeholder="Upload Photo..."
          name="image"
          id="image"
          required
          type="file"
        />
      </div>
      <SubmitButton />
    </form>
  );
};

export default FormAirplane;
