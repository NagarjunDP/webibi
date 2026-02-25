import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "relative px-8 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group";

    const variants = {
        primary: "bg-gradient-to-r from-accent-cyan to-accent-magenta text-white shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)]",
        secondary: "bg-surface border border-white/10 text-white hover:bg-white/5 hover:border-accent-cyan/50",
        outline: "bg-transparent border-2 border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10",
        glow: "bg-transparent text-white border border-white/20 hover:border-accent-green hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12" />
            )}
        </motion.button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'glow']),
    className: PropTypes.string,
};

export default Button;
