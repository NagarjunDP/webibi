"use client";

import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, AlertCircle, CheckCircle2, ShieldCheck, Zap, Star } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   PAIN → SOLUTION → RELIEF SEQUENCE
───────────────────────────────────────────────────────────── */
const PAIN_SEQUENCE = [
    {
        pain: "Losing Revenue",
        detail: "to competitors with faster, better websites",
        relief: "We deliver page-1 speed in 14 days.",
        stat: "94% of visitors judge trust by web design.",
        color: "#3B82F6",
    },
    {
        pain: "Invisible on Search",
        detail: "while your rivals dominate page one",
        relief: "SEO-ready code that Google rewards.",
        stat: "75% of users never scroll past page one.",
        color: "#60A5FA",
    },
    {
        pain: "Broken Trust",
        detail: "from an outdated or non-responsive site",
        relief: "Bespoke engineering that commands authority.",
        stat: "88% of users won't return after a bad experience.",
        color: "#3B82F6",
    },
    {
        pain: "Agency Retainers",
        detail: "bleeding your budget every single month",
        relief: "₹0 monthly fees. You own everything 100%.",
        stat: "₹3–8 Lakhs/yr wasted on retainers.",
        color: "#60A5FA",
    }
];

const TICKER_EVENTS = [
    "Upgrade or be the 'Internet Explorer' of your niche.",
    "47 founders checked speed. 46 of them cried.",
    "Not 'Good Enough'. Only 'Habibi Style'.",
    "Served hot. 0ms lag, 100% spice.",
    "Warning: Portfolio causes agency dumping.",
    "Habibi, stop scrolling. Your site is cold.",
];

export function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [tickerIndex, setTickerIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // ===== Timing Configuration =====
    const SLIDE_DURATION = 6000;
    const TICKER_INTERVAL = 4500;
    const PROGRESS_UPDATE_STEP = 30;

    // ===== Slide & Progress Control Logic (Robust Linear) =====
    useEffect(() => {
        if (isPaused) return;

        let startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min(100, (elapsed / SLIDE_DURATION) * 100);

            setProgress(newProgress);

            if (newProgress >= 100) {
                setActiveIndex((prev) => (prev + 1) % PAIN_SEQUENCE.length);
                setProgress(0);
                startTime = Date.now();
            }
        }, PROGRESS_UPDATE_STEP);

        return () => clearInterval(interval);
    }, [isPaused, activeIndex]); // Stable dependency array

    useEffect(() => {
        const interval = setInterval(() => {
            setTickerIndex((prev) => (prev + 1) % TICKER_EVENTS.length);
        }, TICKER_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    // ===== Interactive Visual Effects =====
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 30, damping: 25 });
    const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 30, damping: 25 });

    const contentX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 40, damping: 30 });
    const contentY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-4, 4]), { stiffness: 40, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const r = containerRef.current?.getBoundingClientRect();
        if (!r) return;
        mouseX.set((e.clientX - r.left) / r.width - 0.5);
        mouseY.set((e.clientY - r.top) / r.height - 0.5);
    };

    // PREMIUM MESH GRADIENT - High Depth & Professional Atmosphere
    const bgStyle = {
        backgroundColor: "hsl(var(--secondary))",
        backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(37,99,235,0.06), transparent 50%),
            radial-gradient(circle at 100% 0%, rgba(245,158,11,0.04), transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(37,99,235,0.04), transparent 50%),
            radial-gradient(circle at 0% 100%, rgba(245,158,11,0.03), transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2), transparent 80%),
            linear-gradient(180deg, hsl(var(--secondary)) 0%, hsl(var(--background)) 100%)
        `
    };
    const fadeColor = "hsl(var(--background))";
    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen flex flex-col justify-center overflow-hidden"
            style={bgStyle}
        >
            {/* ══ ATMOSPHERIC LAYERS ══ */}
            <div className="absolute inset-0 z-[2] pointer-events-none">
                <motion.div
                    style={{
                        x: glowX,
                        y: glowY,
                        position: "absolute",
                        top: "-15%",
                        right: "-5%",
                        width: "80vw",
                        height: "80vw",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)",
                    }}
                    animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-0"
                    style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.01) 0%, transparent 60%)" }} />
                <div className="absolute bottom-0 left-0 right-0 h-64"
                    style={{ background: `linear-gradient(to top, ${fadeColor}, transparent)` }} />
            </div>

            {/* ══ LIVE TICKER BAR ══ */}
            <div className="absolute top-24 left-0 right-0 z-[10] flex justify-center pointer-events-none px-6">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-border bg-card/80 shadow-[0_0_20px_rgba(0,0,0,0.03)] backdrop-blur-xl max-w-full md:max-w-none"
                >
                    <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                    </span>
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={tickerIndex}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.5 }}
                            className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-800 whitespace-normal text-center md:whitespace-nowrap"
                        >
                            {TICKER_EVENTS[tickerIndex]}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* ══ MAIN CONTENT ══ */}
            <motion.div
                style={{ x: contentX, y: contentY }}
                className="container mx-auto px-6 md:px-8 relative z-[10] pt-48 pb-24 lg:pt-40 lg:pb-32"
            >
                <div className="flex flex-col md:flex-row gap-16 lg:gap-0 items-center md:items-start text-center md:text-left">

                    {/* LEFT SIDE */}
                    <div className="w-full md:w-[55%] flex-shrink-0 md:pr-16 lg:pr-28">



                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                            className="font-serif text-[clamp(2.8rem,5.6vw,5.2rem)] font-bold tracking-tight leading-[0.92] mb-10 text-[#0F172A]"
                        >
                            STOP HANDING
                            <br />
                            <span
                                className="italic"
                                style={{
                                    background: "linear-gradient(135deg, #3B82F6 0%, #93C5FD 50%, #3B82F6 100%)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundSize: "200%",
                                }}
                            >
                                REVENUE
                            </span>
                            <br />
                            To Your Competitors.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            className="text-[clamp(1rem,1.6vw,1.1rem)] leading-relaxed max-w-[500px] mb-12 font-medium text-[#475569]"
                        >
                            Stop settling for "just a website." We build elite, SEO-pioneered architectures that convert visitors into lifetime customers.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-5 mb-14 items-center md:items-start"
                        >
                            <Link href="#contact">
                                <button
                                    className="group relative inline-flex items-center justify-center gap-3.5 h-[4rem] px-10 rounded-full text-[1rem] font-bold tracking-tight overflow-hidden transition-all duration-300 active:scale-[0.97] text-white shadow-2xl shadow-blue-500/20"
                                    style={{
                                        background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                                    }}
                                >
                                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)" }} />
                                    <span className="relative z-10">Hurry Up. Get My Site</span>
                                    <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1.5" />
                                </button>
                            </Link>
                            <Link href="#portfolio">
                                <button
                                    className="inline-flex items-center justify-center h-[4rem] px-8 rounded-full text-[0.95rem] font-bold tracking-tight transition-all duration-300 active:scale-[0.97] text-[#0F172A]/40 border border-[#0F172A]/10 bg-[#0F172A]/[0.02] hover:bg-[#0F172A]/[0.05] hover:text-[#0F172A]/70 hover:border-[#0F172A]/20"
                                >
                                    See Work
                                </button>
                            </Link>
                        </motion.div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 opacity-40">
                            {[
                                { icon: Star, text: "50+ Founders", color: "text-blue-600" },
                                { icon: Zap, text: "14-Day Delivery", color: "text-emerald-600" },
                                { icon: ShieldCheck, text: "Zero Monthly Fee", color: "text-blue-600" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <item.icon className={cn("w-4 h-4", item.color)} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#0F172A]">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SEPARATOR */}
                    <div className="hidden md:block w-px self-stretch flex-shrink-0"
                        style={{ background: "linear-gradient(to bottom, transparent, rgba(15,23,42,0.05) 30%, rgba(15,23,42,0.05) 70%, transparent)" }} />

                    {/* RIGHT SIDE — ROTATOR */}
                    <div
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        className="w-full md:flex-1 md:pl-16 lg:pl-24 flex flex-col justify-center cursor-help"
                    >
                        <div className="mb-8">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 flex items-center justify-center md:justify-start gap-3 text-[#0F172A]/40"
                            >
                                <AlertCircle className="w-3.5 h-3.5 text-blue-500" />
                                Growth Analysis
                            </motion.p>
                        </div>

                        <div className="relative h-[360px] sm:h-[320px] lg:h-[340px] w-full max-w-[440px] mx-auto md:mx-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute inset-0 flex flex-col items-center md:items-start text-center md:text-left"
                                >
                                    <div className="mb-6 w-full">
                                        <div
                                            className="font-serif text-[clamp(2rem,3.4vw,2.8rem)] font-bold tracking-tight leading-[1] mb-3"
                                            style={{ color: PAIN_SEQUENCE[activeIndex].color }}
                                        >
                                            {PAIN_SEQUENCE[activeIndex].pain}
                                        </div>
                                        <div className="text-[1.1rem] font-medium tracking-tight leading-snug text-[#475569] mb-6">
                                            {PAIN_SEQUENCE[activeIndex].detail}
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center justify-center md:justify-start gap-2.5 mb-8"
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                            <span className="text-[1.05rem] font-bold text-[#0F172A]/80">{PAIN_SEQUENCE[activeIndex].relief}</span>
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        className="inline-flex flex-col gap-1 px-5 py-4 rounded-xl mb-auto bg-slate-900/[0.03] border border-slate-900/[0.08]"
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#0F172A]/40">Data Point</span>
                                        <span className="text-[12px] font-bold text-[#0F172A]/70">{PAIN_SEQUENCE[activeIndex].stat}</span>
                                    </motion.div>

                                    <div className="flex items-center gap-3 mt-10 w-full justify-center md:justify-start">
                                        {PAIN_SEQUENCE.map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-1 rounded-full bg-white/10 overflow-hidden relative"
                                                style={{ width: i === activeIndex ? "3rem" : "0.5rem", transition: "width 0.5s ease" }}
                                            >
                                                {i === activeIndex && (
                                                    <motion.div
                                                        className="absolute inset-0 bg-blue-500"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                        <span className="ml-2 text-[10px] font-black text-[#0F172A]/40 tabular-nums">
                                            0{activeIndex + 1} / 0{PAIN_SEQUENCE.length}
                                        </span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-16 sm:mt-12 pt-8 border-t border-[#0F172A]/5 flex flex-col gap-2 items-center md:items-start"
                        >
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0F172A]/40">
                                Executive Reassurance
                            </p>
                            <p className="text-[12px] font-bold text-[#475569]/60 italic">
                                “Don’t worry — most businesses start here. We fix it in weeks.”
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* BOTTOM STATS */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mt-28 lg:mt-36 pt-10 border-t border-[#0F172A]/10 flex flex-wrap justify-between gap-y-12"
                >
                    {[
                        { value: "14 Days", label: "Transformation", sub: "concept to launch" },
                        { value: "99+", label: "Performance", sub: "Core Web Vitals" },
                        { value: "50+", label: "Success Stories", sub: "founders onboarded" },
                        { value: "Zero", label: "Monthly Fees", sub: "no retainer traps" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col gap-1.5 w-1/2 md:w-auto min-w-[140px]">
                            <span className="text-[clamp(1.8rem,3vw,2.4rem)] font-bold tracking-tight text-[#0F172A] leading-none">
                                {stat.value}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0F172A]/50">
                                {stat.label}
                            </span>
                            <span className="text-[10px] font-medium text-[#0F172A]/30 italic">{stat.sub}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* SCROLL INDICATOR */}
            <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center gap-4 z-[10] pointer-events-none">
                <span
                    className="text-[9px] font-black uppercase tracking-[0.6em] text-[#0F172A]/20"
                    style={{ writingMode: "vertical-rl" }}
                >
                    Scroll
                </span>
                <div className="w-px h-14 relative overflow-hidden bg-[#0F172A]/5">
                    <motion.div
                        className="absolute inset-x-0 top-0 h-1/2"
                        style={{ background: "linear-gradient(to bottom, #3B82F6, transparent)" }}
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </div>
        </section>
    );
}