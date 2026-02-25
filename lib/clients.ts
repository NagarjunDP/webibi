import { db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { Client } from "@/types";
import { cache } from 'react';

// Use React cache to dedup requests
export const getClientData = cache(async (clientId: string): Promise<Client | null> => {
    try {
        // In a real production build with Admin SDK, we might fetch differently
        // But for this hybrid approach, we use the client SDK or Admin SDK if available server-side
        // Since this runs on the server (ISR), we should ideally use Admin SDK to avoid auth rules issues if we locked it down
        // But our rules allowed public read for clients/{clientId}

        const docRef = doc(db, "clients", clientId);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
            return { id: snap.id, ...snap.data() } as Client;
        }
        return null;
    } catch (error) {
        console.error("Error fetching client data:", error);
        return null;
    }
});

// For ISR revalidation
export const revalidate = 60; // Default 60 seconds
