import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1, delay: 2.5, ease: "easeInOut" }}
            onAnimationComplete={onComplete}
            className="fixed inset-0 z-[10000] bg-void flex items-center justify-center"
        >
            <div className="relative">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-[2px] bg-electric-blue mb-4"
                />
                <h1 className="text-6xl md:text-8xl font-display font-bold text-white overflow-hidden">
                    <motion.span
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
                        className="inline-block"
                    >
                        AGENCY
                    </motion.span>
                    <motion.span
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.6, 0.01, -0.05, 0.95] }}
                        className="inline-block text-electric-blue"
                    >
                        X
                    </motion.span>
                </h1>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
