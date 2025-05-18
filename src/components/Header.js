import React, { useState, useEffect, useRef } from 'react';
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import anime from 'animejs/lib/anime.es.js';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme } = useTheme();
  
  // Refs for anime.js animations
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);

  // New refs for advanced animations
  const particleCanvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const logoAnimationRef = useRef(null);

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
      
      // Determine active section based on scroll position
      const sections = ['about-section', 'education-section', 'projects-section', 'courses-section', 'contact-section'];
      let currentSection = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Initial animations when component mounts
    if (logoRef.current) {
      // Logo reveal animation
      anime({
        targets: '.logo-part',
        translateY: [30, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: anime.stagger(100, {start: 300}),
      });
    }

    // Header appearance animation
    anime({
      targets: headerRef.current,
      translateY: [-50, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1000
    });

    // Nav items staggered animation (desktop only)
    if (window.innerWidth > 768) {
      anime({
        targets: '.nav-item',
        opacity: [0, 1],
        translateY: [-20, 0],
        easing: 'easeOutExpo',
        duration: 800,
        delay: anime.stagger(100, {start: 800})
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation effect when scrolled state changes
  useEffect(() => {
    if (headerRef.current) {
      anime({
        targets: headerRef.current,
        backgroundColor: scrolled ? 
          theme === 'dark' ? 'rgba(13, 27, 42, 0.8)' : 'rgba(248, 249, 250, 0.8)' : 
          'rgba(0, 0, 0, 0)',
        backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
        boxShadow: scrolled ? 
          theme === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.4)' : '0 4px 20px rgba(0, 0, 0, 0.1)' : 
          '0 0px 0px rgba(0, 0, 0, 0)',
        duration: 400,
        easing: 'easeOutQuad'
      });
    }
  }, [scrolled, theme]);

  // Initialize interactive particle system
  useEffect(() => {
    // Create canvas for interactive header particles
    const createParticleSystem = () => {
      if (!headerRef.current) return;
      
      // Create canvas if it doesn't exist
      if (!document.getElementById('header-particles')) {
        const canvas = document.createElement('canvas');
        canvas.id = 'header-particles';
        canvas.className = 'absolute inset-0 z-0 pointer-events-none';
        canvas.width = window.innerWidth;
        canvas.height = 80; // Header height
        headerRef.current.appendChild(canvas);
        particleCanvasRef.current = canvas;
        
        // Initialize particles
        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = window.innerWidth < 768 ? 15 : 30;
        
        // Create particles with various properties
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: i % 3 === 0 ? '#54D6BB' : i % 3 === 1 ? '#F97316' : '#FFFFFF',
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            opacity: Math.random() * 0.5 + 0.1
          });
        }
        
        particlesRef.current = particles;
        
        // Handle mouse movement
        const handleMouseMove = (e) => {
          const rect = headerRef.current.getBoundingClientRect();
          mousePosition.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          };
        };
        
        // Update and draw particles
        const animateParticles = () => {
          if (!ctx || !particleCanvasRef.current) return;
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          particlesRef.current.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around screen edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Mouse interaction - particles are attracted to mouse
            if (mousePosition.current.x && mousePosition.current.y) {
              const dx = mousePosition.current.x - particle.x;
              const dy = mousePosition.current.y - particle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 100) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (100 - distance) / 100;
                
                particle.speedX += forceDirectionX * force * 0.2;
                particle.speedY += forceDirectionY * force * 0.2;
                
                // Limit max speed
                const maxSpeed = 3;
                const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
                if (currentSpeed > maxSpeed) {
                  particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
                  particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
                }
              }
            }
            
            // Draw particles
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba');
            ctx.fill();
            
            // Draw connections between nearby particles
            particlesRef.current.forEach(otherParticle => {
              if (particle !== otherParticle) {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 70) {
                  ctx.beginPath();
                  ctx.strokeStyle = `rgba(84, 214, 187, ${0.1 * (1 - distance / 70)})`;
                  ctx.lineWidth = 0.5;
                  ctx.moveTo(particle.x, particle.y);
                  ctx.lineTo(otherParticle.x, otherParticle.y);
                  ctx.stroke();
                }
              }
            });
          });
          
          requestAnimationFrame(animateParticles);
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        animateParticles();
        
        // Handle window resize
        const handleResize = () => {
          if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = 80;
          }
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('resize', handleResize);
        };
      }
    };
    
    createParticleSystem();
    
    // Logo special effects - morphing animation
    if (logoRef.current) {
      // Setup logo morphing animation that plays on hover
      const setupLogoAnimation = () => {
        const logoAnimation = anime({
          targets: '.logo-morph',
          translateY: [0, -5, 0],
          translateX: [0, 2, -2, 0],
          rotate: [0, 2, -2, 0],
          scale: [1, 1.1, 0.9, 1],
          opacity: [1, 0.8, 1],
          easing: 'easeInOutQuad',
          duration: 3000,
          autoplay: false,
          loop: false
        });
        
        logoAnimationRef.current = logoAnimation;
        
        // Attach events to logo
        const logoEl = logoRef.current;
        logoEl.addEventListener('mouseenter', () => {
          if (logoAnimationRef.current) {
            logoAnimationRef.current.restart();
          }
          
          // Text scramble effect on hover
          const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          let iteration = 0;
          const maxIterations = 4;
          
          const interval = setInterval(() => {
            document.querySelectorAll('.scramble-letter').forEach((letter) => {
              if (iteration >= maxIterations) {
                letter.textContent = letter.dataset.value;
                return;
              }
              
              letter.textContent = letters[Math.floor(Math.random() * 26)];
            });
            
            iteration += 1/3;
            
            if (iteration >= maxIterations) {
              clearInterval(interval);
            }
          }, 30);
        });
      };
      
      setupLogoAnimation();
    }
    
    // Magnetic effect for menu items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        anime({
          targets: item,
          translateX: x * 0.1,
          translateY: y * 0.1,
          easing: 'easeOutCubic',
          duration: 100
        });
      });
      
      item.addEventListener('mouseleave', () => {
        anime({
          targets: item,
          translateX: 0,
          translateY: 0,
          easing: 'easeOutElastic(1, .6)',
          duration: 800
        });
      });
    });
    
    // Additional creative animations for the theme toggle button
    const themeToggleEl = document.querySelector('.theme-toggle-btn');
    if (themeToggleEl) {
      themeToggleEl.addEventListener('mouseenter', () => {
        anime({
          targets: themeToggleEl,
          rotate: ['0deg', '20deg', '-15deg', '0deg'],
          scale: [1, 1.2, 1],
          duration: 800,
          easing: 'easeInOutBack'
        });
      });
    }
    
    // Return cleanup function
    return () => {
      const canvas = document.getElementById('header-particles');
      if (canvas) canvas.remove();
      
      if (logoRef.current) {
        logoRef.current.removeEventListener('mouseenter', () => {});
      }
      
      navItems.forEach(item => {
        item.removeEventListener('mousemove', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
      
      if (themeToggleEl) {
        themeToggleEl.removeEventListener('mouseenter', () => {});
      }
    };
  }, []);

  // Enhanced toggle navbar function with liquid animation effect
  const toggleNavbar = () => {
    // Button animation with liquid effect
    if (menuButtonRef.current) {
      // Create ripple effect around button
      const button = menuButtonRef.current;
      const buttonRect = button.getBoundingClientRect();
      
      // Create ripple element
      const ripple = document.createElement('div');
      ripple.className = 'menu-button-ripple';
      ripple.style.position = 'absolute';
      ripple.style.top = '50%';
      ripple.style.left = '50%';
      ripple.style.width = '10px';
      ripple.style.height = '10px';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = theme === 'dark' ? 'rgba(84, 214, 187, 0.6)' : 'rgba(249, 115, 22, 0.6)';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.zIndex = '-1';
      
      button.appendChild(ripple);
      
      anime({
        targets: ripple,
        scale: [0, 15],
        opacity: [1, 0],
        easing: 'easeOutExpo',
        duration: 800,
        complete: () => {
          ripple.remove();
        }
      });
      
      // Button animation
      anime({
        targets: menuButtonRef.current,
        rotate: isOpen ? [180, 0] : [0, 180],
        scale: [1, 0.8, 1.2, 1],
        duration: 600,
        easing: 'easeInOutBack'
      });
    }
    
    // Liquid menu blob effect
    if (!isOpen && window.innerWidth <= 768) {
      // Create a blob that grows from the button position
      const blob = document.createElement('div');
      blob.className = 'menu-blob';
      blob.style.position = 'fixed';
      blob.style.top = '30px';
      blob.style.right = '20px';
      blob.style.width = '20px';
      blob.style.height = '20px';
      blob.style.background = theme === 'dark' ? 
        'radial-gradient(circle, rgba(13,27,42,0.95) 0%, rgba(9,22,42,0.95) 100%)' : 
        'radial-gradient(circle, rgba(248,249,250,0.95) 0%, rgba(233,236,239,0.95) 100%)';
      blob.style.borderRadius = '50%';
      blob.style.zIndex = '40';
      document.body.appendChild(blob);
      
      anime({
        targets: blob,
        width: window.innerWidth * 2,
        height: window.innerWidth * 2,
        top: '-100vh',
        right: '-100vw',
        duration: 600,
        easing: 'easeOutQuint',
        complete: () => {
          blob.remove();
        }
      });
    }
    
    setIsOpen(!isOpen);
  };

  // Animation for mobile menu
  useEffect(() => {
    // Only run this animation on mobile
    if (window.innerWidth <= 768) {
      if (isOpen && navRef.current) {
        anime({
          targets: '.nav-item',
          translateY: [-20, 0],
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 400,
          delay: anime.stagger(80)
        });
      }
    }
  }, [isOpen]);

  const navVariants = {
    hidden: { 
      opacity: 0,
      height: 0
    },
    visible: { 
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.header 
      ref={headerRef}
      className={`fixed top-0 w-full z-50 transition-all duration-300 overflow-hidden`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex justify-between items-center px-8 py-4 relative z-10'>
        <motion.div
          ref={logoRef}
          className="flex items-center logo-morph"
        >
          <h1 className='text-4xl font-bold flex'>
            <span className='logo-part text-secondary dark:text-secondary-light'>
              <span className="inline-block scramble-letter" data-value="A">A</span>
              <span className="inline-block scramble-letter" data-value="b">b</span>
              <span className="inline-block scramble-letter" data-value="h">h</span>
            </span>
            <span className='logo-part text-primary-dark dark:text-light-100'>
              <span className="inline-block scramble-letter" data-value="i">i</span>
              <span className="inline-block scramble-letter" data-value="s">s</span>
              <span className="inline-block scramble-letter" data-value="h">h</span>
            </span>
            <span className='logo-part text-tertiary dark:text-tertiary-light'>
              <span className="inline-block scramble-letter" data-value="e">e</span>
              <span className="inline-block scramble-letter" data-value="k">k</span>
            </span>
          </h1>
        </motion.div>

        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.nav 
                ref={navRef}
                key="nav"
                variants={navVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`flex md:absolute md:top-full md:right-0 md:left-0 md:w-full md:bg-light-100/95 md:dark:bg-dark-600/95 md:py-5 md:px-8 md:shadow-lg md:flex-col md:backdrop-blur-md ${
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
                    className={`nav-item group relative ${activeSection === item.id ? 'active-nav-item' : ''}`}
                  >
                    <AnchorLink 
                      href={`#${item.id}`} 
                      onClick={() => window.innerWidth <= 768 ? setIsOpen(false) : null}
                      className={`relative px-4 py-2 text-lg font-medium transition-colors ${
                        activeSection === item.id
                          ? 'text-tertiary dark:text-tertiary-light'
                          : 'text-primary-dark dark:text-light-100 hover:text-secondary dark:hover:text-secondary-light'
                      }`}
                    >
                      {item.name}
                      <motion.span
                        className={`absolute bottom-0 left-0 h-0.5 bg-secondary dark:bg-secondary-light transform origin-left ${
                          activeSection === item.id ? 'w-full' : 'w-0'
                        } group-hover:w-full transition-all duration-300`}
                      />
                    </AnchorLink>
                  </motion.div>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
          
          <div className="flex items-center gap-3">
            <div className='theme-toggle-btn'>
              <ThemeToggle/>
            </div>
            <motion.button 
              ref={menuButtonRef}
              whileTap={{ scale: 0.9 }}
              onClick={toggleNavbar} 
              className='focus:outline-none md:block hidden relative overflow-hidden'
            >
              {isOpen ? 
                <X size={24} className="text-primary-dark dark:text-light-100" /> : 
                <Menu size={24} className="text-primary-dark dark:text-light-100" />
              }
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Active indicator dots for desktop navigation */}
      <div className="hidden sm:flex justify-center absolute bottom-0 left-0 right-0 transform translate-y-3">
        <div className="flex gap-2">
          {['about-section', 'education-section', 'projects-section', 'courses-section', 'contact-section'].map((section) => (
            <div 
              key={section}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeSection === section 
                  ? 'bg-tertiary dark:bg-tertiary-light scale-125 glow-dot' 
                  : 'bg-gray-400/30 dark:bg-gray-600/30'
              }`}
            />
          ))}
        </div>
      </div>
      
      <style jsx="true">{`
        .active-nav-item {
          position: relative;
        }
        
        .active-nav-item::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #54D6BB;
          filter: drop-shadow(0 0 8px rgba(84, 214, 187, 0.8));
          animation: pulse 2s infinite;
        }
        
        /* Glowing active dot */
        .glow-dot {
          box-shadow: 0 0 8px 2px rgba(84, 214, 187, 0.6);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        
        /* For mobile view */
        @media (max-width: 768px) {
          .active-nav-item {
            background-color: rgba(84, 214, 187, 0.1);
            border-radius: 0.375rem;
          }
          
          .active-nav-item::after {
            display: none;
          }
          
          nav {
            max-height: 80vh;
            overflow-y: auto;
          }
        }
        
        /* Advanced logo animations */
        .logo-part {
          display: inline-block;
          transition: transform 0.3s;
          position: relative;
        }
        
        /* Individual letter animations */
        .scramble-letter {
          display: inline-block;
          transition: transform 0.2s;
        }
        
        h1:hover .logo-part .scramble-letter {
          animation: float 0.5s ease-in-out infinite alternate;
        }
        
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-2px); }
        }
        
        h1:hover .logo-part:nth-child(1) {
          transform: translateY(-2px) rotate(-3deg);
          filter: drop-shadow(0 5px 15px rgba(249, 115, 22, 0.4));
        }
        
        h1:hover .logo-part:nth-child(2) {
          transform: translateY(2px);
          filter: drop-shadow(0 5px 10px rgba(13, 27, 42, 0.3));
        }
        
        h1:hover .logo-part:nth-child(3) {
          transform: translateY(-2px) rotate(3deg);
          filter: drop-shadow(0 5px 15px rgba(84, 214, 187, 0.4));
        }
        
        /* Menu button effects */
        .menu-button-ripple {
          pointer-events: none;
        }
        
        /* Header background animation */
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, 
                    rgba(84, 214, 187, 0.02), 
                    rgba(249, 115, 22, 0.02), 
                    rgba(84, 214, 187, 0.02));
          background-size: 200% 200%;
          animation: gradientAnimation 15s ease infinite;
          z-index: 1;
        }
        
        /* Creative glitch effect for special emphasis */
        .nav-item:hover {
          animation: glitch 0.5s cubic-bezier(.25, .46, .45, .94) both infinite;
          animation-delay: 0.65s;
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </motion.header>
  );
}

export default Header;
