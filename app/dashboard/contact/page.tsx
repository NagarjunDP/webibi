"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Client, ContactInfo } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export default function ContactPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState<ContactInfo>({
        phone: "",
        whatsapp: "",
        email: "",
        address: "",
        mapLink: ""
    });

    useEffect(() => {
        if (user?.clientId) {
            getDoc(doc(db, "clients", user.clientId)).then((snap) => {
                if (snap.exists()) {
                    const data = snap.data() as Client;
                    if (data.contact) setContact(data.contact);
                }
            });
        }
    }, [user]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateDoc(doc(db, "clients", user!.clientId), {
                contact: contact
            });
            toast.success("Contact info updated");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Contact Information</h2>
                <p className="text-muted-foreground">Update how customers can reach you on your website.</p>
            </div>

            <Card className="max-w-2xl">
                <CardContent className="pt-6">
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Phone Number</Label>
                            <Input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="+1 234 567 890" />
                        </div>
                        <div className="space-y-2">
                            <Label>WhatsApp Number</Label>
                            <Input value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} placeholder="1234567890" />
                        </div>
                        <div className="space-y-2">
                            <Label>Public Email</Label>
                            <Input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="contact@business.com" />
                        </div>
                        <div className="space-y-2">
                            <Label>Physical Address</Label>
                            <Input value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} placeholder="123 Main St, City" />
                        </div>
                        <div className="space-y-2">
                            <Label>Google Maps Link</Label>
                            <Input value={contact.mapLink} onChange={(e) => setContact({ ...contact, mapLink: e.target.value })} placeholder="https://maps.google.com/..." />
                        </div>

                        <Button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save Contact Info"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
