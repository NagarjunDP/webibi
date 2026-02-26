"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
    {
        number: "01",
        title: "Product Design",
        category: "Visual Identity & UX",
        description: "Bespoke digital foundations for founders who value excellence. We build identities that command instant trust.",
    },
    {
        number: "02",
        title: "Technical Architecture",
        category: "Next.js & React",
        description: "Next-gen engineering that prioritizes speed and long-term ownership. Zero retainers, absolute technical authority.",
    },
    {
        number: "03",
        title: "Performance Infra",
        category: "Speed & SEO",
        description: "Optimized for 99+ PageSpeed scores. We translate technical excellence into literal business growth.",
    },
    {
        number: "04",
        title: "The Habibi Principle",
        category: "100% Ownership",
        description: "Zero fluff. Full source code access. We don't build subscribers; we build digital empires for founders.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        filter: "blur(8px)"
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

export function Features() {
    return (
        <section id="services" className="relative py-20 lg:py-32 bg-secondary overflow-hidden">
            <div className="container mx-auto px-6 md:px-8 relative z-10">
                {/* ══ CLEAN EDITORIAL HEADER ══ */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 lg:gap-32 mb-16 lg:mb-20">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={itemVariants}
                        className="flex-shrink-0"
                    >
                        <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary/40 mb-8 font-mono">Expertise . 02</p>
                        <h2 className="text-[clamp(3.5rem,8vw,7.5rem)] font-bold tracking-tighter text-foreground leading-[0.85] uppercase">
                            Boutique <br />
                            <span className="text-foreground/20 italic font-serif normal-case">Solutions.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={itemVariants}
                        className="max-w-md lg:pt-24"
                    >
                        <div className="w-12 h-px bg-primary/20 mb-8" />
                        <p className="text-xl lg:text-2xl text-foreground/40 leading-relaxed font-light italic font-serif">
                            Focused technical craftsmanship for founders who prioritize absolute authority over generic vanity metrics.
                        </p>
                    </motion.div>
                </div>

                {/* ══ SERVICE LIST ══ */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-16 lg:gap-y-32"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative flex flex-col items-start"
                        >
                            <div className="flex items-center gap-4 mb-6 w-full">
                                <span className="text-[10px] font-mono text-primary/20 uppercase tracking-[0.3em] font-bold">
                                    {service.number}
                                </span>
                                <div className="h-px flex-1 bg-foreground/5" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-primary/40 group-hover:text-primary transition-colors duration-700">
                                    {service.category}
                                </span>
                            </div>

                            <h3 className="text-3xl lg:text-5xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors duration-700 mb-6">
                                {service.title}
                            </h3>

                            <p className="text-lg lg:text-xl text-foreground/40 leading-snug font-light tracking-tight transition-colors duration-700 group-hover:text-foreground/60 max-w-md">
                                {service.description}
                            </p>

                            <div className="mt-8 overflow-hidden rounded-full w-0 group-hover:w-full h-px bg-primary/20 transition-all duration-1000 ease-out" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* ══ FINAL CTA ══ */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={itemVariants}
                    className="mt-32 lg:mt-56 border-t border-foreground/5 pt-20 flex flex-col md:flex-row items-baseline justify-between gap-12"
                >
                    <div className="max-w-md">
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/40 mb-4">Phase . Next</p>
                        <p className="text-3xl lg:text-5xl font-bold tracking-tighter text-foreground/10 leading-none">
                            Ready to scale your digital presence?
                        </p>
                    </div>
                    <Link href="#contact" className="group">
                        <span className="text-2xl lg:text-6xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors duration-700 flex items-center gap-8">
                            Start Project
                            <ArrowUpRight className="w-8 h-8 lg:w-16 lg:h-16 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700 ease-out text-primary/20 group-hover:text-primary" />
                        </span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
