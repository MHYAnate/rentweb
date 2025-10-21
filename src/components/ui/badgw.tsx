// import { cn } from "@/lib/utils"
// import { forwardRef, ComponentPropsWithoutRef, ElementRef } from "react"

// export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
//   variant?: "default" | "secondary" | "destructive" | "outline"
// }

// export const Badge = forwardRef<ElementRef<"span">, BadgeProps>(
//   ({ className, variant = "default", ...props }, ref) => {
//     return (
//       <span
//         ref={ref}
//         className={cn(
//           "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
//           {
//             "border-transparent bg-primary text-primary-foreground": variant === "default",
//             "border-transparent bg-secondary text-secondary-foreground": variant === "secondary",
//             "border-transparent bg-destructive text-destructive-foreground": variant === "destructive",
//             "border border-border text-foreground": variant === "outline",
//           },
//           className
//         )}
//         {...props}
//       />
//     )
//   }
// )

// Badge.displayName = "Badge"
import { cn } from "@/lib/utils"
import { forwardRef, ComponentPropsWithoutRef, ElementRef } from "react"

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export const Badge = forwardRef<ElementRef<"span">, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          variant === "default" && "border-transparent bg-primary text-primary-foreground",
          variant === "secondary" && "border-transparent bg-secondary text-secondary-foreground",
          variant === "destructive" && "border-transparent bg-destructive text-destructive-foreground",
          variant === "outline" && "border border-border text-foreground",
          className
        )}
        {...props}
      >
        {props.children}
      </span>
    )
  }
)

Badge.displayName = "Badge"