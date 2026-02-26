"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Starter",
        price: "499",
        description: "The essential digital foundation for emerging businesses.",
        features: ["Bespoke 5-Page Design", "Mobile Optimization", "Core SEO Setup", "Contact Integration", "30 Days Support"],
        featured: false,
    },
    {
        name: "Business",
        price: "999",
        description: "A comprehensive solution for brands ready to dominate.",
        features: ["Up to 10 Bespoke Pages", "Advanced SEO Strategy", "Growth Analytics", "Priority Engineering", "90 Days Support"],
        featured: true,
    },
    {
        name: "Premium",
        price: "1,999",
        description: "Uncompromising quality for industry leaders.",
        features: ["Unlimited Design Pages", "Custom Interactions", "Bespoke Animations", "24/7 Priority Access", "Lifetime Core Updates"],
        featured: false,
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="section-padding bg-background">
            <div className="container mx-auto px-6 md:px-8">

                <div className="max-w-4xl mb-16 lg:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center lg:text-left"
                    >
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/30 mb-8">Investment</p>
                        <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[1] lg:leading-[0.95] mb-8 lg:mb-10">
                            Transparent <br />
                            <span className="text-foreground/20 italic font-serif">Fixed Value.</span>
                        </h2>
                        <p className="text-lg lg:text-xl text-foreground/50 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            No hidden fees. No recurring maintenance. You own your digital soul 100% from the moment we launch.
                        </p>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index === 0 ? -30 : index === 2 ? 30 : 0, y: 40 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                            className={cn(
                                "relative flex flex-col p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] transition-all duration-700",
                                plan.featured
                                    ? "bg-foreground text-background shadow-[0_50px_100px_-20px_rgba(11,13,18,0.3)] z-10"
                                    : "bg-white border border-foreground/5 hover:shadow-[0_40px_100px_-15px_rgba(11,13,18,0.05)]"
                            )}
                        >
                            {plan.featured && (
                                <div className="absolute top-10 right-10">
                                    <div className="px-4 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest">
                                        Recommended
                                    </div>
                                </div>
                            )}

                            <div className="mb-12">
                                <h3 className={cn(
                                    "text-xs font-bold uppercase tracking-[0.3em] mb-8",
                                    plan.featured ? "text-background/40" : "text-foreground/30"
                                )}>
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-2 mb-4 lg:mb-6">
                                    <span className="text-5xl lg:text-7xl font-bold tracking-tighter">${plan.price}</span>
                                    <span className={cn(
                                        "text-[10px] md:text-xs font-medium uppercase tracking-widest",
                                        plan.featured ? "text-background/40" : "text-foreground/20"
                                    )}>Once</span>
                                </div>
                                <p className={cn(
                                    "text-lg leading-relaxed",
                                    plan.featured ? "text-background/60" : "text-foreground/40"
                                )}>
                                    {plan.description}
                                </p>
                            </div>

                            <div className={cn(
                                "flex-1 pt-12 border-t mb-12",
                                plan.featured ? "border-background/10" : "border-foreground/5"
                            )}>
                                <ul className="space-y-6">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-4">
                                            <Check className={cn(
                                                "w-4 h-4 shrink-0",
                                                plan.featured ? "text-primary" : "text-primary/40"
                                            )} />
                                            <span className={cn(
                                                "text-sm font-medium",
                                                plan.featured ? "text-background/80" : "text-foreground/60"
                                            )}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link href="#contact" className="block mt-auto">
                                <Button className={cn(
                                    "w-full h-14 lg:h-16 rounded-full text-base lg:text-lg font-bold transition-all duration-500",
                                    plan.featured
                                        ? "bg-primary text-white hover:bg-white hover:text-foreground"
                                        : "bg-foreground text-background hover:bg-primary hover:text-white"
                                )}>
                                    Select Plan
                                    <ArrowUpRight className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
                                </Button>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 flex flex-col items-center justify-center gap-4 text-foreground/20 italic font-serif">
                    <p className="text-sm">Trusted by forward-thinking founders worldwide.</p>
                </div>
            </div>
        </section>
    );
}
