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

  return (
    <div className='p-5 bg-primary flex justify-between'>
      <h1 className='text-secondary text-4xl sm:text-3xl'>A</h1>
      <h1 className='text-tertiary text-4xl  sm:text-3xl'>M</h1>
      <h1 className='text-white text-4xl  sm:text-3xl'>S</h1>
      <nav className={`flex flex-row gap-6 text-1xl sm:flex-col ${isOpen ? 'block' : 'hidden'}`}>
        <AnchorLink href='#about' className='text-white mx-3 sm:mx-1'>
          About
        </AnchorLink>
        <AnchorLink href='#experience' className='text-white mx-3 sm:mx-1'>
          Experience
        </AnchorLink>
        <AnchorLink href='#projects' className='text-white mx-3 sm:mx-1'>
          Projects
        </AnchorLink>
        <AnchorLink href='#courses' className='text-white mx-3 sm:mx-1'>
          Courses
        </AnchorLink>
        <AnchorLink href='#contact' className='text-white mx-3 sm:mx-1'>
          Contact
        </AnchorLink>
      </nav>
      <button onClick={toggleNavbar} className='focus:outline-none '>
        {isOpen ? <X size={30} color="#fff" /> : <Menu size={24} color="#fff" />}
      </button>
    </div>
  );
}

export default Header;
