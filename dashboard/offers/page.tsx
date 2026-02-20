"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Client } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export default function OffersPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [offer, setOffer] = useState<{ enabled: boolean; text: string }>({ enabled: false, text: "" });

    useEffect(() => {
        if (user?.clientId) {
            getDoc(doc(db, "clients", user.clientId)).then((snap) => {
                if (snap.exists()) {
                    const data = snap.data() as Client;
                    if (data.offers) setOffer(data.offers);
                }
            });
        }
    }, [user]);

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateDoc(doc(db, "clients", user!.clientId), {
                offers: offer
            });
            toast.success("Offers updated");
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
                <h2 className="text-3xl font-bold tracking-tight">Special Offers</h2>
                <p className="text-muted-foreground">Manage the announcement bar or special promo section on your website.</p>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Current Offer</CardTitle>
                    <CardDescription>Enable this to show a banner on your site.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="enabled"
                            checked={offer.enabled}
                            onCheckedChange={(checked) => setOffer({ ...offer, enabled: checked })}
                        />
                        <Label htmlFor="enabled">Show Offer on Website</Label>
                    </div>

                    <div className="space-y-2">
                        <Label>Offer Text</Label>
                        <Input
                            value={offer.text}
                            onChange={(e) => setOffer({ ...offer, text: e.target.value })}
                            placeholder="e.g., Get 20% off directly booking this month!"
                        />
                    </div>

                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
