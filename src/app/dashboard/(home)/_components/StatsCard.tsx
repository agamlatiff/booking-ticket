import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "purple" | "orange";
}

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "bg-blue-500",
    text: "text-blue-600",
  },
  green: {
    bg: "bg-emerald-50",
    icon: "bg-emerald-500",
    text: "text-emerald-600",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "bg-purple-500",
    text: "text-purple-600",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "bg-orange-500",
    text: "text-orange-600",
  },
};

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color = "blue",
}: StatsCardProps) => {
  const colors = colorMap[color];

  return (
    <div className={`rounded-2xl p-6 ${colors.bg} border border-gray-100`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-black ${colors.text}`}>{value}</p>
          {trend && (
            <p
              className={`text-xs font-bold mt-2 ${trend.isPositive ? "text-emerald-600" : "text-red-500"
                }`}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last
              month
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
