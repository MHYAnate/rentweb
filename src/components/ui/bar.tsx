// "use client";

// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
// } from "recharts";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { useState } from "react";
// import { useDashboardStats } from '@/hooks/useAdmin';

// interface FeedbackSummary {
//   total: number;
//   byType: Record<string, number>;
//   byStatus: Record<string, number>;
//   averageRating?: number;
// }

// interface FeedbackBarComponentProps {
//   summary?: FeedbackSummary;
// }

// const chartConfig = {
//   house: { label: "house", color: "#38bdf8" },
//   apartment: { label: "apartment", color: "#F59E0B" },
//   shop: { label: "shop", color: "#FB923C" },
//   office: { label: "office", color: "#10B981" },
//   land: { label: "land", color: "#6B7280" },
//   warehouse: { label: "warehouse", color: "#6B7280" },
//   commercial: { label: "commercial", color: "#6B7280" },
//   industrial: { label: "industrial", color: "#6B7280" },
// } satisfies ChartConfig;

// export function PropertyTypeBarComponent() {
//   const [filter, setFilter] = useState<string>("all_time");


//   const { data, isLoading, error } = useDashboardStats();

//   const propertyMetricsByType = data?.data?.propertyMetrics?.byType;

//   const filterList = [
//     { text: "All Time", value: "all_time" },
//     { text: "Last 30 Days", value: "30d" },
//     { text: "Last 7 Days", value: "7d" },
//   ];

//   const chartData = data
//     ? [
//         { category: "House", count: propertyMetricsByType?.HOUSE || 0 || 0, fill: chartConfig. house.color },
//         { category: "Apartment", count: propertyMetricsByType?.APARTMENT || 0, fill: chartConfig.apartment.color },
//         { category: "Shop", count: propertyMetricsByType?.SHOP || 0, fill: chartConfig.shop.color },
//         { category: "Office", count: propertyMetricsByType?.OFFICE || 0, fill: chartConfig.office.color },
//         { category: "Land", count: propertyMetricsByType?.LAND || 0, fill: chartConfig.land.color },
//         { category: "Warehouse", count: propertyMetricsByType?.WAREHOUSE || 0, fill: chartConfig.warehouse.color },
//         { category: "Commercial", count: propertyMetricsByType?.COMMERCIAL || 0, fill: chartConfig.commercial.color },
//         { category: "Industrial", count: propertyMetricsByType?.INDUSTRIAL || 0, fill: chartConfig.industrial.color },
//       ]
//     :[
//       { category: "HOUSE", count: propertyMetricsByType?.HOUSE || 0 || 0, fill: chartConfig. house.color },
//       { category: "APARTMENT", count: propertyMetricsByType?.APARTMENT || 0, fill: chartConfig.apartment.color },
//       { category: "SHOP", count: propertyMetricsByType?.SHOP || 0, fill: chartConfig.shop.color },
//       { category: "OFFICE", count: propertyMetricsByType?.OFFICE || 0, fill: chartConfig.office.color },
//       { category: "LAND", count: propertyMetricsByType?.LAND || 0, fill: chartConfig.land.color },
//       { category: "WAREHOUSE", count: propertyMetricsByType?.WAREHOUSE || 0, fill: chartConfig.warehouse.color },
//       { category: "COMMERCIAL", count: propertyMetricsByType?.COMMERCIAL || 0, fill: chartConfig.commercial.color },
//       { category: "INDUSTRIAL", count: propertyMetricsByType?.INDUSTRIAL || 0, fill: chartConfig.industrial.color },
//     ];

//   return (
//     <Card className="p-1.5 w-auto mx-auto">
  

//       <CardContent className="p-0 mt-1.5">
//         <ChartContainer config={chartConfig} className="h-[200px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={chartData}>
//               <CartesianGrid vertical={false} />
//               <XAxis dataKey="category" />
//               <YAxis />
//               <ChartTooltip
//                 cursor={false}
//                 content={<ChartTooltipContent hideLabel />}
//               />
//               <Bar dataKey="count" fill="#38bdf8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>

//       <CardFooter className="flex gap-1.5 ps-[6px] mt-2">
//         {chartData.map((item, index) => (
//           <div key={index} className="flex items-center gap-1 text-[8px] text-[#667085] font-dmsans">
//             <div
//               className="h-[4px] w-[4px] rounded-full"
//               style={{ backgroundColor: item.fill }}
//             />
//             <span>{item.category}: {item.count}</span>
//           </div>
//         ))}
//       </CardFooter>

    
//     </Card>
//   );
// }
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
    <Card className="p-3 w-full mx-auto">
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