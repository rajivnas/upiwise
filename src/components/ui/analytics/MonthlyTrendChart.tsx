"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { MONTHS } from "@/lib/constants";
import { useMediaQuery } from "react-responsive";

interface Props {
  data: number[];
}

interface ChartDataItem {
  monthIndex: number;
  value: number;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: ChartDataItem }[];
}) => {
  if (active && payload?.[0]) {
    const { monthIndex, value } = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
        <p className="font-medium dark:text-white">{MONTHS[monthIndex]}</p>
        <p className="text-sm">₹{value.toLocaleString("en-IN")}</p>
      </div>
    );
  }
  return null;
};

export default function MonthlyBarChart({ data }: Props) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const chartData: ChartDataItem[] = data.map((value, index) => ({
    monthIndex: index,
    value,
  }));

  return (
    <div className="w-full h-[420px] sm:h-[500px] mb-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: isMobile ? 5 : 20,
            left: isMobile ? 5 : 20,
            bottom: isMobile ? 100 : 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="monthIndex"
            tickFormatter={(index) => MONTHS[index]}
            stroke="#64748b"
            fontSize={isMobile ? 10 : 12}
            tickLine={false}
            angle={-90}
            textAnchor="end"
            interval={0}
            height={120}
            dy={isMobile ? 30 : 25}
          />
          <YAxis
            stroke="#64748b"
            fontSize={isMobile ? 10 : 12}
            tickLine={false}
            tickFormatter={(value) =>
              value >= 1000 ? `₹${(value / 1000).toFixed(0)}k` : `₹${value}`
            }
            width={isMobile ? 50 : 60}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#f1f5f9" }}
            position={isMobile ? { y: -60 } : undefined}
          />
          <Bar
            dataKey="value"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            animationDuration={300}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
