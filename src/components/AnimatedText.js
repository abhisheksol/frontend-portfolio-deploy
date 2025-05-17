import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
};

// Animation variants for each word
const wordVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const AnimatedText = ({ text, className = "", splitByWord = true }) => {
  // Split the text into words or characters
  const items = splitByWord ? text.split(" ") : text.split("");

  return (
    <motion.div
      className={`flex flex-wrap overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          className={`inline-block ${splitByWord ? "mr-1" : ""}`}
          variants={wordVariants}
        >
          {item}
          {splitByWord && index !== items.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
