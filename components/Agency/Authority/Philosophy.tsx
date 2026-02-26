"use client";

import { motion } from "framer-motion";

export function Philosophy() {
    return (
        <section className="relative py-10 lg:py-16 bg-background overflow-hidden border-t border-foreground/5">
            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary/40 mb-8 font-mono">
                            Manifesto . 01
                        </p>

                        <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tighter text-foreground leading-[1] mb-12 uppercase">
                            The Antidote to <br />
                            <span className="text-foreground/30 italic font-serif normal-case">Complex Jargon.</span>
                        </h2>

                        <div className="space-y-6 text-lg lg:text-xl text-foreground/50 leading-relaxed font-light tracking-tight max-w-2xl mx-auto">
                            <p>
                                Most agencies hide behind mystery to justify their retainers.
                            </p>
                            <p className="text-foreground font-medium italic font-serif">
                                We believe in high-speed clarity and the <span className="text-primary italic">"Habibi"</span> principle:
                            </p>
                            <p className="text-2xl lg:text-3xl text-foreground font-bold tracking-tighter uppercase leading-[0.9] pt-4">
                                100% OWNERSHIP, <br />
                                ZERO FLUFF.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
