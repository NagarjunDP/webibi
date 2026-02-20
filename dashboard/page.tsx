"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Client } from "@/types";
import { Globe, Briefcase, ImageIcon, MessageSquare, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardOverview() {
    const { user } = useAuth();
    const [clientData, setClientData] = useState<Client | null>(null);
    const [stats, setStats] = useState({
        services: 0,
        images: 0,
        leads: 0,
        status: "Draft"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.clientId) {
            const fetchData = async () => {
                try {
                    const clientRef = doc(db, "clients", user.clientId);
                    const clientSnap = await getDoc(clientRef);

                    if (clientSnap.exists()) {
                        const data = clientSnap.data() as Client;
                        setClientData(data);

                        // Fetch subcollection counts
                        const servicesSnap = await getDocs(collection(db, "clients", user.clientId, "services"));
                        const leadsSnap = await getDocs(query(collection(db, "clients", user.clientId, "leads"), where("status", "==", "new")));

                        setStats({
                            services: data.services?.length || servicesSnap.size || 0,
                            images: data.gallery?.length || 0,
                            leads: leadsSnap.size,
                            status: data.status === "live" ? "Live" : "Draft"
                        });
                    }
                } catch (error: any) {
                    console.error("[Dashboard] Fetch error:", error);
                    // Silent fail for stats, but we should know
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) return <div className="p-8 text-center text-muted-foreground">Loading your dashboard...</div>;

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome back!</h2>
                    <p className="text-muted-foreground mt-1 text-lg">
                        Here's what's happening with {clientData?.businessName || "your business"}.
                    </p>
                </div>
                <Link href="/dashboard/content">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none h-14 px-8 text-lg font-bold gap-2">
                        Edit My Website <ArrowRight className="w-5 h-5" />
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Website Status"
                    value={stats.status}
                    icon={Globe}
                    color={stats.status === "Live" ? "text-green-600 bg-green-50" : "text-amber-600 bg-amber-50"}
                />
                <StatCard
                    label="Total Services"
                    value={stats.services.toString()}
                    icon={Briefcase}
                    color="text-blue-600 bg-blue-50"
                />
                <StatCard
                    label="Total Images"
                    value={stats.images.toString()}
                    icon={ImageIcon}
                    color="text-purple-600 bg-purple-50"
                />
                <StatCard
                    label="New Leads"
                    value={stats.leads.toString()}
                    icon={MessageSquare}
                    color="text-rose-600 bg-rose-50"
                />
            </div>

            <Card className="border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">Last Updated</span>
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white">
                            {clientData?.updatedAt?.toDate ? new Date(clientData.updatedAt.toDate()).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Today'}
                        </span>
                    </div>
                </CardContent>
            </Card>

            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/20">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">Need help?</h3>
                <p className="text-blue-700 dark:text-blue-300 mb-6">If you need assistance with your website, our support team is just a click away.</p>
                <Link href="/dashboard/support">
                    <Button variant="outline" className="border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        Contact Support
                    </Button>
                </Link>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <h4 className="text-2xl font-black mt-1">{value}</h4>
        </div>
    );
}
