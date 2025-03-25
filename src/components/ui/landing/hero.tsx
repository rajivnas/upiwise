import { ArrowUpTrayIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Take Control of Your
              <span className="text-blue-600 dark:text-blue-400">
                UPI Spending
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Analyze your UPI transactions with military-grade privacy. Get
              powerful insights without ever uploading your financial data.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/upload"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-600/20 flex items-center gap-2"
              >
                <ArrowUpTrayIcon className="w-5 h-5" />
                Analyze Your Statement
              </Link>
              <button className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
                <PlayCircleIcon className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            <TrustBadge />
          </div>

          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

function TrustBadge() {
  return (
    <div className="mt-12 flex flex-wrap gap-6 items-center justify-center lg:justify-start">
      <div className="flex items-center gap-2">
        <LockClosedIcon className="h-6 w-6 text-green-500" />
        <span className="text-gray-600 dark:text-gray-400">
          100% Client-Side Processing
        </span>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="order-1 lg:order-2 relative">
      <div className="bg-blue-600/10 dark:bg-blue-400/10 rounded-2xl p-8 lg:p-12">
        <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 p-6">
            <div className="h-full bg-gradient-to-br from-blue-100 to-white dark:from-gray-700 dark:to-gray-900 rounded-lg shadow-inner">
              <div className="p-4 space-y-4">
                <div className="h-32 bg-blue-200/30 dark:bg-blue-400/20 rounded-lg animate-pulse" />
                {["Food", "Shopping", "Bills", "Entertainment"].map(
                  (category) => (
                    <div key={category} className="flex items-center gap-3">
                      <div className="h-3 w-16 bg-blue-200/30 dark:bg-blue-400/20 rounded-full" />
                      <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
