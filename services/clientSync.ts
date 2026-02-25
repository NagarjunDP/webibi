import { db } from "@/lib/firebase/config";
import { doc, getDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
import { Client } from "@/types";

/**
 * Fetches a client document by its unique slug.
 */
export const getClientBySlug = async (slug: string): Promise<Client | null> => {
    try {
        const clientsRef = collection(db, "clients");
        const q = query(clientsRef, where("slug", "==", slug), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            return { id: docSnap.id, ...docSnap.data() } as Client;
        }
        return null;
    } catch (error) {
        console.error("[ClientSync] Error fetching client by slug:", error);
        return null;
    }
};

/**
 * Loads client data by document ID.
 */
export const loadClientData = async (clientId: string): Promise<Client | null> => {
    try {
        const docRef = doc(db, "clients", clientId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Client;
        }
        return null;
    } catch (error) {
        console.error("[ClientSync] Error loading client data:", error);
        return null;
    }
};
