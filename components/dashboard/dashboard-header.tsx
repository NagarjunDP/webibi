"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ExternalLink, Save, User as UserIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
    businessName: string;
    onSave?: () => void;
    isSaving?: boolean;
    hasChanges?: boolean;
}

export function DashboardHeader({ businessName, onSave, isSaving, hasChanges }: DashboardHeaderProps) {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-40 w-full h-[72px] bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 flex items-center px-6 md:px-8 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold text-lg">
                    {businessName.charAt(0).toUpperCase() || "B"}
                </div>
                <div>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                        {businessName || "My Business"}
                    </h1>
                    <span className="text-xs text-muted-foreground">Portfolio Builder</span>
                </div>
            </div>

            <div className="ml-auto flex items-center gap-4">
                <Button variant="outline" size="sm" className="hidden md:flex">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Preview
                </Button>

                <Button
                    onClick={onSave}
                    disabled={!hasChanges || isSaving}
                    variant={hasChanges ? "default" : "secondary"}
                    className="min-w-[100px]"
                >
                    {isSaving ? "Saving..." : hasChanges ? "Save Changes" : "Saved"}
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <span className="sr-only">Toggle user menu</span>
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center">
                                <UserIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">{user?.email}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
