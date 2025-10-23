// "use client";

// import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

// import { CardDescription } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

// const chartConfig = {
//   totalsales: {
//     label: "totalsales",
//     color: "#FFC837",
//   },
// } satisfies ChartConfig;

// interface iProps {
//   data?: Record<string, string | number>[];
// }

// export default function LineGraphComponent({ data }: iProps) {
//   const formatToKOrM = (value: number) => {
//     if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
//     if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
//     return value.toString();
//   };
//   return (
//     <div className="h-full flex flex-col">
//       <div className="mb-9">
//         <CardDescription className="flex gap-4 justify-between items-center">
//           <div>
//             <h6 className="text-[#111827] font-bold text-xl mb-4">
//               Sales Performance
//             </h6>
//           </div>
//         </CardDescription>
//       </div>

//       <div className="flex-1">
//         <ChartContainer config={chartConfig} className="h-full w-full">
//           <LineChart
//             accessibilityLayer
//             data={data || []}
//             margin={{ left: 0, right: 12 }}
//             className="h-full w-full"
//           >
//             <CartesianGrid vertical={true} />
//             <YAxis
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               dataKey={"total_sales"}
//               tickFormatter={formatToKOrM}
//             />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value}
//             />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
//             <Line
//               dataKey="total_sales"
//               type="monotone"
//               stroke="var(--color-totalsales)"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ChartContainer>
//       </div>
//     </div>
//   );
// }

"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  totalsales: {
    label: "Total Sales",
    color: "#FFC837",
  },
} satisfies ChartConfig;

interface iProps {
  data?: Record<string, string | number>[];
  title?: string;
}

export default function LineGraphComponent({ data, title = "Registration Trends" }: iProps) {
  const formatToKOrM = (value: number) => {
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
    if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
    return value.toString();
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="mb-6">
          <CardDescription>
            <div>
              <div className="text-[#111827] font-bold text-xl mb-2 mt-6">
                {title}
              </div>
              {/* <div className="text-sm text-gray-500">Trends over time</div> */}
            </div>
          </CardDescription>
        </div>

        <div className="flex-1 min-h-[300px]">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data || []}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={formatToKOrM}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                />
                <Line
                  type="monotone"
                  dataKey="total_sales"
                  stroke="var(--color-totalsales)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-totalsales)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "var(--color-totalsales)", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
