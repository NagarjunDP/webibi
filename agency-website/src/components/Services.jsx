import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { HiCode, HiChip, HiLightningBolt, HiTrendingUp, HiCalendar } from 'react-icons/hi';
import gsap from 'gsap';

const ServiceCard = ({ title, description, icon, colSpan, index }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative group rounded-3xl p-[1px] bg-gradient-to-br from-white/10 to-white/0 overflow-hidden ${colSpan}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 to-deep-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

            <div className="relative h-full bg-surface/90 backdrop-blur-xl rounded-[23px] p-8 flex flex-col justify-between overflow-hidden">
                {/* Content */}
                <div className="relative z-10 transform transition-transform duration-300 group-hover:translate-z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 group-hover:bg-electric-blue group-hover:text-black transition-all duration-300">
                        {icon}
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-electric-blue transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-white transition-colors">
                        {description}
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-electric-blue to-deep-purple rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            </div>
        </motion.div>
    );
};

const Services = () => {
    const services = [
        {
            title: "Custom Web Development",
            description: "React, Next.js, and modern stacks built for speed and scale.",
            icon: <HiCode />,
            colSpan: "md:col-span-2",
        },
        {
            title: "Advanced SEO Strategy",
            description: "Technical optimization to dominate search rankings.",
            icon: <HiTrendingUp />,
            colSpan: "md:col-span-1",
        },
        {
            title: "Event Website Specialists",
            description: "Tailored solutions for event management companies.",
            icon: <HiCalendar />,
            colSpan: "md:col-span-1",
        },
        {
            title: "Performance Optimization",
            description: "90+ PageSpeed scores guaranteed.",
            icon: <HiLightningBolt />,
            colSpan: "md:col-span-2",
        },
        {
            title: "Continuous Growth",
            description: "Analytics, A/B testing, and regular updates.",
            icon: <HiChip />,
            colSpan: "md:col-span-3",
        }
    ];

    return (
        <section id="services" className="py-24 bg-void relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-20">
                    <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-6">
                        OUR <span className="text-stroke">EXPERTISE</span>
                    </h2>
                    <div className="h-1 w-20 bg-electric-blue" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
