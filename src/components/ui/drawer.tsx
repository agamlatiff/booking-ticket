"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: "left" | "right";
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeStyles = {
  sm: "max-w-xs",
  md: "max-w-sm",
  lg: "max-w-md",
  xl: "max-w-xl",
};

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
  size = "md",
}: DrawerProps) {
  // Close on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Drawer Panel */}
      <div
        className={cn(
          "relative ml-auto h-full w-full border-l-2 border-foreground bg-white shadow-card overflow-hidden flex flex-col",
          position === "left" && "ml-0 mr-auto border-l-0 border-r-2",
          sizeStyles[size]
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-foreground p-6">
          {title && <h2 className="text-xl font-black text-foreground">{title}</h2>}
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground hover:bg-red-100 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
