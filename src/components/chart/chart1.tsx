
// // // "use client";

// // // import { Label, Pie, PieChart, Sector } from "recharts";
// // // import { Card, CardContent } from "@/components/ui/card";
// // // import {
// // //   ChartConfig,
// // //   ChartContainer,
// // //   ChartTooltip,
// // //   ChartTooltipContent,
// // // } from "@/components/ui/chart";
// // // import { useState } from "react";

// // // const chartConfig = {
// // //   values: {
// // //     label: "values",
// // //   },
// // //   chrome: {
// // //     label: "Chrome",
// // //     color: "hsl(var(--chart-1))",
// // //   },
// // //   safari: {
// // //     label: "Safari",
// // //     color: "hsl(var(--chart-2))",
// // //   },
// // //   firefox: {
// // //     label: "Firefox",
// // //     color: "hsl(var(--chart-3))",
// // //   },
// // //   edge: {
// // //     label: "Edge",
// // //     color: "hsl(var(--chart-4))",
// // //   },
// // //   other: {
// // //     label: "Other",
// // //     color: "hsl(var(--chart-5))",
// // //   },
// // // } satisfies ChartConfig;

// // // interface iProps {
// // //   chartData: any;
// // //   title: string;
// // //   value: number;
// // // }

// // // export function PieChartComponent({ chartData, title, value }: iProps) {
// // //   const [filter, setFilter] = useState<string>("");
  
// // //   // Get top 3 values
// // //   const topThreeData = [...chartData]
// // //     .sort((a, b) => b.values - a.values)
// // //     .slice(0, 3);

// // //   // Calculate sum of top 3 values
// // //   const sumTopThree = topThreeData.reduce((acc, curr) => acc + curr.values, 0);

// // //   return (
// // //     <Card className="flex flex-col p-6 w-full h-auto">
// // //       <div className="flex items-center justify-between">
// // //         <h5 className="font-bold text-[#111827]">Top 3 Selling</h5>
// // //       </div>
// // //       <CardContent className="flex-1 pb-0">
// // //         <ChartContainer
// // //           config={chartConfig}
// // //           className="mx-auto aspect-square max-h-[250px] flex justify-center items-center"
// // //         >
// // //           <PieChart>
// // //             <ChartTooltip
// // //               cursor={false}
// // //               content={<ChartTooltipContent hideLabel />}
// // //             />
// // //             <Pie
// // //               data={topThreeData}
// // //               dataKey="values"
// // //               nameKey="title"
// // //               innerRadius={60}
// // //               strokeWidth={0}
// // //               // activeIndex={0}
// // //               paddingAngle={3}
// // //               label={({ cx, cy }) => (
// // //                 <text
// // //                   x={cx}
// // //                   y={cy}
// // //                   textAnchor="middle"
// // //                   className="fill-[#111827] text-2xl font-bold"
// // //                 >
// // //                   <tspan x={cx} y={cy}>
// // //                     {value.toLocaleString()}
// // //                   </tspan>
// // //                   <tspan x={cx} y={(cy as any) + 24} className="fill-[#A0AEC0] text-xs">
// // //                     {title}
// // //                   </tspan>
// // //                 </text>
// // //               )}
// // //             />
// // //           </PieChart>
// // //         </ChartContainer>
// // //       </CardContent>
// // //       <div className="flex flex-col gap-3">
// // //         {topThreeData?.map((data: any, index: number) => (
// // //           <div className="flex items-center gap-3" key={index}>
// // //             <div
// // //               className={`w-[10px] h-[10px] rounded-full`}
// // //               style={{ backgroundColor: data.fill }}
// // //             ></div>
// // //             <p className="text-[#687588] text-xs font-medium me-auto">
// // //               {data?.title}
// // //             </p>
// // //             <h6 className="font-bold text-sm text-[#111827]">
// // //               {data?.values.toLocaleString()}
// // //             </h6>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </Card>
// // //   );
// // // }
// // "use client";

// // import { Pie, PieChart, ResponsiveContainer } from "recharts";
// // import { Card, CardContent } from "@/components/ui/card";
// // import {
// //   ChartConfig,
// //   ChartContainer,
// //   ChartTooltip,
// //   ChartTooltipContent,
// // } from "@/components/ui/chart";
// // import { useState } from "react";

// // // Updated config to match your data structure
// // const chartConfig = {
// //   values: {
// //     label: "Count",
// //   },
// // } satisfies ChartConfig;

// // interface iProps {
// //   chartData: any[];
// //   title: string;
// //   value: number;
// // }

// // export function PieChartComponent({ chartData, title, value }: iProps) {
// //   const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  
// //   // Get top 3 values
// //   const topThreeData = [...chartData]
// //     .sort((a, b) => b.values - a.values)
// //     .slice(0, 3);

// //   // Add color if not present in data
// //   const dataWithColors = topThreeData.map((item, index) => ({
// //     ...item,
// //     fill: item.fill || `hsl(var(--chart-${index + 1}))`
// //   }));

// //   return (
// //     <Card className="flex flex-col p-6 w-full h-auto">
// //       <div className="flex items-center justify-between mb-4">
// //         <h5 className="font-bold text-[#111827]">{title}</h5>
// //       </div>
// //       <CardContent className="flex-1 pb-0">
// //         <ChartContainer
// //           config={chartConfig}
// //           className="mx-auto aspect-square max-h-[250px]"
// //         >
// //           <ResponsiveContainer width="100%" height="100%">
// //             <PieChart>
// //               <ChartTooltip
// //                 cursor={false}
// //                 content={<ChartTooltipContent hideLabel />}
// //               />
// //               <Pie
// //                 data={dataWithColors}
// //                 dataKey="values"
// //                 nameKey="title"
// //                 innerRadius={60}
// //                 strokeWidth={0}
// //                 // activeIndex={activeIndex}
// //                 paddingAngle={2}
// //                 onMouseEnter={(_, index) => setActiveIndex(index)}
// //                 onMouseLeave={() => setActiveIndex(undefined)}
// //               >
// //                 <text
// //                   x="50%"
// //                   y="50%"
// //                   textAnchor="middle"
// //                   dominantBaseline="middle"
// //                   className="fill-[#111827] text-2xl font-bold"
// //                 >
// //                   <tspan x="50%" y="50%">
// //                     {value.toLocaleString()}
// //                   </tspan>
// //                   <tspan x="50%" y="50%" dy={24} className="fill-[#A0AEC0] text-xs">
// //                     Total
// //                   </tspan>
// //                 </text>
// //               </Pie>
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </ChartContainer>
// //       </CardContent>
// //       <div className="flex flex-col gap-3 mt-4">
// //         {dataWithColors?.map((data: any, index: number) => (
// //           <div className="flex items-center gap-3" key={index}>
// //             <div
// //               className="w-[10px] h-[10px] rounded-full"
// //               style={{ backgroundColor: data.fill }}
// //             ></div>
// //             <p className="text-[#687588] text-xs font-medium me-auto">
// //               {data?.title}
// //             </p>
// //             <h6 className="font-bold text-sm text-[#111827]">
// //               {data?.values.toLocaleString()}
// //             </h6>
// //           </div>
// //         ))}
// //       </div>
// //     </Card>
// //   );
// // }

// // "use client";

// // import { Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
// // import { Card, CardContent } from "@/components/ui/card";
// // import {
// //   ChartConfig,
// //   ChartContainer,
// //   ChartTooltip,
// //   ChartTooltipContent,
// // } from "@/components/ui/chart";
// // import { useState } from "react";

// // // Updated config to match your data structure
// // const chartConfig = {
// //   values: {
// //     label: "Count",
// //   },
// // } satisfies ChartConfig;

// // interface iProps {
// //   chartData: any[];
// //   title: string;
// //   value: number;
// // }

// // // Active shape component for hover effect
// // const renderActiveShape = (props: any) => {
// //   const RADIAN = Math.PI / 180;
// //   const {
// //     cx,
// //     cy,
// //     midAngle,
// //     innerRadius,
// //     outerRadius,
// //     startAngle,
// //     endAngle,
// //     fill,
// //     payload,
// //     percent,
// //     value,
// //   } = props;
// //   const sin = Math.sin(-RADIAN * midAngle);
// //   const cos = Math.cos(-RADIAN * midAngle);
// //   const sx = cx + (outerRadius + 10) * cos;
// //   const sy = cy + (outerRadius + 10) * sin;
// //   const mx = cx + (outerRadius + 30) * cos;
// //   const my = cy + (outerRadius + 30) * sin;
// //   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
// //   const ey = my;
// //   const textAnchor = cos >= 0 ? 'start' : 'end';

// //   return (
// //     <g>
// //       <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
// //         {payload.name}
// //       </text>
// //       <Sector
// //         cx={cx}
// //         cy={cy}
// //         innerRadius={innerRadius}
// //         outerRadius={outerRadius + 5}
// //         startAngle={startAngle}
// //         endAngle={endAngle}
// //         fill={fill}
// //       />
// //     </g>
// //   );
// // };

// // export function PieChartComponent({ chartData, title, value }: iProps) {
// //   const [activeIndex, setActiveIndex] = useState<number>(0);
  
// //   // Get top 3 values
// //   const topThreeData = [...chartData]
// //     .sort((a, b) => b.values - a.values)
// //     .slice(0, 4);

// //   // Add color if not present in data
// //   const dataWithColors = topThreeData.map((item, index) => ({
// //     ...item,
// //     fill: item.fill || `hsl(var(--chart-${index + 1}))`
// //   }));

// //   const onPieEnter = (_: any, index: number) => {
// //     setActiveIndex(index);
// //   };

// //   return (
// //     <Card className="flex flex-col p-6 w-full h-auto">
// //       <div className="flex items-center justify-between mb-4">
// //         <h5 className="font-bold text-[#111827]">{title}</h5>
// //       </div>
// //       <CardContent className="flex-1 pb-0">
// //         <ChartContainer
// //           config={chartConfig}
// //           className="mx-auto aspect-square max-h-[250px]"
// //         >
// //           <ResponsiveContainer width="100%" height="100%">
// //             <PieChart>
// //               <ChartTooltip
// //                 cursor={false}
// //                 content={<ChartTooltipContent hideLabel />}
// //               />
// //               <Pie
// //                 data={dataWithColors}
// //                 dataKey="values"
// //                 nameKey="title"
// //                 innerRadius={60}
// //                 strokeWidth={0}
// //                 paddingAngle={2}
// //                 // onMouseEnter={(_, index) => setActiveIndex(index)}
// //                 activeShape={renderActiveShape}
// //                 onMouseEnter={onPieEnter}
// //               >
// //                 <text
// //                   x="50%"
// //                   y="50%"
// //                   textAnchor="middle"
// //                   dominantBaseline="middle"
// //                   className="fill-[#111827] text-2xl font-bold"
// //                 >
// //                   <tspan x="50%" y="50%">
// //                     {value.toLocaleString()}
// //                   </tspan>
// //                   <tspan x="50%" y="50%" dy={24} className="fill-[#A0AEC0] text-xs">
// //                     Total
// //                   </tspan>
// //                 </text>
// //               </Pie>
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </ChartContainer>
// //       </CardContent>
// //       <div className="flex flex-col gap-3 mt-4">
// //         {dataWithColors?.map((data: any, index: number) => (
// //           <div className="flex items-center gap-3" key={index}>
// //             <div
// //               className="w-[10px] h-[10px] rounded-full"
// //               style={{ backgroundColor: data.fill }}
// //             ></div>
// //             <p className="text-[#687588] text-xs font-medium me-auto">
// //               {data?.title}
// //             </p>
// //             <h6 className="font-bold text-sm text-[#111827]">
// //               {data?.values.toLocaleString()}
// //             </h6>
// //           </div>
// //         ))}
// //       </div>
// //     </Card>
// //   );
// // }

// "use client";

// import { Pie, PieChart, ResponsiveContainer, Sector, Cell } from "recharts";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { useState } from "react";

// // Updated config to match your data structure
// const chartConfig = {
//   values: {
//     label: "Count",
//   },
// } satisfies ChartConfig;

// interface iProps {
//   chartData: any[];
//   title: string;
//   value: number;
// }

// // Enhanced active shape component for hover effect
// const renderActiveShape = (props: any) => {
//   const RADIAN = Math.PI / 180;
//   const {
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//     payload,
//     percent,
//     value,
//   } = props;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const sx = cx + (outerRadius + 10) * cos;
//   const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 30) * cos;
//   const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? 'start' : 'end';

//   return (
//     <g>
//       {/* Center text showing title and value */}
//       <text x={cx} y={cy} textAnchor="middle" fill="#111827">
//         <tspan x={cx} dy={-4} className="text-sm font-semibold">
//           {payload.title}
//         </tspan>
//         <tspan x={cx} dy={20} className="text-lg font-bold">
//           {value.toLocaleString()}
//         </tspan>
//         <tspan x={cx} dy={18} className="text-xs" fill="#687588">
//           ({(percent * 100).toFixed(1)}%)
//         </tspan>
//       </text>
      
//       {/* Highlighted sector */}
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius + 8}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
      
//       {/* Outer label with connecting line */}
//       <Sector
//         cx={cx}
//         cy={cy}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         innerRadius={outerRadius + 6}
//         outerRadius={outerRadius + 10}
//         fill={fill}
//       />
//       <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={2}/>
//       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      
//       {/* External label */}
//       <text 
//         x={ex + (cos >= 0 ? 1 : -1) * 12} 
//         y={ey} 
//         textAnchor={textAnchor} 
//         fill="#111827"
//         className="text-xs font-medium"
//       >
//         <tspan x={ex + (cos >= 0 ? 1 : -1) * 12} dy={0}>
//           {payload.title}
//         </tspan>
//         <tspan x={ex + (cos >= 0 ? 1 : -1) * 12} dy={16} className="font-bold">
//           {`${value.toLocaleString()}`}
//         </tspan>
//       </text>
//     </g>
//   );
// };

// export function PieChartComponent({ chartData, title, value }: iProps) {
//   const [activeIndex, setActiveIndex] = useState<number>(-1);
  
//   // Get top 3 values
//   const topThreeData = [...chartData]
//     .sort((a, b) => b.values - a.values)
//     .slice(0, 4);

//   // Add color if not present in data
//   const dataWithColors = topThreeData.map((item, index) => ({
//     ...item,
//     fill: item.fill || `hsl(var(--chart-${index + 1}))`
//   }));

//   const onPieEnter = (_: any, index: number) => {
//     setActiveIndex(index);
//   };

//   const onPieLeave = () => {
//     setActiveIndex(-1);
//   };

//   return (
//     <Card className="flex flex-col p-6 w-full h-auto">
//       <div className="flex items-center justify-between mb-4">
//         <h5 className="font-bold text-[#111827]">{title}</h5>
//       </div>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <ChartTooltip
//                 cursor={false}
//                 content={<ChartTooltipContent hideLabel />}
//               />
//               <Pie
//                 data={dataWithColors}
//                 dataKey="values"
//                 nameKey="title"
//                 innerRadius={60}
//                 strokeWidth={0}
//                 paddingAngle={2}
//                 activeShape={(props: any) => {
//                   // Only render active shape if this segment is active
//                   if (props.index === activeIndex) {
//                     return renderActiveShape(props);
//                   }
//                   // Otherwise render normal sector
//                   return (
//                     <Sector
//                       cx={props.cx}
//                       cy={props.cy}
//                       innerRadius={props.innerRadius}
//                       outerRadius={props.outerRadius}
//                       startAngle={props.startAngle}
//                       endAngle={props.endAngle}
//                       fill={props.fill}
//                     />
//                   );
//                 }}
//                 onMouseEnter={onPieEnter}
//                 onMouseLeave={onPieLeave}
//               >
//                 {dataWithColors.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.fill} />
//                 ))}
//                 {activeIndex === -1 && (
//                   <text
//                     x="50%"
//                     y="50%"
//                     textAnchor="middle"
//                     dominantBaseline="middle"
//                     className="fill-[#111827] text-2xl font-bold"
//                   >
//                     <tspan x="50%" y="50%">
//                       {value.toLocaleString()}
//                     </tspan>
//                     <tspan x="50%" y="50%" dy={24} className="fill-[#A0AEC0] text-xs">
//                       Total
//                     </tspan>
//                   </text>
//                 )}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>
//       <div className="flex flex-col gap-3 mt-4">
//         {dataWithColors?.map((data: any, index: number) => (
//           <div 
//             className="flex items-center gap-3 cursor-pointer transition-opacity hover:opacity-80" 
//             key={index}
//             onMouseEnter={() => setActiveIndex(index)}
//             onMouseLeave={() => setActiveIndex(-1)}
//           >
//             <div
//               className="w-[10px] h-[10px] rounded-full transition-transform"
//               style={{ 
//                 backgroundColor: data.fill,
//                 transform: activeIndex === index ? 'scale(1.5)' : 'scale(1)' 
//               }}
//             ></div>
//             <p className="text-[#687588] text-xs font-medium me-auto">
//               {data?.title}
//             </p>
//             <h6 className="font-bold text-sm text-[#111827]">
//               {data?.values.toLocaleString()}
//             </h6>
//           </div>
//         ))}
//       </div>
//     </Card>
//   );
// }

// "use client";

// import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { useState } from "react";

// // Updated config to match your data structure
// const chartConfig = {
//   values: {
//     label: "Count",
//   },
// } satisfies ChartConfig;

// interface iProps {
//   chartData: any[];
//   title: string;
//   value: number;
// }

// export function PieChartComponent({ chartData, title, value }: iProps) {
//   const [activeIndex, setActiveIndex] = useState<number>(-1);
  
//   // Get top 4 values
//   const topThreeData = [...chartData]
//     .sort((a, b) => b.values - a.values)
//     .slice(0, 4);

//   // Add color if not present in data
//   const dataWithColors = topThreeData.map((item, index) => ({
//     ...item,
//     fill: item.fill || `hsl(var(--chart-${index + 1}))`
//   }));

//   return (
//     <Card className="flex flex-col p-6 w-full h-auto">
//       <div className="flex items-center justify-between mb-4">
//         <h5 className="font-bold text-[#111827]">{title}</h5>
//       </div>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <ChartTooltip
//                 content={
//                   <ChartTooltipContent 
//                     formatter={(value, name) => [
//                       `${name}:`,
//                       `${value?.toLocaleString()}`
//                     ]}
//                   />
//                 }
//               />
//               <Pie
//                 data={dataWithColors}
//                 dataKey="values"
//                 nameKey="title"
//                 innerRadius={60}
//                 outerRadius={80}
//                 strokeWidth={0}
//                 paddingAngle={2}
//                 onMouseEnter={(_, index) => setActiveIndex(index)}
//                 onMouseLeave={() => setActiveIndex(-1)}
//               >
//                 {dataWithColors.map((entry, index) => (
//                   <Cell 
//                     key={`cell-${index}`} 
//                     fill={entry.fill}
//                     style={{ 
//                       cursor: 'pointer',
//                       filter: activeIndex === index ? 'brightness(1.1)' : 'brightness(1)',
//                       transition: 'filter 0.2s'
//                     }}
//                   />
//                 ))}
//               </Pie>
              
//               {/* Center text always showing total */}
//               <text
//                 x="50%"
//                 y="50%"
//                 textAnchor="middle"
//                 dominantBaseline="middle"
//                 className="pointer-events-none"
//               >
//                 <tspan 
//                   x="50%" 
//                   y="50%" 
//                   className="fill-[#111827] text-2xl font-bold"
//                 >
//                   {value.toLocaleString()}
//                 </tspan>
//                 <tspan 
//                   x="50%" 
//                   y="50%" 
//                   dy={24} 
//                   className="fill-[#A0AEC0] text-xs"
//                 >
//                   Total
//                 </tspan>
//               </text>
//             </PieChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>
      
//       {/* Legend */}
//       <div className="flex flex-col gap-3 mt-4">
//         {dataWithColors?.map((data: any, index: number) => (
//           <div 
//             className="flex items-center gap-3" 
//             key={index}
//           >
//             <div
//               className="w-[10px] h-[10px] rounded-full transition-all duration-200"
//               style={{ 
//                 backgroundColor: data.fill,
//                 transform: activeIndex === index ? 'scale(1.3)' : 'scale(1)',
//               }}
//             />
//             <p className={`text-xs font-medium me-auto transition-colors ${
//               activeIndex === index ? 'text-[#111827] font-semibold' : 'text-[#687588]'
//             }`}>
//               {data?.title}
//             </p>
//             <h6 className={`font-bold text-sm transition-colors ${
//               activeIndex === index ? 'text-[#111827]' : 'text-[#687588]'
//             }`}>
//               {data?.values.toLocaleString()}
//             </h6>
//           </div>
//         ))}
//       </div>
//     </Card>
//   );
// }
"use client";

import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";

const chartConfig = {
  values: { label: "Count" },
} satisfies ChartConfig;

interface iProps {
  chartData: any[];
  title: string;
  value: number;
}

export function PieChartComponent({ chartData, title, value }: iProps) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // Top 4 values
  const topThreeData = [...chartData]
    .sort((a, b) => b.values - a.values)
    .slice(0, 4);

  // Add gradient colors if not provided
  const gradients = [
    "url(#grad1)",
    "url(#grad2)",
    "url(#grad3)",
    "url(#grad4)",
  ];

  const dataWithColors = topThreeData.map((item, index) => ({
    ...item,
    fill: item.fill || gradients[index % gradients.length],
  }));

  return (
    <Card className="flex flex-col p-6 w-full h-auto rounded-2xl border border-gray-100 shadow-md transition-all hover:shadow-xl hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="font-bold text-[#111827] text-lg">{title}</h5>
      </div>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[260px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* Gradient defs */}
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="grad4" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#DB2777" />
                </linearGradient>
              </defs>

              {/* Tooltip */}
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => [
                      `${name}:`,
                      `${value?.toLocaleString()}`,
                    ]}
                  />
                }
              />

              {/* Pie */}
              <Pie
                data={dataWithColors}
                dataKey="values"
                nameKey="title"
                innerRadius={65}
                outerRadius={90}
                strokeWidth={2}
                paddingAngle={2}
                isAnimationActive
                animationBegin={200}
                animationDuration={1000}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
              >
                {dataWithColors.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    style={{
                      cursor: "pointer",
                      transform:
                        activeIndex === index ? "scale(1.05)" : "scale(1)",
                      transformOrigin: "center",
                      transition: "transform 0.3s ease, filter 0.3s ease",
                      filter:
                        activeIndex === index
                          ? "drop-shadow(0px 2px 6px rgba(0,0,0,0.25))"
                          : "none",
                    }}
                  />
                ))}
              </Pie>

              {/* Center text */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none"
              >
                <tspan
                  x="50%"
                  y="50%"
                  className="fill-[#111827] text-2xl font-bold"
                >
                  {value.toLocaleString()}
                </tspan>
                <tspan
                  x="50%"
                  y="50%"
                  dy={24}
                  className="fill-[#6B7280] text-sm"
                >
                  Total
                </tspan>
              </text>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      {/* Legend */}
      <div className="flex flex-col gap-3 mt-5">
        {dataWithColors.map((data: any, index: number) => (
          <div
            className="flex items-center gap-3"
            key={index}
          >
            <div
              className="w-[12px] h-[12px] rounded-full transition-all duration-300"
              style={{
                background: data.fill,
                transform: activeIndex === index ? "scale(1.3)" : "scale(1)",
              }}
            />
            <p
              className={`text-sm font-medium me-auto transition-colors ${
                activeIndex === index
                  ? "text-[#111827] font-semibold"
                  : "text-[#6B7280]"
              }`}
            >
              {data?.title}
            </p>
            <h6
              className={`font-bold text-sm transition-colors ${
                activeIndex === index ? "text-[#111827]" : "text-[#6B7280]"
              }`}
            >
              {data?.values.toLocaleString()}
            </h6>
          </div>
        ))}
      </div>
    </Card>
  );
}