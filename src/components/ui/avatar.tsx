import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-foreground bg-gray-100 font-bold",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
        "2xl": "h-24 w-24 text-2xl",
      },
      colorScheme: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        accent: "bg-accent-yellow text-foreground",
        purple: "bg-accent-purple text-foreground",
        gray: "bg-gray-100 text-gray-600",
      },
    },
    defaultVariants: {
      size: "md",
      colorScheme: "gray",
    },
  }
);

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type AvatarColorScheme = "primary" | "secondary" | "accent" | "purple" | "gray";

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  src?: string | null;
  alt?: string;
  name?: string;
  status?: "online" | "offline" | "busy";
  size?: AvatarSize;
  colorScheme?: AvatarColorScheme;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const statusColors = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  busy: "bg-red-500",
};

export function Avatar({
  className,
  size = "md",
  colorScheme = "gray",
  src,
  alt,
  name,
  status,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);
  const showFallback = !src || imageError;

  return (
    <div className={cn(avatarVariants({ size, colorScheme }), className)} {...props}>
      {showFallback ? (
        name ? (
          <span>{getInitials(name)}</span>
        ) : (
          <span className="material-symbols-outlined">person</span>
        )
      ) : (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full border-2 border-white ring-2 ring-foreground",
            statusColors[status],
            size === "xs" || size === "sm" ? "h-2 w-2" : "h-3 w-3"
          )}
        />
      )}
    </div>
  );
}

// Avatar Group
export function AvatarGroup({
  children,
  max = 4,
  className,
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
}) {
  const childArray = React.Children.toArray(children);
  const visibleChildren = childArray.slice(0, max);
  const remainingCount = childArray.length - max;

  return (
    <div className={cn("flex -space-x-3", className)}>
      {visibleChildren.map((child, index) => (
        <div key={index} className="relative" style={{ zIndex: visibleChildren.length - index }}>
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="relative z-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground bg-gray-200 text-xs font-bold text-foreground">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
