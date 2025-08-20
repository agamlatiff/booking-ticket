"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import type { FC } from "react";
import { useFormStatus } from "react-dom";
import { deleteAirplane } from "../lib/actions";

interface DeleteAirplaneProps {
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

const DeleteAirplane: FC<DeleteAirplaneProps> = ({ id }) => {
  const deleteAirplaneWithId = deleteAirplane.bind(null, id);

  return (
    <form action={deleteAirplaneWithId}>
      <SubmitButton />
    </form>
  );
};

export default DeleteAirplane;
