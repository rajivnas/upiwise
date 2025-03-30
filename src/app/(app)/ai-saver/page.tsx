"use client";

import dynamic from "next/dynamic";
import {
  SparklesIcon,
  LightBulbIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { useTransactionStore } from "@/stores/transactionStore";
import { motion } from "framer-motion";

const ForecastChart = dynamic(
  () => import("@/components/ui/insights/ForecastChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-xl" />
    ),
  }
);

type Recommendation =
  | {
      type: "savings";
      title: string;
      amount: number;
      frequency: string;
      services: string[];
    }
  | {
      type: "spending";
      title: string;
      currentSpend: number;
      suggestedLimit: number;
      merchant: string;
    };

export default function AISaver() {
  const { transactions } = useTransactionStore();

  const recommendations: Recommendation[] = [
    {
      type: "savings",
      title: "Subscription Optimization",
      amount: 2400,
      frequency: "monthly",
      services: ["Netflix", "Spotify", "Times Prime"],
    },
    {
      type: "spending",
      title: "Food Delivery Limit",
      currentSpend: 6500,
      suggestedLimit: 4000,
      merchant: "Swiggy",
    },
  ];

  const detectedPatterns = [
    {
      day: "Friday",
      amountRange: "1,200-1,500",
      merchant: "Swiggy",
      frequency: "8 transactions",
      strength: "Strong Pattern",
    },
    {
      day: "1st Week",
      amountRange: "₹4,500-5,200",
      merchant: "Utility Bills",
      frequency: "5 transactions",
      strength: "Common Pattern",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 mb-10"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col sm:flex-row justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            AI Financial Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Personalized insights powered by local analysis
          </p>
        </div>
        <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/20 px-4 py-2 rounded-lg">
          <SparklesIcon className="w-5 h-5 text-purple-600 dark:text-purple-300" />
          <span className="text-sm font-medium text-purple-600 dark:text-purple-300">
            100% Local Processing
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <motion.div
            whileHover={{ scale: 1.001 }}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <LightBulbIcon className="w-6 h-6 text-yellow-500" />
              <h2 className="text-lg sm:text-xl font-semibold dark:text-white">
                Actionable Recommendations
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500"
                >
                  <div className="flex gap-3 mb-3">
                    <SparklesIcon className="w-5 h-5 text-blue-600 dark:text-blue-300 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200">
                        {rec.type === "savings"
                          ? "Savings Opportunity"
                          : "Spending Alert"}
                      </h3>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-300">
                          {rec.type === "savings"
                            ? `₹${rec.amount.toLocaleString()}`
                            : `₹${rec.currentSpend.toLocaleString()} → ₹${rec.suggestedLimit.toLocaleString()}`}
                        </span>
                        <span className="text-sm text-blue-600 dark:text-blue-300">
                          {rec.type === "savings"
                            ? "/month potential"
                            : "suggested limit"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-xs text-blue-600 dark:text-blue-300">
                      {rec.type === "savings" &&
                        (rec.services || []).join(", ")}
                    </div>
                    <button className="text-blue-600 dark:text-blue-300 text-sm font-medium hover:underline flex items-center">
                      Optimize <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold dark:text-white">
                6-Month Spending Trend
              </h2>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <QuestionMarkCircleIcon className="w-4 h-4" />
                <span>Based on your transaction history</span>
              </div>
            </div>
            <div className="h-64 sm:h-96">
              <ForecastChart transactions={transactions} />
            </div>
          </motion.div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 dark:text-white">
              Spending Patterns
            </h2>
            <div className="space-y-4">
              {detectedPatterns.map((pattern, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-300">
                      Every {pattern.day}
                    </span>
                    <span className="text-purple-600 dark:text-purple-300 font-medium">
                      {pattern.strength}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    ₹{pattern.amountRange} at {pattern.merchant}
                  </h3>
                  <div className="relative pt-3">
                    <div className="flex text-xs text-gray-500 justify-between mb-1">
                      <span>Frequency</span>
                      <span>{pattern.frequency}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width:
                            pattern.strength === "Strong Pattern"
                              ? "75%"
                              : "65%",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 dark:text-white">
              Savings Progress
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-green-800 dark:text-green-300">
                    Monthly Savings Potential
                  </span>
                  <span className="text-xl font-bold text-green-600 dark:text-green-300">
                    ₹2,400
                  </span>
                </div>
                <div className="relative h-2 bg-gray-100 dark:bg-gray-600 rounded-full">
                  <div
                    className="absolute h-2 bg-green-500 rounded-full"
                    style={{ width: "60%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Current Progress</span>
                  <span>Goal: ₹4,000</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
