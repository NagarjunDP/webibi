"use client";

import { motion } from "framer-motion";
import ProjectStartExperience from "./ProjectStartExperience";
import { Zap, ShieldCheck, Globe } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="relative py-24 lg:py-40 bg-secondary overflow-hidden min-h-screen flex items-center">
            {/* SEO Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Webibi",
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

            {/* Premium Background Aesthetics */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[50rem] h-[50rem] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[60rem] h-[60rem] bg-primary/10 rounded-full blur-[140px]" />
            </div>

            {/* Live Activity Ticker (Premium Refinement) */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="fixed top-24 right-6 md:right-12 z-50 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-card/60 backdrop-blur-xl border border-border shadow-[0_20px_40px_-10px_rgba(15,23,42,0.1)]"
            >
                <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute inset-0" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500 relative z-10" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A]/60">
                    Trusted by 12+ businesses this week
                </span>
            </motion.div>

            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="mb-16 lg:mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-6">Start a Project</p>
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0F172A] mb-8 leading-[1.1]">
                            Let’s Build Your <br />
                            <span className="text-primary italic">Digital Empire.</span>
                        </h2>
                    </motion.div>
                </div>

                <ProjectStartExperience />

                {/* Trust Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-24 lg:mt-32 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 border-t border-border pt-16"
                >
                    <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
                        <Zap className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F172A]">Premium Engineering</span>
                    </div>
                    <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F172A]">Bespoke Security</span>
                    </div>
                    <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
                        <Globe className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F172A]">Global Performance</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
