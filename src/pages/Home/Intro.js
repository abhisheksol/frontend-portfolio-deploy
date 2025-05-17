import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FileBadge2 } from 'lucide-react';
import { motion } from "framer-motion";
import axios from 'axios';
import "./intro.css";
import AnimatedText from "../../components/AnimatedText";
import { TypeAnimation } from 'react-type-animation';
import { FiCode } from 'react-icons/fi';
import { FaMobile, FaDesktop, FaBrain } from 'react-icons/fa';
import anime from 'animejs/lib/anime.es.js';

function Intro() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { firstName, lastName, welcomeText, description, caption } = intro;

  const handleResumeDownload = async () => {
    try {
      const response = await axios.get('https://portfolio-ebon-sigma-59.vercel.app/api/portfolio/resume');
      const resumeData = response.data[0];
      const resumeUrl = resumeData.resume;
      window.open(resumeUrl, '_blank');
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  // Anime.js initialization for background particles
  useEffect(() => {
    // Create particles container if it doesn't exist
    let particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) {
      particlesContainer = document.createElement('div');
      particlesContainer.id = 'particles-container';
      particlesContainer.className = 'absolute inset-0 pointer-events-none z-0';
      document.querySelector('.relative.flex.flex-col').appendChild(particlesContainer);
    }
    
    // Clear previous particles
    particlesContainer.innerHTML = '';
    
    // Create particles
    const numberOfParticles = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < numberOfParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 5 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = 'rgba(84, 214, 187, 0.3)';
      particle.style.borderRadius = '50%';
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particlesContainer.appendChild(particle);
    }
    
    // Animate particles
    anime({
      targets: '.particle',
      translateX: function() { return anime.random(-50, 50) + 'px'; },
      translateY: function() { return anime.random(-50, 50) + 'px'; },
      scale: function() { return anime.random(0.2, 1.5); },
      opacity: [0.6, 0.1, 0.6],
      easing: 'easeInOutQuad',
      duration: function() { return anime.random(3000, 8000); },
      delay: function() { return anime.random(0, 1000); },
      loop: true,
      direction: 'alternate'
    });
    
    // Hero text animation
    anime.timeline({
      easing: 'easeOutExpo',
    })
    .add({
      targets: '.hero-element',
      opacity: [0, 1],
      translateY: [40, 0],
      delay: anime.stagger(200, {start: 300})
    });
    
    // Create floating shapes with anime.js
    const shapes = ['circle', 'triangle', 'square'];
    const shapeContainer = document.createElement('div');
    shapeContainer.id = 'shape-container';
    shapeContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none z-0';
    document.querySelector('.relative.flex.flex-col').appendChild(shapeContainer);
    
    // Add shapes
    for (let i = 0; i < 5; i++) {
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      const shape = document.createElement('div');
      const size = Math.random() * 60 + 20;
      
      shape.className = `floating-shape ${shapeType}`;
      shape.style.position = 'absolute';
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      
      if (shapeType === 'circle') {
        shape.style.borderRadius = '50%';
        shape.style.border = '2px solid rgba(249, 115, 22, 0.3)';
      } else if (shapeType === 'triangle') {
        shape.style.width = '0';
        shape.style.height = '0';
        shape.style.borderLeft = `${size/2}px solid transparent`;
        shape.style.borderRight = `${size/2}px solid transparent`;
        shape.style.borderBottom = `${size}px solid rgba(84, 214, 187, 0.2)`;
      } else {
        shape.style.border = '2px solid rgba(255, 255, 255, 0.2)';
      }
      
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.left = `${Math.random() * 100}%`;
      shapeContainer.appendChild(shape);
    }
    
    // Animate floating shapes
    anime({
      targets: '.floating-shape',
      translateX: function() { return anime.random(-100, 100) + 'px'; },
      translateY: function() { return anime.random(-100, 100) + 'px'; },
      rotate: function() { return anime.random(-180, 180); },
      scale: function() { return anime.random(0.5, 1.5); },
      opacity: [0.2, 0.4, 0.2],
      easing: 'easeInOutQuad',
      duration: function() { return anime.random(8000, 15000); },
      delay: function() { return anime.random(0, 1000); },
      loop: true,
      direction: 'alternate'
    });
    
    // Clean up function
    return () => {
      if (particlesContainer) particlesContainer.remove();
      if (shapeContainer) shapeContainer.remove();
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative flex flex-col items-start justify-center min-h-screen py-20 px-6 bg-gradient-to-br from-light-100 to-light-300 dark:from-primary-dark dark:to-dark-600 overflow-hidden"
    >
      {/* Animated background elements remain but will be enhanced by Anime.js */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 rounded-full bg-tertiary/20 dark:bg-tertiary-dark/10 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-secondary/10 dark:bg-secondary-dark/5 blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container max-w-5xl mx-auto z-10">
        {/* Welcome text with fade-in animation */}
        <motion.span
          className="hero-element inline-block text-lg md:text-xl text-secondary dark:text-secondary-light font-mono mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {welcomeText || "Hello, I'm"}
        </motion.span>

        {/* Name with animated text reveal */}
        <h1 className="hero-element text-5xl md:text-7xl font-bold tracking-tight mb-4 text-primary-dark dark:text-light-100">
          <AnimatedText 
            text={`${firstName || "Abhishek"} ${lastName || "Solapure"}`} 
            className="text-primary-dark dark:text-light-100"
          />
        </h1>

        {/* Animated typing effect with better icons */}
        <h2 className="hero-element text-3xl md:text-5xl font-bold mb-6 text-tertiary dark:text-tertiary-light flex flex-wrap items-center">
          <TypeAnimation
            sequence={[
              'Web Developer ',
              () => (
                <FiCode className="inline-block ml-2 text-tertiary dark:text-tertiary-light animate-pulse" size={40} />
              ),
              2000,
              'Mobile App Developer ',
              () => (
                <FaMobile className="inline-block ml-2 text-tertiary dark:text-tertiary-light animate-pulse" size={36} />
              ),
              2000,
              'Desktop Developer ',
              () => (
                <FaDesktop className="inline-block ml-2 text-tertiary dark:text-tertiary-light animate-pulse" size={36} />
              ),
              2000,
              'ML Engineer ',
              () => (
                <FaBrain className="inline-block ml-2 text-tertiary dark:text-tertiary-light animate-pulse" size={36} />
              ),
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="flex items-center"
          />
        </h2>
        
        {/* Description with fade-in */}
        <motion.p 
          className="hero-element text-lg max-w-xl text-dark-300 dark:text-light-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {description || "I build things for the web, mobile & desktop platforms"}
        </motion.p>
        
        {/* Resume button with enhanced hover animation */}
        <motion.button
          className="hero-element group relative overflow-hidden rounded-lg bg-secondary dark:bg-secondary-dark text-white dark:text-light-100 px-8 py-4 font-medium"
          onClick={handleResumeDownload}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Resume <FileBadge2 className="ml-1" size={20} />
          </span>
          <motion.span 
            className="absolute inset-0 bg-tertiary dark:bg-tertiary-dark"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.button>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="flex flex-col items-center">
          <span className="text-dark-300 dark:text-light-300 text-sm mb-2">Scroll Down</span>
          <div className="w-5 h-10 rounded-full border-2 border-dark-300 dark:border-light-300 flex justify-center">
            <motion.div
              className="w-1 h-2 bg-secondary dark:bg-secondary-light rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Mobile-specific enhancements */}
      <style jsx="true">{`
        @media (max-width: 768px) {
          .particle {
            opacity: 0.5;
          }
          
          /* Improved mobile typography */
          h1 {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
          }
          
          h2 {
            font-size: 1.8rem !important;
            line-height: 1.3 !important;
          }
          
          /* Better spacing for mobile */
          .container {
            padding: 0 1rem;
          }
          
          /* Enhanced mobile button */
          button {
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 1rem !important;
            margin-top: 1.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default Intro;
