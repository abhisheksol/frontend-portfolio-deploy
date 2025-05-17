import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Define animation variants for different directions
const directions = {
  up: { 
    hidden: { opacity: 0, y: 50 }, 
    visible: { opacity: 1, y: 0 } 
  },
  down: { 
    hidden: { opacity: 0, y: -50 }, 
    visible: { opacity: 1, y: 0 } 
  },
  left: { 
    hidden: { opacity: 0, x: 50 }, 
    visible: { opacity: 1, x: 0 } 
  },
  right: { 
    hidden: { opacity: 0, x: -50 }, 
    visible: { opacity: 1, x: 0 } 
  },
  none: { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1 } 
  }
};

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  duration = 0.6,
  delay = 0,
  threshold = 0.1,
  className = '',
  ...props
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold });

  // Set direction variant
  const selectedVariant = directions[direction] || directions.up;
  
  // Custom transition
  const transition = {
    duration,
    delay,
    ease: 'easeOut'
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={selectedVariant}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
