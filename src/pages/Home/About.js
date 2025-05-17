import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaReact, FaAndroid, FaNodeJs, FaPython, FaJava, FaCode } from "react-icons/fa";
import { SiMongodb, SiCplusplus, SiMusicbrainz } from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import ScrollReveal from "../../components/ScrollReveal";
import AnimatedBackground from "../../components/AnimatedBackground";
import abhiImage from './abhi.jpg';
function About() {
  const { portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;
  const { skills, lottieURL, description1, description2 } = about;
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Function to select the appropriate icon based on the skill name
  const getIconForSkill = (skill) => {
    const trimmedSkill = skill.trim().toLowerCase();
    switch (trimmedSkill) {
      case "react":
        return <FaReact className="text-tertiary dark:text-tertiary-light" size={24} />;
      case "react native":
        return <FaAndroid className="text-tertiary dark:text-tertiary-light" size={24} />;
      case "node.js":
        return <FaNodeJs className="text-tertiary dark:text-tertiary-light" size={24} />;
      case "dsa":
        return <SiMusicbrainz className="text-tertiary dark:text-tertiary-light" size={24} />;
      case "mongodb":
        return <SiMongodb className="text-tertiary dark:text-tertiary-light" size={24} />;
      case "python tkinter":
      case "python":
        return <FaPython className="text-tertiary dark:text-tertiary-light" size={24} />;
      case "java":
        return <FaJava className="text-tertiary dark:text-tertiary-light" size={24} />;
      case "vb.net":
        return <TbBrandVscode className="text-tertiary dark:text-tertiary-light" size={24} />;
      case "c++":
        return <SiCplusplus className="text-tertiary dark:text-tertiary-light" size={24} />;
      default:
        return <FaCode className="text-tertiary dark:text-tertiary-light" size={24} />;
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="about-section" 
      className="relative py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-light-100 to-light-300 dark:from-primary-dark dark:to-dark-600 overflow-hidden"
    >
      {/* Add the animated background */}
      <AnimatedBackground containerId="about-section" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark dark:text-light-100 mb-2 text-center md:text-left">About Me</h2>
          <div className="h-1 w-24 bg-tertiary dark:bg-tertiary-light mb-6 sm:mb-10 mx-auto md:mx-0"></div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Professional Image with Visual Effects - full width on mobile */}
          <ScrollReveal direction="left" className="w-full lg:w-1/2">
            <div className="relative group max-w-md mx-auto lg:max-w-none">
              {/* Modern layered image effect - subtle on mobile */}
              <motion.div 
                className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-full h-full rounded-lg bg-tertiary/40 dark:bg-tertiary-dark/40 z-0"
                animate={{ 
                  rotate: isMobile ? [0, 1, 0, -1, 0] : [0, 2, 0, -2, 0],
                  scale: isMobile ? [1, 1.005, 1, 0.995, 1] : [1, 1.01, 1, 0.99, 1]
                }}
                transition={{ 
                  duration: isMobile ? 8 : 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-full h-full rounded-lg bg-secondary/30 dark:bg-secondary-dark/30 z-0"
                animate={{ 
                  rotate: isMobile ? [0, -1, 0, 1, 0] : [0, -2, 0, 2, 0],
                  scale: isMobile ? [1, 0.995, 1, 1.005, 1] : [1, 0.99, 1, 1.01, 1]
                }}
                transition={{ 
                  duration: isMobile ? 10 : 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main image container with glass effect */}
              <motion.div 
                className="relative z-10 bg-light-100/80 dark:bg-dark-400/80 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Fallback lottie animation while image loads */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <lottie-player
                      src={lottieURL || "https://lottie.host/f204f8d0-f601-426e-b304-875ca6312cc1/aWaymT6GWG.json"}
                      background="transparent"
                      speed="1"
                      style={{ width: "100%", height: "100%" }}
                      autoplay
                    ></lottie-player>
                  </div>
                )}
                
                {/* Professional developer image - optimized for mobile */}
               <img 
  src={abhiImage}
  alt="Developer workspace with code on screen"
  className={`w-full h-auto rounded-lg object-cover transition-opacity duration-500 ${isMobile ? 'aspect-[4/3]' : 'aspect-[4/3]'} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
  onLoad={() => setImageLoaded(true)}
/>
                
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end justify-center p-4">
                  <p className="text-white text-base sm:text-lg font-medium">Crafting digital experiences</p>
                </div>
              </motion.div>
            </div>

            {/* Code badge - mobile only but better positioned */}
            <motion.div 
              className="hidden sm:flex absolute -bottom-3 right-10 bg-tertiary dark:bg-tertiary-light text-white dark:text-primary-dark px-3 py-1 rounded-full shadow-lg items-center gap-2 text-xs sm:text-sm font-bold lg:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FaCode size={14} />
              <span>Developer</span>
            </motion.div>
          </ScrollReveal>

          {/* Content with text description - full width and centered on mobile */}
          <div className="w-full  mt-8 lg:mt-0">
            <ScrollReveal direction="right">
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <p className="text-dark-300 dark:text-light-300 mb-4 sm:mb-6 text-center lg:text-left text-base sm:text-lg">{description1 || ""}</p>
                <p className="text-dark-300 dark:text-light-300 text-center lg:text-left text-base sm:text-lg">{description2 || ""}</p>
              </div>
            </ScrollReveal>

            {/* Skills section with animated cards - improved for mobile */}
            <ScrollReveal delay={0.2}>
              <h3 className="text-xl sm:text-2xl font-bold text-tertiary dark:text-tertiary-light mt-8 sm:mt-12 mb-4 sm:mb-6 text-center lg:text-left">
                Technologies I've been working with:
              </h3>
              
              {/* Responsive grid that looks good on all devices */}
             <div className="overflow-x-auto sm:overflow-x-visible w-full ">
                 <div className="flex p-6 sm:grid sm:grid-cols-2 gap-4 w-max sm:">
                   {skills.map((skill, index) => (
                     <motion.div
                       key={index}
                       whileHover={{ scale: 1.05, y: -5 }}
                       className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg bg-light-100 dark:bg-dark-400 shadow-md border border-light-400 dark:border-dark-300 min-w-[80px] sm:min-w-0"
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: index * (isMobile ? 0.05 : 0.1), duration: 0.5 }}
                     >
                       <div className="mb-1 sm:mb-2">{getIconForSkill(skill)}</div>
                       <p className="text-xs sm:text-sm text-center font-medium text-dark-300 dark:text-light-300 line-clamp-2">{skill}</p>
                     </motion.div>
                   ))}
                 </div>
</div>

            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Enhanced mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          /* Better container spacing */
          .container {
            padding: 0 0.75rem;
          }
          
          /* Centered typography with improved sizes */
          .prose p {
            text-align: center;
            font-size: 1rem;
            margin-bottom: 1rem;
            line-height: 1.6;
          }
          
          h2, h3 {
            text-align: center;
          }
          
          /* Better skill grid on small devices */
          .grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
          
          /* Square images on mobile */
          img {
            aspect-ratio: 1/1;
            object-position: center;
            min-height: 200px;
            max-height: 300px;
          }
          
          /* Better spacing between image and text */
          .flex-col.lg\\:flex-row {
            gap: 1.5rem !important;
          }
          
          /* Enhanced mobile animations */
          .bg-gradient-to-br {
            background-size: 200% 200%;
            animation: gradientMove 15s ease infinite;
          }
          
          /* Add padding to account for fixed header */
          section {
            padding-top: 5rem;
          }
        }
        
        /* Extra small devices */
        @media (max-width: 360px) {
          .grid-cols-2 {
            grid-template-columns: repeat(1, 1fr);
          }
          
          .prose p {
            font-size: 0.875rem;
          }
        }
        
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}

export default About;
