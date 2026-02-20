"use client";

import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, User, ShieldCheck, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
    const { user } = useAuth();

    const handlePasswordReset = () => {
        toast.info("A password reset link will be sent to your email.");
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-24">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h2>
                <p className="text-muted-foreground mt-1 text-lg">Manage your account preferences and security.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-gray-100 dark:border-zinc-800 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-600" />
                            Account Information
                        </CardTitle>
                        <CardDescription>Your login details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-100 dark:border-zinc-800 text-sm">
                            <p className="text-muted-foreground">Logged in as:</p>
                            <p className="font-bold text-gray-900 dark:text-white mt-1">{user?.email}</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-lg border border-gray-100 dark:border-zinc-800 text-sm">
                            <p className="text-muted-foreground">Account Role:</p>
                            <p className="font-bold text-gray-900 dark:text-white mt-1 capitalize">{user?.role || "Client"}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-gray-100 dark:border-zinc-800 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Lock className="w-5 h-5 text-rose-600" />
                            Security
                        </CardTitle>
                        <CardDescription>Protect your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-900/20 flex gap-3">
                            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                            <p className="text-xs text-amber-800 dark:text-amber-200">
                                You are using Google Authentication. Password management is handled via your Google Account.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handlePasswordReset}
                        >
                            Request Access Reset
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-gray-100 dark:border-zinc-800 shadow-sm bg-blue-50/30 dark:bg-blue-900/10">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        Support Contact
                    </CardTitle>
                    <CardDescription>Need help with your account?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                        Having trouble with your dashboard? Our support specialists are available round the clock to help you with technical issues.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-6 gap-2">
                            <Mail className="w-4 h-4" /> Email Support
                        </Button>
                        <Button variant="outline" className="h-12 px-6 gap-2">
                            <MessageCircle className="w-4 h-4" /> WhatsApp Support
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
