import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import gsap from 'gsap';
import { useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();
    const lastScrollY = useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const diff = latest - lastScrollY.current;
        if (Math.abs(diff) > 50) {
            setHidden(diff > 0 && latest > 100);
            lastScrollY.current = latest;
        }
    });

    const navLinks = [
        { name: 'Services', to: 'services' },
        { name: 'Work', to: 'portfolio' },
        { name: 'Process', to: 'process' },
        { name: 'About', to: 'about' }, // Assuming 'why-us' is About
    ];

    const magnetic = (e) => {
        const target = e.target;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(target, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
    };

    const resetMagnetic = (e) => {
        gsap.to(e.target, { x: 0, y: 0, duration: 0.3 });
    };

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: -100 }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center mix-blend-difference text-white"
        >
            <Link to="hero" smooth={true} className="cursor-pointer">
                <span className="text-2xl font-display font-bold tracking-tighter">AGENCY<span className="text-electric-blue">_X</span></span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.to}
                        smooth={true}
                        offset={-50}
                        onMouseMove={magnetic}
                        onMouseLeave={resetMagnetic}
                        className="text-sm font-medium uppercase tracking-wider hover:text-electric-blue transition-colors cursor-pointer btn-magnetic"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            <div className="hidden md:block">
                <Link to="contact" smooth={true}>
                    <button
                        onMouseMove={magnetic}
                        onMouseLeave={resetMagnetic}
                        className="px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 font-medium btn-magnetic"
                    >
                        Let's Talk
                    </button>
                </Link>
            </div>


            {/* Mobile Toggle */}
            <button
                className="md:hidden text-2xl z-50 relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="fixed inset-0 bg-void z-40 flex flex-col items-center justify-center space-y-8"
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 * i }}
                            >
                                <Link
                                    to={link.to}
                                    smooth={true}
                                    onClick={() => setIsOpen(false)}
                                    className="text-4xl font-display font-bold text-white hover:text-transparent hover:text-stroke transition-all"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
