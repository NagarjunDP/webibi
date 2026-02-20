"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Client, SeoInfo } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StickySaveBar } from "@/components/ui/sticky-save-bar";
import { updateClientData } from "@/services/clientService";
import { Search, MapPin, Globe } from "lucide-react";

export default function SEOPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [seo, setSeo] = useState<SeoInfo & { location?: string }>({
        title: "",
        description: "",
        keywords: "",
        location: ""
    });

    const [originalData, setOriginalData] = useState<any>(null);

    useEffect(() => {
        if (user?.clientId) {
            getDoc(doc(db, "clients", user.clientId)).then((snap) => {
                if (snap.exists()) {
                    const data = snap.data() as Client;
                    const initialData = {
                        title: data.seo?.title || "",
                        description: data.seo?.description || "",
                        keywords: data.seo?.keywords || "",
                        location: data.contact?.address || ""
                    };
                    setSeo(initialData);
                    setOriginalData(initialData);
                }
                setFetching(false);
            });
        }
    }, [user]);

    const hasChanges = JSON.stringify(seo) !== JSON.stringify(originalData);

    const handleSave = async () => {
        if (!user?.clientId) return;
        setLoading(true);
        try {
            await updateClientData(user.clientId, {
                seo: {
                    title: seo.title,
                    description: seo.description,
                    keywords: seo.keywords
                },
                "contact.address": seo.location
            });
            setOriginalData(seo);
            toast.success("Google Search Settings saved!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save settings");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-8 text-center text-muted-foreground">Loading your search settings...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-24">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Google Search Settings</h2>
                <p className="text-muted-foreground mt-1 text-lg">Control how your business appears when people search for you online.</p>
            </div>

            <Card className="border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                <CardHeader className="bg-blue-50/50 dark:bg-blue-900/5">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-600" />
                        Search Result Preview
                    </CardTitle>
                    <CardDescription>This is how your business looks on Google</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="max-w-xl p-4 bg-white dark:bg-zinc-950 rounded-lg border border-gray-100 dark:border-zinc-900 shadow-sm">
                        <div className="text-[#1a0dab] dark:text-[#8ab4f8] text-xl font-medium truncate mb-1">
                            {seo.title || "Your Business Name | Best Services"}
                        </div>
                        <div className="text-[#006621] dark:text-[#34a853] text-sm mb-1 truncate">
                            https://webibi.com/{user?.clientId}
                        </div>
                        <div className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                            {seo.description || "Enter a business description below to see how it looks here. This helps customers find you on Google."}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6">
                <Card className="border-gray-100 dark:border-zinc-800 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Search Details</CardTitle>
                        <CardDescription>General information for search engines</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Google Title</Label>
                            <Input
                                value={seo.title}
                                onChange={(e) => setSeo({ ...seo, title: e.target.value })}
                                placeholder="e.g. Best Cafe in Mumbai | Moonlight Cafe"
                            />
                            <p className="text-xs text-muted-foreground">The headline that appears in search results.</p>
                        </div>

                        <div className="space-y-2">
                            <Label>Short Business Description</Label>
                            <Textarea
                                value={seo.description}
                                onChange={(e) => setSeo({ ...seo, description: e.target.value })}
                                placeholder="Tell customers what you do in 1-2 sentences..."
                                className="min-h-[100px]"
                            />
                            <p className="text-xs text-muted-foreground">This helps Google understand what your business offers.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Business Keywords</Label>
                                <Input
                                    value={seo.keywords || ""}
                                    onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
                                    placeholder="cafe, coffee, breakfast, mumbai..."
                                />
                                <p className="text-xs text-muted-foreground">Topics related to your business.</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Business Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        className="pl-10"
                                        value={seo.location}
                                        onChange={(e) => setSeo({ ...seo, location: e.target.value })}
                                        placeholder="Mumbai, India"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">Where your business is located.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <StickySaveBar
                hasChanges={hasChanges}
                isSaving={loading}
                onSave={handleSave}
            />
        </div>
    );
}
