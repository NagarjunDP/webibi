"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinaryUpload";
import { toast } from "sonner";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  disabled?: boolean;
}

export default function ImageUploader({ onUpload, disabled }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onUpload(url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={disabled || uploading}
      />
      <Button
        type="button"
        variant="outline"
        disabled={disabled || uploading}
        onClick={() => fileInputRef.current?.click()}
        className="w-full border-dashed"
      >
        {uploading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <UploadCloud className="mr-2 h-4 w-4" />
        )}
        {uploading ? "Uploading..." : "Upload Image"}
      </Button>
    </div>
  );
}
