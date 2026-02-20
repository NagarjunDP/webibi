"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Client, GalleryItem } from "@/types";
import { MultiImageUpload } from "@/components/ui/multi-image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, FolderOpen } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/cloudinaryUpload";
import { SectionCard } from "@/components/ui/section-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StickySaveBar } from "@/components/ui/sticky-save-bar";

export default function GalleryPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [originalGallery, setOriginalGallery] = useState<GalleryItem[]>([]);
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [category, setCategory] = useState("General");
    const [activeTab, setActiveTab] = useState("all");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchGallery = async () => {
            if (user?.clientId) {
                try {
                    const docRef = doc(db, "clients", user.clientId);
                    const snapshot = await getDoc(docRef);
                    if (snapshot.exists()) {
                        const data = snapshot.data() as Client;
                        // Normalize data
                        const items: GalleryItem[] = (data.gallery || []).map(item => {
                            if (typeof item === 'string') {
                                return { url: item, category: 'General' };
                            }
                            return item;
                        });
                        setOriginalGallery(items);
                        setGalleryItems(items);
                    }
                } catch (error) {
                    console.error("Error fetching gallery:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchGallery();
    }, [user]);

    // Check for changes
    const hasChanges = JSON.stringify(originalGallery) !== JSON.stringify(galleryItems);

    const handleUploadFiles = async (files: File[]) => {
        try {
            const uploadPromises = files.map(file => uploadToCloudinary(file));
            const urls = await Promise.all(uploadPromises);

            const newItems: GalleryItem[] = urls.map(url => ({
                url,
                category: category.trim() || "General",
                createdAt: new Date().toISOString()
            }));

            // Update local state only
            setGalleryItems(prev => [...prev, ...newItems]);
            toast.success(`${urls.length} images uploaded. Don't forget to save!`);
        } catch (error) {
            console.error(error);
            toast.error("Upload failed");
        }
    };

    const handleDelete = (indexToDelete: number) => {
        if (!confirm("Remove this image? (You still need to save changes)")) return;
        setGalleryItems(prev => prev.filter((_, idx) => idx !== indexToDelete));
    };

    const handleSave = async () => {
        if (!user?.clientId) return;
        setIsSaving(true);
        try {
            await updateDoc(doc(db, "clients", user.clientId), {
                gallery: galleryItems
            });
            setOriginalGallery(galleryItems); // Update baseline
            toast.success("Gallery saved successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save gallery");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    // Group by category
    const categories = Array.from(new Set(galleryItems.map(item => item.category)));
    const groupedImages = categories.reduce((acc, cat) => {
        acc[cat] = galleryItems.filter(item => item.category === cat);
        return acc;
    }, {} as Record<string, GalleryItem[]>);

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-24">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Gallery</h2>
                <p className="text-muted-foreground mt-1 text-lg">Organize and showcase your work with topics.</p>
            </div>

            <SectionCard
                title="Upload Images"
                description="Upload multiple images at once and assign them to a specific category."
                action={
                    <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full text-blue-600 dark:text-blue-400 text-xs font-medium">
                        <FolderOpen className="w-3 h-3" />
                        Bulk Upload Supported
                    </div>
                }
            >
                <div className="space-y-4">
                    <div className="max-w-xs">
                        <Label htmlFor="category">Topic / Category</Label>
                        <Input
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="e.g. Wedding, Corporate, Parties"
                            className="mt-1.5"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Images will be grouped under this name.</p>
                    </div>

                    <MultiImageUpload
                        onUploadFiles={handleUploadFiles}
                        label={`Upload to "${category}"`}
                        className="max-w-2xl"
                    />
                </div>
            </SectionCard>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Your Collections</h3>
                </div>

                {galleryItems.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-900/50">
                        No images found. Start by uploading above.
                    </div>
                ) : (
                    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                        <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 justify-start">
                            <TabsTrigger
                                value="all"
                                className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black rounded-full border border-gray-200 dark:border-zinc-800 px-4 py-1.5"
                            >
                                All Photos
                            </TabsTrigger>
                            {categories.map(cat => (
                                <TabsTrigger
                                    key={cat}
                                    value={cat}
                                    className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black rounded-full border border-gray-200 dark:border-zinc-800 px-4 py-1.5"
                                >
                                    {cat}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <TabsContent value="all" className="mt-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {galleryItems.map((item, idx) => (
                                    // Find original index to delete correctly
                                    <GalleryItemCard
                                        key={idx}
                                        item={item}
                                        onDelete={() => handleDelete(idx)}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        {categories.map(cat => (
                            <TabsContent key={cat} value={cat} className="mt-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {/* We look up the items again to map them, but need original index for deletion */}
                                    {/* To keep it simple, we just use filtering here, but standard delete logic uses global index or ID */}
                                    {galleryItems.map((item, globalIdx) => {
                                        if (item.category !== cat) return null;
                                        return (
                                            <GalleryItemCard
                                                key={globalIdx}
                                                item={item}
                                                onDelete={() => handleDelete(globalIdx)}
                                            />
                                        )
                                    })}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </div>

            <StickySaveBar
                hasChanges={hasChanges}
                isSaving={isSaving}
                onSave={handleSave}
            />
        </div>
    );
}

function GalleryItemCard({ item, onDelete }: { item: GalleryItem, onDelete: () => void }) {
    return (
        <div className="relative aspect-square rounded-xl overflow-hidden group bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
            <Image src={item.url} alt={item.category} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <span className="text-white text-xs font-medium px-2 py-1 bg-black/50 rounded-full backdrop-blur-sm">
                    {item.category}
                </span>
                <Button variant="destructive" size="icon" className="h-8 w-8" onClick={onDelete}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
