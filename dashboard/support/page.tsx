"use client";

import { LifeBuoy, Mail, MessageSquare, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SupportPage() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto pb-24">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Support</h2>
                <p className="text-muted-foreground mt-1 text-lg">Need help? We're here to assist you with any questions or issues.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-blue-100 dark:border-blue-900/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-blue-600" />
                            Live Chat
                        </CardTitle>
                        <CardDescription>Talk to our support team in real-time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Our average response time is under 5 minutes during business hours.</p>
                        <Button className="w-full">Start Chat</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-purple-600" />
                            Email Support
                        </CardTitle>
                        <CardDescription>Send us an email for non-urgent inquiries.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">We'll get back to you within 24 hours.</p>
                        <Button variant="outline" className="w-full" asChild>
                            <a href="mailto:support@webibi.com">support@webibi.com</a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <h4 className="font-semibold">How do I update my logo?</h4>
                        <p className="text-sm text-muted-foreground">Go to Settings {' > '} Business Profile and use the Logo upload tool.</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-semibold">How do I add new services?</h4>
                        <p className="text-sm text-muted-foreground">Navigate to the Services tab and click "Add Service" at the top right.</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-semibold">Is my data secure?</h4>
                        <p className="text-sm text-muted-foreground">Yes, all data is encrypted and stored securely in Firebase with role-based access control.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-center pt-8">
                <div className="text-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 justify-center">
                        <LifeBuoy className="w-4 h-4" />
                        Available Mon-Fri, 9am - 6pm IST
                    </div>
                    <p className="text-xs text-muted-foreground">Webibi Client Portal v1.0.0</p>
                </div>
            </div>
        </div>
    );
}
