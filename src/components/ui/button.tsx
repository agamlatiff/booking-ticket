"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all duration-100 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 border-foreground",
  {
    variants: {
      variant: {
        // Dental Care Primary Variants (Pop/Sticker Style)
        default:
          "bg-primary text-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] rounded-xl",
        destructive:
          "bg-red-500 text-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] rounded-xl",
        outline:
          "bg-white text-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-gray-50 rounded-xl",
        secondary:
          "bg-secondary text-white shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] rounded-xl",
        ghost:
          "border-transparent shadow-none hover:bg-gray-100 hover:border-foreground rounded-xl",
        link:
          "border-transparent shadow-none text-primary underline-offset-4 hover:underline",
        // Accent Variants
        accent:
          "bg-accent-yellow text-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] rounded-xl",
        purple:
          "bg-accent-purple text-foreground shadow-pop hover:shadow-pop-hover hover:translate-x-[2px] hover:translate-y-[2px] rounded-xl",
        // Glass variant for navigation
        glass:
          "bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full",
      },
      size: {
        default: "h-10 px-5 py-2.5 text-sm",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, loadingText, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText || "Loading..."}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

