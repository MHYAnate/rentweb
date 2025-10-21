import { cn } from "@/lib/utils"
import { forwardRef, ComponentPropsWithoutRef, ElementRef } from "react"

export const Card = forwardRef<ElementRef<"div">, ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = "Card"