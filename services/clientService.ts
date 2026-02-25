import { db } from "@/lib/firebase/config";
import { doc, getDoc, setDoc, serverTimestamp, runTransaction, updateDoc } from "firebase/firestore";
import { Client, User } from "@/types";

export interface CreateClientData {
    businessName: string;
    slug: string;
    ownerEmail: string;
}

/**
 * Creates a new client and assigns it to a user.
 */
export const createClient = async (data: CreateClientData) => {
    const slug = data.slug.toLowerCase().replace(/\s+/g, '-');
    const email = data.ownerEmail.toLowerCase();

    try {
        await runTransaction(db, async (transaction) => {
            const userRef = doc(db, "users", email);
            const userSnap = await transaction.get(userRef);

            if (!userSnap.exists()) {
                throw new Error(`User "${email}" must sign up first.`);
            }

            const userData = userSnap.data() as User;
            if (userData.role === 'admin') {
                throw new Error("Cannot assign a client to an admin user.");
            }

            const clientId = `client_${Math.random().toString(36).substr(2, 9)}`;
            const clientRef = doc(db, "clients", clientId);

            const newClientData: Client = {
                id: clientId,
                slug: slug,
                businessName: data.businessName,
                ownerId: userData.uid,
                ownerEmail: email,
                status: 'live',
                heroImages: [],
                services: [],
                gallery: [],
                offers: { enabled: false, text: "" },
                contact: {
                    phone: "",
                    whatsapp: "",
                    email: email,
                    address: "",
                    mapLink: ""
                },
                seo: {
                    title: data.businessName,
                    description: `Welcome to ${data.businessName}`
                },
                settings: {
                    primaryColor: "#2563eb",
                    theme: 'light'
                },
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            transaction.set(clientRef, newClientData);
            transaction.update(userRef, {
                clientId: clientId,
                updatedAt: serverTimestamp()
            });
        });

        return { success: true };
    } catch (error: any) {
        console.error("Create client failed: ", error);
        return { success: false, error: error.message };
    }
};

/**
 * Updates client data in Firestore.
 * Supports nested updates via dot notation or top-level Partial<Client>.
 */
export const updateClientData = async (clientId: string, data: any) => {
    try {
        const clientRef = doc(db, "clients", clientId);
        await updateDoc(clientRef, {
            ...data,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error updating client:", error);
        return { success: false, error: error.message };
    }
};
