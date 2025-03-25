"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  CurrencyRupeeIcon,
  ChartBarIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { useTransactionStore } from "@/stores/transactionStore";
import { TransactionCategory } from "@/types/transaction";

interface MonthlyTrendChartProps {
  data: number[];
}

const MonthlyTrendChart = dynamic<MonthlyTrendChartProps>(
  () =>
    import("@/components/ui/analytics/MonthlyTrendChart").then(
      (mod) => mod.default
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
    ),
  }
);

const CategoryRadarChart = dynamic(
  () => import("@/components/ui/analytics/CategoryRadarChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 bg-gray-100 animate-pulse rounded-xl" />
    ),
  }
);

const MerchantTrendChart = dynamic(
  () => import("@/components/ui/analytics/MerchantTrendChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-48 bg-gray-100 animate-pulse rounded-xl" />
    ),
  }
);

export default function SpendingAnalysis() {
  const { transactions } = useTransactionStore();
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<"1m" | "3m" | "6m" | "1y">("1m");

  const {
    monthlyTrends,
    categoryTotals,
    topMerchants,
    filteredTransactions,
    aiInsights,
  } = useMemo(() => {
    const now = Date.now();
    const timeFilters = {
      "1m": now - 2592000000,
      "3m": now - 7776000000,
      "6m": now - 15552000000,
      "1y": now - 31536000000,
    };

    const filteredTransactions = transactions.filter(
      (t) => t.timestamp > timeFilters[timeRange]
    );

    const monthlyTrends = Array(12).fill(0);
    const categoryTotals = {} as Record<TransactionCategory, number>;
    const merchantMap = {} as Record<string, number>;
    let totalSpent = 0;

    filteredTransactions.forEach((tx) => {
      const month = new Date(tx.timestamp).getMonth();
      monthlyTrends[month] += tx.amount;
      categoryTotals[tx.category] =
        (categoryTotals[tx.category] || 0) + tx.amount;
      merchantMap[tx.merchant] = (merchantMap[tx.merchant] || 0) + tx.amount;
      totalSpent += tx.amount;
    });

    const aiInsights = [];
    const transactionCount = filteredTransactions.length;

    if (transactionCount > 0) {
      const daysInRange =
        parseInt(timeRange[0]) * (timeRange.endsWith("m") ? 30 : 365);
      const dailyAverage = transactionCount / daysInRange;
      aiInsights.push({
        icon: "⏱️",
        title: "Transaction Frequency",
        content: `${Math.round(dailyAverage)} transactions/day average`,
      });

      const topCategory = Object.entries(categoryTotals).sort(
        (a, b) => b[1] - a[1]
      )[0];
      if (topCategory) {
        aiInsights.push({
          icon: "📊",
          title: "Main Spending Category",
          content: `${topCategory[0]} (${(
            (topCategory[1] / totalSpent) *
            100
          ).toFixed(1)}% of total)`,
        });
      }

      const averageSpend = totalSpent / transactionCount;
      const largeTransactions = filteredTransactions.filter(
        (t) => t.amount > averageSpend * 3
      );
      if (largeTransactions.length > 0) {
        aiInsights.push({
          icon: "⚠️",
          title: "Notable Transactions",
          content: `${
            largeTransactions.length
          } over ₹${averageSpend.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
          })}`,
        });
      }

      const top3Categories = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
      if (top3Categories[0] && top3Categories[0][1] > totalSpent * 0.4) {
        aiInsights.push({
          icon: "💡",
          title: "Savings Suggestion",
          content: `Review ${top3Categories[0][0]} spending`,
        });
      }
    }

    return {
      monthlyTrends,
      categoryTotals,
      topMerchants: Object.entries(merchantMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
      filteredTransactions,
      aiInsights,
    };
  }, [transactions, timeRange]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 mb-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Spending Analysis
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Insights from {filteredTransactions.length} transactions
            </p>
          </div>
          <select
            className="select select-bordered bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white
            focus:outline-none focus:ring-0 focus:ring-offset-0"
            onChange={(e) => setTimeRange(e.target.value as any)}
            value={timeRange}
          >
            <option value="1m">Last 1 Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last 1 Year</option>
          </select>
        </div>
      </motion.div>

      {aiInsights.length > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {aiInsights.map((insight, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{insight.icon}</span>
                <div>
                  <h3 className="font-medium dark:text-white">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {insight.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <CurrencyRupeeIcon className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Spent
              </p>
              <p className="text-2xl font-bold dark:text-white">
                ₹
                {filteredTransactions
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <ShoppingBagIcon className="w-6 h-6 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Top Merchant
              </p>
              <p className="text-2xl font-bold dark:text-white truncate">
                {topMerchants[0]?.[0] || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <ChartBarIcon className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Average Transaction
              </p>
              <p className="text-2xl font-bold dark:text-white">
                ₹
                {(
                  filteredTransactions.reduce((sum, t) => sum + t.amount, 0) /
                  (filteredTransactions.length || 1)
                ).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid lg:grid-cols-2 gap-6 sm:gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 dark:text-white">
            Monthly Spending
          </h2>
          <div className="h-64 sm:h-80">
            <MonthlyTrendChart data={monthlyTrends} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold dark:text-white">
            Spending Categories
          </h2>
          <div className="h-64 sm:h-80">
            <CategoryRadarChart data={categoryTotals} />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid lg:grid-cols-3 gap-6 sm:gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold dark:text-white">
              Top Merchants
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {timeRange.replace("m", " Month").replace("y", " Year")}
            </span>
          </div>

          <div className="space-y-4">
            {topMerchants.map(([merchant, amount], index) => (
              <div
                key={merchant}
                className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg cursor-pointer"
                onClick={() => setSelectedMerchant(merchant)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500">
                    {index + 1}.
                  </span>
                  <span className="font-medium dark:text-white">
                    {merchant}
                  </span>
                </div>
                <span className="text-sm font-semibold dark:text-white">
                  ₹{amount.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          {selectedMerchant && (
            <div className="mt-6">
              <h3 className="text-md font-semibold mb-4 dark:text-white">
                {selectedMerchant} Activity
              </h3>
              <div className="h-48">
                <MerchantTrendChart
                  merchant={selectedMerchant}
                  transactions={filteredTransactions}
                />
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 dark:text-white">
            Category Breakdown
          </h2>
          <div className="space-y-4">
            {Object.entries(categoryTotals).map(([category, amount]) => (
              <div
                key={category}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg"
              >
                <span className="text-sm dark:text-gray-300">{category}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold dark:text-white">
                    ₹{amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
