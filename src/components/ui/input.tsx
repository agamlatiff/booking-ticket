import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, leftIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{leftIcon}</span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border-2 border-foreground bg-gray-50 px-4 py-3 text-sm font-medium transition-all placeholder:text-gray-400 focus:bg-white focus:shadow-pop focus:-translate-x-0.5 focus:-translate-y-0.5 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            leftIcon && "pl-11",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
