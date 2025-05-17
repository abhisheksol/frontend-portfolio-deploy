import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import anime from 'animejs/lib/anime.es.js';
import ScrollReveal from "../../components/ScrollReveal";

function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  const projectsRef = useRef(null);
  const containerRef = useRef(null);
  
  // Setup anime.js animations
  useEffect(() => {
    if (!projectsRef.current) return;

    // Create container for floating elements
    const createFloatingElements = () => {
      // Create animated background container
      const bgContainer = document.createElement('div');
      bgContainer.className = 'projects-bg-container';
      bgContainer.style.position = 'absolute';
      bgContainer.style.inset = '0';
      bgContainer.style.overflow = 'hidden';
      bgContainer.style.pointerEvents = 'none';
      bgContainer.style.zIndex = '0';
      
      // Create bubbles
      const numberOfBubbles = window.innerWidth < 768 ? 15 : 30;
      for (let i = 0; i < numberOfBubbles; i++) {
        const bubble = document.createElement('div');
        const size = Math.random() * 60 + 10;
        
        bubble.className = 'project-bubble';
        bubble.style.position = 'absolute';
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.borderRadius = '50%';
        bubble.style.border = '1px solid rgba(84, 214, 187, 0.2)';
        bubble.style.backgroundColor = 'transparent';
        bubble.style.top = `${Math.random() * 100}%`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.opacity = '0.2';
        
        bgContainer.appendChild(bubble);
      }
      
      // Create shapes (triangles, squares)
      const shapes = ['triangle', 'square', 'circle'];
      const colors = ['rgba(84, 214, 187, 0.15)', 'rgba(249, 115, 22, 0.15)', 'rgba(255, 255, 255, 0.1)'];
      
      for (let i = 0; i < 12; i++) {
        const shape = document.createElement('div');
        const size = Math.random() * 40 + 15;
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        shape.className = `project-shape ${shapeType}`;
        shape.style.position = 'absolute';
        
        if (shapeType === 'triangle') {
          shape.style.width = '0';
          shape.style.height = '0';
          shape.style.borderLeft = `${size/2}px solid transparent`;
          shape.style.borderRight = `${size/2}px solid transparent`;
          shape.style.borderBottom = `${size}px solid ${color}`;
        } else if (shapeType === 'square') {
          shape.style.width = `${size}px`;
          shape.style.height = `${size}px`;
          shape.style.backgroundColor = color;
        } else {
          shape.style.width = `${size}px`;
          shape.style.height = `${size}px`;
          shape.style.borderRadius = '50%';
          shape.style.border = `1px solid ${color}`;
        }
        
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.opacity = '0.7';
        
        bgContainer.appendChild(shape);
      }
      
      projectsRef.current.prepend(bgContainer);
      
      // Animate bubbles
      anime({
        targets: '.project-bubble',
        translateY: function() { return anime.random(-100, 100) + 'px'; },
        translateX: function() { return anime.random(-50, 50) + 'px'; },
        scale: function() { return anime.random(0.5, 1.5); },
        opacity: [0.1, 0.4, 0.1],
        easing: 'easeInOutQuad',
        duration: function() { return anime.random(8000, 15000); },
        delay: function() { return anime.random(0, 1000); },
        loop: true,
        direction: 'alternate'
      });
      
      // Animate shapes
      anime({
        targets: '.project-shape',
        translateY: function() { return anime.random(-120, 120) + 'px'; },
        translateX: function() { return anime.random(-80, 80) + 'px'; },
        rotate: function() { return anime.random(-180, 180); },
        scale: function() { return anime.random(0.6, 1.4); },
        opacity: [0.1, 0.3, 0.1],
        easing: 'easeInOutQuad',
        duration: function() { return anime.random(10000, 18000); },
        delay: function() { return anime.random(0, 2000); },
        loop: true,
        direction: 'alternate'
      });
    };
    
    // Animate project list items
    const animateProjectList = () => {
      anime({
        targets: '.project-item',
        translateX: ['-20px', 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 800,
        delay: anime.stagger(100)
      });
    };
    
    // Project selection animation
    const animateProjectDetails = () => {
      anime({
        targets: '.project-details',
        opacity: [0, 1],
        translateY: ['20px', 0],
        easing: 'easeOutExpo',
        duration: 800
      });
    };
    
    // Initialize animations
    createFloatingElements();
    animateProjectList();
    animateProjectDetails();
    
    // Clean up function
    return () => {
      const bgContainer = document.querySelector('.projects-bg-container');
      if (bgContainer) bgContainer.remove();
    };
  }, []);
  
  // Animation when changing selected project
  useEffect(() => {
    if (!containerRef.current) return;
    
    anime({
      targets: '.project-details',
      opacity: [0.6, 1],
      translateY: ['10px', 0],
      easing: 'easeOutExpo',
      duration: 600
    });
    
    // Animate image
    anime({
      targets: '.project-image',
      scale: [0.95, 1],
      opacity: [0.8, 1],
      easing: 'easeOutExpo',
      duration: 700
    });
    
    // Stagger text elements
    anime({
      targets: '.project-text-element',
      opacity: [0, 1],
      translateY: ['15px', 0],
      easing: 'easeOutExpo',
      duration: 800,
      delay: anime.stagger(120)
    });
  }, [selectedItemIndex]);
   
  return (
    <div>
      <section 
        id='projects' 
        ref={projectsRef}
        className="relative overflow-hidden py-20 bg-gradient-to-br from-light-100 to-light-300 dark:from-primary-dark dark:to-dark-600 overflow-hidden"
      >
        {/* Add glowing accent borders */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tertiary/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>
        
        <ScrollReveal>
          <div className="container mx-auto px-4">
            <SectionTitle title="Projects" />
          </div>
        </ScrollReveal>
        
        <div 
          ref={containerRef}
          className="container max-w-6xl mx-auto flex flex-col lg:flex-row py-10 gap-10 px-4 relative z-10"
        >
          {/* Project Selection Sidebar */}
          <div className=" w-full">
            <div className="flex flex-row lg:flex-col sm:w-full gap-3 border-l-2 border-tertiary/30 dark:border-tertiary/20 overflow-x-auto sm:pb-4 lg:pb-0 project-titles-container">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  onClick={() => setSelectedItemIndex(index)}
                  className={`project-item cursor-pointer transition-all duration-300`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h2
                    className={`text-xl px-5 py-3 whitespace-nowrap rounded-r-lg transition-all duration-300
                     ${
                       selectedItemIndex === index
                         ? "text-tertiary dark:text-tertiary-light border-tertiary dark:border-tertiary-light border-l-4 -ml-[3px] bg-tertiary/10 dark:bg-tertiary-dark/10 shadow-md"
                         : "text-gray-300 dark:text-gray-300 hover:text-tertiary dark:hover:text-tertiary-light"
                     } `}
                  >
                    {project.title}
                  </h2>
                </motion.div>
              ))}
            </div>
            
            {/* Add scroll indicator for mobile */}
            <div className="flex justify-center mt-2 lg:hidden">
              <div className="flex gap-1 items-center">
                <span className="w-8 h-1 bg-tertiary/30 rounded-full"></span>
                <span className="w-2 h-1 bg-tertiary/20 rounded-full"></span>
                <span className="w-2 h-1 bg-tertiary/20 rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="project-details lg:w-2/3 w-full flex flex-col md:flex-row items-center md:items-start gap-6 bg-dark-400/20 dark:bg-dark-600/20 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
            <motion.div 
              className="project-image-container relative overflow-hidden rounded-lg shadow-xl shadow-tertiary/5 dark:shadow-tertiary-dark/5 group max-w-xs w-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={projects[selectedItemIndex].image}
                alt={projects[selectedItemIndex].title}
                className="project-image w-full h-auto aspect-video object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                <span className="text-white text-sm font-medium mb-2">View Project</span>
                <div className="flex gap-3">
                  <motion.a 
                    href={projects[selectedItemIndex].link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-tertiary/90 text-white p-2 rounded-full"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiExternalLink />
                  </motion.a>
                  <motion.a 
                    href={projects[selectedItemIndex].github || '#'} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary/90 text-white p-2 rounded-full"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiGithub />
                  </motion.a>
                </div>
              </div>
            </motion.div>
            
            <div className="flex flex-col gap-4 flex-1">
              <motion.h1 
                className="project-text-element text-2xl font-bold text-secondary dark:text-secondary-light md:text-left text-center"
              >
                {projects[selectedItemIndex].title}
              </motion.h1>
              
              {/* Tags/technologies - dynamically generate from project data if possible */}
              <motion.div className="project-text-element flex flex-wrap gap-2 mb-2 md:justify-start justify-center">
                {['React', 'Node.js', 'MongoDB', 'Tailwind CSS'].map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs font-medium bg-tertiary/10 dark:bg-tertiary-dark/20 text-tertiary dark:text-tertiary-light px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
              
              <motion.p 
                className="project-text-element text-gray-300 dark:text-gray-300 md:text-left text-center"
              >
                {projects[selectedItemIndex].description}
              </motion.p>
              
              <motion.p 
                className="project-text-element text-gray-400 dark:text-gray-400 md:text-left text-center text-sm"
              >
                A fully responsive web application with modern design practices, user authentication, and dynamic content management. Built with performance and scalability in mind.
              </motion.p>
              
              <motion.div className="project-text-element mt-4 flex gap-4 md:justify-start justify-center flex-wrap">
                <motion.a 
                  href={projects[selectedItemIndex].link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg bg-secondary dark:bg-secondary-dark text-white px-6 py-2.5 font-medium transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 20px -5px rgba(249, 115, 22, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Live Demo</span>
                  <FiExternalLink className="relative z-10" />
                  <motion.span 
                    className="absolute inset-0 bg-tertiary dark:bg-tertiary-dark"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </motion.a>
                
                <motion.a 
                  href={projects[selectedItemIndex].github || '#'} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-600/50 text-gray-300 hover:text-white rounded-lg px-6 py-2.5 font-medium transition-all duration-300 hover:bg-dark-300/20 dark:hover:bg-light-300/5 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGithub />
                  <span>Source Code</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
        
        <style jsx="true">{`
          .project-item {
            position: relative;
            overflow: hidden;
          }
          
          .project-item::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -5px;
            width: 0;
            height: 2px;
            background-color: var(--tertiary, #54d6bb);
            transition: width 0.3s ease;
          }
          
          .project-item:hover::after {
            width: 100%;
          }
          
          /* Mobile & Tablet Improvements */
          @media (max-width: 1023px) {
            .project-item::after {
              display: none;
            }
            
            .project-item {
              min-width: 120px;
              width: auto;
              flex-shrink: 0;
              margin-right: 10px;
              border: 1px solid rgba(84, 214, 187, 0.2);
              border-radius: 8px;
              background-color: rgba(255, 255, 255, 0.05); /* Updated for better contrast in light theme */
            }
            
            .project-titles-container {
              display: flex;
              flex-direction: row !important; /* Force horizontal layout */
              overflow-x: auto;
              padding: 10px 5px;
              margin: 0 -5px;
              -webkit-overflow-scrolling: touch;
              scroll-snap-type: x mandatory;
              scrollbar-width: none; /* Hide scrollbar for Firefox */
              border-left: none !important; /* Remove the left border on mobile */
            }
            
            .project-titles-container::-webkit-scrollbar {
              display: none; /* Hide scrollbar for Chrome/Safari */
            }
            
            .project-item h2 {
              width: 100%;
              text-align: center;
              font-size: 1.1rem;
              padding: 12px 15px;
              white-space: normal !important; /* Force text wrap */
              min-height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-left: none !important; /* Remove border on selected item */
              margin-left: 0 !important; /* Reset margin */
            }
            
            .project-item h2.selected {
              color: var(--tertiary, #54d6bb);
              background-color: rgba(84, 214, 187, 0.1);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            
            /* Project item when selected on mobile */
            .project-item h2[class*="text-tertiary"] {
              border-left: none !important;
              border-bottom: 3px solid var(--tertiary, #54d6bb);
              border-radius: 8px;
              margin-left: 0 !important;
            }
            
            .project-bubble, .project-shape {
              opacity: 0.15 !important;
            }
            
            .project-details {
              flex-direction: column;
              align-items: center;
            }
            
            .project-image-container {
              width: 100%;
              max-width: 350px;
              margin: 0 auto;
            }
          }
          
          /* Animation for the floating elements */
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes pulse {
            0% { opacity: 0.2; }
            50% { opacity: 0.5; }
            100% { opacity: 0.2; }
          }
          
          /* Add a subtle glow to the project cards */
          .project-details {
            box-shadow: 0 0 30px rgba(18, 95, 99, 0.1);
          }
          
          /* Fix horizontal scrolling on mobile */
          #projects {
            overflow-x: hidden;
          }
          
          /* Better scrollbar for project list on mobile */
          @media (max-width: 1023px) {
            .flex-row {
              scrollbar-width: thin;
              scrollbar-color: rgba(84, 214, 187, 0.3) transparent;
            }
            
            .flex-row::-webkit-scrollbar {
              height: 4px;
            }
            
            .flex-row::-webkit-scrollbar-track {
              background: transparent;
            }
            
            .flex-row::-webkit-scrollbar-thumb {
              background: rgba(84, 214, 187, 0.3);
              border-radius: 4px;
            }
          }
        `}</style>
      </section>
    </div>
  );
}

export default Projects;