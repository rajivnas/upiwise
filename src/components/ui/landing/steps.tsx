"use client";

import {
  ArrowDownTrayIcon,
  CloudArrowUpIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export function OnboardingSteps() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">
            Analyze Your UPI Payments in 3 Steps
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get instant insights from your transaction data
          </p>
        </div>

        <div className="relative flex flex-col gap-12 md:gap-16">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-12 bottom-24 w-px bg-gray-200 dark:bg-gray-700" />

          {/* Step 1: Export */}
          <div className="relative flex items-start gap-6 md:gap-12">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <ArrowDownTrayIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                1. Export Transactions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                Download your UPI payment history as CSV/PDF from your banking
                app
              </p>
            </div>
          </div>

          {/* Step 2: Upload */}
          <div className="relative flex items-start gap-6 md:gap-12">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <CloudArrowUpIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                2. Upload File
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                Drag & drop or select your transaction file securely
              </p>
              <div className="mt-4 max-w-xs border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  CSV, PDF supported
                </span>
              </div>
            </div>
          </div>

          {/* Step 3: Results */}
          <div className="relative flex items-start gap-6 md:gap-12">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <ChartBarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                3. Get Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                Instant visual reports and spending patterns analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
