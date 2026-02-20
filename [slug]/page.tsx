"use client";

import { useClientData } from "@/hooks/useClientData";
import ClientWebsite from "@/components/ClientTemplate/ClientWebsite";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

export default function DynamicClientPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { clientData, loading, error } = useClientData(slug);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error || !clientData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center p-8 max-w-md bg-slate-50 rounded-xl">
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Website Not Found</h1>
                    <p className="text-slate-600">The website you are looking for does not exist or has been moved.</p>
                    <a href="/" className="mt-4 inline-block text-blue-600 hover:underline">Back to Webibi</a>
                </div>
            </div>
        );
    }

    if (clientData.status !== "live") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center p-8 max-w-md bg-yellow-50 rounded-xl">
                    <h1 className="text-2xl font-bold text-yellow-800 mb-2">Website Under Construction</h1>
                    <p className="text-slate-600">This website is currently in draft mode and is not yet public.</p>
                </div>
            </div>
        );
    }

    return <ClientWebsite data={clientData} />;
}
