import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import WavyButton from './WavyButton';
import MagneticItem from './MagneticItem';
import '../style/Header.css';

function Header({ isOpen, setIsOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = ['about', 'expertise', 'work', 'services', 'blog', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll lock (unchanged)
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [isOpen]);

  /* -------- MOBILE MENU (ANIMATION DISABLED) -------- */
const mobileMenuVariants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: {
      duration: 0.35,               // fast but smooth
      ease: [0.76, 0, 0.24, 1],      // premium easing
    },
  },
  exit: {
    x: '-100%',
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};


  return (
    <header
      className={`sticky top-0 z-50 px-[5.5vw] py-[1vw] bg-surface transition-all duration-300 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="flex items-center justify-between h-20">
        {/* LOGO */}
        <div className="logo">
          <MagneticItem>
            <Link to="/">
              <h3 className="text-text text-3xl font-semibold">
                IT SKILLS
              </h3>
            </Link>
          </MagneticItem>
        </div>

        {/* DESKTOP MENU (UNCHANGED) */}
        <motion.div
        className="menu hidden lg:flex items-center gap-[5.5vw]"

          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ul className="flex gap-10 text-xl font-normal">
            {navLinks.map(link => (
              <li key={link} className="relative group cursor-pointer">
                <Link to={`/${link}`}>
                  {link}
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] bg-text transition-all duration-300 ${
                      location.pathname === `/${link}` ? 'w-full' : 'w-0'
                    } group-hover:w-full`}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <WavyButton />
        </motion.div>

        {/* MOBILE HAMBURGER */}
        <div className="lg:hidden text-2xl text-text z-50">

           <button onClick={() => setIsOpen(true)}><FaBars /></button>
        </div>
      </div>

      {/* -------- MOBILE FULLSCREEN MENU (NO ANIMATION) -------- */}
{/* MOBILE FULLSCREEN MENU */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      variants={mobileMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-black z-[999] lg:hidden"

    >
      {/* TOP BAR */}
     <div className="flex items-center justify-between h-20 px-6 sm:px-8 md:px-12 relative z-50">

        <h3 className="text-white text-2xl font-montserrat font-semibold">
          IT SKILLS
        </h3>
        <button
          className="text-2xl text-white z-50"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </button>
      </div>

      {/* MENU LINKS */}
      <div className="flex flex-col justify-center items-center min-h-[calc(100%-80px)] py-10 md:py-16 lg:py-0 overflow-y-auto">
        <ul className="flex flex-col items-center text-center gap-8 text-3xl font-medium text-white w-full">
          {navLinks.map((link) => (
            <li key={link} className="flex justify-center">
              <div className="relative inline-flex flex-col items-center">
                <Link
                  to={`/${link}`}
                  onClick={() => setIsOpen(false)}
                  className="relative z-50"
                >
                  {link}
                </Link>
                <span
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-blue-500 transition-all duration-300 ease-out ${
                    location.pathname === `/${link}` ? "w-full" : "w-[20%]"
                  }`}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <WavyButton />
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </header>
  );
}

export default Header;
