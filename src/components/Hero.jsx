import  { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import hero from '../assets/hero.png'

const words = ['Front-End Developer', 'React Developer', 'CMS Developer'];

const Hero = () => {

    const [index, setIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout;
        const currentWord = words[index];

        if (isDeleting) {
            timeout = setTimeout(() => {
                setDisplayedText(currentWord.substring(0, displayedText.length - 1));

                if (displayedText.length === 0) {
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % words.length);
                }
            }, 80);
        }
        else {
            timeout = setTimeout(() => {
                setDisplayedText(currentWord.substring(0, displayedText.length + 1));

                if (displayedText.length === currentWord.length) {
                    setTimeout(() => setIsDeleting(true), 1000);
                }
            }, 120);
        }
        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, index])

    return (
        <section
            id="home"
            className='lg:min-h-screen text-white flex items-center justify-center relative overflow-hidden pt-28 lg:pt-40 pb-28 sm:pb-18 px-4 sm:px-6 font-ubuntu'>

            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 sm:w-75 sm:h-75 md:w-100 md:h-100 lg:w-125 lg:h-125 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none'></div>

            <div className='max-w-6xl mx-auto w-full items-center grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 z-10'>

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className='lg:col-span-5 flex justify-center items-center order-1 lg:order-0'>
                    <div className='relative w-64 sm:w-72 h-80 sm:h-96 flex items-center justify-center my-4'>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                            animate={{ opacity: 0.9, scale: 1, rotate: -10 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className='absolute rounded-2xl shadow-xl'
                            style={{
                                width: '100%',
                                height: '100%',
                                background: 'linear-linear(145deg, #fef9c3, #fde047)',
                                transform: 'translateX(-28px) translateY(18px) rotate(-10deg)',
                                zIndex: 1,
                                border: '3px solid rgba(250, 204, 21, 0.5)',
                                boxShadow: '0 20px 60px rgba(250, 204, 21, 0.2)',
                            }}>

                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                            animate={{ opacity: 0.9, scale: 1, rotate: -5 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='absolute rounded-2xl shadow-xl'
                            style={{
                                width: '100%',
                                height: '100%',
                                background: 'linear-linear(145deg, #facc15, #eab308)',
                                transform: 'translateX(-14px) translateY(9px) rotate(-5deg)',
                                zIndex: 2,
                                border: '3px solid rgba(234, 179, 8, 0.6)',
                                boxShadow: '0 20px 60px rgba(234, 179, 8, 0.3)',
                            }}>

                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 0.9, scale: 1, y: [0, -8, 0] }}
                            transition={{ duration: 0.6, delay: 0.2, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                            className='absolute rounded-2xl shadow-xl bg-linear-to-br from-yellow-400 to-yellow-500 overflow-hidden flex items-end justify-center'
                            style={{
                                width: '100%',
                                height: '100%',
                                zIndex: 3,
                                border: '3px solid rgba(250, 204, 21, 0.8)',
                                boxShadow: '0 20px 60px rgba(250, 204, 21, 0.4)',
                            }}>

                            <motion.img src={hero}
                                alt="Hero"
                                className='w-full h-[88%] object-cover object-top '
                                whileHover={{ scale: 1.08 }}
                                transition={{ duration: 0.4 }}>
                            </motion.img>

                            <div className='absolute inset-0 bg-linear-to-t from-yellow-400/20  via-transparent to-transparent pointer-events-none'>
                            </div>

                        </motion.div>

                    </div>
                </motion.div>

                <div className='lg:col-span-7 flex flex-col items-center lg:items-start lg:text-left order-2 lg:order-0'>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='text-zinc-300 text-sm sm:text-base lg:text-lg font-medium mb-1 sm:mb-2 tracking-wide'>
                        Hi! I'm <span className='text-yellow-400 font-bold '>Maaz Khan</span>
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='text-4xl lg:text-6xl font-bold tracking-tight my-2 sm:my-3 text-center sm:text-left'>
                        <div>Creative Web &</div>
                        <div className='inline-flex items-center min-h-[1.2em] relative justify-center lg:justify-start'>
                            <span className='text-yellow-400 text-3xl font-ubuntu font-medium lg:text-5xl xl:text-6xl text-center sm:text-left min-h-[1em]'>{displayedText}</span>
                            <span className='w-1 h-6 sm:h-8 md:h-10 lg:h-12 bg-yellow-400 ml-1 sm:ml-2 inline-block animate-pulse text-3xl font-ubuntu font-medium lg:text-5xl xl:text-6xl min-h-[1em]'/>
                        </div>
                    </motion.h1>

                    <motion.p
                     initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className='text-zinc-400 text-lg max-w-xl font-light font-ubuntu leading-relaxed my-2 sm:my-4 px-2 sm:px-0 text-center sm:text-left'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam ex laboriosam provident eveniet iusto? Possimus modi itaque incidunt dolor. 
                    </motion.p>
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className='flex flex-wrap gap-3 sm:gap-4 mt-1 sm:mt-2 justify-center lg:justify-start'>

                            <a
                            href="#Contact"
                            className='px-8 py-3.5 bg-yellow-400 text-zinc-950 font-bold rounded-full hover:scale-105 font-ubuntu text-xs sm:text-sm transition-all duration-300'>
                                Contact Me
                            </a>
                            <a
                            href="#Contact"
                            className='px-8 py-3.5 border-2 border-yellow-400/80 text-yellow-400 font-semibold rounded-full hover:scale-105 font-ubuntu text-xs sm:text-sm transition-all duration-300'>
                                My Work
                            </a>

                    </motion.div>

                </div>

            </div>

        </section>
    )
}

export default Hero
