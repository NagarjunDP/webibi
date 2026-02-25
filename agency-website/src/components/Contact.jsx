import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { HiMail, HiPhone, HiLocationMarker, HiChevronDown } from 'react-icons/hi';
import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

const ContactScene = () => {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 5, 2]} intensity={1} />
            <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                <Sphere args={[1, 32, 32]} scale={2.4}>
                    <MeshDistortMaterial
                        color="#6B2FD6"
                        attach="material"
                        distort={0.5}
                        speed={2}
                        roughness={0}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>
        </Canvas>
    );
};

const Input = ({ label, ...props }) => (
    <div className="relative group">
        <input
            {...props}
            className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors peer placeholder-transparent"
        />
        <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-electric-blue peer-focus:text-xs">
            {label}
        </label>
        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-electric-blue transition-all group-hover:w-full peer-focus:w-full" />
    </div>
);

const Contact = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        { q: "How long does it take?", a: "Typically 2-4 weeks for a complete custom website." },
        { q: "What is included?", a: "Design, Development, SEO, Hosting setup, and 1 month support." },
        { q: "Do you guarantee rankings?", a: "We guarantee best practices. While no one can promise #1, our track record speaks for itself." },
    ];

    return (
        <section id="contact" className="py-20 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-12 rounded-[40px] glass-panel border border-white/10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-blue to-neon-pink" />

                        <h2 className="text-4xl font-display font-bold text-white mb-2">Let's Create <span className="text-electric-blue">Magic</span></h2>
                        <p className="text-neon-pink text-sm font-mono mb-8 animate-pulse">⚡ Only 2 Spots Left This Month</p>

                        <form className="space-y-6 relative z-10">
                            <Input label="Name" placeholder="Name" type="text" />
                            <Input label="Email" placeholder="Email" type="email" />

                            <div className="grid grid-cols-2 gap-4">
                                <select className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors appearance-none">
                                    <option>Project Type</option>
                                    <option>Business Website</option>
                                    <option>E-commerce</option>
                                </select>
                                <select className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors appearance-none">
                                    <option>Budget</option>
                                    <option>$3k - $5k</option>
                                    <option>$5k - $10k</option>
                                    <option>$10k+</option>
                                </select>
                            </div>

                            <textarea
                                className="w-full bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric-blue transition-colors h-32 resize-none"
                                placeholder="Tell us about your project..."
                            />

                            <Button variant="primary" className="w-full py-4 text-lg">Send Message</Button>
                        </form>
                    </motion.div>

                    {/* Right: Info & 3D */}
                    <div className="relative h-full flex flex-col justify-between">
                        <div className="h-[300px] w-full mb-10 hidden md:block">
                            <ContactScene />
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-6">
                                {[
                                    { icon: <HiMail />, text: "hello@agencyx.com" },
                                    { icon: <HiPhone />, text: "+1 (555) 123-4567" },
                                    { icon: <HiLocationMarker />, text: "Silicon Valley, CA" }
                                ].map((item, i) => (
                                    <a key={i} href="#" className="flex items-center gap-4 text-xl text-white hover:text-electric-blue transition-colors group">
                                        <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-electric-blue group-hover:text-black transition-all">
                                            {item.icon}
                                        </div>
                                        {item.text}
                                    </a>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-8 mt-8">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="border-b border-white/5 py-4">
                                        <button
                                            className="flex justify-between items-center w-full text-left font-display font-medium text-lg hover:text-electric-blue transition-colors"
                                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        >
                                            {faq.q}
                                            <motion.div
                                                animate={{ rotate: openFaq === index ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <HiChevronDown />
                                            </motion.div>
                                        </button>
                                        <AnimatePresence>
                                            {openFaq === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-gray-400 mt-2 pb-2">{faq.a}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
