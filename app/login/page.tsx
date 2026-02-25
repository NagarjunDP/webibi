"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles, Chrome, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function LoginPage() {
    const { user, signInWithGoogle, loading } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        }
    }, [user, router]);

    const handleGoogleSignIn = async () => {
        setIsSubmitting(true);
        try {
            await signInWithGoogle();
        } catch (error) {
            toast.error("Failed to sign in with Google");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEmailSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        toast.info("Email sign-in is coming soon. Please use Google for now.", {
            description: "We're currently using secure Google authentication for all accounts."
        });
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 selection:bg-primary/10">
            {/* Subtle local texture (no external URL) */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.035]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.18) 1px, transparent 0)",
                    backgroundSize: "22px 22px",
                    mixBlendMode: "multiply",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-md"
            >
                <NextLink
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to website</span>
                </NextLink>

                <div className="bg-white rounded-[1.75rem] p-10 lg:p-12 shadow-premium-lg border border-slate-100/80 relative overflow-hidden group">
                    {/* calmer glow */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/4 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/7 transition-colors" />

                    <div className="relative z-10">
                        <div className="mb-10">
                            <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center mb-6 shadow-premium-sm">
                                <Sparkles className="w-6 h-6 text-white/85" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter text-slate-900 mb-2">
                                Welcome back.
                            </h1>
                            <p className="text-slate-500 font-medium">
                                Access your agency dashboard.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <Button
                                onClick={handleGoogleSignIn}
                                disabled={isSubmitting || loading}
                                variant="outline"
                                className="w-full h-14 rounded-xl border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-200 flex items-center justify-center gap-3 text-sm font-bold transition-all"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                                ) : (
                                    <Chrome className="w-4 h-4 text-blue-500" />
                                )}
                                Continue with Google
                            </Button>

                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-100" />
                                </div>
                                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-bold text-slate-300">
                                    <span className="bg-white px-4">or use email</span>
                                </div>
                            </div>

                            <form onSubmit={handleEmailSignIn} className="space-y-6">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400"
                                    >
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        className="h-14 bg-slate-50 border-slate-100/80 rounded-xl focus:bg-white focus:border-primary transition-all px-4 shadow-[0_1px_0_rgba(15,23,42,0.02)]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label
                                            htmlFor="password"
                                            className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400"
                                        >
                                            Password
                                        </Label>
                                        <NextLink
                                            href="#"
                                            className="text-xs font-bold text-primary hover:underline"
                                        >
                                            Forgot?
                                        </NextLink>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="h-14 bg-slate-50 border-slate-100/80 rounded-xl focus:bg-white focus:border-primary transition-all px-4 shadow-[0_1px_0_rgba(15,23,42,0.02)]"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading || isSubmitting}
                                    className="w-full h-14 rounded-xl bg-slate-950 text-white hover:bg-slate-900 text-base font-bold transition-all shadow-premium-md"
                                >
                                    Sign In
                                    <motion.div className="ml-2" whileHover={{ x: 5 }}>
                                        →
                                    </motion.div>
                                </Button>
                            </form>
                        </div>

                        <div className="mt-10 pt-8 border-t border-slate-100/70 text-center">
                            <p className="text-sm text-slate-400 font-medium">
                                Don&apos;t have an account?{" "}
                                <NextLink
                                    href="/#contact"
                                    className="text-slate-900 font-bold hover:underline"
                                >
                                    Contact sales
                                </NextLink>
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
