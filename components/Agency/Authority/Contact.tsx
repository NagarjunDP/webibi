"use client";

import { motion } from "framer-motion";
import ProjectStartExperience from "./ProjectStartExperience";
import { Zap } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="relative section-padding bg-[#F8F9FA] overflow-hidden min-h-screen flex items-center">
            {/* SEO Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Digital Empire",
                        "image": "/logo.png",
                        "@id": "",
                        "url": "https://webibi.vercel.app",
                        "telephone": "+919876543210",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "",
                            "addressLocality": "Bengaluru",
                            "addressRegion": "KA",
                            "postalCode": "",
                            "addressCountry": "IN"
                        },
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+919876543210",
                            "contactType": "customer service",
                            "areaServed": "IN",
                            "availableLanguage": ["en", "hi"]
                        }
                    })
                }}
            />

            {/* Premium Background Aesthetics (Optimized for performance) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-primary/5 via-primary/[0.02] to-transparent rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[50rem] h-[50rem] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-primary/10 via-primary/[0.03] to-transparent rounded-full" />
            </div>

            {/* Live Activity Ticker */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="fixed top-24 right-6 md:right-12 z-50 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-foreground/5 shadow-xl shadow-foreground/5"
            >
                <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute inset-0" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500 relative z-10" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">
                    12 businesses started projects this week
                </span>
            </motion.div>

            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <ProjectStartExperience />

                {/* Footer Trust Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 border-t border-foreground/5 pt-12"
                >
                    <div className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                        <Zap className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest">Premium Engineering</span>
                    </div>
                    <div className="flex items-center gap-3 grayscale opacity-30">
                        <span className="text-xs font-bold uppercase tracking-widest">Secure Cloud Architecture</span>
                    </div>
                    <div className="flex items-center gap-3 grayscale opacity-30">
                        <span className="text-xs font-bold uppercase tracking-widest">Global CDN Delivery</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
