"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const whatsappUrl = "https://wa.me/911234567890?text=I'm%20interested%20in%20a%20premium%20website%20for%20my%20business";

    if (isClosed) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
                >
                    {/* Tooltip/Hook */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-background border border-foreground/10 px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-3 mb-1"
                    >
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold tracking-tight text-foreground/70">Online: Get a Free Quote</span>
                        <button
                            onClick={() => setIsClosed(true)}
                            className="p-1 hover:bg-foreground/5 rounded-full transition-colors"
                        >
                            <X className="w-3 h-3 text-foreground/30" />
                        </button>
                    </motion.div>

                    {/* Main WhatsApp Button */}
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-full shadow-2xl transition-all active:scale-95 overflow-hidden"
                    >
                        {/* Background flare */}
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                        <MessageSquare className="w-6 h-6 fill-current" />
                        <span className="font-bold tracking-tight">Chat with us</span>

                        {/* Notification dot */}
                        <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-emerald-500" />
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
