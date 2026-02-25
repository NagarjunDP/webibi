import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const Process = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const steps = [
        {
            title: "Discovery",
            description: "We analyze your competition and map out a winning strategy.",
            icon: "🔍"
        },
        {
            title: "Design",
            description: "Wireframes and high-fidelity UI that aligns with your brand.",
            icon: "🎨"
        },
        {
            title: "Development",
            description: "Clean code, SEO-ready structure, and lightning-fast performance.",
            icon: "💻"
        },
        {
            title: "Launch",
            description: "Rigorous testing and a smooth deployment to production.",
            icon: "🚀"
        },
        {
            title: "Growth",
            description: "Continuous monitoring and optimization for maximum rankings.",
            icon: "📈"
        }
    ];

    return (
        <section id="process" className="py-32 bg-surface overflow-hidden">
            <div className="container mx-auto px-6 mb-20">
                <h2 className="text-4xl md:text-7xl font-display font-bold text-white text-center">
                    OUR <span className="text-stroke">PROCESS</span>
                </h2>
            </div>

            <div ref={containerRef} className="relative container mx-auto px-6 max-w-4xl">
                {/* Timeline Line */}
                <motion.div
                    style={{ scaleY }}
                    className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-electric-blue to-neon-pink origin-top"
                />

                <div className="space-y-24">
                    {steps.map((step, index) => (
                        <div key={index} className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                            {/* Icon Node */}
                            <div className="absolute left-0 md:left-1/2 -translate-x-[calc(50%-30px)] md:-translate-x-1/2 w-16 h-16 rounded-full bg-void border border-white/20 z-10 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                {step.icon}
                            </div>

                            {/* Content Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className={`ml-20 md:ml-0 md:w-[45%] p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-electric-blue/30 transition-colors backdrop-blur-sm group`}
                            >
                                <div className="text-5xl font-display font-bold text-white/5 absolute top-4 right-4 group-hover:text-white/10 transition-colors">
                                    0{index + 1}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400">{step.description}</p>
                            </motion.div>

                            {/* Empty spacer for alternating layout */}
                            <div className="hidden md:block md:w-[45%]" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
