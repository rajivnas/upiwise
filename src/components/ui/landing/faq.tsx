"use client";

import { useState } from "react";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 dark:border-gray-800 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 py-3 group focus:outline-none"
      >
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {question}
        </h3>
        <span className="flex-shrink-0">
          <svg
            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-45" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? "max-h-48" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 dark:text-gray-300 pb-4 pr-6">{answer}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">
            Common Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Quick answers to things you might wonder
          </p>
        </div>

        <div className="space-y-2">
          <FAQItem
            question="How is my data protected?"
            answer="All processing happens locally on your device using bank-grade encryption. No data is ever stored or transmitted."
          />
          <FAQItem
            question="Which UPI apps are supported?"
            answer="We support all major Indian UPI services including PhonePe, GPay, Paytm, and Amazon Pay."
          />
          <FAQItem
            question="Can I use this offline?"
            answer="Yes, the app works fully offline after initial setup. No internet required for analysis."
          />
          <FAQItem
            question="How often is data updated?"
            answer="Insights update instantly. We automatically detect and process new transactions in real-time."
          />
          <FAQItem
            question="Can I export my reports?"
            answer="Export any report as PDF, Excel, or CSV with customizable formats."
          />
        </div>

        <div className="mt-12 text-center pt-8">
          <p className="text-gray-600 dark:text-gray-400">
            Need more help?{" "}
            <a
              href="#contact"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
