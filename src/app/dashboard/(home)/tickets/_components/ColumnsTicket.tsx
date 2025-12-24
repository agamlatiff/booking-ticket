"use client";

import type { Flight, FlightSeat, Ticket, User } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import ColumnRouteFlight from "../../flights/components/ColumnRouteFlight";
import { Badge } from "@/components/ui/badge";
import { cn, rupiahFormat } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";
import { updateTicketStatus } from "../lib/actions";
import { useRouter } from "next/navigation";

type TicketType = Ticket & {
  flight: Flight;
  customer: User;
  seat: FlightSeat;
};

const StatusCell = ({ ticket }: { ticket: TicketType }) => {
  const router = useRouter();

  const handleStatusUpdate = async (status: "SUCCESS" | "PENDING" | "FAILED") => {
    await updateTicketStatus(ticket.id, status);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <Badge
        className={cn(
          ticket.status === "SUCCESS"
            ? "bg-green-500"
            : ticket.status === "PENDING"
              ? "bg-yellow-500"
              : "bg-red-500"
        )}
      >
        {ticket.status}
      </Badge>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleStatusUpdate("SUCCESS")}
            className="text-green-600"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark as Success
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleStatusUpdate("PENDING")}
            className="text-yellow-600"
          >
            <Clock className="mr-2 h-4 w-4" />
            Mark as Pending
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleStatusUpdate("FAILED")}
            className="text-red-600"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Mark as Failed
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const columns: ColumnDef<TicketType>[] = [
  {
    accessorKey: "code",
    header: "Booking Code",
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <span className="font-mono font-bold text-sm">{ticket.code}</span>
      );
    },
  },
  {
    accessorKey: "customerId",
    header: "Passenger",
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <div>
          <p className="font-semibold">{ticket.customer.name}</p>
          <p className="text-xs text-gray-500">{ticket.customer.email}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "flightId",
    header: "Flight",
    cell: ({ row }) => {
      const ticket = row.original;
      return <ColumnRouteFlight flight={ticket.flight} />;
    },
  },
  {
    accessorKey: "seatId",
    header: "Seat",
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <Badge variant="outline">
          {ticket.seat.seatNumber} ({ticket.seat.type})
        </Badge>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Amount",
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <span className="font-bold">{rupiahFormat(Number(ticket.price))}</span>
      );
    },
  },
  {
    id: "status_transaction",
    header: "Status",
    cell: ({ row }) => {
      const ticket = row.original;
      return <StatusCell ticket={ticket} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <Link href={`/dashboard/tickets/${ticket.id}`}>
          <Button variant="ghost" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
        </Link>
      );
    },
  },
];

