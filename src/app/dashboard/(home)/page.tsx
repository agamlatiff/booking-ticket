import Link from "next/link";
import StatsCard from "./_components/StatsCard";
import RecentBookings from "./_components/RecentBookings";
import { getDashboardStats, getRecentBookings } from "./lib/dashboard-data";
import { rupiahFormat } from "@/lib/utils";

export default async function DashboardPage() {
  const [stats, recentBookings] = await Promise.all([
    getDashboardStats(),
    getRecentBookings(5),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/flights/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-sky-400 text-primary font-bold rounded-full transition-colors shadow-lg shadow-accent/20"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            Add Flight
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={rupiahFormat(stats.totalRevenue)}
          icon="payments"
          color="green"
        />
        <StatsCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon="confirmation_number"
          color="blue"
        />
        <StatsCard
          title="Active Flights"
          value={stats.activeFlights}
          icon="flight"
          color="purple"
        />
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon="group"
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings - 2 columns */}
        <div className="lg:col-span-2">
          <RecentBookings bookings={recentBookings} />
        </div>

        {/* Quick Actions - 1 column */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/flights/create"
                className="flex items-center justify-between p-3 rounded-xl bg-accent/10 dark:bg-accent/20 hover:bg-accent/20 dark:hover:bg-accent/30 text-accent transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-lg">add</span>
                  </div>
                  <span className="font-semibold">Add New Flight</span>
                </div>
                <span className="material-symbols-outlined text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_forward
                </span>
              </Link>

              <Link
                href="/dashboard/tickets"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-lg">confirmation_number</span>
                  </div>
                  <span className="font-semibold">Manage Bookings</span>
                </div>
                <span className="material-symbols-outlined text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_forward
                </span>
              </Link>

              <Link
                href="/dashboard/users"
                className="flex items-center justify-between p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-400 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-lg">group</span>
                  </div>
                  <span className="font-semibold">View Users</span>
                </div>
                <span className="material-symbols-outlined text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_forward
                </span>
              </Link>

              <Link
                href="/dashboard/airplanes"
                className="flex items-center justify-between p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 text-orange-700 dark:text-orange-400 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-lg">flight</span>
                  </div>
                  <span className="font-semibold">Manage Airlines</span>
                </div>
                <span className="material-symbols-outlined text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          {/* System Status Card */}
          <div className="bg-gradient-to-br from-primary to-slate-800 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined">monitoring</span>
              <h3 className="font-bold">System Status</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Database</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Payment Gateway</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">API Status</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  Healthy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
