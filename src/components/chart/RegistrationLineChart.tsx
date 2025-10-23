"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  registrations: {
    label: "New Users",
    color: "#8884d8", // Using a default purple
  },
} satisfies ChartConfig;

interface RegistrationLineChartProps {
  data?: Record<string, string | number>[];
}

export function RegistrationLineChart({ data }: RegistrationLineChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full min-h-[250px]">
      <LineChart
        accessibilityLayer
        data={data || []}
        margin={{ left: 0, right: 12, top: 10, bottom: 0 }}
        className="h-full w-full"
      >
        <CartesianGrid vertical={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          dataKey={"count"}
          allowDecimals={false} // Since we're counting users
        />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent label="dot" />} />
        <Line
          dataKey="count"
          type="monotone"
          stroke={chartConfig.registrations.color}
          strokeWidth={2}
          dot={{
            fill: chartConfig.registrations.color
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ChartContainer>
  );
}