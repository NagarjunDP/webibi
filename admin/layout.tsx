"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/"); // Redirect to login/home
            } else if (user.role !== "admin") {
                router.push("/dashboard"); // Redirect to client dashboard
            }
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user || user.role !== "admin") return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
            <header className="bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <h1 className="text-xl font-bold">Webibi Admin</h1>
                        <nav className="flex gap-4">
                            <Link href="/admin" className="text-sm font-medium hover:text-primary">
                                Dashboard
                            </Link>
                            <Link href="/admin/create-client" className="text-sm font-medium hover:text-primary">
                                Create Client
                            </Link>
                        </nav>
                    </div>
                    <div className="text-sm text-gray-500">
                        {user.email}
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
