"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Sparkles } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const projects = [
    {
        id: 1,
        title: "The Modern Apothecary",
        client: "Apothecary & Co",
        category: "Visual Identity",
        image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1200&auto=format&fit=crop",
        year: "2024",
        description: "A complete digital transformation for a heritage wellness brand, focusing on editorial elegance and conversion-driven storytelling.",
    },
    {
        id: 2,
        title: "Lunar Systems",
        client: "Lunar Tech",
        category: "Product Design",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
        year: "2024",
        description: "Designing the interface for the next generation of space exploration and data visualization platforms.",
    },
    {
        id: 3,
        title: "Verve Architecture",
        client: "Verve Studio",
        category: "Web Platform",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
        year: "2023",
        description: "A minimalist web experience that showcases architectural masterpieces through light, shadow, and spacious design.",
    },
    {
        id: 4,
        title: "Solis Energy",
        client: "Solis Corp",
        category: "Brand Strategy",
        image: "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?q=80&w=1200&auto=format&fit=crop",
        year: "2023",
        description: "Positioning a renewable energy leader for global expansion through a powerful visual and strategic brand refresh.",
    },
    {
        id: 5,
        title: "Nimbus Cloud",
        client: "Nimbus Tech",
        category: "SaaS Design",
        image: "https://images.unsplash.com/photo-1517433447743-8be36fca9967?q=80&w=1200&auto=format&fit=crop",
        year: "2024",
        description: "Streamlining complex cloud infrastructure data into a simple, high-performance dashboard experience.",
    },
    {
        id: 6,
        title: "Aura Lifestyle",
        client: "Aura Brand",
        category: "E-Commerce",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
        year: "2023",
        description: "Creating a sensory-rich digital shopping experience that bridges the gap between luxury and accessibility.",
    },
];

export function Portfolio() {
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Smooth physics
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Phase 1-2: Layered Stacking (0.0 to 0.4)
    // First card starts center, moves left. Others slide in from right and overlap.
    const stackX = useTransform(smoothProgress, [0, 0.4], ["0%", "-60%"]);

    // Phase 3: 3D Perspective Flip (0.4 to 0.6)
    const rotateX = useTransform(smoothProgress, [0.4, 0.6], [0, 15]);
    const rotateY = useTransform(smoothProgress, [0.4, 0.6], [0, -10]);
    const z = useTransform(smoothProgress, [0.4, 0.6], [0, -300]);

    // Phase 4: Grid Resolution (0.6 to 0.8)
    const gridOpacity = useTransform(smoothProgress, [0.6, 0.75], [0, 1]);
    const stackOpacity = useTransform(smoothProgress, [0.7, 0.8], [1, 0]);
    const gridY = useTransform(smoothProgress, [0.6, 0.8], [100, 0]);

    return (
        <section ref={sectionRef} id="portfolio" className="relative h-[600vh] bg-[#F7F7F8]">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden perspective-[2000px]">

                <div className="container mx-auto px-6 md:px-8 relative z-30 pointer-events-none">
                    <motion.div
                        style={{ opacity: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
                        className="mb-8 lg:mb-12"
                    >
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/30 mb-4 lg:mb-6">Portfolio</p>
                        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-4">
                            The Human <span className="text-primary italic font-serif">Masterpiece.</span>
                        </h2>
                    </motion.div>
                </div>

                {/* STACKED PHASE (Phases 1-3) */}
                <motion.div
                    style={{
                        opacity: stackOpacity,
                        rotateX,
                        rotateY,
                        translateZ: z,
                        pointerEvents: useTransform(smoothProgress, [0.7, 0.71], ["auto", "none"])
                    }}
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-visible"
                >
                    <motion.div
                        style={{ x: stackX }}
                        className="flex gap-20 lg:gap-32 px-[10vw] items-center"
                    >
                        {projects.slice(0, 4).map((project, index) => (
                            <motion.div
                                key={project.id}
                                style={{
                                    scale: useTransform(smoothProgress, [0, 0.15], [0.8, 1]),
                                    x: useTransform(smoothProgress, [0.1, 0.4], [0, index * -50]), // Stacking overlap
                                    zIndex: 10 - index
                                }}
                                className="relative shrink-0 w-[85vw] lg:w-[60vw] aspect-[4/3] lg:aspect-[16/10] rounded-[2rem] lg:rounded-[3rem] bg-white border border-foreground/5 shadow-[0_50px_150px_-30px_rgba(11,13,18,0.15)] overflow-hidden group cursor-pointer"
                                onClick={() => setSelectedProject(project)}
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    priority={index === 0}
                                    sizes="(max-width: 768px) 85vw, 60vw"
                                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/80 via-transparent to-transparent opacity-0 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12">
                                        <p className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-primary mb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">{project.category}</p>
                                        <h4 className="text-2xl lg:text-5xl font-bold tracking-tighter text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-200">{project.title}</h4>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* GRID PHASE (Phases 4-5) */}
                <motion.div
                    style={{
                        opacity: gridOpacity,
                        y: gridY,
                        pointerEvents: useTransform(smoothProgress, [0.7, 0.71], ["none", "auto"])
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center pt-24"
                >
                    <div className="container mx-auto px-8 max-h-[80vh] overflow-y-auto no-scrollbar">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                                    className="group relative aspect-[1.4] rounded-[2rem] bg-white border border-foreground/5 shadow-sm overflow-hidden cursor-pointer"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 z-10 bg-gradient-to-t from-white/95 via-white/40 to-transparent">
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#0B0D12]/40 mb-1 lg:mb-2">{project.category}</p>
                                                <h4 className="text-xl lg:text-2xl font-bold tracking-tight text-[#0B0D12]">{project.title}</h4>
                                            </div>
                                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#0B0D12] flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                                                <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* MODAL / PROJECT DETAIL */}
                <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
                    <DialogContent className="max-w-6xl h-[90vh] p-0 rounded-[4rem] overflow-hidden bg-white border-0">
                        <DialogHeader className="sr-only">
                            <DialogTitle>{selectedProject?.title}</DialogTitle>
                            <DialogDescription>{selectedProject?.description}</DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col lg:flex-row h-full">
                            <div className="lg:w-1/2 relative h-1/2 lg:h-full">
                                {selectedProject && (
                                    <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <div className="lg:w-1/2 p-8 lg:p-24 flex flex-col justify-center bg-white overflow-y-auto">
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-6 right-6 lg:top-10 lg:right-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-foreground/5 flex items-center justify-center hover:bg-foreground hover:text-white transition-all duration-500 z-50 bg-white/50 backdrop-blur-sm"
                                >
                                    <X className="w-4 h-4 lg:w-5 lg:h-5" />
                                </button>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <div className="inline-flex items-center gap-2 mb-6 lg:mb-10 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                                        <Sparkles className="w-3.5 h-3.5 fill-primary" />
                                        Case Study — {selectedProject?.year}
                                    </div>

                                    <h2 className="text-4xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[0.95] mb-6 lg:mb-8">
                                        {selectedProject?.title}
                                    </h2>

                                    <div className="grid grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12 py-8 lg:py-12 border-y border-foreground/5">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-2">Client</p>
                                            <p className="text-lg lg:text-xl font-bold tracking-tight">{selectedProject?.client}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-2">Category</p>
                                            <p className="text-lg lg:text-xl font-bold tracking-tight">{selectedProject?.category}</p>
                                        </div>
                                    </div>

                                    <p className="text-lg lg:text-xl text-foreground/50 leading-relaxed mb-8 lg:mb-12 font-serif italic">
                                        {selectedProject?.description}
                                    </p>

                                    <button className="h-14 lg:h-16 px-10 lg:px-12 rounded-full bg-foreground text-white font-bold tracking-tight hover:bg-primary transition-all duration-500">
                                        View Live Experience
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Perspective depth indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8">
                    <motion.div
                        style={{ height: "1px", width: useTransform(smoothProgress, [0, 1], ["0px", "128px"]), backgroundColor: "rgba(11, 13, 18, 0.1)" }}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/20">
                        Scroll Momentum
                    </span>
                    <motion.div
                        style={{ height: "1px", width: useTransform(smoothProgress, [0, 1], ["0px", "128px"]), backgroundColor: "rgba(11, 13, 18, 0.1)" }}
                    />
                </div>
            </div>
        </section>
    );
}
