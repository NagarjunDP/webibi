"use client";

import { motion } from "framer-motion";
import { MousePointer2, Layers, Type, Palette, Sparkles, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

export function ControlPreview() {
    return (
        <section className="section-padding bg-secondary overflow-hidden">
            <div className="container mx-auto px-6 md:px-8">
                <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-center">

                    {/* Content Section */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center lg:text-left"
                        >
                            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/30 mb-8">Empowerment</p>
                            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter text-foreground mb-8 lg:mb-10 leading-[0.95]">
                                Total Control. <br />
                                <span className="text-primary italic font-serif">Zero Code.</span>
                            </h2>
                            <p className="text-lg lg:text-xl text-foreground/50 mb-10 lg:mb-12 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Update text, swap imagery, and evolve your brand with the same precision we used to build it.
                            </p>

                            <div className="space-y-6 lg:space-y-8 mb-12">
                                {[
                                    { icon: Type, title: "Editorial Freedom", text: "Change headlines and copy in real-time." },
                                    { icon: Palette, title: "Visual Harmony", text: "Effortlessly manage your brand's aesthetic." },
                                    { icon: Layers, title: "Section Builder", text: "Deploy new experiences with simple dragging." },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row items-center lg:items-start gap-4 lg:gap-6 group text-center lg:text-left">
                                        <div className="w-12 h-12 rounded-2xl bg-white border border-foreground/5 flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:text-white transition-all duration-700">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-base lg:text-lg font-bold tracking-tight text-foreground mb-1">{item.title}</h3>
                                            <p className="text-sm text-foreground/40 leading-relaxed max-w-xs">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Abstract UI Showcase */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-[4/3] w-full"
                        >
                            {/* Base Layer */}
                            <div className="absolute inset-0 bg-white rounded-[2rem] lg:rounded-[4rem] border border-foreground/5 shadow-[0_60px_120px_-20px_rgba(11,13,18,0.08)] overflow-hidden">
                                <div className="p-6 lg:p-12 space-y-8 lg:space-y-12">
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-3">
                                            <div className="w-3 h-3 rounded-full bg-slate-100" />
                                            <div className="w-3 h-3 rounded-full bg-slate-100" />
                                            <div className="w-3 h-3 rounded-full bg-slate-100" />
                                        </div>
                                        <div className="w-40 h-8 bg-[#F7F7F8] rounded-full" />
                                    </div>
                                    <div className="space-y-6">
                                        <div className="h-12 w-3/4 bg-[#F7F7F8] rounded-2xl" />
                                        <div className="h-6 w-1/2 bg-[#F7F7F8] rounded-full" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-8 pt-8">
                                        <div className="aspect-video bg-primary/5 rounded-[2rem] border border-primary/10 flex items-center justify-center">
                                            <Sparkles className="w-8 h-8 text-primary opacity-20" />
                                        </div>
                                        <div className="aspect-video bg-[#F7F7F8] rounded-[2rem] border border-foreground/5" />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Glass Cards (Hidden on very small mobile if desired, or scaled) */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-[15%] -right-4 lg:-right-12 w-48 lg:w-64 bg-white/70 backdrop-blur-xl border border-white p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl z-20 scale-75 lg:scale-100"
                            >
                                <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-foreground flex items-center justify-center text-white">
                                        <Sliders className="w-4 h-4 lg:w-5 lg:h-5" />
                                    </div>
                                    <span className="text-xs lg:text-sm font-bold tracking-tight">Style Editor</span>
                                </div>
                                <div className="space-y-3 lg:space-y-4">
                                    <div className="h-1.5 w-full bg-foreground/5 rounded-full" />
                                    <div className="h-1.5 w-2/3 bg-foreground/5 rounded-full" />
                                    <div className="h-1.5 w-3/4 bg-primary/20 rounded-full" />
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-[5%] -left-4 lg:-left-12 w-48 lg:w-64 bg-white/70 backdrop-blur-xl border border-white p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl z-20 scale-75 lg:scale-100"
                            >
                                <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                                        <MousePointer2 className="w-4 h-4 lg:w-5 lg:h-5" />
                                    </div>
                                    <span className="text-xs lg:text-sm font-bold tracking-tight">Hand-Crafted</span>
                                </div>
                                <p className="text-[10px] lg:text-xs text-foreground/40 leading-relaxed font-serif italic">
                                    Every interaction is calculated to deliver delight.
                                </p>
                            </motion.div>

                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
