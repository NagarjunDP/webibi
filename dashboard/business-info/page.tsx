"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Client, ContactInfo } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/image-upload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StickySaveBar } from "@/components/ui/sticky-save-bar";
import { updateClientData } from "@/services/clientService";
import { uploadToCloudinary } from "@/lib/cloudinaryUpload";
import { Phone, MessageCircle, Mail, MapPin, Building2 } from "lucide-react";

export default function BusinessInfoPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    // State
    const [businessName, setBusinessName] = useState("");
    const [logoUrl, setLogoUrl] = useState("");
    const [contact, setContact] = useState<ContactInfo>({
        phone: "",
        whatsapp: "",
        email: "",
        address: "",
        mapLink: ""
    });

    // Original State for dirty checking
    const [originalData, setOriginalData] = useState<{
        businessName: string;
        logoUrl: string;
        contact: ContactInfo;
    } | null>(null);

    useEffect(() => {
        if (user?.clientId) {
            getDoc(doc(db, "clients", user.clientId)).then((snap) => {
                if (snap.exists()) {
                    const data = snap.data() as Client;
                    const initialData = {
                        businessName: data.businessName || "",
                        logoUrl: data.logoUrl || "",
                        contact: data.contact || {
                            phone: "",
                            whatsapp: "",
                            email: "",
                            address: "",
                            mapLink: ""
                        }
                    };
                    setBusinessName(initialData.businessName);
                    setLogoUrl(initialData.logoUrl);
                    setContact(initialData.contact);
                    setOriginalData(initialData);
                }
                setIsFetching(false);
            });
        }
    }, [user]);

    const hasChanges = originalData ? (
        businessName !== originalData.businessName ||
        logoUrl !== originalData.logoUrl ||
        JSON.stringify(contact) !== JSON.stringify(originalData.contact)
    ) : false;

    const handleSave = async () => {
        if (!user?.clientId) return;
        setLoading(true);
        try {
            await updateClientData(user.clientId, {
                businessName,
                logoUrl,
                contact
            });
            setOriginalData({ businessName, logoUrl, contact });
            toast.success("Business information updated!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update information");
        } finally {
            setLoading(false);
        }
    };

    const handleUploadLogo = async (file: File): Promise<string> => {
        return await uploadToCloudinary(file);
    };

    if (isFetching) return <div className="p-8 text-center text-muted-foreground">Loading business profile...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-24">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Business Info</h2>
                <p className="text-muted-foreground mt-1 text-lg">Manage your business details and contact information.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1 border-gray-100 dark:border-zinc-800 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Business Logo</CardTitle>
                        <CardDescription>Your brand identity</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center pt-4">
                        <ImageUpload
                            value={logoUrl}
                            onChange={setLogoUrl}
                            onUploadFile={handleUploadLogo}
                            label="Business Logo"
                        />
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 border-gray-100 dark:border-zinc-800 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">General Information</CardTitle>
                        <CardDescription>Basic business identity</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="businessName">Legal Business Name</Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="businessName"
                                    className="pl-10"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    placeholder="e.g. Acme Solutions"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-gray-100 dark:border-zinc-800 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Contact Channels</CardTitle>
                    <CardDescription>How customers will reach you</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input
                                className="pl-10"
                                value={contact.phone}
                                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                                placeholder="+91 98765 43210"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>WhatsApp Number</Label>
                        <div className="relative">
                            <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input
                                className="pl-10"
                                value={contact.whatsapp}
                                onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                                placeholder="+91 98765 43210"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Email Address</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input
                                className="pl-10"
                                value={contact.email}
                                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                placeholder="hello@yourbusiness.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label>Physical Address</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input
                                className="pl-10"
                                value={contact.address}
                                onChange={(e) => setContact({ ...contact, address: e.target.value })}
                                placeholder="123, Business Park, Mumbai"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <StickySaveBar
                hasChanges={hasChanges}
                isSaving={loading}
                onSave={handleSave}
            />
        </div>
    );
}
