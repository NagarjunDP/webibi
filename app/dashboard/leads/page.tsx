"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Lead } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, MessageSquare, Phone, Mail, Calendar, CheckCircle2, Clock } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function LeadsPage() {
    const { user } = useAuth();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.clientId) return;

        const leadsRef = collection(db, "clients", user.clientId, "leads");
        const q = query(leadsRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Lead[];
            setLeads(items);
            setLoading(false);
        }, (err) => {
            console.error("Leads listener error:", err);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user?.clientId]);

    const handleUpdateStatus = async (leadId: string, status: Lead['status']) => {
        if (!user?.clientId) return;
        try {
            const leadRef = doc(db, "clients", user.clientId, "leads", leadId);
            await updateDoc(leadRef, { status });
            toast.success(`Lead marked as ${status}`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (leadId: string) => {
        if (!user?.clientId || !confirm("Delete this lead permanently?")) return;
        try {
            const leadRef = doc(db, "clients", user.clientId, "leads", leadId);
            await deleteDoc(leadRef);
            toast.success("Lead deleted");
        } catch (error) {
            toast.error("Failed to delete lead");
        }
    };

    if (loading) return <div className="p-8 text-center text-muted-foreground">Loading leads...</div>;

    return (
        <div className="space-y-6 max-w-6xl mx-auto pb-24">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Leads / Enquiries</h2>
                <p className="text-muted-foreground mt-1 text-lg">Manage inquiries received through your website contact forms.</p>
            </div>

            {leads.length === 0 ? (
                <div className="py-20 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No Leads Yet</h3>
                    <p className="text-muted-foreground">Once customers fill out your contact form, they will appear here.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {leads.map((lead) => (
                        <Card key={lead.id} className="overflow-hidden border-gray-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row items-stretch md:items-center">
                                    <div className={`w-2 md:w-3 border-r ${lead.status === 'new' ? 'bg-blue-500' : lead.status === 'contacted' ? 'bg-yellow-500' : 'bg-green-500'
                                        }`} />
                                    <div className="flex-1 p-6 grid md:grid-cols-4 gap-6 items-center">
                                        <div className="space-y-1">
                                            <h4 className="font-bold text-lg">{lead.name}</h4>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Calendar className="w-3 h-3" />
                                                {lead.createdAt?.toDate ? format(lead.createdAt.toDate(), 'PPP p') : "Just now"}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Phone className="w-4 h-4 text-muted-foreground" />
                                                <a href={`tel:${lead.phone}`} className="hover:text-blue-600 transition-colors">{lead.phone}</a>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Mail className="w-4 h-4 text-muted-foreground" />
                                                <a href={`mailto:${lead.email}`} className="hover:text-blue-600 transition-colors truncate">{lead.email}</a>
                                            </div>
                                        </div>

                                        <div className="md:col-span-1">
                                            <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 italic">
                                                "{lead.message}"
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-end gap-2">
                                            {lead.status !== 'resolved' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="gap-2"
                                                    onClick={() => handleUpdateStatus(lead.id, lead.status === 'new' ? 'contacted' : 'resolved')}
                                                >
                                                    {lead.status === 'new' ? <CheckCircle2 className="w-4 h-4 text-yellow-500" /> : <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                                    Mark {lead.status === 'new' ? 'Contacted' : 'Resolved'}
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => handleDelete(lead.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
