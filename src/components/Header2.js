import React, { useState, useEffect } from 'react';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Menu, X } from "lucide-react";

function Header() {
  const [isOpen, setIsOpen] = useState(true); // Default to true for desktop view

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false); // Set to false for mobile view
      } else {
        setIsOpen(true); // Set to true for desktop view
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup
    };
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when a link is clicked (especially on mobile)
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <div className='p-5 bg-primary flex justify-between items-center fixed top-0 left-0 right-0 z-50'>
      <h1 className='text-3xl sm:text-3xl'>
  <span className='text-secondary'>Abh</span>
  <span className='text-white'>ish</span>
  <span className='text-tertiary'>ek</span>
</h1>

      {/* Mobile menu button */}
      <button onClick={toggleNavbar} className='md:hidden focus:outline-none'>
        {isOpen ? <X size={30} color="#fff" /> : <Menu size={24} color="#fff" />}
      </button>

      {/* Navigation menu */}
      <nav className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center absolute md:relative top-full left-0 right-0 md:top-auto bg-primary md:bg-transparent py-5 md:py-0 shadow-lg md:shadow-none`}>
        <AnchorLink onClick={handleLinkClick} href='#about-section' className='text-white hover:text-secondary transition-colors py-2 px-3 text-xl'>
          About
        </AnchorLink>
        <AnchorLink onClick={handleLinkClick} href='#education-section' className='text-white hover:text-secondary transition-colors py-2 px-3 text-xl'>
          Experience
        </AnchorLink>
        <AnchorLink onClick={handleLinkClick} href='#projects-section' className='text-white hover:text-secondary transition-colors py-2 px-3 text-xl'>
          Projects
        </AnchorLink>
        <AnchorLink onClick={handleLinkClick} href='#courses-section' className='text-white hover:text-secondary transition-colors py-2 px-3 text-xl'>
          Courses
        </AnchorLink>
        <AnchorLink onClick={handleLinkClick} href='#contact-section' className='text-white hover:text-secondary transition-colors py-2 px-3 text-xl'>
          Contact
        </AnchorLink>
      </nav>
    </div>
  );
}

export default Header;
