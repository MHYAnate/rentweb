import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {cn} from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl hover:bg-secondary/90",
        outline:
          "border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm bg-transparent",
        ghost: "hover:bg-primary-foreground/10 text-primary-foreground",
        solid: "bg-accent text-primary shadow-md hover:shadow-lg hover:bg-accent/90",
      },
      size: {
        default: "h-11 px-6 py-2 text-base",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 py-6 text-base md:text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }
