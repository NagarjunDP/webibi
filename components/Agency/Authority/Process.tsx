"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket, ShieldCheck } from "lucide-react";

const STEPS = [
    {
        title: "Discovery",
        description: "We deep-dive into your business goals, target audience, and competition to map out a clear digital strategy.",
        icon: Search,
        color: "bg-blue-500/10 text-blue-500"
    },
    {
        title: "Architecture",
        description: "Bespoke wireframing and technical planning to ensure a scalable, future-proof site structure.",
        icon: ShieldCheck,
        color: "bg-purple-500/10 text-purple-500"
    },
    {
        title: "Design",
        description: "Premium, human-crafted UI/UX that captures your brand's essence and builds instant credibility.",
        icon: PenTool,
        color: "bg-pink-500/10 text-pink-500"
    },
    {
        title: "Engineering",
        description: "Clean, SEO-ready code with lightning-fast performance and zero dependency on monthly retainers.",
        icon: Code2,
        color: "bg-emerald-500/10 text-emerald-500"
    },
    {
        title: "Launch",
        description: "Final optimization, deployment to global CDN, and handoff of full ownership and source code.",
        icon: Rocket,
        color: "bg-orange-500/10 text-orange-500"
    }
];

export default function Process() {
    return (
        <section id="process" className="section-padding bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="container mx-auto px-6 md:px-8">
                <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-24">
                    <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/30 mb-6">Execution</p>
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter text-foreground mb-6">
                        A Transparent <br />
                        <span className="text-primary italic font-serif">Journey.</span>
                    </h2>
                    <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
                        From initial audit to final launch, we follow a rigorous 5-step process designed for clarity, speed, and ownership.
                    </p>
                </div>

                <div className="grid md:grid-cols-5 gap-8 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-px bg-foreground/5" />

                    {STEPS.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            <div className={`${step.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 relative z-10 border border-foreground/5 group-hover:scale-110 transition-transform duration-500`}>
                                <step.icon className="w-8 h-8" />
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background border border-foreground/10 flex items-center justify-center text-[10px] font-black text-foreground/40">
                                    0{index + 1}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">{step.title}</h3>
                            <p className="text-sm text-foreground/40 leading-relaxed font-medium">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Footer */}
                <div className="mt-16 lg:mt-24 pt-12 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-foreground">100% Satisfaction Guarantee</p>
                            <p className="text-xs text-foreground/40">We work until you are obsessed with the result.</p>
                        </div>
                    </div>
                    <div className="flex gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder for small certification badges if needed */}
                        <span className="text-[10px] font-bold uppercase tracking-widest">ISO 9001:2015</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Google Partner</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
