"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Send, ShieldCheck, Clock } from "lucide-react";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SERVICES = [
    "New Website",
    "Website Redesign",
    "SEO Services",
    "Maintenance",
    "Not Sure"
];

const BUDGETS = [
    "Under ₹10,000",
    "₹10k – ₹25k",
    "₹25k – ₹50k",
    "Above ₹50k"
];

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        serviceType: "",
        budget: "",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, "agency_leads"), {
                ...formData,
                status: "new",
                createdAt: serverTimestamp()
            });

            setSuccess(true);
            setFormData({
                name: "",
                businessName: "",
                email: "",
                phone: "",
                serviceType: "",
                budget: "",
                message: ""
            });
        } catch (error) {
            console.error("Submission error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-[2rem] shadow-2xl shadow-foreground/5 text-center flex flex-col items-center justify-center min-h-[500px]"
            >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-8">
                    <Check className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Inquiry Received</h3>
                <p className="text-foreground/50 max-w-sm mb-8">
                    Thank you! Our team has received your request and will contact you shortly.
                </p>
                <Button
                    onClick={() => setSuccess(false)}
                    variant="outline"
                    className="rounded-full px-8"
                >
                    Send Another Message
                </Button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-foreground/5 border border-foreground/5"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Name *</label>
                        <Input
                            required
                            placeholder="Your Name"
                            className="h-14 rounded-xl bg-foreground/[0.02] border-foreground/5 focus:border-primary/30 transition-all placeholder:text-foreground/20"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Business Name</label>
                        <Input
                            placeholder="Optional"
                            className="h-14 rounded-xl bg-foreground/[0.02] border-foreground/5 focus:border-primary/30 transition-all placeholder:text-foreground/20"
                            value={formData.businessName}
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Email Address *</label>
                        <Input
                            required
                            type="email"
                            placeholder="Required"
                            className="h-14 rounded-xl bg-foreground/[0.02] border-foreground/5 focus:border-primary/30 transition-all placeholder:text-foreground/20"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Phone / WhatsApp *</label>
                        <Input
                            required
                            type="tel"
                            placeholder="Required"
                            className="h-14 rounded-xl bg-foreground/[0.02] border-foreground/5 focus:border-primary/30 transition-all placeholder:text-foreground/20"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Project Type</label>
                        <select
                            className="w-full h-14 rounded-xl bg-foreground/[0.02] border border-foreground/5 focus:border-primary/30 px-4 text-sm outline-none transition-all appearance-none text-foreground/60"
                            value={formData.serviceType}
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Budget Range</label>
                        <select
                            className="w-full h-14 rounded-xl bg-foreground/[0.02] border border-foreground/5 focus:border-primary/30 px-4 text-sm outline-none transition-all appearance-none text-foreground/60"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        >
                            <option value="">Select Range</option>
                            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Message (Optional)</label>
                    <Textarea
                        placeholder="Tell us about your project, goals, and timeline..."
                        className="min-h-[120px] rounded-xl bg-foreground/[0.02] border-foreground/5 focus:border-primary/30 transition-all py-4 placeholder:text-foreground/20"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                </div>

                <Button
                    disabled={loading}
                    className="w-full h-16 rounded-xl bg-primary hover:bg-foreground text-white font-bold text-lg transition-all active:scale-[0.98] group"
                >
                    {loading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        <div className="flex items-center gap-3">
                            <span>Get Free Consultation</span>
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    )}
                </Button>

                <div className="flex flex-col gap-4 pt-4 border-t border-foreground/5">
                    <div className="flex items-center gap-3 text-foreground/40">
                        <ShieldCheck className="w-4 h-4 text-primary/60" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">We respect your privacy. No spam.</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground/40">
                        <Clock className="w-4 h-4 text-primary/60" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Typical response time: Within 24 hours</span>
                    </div>
                </div>
            </form>
        </motion.div>
    );
}

