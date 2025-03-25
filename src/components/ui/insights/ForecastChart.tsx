"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  ReferenceLine,
} from "recharts";
import { Transaction } from "@/types/transaction";

interface ForecastDataPoint {
  month: string;
  actual?: number;
  forecast: number;
  confidence: [number, number];
}

interface ForecastChartProps {
  transactions: Transaction[];
}

export default function ForecastChart({ transactions }: ForecastChartProps) {
  const forecastData: ForecastDataPoint[] = [
    {
      month: "Jan",
      actual: 42000,
      forecast: 41000,
      confidence: [38000, 44000],
    },
    {
      month: "Feb",
      actual: 45000,
      forecast: 44000,
      confidence: [41000, 47000],
    },
    {
      month: "Mar",
      actual: 48000,
      forecast: 46500,
      confidence: [43000, 49000],
    },
    {
      month: "Apr",
      actual: 46000,
      forecast: 45500,
      confidence: [42000, 48000],
    },
    { month: "May", forecast: 47500, confidence: [44000, 50000] },
    { month: "Jun", forecast: 49000, confidence: [46000, 51000] },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={forecastData}>
        <defs>
          <linearGradient id="confidenceFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="month"
          stroke="#94a3b8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          stroke="#94a3b8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value / 1000}k`}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
          formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`}
        />

        {/* Confidence Area */}
        <Area
          type="monotone"
          dataKey="confidence[1]"
          stroke="none"
          fillOpacity={0.3}
          fill="url(#confidenceFill)"
          connectNulls
        />
        <Area
          type="monotone"
          dataKey="confidence[0]"
          stroke="none"
          fillOpacity={0.3}
          fill="url(#confidenceFill)"
          connectNulls
        />

        {/* Actual Spending Line */}
        <Line
          type="monotone"
          dataKey="actual"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ fill: "#3b82f6", strokeWidth: 2 }}
        />

        {/* Forecast Line */}
        <Line
          type="monotone"
          dataKey="forecast"
          stroke="#8b5cf6"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />

        {/* User Goal Reference Line */}
        <ReferenceLine
          y={45000}
          stroke="#10b981"
          strokeDasharray="4 4"
          label={{
            value: "Your Goal",
            position: "right",
            fill: "#10b981",
            fontSize: 12,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
