import {
  ArrowUpTrayIcon,
  DocumentTextIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

type DropzoneProps = {
  isDragActive: boolean;
  error: string | null;
  files: File[];
  getRootProps: any;
  getInputProps: any;
  maxFiles?: number;
};

export const Dropzone = ({
  isDragActive,
  error,
  files,
  getRootProps,
  getInputProps,
  maxFiles = 3,
}: DropzoneProps) => (
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
          {error ||
            (files.length > 0
              ? `${files.length} of ${maxFiles} files selected`
              : "Drag statements here")}
        </p>
        <p className="text-sm text-gray-500 sm:text-base">
          {files.length > 0 ? "or drop more files" : "or click to select files"}
        </p>
      </div>

      {files.length === 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-4 h-4 text-blue-500" />
            PDF/CSV files (max {maxFiles})
          </div>
          <div className="flex items-center gap-2">
            <LockClosedIcon className="w-4 h-4 text-green-500" />
            Local processing
          </div>
        </div>
      )}
    </div>
  </div>
);
