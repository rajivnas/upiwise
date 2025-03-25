"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { TransactionCategory } from "@/types/transaction";

const CATEGORY_COLORS = {
  [TransactionCategory.FOOD_DELIVERY]: "#f59e0b",
  [TransactionCategory.MOBILE_RECHARGE]: "#3b82f6",
  [TransactionCategory.BILL_PAYMENT]: "#10b981",
  [TransactionCategory.MONEY_TRANSFER]: "#8b5cf6",
  [TransactionCategory.RENT_PAYMENT]: "#ef4444",
  [TransactionCategory.ONLINE_SHOPPING]: "#ec4899",
  [TransactionCategory.TRANSPORTATION]: "#f97316",
  [TransactionCategory.ENTERTAINMENT]: "#d946ef",
  [TransactionCategory.INVESTMENTS]: "#22c55e",
  [TransactionCategory.OTHERS]: "#64748b",
} satisfies Record<TransactionCategory, string>;

interface CategoryPieProps {
  categorySpend: Record<TransactionCategory, number>;
}

export function CategoryPie({ categorySpend }: CategoryPieProps) {
  const data = Object.entries(categorySpend).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          labelLine={false}
        >
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={CATEGORY_COLORS[entry.name as TransactionCategory]}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`}
          contentStyle={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          formatter={(value) => (
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
