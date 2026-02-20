"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Client } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StickySaveBar } from "@/components/ui/sticky-save-bar";
import { updateClientData } from "@/services/clientService";
import { Layout, FileText, Pointer, Sparkles } from "lucide-react";

export default function WebsiteContentPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // State
    const [websiteContent, setWebsiteContent] = useState({
        heroTitle: "",
        heroSubtitle: "",
        aboutTitle: "About Our Business",
        aboutContent: "",
        ctaText: "Get Started"
    });

    const [originalContent, setOriginalContent] = useState<any>(null);

    useEffect(() => {
        if (user?.clientId) {
            getDoc(doc(db, "clients", user.clientId)).then((snap) => {
                if (snap.exists()) {
                    const data = snap.data() as Client;
                    const initialContent = data.websiteContent || {
                        heroTitle: data.businessName || "",
                        heroSubtitle: data.seo?.description || "",
                        aboutTitle: "About Us",
                        aboutContent: "",
                        ctaText: "Contact Us"
                    };
                    setWebsiteContent(initialContent);
                    setOriginalContent(initialContent);
                }
                setFetching(false);
            });
        }
    }, [user]);

    const hasChanges = JSON.stringify(websiteContent) !== JSON.stringify(originalContent);

    const handleSave = async () => {
        if (!user?.clientId) return;
        setLoading(true);
        try {
            await updateClientData(user.clientId, { websiteContent });
            setOriginalContent(websiteContent);
            toast.success("Website content saved successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save content");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-8 text-center text-muted-foreground">Loading website content...</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-24">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">My Website</h2>
                <p className="text-muted-foreground mt-1 text-lg">Personalize your website's text and buttons.</p>
            </div>

            <Card className="border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                <CardHeader className="bg-blue-50/50 dark:bg-blue-900/5">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Layout className="w-5 h-5 text-blue-600" />
                        Main Welcome Area (Hero)
                    </CardTitle>
                    <CardDescription>The main headline and subtitle at the top of your page.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label>Main Headline</Label>
                        <Input
                            className="text-lg font-medium"
                            value={websiteContent.heroTitle}
                            onChange={(e) => setWebsiteContent({ ...websiteContent, heroTitle: e.target.value })}
                            placeholder="e.g. Modern Photography for Modern Couples"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Sub-headline / Short Intro</Label>
                        <Textarea
                            value={websiteContent.heroSubtitle}
                            onChange={(e) => setWebsiteContent({ ...websiteContent, heroSubtitle: e.target.value })}
                            placeholder="A brief sentence that explains what you do best..."
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                <CardHeader className="bg-indigo-50/50 dark:bg-indigo-900/5">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        About Us Section
                    </CardTitle>
                    <CardDescription>Tell your story and why customers should choose you.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label>Section Title</Label>
                        <Input
                            value={websiteContent.aboutTitle}
                            onChange={(e) => setWebsiteContent({ ...websiteContent, aboutTitle: e.target.value })}
                            placeholder="e.g. Our Story, Why Us?, About Our Studio"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Main Content</Label>
                        <Textarea
                            className="min-h-[200px] leading-relaxed"
                            value={websiteContent.aboutContent}
                            onChange={(e) => setWebsiteContent({ ...websiteContent, aboutContent: e.target.value })}
                            placeholder="Share your business journey, passion, and expertise..."
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                <CardHeader className="bg-amber-50/50 dark:bg-amber-900/5">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Pointer className="w-5 h-5 text-amber-600" />
                        Buttons & Actions
                    </CardTitle>
                    <CardDescription>Customize the call-to-action buttons on your site.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label>Main Button Text</Label>
                        <Input
                            value={websiteContent.ctaText}
                            onChange={(e) => setWebsiteContent({ ...websiteContent, ctaText: e.target.value })}
                            placeholder="e.g. Get a Quote, Book Now, Learn More"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="p-6 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl flex items-start gap-4">
                <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">Pro Tip</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                        Use emotional words and clear benefits in your headlines to get more leads.
                        Keep your 'About Us' section focused on how you solve your customer's problems.
                    </p>
                </div>
            </div>

            <StickySaveBar
                hasChanges={hasChanges}
                isSaving={loading}
                onSave={handleSave}
            />
        </div>
    );
}
