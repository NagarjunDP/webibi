"use client";

import { useRef, useEffect, useState } from "react";
import { Monitor, Calendar, Search, Layers } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Web Development",
    icon: Monitor,
    description: "Bespoke digital experiences built with surgical precision. We prioritize performance, security, and scalability.",
    capabilities: ["Custom Applications", "E-commerce", "Web Apps", "API Development"],
  },
  {
    number: "02",
    title: "Event Platforms",
    icon: Calendar,
    description: "Tailored infrastructure for the events industry. From invitation to lead capture, we automate the journey.",
    capabilities: ["Booking Systems", "CRM Integration", "Payment Processing", "Lead Capture"],
  },
  {
    number: "03",
    title: "SEO & Growth",
    icon: Search,
    description: "Data-driven technical optimization. We don't just build websites; we ensure they are found by your audience.",
    capabilities: ["Technical SEO", "Core Web Vitals", "Speed Optimization", "Analytics"],
  },
  {
    number: "04",
    title: "Design Systems",
    icon: Layers,
    description: "Rigorous visual languages that ensure brand consistency across every touchpoint and device.",
    capabilities: ["UI/UX Design", "Brand Identity", "Design Systems", "Prototyping"],
  },
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-32 lg:py-48 bg-card noise">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 mb-20 lg:mb-32">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono mb-4 block">
              Services
            </span>
            <h2 className="font-serif text-4xl lg:text-7xl text-foreground tracking-[-0.03em] leading-[0.9]">
              What we do
            </h2>
          </div>
          <div className="lg:pt-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We partner with ambitious businesses to create digital products that matter.
              Our approach combines strategic thinking with technical excellence.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid lg:grid-cols-2 gap-px bg-border">
          {services.map((service, index) => (
            <div
              key={service.number}
              className="bg-card p-8 lg:p-14 group cursor-default transition-all duration-500 hover:bg-secondary/20 h-full flex flex-col"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-start justify-between mb-12">
                <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center transition-colors duration-500 group-hover:bg-foreground group-hover:border-foreground">
                  <service.icon className="w-5 h-5 text-muted-foreground group-hover:text-background transition-colors duration-500 stroke-[1.2px]" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/50">{service.number}</span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-serif text-foreground mb-4">
                {service.title}
              </h3>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {service.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="px-3.5 py-1.5 text-[10px] font-bold tracking-[0.05em] uppercase text-muted-foreground border border-border/40 rounded-full bg-secondary/50"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack banner */}
        <div className="mt-20 lg:mt-32 pt-12 border-t border-border">
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono mb-8 block">
            Technologies
          </span>
          <div className="flex flex-wrap gap-4 lg:gap-6">
            {["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Node.js", "PostgreSQL", "Stripe"].map((tech) => (
              <span
                key={tech}
                className="text-lg lg:text-xl text-muted-foreground hover:text-foreground transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
