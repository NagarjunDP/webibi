"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Client } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PlusCircle, Users, ExternalLink, Trash2, Globe, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "clients"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Client[];
            setClients(items);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleDeleteClient = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete ${name}? This will remove all their website data.`)) return;
        try {
            await deleteDoc(doc(db, "clients", id));
            toast.success("Client deleted successfully");
        } catch (error) {
            toast.error("Failed to delete client");
        }
    };

    if (loading) return <div className="p-8">Loading admin data...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h2>
                    <p className="text-muted-foreground">Monitor and manage all Webibi client websites.</p>
                </div>
                <Link href="/admin/create-client">
                    <Button className="gap-2">
                        <PlusCircle className="h-4 w-4" /> Create New Client
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{clients.length}</div>
                        <p className="text-xs text-muted-foreground">Active subscriptions</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Live Websites</CardTitle>
                        <Globe className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{clients.filter(c => c.status === 'live').length}</div>
                        <p className="text-xs text-muted-foreground">Publicly accessible</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold">Client List</h3>
                <div className="grid gap-4">
                    {clients.map((client) => (
                        <Card key={client.id} className="overflow-hidden">
                            <CardContent className="p-0">
                                <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                                            {client.logoUrl ? (
                                                <img src={client.logoUrl} className="w-full h-full object-contain" />
                                            ) : (
                                                client.businessName?.substring(0, 2).toUpperCase() || "NB"
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{client.businessName || "Unnamed Business"}</h4>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Globe className="w-3 h-3" />
                                                /{client.slug}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3">
                                        <Badge variant={client.status === 'live' ? 'default' : 'secondary'}>
                                            {(client.status || 'draft').toUpperCase()}
                                        </Badge>
                                        <div className="text-sm text-slate-500">
                                            {client.ownerEmail}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={`/${client.slug}`} target="_blank" rel="noreferrer">
                                                <ExternalLink className="w-4 h-4 mr-1" /> View Site
                                            </a>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:bg-red-50"
                                            onClick={() => handleDeleteClient(client.id, client.businessName)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {clients.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
                            <p className="text-muted-foreground">No clients found. Onboard your first client!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Badge({ children, variant = "default" }: { children: React.ReactNode, variant?: "default" | "secondary" }) {
    return (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${variant === "default" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
            }`}>
            {children}
        </span>
    );
}
