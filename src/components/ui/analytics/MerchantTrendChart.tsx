"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Transaction } from "@/types/transaction";
import { MONTHS } from "@/lib/constants";

interface Props {
  merchant: string;
  transactions: Transaction[];
}

export default function MerchantTrendChart({ merchant, transactions }: Props) {
  const chartData = useMemo(() => {
    const monthlyData = Array(12).fill(0);

    transactions
      .filter((t) => t.merchant === merchant)
      .forEach((t) => {
        const month = new Date(t.timestamp).getMonth();
        monthlyData[month] += t.amount;
      });

    return MONTHS.map((month, index) => ({
      month,
      amount: monthlyData[index],
    }));
  }, [merchant, transactions]);

  const totalSpent = chartData.reduce((sum, entry) => sum + entry.amount, 0);
  const transactionCount = transactions.filter(
    (t) => t.merchant === merchant
  ).length;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm font-semibold dark:text-white">{merchant}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {transactionCount} transactions
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold dark:text-white">
            ₹{totalSpent.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Total spent
          </p>
        </div>
      </div>

      <div className="flex-1">
        {totalSpent > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="month"
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: "#e2e8f0" }}
                tickFormatter={(value) => `₹${value / 1000}k`}
              />
              <Tooltip
                cursor={{ fill: "#f1f5f9" }}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) =>
                  `₹${Number(value).toLocaleString("en-IN")}`
                }
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
            No transactions this period
          </div>
        )}
      </div>
    </div>
  );
}
