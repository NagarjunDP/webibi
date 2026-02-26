"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket, ShieldCheck } from "lucide-react";

const STEPS = [
    {
        title: "The Reality Check",
        label: "01 / Audit",
        description: "Standard agencies start with a quote. We start with a forensic audit. If your current site isn't losing you money, we'll tell you to keep it."
    },
    {
        title: "Zero Fluff Foundation",
        label: "02 / Architecture",
        description: "No generic templates. We build bespoke digital foundations that your competition can't replicate. Precision engineering over aesthetic guesswork."
    },
    {
        title: "Human Supremacy",
        label: "03 / Design",
        description: "Forget AI-generated mediocrity. We craft human-centric UI that builds visceral trust in seconds. Design that commands authority, not just attention."
    },
    {
        title: "Total Ownership",
        label: "04 / Engineering",
        description: "No retainers. No dependency. We ship clean, SEO-pioneered code that you own 100%. Your empire should stand on its own."
    },
    {
        title: "The Handoff",
        label: "05 / Launch",
        description: "We don't just 'deploy'. We hand over the keys to your global CDN and the full source code. You're the founder, not a subscriber."
    }
];

export default function Process() {
    return (
        <section id="process" className="relative py-24 lg:py-48 bg-card overflow-hidden">
            <div className="container mx-auto px-6 md:px-8">
                {/* Clean Section Identifier */}
                <div className="mb-24 lg:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0F172A]/20 mb-8">Service Methodology</p>
                        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold tracking-tighter text-[#0F172A] leading-[1.05] uppercase">
                            The <br />
                            <span className="text-[#0F172A]/20 italic font-serif normal-case">Process.</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Vertical Process Feed */}
                <div className="space-y-24 lg:space-y-40">
                    {STEPS.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="relative flex flex-col md:flex-row gap-8 md:gap-24 items-start"
                        >
                            {/* Step Index Label */}
                            <div className="md:w-1/4 flex-shrink-0">
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0F172A]/30">
                                    {step.label}
                                </span>
                            </div>

                            {/* Step Content */}
                            <div className="md:flex-1 max-w-2xl">
                                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#0F172A] mb-6">
                                    {step.title}
                                </h3>
                                <p className="text-lg lg:text-xl text-[#475569] leading-relaxed font-medium">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Footer - Minimalist */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 lg:mt-56 pt-16 border-t border-slate-100 flex flex-col items-center text-center"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-xl font-bold text-[#0F172A]">The Webibi Guarantee</p>
                    </div>
                    <p className="text-[#475569] max-w-xl mx-auto mb-12 italic font-medium">
                        "We don't stop until you're obsessed. No exceptions, no excuses. Just pure authority."
                    </p>
                    <div className="flex gap-12 opacity-30 grayscale items-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A]">Verified High Performance</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A]">Habibi Approved</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
