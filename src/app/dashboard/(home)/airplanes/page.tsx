import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";
import { columns } from "./_components/ColumnsTable";
import { getAirplanes } from "./lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airplanes Management | FlyHigher Admin",
};

const AirplanesPage = async () => {
  const planes = await getAirplanes();

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Airplanes Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage fleet inventory, status, and maintenance schedules.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              search
            </span>
            <input
              className="pl-9 pr-4 py-2.5 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent w-full md:w-64 shadow-sm placeholder:text-gray-400"
              placeholder="Global search..."
              type="text"
            />
          </div>
        </div>
      </header>

      {/* Main Card */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col min-h-[600px]">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 overflow-x-auto pb-2 sm:pb-0">
            {/* Search */}
            <div className="relative min-w-[240px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                search
              </span>
              <input
                className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent w-full shadow-sm placeholder:text-gray-400"
                placeholder="Search by Reg. Number or Model"
                type="text"
              />
            </div>

            {/* Type Filter */}
            <div className="relative">
              <select className="appearance-none pl-3 pr-8 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-gray-600 dark:text-gray-300 font-medium cursor-pointer">
                <option>All Types</option>
                <option>Boeing 737</option>
                <option>Airbus A320</option>
                <option>Boeing 787</option>
                <option>Airbus A350</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
                expand_more
              </span>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select className="appearance-none pl-3 pr-8 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-gray-600 dark:text-gray-300 font-medium cursor-pointer">
                <option>All Status</option>
                <option>Active</option>
                <option>Maintenance</option>
                <option>Inactive</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Add Button */}
          <Link
            href="/dashboard/airplanes/create"
            className="flex items-center gap-2 bg-accent hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Add Airplane
          </Link>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto flex-1">
          <DataTable columns={columns} data={planes} />
        </div>

        {/* Pagination Footer */}
        <div className="p-5 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-bold text-gray-900 dark:text-white">1-{Math.min(planes.length, 10)}</span> of{" "}
            <span className="font-bold text-gray-900 dark:text-white">{planes.length}</span> airplanes
          </span>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1.5 bg-accent text-white rounded-lg text-sm shadow-sm hover:bg-sky-600">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirplanesPage;
