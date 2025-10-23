"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { useDashboardStats } from "@/hooks/useAdmin";

const chartConfig: ChartConfig = {
  house: { label: "House", color: "#38bdf8" },
  apartment: { label: "Apartment", color: "#F59E0B" },
  shop: { label: "Shop", color: "#FB923C" },
  office: { label: "Office", color: "#10B981" },
  land: { label: "Land", color: "#6B7280" },
  warehouse: { label: "Warehouse", color: "#8B5CF6" },
  commercial: { label: "Commercial", color: "#EC4899" },
  industrial: { label: "Industrial", color: "#14B8A6" },
};

export function PropertyTypeBarComponent() {
  const [filter, setFilter] = useState("all_time");
  const { data } = useDashboardStats();
  const propertyMetrics = data?.data?.propertyMetrics?.byType || {};

  const chartData = Object.entries(chartConfig).map(([key, config]) => ({
    category: config.label,
    count: propertyMetrics[key.toUpperCase()] || 0,
    fill: config.color,
  }));

  return (
    <Card className="p-3 w-full mx-auto rounded-2xl border border-gray-100 shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5">
      <h1 className="font-extrabold">Property Types</h1>
      <CardContent className="p-0 mt-2">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={30}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="category" tick={{ fontSize: 12 }} />
              <YAxis />
              <ChartTooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex flex-wrap justify-center gap-3 mt-3">
        {chartData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1 text-[10px] text-[#475569] font-medium"
          >
            <div
              className="h-[8px] w-[8px] rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span>
              {item.category}: {item.count}
            </span>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}