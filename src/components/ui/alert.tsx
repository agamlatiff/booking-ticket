import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-2xl border-2 border-foreground p-4 flex gap-3 items-start",
  {
    variants: {
      variant: {
        default: "bg-white text-foreground",
        info: "bg-blue-50 border-blue-300 text-blue-800",
        success: "bg-green-50 border-green-300 text-green-800",
        warning: "bg-yellow-50 border-yellow-300 text-yellow-800",
        error: "bg-red-50 border-red-300 text-red-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconMap = {
  default: "info",
  info: "info",
  success: "check_circle",
  warning: "warning",
  error: "error",
};

const iconColorMap = {
  default: "text-primary",
  info: "text-blue-500",
  success: "text-green-500",
  warning: "text-yellow-600",
  error: "text-red-500",
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof alertVariants> {
  title?: string;
  icon?: string;
  onClose?: () => void;
}

export function Alert({
  className,
  variant = "default",
  title,
  icon,
  onClose,
  children,
  ...props
}: AlertProps) {
  const displayIcon = icon || iconMap[variant || "default"];
  const iconColor = iconColorMap[variant || "default"];

  return (
    <div className={cn(alertVariants({ variant }), className)} role="alert" {...props}>
      <span className={cn("material-symbols-outlined text-xl flex-shrink-0 mt-0.5", iconColor)}>
        {displayIcon}
      </span>
      <div className="flex-1 min-w-0">
        {title && <h5 className="font-bold mb-1">{title}</h5>}
        <div className="text-sm font-medium">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-black/5 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      )}
    </div>
  );
}
