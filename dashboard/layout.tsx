"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Image as ImageIcon,
    Briefcase,
    Settings,
    LogOut,
    ExternalLink,
    Search,
    FileText,
    Tag,
    MessageSquare,
    BarChart3,
    LifeBuoy,
    Users
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { useClientData } from "@/hooks/useClientData";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const { clientData, loading: clientLoading } = useClientData();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        } else if (user?.role === "admin") {
            router.push("/admin");
        }
    }, [user, loading, router]);

    if (loading || clientLoading || !user) {
        return <div className="h-screen w-full flex items-center justify-center">Loading Webibi Dashboard...</div>;
    }

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Website", href: "/dashboard/content", icon: FileText },
        { name: "Services", href: "/dashboard/services", icon: Briefcase },
        { name: "Gallery", href: "/dashboard/gallery", icon: ImageIcon },
        { name: "Leads", href: "/dashboard/leads", icon: MessageSquare },
        { name: "Google Search Settings", href: "/dashboard/seo", icon: Search },
        { name: "Business Info", href: "/dashboard/business-info", icon: Tag },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
        { name: "Help", href: "/dashboard/support", icon: LifeBuoy },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col">
            <DashboardHeader
                businessName={clientData?.businessName || "My Business"}
            />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 hidden md:flex flex-col">
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href}>
                                <Button variant="ghost" className="w-full justify-start text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                    <item.icon className="mr-3 h-5 w-5" /> {item.name}
                                </Button>
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
                        {clientData?.slug && (
                            <div className="mb-4 px-2">
                                <p className="text-xs font-medium text-muted-foreground">Live Website:</p>
                                <a
                                    href={`/${clientData.slug}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-1 truncate"
                                >
                                    /{clientData.slug} <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        )}
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => logout()}
                        >
                            <LogOut className="mr-3 h-5 w-5" /> Logout
                        </Button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-gray-50 dark:bg-zinc-950">
                    {!user.clientId ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to Webibi!</h2>
                            <p className="text-muted-foreground max-w-md">
                                Your account has been created. Please contact an administrator to link your account to a client portfolio.
                            </p>
                            <div className="mt-4 p-4 bg-white dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 shadow-sm">
                                <p className="text-xs text-muted-foreground mb-1">Your User Email</p>
                                <code className="text-sm font-mono font-medium text-blue-600 dark:text-blue-400 select-all">
                                    {user.email}
                                </code>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-5xl mx-auto space-y-8">
                            {children}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
