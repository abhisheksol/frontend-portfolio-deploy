import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

function Loader() {
  const loaderRef = useRef(null);
  const particlesRef = useRef(null);
  
  useEffect(() => {
    // Create particles
    const createParticles = () => {
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
        
        for (let i = 0; i < 40; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.width = `${Math.random() * 6 + 3}px`;
          particle.style.height = particle.style.width;
          particle.style.backgroundColor = i % 3 === 0 ? '#54D6BB' : i % 3 === 1 ? '#F97316' : '#FFFFFF';
          particle.style.borderRadius = '50%';
          particle.style.position = 'absolute';
          particle.style.top = `${Math.random() * 100}%`;
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.opacity = `${Math.random() * 0.7 + 0.3}`;
          
          particlesRef.current.appendChild(particle);
        }
      }
    };
    
    // Create progress bar
    const createProgressBar = () => {
      const progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      progressBar.style.position = 'absolute';
      progressBar.style.bottom = '15%';
      progressBar.style.left = '50%';
      progressBar.style.transform = 'translateX(-50%)';
      progressBar.style.width = '180px';
      progressBar.style.height = '3px';
      progressBar.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      progressBar.style.borderRadius = '4px';
      progressBar.style.overflow = 'hidden';
      
      const progressFill = document.createElement('div');
      progressFill.className = 'progress-fill';
      progressFill.style.height = '100%';
      progressFill.style.width = '0%';
      progressFill.style.backgroundColor = '#54D6BB';
      progressFill.style.borderRadius = '4px';
      
      progressBar.appendChild(progressFill);
      loaderRef.current.appendChild(progressBar);
    };
    
    // Animation for initial logo reveal
    const logoAnimation = () => {
      anime.timeline({
        easing: 'easeOutExpo',
      })
      .add({
        targets: '.logo-letter',
        opacity: [0, 1],
        translateY: [40, 0],
        translateZ: 0,
        duration: 1200,
        delay: anime.stagger(150)
      })
      .add({
        targets: '.logo-container',
        scale: [1, 1.1, 1],
        rotate: [0, 2, 0, -2, 0],
        duration: 3000,
        easing: 'easeInOutQuad',
        loop: true
      }, '-=800');
    };
    
    // Animation for particles
    const particleAnimation = () => {
      anime({
        targets: '.particle',
        translateX: () => anime.random(-70, 70) + 'px',
        translateY: () => anime.random(-70, 70) + 'px',
        scale: () => anime.random(0.2, 1.8),
        opacity: () => anime.random(0.1, 0.9),
        easing: 'easeInOutQuad',
        duration: () => anime.random(2000, 5000),
        delay: () => anime.random(0, 1000),
        loop: true,
        direction: 'alternate'
      });
    };
    
    // Animation for text flicker
    const textGlitch = () => {
      // Create glitch effect around text
      const glitchTimeline = anime.timeline({
        easing: 'easeOutExpo',
        loop: true
      });
      
      glitchTimeline
        .add({
          targets: '.glitch-effect',
          duration: 100,
          opacity: [0, 1],
          translateX: () => anime.random(-5, 5),
          skewX: () => anime.random(-5, 5),
          filter: 'blur(2px)',
          delay: 3000,
        })
        .add({
          targets: '.glitch-effect',
          duration: 50,
          opacity: 0,
        })
        .add({
          targets: '.glitch-effect',
          duration: 50,
          opacity: 1,
          translateX: () => anime.random(-2, 2),
          delay: 100
        })
        .add({
          targets: '.glitch-effect',
          duration: 50,
          opacity: 0,
        })
        .add({
          targets: '.logo-letter',
          duration: 100,
          filter: [
            'brightness(1) contrast(1)',
            'brightness(1.2) contrast(1.5)',
            'brightness(1) contrast(1)'
          ]
        });
    };
    
    // Progress bar animation
    const progressAnimation = () => {
      anime({
        targets: '.progress-fill',
        width: ['0%', '100%'],
        easing: 'easeInOutQuad',
        duration: 6000
      });
      
      // "Loading" text animation
      anime({
        targets: '.loading-text',
        opacity: [0.4, 1],
        easing: 'easeInOutSine',
        duration: 800,
        loop: true,
        direction: 'alternate'
      });
      
      // Loading dots animation
      const dotsAnimation = anime.timeline({
        loop: true,
        duration: 1500
      });
      
      dotsAnimation
        .add({
          targets: '.loading-dot-1',
          translateY: [0, -10, 0],
          duration: 600,
          easing: 'easeInOutSine',
        })
        .add({
          targets: '.loading-dot-2',
          translateY: [0, -10, 0],
          duration: 600,
          easing: 'easeInOutSine',
        }, '-=400')
        .add({
          targets: '.loading-dot-3',
          translateY: [0, -10, 0],
          duration: 600,
          easing: 'easeInOutSine',
        }, '-=400');
    };
    
    // Generate shapes animation
    const createShapes = () => {
      const shapesContainer = document.createElement('div');
      shapesContainer.className = 'shapes-container';
      shapesContainer.style.position = 'absolute';
      shapesContainer.style.width = '100%';
      shapesContainer.style.height = '100%';
      shapesContainer.style.pointerEvents = 'none';
      shapesContainer.style.zIndex = '1';
      
      const shapeTypes = ['triangle', 'rectangle', 'circle'];
      const colors = ['#54D6BB33', '#F9731633', '#FFFFFF33'];
      
      for (let i = 0; i < 8; i++) {
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 60 + 20;
        
        const shape = document.createElement('div');
        shape.className = `shape ${shapeType}`;
        shape.style.position = 'absolute';
        shape.style.opacity = '0.3';
        
        if (shapeType === 'circle') {
          shape.style.width = `${size}px`;
          shape.style.height = `${size}px`;
          shape.style.borderRadius = '50%';
          shape.style.border = `2px solid ${color}`;
        } else if (shapeType === 'triangle') {
          shape.style.width = '0';
          shape.style.height = '0';
          shape.style.borderLeft = `${size/2}px solid transparent`;
          shape.style.borderRight = `${size/2}px solid transparent`;
          shape.style.borderBottom = `${size}px solid ${color}`;
        } else {
          shape.style.width = `${size}px`;
          shape.style.height = `${size}px`;
          shape.style.border = `2px solid ${color}`;
        }
        
        shape.style.top = `${Math.random() * 80 + 10}%`;
        shape.style.left = `${Math.random() * 80 + 10}%`;
        
        shapesContainer.appendChild(shape);
      }
      
      loaderRef.current.appendChild(shapesContainer);
      
      // Animate shapes
      anime({
        targets: '.shape',
        translateX: () => anime.random(-100, 100) + 'px',
        translateY: () => anime.random(-100, 100) + 'px',
        rotate: () => anime.random(-180, 180),
        opacity: [0.3, 0.8, 0.3],
        scale: () => anime.random(0.5, 1.5),
        easing: 'easeInOutQuad',
        duration: () => anime.random(7000, 15000),
        delay: () => anime.random(0, 1000),
        loop: true,
        direction: 'alternate'
      });
    };
    
    // Initialize all animations
    if (loaderRef.current) {
      createParticles();
      createProgressBar();
      createShapes();
      
      // Run animations
      logoAnimation();
      particleAnimation();
      textGlitch();
      progressAnimation();
    }
    
    return () => {
      // Cleanup if needed
      anime.remove('.logo-letter');
      anime.remove('.particle');
      anime.remove('.progress-fill');
      anime.remove('.shape');
      anime.remove('.glitch-effect');
    };
  }, []);

  return (
    <div ref={loaderRef} className='h-screen flex flex-col items-center justify-center fixed inset-0 bg-primary-dark z-[10000] overflow-hidden'>
      {/* Particles container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>
      
      {/* Glitch effect overlay */}
      <div className="glitch-effect absolute inset-0 opacity-0 bg-tertiary/5 pointer-events-none"></div>
      
      {/* Logo container */}
      <div className="logo-container relative z-10">
        {/* Main logo: spell out "ABHISHEK" */}
        <div className='flex gap-3 text-6xl font-bold sm:text-5xl mb-10 relative'>
          {"ABHISHEK".split('').map((char, index) => (
            <h1
              key={index}
              className={`logo-letter ${
                ['text-secondary','text-white','text-tertiary'][index % 3]
              } transform hover:scale-110 transition-all duration-300`}
            >
              {char}
            </h1>
          ))}
        </div>
      </div>
      
      {/* Loading text */}
      <div className="flex items-center justify-center gap-1 mt-4">
        <span className="loading-text text-light-300 text-lg">Loading</span>
        <span className="loading-dot-1 inline-block w-1 h-1 bg-light-300 rounded-full mx-0.5"></span>
        <span className="loading-dot-2 inline-block w-1 h-1 bg-light-300 rounded-full mx-0.5"></span>
        <span className="loading-dot-3 inline-block w-1 h-1 bg-light-300 rounded-full mx-0.5"></span>
      </div>
      
      {/* Dynamic message */}
      <div className="absolute bottom-[20%] left-0 right-0 flex justify-center">
        <div className="loading-tip text-white/60 text-sm max-w-xs text-center px-4">
          {getRandomTip()}
        </div>
      </div>
    </div>
  );
}

// Function to return random loading tips
function getRandomTip() {
  const tips = [
    "Optimizing pixels for maximum enjoyment...",
    "Brewing code and creativity...",
    "Assembling digital wonders...",
    "Preparing a showcasing masterpiece...",
    "Loading experience modules...",
    "Gathering portfolio elements...",
    "Calculating impressive metrics...",
    "Generating developer enthusiasm...",
    "Injecting passion into projects...",
    "Arranging code into elegant patterns..."
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
}

export default Loader;