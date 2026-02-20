"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import ServiceManager from "@/components/dashboard/ServiceManager";
import { Client } from "@/types";

export default function ServicesPage() {
    const { user } = useAuth();
    const [clientData, setClientData] = useState<Client | null>(null);

    useEffect(() => {
        if (user?.clientId) {
            const unsub = onSnapshot(doc(db, "clients", user.clientId), (doc) => {
                if (doc.exists()) {
                    setClientData(doc.data() as Client);
                }
            });
            return () => unsub();
        }
    }, [user]);

    if (!clientData) return <div>Loading data...</div>;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Services Management</h2>
                <p className="text-muted-foreground">Sort, add, or edit the services displayed on your website.</p>
            </div>

            <ServiceManager clientId={user!.clientId} initialServices={clientData.services || []} />
        </div>
    );
}
