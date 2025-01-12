"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("Upload response:", res);
        if (res && res.length > 0) {
          onChange(res[0].url);
        } else {
          onChange();
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error.message}`);
        console.error("Error uploading file:", error);
        console.error("Error details:", error.stack);
      }}
    />
  );
}