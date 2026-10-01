import { motion } from 'framer-motion'
import { a } from 'framer-motion/client';
import { FaGithub, FaHeart, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaGithub, link: 'https://github.com/Maazkhan-5053', label: 'GitHub' },
        { icon: FaLinkedin, link: 'https://www.linkedin.com/in/muhammad-maaz-khan-484587204', label: 'LinkedIn' },
    ];

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#Services' },
        { name: 'Skills', href: '#Skills' },
        { name: 'Work', href: '#work' },
        { name: 'Contact', href: '#contact' },

    ]
    return (
        <footer className='bg-zinc-900/50 border-t border-zinc-800/50 text-white py-8 px-6 font-ubuntu'>
            <div className='max-w-6xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='text-center md:text-left'>
                        <h3 className='text-xl font-bold'>
                            <span className='text-yellow-400'>Maaz Khan</span>
                        </h3>
                        <p className='text-zinc-500 text-sm mt-1'>Creative Web Developer</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className='flex flex-wrap justify-center gap-4 md:gap-6'>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className='text-zinc-400 hover:text-yellow-400 text-sm transition-all duration-300 hover:scale-105 transform'>
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='flex justify-center md:justify-end gap-3'>
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <motion.a
                                key={index}
                                href={social.link}
                                targrt="_blank"
                                rel='noopener noreferrer'
                                whileHover={{ scale:1.1 }}
                                className='p-2.5 bg-zinc-800/50 rounded-full border border-zinc-700/30 hover:border-yellow-400/50 hover:bg-yellow-400/10 transition-all duration-300 text-zinc-400 hover:text-yellow-400'
                                aria-label={social.label}
                                >
                                    <Icon className='w-4 h-4'/>
                                </motion.a>
                            )
                        })}
                    </motion.div>
                </div>
                <motion.div
                initial={{ opacity: 0}}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className='mt-6 pt-6 border-t border-zinc-800/50 text-center'>
                            <p className='text-zinc-500 text-xs flex items-center justify-center gap-1 flex-wrap'>
                            {currentYear} Maaz Khan. All Rights Reserved.
                            <span className='flex item-center gap-1'>
                                Made with <FaHeart className='text-red-500 w-3 h-3 mx-0.5 animate-pulse'/>
                                Using React & Tailwind CSS
                            </span>
                            </p>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer
