import React from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header";
import About from "./About";
import Contact from "./Contact";
import Courses from "./Courses";
import Education from "./education";
import Footer from "./Footer";
import Intro from "./Intro";
import LeftSider from "./LeftSider";
import Projects from "./Projects";

function Home() {
  const { portfolioData } = useSelector((state) => state.root);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <Header />

        {portfolioData && (
          <div className="bg-light-100 dark:bg-primary-dark">
            <Intro />
            <About />
            <Education />
            <Projects />
            <Courses />
            <Contact />
            <Footer />
            <LeftSider />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default Home;
