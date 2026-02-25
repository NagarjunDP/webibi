import { Client } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Gallery } from "./Gallery";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { toast } from "sonner";

interface ClientWebsiteProps {
    data: Client;
}

export default function ClientWebsite({ data }: ClientWebsiteProps) {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setSubmitting(true);
        try {
            const leadsRef = collection(db, "clients", data.id, "leads");
            await addDoc(leadsRef, {
                ...form,
                status: 'new',
                createdAt: serverTimestamp()
            });
            toast.success("Enquiry sent successfully! We will get back to you soon.");
            setForm({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            console.error("Error submitting lead:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            {/* ... Rest of component ... */}
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {data.logoUrl ? (
                            <Image src={data.logoUrl} alt={data.businessName} width={40} height={40} className="object-contain" />
                        ) : (
                            <span className="text-xl font-bold">{data.businessName}</span>
                        )}
                    </div>
                    <div className="hidden md:flex gap-6 text-sm font-medium">
                        <a href="#services" className="hover:text-blue-600">Services</a>
                        <a href="#gallery" className="hover:text-blue-600">Gallery</a>
                        <a href="#contact" className="hover:text-blue-600">Contact</a>
                    </div>
                    <Button>Get a Quote</Button>
                </div>
            </nav>

            {/* Offers Banner */}
            {data.offers?.enabled && (
                <div className="bg-blue-600 text-white text-center py-2 px-4 text-sm font-medium">
                    {data.offers.text}
                </div>
            )}

            {/* Hero */}
            <section className="relative py-20 lg:py-32 bg-slate-50 flex items-center justify-center text-center px-4 overflow-hidden">
                <div className="max-w-3xl space-y-6 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                        Welcome to {data.businessName}
                    </h1>
                    <p className="text-lg text-slate-600">
                        {data.seo?.description || "Providing details and excellence in every service we offer."}
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button size="lg" className="rounded-full">Our Services</Button>
                        <Button variant="outline" size="lg" className="rounded-full">Contact Us</Button>
                    </div>
                </div>
                {/* Background if hero images exist - simplified for now */}
                {data.heroImages && data.heroImages.length > 0 && (
                    <div className="absolute inset-0 opacity-10">
                        <Image src={data.heroImages[0]} alt="Hero" fill className="object-cover" />
                    </div>
                )}
            </section>

            {/* Services */}
            <section id="services" className="py-20 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Our Services</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">Discover what we can do for you.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {data.services?.map((service) => (
                        <Card key={service.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                            {service.images?.length > 0 && (
                                <div className="relative h-48 w-full bg-slate-100">
                                    <Image src={service.images[0]} alt={service.name} fill className="object-cover" />
                                </div>
                            )}
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                                <p className="text-slate-600 text-sm mb-4 line-clamp-3">{service.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-blue-600">{service.price}</span>
                                    <Button variant="outline" size="sm">Details</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Gallery */}
            {/* Gallery */}
            <Gallery data={data} />

            {/* Contact */}
            <section id="contact" className="py-20 container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                        <p className="text-slate-600 mb-8">Ready to start your project entirely? Contact us today.</p>

                        <div className="space-y-4">
                            {data.contact?.phone && (
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Phone className="h-5 w-5 text-blue-600" />
                                    <span>{data.contact.phone}</span>
                                </div>
                            )}
                            {data.contact?.email && (
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                    <span>{data.contact.email}</span>
                                </div>
                            )}
                            {data.contact?.address && (
                                <div className="flex items-center gap-3 text-slate-700">
                                    <MapPin className="h-5 w-5 text-blue-600" />
                                    <span>{data.contact.address}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 mt-8">
                            <Button variant="ghost" size="icon"><Facebook className="h-5 w-5" /></Button>
                            <Button variant="ghost" size="icon"><Instagram className="h-5 w-5" /></Button>
                            <Button variant="ghost" size="icon"><Linkedin className="h-5 w-5" /></Button>
                        </div>
                    </div>
                    <div className="bg-slate-100 dark:bg-zinc-900 rounded-2xl p-8">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Your Name *"
                                required
                                className="w-full p-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="email"
                                    placeholder="Email Address *"
                                    required
                                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                />
                            </div>
                            <textarea
                                placeholder="Tell us about your requirements... *"
                                required
                                className="w-full p-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-32"
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                            ></textarea>
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg font-bold"
                                type="submit"
                                disabled={submitting}
                            >
                                {submitting ? "Sending..." : "Submit Inquiry"}
                            </Button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} {data.businessName}. All rights reserved.</p>
                <p className="mt-2 text-slate-600">Powered by Webibi</p>
            </footer>
        </div>
    );
}
