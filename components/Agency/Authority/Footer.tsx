"use client";

import Link from "next/link";
import { Instagram, Linkedin, Twitter, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="relative bg-[#0F172A] text-white/50 py-24 lg:py-40 overflow-hidden">
            {/* Subtle Gradient & Background Decor */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-16 lg:gap-24 mb-24 lg:mb-40">

                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="group flex items-center gap-2 mb-10">
                            <span className="text-3xl font-bold tracking-tighter text-white transition-opacity group-hover:opacity-80">
                                Webibi<span className="text-primary italic">.</span>
                            </span>
                        </Link>
                        <p className="text-xl leading-relaxed text-white/60 mb-10 max-w-xs font-medium tracking-tight">
                            Elevating Indian brands with world-class digital craft and performance engineering.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Twitter, href: "#" },
                                { icon: Linkedin, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: Github, href: "#" },
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:bg-white hover:text-[#0F172A] hover:border-white transition-all duration-500"
                                >
                                    <social.icon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <p className="text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-10">Capabilities</p>
                        <ul className="space-y-5">
                            <li><Link href="#services" className="text-xs font-bold uppercase tracking-[0.1em] hover:text-primary transition-colors">Digital Strategy</Link></li>
                            <li><Link href="#services" className="text-xs font-bold uppercase tracking-[0.1em] hover:text-primary transition-colors">Product Design</Link></li>
                            <li><Link href="#portfolio" className="text-xs font-bold uppercase tracking-[0.1em] hover:text-primary transition-colors">Performance Dev</Link></li>
                            <li><Link href="#portfolio" className="text-xs font-bold uppercase tracking-[0.1em] hover:text-primary transition-colors">Brand Identity</Link></li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-10">Studio</p>
                        <ul className="space-y-5">
                            <li><Link href="#trust" className="text-xs font-bold uppercase tracking-[0.1em] hover:text-primary transition-colors">Our Ethos</Link></li>
                            <li><Link href="#portfolio" className="text-xs font-bold uppercase tracking-[0.1em] hover:text-primary transition-colors">Works</Link></li>
                            <li><Link href="/login" className="text-xs font-bold uppercase tracking-[0.1em] hover:text-primary transition-colors">Client Area</Link></li>
                            <li><Link href="#contact" className="text-xs font-bold uppercase tracking-[0.1em] hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* CTA Column */}
                    <div className="p-8 lg:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <p className="text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-6">Have a project?</p>
                        <h4 className="text-2xl font-bold text-white mb-8 tracking-tighter">Let&apos;s build something <span className="text-primary italic">exceptional.</span></h4>
                        <Link href="#contact">
                            <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-[#1d4ed8] text-white font-bold flex items-center justify-between px-6 group">
                                Start Thinking
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
                        © 2026 Webibi Studio. Engineered for performance.
                    </p>
                    <div className="flex items-center gap-8">
                        <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 hover:text-white transition-colors">Legal</Link>
                        <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 hover:text-white transition-colors">Security</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
