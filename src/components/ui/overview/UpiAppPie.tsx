"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { UpiApp } from "@/types/transaction";
import { cn } from "@/lib/utils";

const UPI_APP_COLORS = {
  [UpiApp.PHONEPE]: "#8b5cf6",
  [UpiApp.GPAY]: "#10b981",
  [UpiApp.PAYTM]: "#3b82f6",
  [UpiApp.BHIM]: "#ef4444",
  [UpiApp.AMAZON_PAY]: "#f59e0b",
  [UpiApp.WHATSAPP_PAY]: "#22c55e",
};

interface UpiAppPieProps {
  appUsage: Record<UpiApp, number>;
}

interface TooltipPayloadItem {
  name: string;
  value: number;
  payload: {
    name: UpiApp;
    value: number;
  };
}

export function UpiAppPie({ appUsage }: UpiAppPieProps) {
  const data = Object.entries(appUsage).map(([name, value]) => ({
    name,
    value,
  }));

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: TooltipPayloadItem[];
  }) => {
    if (!active || !payload?.[0]) return null;

    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor:
                UPI_APP_COLORS[payload[0].payload.name as UpiApp],
            }}
          />
          <p className="font-medium dark:text-white">
            {payload[0].payload.name}
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {payload[0].value.toLocaleString("en-IN")} transactions
        </p>
      </div>
    );
  };

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={75}
            paddingAngle={2}
            dataKey="value"
            className="transition-opacity hover:opacity-90"
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={UPI_APP_COLORS[entry.name as UpiApp]}
                stroke="transparent"
              />
            ))}
          </Pie>

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#f1f5f9", className: "dark:fill-gray-700/50" }}
          />

          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconSize={12}
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
