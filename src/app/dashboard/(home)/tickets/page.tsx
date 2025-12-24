import type { Metadata } from "next";
import { columns } from "./_components/ColumnsTicket";
import { DataTable } from "@/components/ui/data-table";
import { getTickets } from "./lib/data";

export const metadata: Metadata = {
  title: "Tickets Management | FlyHigher Admin",
};

const TicketPage = async () => {
  const tickets = await getTickets();

  // Calculate stats
  const confirmedTickets = tickets.filter((t) => t.status === "SUCCESS").length;
  const pendingTickets = tickets.filter((t) => t.status === "PENDING").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-accent">confirmation_number</span>
            Tickets
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            View and manage all booking transactions
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-accent">receipt_long</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{tickets.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Tickets</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{confirmedTickets}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Confirmed</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-yellow-600">schedule</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingTickets}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-red-600">cancel</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tickets.length - confirmedTickets - pendingTickets}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Cancelled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <DataTable columns={columns} data={tickets} />
      </div>
    </div>
  );
};

export default TicketPage;
