import { motion } from 'framer-motion';
import { HiCheck, HiShieldCheck, HiChartBar, HiCode, HiUserGroup, HiSupport } from 'react-icons/hi';

const WhyUs = () => {
    const features = [
        {
            title: "SEO-First Development",
            description: "Every line of code is written to rank higher on Google.",
            icon: <HiChartBar className="text-3xl text-accent-cyan" />,
        },
        {
            title: "Event Industry Experts",
            description: "We know the event business better than anyone else.",
            icon: <HiUserGroup className="text-3xl text-accent-magenta" />,
        },
        {
            title: "100% Success Rate",
            description: "All our clients rank on Page 1. No exceptions.",
            icon: <HiShieldCheck className="text-3xl text-accent-green" />,
        },
        {
            title: "Modern Tech Stack",
            description: "Next.js & React. No slow WordPress templates.",
            icon: <HiCode className="text-3xl text-yellow-400" />,
        },
        {
            title: "Transparent Process",
            description: "You see everything. No hidden fees or delays.",
            icon: <HiCheck className="text-3xl text-blue-400" />,
        },
        {
            title: "Post-Launch Support",
            description: "We don't disappear after launch. We help you grow.",
            icon: <HiSupport className="text-3xl text-purple-400" />,
        }
    ];

    return (
        <section id="why-us" className="py-20 bg-background relative z-10">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
                        Why We&apos;re <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-magenta">Different</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-surface/50 border border-white/5 hover:bg-surface hover:border-accent-cyan/20 transition-all duration-300"
                        >
                            <div className="bg-white/5 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-text-muted">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
