import { motion } from "framer-motion";
import { DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline";

type FilePreviewProps = {
  files: File[];
  onRemove: (index: number) => void;
  className?: string;
};

export const FilePreview = ({
  files,
  onRemove,
  className = "",
}: FilePreviewProps) => (
  <div className={`space-y-2 ${className}`}>
    {files.map((file, index) => (
      <motion.div
        key={file.name + index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-50 rounded-lg p-3"
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
            onClick={() => onRemove(index)}
            className="p-1 hover:bg-gray-100 rounded-full flex-shrink-0"
          >
            <XMarkIcon className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);
