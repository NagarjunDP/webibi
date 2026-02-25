"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MultiImageUploadProps {
    onUploadFiles: (files: File[]) => Promise<void>;
    label?: string;
    className?: string;
}

export function MultiImageUpload({ onUploadFiles, label, className }: MultiImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        if (files.length > 0) await processUpload(files);
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            await processUpload(files);
        }
    };

    const processUpload = async (files: File[]) => {
        try {
            setIsUploading(true);
            await onUploadFiles(files);
            // Reset input
            if (inputRef.current) inputRef.current.value = "";
        } catch (error) {
            console.error("Batch upload failed", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={cn("space-y-3", className)}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}

            <div
                onClick={() => !isUploading && inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl transition-all group",
                    isUploading ? "cursor-not-allowed opacity-70" : "cursor-pointer",
                    isDragging
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-300 dark:border-zinc-700 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                )}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                />

                {isUploading ? (
                    <div className="flex flex-col items-center text-blue-500">
                        <Loader2 className="w-10 h-10 animate-spin mb-3" />
                        <p className="text-sm font-medium">Uploading images...</p>
                    </div>
                ) : (
                    <>
                        <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 mb-3 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Click to upload multiple images or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            PNG, JPG up to 10MB each
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
