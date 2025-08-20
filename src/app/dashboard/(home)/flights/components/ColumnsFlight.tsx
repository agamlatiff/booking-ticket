'use client'

import type { Airplane, Flight, FlightSeat } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import DeleteAirplane from "../../airplanes/_components/DeleteAirplane";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { getUrlFile } from "@/lib/supabase";

export type FlightColumn = Flight & {
  plane: Airplane;
  seats: FlightSeat[];
};


export const columns: ColumnDef<FlightColumn>[] = [
  {
    accessorKey: "planeId",
    header: "Plane",
    cell: ({ row }) => {
      const flight = row.original;

      const planeImageUrl = getUrlFile(flight.plane.image)
      return (
        <div className="inline-flex items-center gap-5">
          <Image src={planeImageUrl} width={120} height={120} alt="Image Plane" className="rounded-xl" />
          <div className="font-bold">
            {flight.plane.name}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "departureCity",
    header: "Route",
    cell: ({ row }) => {
      const route = row.original;

      return "Route";
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original;

      return "Price";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const plane = row.original;
      return (
        <div className="inline-flex gap-5 items-center">
          <Button variant={"secondary"} size={"sm"} asChild>
            <Link href={`/dashboard/flights/edit/${plane.id}`}>
              <Pencil className="mr-2 size-4" />
              Edit
            </Link>
          </Button>
          <DeleteAirplane id={plane.id} />
        </div>
      );
    },
  },
];
