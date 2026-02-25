import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Button from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

// 3D Scene Component
const Scene = () => {
    const meshRef = useRef(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <>
            <Environment preset="city" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
                <mesh ref={meshRef} scale={2}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial
                        color="#000"
                        roughness={0.1}
                        metalness={1}
                        wireframe
                        emissive="#00E5FF"
                        emissiveIntensity={2}
                    />
                </mesh>
            </Float>
            {/* Floating Particles */}
            {Array.from({ length: 20 }).map((_, i) => (
                <Float key={i} speed={1 + Math.random()} rotationIntensity={1} floatIntensity={1} position={[
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 5
                ]}>
                    <mesh scale={0.05}>
                        <sphereGeometry />
                        <meshBasicMaterial color="#FF2E97" />
                    </mesh>
                </Float>
            ))}
        </>
    );
};

const Hero = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        const titleText = new SplitType(titleRef.current, { types: 'chars' });

        gsap.from(titleText.chars, {
            opacity: 0,
            y: 100,
            rotateX: -90,
            stagger: 0.05,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: titleRef.current,
                start: "top 80%",
            }
        });

        gsap.from(subtitleRef.current, {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 1,
            ease: "power2.out"
        });

        return () => titleText.revert();
    }, []);

    return (
        <section id="hero" className="relative h-screen w-full bg-void overflow-hidden">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <Scene />
                </Canvas>
                <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-6 px-4 py-1 border border-electric-blue/30 rounded-full bg-electric-blue/5 backdrop-blur-md text-electric-blue font-mono text-sm uppercase tracking-widest"
                >
                    Available for limited projects
                </motion.div>

                <h1 ref={titleRef} className="text-5xl md:text-8xl font-display font-bold text-white mb-6 leading-[1.1]">
                    WE DON'T BUILD WEBSITES <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-deep-purple to-neon-pink">
                        WE BUILD EMPIRES
                    </span>
                </h1>

                <p ref={subtitleRef} className="text-base md:text-xl text-gray-400 max-w-2xl mb-10 font-body">
                    Award-winning digital experiences that merge insane aesthetics with conversion-focused strategy.
                </p>

                <div className="flex gap-6">
                    <Button variant="primary" className="shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                        Launch Project
                    </Button>
                    <Button variant="outline">
                        View Work
                    </Button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm font-mono tracking-widest"
            >
                SCROLL TO EXPLORE
            </motion.div>
        </section>
    );
};

export default Hero;
