import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

interface FileUploaderProps {
  onChange: (files: File[]) => void;  // Define the prop for handling file changes
}

export function FileUploader({ onChange }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    onChange(uploadedFiles);  // Call the onChange prop to pass the files back to the parent component
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-32 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} /> {/* Make sure FileUpload component accepts onChange */}
    </div>
  );
}
