"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import {
  ArrowUpTrayIcon,
  DocumentTextIcon,
  LockClosedIcon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const handleAnalyze = () => {
    if (!file) return;
    setIsAnalyzing(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        router.push("/overview");
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, router]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-8 sm:mb-12 space-y-3">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Digital Payment Insights
            </h1>
            <p className="text-lg text-gray-600 sm:text-xl">
              Secure analysis of your UPI transactions from PhonePe, GPay, and
              Paytm
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
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
              <div className="space-y-4">
                <div className="flex justify-center">
                  <ArrowUpTrayIcon className="w-10 h-10 text-blue-500 sm:w-12 sm:h-12" />
                </div>

                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900 sm:text-xl">
                    {error || (file ? file.name : "Drag statement here")}
                  </p>
                  <p className="text-sm text-gray-500 sm:text-base">
                    {file ? "or drop another file" : "or click to select file"}
                  </p>
                </div>

                {!file && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <DocumentTextIcon className="w-4 h-4 text-blue-500" />
                      PDF/CSV files
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
                className="mt-4 bg-gray-50 rounded-lg p-3 mx-4 sm:mx-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <DocumentTextIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-medium text-sm break-words whitespace-normal">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="p-1 hover:bg-gray-100 rounded-full flex-shrink-0"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </motion.div>
            )}

            <div className="mt-6">
              {isAnalyzing ? (
                <>
                  <div className="bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      className="bg-blue-600 h-2.5 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Analyzing... {progress}% complete
                  </p>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!file}
                  className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium
                    text-base sm:text-lg transition-all ${
                      !file
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    }`}
                  onClick={handleAnalyze}
                >
                  <SparklesIcon className="w-5 h-5 inline-block mr-2" />
                  Analyze Now
                </motion.button>
              )}
            </div>

            <p className="mt-6 text-sm text-gray-500">
              Your data remains private.{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Learn how it works
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
