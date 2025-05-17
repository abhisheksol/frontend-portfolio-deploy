import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { IoIosSchool } from "react-icons/io";
import ScrollReveal from "../../components/ScrollReveal";
import AnimatedBackground from "../../components/AnimatedBackground";
import anime from 'animejs/lib/anime.es.js';

function Education() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { portfolioData } = useSelector((state) => state.root);
  const { experiences } = portfolioData;
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const animationInitializedRef = useRef(false);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Force re-initialize animations when viewport changes
      if (animationInitializedRef.current) {
        setTimeout(() => {
          initializeTimelineAnimations();
        }, 300);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize all timeline animations
  const initializeTimelineAnimations = () => {
    if (!timelineRef.current) return;
    animationInitializedRef.current = true;

    // First clean up any existing animations
    const existingSvg = timelineRef.current.querySelector('.timeline-svg');
    if (existingSvg) existingSvg.remove();
    
    const existingParticles = timelineRef.current.querySelector('.timeline-particles');
    if (existingParticles) existingParticles.remove();

    // Create new SVG path
    createAndAnimateSVGLine();
    
    // Create and animate timeline particles
    const cleanupParticles = createTimelineParticles();
    
    return () => {
      if (cleanupParticles) cleanupParticles();
    };
  };

  // Create SVG line path for the timeline
  const createAndAnimateSVGLine = () => {
    // Create container
    const svgContainer = document.createElement('div');
    svgContainer.className = 'timeline-svg absolute left-0 top-0 w-full h-full pointer-events-none';
    svgContainer.style.zIndex = '5';
    timelineRef.current.appendChild(svgContainer);
    
    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svgContainer.appendChild(svg);
    
    // Create path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.id = 'timeline-path';
    path.setAttribute('stroke', isMobile ? 'rgba(84, 214, 187, 0.5)' : 'rgba(84, 214, 187, 0.3)');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    svg.appendChild(path);
    
    // Generate path data
    let pathData = '';
    const timelineDots = timelineRef.current.querySelectorAll('.timeline-dot');
    
    if (isMobile) {
      // For mobile - straight line down the center
      pathData = `M ${timelineRef.current.offsetWidth/2} 0 `;
      
      timelineDots.forEach((dot, i) => {
        const dotRect = dot.getBoundingClientRect();
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const y = dotRect.top - timelineRect.top + dot.offsetHeight/2;
        
        pathData += `L ${timelineRef.current.offsetWidth/2} ${y} `;
      });
    } else {
      // For desktop - simplified horizontal layout (based on the image)
      const startY = timelineRef.current.offsetHeight / 2;
      pathData = `M 0 ${startY} `;
      
      // Get total width and divide into segments
      const totalWidth = timelineRef.current.offsetWidth;
      const segmentWidth = totalWidth / (experiences.length + 1);
      
      experiences.forEach((_, i) => {
        const x = segmentWidth * (i + 1);
        pathData += `L ${x} ${startY} `;
      });
    }
    
    path.setAttribute('d', pathData);
    
    // Animated dash array
    const pathLength = path.getTotalLength();
    path.setAttribute('stroke-dasharray', pathLength);
    path.setAttribute('stroke-dashoffset', pathLength);
    
    // Animate the path drawing
    anime({
      targets: path,
      strokeDashoffset: [pathLength, 0],
      duration: 1500,
      easing: 'easeInOutSine',
      delay: 300
    });
    
    // Animate timeline dots
    anime({
      targets: '.timeline-dot',
      scale: [0, 1],
      opacity: [0, 1],
      delay: anime.stagger(200, {start: 600}),
      duration: 600,
      easing: 'easeOutElastic(1, .6)'
    });
    
    // Animate content boxes
    anime({
      targets: '.content-box',
      translateY: [isMobile ? 50 : 0, 0],
      opacity: [0, 1],
      delay: anime.stagger(150, {start: 800}),
      duration: 800,
      easing: 'easeOutQuint'
    });
  };
  
  // Create floating particles along the timeline
  const createTimelineParticles = () => {
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'timeline-particles absolute inset-0 pointer-events-none';
    particlesContainer.style.zIndex = '1';
    timelineRef.current.appendChild(particlesContainer);
    
    // Create particles - fewer on mobile
    const particleCount = isMobile ? 10 : 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'timeline-particle';
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 4 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = 'rgba(84, 214, 187, 0.3)';
      particle.style.borderRadius = '50%';
      
      // Different positioning for mobile vs desktop
      if (isMobile) {
        // For mobile - position along center vertical line
        particle.style.left = `calc(50% + ${(Math.random() * 20 - 10)}px)`;
        particle.style.top = `${Math.random() * 100}%`;
      } else {
        // For desktop - position along horizontal line
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `calc(50% + ${(Math.random() * 20 - 10)}px)`;
      }
      
      particlesContainer.appendChild(particle);
    }
    
    // Animate particles floating along the timeline
    anime({
      targets: '.timeline-particle',
      translateY: () => anime.random(-15, 15),
      translateX: () => anime.random(-15, 15),
      opacity: [0.2, 0.8, 0.2],
      scale: () => anime.random(0.6, 1.3),
      easing: 'easeInOutQuad',
      duration: () => anime.random(3000, 5000),
      delay: anime.stagger(100),
      loop: true,
      direction: 'alternate'
    });
    
    return () => {
      if (particlesContainer) particlesContainer.remove();
    };
  };

  // Initialize animations when component mounts and when in view
  useEffect(() => {
    if (!timelineRef.current) return;

    // Force initialize after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initializeTimelineAnimations();
    }, 500);
    
    // Also use IntersectionObserver as a backup
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animationInitializedRef.current) {
        initializeTimelineAnimations();
      }
    }, { threshold: 0.1 });
    
    observer.observe(timelineRef.current);
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [isMobile, experiences]);

  return (
    <section
      ref={sectionRef}
      id="education-section"
      className="relative py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-light-100 to-light-300 dark:from-primary-dark dark:to-dark-600 overflow-hidden"
    >
      {/* Add the animated background */}
      <AnimatedBackground containerId="education-section" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark dark:text-light-100 mb-2 text-center md:text-left">
            Education
          </h2>
          <div className="h-1 w-24 bg-tertiary dark:bg-tertiary-light mb-6 sm:mb-10 mx-auto md:mx-0"></div>
        </ScrollReveal>

        <div ref={timelineRef} className="relative min-h-[300px]">
          {/* Timeline line - will be replaced by SVG */}
          <div className={`absolute ${isMobile ? 'left-1/2 h-full w-0.5' : 'top-1/2 w-full h-0.5'} bg-tertiary/20 dark:bg-tertiary-dark/20`}></div>

          {/* Timeline content */}
          <div className={`${isMobile ? 'space-y-12 sm:space-y-16' : 'flex justify-between mt-28'}`}>
            {experiences.map((experience, index) => (
              <div
                key={index}
                className={`relative ${!isMobile ? 'w-full px-4 max-w-[300px]' : ''}`}
              >
                {/* For desktop: display horizontally */}
                {!isMobile && (
                  <div className="flex flex-col items-center">
                    {/* Timeline dot */}
                    <div 
                      className="timeline-dot absolute left-1/2 top-0 w-5 h-5 bg-tertiary dark:bg-tertiary-light rounded-full border-4 border-light-200 dark:border-dark-500 transform -translate-x-1/2 -translate-y-[60px] z-10"
                      style={{ opacity: 0, transform: 'scale(0) translate(-50%, -60px)' }}
                    ></div>
                    
                    {/* Card */}
                    <motion.div
                      className="content-box w-full p-4 sm:p-5 bg-white dark:bg-dark-400 rounded-lg shadow-md border border-light-400 dark:border-dark-300 opacity-0 h-full"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-shrink-0">
                          <IoIosSchool className="text-tertiary dark:text-tertiary-light text-lg sm:text-xl" />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-tertiary dark:text-tertiary-light">
                          {experience.title}
                        </h3>
                      </div>
                      <h4 className="text-lg sm:text-xl font-semibold text-primary-dark dark:text-light-100 mb-2">
                        {experience.company}
                      </h4>
                      <div className="inline-block px-2 py-1 sm:px-3 rounded-full bg-secondary/10 dark:bg-secondary-dark/20 text-secondary dark:text-secondary-light text-xs sm:text-sm font-medium mb-3">
                        {experience.period}
                      </div>
                      <p className="text-dark-300 dark:text-light-300 text-sm sm:text-base">
                        {experience.description}
                      </p>
                    </motion.div>
                  </div>
                )}
                
                {/* For mobile: display vertically */}
                {isMobile && (
                  <div
                    className={`flex flex-col items-center gap-6`}
                  >
                    {/* Timeline dot */}
                    <div 
                      className="timeline-dot absolute left-1/2 w-5 h-5 bg-tertiary dark:bg-tertiary-light rounded-full border-4 border-light-200 dark:border-dark-500 transform -translate-x-1/2 z-10"
                      style={{ opacity: 0, transform: 'scale(0)' }}
                    ></div>

                    {/* Content box */}
                    <motion.div
                      className={`content-box w-full p-5 sm:p-6 bg-white dark:bg-dark-400 rounded-lg shadow-md border border-light-400 dark:border-dark-300 opacity-0 mt-4`}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <IoIosSchool className="text-tertiary dark:text-tertiary-light text-lg sm:text-xl" />
                        <h3 className="text-base sm:text-lg font-bold text-tertiary dark:text-tertiary-light">
                          {experience.title}
                        </h3>
                      </div>
                      <h4 className="text-lg sm:text-xl font-semibold text-primary-dark dark:text-light-100 mb-2">
                        {experience.company}
                      </h4>
                      <div className="inline-block px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-secondary/10 dark:bg-secondary-dark/20 text-secondary dark:text-secondary-light text-xs sm:text-sm font-medium mb-3">
                        {experience.period}
                      </div>
                      <p className="text-dark-300 dark:text-light-300 text-sm sm:text-base">
                        {experience.description}
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @media (max-width: 768px) {
          h2 {
            text-align: center;
          }
          
          .h-1.w-24 {
            margin-left: auto;
            margin-right: auto;
          }
          
          /* Optimize timeline layout for mobile */
          .timeline-dot {
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
          
          .content-box {
            text-align: center;
            margin-top: 2rem;
          }
          
          /* Space from fixed header */
          section {
            padding-top: 5rem;
          }
        }
        
        /* Fix for desktop view to make it match image */
        @media (min-width: 769px) {
          /* Force timeline to render properly in desktop view */
          .timeline-dot {
            opacity: 1 !important;
            transform: scale(1) translate(-50%, -60px) !important;
            top: 0 !important;
          }
          
          .content-box {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Education;
