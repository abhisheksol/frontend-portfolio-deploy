import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";
import AnimatedBackground from "../../components/AnimatedBackground";
import anime from 'animejs/lib/anime.es.js';


function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { portfolioData } = useSelector((state) => state.root);
  const { courses } = portfolioData;
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Magnetic hover effect animation
  useEffect(() => {
    if (!sectionRef.current) return;

    // Create interactive sheen effect over cards
    const sheenEffect = () => {
      if (!cardsRef.current.length) return;
      
      // Add sheen elements to each card
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        // Create sheen element if it doesn't exist
        let sheen = card.querySelector('.card-sheen');
        if (!sheen) {
          sheen = document.createElement('div');
          sheen.className = 'card-sheen';
          sheen.style.position = 'absolute';
          sheen.style.top = '0';
          sheen.style.left = '0';
          sheen.style.width = '100%';
          sheen.style.height = '100%';
          sheen.style.background = 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)';
          sheen.style.transform = 'translateX(-100%)';
          sheen.style.pointerEvents = 'none';
          sheen.style.zIndex = '1';
          card.appendChild(sheen);
        }

        // Animate sheen on hover for desktop
        if (!isMobile) {
          card.addEventListener('mouseenter', () => {
            anime({
              targets: sheen,
              translateX: ['100%', '-100%'],
              easing: 'easeInOutSine',
              duration: 1000,
              loop: false
            });
          });
        }
      });

      // Magnetic effect for desktop
      if (!isMobile) {
        const handleMouseMove = (e) => {
          cardsRef.current.forEach((card, index) => {
            if (!card) return;
            
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            // Calculate distance between mouse and card center
            const distanceX = e.clientX - cardCenterX;
            const distanceY = e.clientY - cardCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // Apply subtle magnetic effect if mouse is within range
            if (distance < 300) {
              const strength = 15; // Adjust this for stronger/weaker effect
              const moveX = distanceX / (distance / strength);
              const moveY = distanceY / (distance / strength);
              
              anime({
                targets: card,
                translateX: moveX,
                translateY: moveY,
                duration: 300,
                easing: 'easeOutElastic(1, .3)'
              });
            } else {
              // Reset position if mouse is far away
              anime({
                targets: card,
                translateX: 0,
                translateY: 0,
                duration: 600,
                easing: 'easeOutElastic(1, .3)'
              });
            }
          });
        };
        
        sectionRef.current.addEventListener('mousemove', handleMouseMove);
        
        return () => {
          sectionRef.current?.removeEventListener('mousemove', handleMouseMove);
        };
      }
    };
    
    sheenEffect();
    
    // Create staggered entrance animation
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        anime({
          targets: '.course-card',
          opacity: [0, 1],
          translateY: [isMobile ? 20 : 40, 0],
          scale: [0.95, 1],
          delay: anime.stagger(150),
          duration: 800,
          easing: 'easeOutQuint'
        });
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    
    observer.observe(sectionRef.current);
    
    return () => observer.disconnect();
  }, [isMobile, courses]);

  return (
    <section 
      ref={sectionRef}
      id="courses-section" 
      className="relative py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-light-100 to-light-300 dark:from-primary-dark dark:to-dark-600 overflow-hidden"
    >
      {/* Add the animated background */}
      <AnimatedBackground containerId="courses-section" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark dark:text-light-100 mb-2 text-center md:text-left">Courses & Certifications</h2>
          <div className="h-1 w-24 bg-tertiary dark:bg-tertiary-light mb-6 sm:mb-10 mx-auto md:mx-0"></div>
        </ScrollReveal>

        <div className="grid grid-cols-1  gap-6 sm:gap-8">
          {courses.map((course, index) => (
            <div
              key={course._id || index}
              ref={el => cardsRef.current[index] = el}
              className="course-card opacity-0"
            >
              <motion.div
                className="rounded-xl overflow-hidden bg-white dark:bg-dark-400 shadow-lg border border-light-400 dark:border-dark-300 h-full flex flex-col relative"
                whileHover={{ y: isMobile ? 0 : -5 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedCourse(course)}
              >
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-tertiary dark:bg-tertiary-dark text-white px-2 py-1 rounded-bl-lg text-xs sm:text-sm font-medium">
                    <Award size={isMobile ? 14 : 16} className="inline mr-1" />
                    Certificate
                  </div>
                </div>
                
                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold text-primary-dark dark:text-light-100 mb-2">{course.title}</h3>
                  <p className="text-dark-300 dark:text-light-300 mb-4 flex-grow text-sm sm:text-base">
                    {course.description || "This certification validates skills in specialized technologies and methodologies."}
                  </p>
                  
                  <motion.a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-1 sm:gap-2 bg-tertiary dark:bg-tertiary-dark hover:bg-tertiary-dark dark:hover:bg-tertiary text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>View Certificate</span>
                    <ExternalLink size={isMobile ? 14 : 16} />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile specific styles */}

    </section>
  );
}

export default Courses;