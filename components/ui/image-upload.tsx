"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
// Note: We'll assume a utility function for upload exists or implement a basic one later.
// For now, this is the UI component.

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
    // Simple mock upload for now, or real if service provided
    onUploadFile?: (file: File) => Promise<string>;
}

export function ImageUpload({ value, onChange, label, className, onUploadFile }: ImageUploadProps) {
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
        const file = e.dataTransfer.files?.[0];
        if (file) await processUpload(file);
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) await processUpload(file);
    };

    const processUpload = async (file: File) => {
        if (!onUploadFile) {
            // Mock upload behavior if no handler provided (for UI testing)
            const reader = new FileReader();
            reader.onload = (e) => onChange(e.target?.result as string);
            reader.readAsDataURL(file);
            return;
        }

        try {
            setIsUploading(true);
            const url = await onUploadFile(file);
            onChange(url);
        } catch (error) {
            console.error("Upload failed", error);
            // Handle error state (toast)
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange("");
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className={cn("space-y-3", className)}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}

            {!value ? (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all group",
                        isDragging
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-300 dark:border-zinc-700 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                    )}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileSelect}
                    />

                    {isUploading ? (
                        <div className="flex flex-col items-center text-blue-500">
                            <Loader2 className="w-10 h-10 animate-spin mb-3" />
                            <p className="text-sm font-medium">Uploading...</p>
                        </div>
                    ) : (
                        <>
                            <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 mb-3 group-hover:scale-110 transition-transform">
                                <Upload className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                PNG, JPG up to 10MB
                            </p>
                        </>
                    )}
                </div>
            ) : (
                <div className="relative group rounded-xl overflow-hidden h-48 border border-gray-200 dark:border-zinc-800">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                        <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white text-gray-900 shadow-sm"
                            onClick={() => inputRef.current?.click()}
                        >
                            Replace
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            className="shadow-sm"
                            onClick={handleRemove}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
