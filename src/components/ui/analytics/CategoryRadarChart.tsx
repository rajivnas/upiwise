"use client";

import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
} from "recharts";
import { TransactionCategory } from "@/types/transaction";
import { CATEGORY_COLORS } from "@/lib/constants";

interface Props {
  data: Partial<Record<TransactionCategory, number>>;
}

interface ChartDataItem {
  category: TransactionCategory;
  value: number;
  fill: string;
  stroke: string;
}

const DECAGON_ANGLES = Array.from({ length: 10 }, (_, i) => i * 36);

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (!active || !payload?.[0]) return null;

  const item = payload[0].payload as ChartDataItem;

  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: item.fill }}
        />
        <p className="font-medium text-base dark:text-white">{item.category}</p>
      </div>
      <p className="text-base text-gray-600 dark:text-gray-300 mt-1">
        ₹{item.value.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

export default function CategoryRadarChart({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartData: ChartDataItem[] = Object.values(TransactionCategory).map(
    (category) => ({
      category,
      value: data[category] || 0,
      fill: `${CATEGORY_COLORS[category]}${activeIndex === null ? "33" : "66"}`,
      stroke: CATEGORY_COLORS[category],
    })
  );

  return (
    <div className="h-[300px] md:h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          outerRadius={isMobile ? "82%" : "75%"}
          data={chartData}
          margin={
            isMobile
              ? { top: 5, right: 10, bottom: 70, left: 10 }
              : { top: 20, right: 30, bottom: 50, left: 30 }
          }
          onMouseMove={(e) => {
            if (typeof e.activeTooltipIndex === "number") {
              setActiveIndex(e.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <defs>
            <radialGradient id="areaGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          <PolarGrid
            stroke="#e2e8f0"
            strokeWidth={0.5}
            polarAngles={DECAGON_ANGLES}
            radialLines={false}
          />

          <PolarAngleAxis
            dataKey="category"
            tick={{
              fill: "#64748b",
              fontSize: isMobile ? 12 : 14,
              fontWeight: 500,
              dy: isMobile ? 2 : 8,
            }}
            tickLine={{ stroke: "#e2e8f0" }}
            axisLine={{ stroke: "transparent" }}
          />

          <Radar
            name="Spending"
            dataKey="value"
            strokeWidth={1.5}
            fill="url(#areaGradient)"
            stroke="stroke"
            fillOpacity={0.4}
            animationEasing="ease-out"
            animationDuration={400}
            dot={{
              r: 4,
              fill: "#fff",
              stroke: "stroke",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "#fff",
              stroke: "stroke",
              strokeWidth: 2,
            }}
          />

          {DECAGON_ANGLES.map((angle) => (
            <text
              key={angle}
              x="50%"
              y="50%"
              textAnchor="middle"
              fill="#e2e8f0"
              fontSize={12}
              transform={`rotate(${angle} 50 50)`}
              dominantBaseline="middle"
            >
              •
            </text>
          ))}

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#94a3b8",
              strokeWidth: 1,
              strokeDasharray: "3 3",
            }}
            position={isMobile ? { y: -20 } : undefined}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
