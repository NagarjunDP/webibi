import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    // Smooth mouse movement
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            ref={cursorRef}
            className={`fixed top-0 left-0 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block`}
            style={{
                x: cursorX,
                y: cursorY,
                translateX: '-50%',
                translateY: '-50%',
            }}
            animate={{
                width: isHovering ? 60 : 20,
                height: isHovering ? 60 : 20,
                backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,1)',
                border: isHovering ? '1px solid rgba(255,255,255,0.5)' : 'none',
                backdropFilter: isHovering ? 'blur(2px)' : 'none'
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
    );
};

export default CustomCursor;
