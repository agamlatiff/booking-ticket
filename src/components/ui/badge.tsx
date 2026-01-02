import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-colors border",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary border-primary/20",
        accent:
          "bg-accent-yellow text-foreground border-foreground",
        success:
          "bg-green-100 text-green-700 border-green-200",
        warning:
          "bg-yellow-100 text-yellow-800 border-yellow-200",
        error:
          "bg-red-100 text-red-700 border-red-200",
        info:
          "bg-blue-100 text-blue-700 border-blue-200",
        outline:
          "bg-white text-foreground border-foreground",
        secondary:
          "bg-gray-100 text-gray-700 border-gray-200",
        purple:
          "bg-accent-purple/20 text-accent-purple border-accent-purple/30",
        coral:
          "bg-secondary/10 text-secondary border-secondary/20",
      },
      size: {
        sm: "text-[10px] px-2 py-0.5",
        default: "text-xs px-3 py-1",
        lg: "text-sm px-4 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {
  icon?: string; // Material Symbols icon name
}

function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && (
        <span className="material-symbols-outlined text-sm">{icon}</span>
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
