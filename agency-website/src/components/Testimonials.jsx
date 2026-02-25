import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const testimonials = [
    {
        name: "Adhishakthi Events",
        role: "Cultural Events",
        quote: "Our inquiries skyrocketed by 180% within a month. The design is stunning!",
        rating: 5,
        result: "180% Inquiries"
    },
    {
        name: "Sri Mudra Events",
        role: "Event Management",
        quote: "We are ranking #1 for our keywords. The team knows their SEO stuff.",
        rating: 5,
        result: "#1 Ranking"
    },
    {
        name: "Vignhartha Events",
        role: "Traditional Events",
        quote: "Top 3 rankings and bookings are up 150%. Highly recommended!",
        rating: 5,
        result: "150% Bookings"
    },
    {
        name: "Shri Events",
        role: "Wedding & Corporate",
        quote: "Professional, fast, and results-driven. Best agency we've worked with.",
        rating: 5,
        result: "3x Traffic"
    }
];

const Testimonials = () => {
    const containerRef = useRef(null);

    return (
        <section className="py-32 bg-void relative overflow-hidden">
            <div className="container mx-auto px-6 mb-16 items-end flex justify-between">
                <div>
                    <h2 className="text-4xl md:text-7xl font-display font-bold text-white">
                        CLIENT <span className="text-neon-pink">LOVE</span>
                    </h2>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-gray-400">Drag to explore</p>
                </div>
            </div>

            <motion.div ref={containerRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
                <div className="flex gap-8 px-6 md:px-20 w-max">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            className="w-[85vw] md:w-[400px] p-10 rounded-[30px] bg-surface border border-white/10 hover:border-neon-pink/30 transition-all duration-300 relative flex-shrink-0 select-none"
                        >
                            <div className="text-electric-blue text-6xl font-display opacity-20 absolute top-6 right-8">
                                &ldquo;
                            </div>

                            <p className="text-xl md:text-2xl text-white font-medium mb-8 leading-relaxed relative z-10">
                                {t.quote}
                            </p>

                            <div className="flex justify-between items-end border-t border-white/5 pt-6">
                                <div>
                                    <h4 className="font-bold text-white text-lg">{t.name}</h4>
                                    <p className="text-sm text-gray-400">{t.role}</p>
                                </div>
                                <div className="text-neon-pink font-mono font-bold text-right">
                                    {t.result}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Testimonials;
