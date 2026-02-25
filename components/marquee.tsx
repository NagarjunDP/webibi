"use client";

const items = [
  "Web Development",
  "Event Platforms",
  "SEO Optimization",
  "Performance",
  "React & Next.js",
  "UI/UX Design",
  "E-commerce",
  "Custom CMS",
];

export function Marquee() {
  return (
    <div className="py-8 border-y border-border bg-card overflow-hidden">
      <div className="flex animate-marquee">
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-8 px-8 shrink-0"
          >
            <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
