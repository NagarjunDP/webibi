import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiArrowRight } from 'react-icons/hi';
import Button from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "Adhishakthi Events",
        category: "Event",
        image: "https://via.placeholder.com/800x600/000/00E5FF?text=Adhishakthi+Events",
        stats: { traffic: "180%", ranking: "#1" },
        desc: "Traditional & Cultural Events"
    },
    {
        id: 2,
        title: "Sri Mudra Events",
        category: "Event",
        image: "https://via.placeholder.com/800x600/000/FF2E97?text=Sri+Mudra+Events",
        stats: { traffic: "200%", leads: "5x" },
        desc: "Full-Service Management"
    },
    {
        id: 3,
        title: "Vignhartha Events",
        category: "Event",
        image: "https://via.placeholder.com/800x600/000/FFD600?text=Vignhartha+Events",
        stats: { bookings: "150%", rating: "4.9" },
        desc: "Religious & Traditional"
    },
    {
        id: 4,
        title: "Shri Events",
        category: "Wedding",
        image: "https://via.placeholder.com/800x600/000/6B2FD6?text=Shri+Events",
        stats: { traffic: "175%", calls: "3x" },
        desc: "Wedding & Corporate"
    }
];

const Portfolio = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            { translateX: 0 },
            {
                translateX: "-300vw",
                ease: "none",
                duration: 1,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: 0.6,
                    pin: true,
                },
            }
        );

        return () => {
            pin.kill();
        };
    }, []);

    return (
        <section className="bg-void overflow-hidden">
            <div ref={triggerRef}>
                <div ref={sectionRef} className="h-screen w-[400vw] flex flex-row relative">
                    {projects.map((project, index) => (
                        <div key={project.id} className="w-screen h-full flex items-center justify-center px-6 md:px-20 border-r border-white/5 relative group">
                            {/* Background Number */}
                            <div className="absolute top-20 left-20 text-[20vw] font-display font-bold text-white/5 leading-none select-none pointer-events-none">
                                0{index + 1}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 w-full max-w-7xl items-center relative z-10">
                                {/* Image Info */}
                                <div className="order-2 md:order-1 space-y-8">
                                    <div className="overflow-hidden">
                                        <motion.div
                                            initial={{ y: 100 }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 0.8 }}
                                            className="flex items-center gap-4 text-electric-blue font-mono text-sm tracking-widest uppercase mb-4"
                                        >
                                            <span className="w-12 h-[1px] bg-electric-blue" />
                                            {project.category}
                                        </motion.div>
                                        <h2 className="text-4xl md:text-7xl font-display font-bold text-white leading-tight">
                                            {project.title}
                                        </h2>
                                    </div>

                                    <p className="text-xl text-gray-400 max-w-md">
                                        {project.desc}
                                    </p>

                                    <div className="flex gap-12 border-y border-white/10 py-6">
                                        {Object.entries(project.stats).map(([label, value]) => (
                                            <div key={label}>
                                                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                                                <div className="text-sm text-gray-500 uppercase tracking-widest">{label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <Button variant="outline" className="group">
                                        View Case Study
                                        <HiArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>

                                {/* Image Preview */}
                                <div className="order-1 md:order-2 relative aspect-[4/3] rounded-3xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 ease-out">
                                    <div className="absolute inset-0 bg-electric-blue/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
