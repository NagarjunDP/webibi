"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Trust() {
    return (
        <section
            id="trust"
            className="relative pt-24 lg:pt-32 pb-8 lg:pb-12 bg-secondary overflow-hidden"
            style={{
                backgroundImage: `radial-gradient(circle at 50% 0%, rgba(37,99,235,0.02), transparent 70%)`
            }}
        >
            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">

                    {/* ══ THE MINIMALIST MANIFESTO ══ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-16 lg:mb-24"
                    >
                        <h2 className="text-[clamp(2.5rem,5.5vw,4.8rem)] font-bold tracking-tighter text-[#0F172A] leading-[1] mb-12">
                            We built Webibi to <br />
                            help you, <span className="italic font-serif text-blue-600">Habibi.</span>
                        </h2>

                        <div className="space-y-12 text-lg lg:text-xl text-foreground/70 leading-relaxed font-medium max-w-2xl mx-auto">
                            <p>
                                Minimal animations. Simple aesthetics. Bespoke engineering designed for Founders who value their time and their brand's authority.
                            </p>
                            <p>
                                We don't do complex for the sake of complex. We do human-made excellence that just works.
                            </p>
                        </div>
                    </motion.div>

                    {/* ══ THE PART THE USER LIKES ══ */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-12 h-px bg-border mb-16" />

                        <h4 className="text-[clamp(1.5rem,3vw,2.5rem)] font-serif italic text-[#64748B] leading-[1.4] mb-16 max-w-3xl">
                            “We started this agency because we were tired of seeing founders get fleeced by agencies selling pretty wrappers around broken code.”
                        </h4>

                        <div className="flex flex-col items-center gap-8">
                            <Link href="#contact">
                                <button className="group relative flex items-center justify-center gap-4 h-16 px-12 rounded-full bg-[#0F172A] text-white text-sm font-bold tracking-wide transition-all hover:translate-y-[-2px] active:translate-y-[1px]">
                                    Work With the Outliers
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </Link>

                            <div className="flex items-center gap-3">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                                    Only 2 Slots Open for March
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
