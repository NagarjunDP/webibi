"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Menu, X, Mail, Chrome } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { scrollY } = useScroll();

    const headerHeight = useTransform(scrollY, [0, 80], ["4.5rem", "4rem"]);
    const headerBg = useTransform(scrollY, [0, 80], ["rgba(247, 247, 248, 0)", "rgba(247, 247, 248, 0.9)"]);
    const headerBorder = useTransform(scrollY, [0, 80], ["rgba(11, 13, 18, 0)", "rgba(11, 13, 18, 0.04)"]);

    useEffect(() => {
        setMounted(true);
        const updateScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", updateScroll);
        return () => window.removeEventListener("scroll", updateScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "#services" },
        { name: "Portfolio", href: "#portfolio" },
        { name: "Pricing", href: "#pricing" },
        { name: "About", href: "#about" },
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
                    "fixed top-0 left-0 right-0 z-50 flex items-center border-b transition-all duration-500 backdrop-blur-lg",
                    isScrolled ? "shadow-[0_4px_20px_-10px_rgba(11,13,18,0.05)]" : ""
                )}
            >
                <div className="container mx-auto px-6 md:px-8 h-full flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-2">
                        <span className="text-2xl lg:text-3xl font-serif font-bold tracking-[-0.05em] text-foreground transition-all group-hover:opacity-80 group-hover:tracking-[-0.06em]">
                            Webibi<span className="text-primary italic">.</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[13px] font-bold uppercase tracking-[0.15em] text-foreground/60 hover:text-foreground transition-all relative group"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-10">
                        <Link
                            href="/login"
                            className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/40 hover:text-foreground transition-all"
                        >
                            Client Login
                        </Link>
                        <Link href="#contact">
                            <Button size="lg" className="shadow-lg shadow-primary/10">
                                Get Website
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Trigger */}
                    <div className="lg:hidden flex items-center gap-6">
                        <Link
                            href="/login"
                            className="text-xs font-bold uppercase tracking-[0.1em] text-foreground/60"
                        >
                            Login
                        </Link>
                        {mounted ? (
                            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-foreground/5">
                                        <Menu className="h-6 w-6 text-foreground" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full sm:w-[440px] border-l border-foreground/5 bg-background">
                                    <SheetHeader className="sr-only">
                                        <SheetTitle>Mobile Navigation Menu</SheetTitle>
                                        <SheetDescription>
                                            Access all pages and services of Webibi agency.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-12 mt-20 px-4">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="text-4xl font-bold tracking-tighter text-foreground hover:text-primary transition-all"
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                        <div className="pt-12 flex flex-col gap-6 border-t border-foreground/5">
                                            <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                                                <Button className="w-full rounded-full h-16 text-lg font-bold bg-foreground text-background">
                                                    Get Website
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        ) : (
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-foreground/5">
                                <Menu className="h-6 w-6 text-foreground" />
                            </Button>
                        )}
                    </div>
                </div>
            </motion.header>
        </>
    );
}
