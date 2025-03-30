import { motion } from "framer-motion";

type ProgressBarProps = {
  progress: number;
  className?: string;
};

export const ProgressBar = ({ progress, className = "" }: ProgressBarProps) => (
  <div className={className}>
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
  </div>
);
