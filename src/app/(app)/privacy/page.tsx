"use client";

import {
  LockClosedIcon,
  DocumentTextIcon,
  CpuChipIcon,
  TrashIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4"
          >
            <LockClosedIcon className="w-6 h-6 text-blue-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Privacy Protection
          </h1>
          <p className="text-gray-600">
            Your data remains yours - always secure, always private
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <PrivacyFeature
            icon={<DocumentTextIcon className="w-5 h-5" />}
            title="Data Collection"
            items={[
              "Transaction amounts & dates",
              "Merchant references",
              "Payment status",
            ]}
          />

          <PrivacyFeature
            icon={<ShieldCheckIcon className="w-5 h-5" />}
            title="Storage Policy"
            items={[
              "Browser-only storage",
              "JSON analysis results",
              "User-controlled retention",
            ]}
          />

          <PrivacyFeature
            icon={<CpuChipIcon className="w-5 h-5" />}
            title="Processing"
            items={[
              "Local Web Workers",
              "Original files deleted",
              "In-memory analysis",
            ]}
          />
        </div>

        {/* Data Lifecycle */}
        <div className="bg-gray-50 p-6 rounded-xl mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Data Lifecycle
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <FlowStep icon="📤" title="Upload" />
            <Divider />
            <FlowStep icon="🔒" title="Encrypt" />
            <Divider />
            <FlowStep icon="🔄" title="Process" />
            <Divider />
            <FlowStep icon="🗄️" title="Store" />
          </div>
        </div>

        {/* User Control Section */}
        <div className="bg-blue-50 p-6 rounded-xl mb-12">
          <div className="flex items-center gap-4 mb-4">
            <TrashIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Data Control
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ControlItem
              title="Manual Deletion"
              content="Clear all data anytime from settings"
            />
            <ControlItem
              title="Automatic Cleanup"
              content="Original files deleted post-processing"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const PrivacyFeature = ({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) => (
  <motion.div
    className="p-4 bg-white border border-gray-200 rounded-lg"
    whileHover={{ y: -4 }}
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="text-blue-600">{icon}</div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-600 flex items-start gap-2">
          <span className="text-blue-600">•</span>
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const FlowStep = ({ icon, title }: { icon: string; title: string }) => (
  <div className="text-center flex-1">
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-sm font-medium text-gray-900">{title}</div>
  </div>
);

const Divider = () => (
  <div className="h-px bg-gray-200 w-16 md:w-auto md:h-1 flex-1" />
);

const ControlItem = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <div className="p-3 bg-white rounded-lg">
    <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
    <p className="text-gray-600 text-sm">{content}</p>
  </div>
);
