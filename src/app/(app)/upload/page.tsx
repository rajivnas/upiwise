"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useFileHandling } from "@/components/upload/useFileHandling";
import { Dropzone } from "@/components/upload/Dropzone";
import { FilePreview } from "@/components/upload/FilePreview";
import { ProgressBar } from "@/components/upload/ProgressBar";
import { AnalyzeButton } from "@/components/upload/AnalyzeButton";
import { PrivacyNotice } from "@/components/upload/PrivacyNotice";

export default function UploadPage() {
  const router = useRouter();
  const { files, error, removeFile, ...dropzone } = useFileHandling();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnalyze = () => {
    if (files.length === 0) return;
    setIsAnalyzing(true);
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
    }, 300);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => router.push("/overview"), 800);
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Digital Payment Insights
            </h1>
            <p className="text-gray-600 mt-1">
              Secure analysis of your UPI transactions from PhonePe, GPay, and
              Paytm
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xs p-4 sm:p-6 border border-gray-100">
            <Dropzone {...dropzone} error={error} files={files} maxFiles={3} />

            {files.length > 0 && (
              <FilePreview
                files={files}
                onRemove={removeFile}
                className="mt-4"
              />
            )}

            <div className="mt-6">
              {isAnalyzing ? (
                <ProgressBar progress={progress} />
              ) : (
                <AnalyzeButton
                  disabled={files.length === 0}
                  onClick={handleAnalyze}
                />
              )}
            </div>

            <PrivacyNotice className="mt-6" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
