"use client";

import {
  LockClosedIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
            <LockClosedIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Transaction Security
          </h1>
          <p className="text-gray-600">
            Military-grade protection with persistent local storage
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <FeatureItem
            icon={<ShieldCheckIcon className="w-5 h-5" />}
            title="End-to-End Encryption"
            content="AES-256 encryption during processing using Web Crypto API"
          />
          <FeatureItem
            icon={<CpuChipIcon className="w-5 h-5" />}
            title="Local Processing"
            content="Data never leaves your browser - analyzed in memory"
          />
          <FeatureItem
            icon={<DocumentTextIcon className="w-5 h-5" />}
            title="Secure Storage"
            content="Original files deleted post-processing, analysis data stored in IndexedDB"
          />
          <FeatureItem
            icon={<LockClosedIcon className="w-5 h-5" />}
            title="User Control"
            content="Persistent storage until manual clearance by user"
          />
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Data Lifecycle
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <FlowStep number="1" title="Upload" />
            <Divider />
            <FlowStep number="2" title="Encrypt" />
            <Divider />
            <FlowStep number="3" title="Process" />
            <Divider />
            <FlowStep number="4" title="Store" />
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Technical Specifications
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SpecBox title="Encryption Standard" value="AES-256-GCM" />
            <SpecBox title="Data Format" value="JSON analysis results" />
            <SpecBox title="Storage" value="Persistent IndexedDB" />
          </div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mt-12">
            <Link
              href="/upload"
              className="inline-flex items-center px-5 py-2.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Start Secure Analysis
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const FeatureItem = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="text-blue-600">{icon}</div>
    <div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{content}</p>
    </div>
  </div>
);

const FlowStep = ({ number, title }: { number: string; title: string }) => (
  <div className="text-center flex-1">
    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2">
      {number}
    </div>
    <div className="text-sm font-medium text-gray-900">{title}</div>
  </div>
);

const Divider = () => (
  <div className="h-px bg-gray-200 w-16 md:w-auto md:h-1 flex-1" />
);

const SpecBox = ({ title, value }: { title: string; value: string }) => (
  <div className="p-4 bg-white border border-gray-200 rounded-lg">
    <div className="text-sm text-gray-600 mb-1">{title}</div>
    <div className="font-medium text-gray-900">{value}</div>
  </div>
);
