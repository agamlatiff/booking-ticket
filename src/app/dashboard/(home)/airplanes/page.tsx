import { Button } from "@/components/ui/button";
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-accent">flight</span>
            Airplanes
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage airline fleet and aircraft information
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/airplanes/create">
            <span className="material-symbols-outlined text-lg mr-2">add</span>
            Add Airplane
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-accent">airlines</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{planes.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Airplanes</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">verified</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{planes.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Active Fleet</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600">business</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {new Set(planes.map((p) => p.code?.slice(0, 2))).size}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Airlines</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <DataTable columns={columns} data={planes} />
      </div>
    </div>
  );
};

export default AirplanesPage;
