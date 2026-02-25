"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/config";
import { collection, query, where, onSnapshot, doc, limit } from "firebase/firestore";
import { Client } from "@/types";
import { useAuth } from "@/context/AuthContext";

export function useClientData(slug?: string) {
    const { user } = useAuth();
    const [clientData, setClientData] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let unsubscribe: (() => void) | null = null;

        const fetchData = () => {
            setLoading(true);

            if (slug) {
                // Fetch by slug (public website or preview)
                const q = query(collection(db, "clients"), where("slug", "==", slug), limit(1));
                unsubscribe = onSnapshot(q, (snapshot) => {
                    if (!snapshot.empty) {
                        const docSnap = snapshot.docs[0];
                        setClientData({ id: docSnap.id, ...docSnap.data() } as Client);
                    } else {
                        setClientData(null);
                        setError("Client not found.");
                    }
                    setLoading(false);
                }, (err) => {
                    console.error("Snapshot error:", err);
                    setError(err.message);
                    setLoading(false);
                });
            } else if (user?.clientId) {
                // Fetch by logged-in user's clientId (dashboard)
                const docRef = doc(db, "clients", user.clientId);
                unsubscribe = onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setClientData({ id: docSnap.id, ...docSnap.data() } as Client);
                    } else {
                        setClientData(null);
                    }
                    setLoading(false);
                }, (err) => {
                    console.error("Snapshot error:", err);
                    setError(err.message);
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        };

        // Only fetch if slug is present OR user is loaded
        if (slug || (user !== undefined)) {
            fetchData();
        }

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [slug, user?.clientId, user]);

    return { clientData, loading, error };
}
