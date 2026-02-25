"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  { label: "Adhi Shakthi Events", href: "http://adhishakthievents.vercel.app" },
  { label: "Sri Mudra Events", href: "http://srimudraeventsandmanagement.com" },
  { label: "Shri Events", href: "http://shrievents.vercel.app" },
  { label: "Vignaharthha Events", href: "http://vignaharthaevents.vercel.app" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main footer */}
        <div className="py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-5">
              <Link href="/" className="inline-block mb-6">
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-foreground">
                  Digital Empire
                </span>
              </Link>
              <p className="text-muted-foreground max-w-sm mb-8">
                A boutique studio crafting high-performance websites and event management 
                platforms. Based in Kalaburagi, serving clients across India.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors group"
              >
                <span className="text-sm font-medium tracking-wide">Start a project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Navigation */}
            <div className="lg:col-span-2 lg:col-start-8">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-6">
                Navigation
              </span>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div className="lg:col-span-3">
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-6">
                Live Projects
              </span>
              <ul className="space-y-4">
                {projects.map((project) => (
                  <li key={project.label}>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                    >
                      {project.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Digital Empire Studio
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted in Kalaburagi, India
          </p>
        </div>
      </div>
    </footer>
  );
}
