"use client";

import { motion } from "framer-motion";
import { Star, Zap, Target, PenTool, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const outcomes = [
    {
        icon: Zap,
        title: "Unmatched Speed",
        text: "99+ Core Web Vitals score. We build for the impatient, ensuring your site loads instantly on any device.",
    },
    {
        icon: PenTool,
        title: "Editorial Excellence",
        text: "No templates. No compromises. Every layout is hand-crafted to represent your brand's unique authority.",
    },
    {
        icon: Target,
        title: "Conversion First",
        text: "Beautiful design is useless if it doesn't sell. We apply deep psychology to move visitors toward action.",
    },
    {
        icon: TrendingUp,
        title: "Growth Ready",
        text: "A digital asset that grows with you. Integrated SEO and easy-to-use backend for effortless management.",
    },
];

export function Trust() {
    return (
        <section className="section-padding bg-[#F7F7F8]">
            <div className="container mx-auto px-6 md:px-8">
                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">

                    {/* Left: Philosophy */}
                    <div className="lg:sticky lg:top-32 mb-12 lg:mb-0">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/30 mb-8">Philosophy</p>
                            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter text-foreground mb-8 lg:mb-10 leading-[0.95] text-center lg:text-left">
                                Outcome is our <br />
                                <span className="text-primary italic">Only Metric.</span>
                            </h2>
                            <p className="text-lg lg:text-xl text-foreground/50 mb-10 lg:mb-12 leading-relaxed max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                                We focus on the intersection of aesthetics and efficiency to deliver measurable business dominance.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 py-10 border-t border-foreground/5">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-[#F7F7F8] bg-slate-200 relative overflow-hidden">
                                            <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Founder" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center lg:text-left">
                                    <div className="flex items-center justify-center lg:justify-start gap-1 mb-1">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                                        ))}
                                    </div>
                                    <p className="text-[10px] md:text-sm font-bold tracking-tight text-foreground uppercase">Trusted by 50+ High-Growth Founders</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Clutch</span>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-2 h-2 fill-foreground" />)}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest">
                                    Google <span className="text-primary italic">Verified</span>
                                </div>
                                <div className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest">
                                    Stripe <span className="text-primary italic">Partner</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Outcomes Grid */}
                    <div className="grid gap-8">
                        {outcomes.map((outcome, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                                className="group p-8 lg:p-12 rounded-[2rem] lg:rounded-[3rem] bg-white border border-foreground/5 hover:shadow-[0_40px_100px_-15px_rgba(11,13,18,0.05)] transition-all duration-700 relative z-10"
                            >
                                <div className="flex flex-col sm:flex-row items-start gap-6 lg:gap-8">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <outcome.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">{outcome.title}</h3>
                                        <p className="text-lg text-foreground/50 leading-relaxed max-w-md">
                                            {outcome.text}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
