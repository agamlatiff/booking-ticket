import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { columns } from "./components/ColumnsFlight";
import { DataTable } from "@/components/ui/data-table";
import { getFlights } from "./lib/data";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Flights Management | FlyHigher Admin",
};

const FlightPage = async () => {
  const data = await getFlights();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-accent">airplane_ticket</span>
            Flights
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Schedule and manage flight routes
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/flights/create">
            <span className="material-symbols-outlined text-lg mr-2">add</span>
            Add Flight
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-accent">flight_takeoff</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Flights</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.filter((f) => new Date(f.departureDate) > new Date()).length}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Upcoming</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">location_on</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {new Set(data.map((f) => f.destinationCity)).size}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Destinations</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600">airline_seat_recline_extra</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.reduce((acc, f) => acc + (f.seats?.length || 0), 0)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Seats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default FlightPage;
