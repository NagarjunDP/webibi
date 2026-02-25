import { Client } from "@/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface GalleryProps {
    data: Client;
}

export function Gallery({ data }: GalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Filter valid items (either string or object with url)
    const validItems = data.gallery?.filter(item => {
        if (typeof item === 'string') return !!item;
        return !!item.url;
    }) || [];

    if (validItems.length === 0) return null;

    return (
        <section id="gallery" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Gallery</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        A glimpse into the magical moments we've created.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {validItems.map((item, index) => {
                        // FIX: Helper to handle both legacy strings and new objects
                        const url = typeof item === 'string' ? item : item.url;
                        const caption = typeof item === 'string' ? "Gallery Image" : item.category;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/3]"
                                onClick={() => setSelectedImage(url)}
                            >
                                <Image
                                    src={url}
                                    alt={caption}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <span className="text-white font-medium text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {caption}
                                    </span>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>


            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white p-2 hover:bg-white/20 rounded-full transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
                        <Image
                            src={selectedImage}
                            alt="Gallery Preview"
                            fill
                            className="object-contain"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                        />
                    </div>
                </div>
            )}

        </section>
    );
}
