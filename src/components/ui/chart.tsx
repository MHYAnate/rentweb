"use client";

import React, { createContext, useContext, useMemo } from 'react';
import { cn } from '@/lib/utils';

// Chart Types and Interfaces
export interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
  };
}

interface ChartContextType {
  config: ChartConfig;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

function useChart() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('Chart components must be used within a ChartContainer');
  }
  return context;
}

// Main Chart Container - Supports both Recharts and custom charts
interface ChartContainerProps {
  config: ChartConfig;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({ config, children, className }: ChartContainerProps) {
  const contextValue = useMemo(() => ({ config }), [config]);

  return (
    <ChartContext.Provider value={contextValue}>
      <div 
        className={cn("relative", className)}
        style={ 
          {
            '--color-totalsales': config.totalsales?.color || '#FFC837',
            '--color-chrome': config.chrome?.color || 'hsl(var(--chart-1))',
            '--color-safari': config.safari?.color || 'hsl(var(--chart-2))',
            '--color-firefox': config.firefox?.color || 'hsl(var(--chart-3))',
            '--color-edge': config.edge?.color || 'hsl(var(--chart-4))',
            '--color-other': config.other?.color || 'hsl(var(--chart-5))',
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </ChartContext.Provider>
  );
}

// Chart Tooltip - Compatible with Recharts
interface ChartTooltipProps {
  children?: React.ReactNode;
  className?: string;
  content?: React.ReactNode;
  cursor?: boolean | any;
}

export function ChartTooltip({ children, className, content, cursor }: ChartTooltipProps) {
  return (
    <div className={cn(
      "absolute inset-0 pointer-events-none",
      className
    )}>
      {children}
      {content}
    </div>
  );
}

// Chart Tooltip Content - Compatible with Recharts tooltip props
interface ChartTooltipContentProps {
  className?: string;
  active?: boolean;
  payload?: any[];
  label?: string;
  hideLabel?: boolean;
  formatter?: (value: any, name: string) => [string, string];
}

export function ChartTooltipContent({ 
  className, 
  active, 
  payload, 
  label, 
  hideLabel = false,
  formatter 
}: ChartTooltipContentProps) {
  const { config } = useChart();

  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className={cn(
      "rounded-lg border bg-background p-3 shadow-sm z-50",
      className
    )}>
      <div className="flex flex-col gap-1">
        {!hideLabel && label && (
          <p className="font-medium text-sm text-gray-900">{label}</p>
        )}
        {payload.map((entry, index) => {
          const itemKey = entry.dataKey || entry.name;
          const itemConfig = config[itemKey];
          const [formattedValue, formattedName] = formatter 
            ? formatter(entry.value, itemConfig?.label || itemKey)
            : [entry.value, itemConfig?.label || itemKey];

          return (
            <div key={index} className="flex items-center gap-2">
              {itemConfig?.color && (
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: itemConfig.color }}
                />
              )}
              <span className="text-sm text-gray-700">
                {formattedName}: <span className="font-semibold">{formattedValue}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Custom Line Chart Component (SVG-based alternative to Recharts)
interface CustomLineChartProps {
  data: any[];
  config: ChartConfig;
  className?: string;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
}

export function CustomLineChart({ data, config, className, margin = {} }: CustomLineChartProps) {
  const { top = 0, right = 0, bottom = 0, left = 0 } = margin;
  
  const chartData = data || [];
  const width = 400 - left - right;
  const height = 200 - top - bottom;

  const maxValue = Math.max(...chartData.map(d => d.total_sales));
  const minValue = Math.min(...chartData.map(d => d.total_sales));

  const getX = (index: number) => (index / (chartData.length - 1)) * width;
  const getY = (value: number) => height - ((value - minValue) / (maxValue - minValue || 1)) * height;

  const points = chartData.map((d, index) => 
    `${getX(index)},${getY(d.total_sales)}`
  ).join(' ');

  return (
    <ChartContainer config={config}>
      <div className={cn("relative", className)}>
        <svg 
          width={width + left + right} 
          height={height + top + bottom}
          viewBox={`0 0 ${width + left + right} ${height + top + bottom}`}
        >
          {/* Grid lines */}
          <g transform={`translate(${left},${top})`}>
            {/* Y-axis grid */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
              <line
                key={`grid-y-${index}`}
                x1={0}
                y1={height * ratio}
                x2={width}
                y2={height * ratio}
                stroke="#e5e7eb"
                strokeWidth={1}
                strokeDasharray="2,2"
              />
            ))}
            
            {/* Line */}
            <polyline
              fill="none"
              stroke="var(--color-totalsales)"
              strokeWidth={2}
              points={points}
            />
            
            {/* Points */}
            {chartData.map((d, index) => (
              <circle
                key={index}
                cx={getX(index)}
                cy={getY(d.total_sales)}
                r={3}
                fill="var(--color-totalsales)"
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </g>
        </svg>
      </div>
    </ChartContainer>
  );
}

// Custom Pie Chart Component (SVG-based alternative to Recharts)
interface CustomPieChartProps {
  data: any[];
  config: ChartConfig;
  className?: string;
  innerRadius?: number;
  outerRadius?: number;
  label?: (props: any) => React.ReactNode;
}

export function CustomPieChart({ 
  data, 
  config, 
  className, 
  innerRadius = 60, 
  outerRadius = 100,
  label 
}: CustomPieChartProps) {
  const chartData = data || [];
  const total = chartData.reduce((sum, item) => sum + item.values, 0);
  
  if (total === 0) {
    return (
      <div className={cn("flex items-center justify-center h-full", className)}>
        <span className="text-sm text-muted-foreground">No data</span>
      </div>
    );
  }

  let accumulatedAngle = 0;
  const centerX = 150;
  const centerY = 150;

  return (
    <ChartContainer config={config}>
      <div className={cn("relative", className)}>
        <svg viewBox="0 0 300 300" className="w-full h-full">
          {chartData.map((item, index) => {
            const percentage = (item.values / total);
            const angle = percentage * 360;
            
            const startAngle = accumulatedAngle;
            const endAngle = accumulatedAngle + angle;
            
            // Convert angles to radians
            const startRad = (startAngle - 90) * (Math.PI / 180);
            const endRad = (endAngle - 90) * (Math.PI / 180);
            
            // Calculate coordinates for outer arc
            const x1 = centerX + outerRadius * Math.cos(startRad);
            const y1 = centerY + outerRadius * Math.sin(startRad);
            const x2 = centerX + outerRadius * Math.cos(endRad);
            const y2 = centerY + outerRadius * Math.sin(endRad);
            
            // Calculate coordinates for inner arc
            const x3 = centerX + innerRadius * Math.cos(endRad);
            const y3 = centerY + innerRadius * Math.sin(endRad);
            const x4 = centerX + innerRadius * Math.cos(startRad);
            const y4 = centerY + innerRadius * Math.sin(startRad);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M ${x1} ${y1}`,
              `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `L ${x3} ${y3}`,
              `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
              `Z`
            ].join(' ');

            accumulatedAngle += angle;

            const itemConfig = config[item.browser] || config[item.title] || config.values;
            
            return (
              <path
                key={item.title || item.browser || index}
                d={pathData}
                fill={item.fill || itemConfig?.color || PIE_COLORS[index % PIE_COLORS.length]}
                stroke="#fff"
                strokeWidth={2}
                className="transition-opacity hover:opacity-80"
              />
            );
          })}
          
          {/* Center label */}
          {label && label({ 
            cx: centerX, 
            cy: centerY, 
            innerRadius, 
            outerRadius 
          })}
        </svg>
      </div>
    </ChartContainer>
  );
}

// Legend Component
interface ChartLegendProps {
  className?: string;
  payload?: any[];
}

export function ChartLegend({ className, payload }: ChartLegendProps) {
  const { config } = useChart();

  const items = payload || Object.entries(config).filter(([key]) => key !== 'values');

  return (
    <div className={cn("flex flex-wrap gap-4 justify-center", className)}>
      {items.map((item, index) => {
        const itemKey = item.dataKey || item.value || item.name;
        const itemConfig = config[itemKey];
        const color = item.color || itemConfig?.color || PIE_COLORS[index % PIE_COLORS.length];
        
        return (
          <div key={itemKey || index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm text-muted-foreground">
              {itemConfig?.label || itemKey}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// Utility function for chart colors
export const CHART_COLORS = {
  blue: '#3b82f6',
  green: '#16a34a',
  orange: '#f97316',
  red: '#ef4444',
  purple: '#8b5cf6',
  pink: '#ec4899',
  yellow: '#FFC837',
  cyan: '#06b6d4',
};

export const PIE_COLORS = [
  CHART_COLORS.blue,
  CHART_COLORS.green,
  CHART_COLORS.orange,
  CHART_COLORS.red,
  CHART_COLORS.purple,
  CHART_COLORS.pink,
];

// Export all components
export {
  useChart,
};