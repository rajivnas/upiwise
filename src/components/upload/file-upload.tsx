"use client";

import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import {
  ArrowUpTrayIcon,
  DocumentTextIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const truncateMiddle = (str: string, maxLength = 24) => {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength / 2)}...${str.slice(-maxLength / 2)}`;
};

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit");
      return;
    }
    setFile(selectedFile);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"], "text/csv": [".csv"] },
    multiple: false,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              UPI Statement Analysis
            </h1>
            <p className="text-gray-500 text-lg">
              Get insights from PhonePe, GPay, and Paytm transactions
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <div
              {...getRootProps()}
              className={`group border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors
                ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-400"
                }
                ${error ? "border-red-500 bg-red-50" : ""}`}
            >
              <input {...getInputProps()} />
              <div className="grid gap-4 justify-items-center">
                <ArrowUpTrayIcon className="w-12 h-12 text-blue-500" />

                <div className="w-full grid gap-2 text-center">
                  <p className="text-lg font-medium text-gray-900 px-4 overflow-hidden">
                    <span className="inline-block max-w-full truncate">
                      {error ||
                        (file
                          ? truncateMiddle(file.name)
                          : "Drag statement here")}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {file ? "0.49 MB" : "PDF/CSV up to 10MB"}
                  </p>
                </div>

                {!file && (
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <DocumentTextIcon className="w-4 h-4 text-blue-500" />
                      Supported formats
                    </div>
                    <div className="flex items-center gap-2">
                      <LockClosedIcon className="w-4 h-4 text-green-500" />
                      Local processing
                    </div>
                  </div>
                )}
              </div>
            </div>

            {file && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 bg-gray-50 rounded-lg p-4 grid grid-cols-[auto_1fr_auto] items-center gap-3"
              >
                <DocumentTextIcon className="w-6 h-6 text-blue-500" />
                <div className="min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-400" />
                </button>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!file}
              className={`mt-6 w-full bg-blue-600 text-white py-3.5 rounded-lg font-medium
                text-lg transition-colors ${
                  !file ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
            >
              Analyze Statement
            </motion.button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Need help exporting?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              View guide
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
