"use client";

import React from "react"

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClasses = "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors";

  return (
    <section id="contact" className="py-32 lg:py-48 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Content */}
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono mb-4 block">
              Contact
            </span>
            <h2 className="font-serif text-4xl lg:text-6xl text-foreground tracking-tight mb-8">
              {"Let's work"}
              <br />
              together
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-md">
              Ready to transform your digital presence? Share your vision and 
              {"let's"} create something extraordinary.
            </p>

            {/* Contact details */}
            <div className="space-y-6">
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Email</span>
                <a 
                  href="mailto:hello@digitalempire.studio" 
                  className="text-lg text-foreground hover:text-muted-foreground transition-colors"
                >
                  hello@digitalempire.studio
                </a>
              </div>
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Phone</span>
                <a 
                  href="tel:+919876543210" 
                  className="text-lg text-foreground hover:text-muted-foreground transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-2">Location</span>
                <p className="text-lg text-foreground">
                  Kalaburagi, Karnataka
                  <span className="text-muted-foreground"> — Serving Pan-India</span>
                </p>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-12 text-foreground hover:text-muted-foreground transition-colors group"
            >
              <span className="text-sm font-medium tracking-wide uppercase">Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Right - Form */}
          <div>
            {isSubmitted ? (
              <div className="h-full flex items-center justify-center p-12 border border-border">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-background" />
                  </div>
                  <h3 className="text-2xl font-serif text-foreground mb-4">
                    Message sent
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    {"We'll"} get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-sm font-medium tracking-wide uppercase text-foreground hover:text-muted-foreground transition-colors"
                  >
                    Send another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-3">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-3">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="company" className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-3">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-3">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={4}
                    required
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-foreground text-background text-sm font-medium tracking-wide uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
