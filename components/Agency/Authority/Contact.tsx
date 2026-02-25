"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Contact() {
    return (
        <section id="contact" className="relative section-padding bg-[#0B0D12] overflow-hidden">
            {/* Background Texture / Grain would go here if we had one */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="container mx-auto px-8 relative z-10">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-8 lg:mb-12">
                            <Sparkles className="w-3 h-3 fill-primary" />
                            <span>Available for Q2 2026</span>
                        </div>

                        <h2 className="text-4xl sm:text-7xl lg:text-[120px] xl:text-[140px] font-bold tracking-tighter text-white leading-[0.9] lg:leading-[0.85] mb-16 lg:mb-20">
                            Let’s Build Something <br className="hidden sm:block" />
                            That <span className="text-primary italic">Actually Works</span> <br className="hidden sm:block" />
                            For Your Business.
                        </h2>

                        <p className="text-lg lg:text-3xl text-white/40 mb-16 lg:mb-20 max-w-3xl mx-auto leading-relaxed font-serif italic">
                            Stop settling for templates. Invest in a digital masterpiece that commands authority and delivers results.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-8 mb-24 lg:mb-32">
                            <Link href="#contact-form" className="w-full sm:w-auto">
                                <Button className="w-full rounded-full px-12 lg:px-16 h-16 lg:h-20 bg-primary hover:bg-white hover:text-foreground text-white text-lg lg:text-xl font-bold transition-all active:scale-[0.98] shadow-2xl shadow-primary/20">
                                    Get Started Now
                                </Button>
                            </Link>
                            <Link href="tel:+919876543210" className="w-full sm:w-auto">
                                <Button variant="ghost" className="w-full rounded-full px-12 h-16 lg:h-20 text-white hover:bg-white/5 text-lg lg:text-xl font-bold border border-white/10">
                                    Call Direct
                                </Button>
                            </Link>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 border-t border-white/5 pt-16 lg:pt-20 max-w-4xl mx-auto">
                            <div className="flex flex-col items-center lg:items-start gap-3 lg:gap-4">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">Inquiries</span>
                                <a href="mailto:hello@webibi.agency" className="text-xl lg:text-3xl font-bold text-white hover:text-primary transition-colors">
                                    hello@webibi.agency
                                </a>
                            </div>
                            <div className="flex flex-col items-center lg:items-end gap-3 lg:gap-4">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">Studio</span>
                                <p className="text-xl lg:text-3xl font-bold text-white text-center lg:text-right">
                                    Bengaluru, India
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-full aspect-square bg-primary/20 rounded-full blur-[160px] pointer-events-none opacity-50" />
        </section>
    );
}
