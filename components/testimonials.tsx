"use client";

import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    quote: "The website transformed our business completely. We went from occasional inquiries to consistent leads every week.",
    name: "Rajesh Kumar",
    role: "Founder, Adhi Shakthi Events",
  },
  {
    id: 2,
    quote: "Professional, responsive, and incredibly talented. They understood our vision immediately and delivered beyond expectations.",
    name: "Priya Sharma",
    role: "Director, Sri Mudra Events",
  },
  {
    id: 3,
    quote: "The attention to detail is remarkable. Every page loads instantly, and our clients constantly compliment our website.",
    name: "Anil Patil",
    role: "CEO, Shri Events",
  },
  {
    id: 4,
    quote: "From concept to launch, the entire process was smooth and transparent. Our bookings have tripled since the launch.",
    name: "Suresh Reddy",
    role: "Owner, Vignaharthha Events",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 lg:py-48 bg-card noise relative overflow-hidden border-y border-border/40">
      <div className="absolute top-0 right-0 opacity-[0.02] -translate-y-20 translate-x-20 pointer-events-none">
        <span className="text-[40rem] font-serif leading-none italic">"</span>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono mb-4 block">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl lg:text-7xl text-foreground tracking-[-0.03em] leading-[0.9]">
            Client words
          </h2>
        </div>

        {/* Quote */}
        <div className="max-w-4xl">
          <blockquote className="relative">
            <p className="font-serif text-3xl lg:text-6xl text-foreground leading-[1.1] tracking-[-0.03em] mb-16 italic">
              {`"${testimonials[activeIndex].quote}"`}
            </p>

            <footer className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <span className="text-lg font-medium text-foreground">
                  {testimonials[activeIndex].name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="text-foreground font-medium">{testimonials[activeIndex].name}</div>
                <div className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</div>
              </div>
            </footer>
          </blockquote>
        </div>

        {/* Navigation dots */}
        <div className="flex gap-4 mt-20">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-0.5 transition-all duration-700 rounded-full ${index === activeIndex
                  ? "w-16 bg-primary"
                  : "w-8 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
