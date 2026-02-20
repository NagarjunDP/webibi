"use client";

import { motion } from "framer-motion";
import { Link } from "lucide-react";
import NextLink from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 selection:bg-primary/10">
            {/* Background Grain/Noise or subtle gradient */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md"
            >
                {/* Back Button */}
                <NextLink href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to website</span>
                </NextLink>

                <div className="bg-white rounded-[2.5rem] p-10 lg:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden group">
                    {/* Subtle glass glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />

                    <div className="relative z-10">
                        <div className="mb-10">
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-6">
                                <Sparkles className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter text-slate-900 mb-2">Welcome Back.</h1>
                            <p className="text-slate-500 font-medium">Access your agency dashboard.</p>
                        </div>

                        <form className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@company.com"
                                    className="h-14 bg-slate-50 border-slate-100 rounded-xl focus:bg-white focus:border-primary transition-all px-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password" className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Password</Label>
                                    <NextLink href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</NextLink>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-14 bg-slate-50 border-slate-100 rounded-xl focus:bg-white focus:border-primary transition-all px-4"
                                />
                            </div>

                            <Button className="w-full h-14 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-base font-bold transition-all shadow-xl shadow-slate-200 group">
                                Sign In
                                <motion.div
                                    className="ml-2"
                                    whileHover={{ x: 5 }}
                                >
                                    →
                                </motion.div>
                            </Button>
                        </form>

                        <div className="mt-10 pt-8 border-t border-slate-50 text-center">
                            <p className="text-sm text-slate-400 font-medium">
                                Don't have an account? <NextLink href="#contact" className="text-slate-900 font-bold hover:underline">Contact sales</NextLink>
                            </p>
                        </div>
                    </div>
                </div>

                <p className="text-center mt-8 text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
                    Powered by Webibi OS
                </p>
            </motion.div>
        </div>
    );
}
