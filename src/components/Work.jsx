import { useRef, useState, useEffect } from 'react';
import work1 from '../assets/work1.webp'
import work4 from '../assets/work4.webp'
import work5 from '../assets/work5.jpg'
import { useInView, motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';


const PROJECTS = [
    {
        id: 1,
        title: 'Auto Service POS',
        desc: 'A modern React-based point-of-sale application designed for automotive service businesses. The application manages customers, appointments, services, and other day-to-day workshop operations through a responsive interface.',
        image: work1,
        technologies: ['React.js', 'JavaScript', 'Tailwind CSS'],
        liveDemo: 'https://auto-service-pos.netlify.app/',
        github: 'https://github.com/Maazkhan-5053/auto-service-pos',
    },
    {
        id: 2,
        title: 'The Audio People',
        desc: 'A WooCommerce e-commerce website for an audio equipment business, including product management, brand systems, filtering, custom pricing functionality, pre-order workflows, and responsive shopping experiences.',
        image: work4,
        technologies: ['WooCommerce', 'PHP', 'JavaScript'],
        liveDemo: 'https://theaudiopeople.com.vn/',
        github: '#',
    },
    {
        id: 3,
        title: 'E-Commerce Platform',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        image: work1,
        technologies: ['React', 'Node.js', 'MongoDB'],
    },
    {
        id: 4,
        title: 'E-Commerce Platform',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        image: work1,
        technologies: ['React', 'Node.js', 'MongoDB'],
    },
    {
        id: 5,
        title: 'E-Commerce Platform',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        image: work1,
        technologies: ['React', 'Node.js', 'MongoDB'],
    },
    {
        id: 6,
        title: 'E-Commerce Platform',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        image: work1,
        technologies: ['React', 'Node.js', 'MongoDB'],
    },
];

// Must match the `gap-6` class (6 * 4px = 24px) on the sliding track
const GAP = 24;

const getItemsPerPages = () => {
    if (typeof window === 'undefined') return 3;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
};

// Card width accounts for the gaps between cards
const getCardWidth = (itemsPerPage) =>
    `calc((100% - ${(itemsPerPage - 1) * GAP}px) / ${itemsPerPage})`;

const Work = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPages);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    const totalPages = Math.ceil(PROJECTS.length / itemsPerPage);
    const maxIndex = Math.max(0, PROJECTS.length - itemsPerPage);
    const cardWidth = getCardWidth(itemsPerPage);

    // One step = one card width + one gap. Split across columns:
    // step = 100/n % + GAP/n px
    const translatePercentage = currentIndex * (100 / itemsPerPage);
    const translateGap = currentIndex * (GAP / itemsPerPage);
    const currentPage = Math.floor(currentIndex / itemsPerPage);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(getItemsPerPages());
            setCurrentIndex(0);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const handlePointerDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setDragOffset(0);
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;
        setDragOffset(startX - e.clientX);
    }

    const handlePointerUp = () => {
        if (!isDragging) return;
        setIsDragging(false);

        if (dragOffset > 50) {
            setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
        } else if (dragOffset < -50) {
            setCurrentIndex((prev) => Math.max(prev - 1, 0));
        }
        setDragOffset(0);
    };

    const handlePointerCancel = () => {
        setIsDragging(false);
        setDragOffset(0);
    };

    const goToPage = (pageIndex) => {
        setCurrentIndex(Math.min(pageIndex * itemsPerPage, maxIndex));
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                damping: 15,
                stiffness: 100,
                delay: index * 0.1
            },
        })
    }

  return (
    <section
    id="work"
    ref={sectionRef}
    className='lg:min-h-screen bg-zinc-950 text-white py-24 sm:py-28 lg:py-16 px-4 sm:px-6 font-ubuntu scroll-m-16 overflow-hidden relative'>

        <div className='absolute top-1/3 left-1/2 -translate-x-1/2 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-80 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none'>
        </div>

        <div className='max-w-6xl mx-auto relative z-10'>

            <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={ isInView ? { opacity: 1, y: 0} : {}}
            transition={{ duration: 0.6 }}
            className='text-center mb-8 lg:mb-10'>

                <motion.p
                initial={{ opacity: 0}}
                animate={ isInView ? { opacity: 1} : {}}
                transition={{ duration: 0.2 }}
                className='text-yellow-400 font-semibold text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2'>
                    My Portfolio
                </motion.p>
                <motion.h2
                initial={{ opacity: 0, y: 20}}
                animate={ isInView ? { opacity: 1, y: 0} : {}}
                transition={{ duration: 0.3 }}
                className='text-4xl font-bold'>
                    Featured {' '}
                    <span className='bg-linear-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent'>
                        Projects
                    </span>
                </motion.h2>
                <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className='w-20 sm:w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded-full' />
            </motion.div>

            <div className='relative overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y select-none'
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onPointerLeave={handlePointerCancel}>

                <div
                className='flex gap-6'
                style={{
                    transform: `translateX(calc(-${translatePercentage}% - ${translateGap}px - ${dragOffset}px))`,
                    transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
                }}>
                    {PROJECTS.map((project, index) => (
                         <motion.div
                         key={project.id}
                         custom={index}
                         variants={cardVariants}
                         initial='hidden'
                         animate={isInView ? 'visible' : 'hidden'}
                         className='shrink-0 group'
                         style={{ width: cardWidth }}>

                            <div className='bg-zinc-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-700/30 hover:border-yellow-400/50 shadow-lg hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-300 h-full'>

                                <div className='relative overflow-hidden h-40 sm:h-40 lg:h-44'>
                                    <img src={project.image} alt={project.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-400 pointer-events-none' draggable='false' />

                                    <div className='absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-60'>
                                    </div>
                                    <div className='absolute top-3 right-3 flex gap-2'>
                                        <a href={project.github} target='_blank' rel='noopener noreferrer' aria-label='GitHub' className='p-2 bg-zinc-900/80 backdrop-blur-sm rounded-full hover:bg-yellow-400 hover:text-zinc-950 transition-all duration-300'
                                        onPointerDown={ (e) => e.stopPropagation()}>
                                            <FaGithub className='w-4 h-4'/>
                                        </a>
                                        <a href={project.liveDemo} target='_blank' rel='noopener noreferrer' aria-label='Live demo' className='p-2 bg-zinc-900/80 backdrop-blur-sm rounded-full hover:bg-yellow-400 hover:text-zinc-950 transition-all duration-300'
                                        onPointerDown={ (e) => e.stopPropagation()}>
                                            <FaExternalLinkAlt className='w-4 h-4'/>
                                        </a>
                                    </div>

                                </div>
                                    <div className='p-4 sm:p-5'>
                                        <h3 className='text-base sm:text-lg font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors duration-300'>{project.title}</h3>
                                        <p className='text-zinc-400 text-xs sm:text-sm mb-4 leading-relaxed'>
                                            {project.desc}
                                        </p>
                                        <div className='flex flex-wrap gap-1.5 sm:gap-2'>
                                            {project.technologies.map((tech, techIndex) => (
                                                <span
                                                key={techIndex}
                                                className='px-2 sm:px-2.5 py-1 bg-zinc-800/50 text-zinc-300 text-[10px] sm:text-xs rounded-full border border-zinc-700/30 whitespace-nowrap'>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                            </div>

                         </motion.div>
                    ))}
                </div>

            </div>
                    <div className='flex justify-center items-center gap-2 mt-4 sm:mt-5'>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                            key={index}
                            onClick={() => goToPage(index)}
                            aria-label={`Go To Page ${index + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 
                            ${
                                currentPage === index
                                ? 'w-8 bg-yellow-400'
                                : 'w-2 bg-zinc-600 hover:bg-zinc-400'
                            }`}>

                            </button>
                        ))}
                    </div>
        </div>

    </section>
  )
}

export default Work
