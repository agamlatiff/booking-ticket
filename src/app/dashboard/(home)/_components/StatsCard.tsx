interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string; // Material Symbols icon name
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "purple" | "orange";
}

const colorMap = {
  blue: {
    bg: "bg-accent/10 dark:bg-accent/20",
    icon: "bg-accent",
    text: "text-accent",
  },
  green: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    icon: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    icon: "bg-purple-500",
    text: "text-purple-600 dark:text-purple-400",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    icon: "bg-orange-500",
    text: "text-orange-600 dark:text-orange-400",
  },
};

const StatsCard = ({
  title,
  value,
  icon,
  trend,
  color = "blue",
}: StatsCardProps) => {
  const colors = colorMap[color];

  return (
    <div className={`rounded-2xl p-6 ${colors.bg} border border-gray-100 dark:border-gray-800`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
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
          <span className="material-symbols-outlined text-white text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
