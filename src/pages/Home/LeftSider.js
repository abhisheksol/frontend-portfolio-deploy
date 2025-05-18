import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import anime from 'animejs/lib/anime.es.js';

function LeftSider() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const iconsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize animations
    const isMobile = window.innerWidth <= 640;
    
    // Animation for icons entering
    anime({
      targets: '.social-icon',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      easing: 'easeOutQuad',
      duration: 800
    });
    
    // Animation for the line
    if (lineRef.current) {
      anime({
        targets: lineRef.current,
        scaleY: [0, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeInOutQuad',
        delay: 600
      });
      
      // Subtle pulse animation for the line
      anime({
        targets: lineRef.current,
        opacity: [0.6, 1],
        duration: 1500,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    }
    
    // Define hover animations for social icons
    iconsRef.current.forEach(icon => {
      if (!icon) return;
      
      const iconEl = icon.querySelector('i');
      if (!iconEl) return;
      
      // Create hover effect
      icon.addEventListener('mouseenter', () => {
        anime({
          targets: iconEl,
          scale: 1.3,
          rotate: '10deg',
          color: iconEl.dataset.hoverColor || '#54D6BB',
          duration: 300,
          easing: 'easeOutElastic(1, .6)'
        });
      });
      
      icon.addEventListener('mouseleave', () => {
        anime({
          targets: iconEl,
          scale: 1,
          rotate: '0deg',
          color: '#9ca3af',
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });
    
    // Create floating animation for the container
    if (!isMobile) {
      anime({
        targets: containerRef.current,
        translateY: [0, -5, 0],
        duration: 3000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    }
    
    // Cleanup function
    return () => {
      iconsRef.current.forEach(icon => {
        if (!icon) return;
        icon.removeEventListener('mouseenter', () => {});
        icon.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed left-0 bottom-0 px-10 text-xl sm:static sm:text-3xl sm:gap-3 sm:p-4 z-40">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-5 sm:flex-row">
          <a 
            ref={el => (iconsRef.current[0] = el)} 
            href="https://wa.me/9561435141" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon relative group"
          >
            <i 
              className="ri-whatsapp-line text-gray-400 transition-all duration-300"
              data-hover-color="#25D366"
            ></i>
            <motion.div 
              className="absolute -inset-2 bg-tertiary/10 dark:bg-tertiary-dark/20 rounded-full z-[-1] opacity-0"
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
          </a>

          <a 
            ref={el => (iconsRef.current[1] = el)} 
            href="mailto:abhisheksolapure2003@gmail.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon relative group"
          >
            <i 
              className="ri-mail-line text-gray-400 transition-all duration-300"
              data-hover-color="#ea4335"
            ></i>
            <motion.div 
              className="absolute -inset-2 bg-tertiary/10 dark:bg-tertiary-dark/20 rounded-full z-[-1] opacity-0"
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
          </a>

          <a 
            ref={el => (iconsRef.current[2] = el)} 
            href="https://www.instagram.com/abhishek.solapure.2003/?igsh=bGJld3lnN2dpenE5" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon relative group"
          >
            <i 
              className="ri-instagram-line text-gray-400 transition-all duration-300"
              data-hover-color="#E1306C"
            ></i>
            <motion.div 
              className="absolute -inset-2 bg-tertiary/10 dark:bg-tertiary-dark/20 rounded-full z-[-1] opacity-0"
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
          </a>

          <a 
            ref={el => (iconsRef.current[3] = el)} 
            href="https://www.linkedin.com/in/abhishek-solapure-9aa362250/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon relative group"
          >
            <i 
              className="ri-linkedin-box-line text-gray-400 transition-all duration-300"
              data-hover-color="#0077b5"
            ></i>
            <motion.div 
              className="absolute -inset-2 bg-tertiary/10 dark:bg-tertiary-dark/20 rounded-full z-[-1] opacity-0"
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
          </a>

          <a 
            ref={el => (iconsRef.current[4] = el)} 
            href="https://github.com/abhisheksol" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon relative group"
          >
            <i 
              className="ri-github-line text-gray-400 transition-all duration-300"
              data-hover-color="#f0f6fc"
            ></i>
            <motion.div 
              className="absolute -inset-2 bg-tertiary/10 dark:bg-tertiary-dark/20 rounded-full z-[-1] opacity-0"
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            />
          </a>
        </div>
        
        {/* Animated vertical line */}
        <div 
          ref={lineRef} 
          className="w-[2px] h-32 bg-gradient-to-b from-tertiary to-secondary/70 sm:hidden mt-4 origin-top"
        ></div>
      </div>

      <style jsx="true">{`
        .social-icon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        
        /* Enhanced glow effect on hover */
        .social-icon:hover i {
          text-shadow: 0 0 8px rgba(84, 214, 187, 0.6);
        }
        
        /* Optimize for mobile */
        @media (max-width: 640px) {
          .social-icon i {
            filter: drop-shadow(0 0 3px rgba(84, 214, 187, 0.2));
          }
        }

        /* Animated connecting line */
        .w-\\[2px\\] {
          position: relative;
          box-shadow: 0 0 8px rgba(84, 214, 187, 0.3);
        }

        .w-\\[2px\\]::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 30%;
          background: linear-gradient(to top, transparent, rgba(84, 214, 187, 0.8));
          animation: flowDown 2s ease-in-out infinite;
        }

        @keyframes flowDown {
          0% { top: -30%; height: 30%; }
          100% { top: 100%; height: 30%; }
        }
      `}</style>
    </div>
  );
}

export default LeftSider;
