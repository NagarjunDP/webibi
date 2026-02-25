"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextPart {
    text: string;
    highlight?: boolean;
    weight?: 'bold' | 'light';
}

interface TextLine {
    parts: TextPart[];
}

interface SequenceStep {
    lines: TextLine[];
}

const SEQUENCE: SequenceStep[] = [
    {
        lines: [
            { parts: [{ text: "Bespoke", weight: 'bold' }, { text: "Digital", highlight: true }] },
            { parts: [{ text: "Architecture.", weight: 'bold' }] }
        ]
    },
    {
        lines: [
            { parts: [{ text: "Zero", highlight: true }, { text: "Monthly", weight: 'light' }] },
            { parts: [{ text: "Retainers.", weight: 'bold' }] }
        ]
    },
    {
        lines: [
            { parts: [{ text: "You Own", weight: 'light' }] },
            { parts: [{ text: "Your Soul.", highlight: true }] }
        ]
    },
    {
        lines: [
            { parts: [{ text: "Premium", weight: 'bold' }] },
            { parts: [{ text: "Engineering.", highlight: true }] }
        ]
    },
    {
        lines: [
            { parts: [{ text: "WEBIBI", highlight: true }] },
            { parts: [{ text: "Studio.", weight: 'light' }] }
        ]
    }
];

export function Hero() {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % SEQUENCE.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for parallax
    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex items-center pt-20 pb-12 lg:pt-32 lg:pb-24 overflow-hidden bg-background"
        >
            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24 items-center">

                    {/* Left: Editorial Content - Stabilized with min-w-0 */}
                    <div className="max-w-2xl text-center lg:text-left min-w-0">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-[80px] xl:text-[100px] font-bold tracking-tight text-foreground leading-[0.95] md:leading-[0.9] mb-6 md:mb-8 text-balance">
                                Websites That Make Businesses Look <span className="text-primary italic">Premium.</span>
                            </h1>

                            <p className="text-base md:text-lg lg:text-xl text-foreground/60 mb-8 md:mb-10 leading-relaxed max-w-[90%] md:max-w-[85%] mx-auto lg:mx-0">
                                We craft intentional digital experiences for founders who value excellence. No templates, just pure, human-designed precision.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
                                <Link href="#contact">
                                    <Button className="rounded-full px-10 md:px-12 h-14 md:h-16 bg-foreground hover:bg-foreground/90 text-background text-base md:text-lg font-bold transition-all active:scale-[0.98] shadow-2xl shadow-foreground/10">
                                        Get Website
                                    </Button>
                                </Link>
                                <Link href="#portfolio" className="group">
                                    <Button variant="ghost" className="rounded-full px-8 md:px-10 h-14 md:h-16 text-base md:text-lg font-bold text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all">
                                        View Work
                                        <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Ultra Premium Cinematic Typography - Stabilized with overflow management */}
                    <div
                        className="relative mt-8 md:mt-20 lg:mt-0 flex items-center justify-center h-[400px] md:h-[500px] lg:h-[600px] min-w-0 overflow-visible"
                        style={{ perspective: 1200 }}
                    >

                        {/* Ambient Glow */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[120%] h-[120%] bg-primary/10 rounded-full blur-[100px] md:blur-[160px]" />
                        </div>

                        <div className="relative z-10 w-full max-w-xl text-center lg:text-left flex items-center justify-center lg:justify-start h-[300px] md:h-[350px] lg:h-[400px]">

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}

                                    initial={{
                                        opacity: 0,
                                        scale: 0.2,
                                        y: 100,
                                        rotateX: 45,
                                        rotateY: -15,
                                        filter: "blur(60px)",
                                    }}

                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: 0,
                                        rotateX: 0,
                                        rotateY: 0,
                                        filter: "blur(0px)",
                                        transition: {
                                            duration: 1.4,
                                            ease: [0.16, 1, 0.3, 1],
                                            delay: 0.1
                                        }
                                    }}

                                    exit={{
                                        opacity: 0,
                                        scale: 0.8,
                                        y: 80,
                                        rotateX: -15,
                                        filter: "blur(80px) brightness(2.5)",
                                        transition: {
                                            duration: 1,
                                            ease: [0.33, 1, 0.68, 1] // Custom snappy easing
                                        }
                                    }}

                                    style={{
                                        transformStyle: "preserve-3d"
                                    }}

                                    className="w-full"
                                >

                                    <motion.div
                                        animate={{
                                            y: [0, -8, 0],
                                            rotateZ: [0, 0.3, 0],
                                            scale: [1, 1.01, 1]
                                        }}
                                        transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="w-full"
                                    >

                                        <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1] md:leading-[0.95] perspective-1000 w-full">

                                            {SEQUENCE[activeStep].lines.map((line: TextLine, i: number) => (
                                                <div key={i} className="mb-1 md:mb-2 text-center lg:text-left">

                                                    <motion.div
                                                        initial={{ y: "150%", x: -10, opacity: 0, rotateX: 30 }}
                                                        animate={{ y: "0%", x: 0, opacity: 1, rotateX: 0 }}
                                                        transition={{
                                                            delay: 0.4 + i * 0.2,
                                                            duration: 1.2,
                                                            ease: [0.16, 1, 0.3, 1]
                                                        }}
                                                        style={{ transformOrigin: "bottom center" }}
                                                    >
                                                        {line.parts.map((part: TextPart, j: number) => (
                                                            <span
                                                                key={j}
                                                                className={cn(
                                                                    "inline-block",
                                                                    part.highlight
                                                                        ? "text-primary italic drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
                                                                        : "text-foreground",
                                                                    part.weight === "light" && "font-light opacity-60"
                                                                )}
                                                            >
                                                                {part.text}{" "}
                                                            </span>
                                                        ))}
                                                    </motion.div>

                                                </div>
                                            ))}

                                        </div>

                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>

                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator (Asymmetrical) */}
            <div className="absolute bottom-12 left-8 md:left-auto md:right-8 flex flex-col items-center gap-4 text-foreground/20">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] rotate-90 origin-left mt-12 mb-4">Explore</span>
                <div className="w-px h-12 bg-foreground/10" />
            </div>
        </section>
    );
}