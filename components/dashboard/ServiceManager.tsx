"use client";

import { useState, useEffect } from "react";
import { Service } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Edit2, GripVertical, X, ImageIcon } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload"; // Use the new component
import { updateClientData } from "@/services/clientService";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/cloudinaryUpload";
import { StickySaveBar } from "@/components/ui/sticky-save-bar";
import { cn } from "@/lib/utils";

interface ServiceManagerProps {
    clientId: string;
    initialServices: Service[];
}

export default function ServiceManager({ clientId, initialServices }: ServiceManagerProps) {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [originalServices, setOriginalServices] = useState<Service[]>(initialServices);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [tempService, setTempService] = useState<Service | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Sync with initialServices if they change externally (e.g. first load)
    useEffect(() => {
        setServices(initialServices);
        setOriginalServices(initialServices);
    }, [initialServices]);

    const hasChanges = JSON.stringify(services) !== JSON.stringify(originalServices);

    const handleSaveAll = async () => {
        setIsSaving(true);
        try {
            await updateClientData(clientId, { services });
            setOriginalServices(services);
            toast.success("All changes saved successfully");
        } catch (error) {
            console.error("Error saving services:", error);
            toast.error("Failed to save changes");
        } finally {
            setIsSaving(false);
        }
    };

    const handleAdd = () => {
        const newService: Service = {
            id: crypto.randomUUID(),
            name: "New Service",
            description: "",
            price: "",
            images: [],
        };
        const newServices = [newService, ...services]; // Add to top
        setServices(newServices);
        setEditingId(newService.id);
        setTempService(newService);
    };

    const handleEdit = (service: Service) => {
        setEditingId(service.id);
        setTempService({ ...service });
    };

    const handleCancelEdit = () => {
        if (!tempService) return;
        // If it was a new service (empty name/desc), maybe remove it? 
        // For simplicity, just revert changes to the service in the list (which we haven't touched yet in `services` state until Save)
        // Wait, current logic: `services` is the "Draft" state.
        // `tempService` is the "Currently Editing" state.

        // If we cancel, we just stop editing. The `services` array remains as it was *before* we started editing specific fields?
        // No, `services` array holds confirmed local edits.
        // When we edit a row, we are updating `tempService`. If we cancel, we discard `tempService`.
        setEditingId(null);
        setTempService(null);
    };

    const handleCommitEdit = () => {
        if (!tempService) return;

        const updatedServices = services.map(s => s.id === tempService.id ? tempService : s);
        setServices(updatedServices);
        setEditingId(null);
        setTempService(null);
    };

    const handleDelete = (id: string) => {
        if (!confirm("Delete this service?")) return;
        const updatedServices = services.filter(s => s.id !== id);
        setServices(updatedServices);
    };

    // Helper to upload file (mock or integrate with real service if available in context)
    // For now, we'll assume `ImageUpload` returns a data URL or we mock it.
    // If real upload needed, we need a service.
    const handleUploadFile = async (file: File): Promise<string> => {
        try {
            return await uploadToCloudinary(file);
        } catch (error) {
            console.error("Service image upload failed:", error);
            toast.error("Image upload failed");
            throw error;
        }
    };

    return (
        <div className="relative pb-24"> {/* Padding for Sticky Bar */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-medium">Active Services</h3>
                    <p className="text-sm text-muted-foreground">Manage the services listed on your portfolio.</p>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="h-4 w-4 mr-2" /> Add Service
                </Button>
            </div>

            <div className="space-y-4">
                {services.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed rounded-xl">
                        <p className="text-muted-foreground">No services added yet.</p>
                        <Button variant="link" onClick={handleAdd}>Add your first service</Button>
                    </div>
                )}

                {services.map((service, index) => (
                    <div
                        key={service.id}
                        className={cn(
                            "bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 transition-all",
                            editingId === service.id ? "ring-2 ring-blue-500 shadow-md" : "hover:border-blue-300"
                        )}
                    >
                        {editingId === service.id && tempService ? (
                            // Edit Mode
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-semibold text-blue-600">Editing Service</h4>
                                    <Button variant="ghost" size="sm" onClick={handleCancelEdit}><X className="w-4 h-4" /></Button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Service Name</Label>
                                            <Input
                                                value={tempService.name}
                                                onChange={e => setTempService({ ...tempService, name: e.target.value })}
                                                placeholder="e.g. Web Design"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Price / Rate</Label>
                                            <Input
                                                value={tempService.price}
                                                onChange={e => setTempService({ ...tempService, price: e.target.value })}
                                                placeholder="e.g. Starts at $500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Description</Label>
                                            <Textarea
                                                value={tempService.description}
                                                onChange={e => setTempService({ ...tempService, description: e.target.value })}
                                                placeholder="Describe what you offer..."
                                                className="min-h-[100px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Cover Image</Label>
                                        <ImageUpload
                                            value={tempService.images[0]}
                                            onChange={(url) => setTempService({ ...tempService, images: url ? [url] : [] })}
                                            onUploadFile={handleUploadFile}
                                            label="Upload a cover image for this service"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
                                    <Button variant="ghost" onClick={handleCancelEdit}>Cancel</Button>
                                    <Button onClick={handleCommitEdit}>Done</Button>
                                </div>
                            </div>
                        ) : (
                            // View Mode (List Item)
                            <div className="flex items-start gap-4">
                                {/* Drag Handle (Visual only for now) */}
                                <div className="mt-2 text-gray-300 cursor-grab active:cursor-grabbing">
                                    <GripVertical className="w-5 h-5" />
                                </div>

                                {/* Image Thumbnail */}
                                <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-zinc-800 flex-shrink-0 overflow-hidden relative border border-gray-200 dark:border-zinc-700">
                                    {service.images[0] ? (
                                        <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                            <ImageIcon className="w-6 h-6" /> // Creating ImageIcon below or import
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{service.name}</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{service.description || "No description"}</p>
                                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">{service.price}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                                        <Edit2 className="w-4 h-4 text-gray-500" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <StickySaveBar
                hasChanges={hasChanges}
                isSaving={isSaving}
                onSave={handleSaveAll}
            />
        </div>
    );
}



