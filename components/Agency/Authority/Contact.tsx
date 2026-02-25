"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, MapPin, CheckCircle2 } from "lucide-react";
import ContactForm from "./ContactForm";

const TRUST_POINTS = [
    "Free 30-minute consultation",
    "Transparent, fixed-rate pricing",
    "Fast delivery & rapid response",
    "Dedicated premium support"
];

export function Contact() {
    return (
        <section id="contact" className="section-padding bg-[#F8F9FA] overflow-hidden">
            <div className="container mx-auto px-6 md:px-8">
                <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">

                    {/* Left Side: Impact Copy & Trust */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/30 mb-8">Get in Touch</p>
                        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground mb-8 leading-[0.95]">
                            Let’s Build Your <br />
                            <span className="text-primary italic font-serif">Future Masterpiece.</span>
                        </h2>
                        <p className="text-lg lg:text-xl text-foreground/50 mb-12 leading-relaxed max-w-lg">
                            Tell us about your business goals and we’ll suggest a bespoke technical solution tailored for your success.
                        </p>

                        <div className="space-y-6 mb-16">
                            {TRUST_POINTS.map((point, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-bold text-foreground/70">{point}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8 pt-12 border-t border-foreground/5">
                            <div className="space-y-4">
                                <p className="text-[10px] uppercase tracking-widest text-foreground/30 font-bold">Direct Line</p>
                                <a href="tel:+919876543210" className="flex items-center gap-3 text-lg font-bold text-foreground hover:text-primary transition-colors">
                                    <Phone className="w-5 h-5" />
                                    +91 98765 43210
                                </a>
                                <a href="https://wa.me/919876543210" className="flex items-center gap-3 text-lg font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                                    <MessageSquare className="w-5 h-5 fill-current" />
                                    WhatsApp Us
                                </a>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] uppercase tracking-widest text-foreground/30 font-bold">Email</p>
                                <a href="mailto:hello@digitalempire.studio" className="flex items-center gap-3 text-lg font-bold text-foreground hover:text-primary transition-colors">
                                    <Mail className="w-5 h-5" />
                                    hello@digitalempire.studio
                                </a>
                                <div className="flex items-center gap-3 text-lg font-bold text-foreground/40">
                                    <MapPin className="w-5 h-5" />
                                    Bengaluru, India
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Premium Form Card */}
                    <div id="contact-form" className="relative">
                        {/* Decorative background element */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}

