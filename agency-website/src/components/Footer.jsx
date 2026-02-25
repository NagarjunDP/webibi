import { Link } from 'react-scroll';
import { HiHeart } from 'react-icons/hi';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
            {/* Gradient Blob */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-deep-purple/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-electric-blue/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 text-center md:text-left">
                    <div className="md:col-span-5">
                        <div className="text-4xl font-display font-bold text-white mb-6">
                            AGENCY<span className="text-electric-blue">_X</span>
                        </div>
                        <p className="text-gray-400 text-lg max-w-sm mx-auto md:mx-0">
                            We build digital experiences that rank, convert, and dominate. Your success is our code.
                        </p>
                    </div>

                    <div className="md:col-span-2 md:col-start-7">
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Explore</h4>
                        <ul className="space-y-4">
                            {['Services', 'Work', 'Process', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item.toLowerCase()}
                                        smooth={true}
                                        className="text-gray-400 hover:text-electric-blue transition-colors cursor-pointer block"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Socials</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Twitter", icon: <FaTwitter /> },
                                { name: "Instagram", icon: <FaInstagram /> },
                                { name: "LinkedIn", icon: <FaLinkedin /> },
                                { name: "GitHub", icon: <FaGithub /> }
                            ].map((social) => (
                                <li key={social.name}>
                                    <a href="#" className="flex items-center gap-2 justify-center md:justify-start text-gray-400 hover:text-electric-blue transition-colors">
                                        {social.icon} {social.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {currentYear} AgencyX. All rights reserved.</p>
                    <div className="flex items-center gap-1 mt-4 md:mt-0">
                        Crafted with <HiHeart className="text-neon-pink animate-pulse" /> by
                        <span className="text-white font-bold">AgencyX</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
