"use client";

import {
  ScaleIcon,
  ClipboardIcon,
  UserIcon,
  NoSymbolIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
            <ScaleIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Terms of Service
          </h1>
          <p className="text-gray-600">
            Effective from {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <SectionHeader
            icon={<ClipboardIcon className="w-5 h-5" />}
            title="Acceptance of Terms"
          >
            <p className="text-gray-600">
              By using our service, you agree to these terms. We reserve the
              right to modify these terms at any time.
            </p>
          </SectionHeader>

          <SectionHeader
            icon={<UserIcon className="w-5 h-5" />}
            title="User Responsibilities"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <TermItem title="Account Security">
                Maintain confidentiality of your credentials
              </TermItem>
              <TermItem title="Data Accuracy">
                Ensure uploaded information is correct
              </TermItem>
              <TermItem title="Legal Compliance">
                Use service in accordance with all laws
              </TermItem>
              <TermItem title="Content Ownership">
                You retain rights to uploaded data
              </TermItem>
            </div>
          </SectionHeader>

          <SectionHeader
            icon={<NoSymbolIcon className="w-5 h-5" />}
            title="Prohibited Uses"
          >
            <div className="space-y-2 text-gray-600">
              <p>
                • Reverse engineering or scraping
                <br />
                • Fraudulent or illegal activities
                <br />
                • Distribution of malicious content
                <br />• Automated bulk operations
              </p>
            </div>
          </SectionHeader>

          <SectionHeader
            icon={<ShieldExclamationIcon className="w-5 h-5" />}
            title="Limitation of Liability"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <TermItem title="Service Availability">
                No guarantee of 100% uptime
              </TermItem>
              <TermItem title="Data Loss">
                Not responsible for browser storage limitations
              </TermItem>
              <TermItem title="Third Parties">
                No control over external payment services
              </TermItem>
              <TermItem title="Accuracy">
                Analysis results are estimates only
              </TermItem>
            </div>
          </SectionHeader>

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
                ← Return to Secure Upload
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const SectionHeader = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <div className="text-blue-600">{icon}</div>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="space-y-4 pl-8">{children}</div>
  </div>
);

const TermItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="p-4 bg-white border border-gray-200 rounded-lg">
    <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
    <p className="text-gray-600 text-sm">{children}</p>
  </div>
);
