import { cn } from "@/lib/utils"
import { forwardRef, ComponentPropsWithoutRef, ElementRef } from "react"

export const Spinner = forwardRef<ElementRef<"div">, ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("animate-spin rounded-full border-4 border-muted border-t-primary h-6 w-6", className)}
        {...props}
      />
    )
  }
)

Spinner.displayName = "Spinner"