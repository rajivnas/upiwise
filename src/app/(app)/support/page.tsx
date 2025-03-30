"use client";

import {
  LifebuoyIcon,
  ChatBubbleOvalLeftIcon,
  ClockIcon,
  EnvelopeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Support() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-lg mb-4">
            <LifebuoyIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Help & Support
          </h1>
          <p className="text-gray-600">Quick answers and direct help options</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <ChatBubbleOvalLeftIcon className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Contact Form
              </h2>
            </div>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-3 py-2 text-sm border-b border-gray-200 focus:outline-none focus:border-blue-600"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2 text-sm border-b border-gray-200 focus:outline-none focus:border-blue-600"
              />
              <textarea
                rows={2}
                placeholder="How can we help?"
                className="w-full px-3 py-2 text-sm border-b border-gray-200 focus:outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <ContactOption
              icon={<EnvelopeIcon className="w-5 h-5" />}
              title="Email Support"
              detail="response@yourdomain.com"
              link="mailto:response@yourdomain.com"
            />

            <ContactOption
              icon={<ClockIcon className="w-5 h-5" />}
              title="Support Hours"
              detail="Mon-Fri, 9AM - 5PM IST"
            />

            <ContactOption
              icon={<DocumentTextIcon className="w-5 h-5" />}
              title="Documentation"
              detail="Guides & Tutorials"
              link="/guide"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <FAQItem question="How secure is my transaction data?">
              All data remains in your browser with AES-256 encryption and is
              never transmitted.
            </FAQItem>

            <FAQItem question="Can I analyze multiple statements?">
              Yes, you can upload up to 3 statements at once for combined
              analysis.
            </FAQItem>

            <FAQItem question="How long is my data stored?">
              Data persists in your browser until you manually clear it from
              settings.
            </FAQItem>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/upload"
            className="inline-flex items-center px-5 py-2.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Analysis
          </Link>
        </div>
      </div>
    </div>
  );
}

const ContactOption = ({
  icon,
  title,
  detail,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
  link?: string;
}) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
    <div className="text-blue-600">{icon}</div>
    <div>
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      {link ? (
        <a href={link} className="text-sm text-blue-600 hover:underline">
          {detail}
        </a>
      ) : (
        <p className="text-sm text-gray-600">{detail}</p>
      )}
    </div>
  </div>
);

const FAQItem = ({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) => (
  <div className="group border-b border-gray-100 pb-4 last:border-0">
    <h3 className="text-sm font-medium text-gray-900 mb-1">{question}</h3>
    <p className="text-sm text-gray-600">{children}</p>
  </div>
);
