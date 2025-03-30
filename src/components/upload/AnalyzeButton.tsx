import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/outline";

type AnalyzeButtonProps = {
  disabled: boolean;
  onClick: () => void;
  className?: string;
};

export const AnalyzeButton = ({
  disabled,
  onClick,
  className = "",
}: AnalyzeButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    disabled={disabled}
    className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium
      text-base sm:text-lg transition-all ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
      } ${className}`}
    onClick={onClick}
  >
    <SparklesIcon className="w-5 h-5 inline-block mr-2" />
    Analyze Now
  </motion.button>
);
