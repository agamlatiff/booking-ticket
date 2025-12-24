import type { RecentBooking } from "../lib/dashboard-data";
import { rupiahFormat } from "@/lib/utils";

interface RecentBookingsProps {
  bookings: RecentBooking[];
}

// Simple relative time formatter
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(date).toLocaleDateString();
}

const statusColors: Record<string, string> = {
  SUCCESS: "bg-emerald-100 text-emerald-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  FAILED: "bg-red-100 text-red-700",
  CANCELLED: "bg-gray-100 text-gray-600",
};

const RecentBookings = ({ bookings }: RecentBookingsProps) => {
  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Recent Bookings
        </h3>
        <div className="text-center py-8 text-gray-500">
          <p>No bookings yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Recent Bookings</h3>
        <a
          href="/dashboard/tickets"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View all →
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                Customer
              </th>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                Route
              </th>
              <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                Status
              </th>
              <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {booking.customerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTimeAgo(booking.bookingDate)}
                    </p>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-sm text-gray-700">{booking.route}</span>
                </td>
                <td className="py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[booking.status] || statusColors.PENDING
                      }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <span className="font-bold text-gray-900 text-sm">
                    {rupiahFormat(booking.price)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookings;
