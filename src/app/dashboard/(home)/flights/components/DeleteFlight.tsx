"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import type { FC } from "react";
import { useFormStatus } from "react-dom";
import { deleteFlight } from "../lib/actions";

interface DeleteFlightProps {
  id: string;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      size={"sm"}
      className="w-full bg-red-600"
      type="submit"
      disabled={pending}
    >
      <Trash className=" size-4" />
      {pending ? " Deleting..." : "Delete"}
    </Button>
  );
};

const DeleteFlight: FC<DeleteFlightProps> = ({ id }) => {
  const deleteFlightWithId = deleteFlight.bind(null, id);

  return (
    <form action={deleteFlightWithId}>
      <SubmitButton />
    </form>
  );
};

export default DeleteFlight;
