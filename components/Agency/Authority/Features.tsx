"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
    {
        number: "01",
        title: "Bespoke Design & Identity",
        description: "Premium, human-crafted UI/UX for Indian startups. We build high-end visual identities that build instant trust and credibility for your brand.",
    },
    {
        number: "02",
        title: "Affordable High-End Engineering",
        description: "Next-generation technical excellence at affordable prices. We build fast, SEO-ready websites with absolute zero monthly retainers.",
    },
    {
        number: "03",
        title: "E-Commerce Success",
        description: "Transform your business with high-conversion e-commerce solutions. Optimized for mobile shoppers and lightning-fast transactions.",
    },
    {
        number: "04",
        title: "SEO & Growth Dominance",
        description: "Don't just launch, rank. Our search engine optimized architectures ensure you stay ahead of the competition on Google and beyond.",
    },
];

export function Features() {
    return (
        <section id="services" className="section-padding bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-8">

                {/* Asymmetrical Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-12 mb-16 lg:mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-xl text-center lg:text-left"
                    >
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/30 mb-6 lg:mb-8">What we do</p>
                        <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[1] lg:leading-[0.9]">
                            Designing the <br />
                            <span className="text-foreground/20 italic font-serif">Future of Trust.</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="text-lg lg:text-xl text-foreground/50 max-w-sm lg:mb-4 text-center lg:text-left mx-auto lg:mx-0"
                    >
                        We don't just build websites; we craft authority. Every pixel is intentional, every interaction is earned.
                    </motion.p>
                </div>

                {/* Typography-led List */}
                <div className="grid border-t border-foreground/5">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                            className="group relative flex flex-col lg:grid lg:grid-cols-[100px_1fr_auto] items-center lg:items-center gap-6 lg:gap-12 py-10 lg:py-16 border-b border-foreground/5 hover:bg-[#F7F7F8] transition-colors px-6 lg:px-12 lg:-mx-12 rounded-[2rem]"
                        >
                            <span className="text-xl font-bold text-foreground/20 font-serif italic uppercase tracking-widest leading-none">
                                {service.number}
                            </span>

                            <div className="max-w-2xl text-center lg:text-left">
                                <h3 className="text-2xl lg:text-5xl font-bold tracking-tighter text-foreground mb-3 lg:mb-4 group-hover:translate-x-4 transition-transform duration-700">
                                    {service.title}
                                </h3>
                                <p className="text-base lg:text-lg text-foreground/40 max-w-lg transition-colors group-hover:text-foreground/60 duration-500">
                                    {service.description}
                                </p>
                            </div>

                            <div className="w-16 h-16 rounded-full border border-foreground/5 flex items-center justify-center group-hover:bg-foreground group-hover:text-white transition-all duration-500 scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100">
                                <ArrowUpRight className="w-6 h-6" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Final Callout (Asymmetrical) */}
                <div className="mt-32 flex justify-end">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-primary/5 p-8 lg:p-20 rounded-[2rem] lg:rounded-[3rem] max-w-2xl w-full"
                    >
                        <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground mb-6">Need a custom solution?</h3>
                        <p className="text-base lg:text-lg text-foreground/60 mb-10 leading-relaxed">
                            If your vision doesn't fit into a box, we'll build a new one. We specialize in high-complexity digital products that require deep design thinking.
                        </p>
                        <Link href="#contact" className="text-primary font-bold tracking-widest uppercase text-[10px] md:text-xs flex items-center justify-center lg:justify-start gap-3 group">
                            Book a discovery call
                            <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

import Link from "next/link";
