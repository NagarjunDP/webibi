"use client";

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { User } from '@/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    firebaseUser: FirebaseUser | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    firebaseUser: null,
    loading: true,
    signInWithGoogle: async () => { },
    logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!auth || !db) {
            console.warn("[AuthContext] Firebase services not initialized. Auth is disabled.");
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setFirebaseUser(currentUser);

            if (currentUser) {
                try {
                    // Fetch user data from Firestore using Email (lowercased)
                    const emailKey = currentUser.email!.toLowerCase();
                    console.log("[AuthDebug] Current authenticated email:", currentUser.email);
                    const userDocRef = doc(db, 'users', emailKey);
                    console.log("[AuthDebug] Attempting to read user doc:", userDocRef.path);
                    const userDoc = await getDoc(userDocRef);
                    console.log("[AuthDebug] User doc found:", userDoc.exists());

                    if (userDoc.exists()) {
                        setUser(userDoc.data() as User);
                    } else {
                        // Auto-create user profile if it doesn't exist
                        console.log("[AuthDebug] User profile not found. Creating new profile for:", emailKey);
                        const newUser: User = {
                            uid: currentUser.uid,
                            email: emailKey,
                            role: 'client', // Default role
                            clientId: '', // Will be assigned by admin
                            displayName: currentUser.displayName || '',
                            photoURL: currentUser.photoURL || '',
                            createdAt: serverTimestamp(),
                            updatedAt: serverTimestamp()
                        };

                        await setDoc(userDocRef, newUser);
                        setUser(newUser);
                    }
                } catch (error: any) {
                    console.error("[AuthDebug] Permission/Fetch error:", error.code, error.message);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = useCallback(async () => {
        if (!auth) {
            alert("Auth is currently disabled. Check your configuration.");
            return;
        }
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    }, []);

    const logout = useCallback(async () => {
        if (!auth) return;
        try {
            await firebaseSignOut(auth);
            router.push('/');
        } catch (error) {
            console.error("Error signing out", error);
        }
    }, [router]);

    const value = useMemo(() => ({
        user,
        firebaseUser,
        loading,
        signInWithGoogle,
        logout
    }), [user, firebaseUser, loading, signInWithGoogle, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
