import Link from "next/link";
import {
  DollarSign,
  Ticket,
  Plane,
  Users,
  Plus,
  ArrowRight,
  BarChart3,
  Settings,
} from "lucide-react";
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
          <h1 className="text-3xl font-black text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/flights/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Flight
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={rupiahFormat(stats.totalRevenue)}
          icon={DollarSign}
          color="green"
        />
        <StatsCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Ticket}
          color="blue"
        />
        <StatsCard
          title="Active Flights"
          value={stats.activeFlights}
          icon={Plane}
          color="purple"
        />
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
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
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/flights/create"
                className="flex items-center justify-between p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold">Add New Flight</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="/dashboard/tickets"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Ticket className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold">Manage Bookings</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="/dashboard/users"
                className="flex items-center justify-between p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold">View Users</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="/dashboard/airplanes"
                className="flex items-center justify-between p-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Plane className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold">Manage Airlines</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* System Status Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5" />
              <h3 className="font-bold">System Status</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Database</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Payment Gateway</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">API Status</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
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
