"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTransactionStore } from "@/stores/transactionStore";
import {
  UpiApp,
  TransactionCategory,
  UPI_APP_COLORS,
} from "@/types/transaction";
import {
  CurrencyRupeeIcon,
  CheckCircleIcon,
  PhoneArrowUpRightIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { MetricCard } from "@/components/ui/overview/MetricCard";
import { type UpiSpendingChartProps } from "@/components/ui/overview/UpiSpendingChart";
import { generateUpiInsights } from "@/lib/upiAnalytics";
import { cn } from "@/lib/utils";

const UpiSpendingChart = dynamic<UpiSpendingChartProps>(
  () =>
    import("@/components/ui/overview/UpiSpendingChart").then(
      (mod) =>
        mod.UpiSpendingChart as React.ComponentType<UpiSpendingChartProps>
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 bg-gray-100/50 dark:bg-gray-800 animate-pulse rounded-2xl" />
    ),
  }
);

const UpiAppPie = dynamic<{ appUsage: Record<UpiApp, number> }>(
  () =>
    import("@/components/ui/overview/UpiAppPie").then(
      (mod) =>
        mod.UpiAppPie as React.ComponentType<{
          appUsage: Record<UpiApp, number>;
        }>
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 bg-gray-100/50 dark:bg-gray-800 animate-pulse rounded-2xl" />
    ),
  }
);

const CategoryPie = dynamic<{
  categorySpend: Record<TransactionCategory, number>;
}>(
  () =>
    import("@/components/ui/overview/CategoryPie").then(
      (mod) =>
        mod.CategoryPie as React.ComponentType<{
          categorySpend: Record<TransactionCategory, number>;
        }>
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 bg-gray-100/50 dark:bg-gray-800 animate-pulse rounded-2xl" />
    ),
  }
);

export default function OverviewPage() {
  const { transactions, isInitialized } = useTransactionStore();

  const upiStats = transactions.reduce(
    (acc, t) => ({
      totalSpent: acc.totalSpent + t.amount,
      successCount: acc.successCount + (t.status === "success" ? 1 : 0),
      appUsage: {
        ...acc.appUsage,
        [t.upiApp]: (acc.appUsage[t.upiApp] || 0) + 1,
      },
      categorySpend: {
        ...acc.categorySpend,
        [t.category]: (acc.categorySpend[t.category] || 0) + t.amount,
      },
    }),
    {
      totalSpent: 0,
      successCount: 0,
      appUsage: {} as Record<UpiApp, number>,
      categorySpend: {} as Record<TransactionCategory, number>,
    }
  );

  if (!isInitialized)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-pulse text-center space-y-4">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto" />
          <p className="text-gray-500 dark:text-gray-400">
            Loading transaction data...
          </p>
        </div>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 mb-10"
    >
      {/* Header Section */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <motion.h1
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
            >
              Financial Overview
            </motion.h1>
            <motion.p
              className="text-gray-600 dark:text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </motion.p>
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg"
          >
            <SparklesIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              All data processed locally
            </span>
          </motion.div>
        </div>
      </motion.header>

      {/* Metrics Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {[
          {
            title: "Total Spent",
            value: `₹${upiStats.totalSpent.toLocaleString("en-IN")}`,
            icon: (
              <CurrencyRupeeIcon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            ),
          },
          {
            title: "Successful Payments",
            value: `${upiStats.successCount} transactions`,
            icon: (
              <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-300" />
            ),
          },
          {
            title: "Most Used App",
            value:
              Object.entries(upiStats.appUsage).sort(
                (a, b) => b[1] - a[1]
              )[0]?.[0] || "N/A",
            icon: (
              <PhoneArrowUpRightIcon className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            ),
          },
          {
            title: "Daily Average",
            value: `${(transactions.length / 30).toFixed(1)} transactions`,
            icon: (
              <ClockIcon className="w-6 h-6 text-orange-600 dark:text-orange-300" />
            ),
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </motion.section>

      {/* Main Content */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold dark:text-white">
                Spending Trend
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Last 30 days
              </span>
            </div>
            <div className="h-80">
              <UpiSpendingChart transactions={transactions} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-lg font-semibold mb-6 dark:text-white">
              Key Insights
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {generateUpiInsights(transactions).map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    "p-4 rounded-lg border-l-4 flex items-start gap-3",
                    i % 3 === 0
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : i % 3 === 1
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                  )}
                >
                  <SparklesIcon className="w-5 h-5 mt-1 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{insight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-lg font-semibold mb-6 dark:text-white">
              Payment Apps Used
            </h2>
            <div className="h-64">
              <UpiAppPie appUsage={upiStats.appUsage} />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-lg font-semibold mb-6 dark:text-white">
              Spending by Category
            </h2>
            <div className="h-64">
              <CategoryPie categorySpend={upiStats.categorySpend} />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Recent Transactions */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-semibold dark:text-white">
            Recent Transactions
          </h2>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Last 5 transactions
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {["Time", "Recipient", "App", "Amount", "Status"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {transactions.slice(0, 5).map((t, index) => (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                    {new Date(t.timestamp).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium dark:text-gray-200 max-w-[120px] sm:max-w-none truncate">
                    {t.merchant}
                  </td>
                  <td className="px-2 sm:px-4 py-3">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${UPI_APP_COLORS[t.upiApp]}20`,
                        color: UPI_APP_COLORS[t.upiApp],
                      }}
                    >
                      {t.upiApp}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium dark:text-gray-200">
                    ₹{t.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-2 sm:px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        t.status === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                          : t.status === "failed"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {transactions.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            No recent transactions
          </div>
        )}
      </motion.section>
    </motion.div>
  );
}
