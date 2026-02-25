"use client";

import Link from "next/link";
import { Instagram, Linkedin, Twitter, Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-foreground text-background/60 py-16 lg:py-40 border-t border-white/5 relative overflow-hidden noise">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-16 lg:gap-32 mb-16 lg:mb-32">

                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="group flex items-center lg:items-center justify-center lg:justify-start gap-2 mb-8 lg:mb-10">
                            <span className="text-3xl lg:text-4xl font-serif font-bold tracking-[-0.05em] text-white transition-all group-hover:opacity-80 group-hover:tracking-[-0.06em]">
                                Webibi<span className="text-primary italic">.</span>
                            </span>
                        </Link>
                        <p className="text-xl lg:text-2xl leading-relaxed max-w-sm mb-10 lg:mb-12 font-serif italic text-white/50 text-center lg:text-left mx-auto lg:mx-0">
                            Creating world-class digital experiences for ambitious businesses.
                        </p>
                        <div className="flex justify-center lg:justify-start gap-4">
                            {[
                                { icon: Twitter, href: "#" },
                                { icon: Linkedin, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: Github, href: "#" },
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-foreground transition-all duration-500 hover:scale-110 shadow-lg shadow-black/20"
                                >
                                    <social.icon className="w-4 h-4 stroke-[1.2px]" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-12 lg:gap-12 text-center lg:text-left">
                        <div>
                            <p className="text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-6 lg:mb-10">Index</p>
                            <ul className="space-y-4 lg:space-y-6">
                                <li><Link href="#portfolio" className="text-xs lg:text-sm font-bold uppercase tracking-[0.1em] hover:text-white transition-colors">Portfolio</Link></li>
                                <li><Link href="#services" className="text-xs lg:text-sm font-bold uppercase tracking-[0.1em] hover:text-white transition-colors">Services</Link></li>
                                <li><Link href="#process" className="text-xs lg:text-sm font-bold uppercase tracking-[0.1em] hover:text-white transition-colors">Methodology</Link></li>
                                <li><Link href="#pricing" className="text-xs lg:text-sm font-bold uppercase tracking-[0.1em] hover:text-white transition-colors">Investment</Link></li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-6 lg:mb-10">Connect</p>
                            <ul className="space-y-4 lg:space-y-6">
                                <li><Link href="#contact" className="text-xs lg:text-sm font-bold uppercase tracking-[0.1em] hover:text-white transition-colors">Contact</Link></li>
                                <li><Link href="/login" className="text-xs lg:text-sm font-bold uppercase tracking-[0.1em] hover:text-white transition-colors">Client Login</Link></li>
                                <li><Link href="#" className="text-xs lg:text-sm font-bold uppercase tracking-[0.1em] hover:text-white transition-colors">Newsletter</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/20">
                        © 2026 Webibi Studio. Hand-crafted in Bengaluru.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/20 hover:text-white transition-colors">Legal</Link>
                        <span className="text-white/10 text-[8px]">/</span>
                        <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/20 hover:text-white transition-colors">Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
