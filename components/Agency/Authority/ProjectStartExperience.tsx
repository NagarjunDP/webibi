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
    Clock,
    ChevronLeft
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

            {/* Progress Bar (Premium Refinement) */}
            <AnimatePresence>
                {step > 0 && step < 5 && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute -top-12 left-0 right-0 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden"
                    >
                        <motion.div
                            className="h-full bg-primary shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Container for Form Steps - Glass Card */}
            <div className={cn(
                "w-full transition-all duration-700",
                step > 0 && "p-8 md:p-12 lg:p-16 rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-white/40 shadow-[0_40px_100px_-20px_rgba(15,23,42,0.1)]"
            )}>
                <AnimatePresence mode="wait">
                    {/* Step 0: Hook */}
                    {step === 0 && (
                        <motion.div
                            key="hook"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center py-10"
                        >
                            <p className="text-lg md:text-xl text-[#64748B] mb-12 max-w-lg mx-auto leading-relaxed">
                                Share your vision with us. We handle the technical heavy lifting so you can focus on growth.
                            </p>
                            <Button
                                onClick={handleNext}
                                className="h-16 px-12 rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-lg font-bold group shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
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
                            className="w-full"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <button onClick={handleBack} className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#64748B] hover:text-[#0F172A] transition-colors">
                                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Go Back
                                </button>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">01 / 04</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-10 text-center">What can we build for you?</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {PROJECT_TYPES.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => {
                                            setFormData({ ...formData, serviceType: type.label });
                                            handleNext();
                                        }}
                                        className={cn(
                                            "group p-6 rounded-2xl border text-left transition-all duration-300",
                                            formData.serviceType === type.label
                                                ? "bg-[#2563EB] border-[#2563EB] text-white shadow-lg shadow-blue-500/20"
                                                : "bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#2563EB]/30 hover:bg-white"
                                        )}
                                    >
                                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors",
                                            formData.serviceType === type.label ? "bg-white/20" : "bg-white shadow-sm"
                                        )}>
                                            <type.icon className={cn("w-5 h-5", formData.serviceType === type.label ? "text-white" : "text-[#2563EB]")} />
                                        </div>
                                        <p className="font-bold text-lg mb-1 tracking-tight">{type.label}</p>
                                        <p className={cn("text-xs leading-relaxed", formData.serviceType === type.label ? "text-white/70" : "text-[#64748B]")}>
                                            {type.description}
                                        </p>
                                    </button>
                                ))}
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
                            className="w-full text-center"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <button onClick={handleBack} className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#64748B] hover:text-[#0F172A] transition-colors">
                                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Go Back
                                </button>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">02 / 04</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">What’s your budget range?</h3>

                            <div className="flex flex-wrap justify-center gap-4">
                                {BUDGET_RANGES.map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => {
                                            setFormData({ ...formData, budget: range });
                                            handleNext();
                                        }}
                                        className={cn(
                                            "h-16 px-10 rounded-full border text-sm font-bold tracking-tight transition-all",
                                            formData.budget === range
                                                ? "bg-[#2563EB] border-[#2563EB] text-white shadow-lg shadow-blue-500/20"
                                                : "bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#2563EB]/40 hover:bg-white hover:scale-105"
                                        )}
                                    >
                                        {range}
                                    </button>
                                ))}
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
                            className="w-full max-w-xl mx-auto"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <button onClick={handleBack} className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#64748B] hover:text-[#0F172A] transition-colors">
                                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Go Back
                                </button>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">03 / 04</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-10 text-center">Tell us about yourself.</h3>

                            <div className="space-y-5">
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] transition-colors group-focus-within:text-[#2563EB]" />
                                    <Input
                                        placeholder="Full Name"
                                        className="h-16 pl-14 pr-6 rounded-2xl bg-[#F8FAFC] border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]/10 text-base font-medium transition-all"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] transition-colors group-focus-within:text-[#2563EB]" />
                                    <Input
                                        placeholder="Business Email"
                                        type="email"
                                        className="h-16 pl-14 pr-6 rounded-2xl bg-[#F8FAFC] border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]/10 text-base font-medium transition-all"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="relative group">
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] transition-colors group-focus-within:text-[#2563EB]" />
                                    <Input
                                        placeholder="Mobile / WhatsApp"
                                        type="tel"
                                        className="h-16 pl-14 pr-6 rounded-2xl bg-[#F8FAFC] border-[#E2E8F0] focus:border-[#2563EB] focus:ring-[#2563EB]/10 text-base font-medium transition-all"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <Button
                                onClick={handleNext}
                                disabled={!formData.name || !formData.email || !formData.phone}
                                className="w-full mt-10 h-16 rounded-2xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                            >
                                Continue
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </motion.div>
                    )}

                    {/* Step 4: Details */}
                    {step === 4 && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full max-w-xl mx-auto"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <button onClick={handleBack} className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#64748B] hover:text-[#0F172A] transition-colors">
                                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Go Back
                                </button>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">04 / 04</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-10 text-center">Any specific goals?</h3>

                            <Textarea
                                placeholder="Briefly describe your project goals, timeline, or any special requirements..."
                                className="min-h-[180px] p-6 rounded-2xl bg-[#F8FAFC] border-[#E2E8F0] focus:border-[#2563EB] text-base leading-relaxed transition-all"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />

                            <Button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full mt-10 h-20 rounded-2xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-lg font-bold shadow-2xl shadow-blue-500/20 transition-all active:scale-95"
                            >
                                {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : "Request Free Proposal"}
                            </Button>

                            <div className="mt-10 grid grid-cols-2 gap-6 opacity-40">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest">No Commitment</span>
                                </div>
                                <div className="flex items-center gap-2 justify-end">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest">24h Response</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 5: Success */}
                    {step === 5 && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-10"
                        >
                            <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-10 rotate-12">
                                <PartyPopper className="w-12 h-12 text-emerald-600 -rotate-12" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#0F172A] mb-6">Inquiry Received.</h2>
                            <p className="text-lg text-[#64748B] mb-12 max-w-sm mx-auto leading-relaxed">
                                Excellent. Our strategy team is reviewing your requirements. Expect a high-performance proposal in your inbox within 24 hours.
                            </p>
                            <Button
                                onClick={() => setStep(0)}
                                variant="outline"
                                className="rounded-full px-12 h-14 border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-all"
                            >
                                Back to Start
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
