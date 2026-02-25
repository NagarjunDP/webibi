"use client";

import { Save, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StickySaveBarProps {
    hasChanges: boolean;
    isSaving: boolean;
    onSave: () => void;
    className?: string;
}

export function StickySaveBar({ hasChanges, isSaving, onSave, className }: StickySaveBarProps) {
    return (
        <div className={cn("fixed bottom-6 right-6 z-50", className)}>
            <button
                onClick={onSave}
                disabled={!hasChanges || isSaving}
                className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-lg transition-all transform",
                    hasChanges
                        ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
                        : "bg-gray-100 dark:bg-zinc-800 text-gray-400 border border-gray-200 dark:border-zinc-700 cursor-not-allowed scale-95",
                    isSaving && "opacity-80 cursor-wait bg-blue-600 text-white"
                )}
            >
                {isSaving ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving...
                    </>
                ) : hasChanges ? (
                    <>
                        <Save className="w-5 h-5" />
                        Save Changes
                    </>
                ) : (
                    <>
                        <Check className="w-5 h-5" />
                        All Saved
                    </>
                )}
            </button>
        </div>
    );
}
