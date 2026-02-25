"use client";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We immerse ourselves in your business. Understanding goals, audience, and competitive landscape to create a strategic foundation.",
  },
  {
    number: "02",
    title: "Design",
    description: "Bespoke visual systems crafted from scratch. No templates. Every pixel intentional, every interaction purposeful.",
  },
  {
    number: "03",
    title: "Development",
    description: "Clean, scalable code built with modern technologies. Performance-optimized from the first line.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Seamless deployment with ongoing support. We're your long-term partner, not just a vendor.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-32 lg:py-48 bg-background noise text-balance">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 mb-20 lg:mb-32">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono mb-4 block">
              Process
            </span>
            <h2 className="font-serif text-4xl lg:text-7xl text-foreground tracking-[-0.03em] leading-[0.9]">
              How we work
            </h2>
          </div>
          <div className="lg:pt-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              A refined methodology developed over years of delivering exceptional results.
              Every project follows a proven path from concept to launch.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group grid lg:grid-cols-12 gap-8 py-12 lg:py-16 border-t border-border"
            >
              {/* Number */}
              <div className="lg:col-span-2">
                <span className="text-[100px] font-serif font-bold text-muted-foreground/10 group-hover:text-primary/10 transition-colors duration-700 leading-none block">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <div className="lg:col-span-4">
                <h3 className="text-2xl lg:text-3xl font-serif text-foreground">
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <div className="lg:col-span-6">
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom border */}
        <div className="border-t border-border" />
      </div>
    </section>
  );
}
