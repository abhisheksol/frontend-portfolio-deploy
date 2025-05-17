import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed sm:w-20 top-20 right-5 z-50 p-3 rounded-full bg-white/80 dark:bg-dark-400/80 backdrop-blur-md border border-light-400 dark:border-dark-300 shadow-lg"
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-dark-600" />
      ) : (
        <Sun className="w-5 h-5 text-light-100" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
