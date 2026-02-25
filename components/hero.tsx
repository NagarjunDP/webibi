"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Globe, Command, Zap } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
  AnimatePresence,
} from "framer-motion";

function useSmooth(v: MotionValue<number>) {
  return useSpring(v, { stiffness: 45, damping: 25, mass: 1 });
}

function TechnicalNote({ label, value, delay = 0 }: { label: string; value: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 + delay, duration: 1 }}
      className="flex flex-col gap-1"
    >
      <span className="text-[8px] font-black uppercase tracking-[0.4em] text-primary/40 leading-none">
        {label}
      </span>
      <span className="text-[9px] font-mono text-foreground/40 leading-none">
        {value}
      </span>
    </motion.div>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  const p = useSmooth(scrollYProgress);

  // Parallax shifts
  const textY = useTransform(p, [0, 1], [0, -60]);
  const textureY = useTransform(p, [0, 1], [0, 100]);
  const ghostX = useTransform(p, [0, 1], [0, 40]);
  const bgOpacity = useTransform(p, [0, 0.5], [1, 0.4]);

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-background">
      {/* 
        BESPOKE TEXTURE LAYER
        Replaces programmatic gradients with artisanal texture
      */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: textureY, opacity: bgOpacity }}
      >
        <div className="absolute inset-0 bg-[#0A0A0B]" />
        <img
          src="/assets/obsidian_texture.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay scale-110"
        />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.12),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(15,23,42,0.4),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      {/* Grid Overlay - Fixed and subtle */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] [background-size:4rem_4rem]" />
      </div>

      <div className="relative w-full max-w-[1700px] mx-auto px-8 lg:px-20 pb-20 lg:pb-32 z-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-end">

          {/* PRIMARY HEADLINE ZONE - ASYMMETRIC */}
          <div className="relative">
            {/* Technical Header */}
            <div className="flex items-end gap-12 mb-16 overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4"
              >
                <span className="text-4xl font-serif italic text-primary/20">01</span>
                <div className="w-12 h-[1px] bg-primary/20" />
              </motion.div>

              <div className="flex gap-10">
                <TechnicalNote label="Status" value="AVAILABLE.PRODUCTION" delay={0.1} />
                <TechnicalNote label="Origin" value="LAT12.97 / LONG77.59" delay={0.2} />
                <TechnicalNote label="Core" value="DIGITAL_ARCHITECTURE" delay={0.3} />
              </div>
            </div>

            <motion.div style={{ y: textY }}>
              <h1 className="relative font-serif text-[10vw] lg:text-[9.5rem] leading-[0.82] tracking-[-0.06em] text-foreground mb-12">
                {/* Ghost Layer - Suggests human depth/shadow study */}
                <motion.span
                  style={{ x: ghostX }}
                  className="absolute -top-4 -left-4 text-primary/[0.04] italic select-none pointer-events-none"
                >
                  Digital Art
                </motion.span>

                <span className="block relative z-10">Digital</span>
                <span className="block relative z-10 italic translate-x-[0.05em] text-muted-foreground/40">Architecture</span>
                <span className="block relative z-10 tracking-[-0.08em] lg:-translate-x-[0.02em]">for the Elite.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="max-w-xl"
            >
              <p className="text-xl lg:text-2xl text-muted-foreground/80 font-serif italic leading-relaxed mb-16">
                We build uncompromising digital infrastructure for brands that reject the generic.
                Expert design, orchestrated for impact.
              </p>

              <div className="flex flex-wrap items-center gap-12">
                <Link
                  href="#contact"
                  className="group relative inline-flex items-center gap-6 pr-4 active:scale-[0.98] transition-transform"
                >
                  <div className="relative w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center overflow-hidden group-hover:border-primary/60 transition-colors">
                    <ArrowRight className="w-5 h-5 text-primary transition-transform group-hover:translate-x-1" />
                    <motion.div
                      className="absolute inset-0 bg-primary/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-foreground mb-1">Engage Studio</span>
                    <span className="block text-xs text-muted-foreground/60">Start your architecture.</span>
                  </div>
                </Link>

                <div className="h-12 w-[1px] bg-border/40 hidden sm:block" />

                <Link
                  href="#work"
                  className="group flex flex-col items-start gap-1 opacity-40 hover:opacity-100 transition-all"
                >
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] mb-1">The Archives</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    <span className="text-xs font-mono lowercase">042_projects.view()</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* SECONDARY INFO - ASYMMETRIC TENSION */}
          <div className="flex flex-col gap-24 lg:pl-12 lg:border-l lg:border-border/10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                  <Command className="w-3 h-3" /> System Ready
                </span>
                <p className="text-sm text-muted-foreground/70 leading-relaxed font-mono italic">
                  // Our philosophy is rooted in the belief that digital presence is not a commodity, but a craft.
                  Every byte is deliberate.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-2">
                  <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Execution</span>
                  <span className="block text-3xl font-serif text-foreground">98.2%</span>
                </div>
                <div className="space-y-2">
                  <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Latency</span>
                  <span className="block text-3xl font-serif text-foreground">14ms</span>
                </div>
              </div>
            </motion.div>

            {/* Visual Element - Suggests complex human involvement */}
            <div className="relative aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-2xl group border border-white/5 shadow-2xl">
              <motion.div
                className="absolute inset-0 pointer-events-none"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src="/assets/obsidian_texture.png"
                  className="w-full h-full object-cover saturate-50 opacity-40 group-hover:opacity-100 group-hover:saturate-100 transition-all duration-1000"
                  alt="Studio Texture"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="block text-[8px] font-mono text-primary mb-2">SCAN_READY_001</span>
                <p className="text-[10px] font-bold text-white uppercase tracking-widest leading-tight">
                  Uncompromising <br /> Detail Study
                </p>
              </div>

              {/* Hover Micro-interaction */}
              <div className="absolute top-4 right-4 animate-pulse">
                <Globe className="w-4 h-4 text-primary opacity-40" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* DYNAMIC SCROLL ANNOTATION */}
      <motion.div
        className="absolute bottom-12 right-12 flex items-center gap-6 pointer-events-none"
        style={{ opacity: useTransform(p, [0, 0.1], [1, 0]) }}
      >
        <span className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-[0.5em] [writing-mode:vertical-rl]">
          Scroll to explore
        </span>
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-primary"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}