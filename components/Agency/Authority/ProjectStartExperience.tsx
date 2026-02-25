"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check,
    Loader2,
    ArrowRight,
    Globe,
    RefreshCw,
    ShoppingCart,
    Search,
    HelpCircle,
    User,
    Phone,
    Mail,
    PartyPopper,
    ShieldCheck,
    Clock
} from "lucide-react";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
    { id: "new", label: "New Website", icon: Globe, description: "Building from scratch" },
    { id: "redesign", label: "Redesign", icon: RefreshCw, description: "Modernizing existing site" },
    { id: "ecommerce", label: "E-commerce", icon: ShoppingCart, description: "Selling products online" },
    { id: "seo", label: "SEO Services", icon: Search, description: "Search engine dominance" },
    { id: "notsure", label: "Not Sure", icon: HelpCircle, description: "Need expert consultation" }
];

const BUDGET_RANGES = [
    "Under ₹10,000",
    "₹10k – ₹25k",
    "₹25k – ₹50k",
    "Above ₹50k"
];

export default function ProjectStartExperience() {
    const [step, setStep] = useState(0); // 0: Hook, 1: Type, 2: Budget, 3: Info, 4: Details, 5: Success
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        serviceType: "",
        budget: "",
        message: ""
    });

    const progress = useMemo(() => {
        if (step === 0) return 0;
        if (step > 4) return 100;
        return (step / 4) * 100;
    }, [step]);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, "agency_leads"), {
                ...formData,
                status: "new",
                createdAt: serverTimestamp()
            });
            setStep(5);
        } catch (error) {
            console.error("Submission error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto min-h-[500px] flex flex-col items-center justify-center relative">

            {/* Progress Bar */}
            <AnimatePresence>
                {step > 0 && step < 5 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-0 left-0 right-0 h-1 bg-foreground/5 rounded-full overflow-hidden"
                    >
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
                {/* Step 0: Emotional Hook */}
                {step === 0 && (
                    <motion.div
                        key="hook"
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 1.02 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center py-20 will-change-transform"
                    >
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-foreground mb-8 text-balance">
                            Let’s Create Something <br />
                            <span className="text-primary italic font-serif">Amazing Together.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-foreground/40 mb-12 max-w-lg mx-auto leading-relaxed">
                            Tell us about your business — we’ll handle the technical heavy lifting and design the rest.
                        </p>
                        <Button
                            onClick={handleNext}
                            className="h-16 px-12 rounded-full bg-primary hover:bg-foreground text-white text-lg font-bold group transition-all active:scale-95"
                        >
                            Start Your Project
                            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                )}

                {/* Step 1: Project Type */}
                {step === 1 && (
                    <motion.div
                        key="type"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full py-12 will-change-transform"
                    >
                        <div className="text-center mb-12">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">Step 1 of 4</span>
                            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">What do you need?</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {PROJECT_TYPES.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => {
                                        setFormData({ ...formData, serviceType: type.label });
                                        handleNext();
                                    }}
                                    className={cn(
                                        "p-6 rounded-2xl border text-left transition-all active:scale-[0.98] transform-gpu",
                                        formData.serviceType === type.label
                                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                            : "bg-white border-foreground/5 hover:border-primary/30 hover:shadow-xl hover:shadow-foreground/5"
                                    )}
                                >
                                    <type.icon className={cn("w-6 h-6 mb-4", formData.serviceType === type.label ? "text-white" : "text-primary")} />
                                    <p className="font-bold text-lg mb-1">{type.label}</p>
                                    <p className={cn("text-xs", formData.serviceType === type.label ? "text-white/70" : "text-foreground/40")}>
                                        {type.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <button onClick={handleBack} className="text-foreground/30 hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">Go Back</button>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Budget */}
                {step === 2 && (
                    <motion.div
                        key="budget"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full py-12 text-center will-change-transform"
                    >
                        <div className="mb-12">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">Step 2 of 4</span>
                            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">What’s your budget?</h3>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {BUDGET_RANGES.map((range) => (
                                <button
                                    key={range}
                                    onClick={() => {
                                        setFormData({ ...formData, budget: range });
                                        handleNext();
                                    }}
                                    className={cn(
                                        "h-16 px-8 rounded-full border text-sm font-bold tracking-tight transition-all active:scale-[0.98] transform-gpu",
                                        formData.budget === range
                                            ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                            : "bg-white border-foreground/5 hover:border-primary/30 hover:scale-105"
                                    )}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                        <div className="mt-16">
                            <button onClick={handleBack} className="text-foreground/30 hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">Go Back</button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Contact Info */}
                {step === 3 && (
                    <motion.div
                        key="info"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full py-12 max-w-xl mx-auto will-change-transform"
                    >
                        <div className="text-center mb-12">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">Step 3 of 4</span>
                            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Tell us who you are.</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="relative">
                                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20" />
                                <Input
                                    placeholder="Your Name"
                                    className="h-20 pl-14 pr-6 rounded-2xl bg-white border-foreground/5 focus:border-primary/30 text-lg font-medium shadow-sm transition-all"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20" />
                                <Input
                                    placeholder="Your Email"
                                    type="email"
                                    className="h-20 pl-14 pr-6 rounded-2xl bg-white border-foreground/5 focus:border-primary/30 text-lg font-medium shadow-sm transition-all"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="relative">
                                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20" />
                                <Input
                                    placeholder="Phone / WhatsApp"
                                    type="tel"
                                    className="h-20 pl-14 pr-6 rounded-2xl bg-white border-foreground/5 focus:border-primary/30 text-lg font-medium shadow-sm transition-all"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="mt-12 flex justify-between items-center">
                            <button onClick={handleBack} className="text-foreground/30 hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">Go Back</button>
                            <Button
                                onClick={handleNext}
                                disabled={!formData.name || !formData.email || !formData.phone}
                                className="h-16 px-12 rounded-full bg-primary text-white font-bold transition-all active:scale-[0.98]"
                            >
                                Continue
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Step 4: Details */}
                {step === 4 && (
                    <motion.div
                        key="details"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full py-12 max-w-xl mx-auto will-change-transform"
                    >
                        <div className="text-center mb-12">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">Step 4 of 4</span>
                            <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Any specific goals?</h3>
                        </div>
                        <Textarea
                            placeholder="Tell us about your project, goals, or timeline... (Optional)"
                            className="min-h-[200px] p-8 rounded-3xl bg-white border-foreground/5 focus:border-primary/30 text-lg leading-relaxed placeholder:text-foreground/20 shadow-sm transition-all"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                        <div className="mt-12">
                            <Button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full h-20 rounded-full bg-primary hover:bg-foreground text-white text-xl font-bold transition-all active:scale-[0.98]"
                            >
                                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : "Get My Free Proposal"}
                            </Button>
                        </div>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-foreground/30">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">No commitment required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Reply within 24 hours</span>
                            </div>
                        </div>
                        <div className="mt-12 text-center">
                            <button onClick={handleBack} className="text-foreground/30 hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">Go Back</button>
                        </div>
                    </motion.div>
                )}

                {/* Step 5: Success */}
                {step === 5 && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-center py-20 will-change-transform"
                    >
                        <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-10">
                            <PartyPopper className="w-12 h-12 text-emerald-500" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6 text-balance">You’re all set!</h2>
                        <p className="text-lg md:text-xl text-foreground/40 mb-12 max-w-sm mx-auto leading-relaxed">
                            Excellent choice. Our team is already reviewing your details. Expect a personalized proposal in your inbox within 24 hours.
                        </p>
                        <Button
                            onClick={() => setStep(0)}
                            variant="outline"
                            className="rounded-full px-12 h-14 active:scale-95 transition-all"
                        >
                            Back to Start
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
