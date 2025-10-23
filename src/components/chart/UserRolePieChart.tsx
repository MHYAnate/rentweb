"use client";

import { Pie, PieChart, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  users: {
    label: "Users",
  },
  admin: {
    label: "Admin",
    color: "hsl(var(--chart-1))",
  },
  agent: {
    label: "Agent",
    color: "hsl(var(--chart-2))",
  },
  landlord: {
    label: "Landlord",
    color: "hsl(var(--chart-3))",
  },
  client: {
    label: "Client",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

interface UserRolePieChartProps {
  chartData: any;
  totalUsers: number;
}

export function UserRolePieChart({ chartData, totalUsers }: UserRolePieChartProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>User Roles</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] flex justify-center items-center"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="role"
              innerRadius={60}
              strokeWidth={2}
              label={({ cx, cy }) => (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-foreground text-center"
                >
                  <tspan
                    x={cx}
                    y={(cy as any) - 10}
                    className="text-2xl font-bold"
                  >
                    {totalUsers.toLocaleString()}
                  </tspan>
                  <tspan
                    x={cx}
                    y={(cy as any) + 10}
                    className="text-xs text-muted-foreground"
                  >
                    Total Users
                  </tspan>
                </text>
              )}
            >
                {/* This part is important for custom colors per slice */}
                {chartData.map((entry: any) => (
                    <Cell key={`cell-${entry.role}`} fill={entry.fill} />
                ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="flex flex-col gap-2 p-4 pt-0">
        {chartData.map((data: any) => (
          <div className="flex items-center gap-3" key={data.role}>
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: data.fill }}
            ></div>
            <p className="text-muted-foreground text-sm font-medium me-auto capitalize">
              {data.role.toLowerCase()}
            </p>
            <h6 className="font-bold text-sm text-foreground">
              {data.count.toLocaleString()}
            </h6>
          </div>
        ))}
      </div>
    </Card>
  );
}