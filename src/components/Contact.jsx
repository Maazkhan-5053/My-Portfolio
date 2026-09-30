import { useState, useRef, useEffect } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
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
        }, 3000);

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
            label: 'Email',
            value: 'Maaz@sampledomain.com',
            link: 'mailto:Maaz@sampledomain.com',
        },
        {
            icon: FaPhone,
            label: 'Phone',
            value: '+92 312-3456789',
            link: 'tel:+923123456789',
        },
        {
            icon: FaMapMarkerAlt,
            label: 'Location',
            value: 'Morocco',
            link: '#',
        },
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

    const inputClass = "w-full px-4 py-2.5 bg-zinc-900/50 border border-zinc-700/30 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-yellow-400/50 transition-colors duration-300";

    return (
        <section id="contact"
            className="min-h-screen bg-zinc-950 text-white py-16 px-6 font-ubuntu scroll-m-16 relative overflow-hidden"
            ref={ref}>
            <div className="absolute top-1/3 left-0 w-80 h-80 bg-yellow-400/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 right-0 w-96 h-80 bg-yellow-400/25 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8">

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className="text-yellow-400 font-semibold text-sm tracking-[0.3em] uppercase mb-2">
                        Get In Touch
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="text-4xl sm:text-5xl font-bold ">
                        Contact {' '}
                        <span className="bg-linear-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">Me</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className='w-24 sm:w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded-full' />

                    <motion.div
                        variants={containerVariants}
                        initial='hidden'
                        animate={isInView ? 'visible' : 'hidden'}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-8">
                        <motion.div
                            variants={itemVariants}
                            className="space-y-5">
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon;
                                return (
                                    <motion.a
                                        key={index}
                                        href={info.link}
                                        variants={itemVariants}
                                        whileHover={{ x: 8, transition: { type: 'spring', stiffness: 300 } }}
                                        className="group flex items-center gap-4 p-4 bg-zinc-800/30 backdrop-blur-sm rounded-2xl border border-zinc-700/30 hover:border-yellow-400/50 transition-all duration-300">
                                        <div className="p-3 bg-amber-400/10 rounded-xl group-hover:bg-yellow-400/20 transition-colors duration-300">
                                            <Icon className="w-5 h-5 text-yellow-400" />
                                        </div>
                                        <div>
                                            <p className="text-zinc-500 text-xs text-left">{info.label}</p>
                                            <p className="text-white text-sm font-medium group-hover:text-yellow-400 transition-colors duration-300">{info.value}</p>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <form
                                onSubmit={handleSubmit}
                                className="bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/30 shadow-lg ">
                                <div className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name"
                                            className="block text-zinc-300 text-sm font-medium mb-1.5 text-left">
                                            Your Name
                                        </label>
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
                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email"
                                            className="block text-zinc-300 text-sm font-medium mb-1.5 text-left">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className={inputClass}
                                            placeholder="John@example.com" />
                                    </div>
                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message"
                                            className="block text-zinc-300 text-sm font-medium mb-1.5 text-left">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="4"
                                            className={inputClass}
                                            placeholder="Tell Me About Your Project..." />
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
                                        className="w-full py-3 bg-yellow-400 text-zinc-950 font-bold rounded-xl text-sm hover:bg-yellow-300 transition-all duration-300 shadow-lg shadow-yellow-400/20 disabled:opacity-50 disabled:cursor-not-allowed">
                                        {
                                            isLoading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <AiOutlineLoading3Quarters
                                                        className="animate-spin h-5 w-5 text-zinc-950" />
                                                    Sending...
                                                </span>
                                            ) : ('Send Message')
                                        }
                                    </motion.button>

                                </div>
                            </form>
                        </motion.div>

                    </motion.div>

                </motion.div>
            </div>

        </section>
    )
}

export default Contact
