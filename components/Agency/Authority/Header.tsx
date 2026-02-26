"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, X, Mail, Chrome, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { scrollY } = useScroll();

    const headerHeight = useTransform(scrollY, [0, 80], ["5.5rem", "4.5rem"]);
    const headerBg = useTransform(scrollY, [0, 80], ["hsla(var(--background), 0)", "hsla(var(--background), 0.8)"]);
    const headerBorder = useTransform(scrollY, [0, 80], ["hsla(var(--border), 0)", "hsla(var(--border), 1)"]);

    useEffect(() => {
        setMounted(true);
        const updateScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", updateScroll, { passive: true });
        return () => window.removeEventListener("scroll", updateScroll);
    }, []);

    const navLinks = [
        { name: "Services", href: "#services" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "About", href: "#trust" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <>
            <motion.header
                style={{
                    height: headerHeight,
                    backgroundColor: headerBg,
                    borderBottomColor: headerBorder,
                }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 flex items-center border-b transition-all duration-500 backdrop-blur-xl",
                    isScrolled ? "shadow-[0_8px_30px_rgb(15,23,42,0.04)]" : ""
                )}
            >
                <div className="container mx-auto px-6 md:px-8 h-full flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-2">
                        <span className="text-2xl font-bold tracking-tighter text-foreground transition-all group-hover:opacity-80">
                            Webibi<span className="text-primary italic">.</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-all relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-8">
                        <Link
                            href="/login"
                            className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-all"
                        >
                            Client Login
                        </Link>
                        <Link href="#contact">
                            <Button className="h-11 px-8 rounded-full bg-primary hover:bg-[#1d4ed8] text-white font-bold tracking-tight shadow-lg shadow-blue-500/10 transition-all active:scale-95">
                                Start a Project
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Trigger */}
                    <div className="lg:hidden flex items-center gap-4">
                        {mounted && (
                            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="group h-10 w-10 rounded-xl hover:bg-foreground/5">
                                        <Menu className="h-5 w-5 text-foreground group-hover:scale-110 transition-transform" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[85%] sm:w-[400px] border-l border-border bg-secondary/95 backdrop-blur-2xl p-0">
                                    <SheetHeader className="sr-only">
                                        <SheetTitle>Navigation</SheetTitle>
                                        <SheetDescription>Access sections of Webibi.</SheetDescription>
                                    </SheetHeader>

                                    <div className="flex flex-col h-full">
                                        <div className="p-8 border-b border-border flex justify-between items-center">
                                            <span className="text-xl font-bold tracking-tighter text-foreground">
                                                Webibi<span className="text-primary italic">.</span>
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-8 p-10">
                                            {navLinks.map((link, idx) => (
                                                <motion.div
                                                    key={link.name}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                >
                                                    <Link
                                                        href={link.href}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="text-4xl lg:text-5xl font-bold tracking-tighter text-foreground hover:text-primary transition-all"
                                                    >
                                                        {link.name}
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="mt-auto p-10 border-t border-border bg-background/50">
                                            <div className="flex flex-col gap-6">
                                                <Link href="/login" className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                                                    Member Area
                                                </Link>
                                                <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                                                    <Button className="w-full h-16 rounded-2xl bg-primary text-white font-bold text-lg flex items-center justify-between px-8 group">
                                                        Start Your Project
                                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        )}
                    </div>
                </div>
            </motion.header>
        </>
    );
}
