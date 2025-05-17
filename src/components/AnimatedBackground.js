import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';

function AnimatedBackground({ containerId }) {
  useEffect(() => {
    // Create unique ID for this instance
    const uniqueId = containerId || `background-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create particles container
    let particlesContainer = document.getElementById(`particles-${uniqueId}`);
    if (!particlesContainer) {
      particlesContainer = document.createElement('div');
      particlesContainer.id = `particles-${uniqueId}`;
      particlesContainer.className = 'absolute inset-0 pointer-events-none z-0';
      
      const parentSection = document.getElementById(uniqueId);
      if (parentSection) {
        parentSection.appendChild(particlesContainer);
      }
    }
    
    // Clear previous particles
    particlesContainer.innerHTML = '';
    
    // Create particles
    const numberOfParticles = window.innerWidth < 768 ? 20 : 40;
    for (let i = 0; i < numberOfParticles; i++) {
      const particle = document.createElement('div');
      particle.className = `particle-${uniqueId}`;
      particle.style.position = 'absolute';
      particle.style.width = `${Math.random() * 5 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = 'rgba(84, 214, 187, 0.3)';
      particle.style.borderRadius = '50%';
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.opacity = '0.4';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '0';
      particlesContainer.appendChild(particle);
    }
    
    // Animate particles
    anime({
      targets: `.particle-${uniqueId}`,
      translateX: function() { return anime.random(-50, 50) + 'px'; },
      translateY: function() { return anime.random(-50, 50) + 'px'; },
      scale: function() { return anime.random(0.2, 1.5); },
      opacity: [0.4, 0.1, 0.4],
      easing: 'easeInOutQuad',
      duration: function() { return anime.random(4000, 10000); },
      delay: function() { return anime.random(0, 1000); },
      loop: true,
      direction: 'alternate'
    });
    
    // Create floating shapes
    const shapes = ['circle', 'triangle', 'square'];
    const shapeContainer = document.createElement('div');
    shapeContainer.id = `shapes-${uniqueId}`;
    shapeContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none z-0';
    
    const parentSection = document.getElementById(uniqueId);
    if (parentSection) {
      parentSection.appendChild(shapeContainer);
    }
    
    // Add shapes (fewer than intro for less distraction)
    for (let i = 0; i < 3; i++) {
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      const shape = document.createElement('div');
      const size = Math.random() * 60 + 20;
      
      shape.className = `floating-shape-${uniqueId} ${shapeType}`;
      shape.style.position = 'absolute';
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      
      if (shapeType === 'circle') {
        shape.style.borderRadius = '50%';
        shape.style.border = '2px solid rgba(249, 115, 22, 0.2)';
      } else if (shapeType === 'triangle') {
        shape.style.width = '0';
        shape.style.height = '0';
        shape.style.borderLeft = `${size/2}px solid transparent`;
        shape.style.borderRight = `${size/2}px solid transparent`;
        shape.style.borderBottom = `${size}px solid rgba(84, 214, 187, 0.2)`;
      } else {
        shape.style.border = '2px solid rgba(255, 255, 255, 0.15)';
      }
      
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.pointerEvents = 'none';
      shape.style.zIndex = '0';
      shapeContainer.appendChild(shape);
    }
    
    // Animate floating shapes
    anime({
      targets: `.floating-shape-${uniqueId}`,
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
    
    // Clean up
    return () => {
      if (particlesContainer) particlesContainer.remove();
      if (shapeContainer) shapeContainer.remove();
    };
  }, [containerId]);

  return (
    <>
      {/* Framer Motion animated blobs - these are separate from the anime.js shapes */}
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
    </>
  );
}

export default AnimatedBackground;
