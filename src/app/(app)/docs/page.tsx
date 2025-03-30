"use client";

import {
  CodeBracketIcon,
  LockClosedIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <CodeBracketIcon className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              UPI Analyzer Docs
            </h1>
          </div>
          <p className="text-gray-600 mb-4">
            Open-source financial analysis with local processing
          </p>
          <a
            href="https://github.com/yourusername/upi-analyzer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            <GithubIcon className="w-4 h-4 mr-1" />
            View Source Code
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <LockClosedIcon className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-gray-900">Security</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• AES-256 browser encryption</li>
              <li>• No cloud storage</li>
              <li>• Automatic file cleanup</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <CpuChipIcon className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-gray-900">Tech Stack</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Next.js 14</li>
              <li>• WebAssembly analysis</li>
              <li>• IndexedDB storage</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Data Lifecycle
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
            <div className="flex-1">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                1
              </div>
              <p className="text-sm text-gray-600">Upload PDF/CSV</p>
            </div>
            <div className="h-px w-16 bg-gray-200 md:w-auto md:h-1" />
            <div className="flex-1">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                2
              </div>
              <p className="text-sm text-gray-600">Local Processing</p>
            </div>
            <div className="h-px w-16 bg-gray-200 md:w-auto md:h-1" />
            <div className="flex-1">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                3
              </div>
              <p className="text-sm text-gray-600">Store Results</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Getting Started
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-600">•</div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Upload Files
                </p>
                <p className="text-sm text-gray-600">
                  Supported formats: PDF, CSV (max 3 files)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-blue-600">•</div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  View Analysis
                </p>
                <p className="text-sm text-gray-600">
                  Interactive charts and spending patterns
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Contribute
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                For Developers
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Fork GitHub repository</li>
                <li>• Submit pull requests</li>
                <li>• Write test cases</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">
                For Users
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Report issues</li>
                <li>• Suggest features</li>
                <li>• Share feedback</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/upload"
            className="inline-flex items-center px-5 py-2.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Start Analyzing
          </Link>
        </div>
      </div>
    </div>
  );
}
