"use client";

import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  CalendarIcon,
  LockClosedIcon,
  SparklesIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-8 sm:py-12 mx-auto max-w-5xl">
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900"
          >
            Understand Your Spending
          </motion.h1>
          <p className="text-gray-600 mt-1">
            Securely analyze transaction patterns from your UPI statements
          </p>
        </div>

        <div className="space-y-16">
          <div className="border-b border-gray-100 pb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-100 p-3 rounded-lg">
                <DevicePhoneMobileIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">PhonePe</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <Step number="1" title="Open Transaction History">
                Go to Profile → Transaction History
              </Step>
              <Step number="2" title="Export Statement">
                Select date range and choose PDF/CSV
              </Step>
              <Step number="3" title="Download">
                Receive file via email or app download
              </Step>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-green-100 p-3 rounded-lg">
                <DocumentTextIcon className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Google Pay
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <Step number="1" title="Access Transactions">
                Navigate to Insights → Transactions
              </Step>
              <Step number="2" title="Export Data">
                Tap 'Export to PDF' option
              </Step>
              <Step number="3" title="Review">
                Check your email for statement
              </Step>
            </div>
          </div>

          <div className="pb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-teal-100 p-3 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-teal-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                WhatsApp Pay
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <Step number="1" title="Open Payments">
                Go to Payments → Transaction History
              </Step>
              <Step number="2" title="Request Statement">
                Select duration and request export
              </Step>
              <Step number="3" title="Download">
                Save PDF from WhatsApp chat
              </Step>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-4 bg-gray-50 px-8 py-4 rounded-full mb-8">
            <LockClosedIcon className="w-6 h-6 text-emerald-600" />
            <span className="text-lg font-medium text-gray-900">
              Your Data Never Leaves Your Device
            </span>
          </div>

          <Link
            href="/upload"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg
    text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <SparklesIcon className="w-5 h-5 mr-2" />
            Start Secure Analysis
          </Link>
        </div>
      </div>
    </div>
  );
}

const Step = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-gray-500">
      <span className="font-medium">{number}.</span>
      <h3 className="font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 pl-6">{children}</p>
  </div>
);
