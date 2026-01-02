"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  showCloseButton = true,
}: ModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div
        className={cn(
          "relative w-full transform rounded-[2rem] border-2 border-foreground bg-white p-8 shadow-pop transition-all",
          sizeStyles[size]
        )}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground hover:bg-red-100 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
        {/* Header */}
        {(title || description) && (
          <div className="mb-6 pr-12">
            {title && (
              <h2 className="text-2xl font-black text-foreground">{title}</h2>
            )}
            {description && (
              <p className="mt-1 text-sm font-medium text-gray-500">
                {description}
              </p>
            )}
          </div>
        )}
        {/* Content */}
        {children}
      </div>
    </div>
  );
}

// Modal Footer helper
export function ModalFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-6 flex gap-3 pt-6 border-t-2 border-dashed border-gray-200", className)}>
      {children}
    </div>
  );
}
