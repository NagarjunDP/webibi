"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
    {
        title: "Strategy & Discovery",
        description: "We dive deep into your unique business essence to define a roadmap for digital dominance.",
    },
    {
        title: "Bespoke Design",
        description: "An intentional visual identity crafted pixel by pixel. No templates, just pure brand authority.",
    },
    {
        title: "Technical Build",
        description: "Engineering excellence using modern stacks for unmatched speed, security, and scalability.",
    },
    {
        title: "Launch & Growth",
        description: "We don't just launch; we evolve. Ongoing support and optimization to ensure continuous ROI.",
    },
];

export function SEOSection() {
    return (
        <section id="process" className="section-padding bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-8">

                <div className="max-w-4xl mb-16 lg:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center lg:text-left"
                    >
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/30 mb-8">Methodology</p>
                        <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[1] lg:leading-[0.95] mb-8 lg:mb-10">
                            The Science of <br />
                            <span className="text-primary italic">Refinement.</span>
                        </h2>
                        <p className="text-lg lg:text-xl text-foreground/50 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Our workflow is lean, transparent, and focused on one thing: delivering a digital asset that looks as good as it performs.
                        </p>
                    </motion.div>
                </div>

                <div className="relative">
                    {/* Minimal Timeline Line */}
                    <div className="absolute top-[26px] left-0 w-full h-[1px] bg-foreground/5 hidden lg:block" />

                    <div className="grid lg:grid-cols-4 gap-20 lg:gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
                                className="group"
                            >
                                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                                    {/* Timeline Marker */}
                                    <div className="relative mb-8 lg:mb-12">
                                        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-foreground/5 bg-white flex items-center justify-center group-hover:bg-foreground group-hover:text-white transition-all duration-700">
                                            <span className="text-xs font-bold font-serif italic">0{index + 1}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground mb-4 transition-transform group-hover:translate-x-2 duration-700">
                                        {step.title}
                                    </h3>
                                    <p className="text-base lg:text-lg text-foreground/40 leading-relaxed max-w-[280px]">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Secondary Decorative Element */}
                <div className="mt-24 lg:mt-40 pt-16 lg:pt-20 border-t border-foreground/5 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="flex items-center gap-8 lg:gap-12">
                        <div className="flex flex-col items-center lg:items-start">
                            <span className="text-3xl lg:text-5xl font-bold tracking-tighter text-foreground">7-14</span>
                            <span className="text-[10px] uppercase tracking-widest text-foreground/30 font-bold">Days to Launch</span>
                        </div>
                        <div className="w-px h-10 lg:h-12 bg-foreground/10" />
                        <div className="flex flex-col items-center lg:items-start">
                            <span className="text-3xl lg:text-5xl font-bold tracking-tighter text-foreground">100%</span>
                            <span className="text-[10px] uppercase tracking-widest text-foreground/30 font-bold">Hand-Crafted</span>
                        </div>
                    </div>

                    <div className="text-center lg:text-right">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-foreground/20 italic font-serif">A Boutique Agency Approach</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
