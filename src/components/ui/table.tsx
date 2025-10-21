import { cn } from "@/lib/utils"
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

// Table wrapper
export const Table = forwardRef<ElementRef<"table">, ComponentPropsWithoutRef<"table">>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm border-collapse", className)}
        {...props}
      />
    </div>
  )
)
Table.displayName = "Table"

// Table Header container
export const TableHeader = forwardRef<ElementRef<"thead">, ComponentPropsWithoutRef<"thead">>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  )
)
TableHeader.displayName = "TableHeader"

// Table Row
export const TableRow = forwardRef<ElementRef<"tr">, ComponentPropsWithoutRef<"tr">>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}
      {...props}
    />
  )
)
TableRow.displayName = "TableRow"

// Table Head cell
export const TableHead = forwardRef<ElementRef<"th">, ComponentPropsWithoutRef<"th">>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground", className)}
      {...props}
    />
  )
)
TableHead.displayName = "TableHead"

// Table Body container
export const TableBody = forwardRef<ElementRef<"tbody">, ComponentPropsWithoutRef<"tbody">>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  )
)
TableBody.displayName = "TableBody"

// Table Cell
export const TableCell = forwardRef<ElementRef<"td">, ComponentPropsWithoutRef<"td">>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("p-4 align-middle text-foreground", className)}
      {...props}
    />
  )
)
TableCell.displayName = "TableCell"