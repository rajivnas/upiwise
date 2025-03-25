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
import { Transaction, UpiApp } from "@/types/transaction";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

export interface UpiSpendingChartProps {
  transactions: Transaction[];
}

type DailySpendingData = {
  date: string;
} & Partial<Record<UpiApp, number>>;

const UPI_APP_COLORS = {
  [UpiApp.PHONEPE]: "#8b5cf6",
  [UpiApp.GPAY]: "#10b981",
  [UpiApp.PAYTM]: "#3b82f6",
  [UpiApp.BHIM]: "#ef4444",
  [UpiApp.AMAZON_PAY]: "#f59e0b",
  [UpiApp.WHATSAPP_PAY]: "#22c55e",
};

export function UpiSpendingChart({ transactions }: UpiSpendingChartProps) {
  const processData = (): DailySpendingData[] => {
    const dailyData: Record<string, DailySpendingData> = {};

    transactions.forEach((t) => {
      const date = format(parseISO(t.date), "dd MMM");
      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          ...Object.values(UpiApp).reduce(
            (acc, app) => ({
              ...acc,
              [app]: 0,
            }),
            {} as Partial<Record<UpiApp, number>>
          ),
        };
      }
      if (dailyData[date][t.upiApp] !== undefined) {
        dailyData[date][t.upiApp]! += t.amount;
      }
    });

    return Object.values(dailyData);
  };

  interface TooltipPayloadItem {
    payload: DailySpendingData;
    name: UpiApp;
    value: number;
    color: string;
  }

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: TooltipPayloadItem[];
  }) => {
    if (!active || !payload) return null;

    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
        <p className="font-medium dark:text-white mb-2">
          {payload[0].payload.date}
        </p>
        <div className="space-y-1">
          {payload
            .filter((entry): entry is TooltipPayloadItem => entry.value > 0)
            .map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: UPI_APP_COLORS[entry.name] }}
                  />
                  <span className="text-sm dark:text-gray-200">
                    {entry.name}
                  </span>
                </div>
                <span className="text-sm font-medium dark:text-gray-200">
                  ₹{entry.value.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={processData()}
        margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e2e8f0"
          vertical={false}
          className="dark:stroke-gray-700"
        />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
          className="dark:tick:text-gray-400"
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
          className="dark:tick:text-gray-400"
          tickFormatter={(value) => `₹${value / 1000}k`}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "#f1f5f9", className: "dark:fill-gray-700/50" }}
        />

        {Object.values(UpiApp).map((app) => (
          <Bar
            key={app}
            dataKey={app}
            stackId="a"
            fill={UPI_APP_COLORS[app]}
            radius={[4, 4, 0, 0]}
            className="transition-opacity hover:opacity-90"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
