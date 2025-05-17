import React, { useState, useEffect } from 'react';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 backdrop-blur-md ${
        scrolled 
          ? 'bg-light-100/80 dark:bg-dark-600/80 shadow-lg' 
          : 'bg-transparent'
      } transition-all duration-300`}
    >
      <div className='flex justify-between items-center px-8 py-4'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className='text-4xl font-bold'>
            <span className='text-secondary dark:text-secondary-light'>Abh</span>
            <span className='text-primary-dark dark:text-light-100'>ish</span>
            <span className='text-tertiary dark:text-tertiary-light'>ek</span>
          </h1>
        </motion.div>

        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.nav 
                key="nav"
                variants={navVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`flex md:absolute md:top-full md:right-0 md:w-full md:bg-light-100/95 md:dark:bg-dark-600/95 md:py-5 md:px-8 md:shadow-lg md:flex-col md:backdrop-blur-md ${
                  !isOpen ? 'md:hidden' : ''
                }`}
              >
                {[
                  { name: 'About', id: 'about-section' },
                  { name: 'Education', id: 'education-section' },
                  { name: 'Projects', id: 'projects-section' },
                  { name: 'Courses', id: 'courses-section' },
                  { name: 'Contact', id: 'contact-section' }
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="group"
                  >
                    <AnchorLink 
                      href={`#${item.id}`} 
                      onClick={() => window.innerWidth <= 768 ? setIsOpen(false) : null}
                      className='relative px-4 py-2 text-lg font-medium text-primary-dark dark:text-light-100 hover:text-secondary dark:hover:text-secondary-light transition-colors'
                    >
                      {item.name}
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary dark:bg-secondary-light group-hover:w-full transition-all duration-300"
                        whileHover={{ width: '100%' }}
                      />
                    </AnchorLink>
                  </motion.div>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
          
         
<div>
         <div className=''>
           <ThemeToggle/>
         </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={toggleNavbar} 
            className='focus:outline-none md:block hidden'
          >
            {isOpen ? 
              <X size={24} className="text-primary-dark dark:text-light-100" /> : 
              <Menu size={24} className="text-primary-dark dark:text-light-100" />
            }
          </motion.button>
</div>
        </div>
      </div>
      
    </motion.header>
  );
}

export default Header;
