import { useState, useRef, useEffect } from "react";
import {
    FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser, FaCommentDots,
    FaPaperPlane, FaArrowRight, FaGithub, FaLinkedinIn, FaTwitter,
} from "react-icons/fa";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    // Auto-hide the status message after 5 seconds (AnimatePresence handles the fade-out)
    useEffect(() => {
        if (!status.message) return;

        const timer = setTimeout(() => {
            setStatus({ type: '', message: '' });
        }, 5000);

        return () => clearTimeout(timer);
    }, [status]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('https://formspree.io/f/meaondpp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setStatus({
                    type: 'success',
                    message: 'Message Sent Successfully!'
                });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({
                    type: 'error',
                    message: 'Something went wrong. Please try again.',
                });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Network error. Please check your connection.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            label: 'Email Me',
            value: 'Maaz45139@gmail.com',
            link: 'mailto:maaz45139@gmail.com',
        },
        {
            icon: FaPhone,
            label: 'Call Me',
            value: '+92 332-2169065',
            link: 'tel:+923322169065',
        },
        {
            icon: FaMapMarkerAlt,
            label: 'Location',
            value: 'Islamabad, Pakistan',
            link: '#',
        },
    ];

    const socials = [
        { icon: FaGithub, label: 'GitHub', link: '#' },
        { icon: FaLinkedinIn, label: 'LinkedIn', link: '#' },
        { icon: FaTwitter, label: 'Twitter', link: '#' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 15,
                stiffness: 100
            }
        }
    };

    const inputClass = "w-full pl-11 pr-4 py-3 bg-zinc-900/60 border border-zinc-700/40 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-yellow-400/60 focus:ring-4 focus:ring-yellow-400/10 transition-all duration-300";
    const iconClass = "absolute left-4 text-zinc-500 group-focus-within:text-yellow-400 transition-colors duration-300 w-4 h-4";

    return (
        <section id="contact"
            className="min-h-screen bg-zinc-950 text-white py-20 px-4 sm:px-6 font-ubuntu scroll-m-16 relative overflow-hidden"
            ref={ref}>

            {/* Background: subtle grid + glows */}
            {/* <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, #facc15 1px, transparent 1px), linear-gradient(to bottom, #facc15 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
                }} /> */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-80 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-14">

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className="text-yellow-400 font-semibold text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2">
                        Get In Touch
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="text-4xl sm:text-5xl font-bold">
                        Contact {' '}
                        <span className="bg-linear-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Me</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className='w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded-full' />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial='hidden'
                    animate={isInView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">

                    {/* LEFT: intro + info */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col">

                        <div className="inline-flex items-center gap-2 self-center md:self-start px-3 py-1.5 mb-5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                            </span>
                            Available for new projects
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-3 text-center md:text-left">
                            Let's build something{' '}
                            <span className="bg-linear-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">amazing</span>{' '}
                            together.
                        </h3>
                        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-7 font-light text-center md:text-left">
                            Have a project in mind or just want to say hello? Drop me a message and I'll get back to you within 24 hours.
                        </p>

                        <div className="space-y-4">
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon;
                                return (
                                    <motion.a
                                        key={index}
                                        href={info.link}
                                        variants={itemVariants}
                                        whileHover={{ x: 8, transition: { type: 'spring', stiffness: 300 } }}
                                        className="group flex items-center gap-4 p-4 bg-zinc-800/30 backdrop-blur-sm rounded-2xl border border-zinc-700/30 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-300">
                                        <div className="p-3 bg-yellow-400/10 text-yellow-400 rounded-xl group-hover:bg-yellow-400 group-hover:text-zinc-950 transition-all duration-300">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-zinc-500 text-xs">{info.label}</p>
                                            <p className="text-white text-sm font-medium truncate group-hover:text-yellow-400 transition-colors duration-300">{info.value}</p>
                                        </div>
                                        <FaArrowRight className="w-3.5 h-3.5 text-yellow-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                    </motion.a>
                                );
                            })}
                        </div>

                        {/* Socials */}
                        {/* <div className="flex items-center gap-3 mt-7">
                            <span className="text-zinc-500 text-xs uppercase tracking-widest mr-1">Follow</span>
                            {socials.map(({ icon: SocialIcon, label, link }) => (
                                <motion.a
                                    key={label}
                                    href={link}
                                    aria-label={label}
                                    whileHover={{ y: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-3 bg-zinc-800/40 border border-zinc-700/30 rounded-full text-zinc-300 hover:bg-yellow-400 hover:text-zinc-950 hover:border-yellow-400 transition-all duration-300">
                                    <SocialIcon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div> */}
                    </motion.div>

                    {/* RIGHT: form with gradient border */}
                    <motion.div variants={itemVariants} className="lg:col-span-3">
                        <div className="relative h-full p-px rounded-3xl bg-linear-to-br from-yellow-400/60 via-zinc-700/30 to-yellow-400/10 shadow-2xl shadow-yellow-400/5">
                            <form
                                onSubmit={handleSubmit}
                                className="h-full bg-zinc-900/90 backdrop-blur-md rounded-[calc(1.5rem-1px)] p-6 sm:p-8">

                                <div className="mb-6">
                                    <h3 className="text-xl font-bold">Send a message</h3>
                                    <p className="text-zinc-500 text-sm mt-1">Fill in the form and I'll reply soon.</p>
                                </div>

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name"
                                                className="block text-zinc-300 text-sm font-medium mb-1.5">
                                                Your Name
                                            </label>
                                            <div className="group relative flex items-center">
                                                <FaUser className={iconClass} />
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className={inputClass}
                                                    placeholder="John" />
                                            </div>
                                        </div>
                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email"
                                                className="block text-zinc-300 text-sm font-medium mb-1.5">
                                                Your Email
                                            </label>
                                            <div className="group relative flex items-center">
                                                <FaEnvelope className={iconClass} />
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className={inputClass}
                                                    placeholder="john@example.com" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message"
                                            className="block text-zinc-300 text-sm font-medium mb-1.5">
                                            Message
                                        </label>
                                        <div className="group relative">
                                            <FaCommentDots className="absolute left-4 top-4 text-zinc-500 group-focus-within:text-yellow-400 transition-colors duration-300 w-4 h-4" />
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows="6"
                                                className={`${inputClass} resize-none`}
                                                placeholder="Tell me about your project..." />
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {status.message && (
                                            <motion.div
                                                key={status.message}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.4 }}
                                                className={`p-3 rounded-xl text-sm ${
                                                    status.type === 'success'
                                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                }`}>
                                                {status.message}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group w-full py-3.5 bg-linear-to-r from-yellow-400 to-yellow-500 text-zinc-950 font-bold rounded-xl text-sm hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg shadow-yellow-400/25 disabled:opacity-50 disabled:cursor-not-allowed">
                                        {
                                            isLoading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <AiOutlineLoading3Quarters
                                                        className="animate-spin h-5 w-5 text-zinc-950" />
                                                    Sending...
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-2">
                                                    Send Message
                                                    <FaPaperPlane className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                                </span>
                                            )
                                        }
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </motion.div>

                </motion.div>
            </div>

        </section>
    )
}

export default Contact
