import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: number
  icon?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <Card className="border border-border bg-card p-6 transition-all hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-card-foreground">{value.toLocaleString()}</p>

          {trend && (
            <div className="mt-3 flex items-center gap-1">
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className={`text-xs font-medium ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
                {trend.isPositive ? "+" : "-"}
                {trend.value}% from last month
              </span>
            </div>
          )}
        </div>

        {icon && <div className="text-3xl">{icon}</div>}
      </div>
    </Card>
  )
}
