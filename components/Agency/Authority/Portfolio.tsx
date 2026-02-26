"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const projects = [
    {
        id: 1,
        title: "Srimudra Events",
        client: "Srimudra (Hyderabad)",
        category: "Event Management",
        image: "/portfolio/srimudra.png",
        year: "2024",
        url: "https://srimudraeventsandmanagement.com/",
        description: "A premium event management platform for a top Hyderabad agency, featuring elegant layouts and seamless booking flows.",
    },
    {
        id: 2,
        title: "Silverstar Events",
        client: "Silverstar Productions (Mumbai)",
        category: "Production & Management",
        image: "/portfolio/silverstar.png",
        year: "2024",
        url: "https://silverstareventsandproducitons.in",
        description: "Scale and authority for Mumbai's leading production house. High-performance design focused on large-scale event logistics.",
    },
    {
        id: 5,
        title: "Shri Events",
        client: "Shri Events Group",
        category: "Web Platform",
        image: "/portfolio/shrievents.png",
        year: "2024",
        url: "https://shrievents.vercel.app",
        description: "Streamlined web experience for a high-volume event agency, ensuring speed and clarity for clients.",
    },
    {
        id: 6,
        title: "Festora Events",
        client: "Festora Team",
        category: "Experience Design",
        image: "/portfolio/festora.png",
        year: "2023",
        url: "https://festoraevents.vercel.app",
        description: "Creating a sensory-rich digital experience that mirrors the festive atmosphere of their large-scale events.",
    },
];

export function Portfolio() {
    return (
        <section id="portfolio" className="relative pt-8 lg:pt-12 pb-24 lg:pb-32 bg-background overflow-hidden">
            <div className="container mx-auto px-6 md:px-8">
                {/* ══ CLEAN EDITORIAL HEADER ══ */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-32 mb-12 lg:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-shrink-0"
                    >
                        <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-primary/60 mb-6 font-mono">Series . 01 / Case Studies</p>
                        <h2 className="text-[clamp(3rem,7vw,7rem)] font-bold tracking-tighter text-foreground leading-[0.85] uppercase">
                            Selected <br />
                            <span className="italic font-serif normal-case text-foreground/30">Works.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="max-w-md lg:pt-20"
                    >
                        <div className="w-12 h-px bg-primary/20 mb-6" />
                        <p className="text-xl lg:text-2xl text-foreground/40 leading-relaxed font-light italic font-serif">
                            Focused on technical excellence and aesthetic authority. These are the tools we build for founders who demand more.
                        </p>
                    </motion.div>
                </div>

                {/* ══ STRUCTURED PREMIUM GRID ══ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-24 lg:gap-y-36">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
    return (
        <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: index % 2 * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative block cursor-pointer"
        >
            {/* ══ IMAGE WRAPPER ══ */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] bg-secondary border border-foreground/5 transition-all duration-1000 group-hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] group-hover:border-primary/20">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
                />

                {/* Floating Detail */}
                <div className="absolute top-6 left-6 overflow-hidden rounded-full backdrop-blur-md bg-background/80 border border-border/50 px-4 py-1.5 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-[9px] font-black uppercase tracking-widest text-foreground">{project.year} . DESIGN CRAFT</span>
                </div>

                {/* Hover Indicator */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            {/* ══ CONTENT WRAPPER ══ */}
            <div className="mt-10 flex flex-col items-start gap-4">
                <div className="flex items-center gap-4 w-full">
                    <div className="h-px flex-1 bg-foreground/5" />
                    <span className="text-[10px] font-mono text-primary/40">0{index + 1}</span>
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60 mb-1">{project.category}</p>
                    <h3 className="text-3xl lg:text-5xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-all duration-700">
                        {project.title}
                    </h3>
                </div>

                <p className="text-base text-foreground/40 max-w-sm line-clamp-2 font-light tracking-tight group-hover:text-foreground/60 transition-colors duration-700">
                    {project.description}
                </p>

                <div className="flex items-center gap-2 group/btn mt-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground/20 group-hover:text-primary transition-colors duration-500">Visit Live Website</span>
                    <ArrowUpRight className="w-4 h-4 text-foreground/10 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                </div>
            </div>
        </motion.a>
    );
}
