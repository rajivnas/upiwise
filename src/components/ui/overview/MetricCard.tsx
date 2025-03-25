"use client";

import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: number;
  loading?: boolean;
}

export function MetricCard({
  title,
  value,
  trend,
  icon,
  loading,
}: MetricCardProps) {
  const isPositive = trend ? trend >= 0 : true;
  const TrendIcon = isPositive ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;

  return (
    <div
      className={cn(
        "p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700",
        "flex flex-col justify-between min-h-[100px]",
        loading ? "animate-pulse" : ""
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-semibold dark:text-white">
            {loading ? (
              <span className="bg-gray-100 dark:bg-gray-700 rounded-md w-20 h-8 block animate-pulse" />
            ) : (
              value
            )}
          </p>
        </div>
        <div className="text-gray-600 dark:text-gray-300">
          {loading ? (
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-md animate-pulse" />
          ) : (
            icon
          )}
        </div>
      </div>

      {!loading && typeof trend === "number" && (
        <div className="mt-2 flex items-center gap-1.5 text-sm">
          <TrendIcon
            className={cn("w-4 h-4", {
              "text-green-600 dark:text-green-400": isPositive,
              "text-red-600 dark:text-red-400": !isPositive,
            })}
          />
          <span
            className={cn({
              "text-green-600 dark:text-green-400": isPositive,
              "text-red-600 dark:text-red-400": !isPositive,
            })}
          >
            {Math.abs(trend).toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}
