import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload"; 
import { toast } from "react-toastify"; 

interface FileUploaderProps {
  onChange: (files: File[]) => void; 
}

const MAX_VIDEO_SIZE_MB = 100;
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;

export function FileUploader({ onChange }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (uploadedFiles: File[]) => {
    const oversizedFiles = uploadedFiles.filter(file => file.size > MAX_VIDEO_SIZE_BYTES);
    
    if (oversizedFiles.length > 0) {
      toast.error(`One or more files exceed the ${MAX_VIDEO_SIZE_MB} MB limit.`);
      return; 
    }

    setFiles(uploadedFiles);
    onChange(uploadedFiles);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-32 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} /> 
    </div>
  );
}
