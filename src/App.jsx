import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import {motion} from 'framer-motion'
import Hero from './components/Hero';
import Skills from './components/Skills';
import Work from './components/Work';
import Services from './components/Services';
import Contact_redesign from './components/Contact_redesign'
import Footer from './components/Footer';

const App = () => {

  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect( () => {
    const handelMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handelMouseMove);
    return () => window.removeEventListener('mousemove', handelMouseMove);
  }, []);

  return (
    <div className='bg-zinc-950 text-white min-h-screen relative overflow-x-hidden selection:bg-yellow-400 selection:text-zinc-950 font-ubuntu'>

      <motion.div className='fixed top-0 left-0 w-8 h-8 rounded-full border border-yellow-400/80 pointer-events-none z-50 flex items-center justify-center'
      animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16}}
      transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.5}}>

        <div className='w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_2px_rgba(255,255,0,0.5)]'/>

      </motion.div>
      <Navbar />
      <Hero/>
      <Skills/>
      <Work/>
      <Services/>
      <Contact_redesign/>
      <Footer/>
    </div>
  )
}

export default App
