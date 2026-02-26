"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="group flex items-center gap-3">
              <span className={`text-sm font-medium tracking-[0.2em] uppercase transition-colors duration-500 ${scrolled ? "text-foreground" : "text-[#0F172A]"
                }`}>
                Digital Empire
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm transition-colors duration-500 tracking-wide ${scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-[#0F172A]/50 hover:text-[#0F172A]"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="#contact"
                className={`group flex items-center gap-2 text-sm font-medium transition-colors duration-500 ${scrolled ? "text-foreground hover:text-muted-foreground" : "text-[#0F172A] hover:text-[#0F172A]/70"
                  }`}
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 transition-colors duration-500 ${scrolled ? "text-foreground" : "text-[#0F172A]"
                }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 lg:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col justify-center items-center h-full gap-8">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-serif text-foreground hover:text-muted-foreground transition-colors"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-8 px-8 py-4 bg-foreground text-background text-sm font-medium tracking-wide"
          >
            Start a project
          </Link>
        </div>
      </div>
    </>
  );
}
