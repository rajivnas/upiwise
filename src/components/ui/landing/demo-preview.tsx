"use client";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl transition-all hover:shadow-md border border-gray-100 dark:border-gray-700">
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3">
        {value}
      </div>
      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}

export function InteractivePreview() {
  const spendingData = [
    {
      category: "Food & Dining",
      amount: 12500,
      color: "bg-blue-400",
      month: "Jan",
    },
    {
      category: "Shopping",
      amount: 8400,
      color: "bg-purple-400",
      month: "Feb",
    },
    { category: "Bills", amount: 11200, color: "bg-green-400", month: "Mar" },
    {
      category: "Entertainment",
      amount: 6700,
      color: "bg-yellow-400",
      month: "Apr",
    },
  ];

  const totalSpent = spendingData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="py-12 sm:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Financial Insights at a Glance
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Interactive visualization of your spending patterns
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-2xl border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-4 sm:p-8">
            <StatCard
              label="Total Spent"
              value={`₹${totalSpent.toLocaleString()}`}
            />
            <StatCard label="Monthly Average" value="₹23,400" />
            <StatCard label="Top Category" value="Food & Dining" />
            <StatCard label="Savings Potential" value="18%" />
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 sm:gap-8 items-start p-4 sm:p-8">
            <div className="w-full lg:col-span-2 h-64 sm:h-96 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-700 dark:text-gray-300">
                Monthly Spending Breakdown
              </h3>
              <div className="flex items-end justify-between h-full gap-2 sm:gap-4 relative">
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 25, 50, 75, 100].map((percent) => (
                    <div
                      key={percent}
                      className="h-px bg-gray-100 dark:bg-gray-800"
                      style={{ bottom: `${percent}%` }}
                    ></div>
                  ))}
                </div>

                {spendingData.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex-1 group hover:transform hover:scale-105 transition-all"
                  >
                    <div
                      className={`${item.color} bg-opacity-90 rounded-t-lg transition-all duration-300 w-full hover:bg-opacity-100 shadow-sm hover:shadow-md`}
                      style={{ height: `${(item.amount / 15000) * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-md sm:rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{item.amount.toLocaleString()}
                      </div>
                    </div>
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full space-y-6 sm:space-y-8">
              <div className="relative w-40 h-40 sm:w-52 sm:h-52 mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 rounded-full p-1.5 sm:p-2 shadow-inner">
                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full flex flex-col items-center justify-center">
                      <div className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                        ₹{totalSpent.toLocaleString()}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Total Spent
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-6 sm:-inset-8 flex items-center justify-center">
                  {spendingData.map((item, index) => (
                    <div
                      key={index}
                      className="absolute w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
                      style={{
                        transform: `rotate(${
                          index * 90
                        }deg) translateX(var(--dot-translate-x))`,
                        backgroundColor: item.color.replace("bg-", ""),
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2 sm:space-y-4">
                {spendingData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 dark:bg-gray-700/30 rounded-md sm:rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${item.color} rounded-full shadow-sm border border-white dark:border-gray-800`}
                      ></div>
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-900 dark:text-gray-100 font-semibold">
                      ₹{item.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 pb-6 sm:pb-8 text-center">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 inline-flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center px-4">
              <ShieldCheckIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
              Insights generated from your UPI statements • 100% local
              processing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
