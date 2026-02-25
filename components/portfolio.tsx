"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Adhi Shakthi Events",
    url: "http://adhishakthievents.vercel.app",
    category: "Event Platform",
    year: "2024",
    description: "Premium event showcase with seamless booking experience",
    result: "+150% inquiries",
  },
  {
    id: 2,
    name: "Sri Mudra Events",
    url: "http://srimudraeventsandmanagement.com",
    category: "Corporate Events",
    year: "2024",
    description: "Complete digital transformation with integrated payments",
    result: "+200% bookings",
  },
  {
    id: 3,
    name: "Shri Events",
    url: "http://shrievents.vercel.app",
    category: "Cultural Events",
    year: "2023",
    description: "High-performance platform with sub-second load times",
    result: "95+ PageSpeed",
  },
  {
    id: 4,
    name: "Vignaharthha Events",
    url: "http://vignaharthaevents.vercel.app",
    category: "Wedding Planning",
    year: "2023",
    description: "Elegant design with conversion-focused lead capture",
    result: "3x leads",
  },
];

export function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="work" ref={sectionRef} className="py-32 lg:py-48 bg-background noise">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono mb-4 block">
              Selected Work
            </span>
            <h2 className="font-serif text-4xl lg:text-7xl text-foreground tracking-[-0.03em] leading-[0.9]">
              Featured projects
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md lg:text-right">
            Real websites delivering real results. Every project built with precision and purpose.
          </p>
        </div>

        {/* Projects list */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-t border-border/50 py-10 lg:py-16 transition-all duration-700 hover:bg-secondary/40 relative overflow-hidden"
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Number */}
                <div className="lg:col-span-1">
                  <span className="text-xs font-mono text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>

                {/* Name */}
                <div className="lg:col-span-4">
                  <h3 className="text-3xl lg:text-5xl font-serif text-foreground group-hover:text-primary transition-colors duration-500 tracking-[-0.02em]">
                    {project.name}
                  </h3>
                </div>

                {/* Category & Year */}
                <div className="lg:col-span-2 flex items-center gap-4">
                  <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-muted-foreground bg-secondary/80 px-2 py-1 rounded">{project.category}</span>
                  <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-muted-foreground/40">{project.year}</span>
                </div>

                {/* Description */}
                <div className="lg:col-span-3">
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                {/* Result + Arrow */}
                <div className="lg:col-span-2 flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.1em] uppercase text-foreground">{project.result}</span>
                  <div className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center transition-all duration-500 group-hover:bg-foreground group-hover:border-foreground group-hover:scale-110 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-background transition-colors duration-500 stroke-[1.2px]" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom border */}
        <div className="border-t border-border" />
      </div>
    </section>
  );
}
