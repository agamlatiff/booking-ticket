import { DataTable } from "@/components/ui/data-table";
import type { Metadata } from "next";
import { columns } from "./_components/ColumnsUser";
import { getCustomers } from "./lib/data";

export const metadata: Metadata = {
  title: "Users Management | FlyHigher Admin",
};

const UserPage = async () => {
  const users = await getCustomers();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-accent">group</span>
            Users
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage registered users and their accounts
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-accent">person</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Users</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">verified_user</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Active Users</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600">trending_up</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {users.filter((u) => {
                  const created = new Date(u.createdAt);
                  const now = new Date();
                  const diff = now.getTime() - created.getTime();
                  return diff < 7 * 24 * 60 * 60 * 1000; // 7 days
                }).length}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">New This Week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
};

export default UserPage;
