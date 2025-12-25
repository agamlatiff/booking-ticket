import { DataTable } from "@/components/ui/data-table";
import type { Metadata } from "next";
import { columns } from "./_components/ColumnsUser";
import { getCustomers } from "./lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Users Management | FlyHigher Admin",
};

const UserPage = async () => {
  const users = await getCustomers();

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage registered users, account statuses, and access roles.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              search
            </span>
            <input
              className="pl-9 pr-4 py-2.5 bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent w-full md:w-64 shadow-sm placeholder:text-gray-400"
              placeholder="Search user..."
              type="text"
            />
          </div>
        </div>
      </header>

      {/* Main Card */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col min-h-[600px]">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Status Filter */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                filter_alt
              </span>
              <select className="appearance-none pl-10 pr-8 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent shadow-sm text-gray-600 dark:text-gray-300 cursor-pointer w-full sm:w-auto">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
                <option value="suspended">Suspended</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
                expand_more
              </span>
            </div>

            {/* Role Filter */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                badge
              </span>
              <input
                className="pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent w-full sm:w-48 shadow-sm placeholder:text-gray-400"
                placeholder="Filter by Role..."
                type="text"
              />
            </div>

            {/* Date Filter */}
            <div className="relative flex-1 sm:flex-none">
              <input
                className="pl-4 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent w-full sm:w-48 shadow-sm placeholder:text-gray-400 dark:text-gray-300"
                type="date"
              />
            </div>
          </div>

          <Button asChild className="bg-primary hover:bg-slate-800 text-white rounded-xl shadow-lg shadow-primary/25">
            <Link href="/dashboard/users/create" className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">person_add</span>
              Add New User
            </Link>
          </Button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto flex-1">
          <DataTable columns={columns} data={users} />
        </div>

        {/* Pagination Footer */}
        <div className="p-5 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-bold text-gray-900 dark:text-white">1-{Math.min(users.length, 10)}</span> of{" "}
            <span className="font-bold text-gray-900 dark:text-white">{users.length}</span> users
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
              disabled
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center text-sm font-bold bg-accent text-white rounded-lg shadow-sm shadow-accent/20">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                3
              </button>
            </div>
            <button className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
