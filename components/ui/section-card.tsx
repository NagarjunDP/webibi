import React from 'react';
import { cn } from "@/lib/utils";

interface SectionCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
    action?: React.ReactNode;
}

export function SectionCard({ title, description, children, className, action }: SectionCardProps) {
    return (
        <div className={cn(
            "bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow",
            className
        )}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {description}
                        </p>
                    )}
                </div>
                {action && <div>{action}</div>}
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}
