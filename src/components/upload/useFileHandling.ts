"use client";

import { useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";

type UseFileHandlingProps = {
  maxSizeMB?: number;
  maxFiles?: number;
};

export const useFileHandling = ({
  maxSizeMB = 10,
  maxFiles = 3, // Set default max files to 3
}: UseFileHandlingProps = {}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setError(null);

    // Check for duplicates
    const newFiles = acceptedFiles.filter(
      (newFile) =>
        !files.some(
          (existingFile) =>
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size
        )
    );

    // Check for maximum files
    if (files.length + newFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Check file size
    const validFiles = newFiles.filter(
      (file) => file.size <= maxSizeMB * 1024 * 1024
    );

    // Handle rejected files
    if (fileRejections.length > 0) {
      setError(fileRejections[0].errors[0].message);
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const dropzone = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"], "text/csv": [".csv"] },
    multiple: true,
    maxFiles: maxFiles,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return { ...dropzone, files, error, setFiles, removeFile };
};
