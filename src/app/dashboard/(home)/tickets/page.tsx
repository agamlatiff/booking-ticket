import type { Metadata } from "next";
import { columns } from "./_components/ColumnsTicket";
import { DataTable } from "@/components/ui/data-table";
import { getTickets } from "./lib/data";

export const metadata: Metadata = {
  title: "Dashboard | Ticket",
};

const TicketPage = async () => {
  const tickets = await getTickets()

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Ticket</div>
      </div>
      <DataTable columns={columns} data={tickets} />
    </>
  );
};

export default TicketPage;
